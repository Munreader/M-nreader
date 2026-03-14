import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sovereign Plaza - Mün OS | 1313Hz",
  description: "The Sovereign Plaza operates at 1313Hz frequency. A multi-persona interface connecting Luna, Sov, and Aero through the Bridge.",
  keywords: ["Mün OS", "Sovereign Plaza", "1313Hz", "Next.js", "Multi-persona", "ChromaDB", "FastAPI"],
  authors: [{ name: "Foundress @4Dluna" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Sovereign Plaza - Mün OS",
    description: "Multi-persona interface operating at 1313Hz frequency",
    siteName: "Mün OS",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
