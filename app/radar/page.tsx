import type { Metadata } from "next";
import { RADAR, RADAR_COUNTRIES, RADAR_TOPICS } from "@/lib/radar";
import { RadarFilter } from "@/components/radar-filter";
import { formatDateLong } from "@/lib/format";

export const metadata: Metadata = {
  title: "Balkanski radar",
  description: "Regionalne teme sa jasno označenom državom, datumom i statusom provere: potvrđeno, najavljeno ili nepotvrđeno.",
};

export default function RadarPage() {
  return (
    <div className="wrap pb-10">
      <header className="border-b-2 border-ink pb-6 pt-8">
        <p className="kicker text-accent">Region</p>
        <h1 className="mt-2 text-[34px] leading-tight sm:text-[42px]">Balkanski radar</h1>
        <p className="mt-3 max-w-[64ch] text-[15px] leading-relaxed text-muted">
          Tematski presek regiona: plaćanja, regulativa, infrastruktura, obrazovanje i tržište. Uz svaku stavku stoji
          država, datum i status provere. Najava nije potvrđena činjenica i tako je i označena.
        </p>
        <p className="mt-4 max-w-[68ch] border-l-2 border-line pl-3 text-[12.5px] leading-relaxed text-muted">
          Namerno nema navoda o konkretnim zakonima, licencama ni poreskim stopama. Ovaj radar opisuje mehanizme i
          način čitanja propisa; svaka pravna tvrdnja mora se proveriti u izvornom tekstu i kod nadležnog organa.
        </p>
      </header>
      <div className="pt-2">
        <RadarFilter items={RADAR} countries={RADAR_COUNTRIES} topics={RADAR_TOPICS} />
      </div>
      <p className="mt-6 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
        Poslednje ažuriranje preseka: {formatDateLong("2026-11-14T12:00:00+01:00")}
      </p>
    </div>
  );
}
