import type { Asset, Period, Point } from "./types";

/**
 * Live market snapshot.
 *
 * Prices come from CoinGecko's public API (no key), the EUR/USD rate from
 * Frankfurter (ECB reference rates). Everything is fetched on the server and
 * revalidated on a short interval, so the browser never talks to a third party.
 */

const COINGECKO = "https://api.coingecko.com/api/v3";
const FRANKFURTER = "https://api.frankfurter.app/latest?from=USD&to=EUR";
const REVALIDATE = 120;

export const COIN_IDS = [
  "bitcoin",
  "ethereum",
  "solana",
  "ripple",
  "cardano",
  "dogecoin",
  "chainlink",
  "polkadot",
  "avalanche",
  "litecoin",
] as const;

export interface Snapshot {
  assets: Asset[];
  /** Bitcoin history for the lead chart, keyed by period. */
  bitcoinSeries: Record<Period, Point[]>;
  eurPerUsd: number;
  /** ISO timestamp of the last successful provider response. */
  fetchedAt: string;
  /** True when a provider failed and an earlier snapshot is being served. */
  stale: boolean;
  source: { name: string; url: string };
}

interface CoinGeckoRow {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number | null;
  total_volume: number;
  market_cap: number;
}

interface ChartResponse {
  prices: Array<[number, number]>;
}

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: { accept: "application/json" },
    next: { revalidate: REVALIDATE },
  });
  if (!response.ok) throw new Error(`${url} responded ${response.status}`);
  return (await response.json()) as T;
}

function toPoints(prices: Array<[number, number]>): Point[] {
  return prices.map(([ms, value]) => ({
    t: new Date(ms).toISOString(),
    v: Number(value.toFixed(value < 5 ? 4 : 2)),
  }));
}

async function getChart(days: 1 | 7 | 30): Promise<Point[]> {
  const data = await getJson<ChartResponse>(
    `${COINGECKO}/coins/bitcoin/market_chart?vs_currency=usd&days=${days}`,
  );
  return toPoints(data.prices);
}

async function getFxRate(): Promise<number> {
  const data = await getJson<{ rates: { EUR?: number } }>(FRANKFURTER);
  const rate = data.rates.EUR;
  if (typeof rate !== "number" || !Number.isFinite(rate) || rate <= 0) {
    throw new Error("FX rate missing");
  }
  return rate;
}

function toAsset(row: CoinGeckoRow): Asset {
  return {
    id: row.id,
    symbol: row.symbol.toUpperCase(),
    name: row.name,
    priceUsd: row.current_price,
    change24h: row.price_change_percentage_24h ?? 0,
    volumeUsd: row.total_volume,
    marketCapUsd: row.market_cap,
  };
}

/**
 * One server-side snapshot of the market. Returns null when a provider is
 * unreachable, so callers can say "podaci trenutno nisu dostupni" instead of
 * showing numbers of unknown age.
 */
export async function getSnapshot(): Promise<Snapshot | null> {
  try {
    const [rows, eurPerUsd, day, week, month] = await Promise.all([
      getJson<CoinGeckoRow[]>(
        `${COINGECKO}/coins/markets?vs_currency=usd&ids=${COIN_IDS.join(",")}&price_change_percentage=24h`,
      ),
      getFxRate(),
      getChart(1),
      getChart(7),
      getChart(30),
    ]);

    if (!Array.isArray(rows) || rows.length === 0) return null;

    const assets = rows
      .filter((row) => Number.isFinite(row.current_price) && row.current_price > 0)
      .map(toAsset)
      .sort((a, b) => b.marketCapUsd - a.marketCapUsd);

    if (assets.length === 0 || day.length === 0 || week.length === 0 || month.length === 0) return null;

    return {
      assets,
      bitcoinSeries: { "24h": day, "7d": week, "30d": month },
      eurPerUsd,
      fetchedAt: new Date().toISOString(),
      stale: false,
      source: { name: "CoinGecko", url: "https://www.coingecko.com" },
    };
  } catch {
    return null;
  }
}
