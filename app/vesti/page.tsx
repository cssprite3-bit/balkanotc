import type { Metadata } from "next";
import { ARTICLES, CATEGORIES } from "@/lib/articles";
import { NewsFilter } from "@/components/news-filter";

export const metadata: Metadata = {
  title: "Vesti i analize",
  description: "Vesti, analize i mišljenja sa jasnom oznakom tipa teksta, autorom, datumom i izvorima.",
};

export default function NewsPage() {
  return (
    <div className="wrap pb-10">
      <header className="border-b-2 border-ink pb-6 pt-8">
        <p className="kicker text-accent">Redakcija</p>
        <h1 className="mt-2 text-[34px] leading-tight sm:text-[42px]">Vesti i analize</h1>
        <p className="mt-3 max-w-[64ch] text-[15px] leading-relaxed text-muted">
          Vest prenosi događaj. Analiza objašnjava mehanizam. Mišljenje iznosi stav potpisan imenom. Oznaka tipa stoji
          uz svaki naslov, a izvori na kraju teksta.
        </p>
      </header>
      <NewsFilter articles={ARTICLES} categories={CATEGORIES} />
    </div>
  );
}
