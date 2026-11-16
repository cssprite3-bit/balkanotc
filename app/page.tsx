import Link from "next/link";
import { ARTICLES, latestArticles } from "@/lib/articles";
import { LESSONS, TRACKS } from "@/lib/lessons";
import { RADAR } from "@/lib/radar";
import { getSnapshot } from "@/lib/market-data";
import { getAsset } from "@/lib/markets";
import { formatDateShort, formatDateTime, formatPercent, formatPrice } from "@/lib/format";
import { PriceChart } from "@/components/price-chart";
import { Reveal } from "@/components/reveal";

export default async function HomePage() {
  const snapshot = await getSnapshot();
  const lead = ARTICLES[0];
  const news = latestArticles(6).filter((a) => a.slug !== lead?.slug);
  const bitcoin = snapshot ? getAsset(snapshot.assets, "BTC") : undefined;
  const tickers = snapshot ? snapshot.assets.filter((a) => ["BTC", "ETH", "SOL", "XRP"].includes(a.symbol)) : [];
  return (
    <div className="wrap pb-6">
      {/* LEAD */}
      <div className="grid grid-cols-1 gap-x-10 gap-y-8 border-b border-ink/20 pb-10 pt-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-8">
          <article>
            <p className="flex flex-wrap items-center gap-2">
              <span className="kicker text-accent">Analiza</span>
              <span className="kicker">· {formatDateShort(lead.publishedAt)}</span>
              <span className="kicker">· {lead.readingMinutes} min čitanja</span>
            </p>
            <h1 className="mt-3 text-[34px] leading-[1.06] sm:text-[46px] lg:text-[54px]">
              <Link href={`/vesti/${lead.slug}`} className="headline-link">{lead.title}</Link>
            </h1>
            <p className="mt-4 max-w-[54ch] text-[16px] leading-relaxed text-muted">{lead.dek}</p>
            <p className="mt-3 text-[12.5px] text-muted">
              Piše <span className="text-ink">{lead.author}</span> · objavljeno {formatDateTime(lead.publishedAt)}
            </p>
            <div className="mt-6">
              {snapshot && bitcoin ? (
                <PriceChart symbol={bitcoin.symbol} name={bitcoin.name} series={snapshot.bitcoinSeries} />
              ) : (
                <p className="border border-line bg-surface px-4 py-6 text-[13.5px] text-muted">
                  Grafikoni trenutno nisu dostupni — izvor podataka nije odgovorio. Pokušaj ponovo za koji minut.
                </p>
              )}
            </div>
          </article>
        </Reveal>
        <aside className="lg:col-span-4 lg:border-l lg:border-line lg:pl-8" aria-label="Tržišni presek">
          {/* PRESEK */}
          <div>
            <div className="flex items-baseline justify-between">
              <h2 className="text-[17px]">Tržišni presek</h2>
              <Link href="/trziste" className="text-[12px] link-underline">Sve tabele</Link>
            </div>
            <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
              {snapshot ? `Presek · ${formatDateTime(snapshot.fetchedAt)}` : "Podaci trenutno nisu dostupni"}
            </p>
            <table className="mt-4 w-full border-collapse">
              <caption className="sr-only">Izabrani instrumenti</caption>
              <thead>
                <tr className="border-y border-line text-left">
                  <th scope="col" className="py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">Simbol</th>
                  <th scope="col" className="py-1.5 text-right font-mono text-[10px] uppercase tracking-[0.12em] text-muted">Cena</th>
                  <th scope="col" className="py-1.5 text-right font-mono text-[10px] uppercase tracking-[0.12em] text-muted">24h</th>
                </tr>
              </thead>
              <tbody>
                {tickers.map((a) => {
                  const up = a.change24h >= 0;
                  return (
                    <tr key={a.id} className="border-b border-line/70">
                      <th scope="row" className="py-2 text-left font-mono text-[12px] font-normal tracking-[0.06em] text-ink">{a.symbol}</th>
                      <td className="num py-2 text-right font-mono text-[12.5px] text-ink">{formatPrice(a.priceUsd, "USD")}</td>
                      <td className={`num py-2 text-right font-mono text-[11.5px] ${up ? "text-positive" : "text-negative"}`}>
                        {up ? "▲" : "▼"} {formatPercent(a.change24h)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* HEADLINES */}
          <div className="mt-7">
            <h2 className="text-[17px]">Najnovije</h2>
            <ul className="mt-3 divide-y divide-line/80">
              {news.slice(0, 4).map((a) => (
                <li key={a.slug} className="py-2.5">
                  <Link href={`/vesti/${a.slug}`} className="group block">
                    <span className="kicker">{a.kind === "vest" ? "Vest" : a.kind === "analiza" ? "Analiza" : "Mišljenje"} · {formatDateShort(a.publishedAt)}</span>
                    <span className="mt-1 block text-[14.5px] leading-snug text-ink transition-colors duration-160 group-hover:text-accent">{a.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </aside>
      </div>

      <Reveal as="section" className="border-b border-line py-10">
        <div className="flex items-baseline justify-between">
          <h2 className="text-[24px] sm:text-[27px]">Šta pokreće tržište</h2>
          <span className="kicker hidden sm:block">Tri stvari koje vredi razumeti</span>
        </div>
        <ol className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-3">
          {[
            { t: "Obim prati pokret", b: "24-časovni promet je iznad sedmodnevnog proseka, pa rast nije napravljen na praznom tržištu.", w: "Rast bez obima se vraća brže. Ovaj put obim potvrđuje pokret, ali samo na kratkom roku." },
            { t: "Spread se širi ujutru", b: "Razlika između najboljih cena najveća je u prvim satima, dok je dubina tržišta najmanja.", w: "Ista transakcija u 9 i u 13 časova nema isti trošak, iako je provizija identična." },
            { t: "Likvidnost nije kapitalizacija", b: "Kapitalizacija je cena puta količina. Likvidnost je koliko se stvarno može proći.", w: "Velika kapitalizacija sa tankom knjigom naloga pravi trošak koji se ne vidi u cenovniku." },
          ].map((item, i) => (
            <li key={item.t} className="border-t border-ink pt-3">
              <p className="num font-mono text-[11px] text-accent">0{i + 1}</p>
              <h3 className="mt-1 text-[18px] leading-snug">{item.t}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{item.b}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-ink"><span className="text-muted">Zašto je važno: </span>{item.w}</p>
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal as="section" className="border-b border-line py-10">
        <div className="flex items-baseline justify-between">
          <h2 className="text-[24px] sm:text-[27px]">Najnovije vesti</h2>
          <Link href="/vesti" className="text-[12.5px] link-underline">Sve vesti i analize</Link>
        </div>
        <div className="mt-6 grid gap-x-10 gap-y-8 lg:grid-cols-12">
          <article className="lg:col-span-5">
            <Link href={`/vesti/${news[0]?.slug ?? ""}`} className="group block">
              <span className="kicker text-accent">Istaknuto · {news[0]?.category}</span>
              <h3 className="mt-2 text-[26px] leading-[1.12] transition-colors duration-160 group-hover:text-accent">
                {news[0]?.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">{news[0]?.dek}</p>
            </Link>
            {news[0]?.pull ? (
              <blockquote className="mt-4 border-l-2 border-accent pl-3 font-serif text-[20px] leading-snug text-ink">
                {news[0].pull}
              </blockquote>
            ) : null}
            <p className="mt-3 text-[12.5px] text-muted">
              Piše <span className="text-ink">{news[0]?.author}</span> · {news[0]?.readingMinutes} min čitanja
            </p>
          </article>
          {/* NEWS ROWS */}
          <div className="lg:col-span-7 lg:border-l lg:border-line lg:pl-10">
            <ul className="divide-y divide-line">
              {news.slice(1, 5).map((a) => (
                <li key={a.slug} className="py-3 first:pt-0">
                  <Link href={`/vesti/${a.slug}`} className="group grid grid-cols-[1fr_auto] items-baseline gap-4">
                    <span>
                      <span className="kicker">{a.category} · {a.kind === "vest" ? "Vest" : a.kind === "analiza" ? "Analiza" : "Mišljenje"}</span>
                      <span className="mt-1 block text-[16.5px] leading-snug text-ink transition-colors duration-160 group-hover:text-accent">{a.title}</span>
                    </span>
                    <span className="num whitespace-nowrap font-mono text-[11px] text-muted">{formatDateShort(a.publishedAt)}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[12px] leading-relaxed text-muted">
              Svaki tekst nosi oznaku tipa i datum objavljivanja; analiza i mišljenje nisu isto.
            </p>
          </div>

        </div>
      </Reveal>

      <Reveal as="section" className="border-b border-line py-10">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-[24px] sm:text-[27px]">Balkanski radar</h2>
          <Link href="/radar" className="text-[12.5px] link-underline">Sve regionalne teme</Link>
        </div>
        <p className="mt-2 max-w-[62ch] text-[13.5px] leading-relaxed text-muted">
          Dostupnost usluga, platni kanali i regulatorne promene u regionu. Uz svaku stavku stoje država, datum i status
          provere — najava se ne prikazuje kao potvrđena činjenica.
        </p>
        <ul className="mt-6 grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          {RADAR.slice(0, 3).map((item) => (
            <li key={item.id} className="border-t border-line pt-3">
              <p className="flex flex-wrap items-baseline gap-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink">{item.country}</span>
                <span className="num font-mono text-[10.5px] text-muted">{formatDateShort(item.date)}</span>
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.1em] ${
                    item.status === "potvrdjeno" ? "text-positive" : item.status === "najavljeno" ? "text-accent" : "text-muted"
                  }`}
                >
                  {item.status === "potvrdjeno" ? "potvrđeno" : item.status === "najavljeno" ? "najavljeno" : "nepotvrđeno"}
                </span>
              </p>
              <h3 className="mt-1.5 text-[17px] leading-snug">{item.title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{item.dek}</p>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal as="section" className="py-10">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-[24px] sm:text-[27px]">Akademija</h2>
          <span className="kicker">Bez registracije · napredak se čuva lokalno</span>
        </div>
        <div className="mt-6 grid gap-x-10 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-[15px] leading-relaxed text-ink">
              Tri putanje, numerisane lekcije i jasan redosled. Počnite od prve — sve ostalo ima smisla tek posle nje.
            </p>
            <Link href={`/akademija/${LESSONS[0]?.slug ?? ""}`} className="btn mt-4">Počni ovde</Link>
            <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-4">
              <div>
                <dt className="kicker">Lekcija</dt>
                <dd className="num font-mono text-[20px] text-ink">{LESSONS.length}</dd>
              </div>
              <div>
                <dt className="kicker">Putanja</dt>
                <dd className="num font-mono text-[20px] text-ink">{TRACKS.length}</dd>
              </div>
            </dl>
            <Link
              href="/akademija/provera"
              className="group mt-6 block border border-line bg-surface px-3 py-3 transition-colors duration-160 hover:border-ink"
            >
              <span className="kicker text-accent">Interaktivno</span>
              <span className="mt-1 block text-[15.5px] leading-snug text-ink transition-colors duration-160 group-hover:text-accent">
                Provera instinkta: 10 tvrdnji, objašnjenje posle svakog odgovora.
              </span>
              <span className="mt-1 block font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
                ~3 min · bez naloga
              </span>
            </Link>
          </div>
          <ol className="lg:col-span-8 lg:border-l lg:border-line lg:pl-10">
            {LESSONS.slice(0, 4).map((lesson) => (
              <li key={lesson.slug} className="border-t border-line first:border-t-0">
                <Link href={`/akademija/${lesson.slug}`} className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-4 py-3.5">
                  <span className="num font-mono text-[12px] text-accent">{String(lesson.number).padStart(2, "0")}</span>
                  <span>
                    <span className="block text-[16.5px] leading-snug text-ink transition-colors duration-160 group-hover:text-accent">{lesson.title}</span>
                    <span className="mt-0.5 block text-[12.5px] text-muted">{lesson.summary}</span>
                  </span>
                  <span className="num whitespace-nowrap font-mono text-[11px] text-muted">{lesson.minutes} min</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </div>
  );
}




