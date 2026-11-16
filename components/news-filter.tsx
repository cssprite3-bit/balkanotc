"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Article, ArticleKind } from "@/lib/types";
import { formatDateShort } from "@/lib/format";

const KINDS: Array<{ id: ArticleKind | "sve"; label: string }> = [
  { id: "sve", label: "Sve" },
  { id: "vest", label: "Vesti" },
  { id: "analiza", label: "Analize" },
  { id: "misljenje", label: "Mišljenja" },
];

const KIND_LABEL: Record<ArticleKind, string> = { vest: "Vest", analiza: "Analiza", misljenje: "Mišljenje" };

export function NewsFilter({ articles, categories }: { articles: Article[]; categories: string[] }) {
  const [kind, setKind] = useState<ArticleKind | "sve">("sve");
  const [category, setCategory] = useState<string>("sve");

  const visible = useMemo(
    () =>
      articles
        .filter((a) => (kind === "sve" || a.kind === kind) && (category === "sve" || a.category === category))
        .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt)),
    [articles, kind, category],
  );
  // VIEW
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line py-4">
        <div role="group" aria-label="Tip teksta" className="flex flex-wrap gap-1">
          {KINDS.map((k) => (
            <button
              key={k.id}
              onClick={() => setKind(k.id)}
              aria-pressed={kind === k.id}
              className={`border px-3 py-1.5 text-[12.5px] transition-colors duration-160 ${
                kind === k.id ? "border-ink bg-ink text-surface" : "border-line text-ink hover:border-ink"
              }`}
            >
              {k.label}
            </button>
          ))}
        </div>
        <div>
          <label htmlFor="news-category" className="kicker block">Kategorija</label>
          <select
            id="news-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="field mt-1 w-[180px]"
          >
            <option value="sve">Sve kategorije</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>
      <p className="py-3 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
        Prikazano {visible.length} od {articles.length}
      </p>
      {visible.length === 0 ? (
        <div className="border-t border-line py-10">
          <p className="text-[15px] text-ink">Nema tekstova za ovu kombinaciju filtera.</p>
          <p className="mt-1 text-[13.5px] text-muted">Vrati tip na „Sve“ ili kategoriju na „Sve kategorije“.</p>
        </div>
      ) : (
        <ul className="divide-y divide-line border-t border-ink">
          {visible.map((a) => (
            <li key={a.slug}>
              <Link href={`/vesti/${a.slug}`} className="group grid gap-2 py-4 sm:grid-cols-[130px_1fr_auto] sm:items-baseline sm:gap-6">
                <span className="kicker">{a.category} · {KIND_LABEL[a.kind]}</span>
                <span>
                  <span className="block text-[18.5px] leading-snug text-ink transition-colors duration-160 group-hover:text-accent">
                    {a.title}
                  </span>
                  <span className="mt-1 block max-w-[70ch] text-[13.5px] leading-relaxed text-muted">{a.dek}</span>
                </span>
                <span className="num whitespace-nowrap font-mono text-[11px] text-muted">
                  {formatDateShort(a.publishedAt)} · {a.readingMinutes} min
                </span>
              </Link>
            </li>
          ))}
        </ul>

      )}
    </div>
  );
}

