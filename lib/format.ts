import type { Period } from "./types";

const LOCALE = "sr-Latn-RS";
const TZ = "Europe/Belgrade";

const priceFmt = new Intl.NumberFormat(LOCALE, {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

const eurFmt = new Intl.NumberFormat(LOCALE, {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

const pctFmt = new Intl.NumberFormat(LOCALE, {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
  signDisplay: "exceptZero",
});

const compactFmt = new Intl.NumberFormat(LOCALE, {
  notation: "compact",
  maximumFractionDigits: 1,
});

const dateShort = new Intl.DateTimeFormat(LOCALE, {
  day: "2-digit",
  month: "short",
  timeZone: TZ,
});

const dateLong = new Intl.DateTimeFormat(LOCALE, {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: TZ,
});

const dateTime = new Intl.DateTimeFormat(LOCALE, {
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: TZ,
});

export function formatPrice(value: number, currency: "USD" | "EUR"): string {
  return currency === "EUR" ? eurFmt.format(value) : priceFmt.format(value);
}

export function formatMoney(value: number, currency: "USD" | "EUR"): string {
  return formatPrice(value, currency);
}

export function formatPercent(value: number): string {
  return `${pctFmt.format(value)}%`;
}

export function formatCompact(value: number): string {
  return compactFmt.format(value);
}

export function formatDateShort(iso: string): string {
  return dateShort.format(new Date(iso));
}

export function formatDateLong(iso: string): string {
  return dateLong.format(new Date(iso));
}

export function formatDateTime(iso: string): string {
  return dateTime.format(new Date(iso));
}

const hourFmt = new Intl.DateTimeFormat(LOCALE, {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: TZ,
});

export function formatHour(iso: string): string {
  return hourFmt.format(new Date(iso));
}

export function periodLabel(period: Period): string {
  if (period === "24h") return "24 sata";
  if (period === "7d") return "7 dana";
  return "30 dana";
}
