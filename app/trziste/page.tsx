import type { Metadata } from "next";
import Link from "next/link";
import { MarketTable } from "@/components/market-table";
import { getSnapshot } from "@/lib/market-data";
import { formatDateTime } from "@/lib/format";

export const metadata: Metadata = {
  title: "Tržište",
  description: "Tabela reprezentativnih kriptovaluta sa sortiranjem, pretragom, izborom valute i lokalnom listom praćenja.",
};

export default async function MarketPage() {
  const snapshot = await getSnapshot();

  return (
    <div className="wrap pb-10">
      <header className="border-b-2 border-ink pb-6 pt-8">
        <p className="kicker text-accent">Podaci</p>
        <h1 className="mt-2 text-[34px] leading-tight sm:text-[42px]">Tržište</h1>
        <p className="mt-3 max-w-[64ch] text-[15px] leading-relaxed text-muted">
          Deset vodećih instrumenata. Sortiraj po ceni, promeni ili obimu, izaberi valutu prikaza i sačuvaj listu
          praćenja — lokalno, bez registracije.
        </p>
        <p className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
          {snapshot
            ? `Izvor: ${snapshot.source.name} · presek ${formatDateTime(snapshot.fetchedAt)}`
            : "Izvor podataka trenutno nije dostupan"}
        </p>
      </header>

      <div className="pt-6">
        {snapshot ? (
          <MarketTable assets={snapshot.assets} eurPerUsd={snapshot.eurPerUsd} />
        ) : (
          <p className="border border-line bg-surface px-4 py-6 text-[13.5px] leading-relaxed text-muted">
            Tabela nije dostupna jer izvor podataka nije odgovorio. Osveži stranicu za koji minut.
          </p>
        )}
      </div>

      <p className="mt-6 max-w-[70ch] border-t border-line pt-4 text-[12.5px] leading-relaxed text-muted">
        Cene se povlače na serveru i osvežavaju u kratkom intervalu; prikaz u evrima koristi ECB referentni kurs, oba
        objašnjena u <Link href="/metodologija" className="link-underline">metodologiji</Link>. Tabela ne predstavlja
        ponudu za trgovinu.
      </p>
    </div>
  );
}
