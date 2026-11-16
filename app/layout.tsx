import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Newsreader } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getSnapshot } from "@/lib/market-data";

const newsreader = Newsreader({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "BalkanOTC — Tržište bez galame",
    template: "%s · BalkanOTC",
  },
  description:
    "Nezavisni kripto bilten za Balkan: analiza tržišta, vesti, edukacija i regionalne teme — bez hajpa i bez obećanja.",
  applicationName: "BalkanOTC",
  openGraph: {
    type: "website",
    locale: "sr_RS",
    siteName: "BalkanOTC",
    title: "BalkanOTC — Tržište bez galame",
    description: "Analiza, vesti, akademija i regionalni radar. Bez hajpa.",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const snapshot = await getSnapshot();
  const assets = snapshot?.assets ?? [];
  const eurPerUsd = snapshot?.eurPerUsd ?? 1;
  const fetchedAt = snapshot?.fetchedAt ?? new Date().toISOString();
  const sourceName = snapshot?.source.name ?? "Izvor podataka";

  return (
    <html lang="sr-Latn-RS" className={`${newsreader.variable} ${plexSans.variable} ${plexMono.variable}`}>
      <body>
        <a
          href="#sadrzaj"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-surface"
        >
          Preskoči na sadržaj
        </a>
        <SiteHeader assets={assets} eurPerUsd={eurPerUsd} fetchedAt={fetchedAt} />
        <main id="sadrzaj">{children}</main>
        <SiteFooter fetchedAt={fetchedAt} sourceName={sourceName} />
      </body>
    </html>
  );
}
