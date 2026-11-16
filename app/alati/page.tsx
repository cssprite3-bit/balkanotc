import type { Metadata } from "next";
import { CostCalculator, DcaCalculator } from "@/components/calculators";
import { getSnapshot } from "@/lib/market-data";

export const metadata: Metadata = {
  title: "Alati",
  description: "Dva kalkulatora: scenario DCA uplata i ukupan trošak kupovine ili prodaje, sa prikazanim formulama i pretpostavkama.",
};

export default async function ToolsPage() {
  const snapshot = await getSnapshot();
  const eurPerUsd = snapshot?.eurPerUsd ?? 1;
  return (
    <div className="wrap pb-10">
      <header className="border-b-2 border-ink pb-6 pt-8">
        <p className="kicker text-accent">Proračun</p>
        <h1 className="mt-2 text-[34px] leading-tight sm:text-[42px]">Alati</h1>
        <p className="mt-3 max-w-[64ch] text-[15px] leading-relaxed text-muted">
          Dva kalkulatora, oba sa vidljivom formulom. Nijedan ne prognozira cenu i nijedan ne čuva unete podatke —
          sve se računa u pregledaču.
        </p>
      </header>

      <div className="grid gap-6 pt-8">
        <DcaCalculator eurPerUsd={eurPerUsd} />
        <CostCalculator />
      </div>

      <section aria-labelledby="tools-limits" className="mt-8 border-t border-line pt-5">
        <h2 id="tools-limits" className="text-[17px]">Zajednička ograničenja</h2>
        <ul className="mt-2 max-w-[70ch] space-y-1.5 text-[13px] leading-relaxed text-muted">
          <li>Oba kalkulatora koriste fiksni kurs za prikaz u evrima koji je naveden uz svaki rezultat.</li>
          <li>Nijedan ne uključuje poreze, inflaciju ni regulatorne troškove.</li>
          <li>Rezultati su aritmetika nad unosom korisnika, ne investicioni savet.</li>
          <li>Unos se ne šalje na server i ne ostaje sačuvan posle zatvaranja stranice.</li>
        </ul>
      </section>
    </div>
  );
}
