import type { Article, Lesson, Term } from "./types";
import { ARTICLES } from "./articles";
import { LESSONS } from "./lessons";
import { GLOSSARY } from "./glossary";

export type SearchKind = "clanak" | "lekcija" | "pojam";

export interface SearchHit {
  id: string;
  kind: SearchKind;
  title: string;
  context: string;
  href: string;
  haystack: string;
}

function normalise(input: string): string {
  return input
    .toLocaleLowerCase("sr-Latn-RS")
    .replaceAll("č", "c")
    .replaceAll("ć", "c")
    .replaceAll("š", "s")
    .replaceAll("ž", "z")
    .replaceAll("đ", "d")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

const fromArticle = (a: Article): SearchHit => ({
  id: `clanak-${a.slug}`,
  kind: "clanak",
  title: a.title,
  context: `${a.kind === "analiza" ? "Analiza" : a.kind === "misljenje" ? "Mišljenje" : "Vest"} · ${a.category}`,
  href: `/vesti/${a.slug}`,
  haystack: normalise([a.title, a.dek, a.category, a.author].join(" ")),
});

const fromLesson = (l: Lesson): SearchHit => ({
  id: `lekcija-${l.slug}`,
  kind: "lekcija",
  title: l.title,
  context: `Lekcija ${String(l.number).padStart(2, "0")} · ${l.minutes} min`,
  href: `/akademija/${l.slug}`,
  haystack: normalise([l.title, l.summary, l.level].join(" ")),
});

const fromTerm = (t: Term): SearchHit => ({
  id: `pojam-${normalise(t.term)}`,
  kind: "pojam",
  title: t.term,
  context: "Rečnik pojmova",
  href: `/akademija#recnik`,
  haystack: normalise([t.term, t.definition, ...t.aliases].join(" ")),
});

export const SEARCH_INDEX: SearchHit[] = [
  ...ARTICLES.map(fromArticle),
  ...LESSONS.map(fromLesson),
  ...GLOSSARY.map(fromTerm),
];

export function search(query: string, limit = 8): SearchHit[] {
  const q = normalise(query.trim());
  if (q.length < 2) return [];
  const words = q.split(/\s+/).filter(Boolean);
  return SEARCH_INDEX.map((hit) => {
    let score = 0;
    for (const w of words) {
      if (hit.haystack.includes(w)) score += w.length > 3 ? 2 : 1;
      if (normalise(hit.title).startsWith(w)) score += 3;
    }
    return { hit, score };
  })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.hit);
}
