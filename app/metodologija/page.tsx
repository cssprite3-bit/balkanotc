import type { Metadata } from "next";
import Link from "next/link";
import { getSnapshot } from "@/lib/market-data";
import { formatDateTime } from "@/lib/format";

export const metadata: Metadata = {
  title: "Metodologija",
  description: "Odakle dolaze cene, kako se računaju grafikoni i šta koji tip teksta znači.",
};

export default async function MethodologyPage() {
  const snapshot = await getSnapshot();
  return (
    <div className="wrap pb-10">
      <header className="border-b-2 border-ink pb-6 pt-8">
        <p className="kicker text-accent">Transparentnost</p>
        <h1 className="mt-2 text-[34px] leading-tight sm:text-[42px]">Metodologija</h1>
        <p className="mt-3 max-w-[64ch] text-[15px] leading-relaxed text-muted">
          Svaki broj na ovom portalu mora da se može objasniti u tri rečenice: odakle je, kako je izračunat i šta ne
          znači. Ovo je ta stranica.
        </p>
      </header>

      <div className="max-w-reading pt-8">
        <section aria-labelledby="podaci">
          <h2 id="podaci" className="text-[21px]">Podaci o tržištu</h2>
          <p className="mt-2 text-[15.5px] leading-[1.72] text-ink/95">
            Cene i obimi se povlače sa javnog CoinGecko API-ja na serveru, a kurs dolara prema evru iz ECB
            referentnih stopa (Frankfurter). Podaci se keširaju i osvežavaju u kratkom intervalu
            {snapshot ? `; poslednji presek je zabeležen ${formatDateTime(snapshot.fetchedAt)}` : ""}.
          </p>
          <ul className="mt-3 space-y-2 text-[14px] leading-relaxed text-muted">
            <li>
              <span className="text-ink">Izvor cena:</span> CoinGecko javni API, bez ključa. Pregledač ne komunicira sa
              provajderom — sve ide preko servera.
            </li>
            <li>
              <span className="text-ink">Osvežavanje:</span> server drži poslednji uspešan presek i ponovo ga traži na
              dva minuta. Ako provajder ne odgovori, stranica to kaže umesto da prikaže brojeve nepoznate starosti.
            </li>
            <li>
              <span className="text-ink">Valuta:</span> primarna valuta prikaza je USD. Prikaz u evrima koristi ECB
              kurs USD→EUR iz istog preseka, naveden uz svaku tabelu koja ga koristi.
            </li>
            <li>
              <span className="text-ink">Obim i kapitalizacija:</span> preuzimaju se uz cenu i nisu izvedeni iz cene na
              ovoj stranici.
            </li>
          </ul>
        </section>

        <section aria-labelledby="grafikoni" className="mt-9 border-t border-line pt-5">
          <h2 id="grafikoni" className="text-[21px]">Grafikoni</h2>
          <p className="mt-2 text-[15.5px] leading-[1.72] text-ink/95">
            Grafikoni koriste stvarnu istoriju cena Bitcoina: 24 sata u petominutnim uzorcima, 7 dana u satnim i 30
            dana u četvoročasovnim. Periodi se ne dobijaju sečenjem istog niza, pa se i oblik linije i označeni najviši
            nivo razlikuju.
          </p>
          <ul className="mt-3 space-y-2 text-[14px] leading-relaxed text-muted">
            <li>Ose su linearne, bez prekida i bez logaritamske skale.</li>
            <li>Oznaka na grafiku pokazuje najviši nivo u izabranom periodu, ne istorijski maksimum instrumenta.</li>
            <li>Ispod svakog grafika stoji tekstualni opis: najviši nivo, promena u periodu i način skaliranja.</li>
            <li>Animacija linije se isključuje kada je u sistemu uključeno smanjenje pokreta.</li>
          </ul>
        </section>

        <section aria-labelledby="tekstovi" className="mt-9 border-t border-line pt-5">
          <h2 id="tekstovi" className="text-[21px]">Vrste tekstova</h2>
          <dl className="mt-3 space-y-3 text-[14px] leading-relaxed">
            <div>
              <dt className="font-medium text-ink">Vest</dt>
              <dd className="text-muted">
                Prenosi događaj ili stanje, bez stava autora. Ako je nešto najavljeno, a ne potvrđeno, piše da je
                najavljeno.
              </dd>
            </div>
            <div>
              <dt className="font-medium text-ink">Analiza</dt>
              <dd className="text-muted">
                Objašnjava mehanizam: zašto se nešto dešava i koje pretpostavke stoje iza broja. Ne sadrži preporuku za
                kupovinu ili prodaju.
              </dd>
            </div>
            <div>
              <dt className="font-medium text-ink">Mišljenje</dt>
              <dd className="text-muted">
                Potpisan stav jednog autora. Jasno je odvojeno od vesti i od analize, i to oznakom uz naslov.
              </dd>
            </div>
          </dl>
          <p className="mt-3 text-[14px] leading-relaxed text-muted">
            Cene su stvarne i osvežavaju se automatski. Tekstovi su urednički sadržaj portala: potpisani su imenom
            autora i ne predstavljaju investicioni savet.
          </p>
        </section>

        <section aria-labelledby="radar" className="mt-9 border-t border-line pt-5">
          <h2 id="radar" className="text-[21px]">Balkanski radar</h2>
          <p className="mt-2 text-[15.5px] leading-[1.72] text-ink/95">
            Radar opisuje mehanizme, ne pravne činjenice. Uz svaku stavku stoji država, datum i status provere:
            potvrđeno, najavljeno ili nepotvrđeno. Namerno nema navoda o konkretnim zakonima, licencama ni poreskim
            stopama — takva tvrdnja bi zahtevala izvorni tekst propisa i proveru kod nadležnog organa.
          </p>
        </section>

        <section aria-labelledby="alati" className="mt-9 border-t border-line pt-5">
          <h2 id="alati" className="text-[21px]">Kalkulatori</h2>
          <p className="mt-2 text-[15.5px] leading-[1.72] text-ink/95">
            Oba kalkulatora prikazuju formulu i pretpostavke iznad rezultata. DCA scenario sabira mesečne uplate sa
            konstantnim mesečnim prinosom (godišnji prinos podeljen sa 12); kalkulator troška sabira procentualnu i
            fiksnu naknadu. Nijedan ne uključuje spread, klizni trošak, porez ni inflaciju. Unos se ne šalje na server.
          </p>
        </section>

        <section aria-labelledby="privatnost" className="mt-9 border-t border-line pt-5">
          <h2 id="privatnost" className="text-[21px]">Lični podaci</h2>
          <p className="mt-2 text-[15.5px] leading-[1.72] text-ink/95">
            Portal nema naloge, kolačiće za praćenje ni analitiku. Lista praćenja i napredak kroz lekcije čuvaju se u{" "}
            <code className="font-mono text-[13.5px]">localStorage</code> pregledača i ne napuštaju uređaj. Brisanje
            podataka pregledača briše i njih.
          </p>
        </section>

        <p className="mt-9 border-t border-line pt-4 text-[13px] leading-relaxed text-muted">
          <Link href="/trziste" className="link-underline">Tabela tržišta</Link> ·{" "}
          <Link href="/alati" className="link-underline">Kalkulatori</Link> ·{" "}
          <Link href="/radar" className="link-underline">Radar</Link>
        </p>
      </div>
    </div>
  );
}
