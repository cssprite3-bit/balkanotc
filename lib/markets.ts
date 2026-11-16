import type { Asset } from "./types";

/** Symbols pinned to the strip above the masthead. */
export const TICKER_SYMBOLS = ["BTC", "ETH", "SOL"] as const;

export function toEur(usd: number, eurPerUsd: number): number {
  return usd * eurPerUsd;
}

export function getAsset(assets: Asset[], symbol: string): Asset | undefined {
  const wanted = symbol.toUpperCase();
  return assets.find((asset) => asset.symbol === wanted);
}

export function periodChange(points: Array<{ v: number }>): number {
  const first = points[0]?.v ?? 0;
  const last = points[points.length - 1]?.v ?? 0;
  if (first === 0) return 0;
  return Number((((last - first) / first) * 100).toFixed(2));
}
