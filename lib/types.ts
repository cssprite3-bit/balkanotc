export type Period = "24h" | "7d" | "30d";

export interface Point {
  /** ISO timestamp of the sample. */
  t: string;
  /** Value in USD. */
  v: number;
}

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  priceUsd: number;
  change24h: number;
  volumeUsd: number;
  marketCapUsd: number;
}

export type ArticleKind = "vest" | "analiza" | "misljenje";

export interface Source {
  label: string;
  note?: string;
}

export interface Article {
  slug: string;
  kind: ArticleKind;
  category: string;
  title: string;
  dek: string;
  author: string;
  publishedAt: string;
  readingMinutes: number;
  sources: Source[];
  body: string[];
  pull?: string;
  related: string[];
}

export interface Lesson {
  slug: string;
  number: number;
  track: TrackId;
  title: string;
  summary: string;
  minutes: number;
  level: "Uvod" | "Osnovni" | "Srednji";
  body: string[];
}

export type TrackId = "osnove" | "trziste" | "novcanici";

export interface Track {
  id: TrackId;
  title: string;
  blurb: string;
}

export type RadarStatus = "potvrdjeno" | "najavljeno" | "nepotvrdjeno";

export interface RadarItem {
  id: string;
  country: string;
  topic: string;
  title: string;
  dek: string;
  date: string;
  status: RadarStatus;
  source: string;
}

export interface Term {
  term: string;
  definition: string;
  aliases: string[];
}
