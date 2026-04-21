-- Project Versa: D1 schema for real job postings

PRAGMA foreign_keys = ON;

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

