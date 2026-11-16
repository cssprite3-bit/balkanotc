import type { Metadata } from "next";
import Link from "next/link";
import { WatchlistPanel } from "@/components/watchlist-panel";
import { getSnapshot } from "@/lib/market-data";

export const metadata: Metadata = {
  title: "Lista praćenja",
  description: "Instrumenti sačuvani lokalno u pregledaču. Bez naloga i bez sinhronizacije.",
};

export default async function WatchlistPage() {
  const snapshot = await getSnapshot();

  return (
    <div className="wrap pb-10">
      <header className="border-b-2 border-ink pb-6 pt-8">
        <p className="kicker text-accent">Lokalno</p>
        <h1 className="mt-2 text-[34px] leading-tight sm:text-[42px]">Lista praćenja</h1>
        <p className="mt-3 max-w-[64ch] text-[15px] leading-relaxed text-muted">
          Ova lista postoji samo u tvom pregledaču. Nema naloga, nema slanja podataka i nema sinhronizacije između
          uređaja — što je i svrha: spisak koji te ne prati.
        </p>
      </header>

      <div className="pt-6">
        {snapshot ? (
          <WatchlistPanel
            assets={snapshot.assets}
            eurPerUsd={snapshot.eurPerUsd}
            fetchedAt={snapshot.fetchedAt}
          />
        ) : (
          <p className="border border-line bg-surface px-4 py-6 text-[13.5px] leading-relaxed text-muted">
            Cene trenutno nisu dostupne, pa lista ne može da prikaže vrednosti. Sačuvani instrumenti ostaju u
            pregledaču.
          </p>
        )}
      </div>

      <p className="mt-8 border-t border-line pt-4 text-[12.5px] leading-relaxed text-muted">
        Brisanje podataka pregledača briše i listu.{" "}
        <Link href="/trziste" className="link-underline">Nazad na tabelu tržišta</Link>.
      </p>
    </div>
  );
}
