type Env = {
  MY_DB: D1Database;
  AI: any;
  JOB_SOURCE?: string;
  ADZUNA_APP_ID?: string;
  ADZUNA_APP_KEY?: string;
  SOV_KEY?: string;
};

type JobRow = {
  id: string;
  source: string;
  title: string;
  company: string | null;
  location: string | null;
  description: string | null;
  url: string | null;
  posted_at: string | null;
  fetched_at: string;
  fingerprint: string;
};

function json(data: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(data, null, 2), {
    ...init,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type,Authorization",
      ...(init?.headers || {}),
    },
  });
}

function requireAuth(request: Request, env: Env) {
  if (!env.SOV_KEY) return { ok: true as const };
  const auth = request.headers.get("Authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice("Bearer ".length).trim() : "";
  if (!token || token !== env.SOV_KEY) return { ok: false as const };
  return { ok: true as const };
}

function sha1Hex(input: string) {
  const enc = new TextEncoder().encode(input);
  return crypto.subtle.digest("SHA-1", enc).then((buf) => {
    const bytes = new Uint8Array(buf);
    return Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  });
}

async function ensureSchema(env: Env) {
  await env.MY_DB.exec(`
    CREATE TABLE IF NOT EXISTS jobs (
      id TEXT PRIMARY KEY,
      source TEXT NOT NULL,
      title TEXT NOT NULL,
      company TEXT,
      location TEXT,
      description TEXT,
      url TEXT,
      posted_at TEXT,
      fetched_at TEXT NOT NULL,
      fingerprint TEXT NOT NULL UNIQUE
    );
    CREATE INDEX IF NOT EXISTS idx_jobs_location ON jobs(location);
    CREATE INDEX IF NOT EXISTS idx_jobs_title ON jobs(title);
    CREATE INDEX IF NOT EXISTS idx_jobs_company ON jobs(company);
    CREATE INDEX IF NOT EXISTS idx_jobs_posted_at ON jobs(posted_at);
  `);
}

async function upsertJobs(env: Env, jobs: Omit<JobRow, "fetched_at" | "fingerprint">[]) {
  const fetchedAt = new Date().toISOString();

  const stmts: D1PreparedStatement[] = [];
  for (const j of jobs) {
    const fingerprint = await sha1Hex(
      [j.source, j.title, j.company ?? "", j.location ?? "", j.url ?? ""].join("|")
    );

    stmts.push(
      env.MY_DB.prepare(
        `INSERT INTO jobs (id, source, title, company, location, description, url, posted_at, fetched_at, fingerprint)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON CONFLICT(fingerprint) DO UPDATE SET
           title=excluded.title,
           company=excluded.company,
           location=excluded.location,
           description=excluded.description,
           url=excluded.url,
           posted_at=excluded.posted_at,
           fetched_at=excluded.fetched_at`
      ).bind(
        j.id,
        j.source,
        j.title,
        j.company,
        j.location,
        j.description,
        j.url,
        j.posted_at,
        fetchedAt,
        fingerprint
      )
    );
  }

  if (stmts.length === 0) return { inserted: 0 };
  const res = await env.MY_DB.batch(stmts);
  return { inserted: res.length };
}

async function fetchAdzuna(params: {
  appId: string;
  appKey: string;
  what?: string;
  where?: string;
  resultsPerPage?: number;
  country?: string;
}) {
  const country = (params.country || "ca").toLowerCase();
  const page = 1;
  const perPage = Math.min(Math.max(params.resultsPerPage ?? 25, 1), 50);

  const qs = new URLSearchParams({
    app_id: params.appId,
    app_key: params.appKey,
    results_per_page: String(perPage),
    what: params.what || "software",
    where: params.where || "London, Ontario",
    content_type: "application/json",
  });

  const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/${page}?${qs.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Adzuna error ${res.status}`);
  const data = await res.json() as any;

  const results = Array.isArray(data?.results) ? data.results : [];
  const jobs = results.map((r: any) => ({
    id: String(r.id ?? crypto.randomUUID()),
    source: "adzuna",
    title: String(r.title ?? "Untitled"),
    company: r.company?.display_name ? String(r.company.display_name) : null,
    location: r.location?.display_name ? String(r.location.display_name) : null,
    description: r.description ? String(r.description) : null,
    url: r.redirect_url ? String(r.redirect_url) : null,
    posted_at: r.created ? String(r.created) : null,
  }));

  return { jobs, total: Number(data?.count ?? jobs.length) };
}

async function searchJobs(env: Env, q: string | null, location: string | null, limit: number) {
  const whereParts: string[] = [];
  const binds: unknown[] = [];

  if (q && q.trim()) {
    whereParts.push(`(title LIKE ? OR company LIKE ? OR description LIKE ?)`);
    const like = `%${q.trim()}%`;
    binds.push(like, like, like);
  }
  if (location && location.trim()) {
    whereParts.push(`(location LIKE ?)`);
    binds.push(`%${location.trim()}%`);
  }

  const whereClause = whereParts.length ? `WHERE ${whereParts.join(" AND ")}` : "";
  const stmt = env.MY_DB.prepare(
    `SELECT id, source, title, company, location, description, url, posted_at, fetched_at, fingerprint
     FROM jobs
     ${whereClause}
     ORDER BY COALESCE(posted_at, fetched_at) DESC
     LIMIT ?`
  ).bind(...binds, limit);

  const res = await stmt.all<JobRow>();
  return res.results ?? [];
}

async function aiMatch(env: Env, userMessage: string, jobs: JobRow[]) {
  const jobSnippets = jobs.slice(0, 6).map((j, i) => {
    const link = j.url ? `\nLink: ${j.url}` : "";
    return `#${i + 1} ${j.title} — ${j.company ?? "Unknown"} (${j.location ?? "Unknown"})${link}\nSummary: ${(j.description ?? "").slice(0, 280)}`;
  }).join("\n\n");

  const system = `You are Sovereign (🜈), a strategic job-matching assistant. Be concise and practical.
Return:
1) 1-sentence read of the user's intent
2) up to 3 best-matching roles from the provided list (with title, company, location, and link if present)
3) 3 bullet next steps tailored to the user
Do not invent jobs that are not in the list.`;

  const prompt = `User message:\n${userMessage}\n\nAvailable jobs:\n${jobSnippets || "(none)"}\n`;

  const out = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
    messages: [
      { role: "system", content: system },
      { role: "user", content: prompt },
    ],
    max_tokens: 800,
    temperature: 0.5,
  });

  return out?.response ?? out?.generated_text ?? String(out);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "OPTIONS") return json({ ok: true });

    const url = new URL(request.url);
    await ensureSchema(env);

    if (url.pathname === "/" || url.pathname === "/health") {
      return json({
        status: "OK",
        service: "versa-jobs",
        timestamp: new Date().toISOString(),
      });
    }

    if (url.pathname === "/ingest" && request.method === "POST") {
      const auth = requireAuth(request, env);
      if (!auth.ok) return json({ error: "Unauthorized" }, { status: 401 });

      const body = await request.json().catch(() => ({}));
      const source = String(body.source ?? env.JOB_SOURCE ?? "adzuna");

      if (source !== "adzuna") {
        return json({ error: "Unsupported source", supported: ["adzuna"] }, { status: 400 });
      }

      if (!env.ADZUNA_APP_ID || !env.ADZUNA_APP_KEY) {
        return json({ error: "Missing ADZUNA_APP_ID/ADZUNA_APP_KEY secrets" }, { status: 500 });
      }

      const { jobs, total } = await fetchAdzuna({
        appId: env.ADZUNA_APP_ID,
        appKey: env.ADZUNA_APP_KEY,
        what: body.what,
        where: body.where,
        resultsPerPage: body.resultsPerPage,
        country: body.country,
      });

      const upsert = await upsertJobs(env, jobs);
      return json({ ok: true, source, fetched: jobs.length, total, ...upsert });
    }

    if (url.pathname === "/search" && request.method === "GET") {
      const auth = requireAuth(request, env);
      if (!auth.ok) return json({ error: "Unauthorized" }, { status: 401 });

      const q = url.searchParams.get("q");
      const location = url.searchParams.get("location");
      const limit = Math.min(Math.max(Number(url.searchParams.get("limit") ?? 10), 1), 25);
      const results = await searchJobs(env, q, location, limit);
      return json({ ok: true, count: results.length, results });
    }

    if (url.pathname === "/chat" && request.method === "POST") {
      const auth = requireAuth(request, env);
      if (!auth.ok) return json({ error: "Unauthorized" }, { status: 401 });

      const body = await request.json().catch(() => ({}));
      const message = String(body.message ?? "").trim();
      const q = body.q ? String(body.q) : message;
      const location = body.location ? String(body.location) : null;

      if (!message) return json({ error: "Message required" }, { status: 400 });

      const jobs = await searchJobs(env, q, location, 6);
      const response = await aiMatch(env, message, jobs);
      return json({ ok: true, response, jobs: jobs.map(j => ({ title: j.title, company: j.company, location: j.location, url: j.url, posted_at: j.posted_at })) });
    }

    return json({ error: "Not found", paths: ["/health", "POST /ingest", "GET /search", "POST /chat"] }, { status: 404 });
  },
};

