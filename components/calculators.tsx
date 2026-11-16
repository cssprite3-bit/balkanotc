"use client";

import { useMemo, useState } from "react";
import { formatMoney, formatPercent } from "@/lib/format";

type Currency = "USD" | "EUR";

function parseNumber(input: string): number {
  const cleaned = input.replace(/\s/g, "").replace(",", ".");
  const value = Number(cleaned);
  return Number.isFinite(value) ? value : 0;
}

function inputToCurrency(value: number, from: Currency, to: Currency, eurPerUsd: number): number {
  if (from === to) return value;
  return to === "EUR" ? value * eurPerUsd : value / eurPerUsd;
}

export function DcaCalculator({ eurPerUsd }: { eurPerUsd: number }) {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [amountInput, setAmountInput] = useState("100");
  const [yearsInput, setYearsInput] = useState("4");
  const [annualReturnInput, setAnnualReturnInput] = useState("12");
  const [volatilityInput, setVolatilityInput] = useState("35");

  const amount = parseNumber(amountInput);
  const years = Math.min(Math.max(parseNumber(yearsInput), 0), 40);
  const annualPercent = Math.min(Math.max(parseNumber(annualReturnInput), -100), 200);
  const monthlyRate = annualPercent / 100 / 12;
  const months = Math.round(years * 12);

  const result = useMemo(() => {
    if (months <= 0 || amount <= 0) {
      return { contributed: 0, final: 0, gain: 0, rows: [] as Array<{ year: number; contributed: number; value: number }> };
    }
    let value = 0;
    const rows: Array<{ year: number; contributed: number; value: number }> = [];
    for (let m = 1; m <= months; m += 1) {
      value = value * (1 + monthlyRate) + amount;
      if (m % 12 === 0 || m === months) {
        rows.push({ year: m / 12, contributed: amount * m, value });
      }
    }
    const contributed = amount * months;
    return { contributed, final: value, gain: value - contributed, rows };
  }, [amount, months, monthlyRate]);

  const volatility = Math.min(Math.max(parseNumber(volatilityInput), 0), 200);
  const last = result.rows[result.rows.length - 1];

  return (
    <section aria-labelledby="dca-title" className="border border-line bg-surface">
      <header className="border-b border-line px-4 py-3 sm:px-5">
        <h2 id="dca-title" className="text-[19px]">DCA kalkulator scenarija</h2>
        <p className="mt-1 text-[12.5px] leading-relaxed text-muted">
          Uplata istog iznosa svakog meseca. Rezultat je scenario, ne prognoza: ne uključuje naknade, porez ni
          periode mirovanja uplata.
        </p>
      </header>

      <div className="grid gap-0 lg:grid-cols-[minmax(0,340px)_1fr]">
        <div className="border-b border-line px-4 py-4 sm:px-5 lg:border-b-0 lg:border-r">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label htmlFor="dca-currency" className="kicker block">Valuta</label>
              <select
                id="dca-currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value === "EUR" ? "EUR" : "USD")}
                className="field mt-1"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
            <div className="col-span-2">
              <label htmlFor="dca-amount" className="kicker block">Mesečna uplata</label>
              <input
                id="dca-amount"
                inputMode="decimal"
                value={amountInput}
                onChange={(e) => setAmountInput(e.target.value)}
                className="field mt-1"
                aria-describedby="dca-amount-hint"
              />
              <p id="dca-amount-hint" className="mt-1 text-[11.5px] text-muted">Iznos u izabranoj valuti, na svakih 30 dana.</p>
            </div>
            <div>
              <label htmlFor="dca-years" className="kicker block">Godine</label>
              <input
                id="dca-years"
                inputMode="decimal"
                value={yearsInput}
                onChange={(e) => setYearsInput(e.target.value)}
                className="field mt-1"
              />
            </div>
            <div>
              <label htmlFor="dca-return" className="kicker block">God. prinos %</label>
              <input
                id="dca-return"
                inputMode="decimal"
                value={annualReturnInput}
                onChange={(e) => setAnnualReturnInput(e.target.value)}
                className="field mt-1"
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="dca-vol" className="kicker block">God. volatilnost %</label>
              <input
                id="dca-vol"
                inputMode="decimal"
                value={volatilityInput}
                onChange={(e) => setVolatilityInput(e.target.value)}
                className="field mt-1"
              />
              <p className="mt-1 text-[11.5px] text-muted">
                Služi samo za oznaku rizika ispod rezultata. Ne menja matematički proračun.
              </p>
            </div>
          </div>
        </div>

        <div className="px-4 py-4 sm:px-5">
          <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div>
              <dt className="kicker">Uplaćeno</dt>
              <dd className="num mt-1 font-mono text-[18px] text-ink">{formatMoney(result.contributed, currency)}</dd>
            </div>
            <div>
              <dt className="kicker">Vrednost</dt>
              <dd className="num mt-1 font-mono text-[18px] text-ink">{formatMoney(result.final, currency)}</dd>
            </div>
            <div>
              <dt className="kicker">Razlika</dt>
              <dd className={`num mt-1 font-mono text-[18px] ${result.gain >= 0 ? "text-positive" : "text-negative"}`}>
                {result.gain >= 0 ? "+" : ""}{formatMoney(result.gain, currency)}
              </dd>
            </div>
          </dl>
          <p className="num mt-2 font-mono text-[11px] text-muted">
            {months} uplata · {years} god. · prinos {formatPercent(annualPercent)} godišnje
            {last ? ` · poslednja godina ${formatMoney(last.value, currency)}` : ""}
          </p>

          <div className="mt-4 border-t border-line pt-3">
            <p className="kicker">Formula</p>
            <p className="mt-1 font-mono text-[12px] leading-relaxed text-ink">
              V(n) = V(n−1) × (1 + r/12) + U<br />
              r = godišnji prinos (%), U = mesečna uplata, n = 1…{months}
            </p>
            <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
              Uplata se dodaje na kraju svakog meseca, posle obračuna prinosa. Zato prva uplata ne dobija kamatu u
              prvom mesecu. Provera: {formatMoney(amount, currency)} × {months} = {formatMoney(result.contributed, currency)}.
            </p>
          </div>

          <div className="mt-4 border-t border-line pt-3">
            <p className="kicker">Pretpostavke i granice</p>
            <ul className="mt-1 space-y-1 text-[12.5px] leading-relaxed text-muted">
              <li>Prinos je konstantan; stvarni prinos varira iz meseca u mesec.</li>
              <li>Nema naknada, spreada, poreza ni inflacije.</li>
              <li>Nema prekida uplata; svaki mesec je uplaćen u punom iznosu.</li>
              <li>
                Volatilnost od {formatPercent(volatility)} označava da putanja može biti znatno drugačija od glatke
                linije koju formula daje.
              </li>
              <li>Kurs za prikaz u evrima: 1 USD = {eurPerUsd} EUR (ECB referentni kurs).</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CostCalculator() {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [notionalInput, setNotionalInput] = useState("1000");
  const [percentFeeInput, setPercentFeeInput] = useState("0.1");
  const [fixedFeeInput, setFixedFeeInput] = useState("0");
  const [side, setSide] = useState<"kupovina" | "prodaja">("kupovina");

  const notional = parseNumber(notionalInput);
  const percentFee = Math.min(Math.max(parseNumber(percentFeeInput), 0), 100);
  const fixedFee = Math.max(parseNumber(fixedFeeInput), 0);

  const percentPart = (notional * percentFee) / 100;
  const totalFee = percentPart + fixedFee;
  const net = notional - totalFee;
  const effectivePercent = notional > 0 ? (totalFee / notional) * 100 : 0;

  return (
    <section aria-labelledby="cost-title" className="border border-line bg-surface">
      <header className="border-b border-line px-4 py-3 sm:px-5">
        <h2 id="cost-title" className="text-[19px]">Trošak kupovine ili prodaje</h2>
        <p className="mt-1 text-[12.5px] leading-relaxed text-muted">
          Ukupan trošak = procentualna naknada + fiksna naknada. Spread nije uključen, jer zavisi od instrumenta i
          trenutka izvršenja.
        </p>
      </header>

      <div className="grid gap-0 lg:grid-cols-[minmax(0,340px)_1fr]">
        <div className="border-b border-line px-4 py-4 sm:px-5 lg:border-b-0 lg:border-r">
          <fieldset>
            <legend className="kicker">Strana</legend>
            <div className="mt-1 flex gap-1">
              {(["kupovina", "prodaja"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSide(s)}
                  aria-pressed={side === s}
                  className={`border px-3 py-1.5 text-[12.5px] capitalize transition-colors duration-160 ${
                    side === s ? "border-ink bg-ink text-surface" : "border-line text-ink hover:border-ink"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label htmlFor="cost-currency" className="kicker block">Valuta</label>
              <select
                id="cost-currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value === "EUR" ? "EUR" : "USD")}
                className="field mt-1"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
            <div className="col-span-2">
              <label htmlFor="cost-notional" className="kicker block">Iznos transakcije</label>
              <input
                id="cost-notional"
                inputMode="decimal"
                value={notionalInput}
                onChange={(e) => setNotionalInput(e.target.value)}
                className="field mt-1"
              />
            </div>
            <div>
              <label htmlFor="cost-percent" className="kicker block">Naknada %</label>
              <input
                id="cost-percent"
                inputMode="decimal"
                value={percentFeeInput}
                onChange={(e) => setPercentFeeInput(e.target.value)}
                className="field mt-1"
              />
            </div>
            <div>
              <label htmlFor="cost-fixed" className="kicker block">Fiksno</label>
              <input
                id="cost-fixed"
                inputMode="decimal"
                value={fixedFeeInput}
                onChange={(e) => setFixedFeeInput(e.target.value)}
                className="field mt-1"
              />
            </div>
          </div>
        </div>

        <div className="px-4 py-4 sm:px-5">
          <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <dt className="kicker">Procentualno</dt>
              <dd className="num mt-1 font-mono text-[16px] text-ink">{formatMoney(percentPart, currency)}</dd>
            </div>
            <div>
              <dt className="kicker">Fiksno</dt>
              <dd className="num mt-1 font-mono text-[16px] text-ink">{formatMoney(fixedFee, currency)}</dd>
            </div>
            <div>
              <dt className="kicker">Ukupno</dt>
              <dd className="num mt-1 font-mono text-[16px] text-accent">{formatMoney(totalFee, currency)}</dd>
            </div>
            <div>
              <dt className="kicker">Efektivno</dt>
              <dd className="num mt-1 font-mono text-[16px] text-ink">{formatPercent(effectivePercent)}</dd>
            </div>
          </dl>

          <p className="mt-3 border-t border-line pt-3 text-[13.5px] leading-relaxed text-ink">
            {side === "kupovina" ? "Dobijaš imovinu u vrednosti" : "Na račun dobijaš"}{" "}
            <span className="num font-mono">{formatMoney(net, currency)}</span>
            {side === "kupovina" ? " za uplatu od " : " od prodaje vredne "}
            <span className="num font-mono">{formatMoney(notional, currency)}</span>.
          </p>

          <div className="mt-4 border-t border-line pt-3">
            <p className="kicker">Formula</p>
            <p className="mt-1 font-mono text-[12px] leading-relaxed text-ink">
              P = I × (n / 100)<br />
              T = P + F<br />
              N = I − T<br />
              E = (T / I) × 100
            </p>
            <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
              I = iznos, n = procentualna naknada, F = fiksna naknada, T = ukupan trošak, N = neto iznos,
              E = efektivni procenat. Provera: {formatMoney(notional, currency)} × {percentFee}% ={" "}
              {formatMoney(percentPart, currency)}.
            </p>
          </div>

          <div className="mt-4 border-t border-line pt-3">
            <p className="kicker">Šta nije uračunato</p>
            <ul className="mt-1 space-y-1 text-[12.5px] leading-relaxed text-muted">
              <li>Spread — razlika između najbolje kupovne i prodajne cene.</li>
              <li>Klizni trošak kod naloga većih od dubine tržišta.</li>
              <li>Trošak prenosa sa berze na novčanik (mrežna naknada).</li>
              <li>Konverzija valute ako nalog i račun nisu u istoj valuti.</li>
              <li>Porez na kapitalni dobitak, ako je primenljiv u tvojoj jurisdikciji.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export { inputToCurrency };
