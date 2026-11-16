import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES, getArticle, relatedArticles } from "@/lib/articles";
import { formatDateLong, formatDateTime } from "@/lib/format";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Tekst nije pronađen" };
  return { title: article.title, description: article.dek };
}

const KIND_LABEL = { vest: "Vest", analiza: "Analiza", misljenje: "Mišljenje" } as const;

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <article className="wrap pb-10">
      <div className="border-b border-line pb-4 pt-6">
        <Link href="/vesti" className="kicker link-underline">← Vesti i analize</Link>
      </div>
      <header className="mx-auto max-w-reading pt-8">
        <p className="flex flex-wrap items-center gap-2">
          <span className="kicker text-accent">{KIND_LABEL[article.kind]}</span>
          <span className="kicker">· {article.category}</span>
        </p>
        <h1 className="mt-3 text-[32px] leading-[1.1] sm:text-[40px]">{article.title}</h1>
        <p className="mt-4 text-[17px] leading-relaxed text-muted">{article.dek}</p>
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 border-y border-line py-2.5 text-[12.5px] text-muted">
          <span>Piše <span className="text-ink">{article.author}</span></span>
          <span aria-hidden="true">·</span>
          <time dateTime={article.publishedAt}>{formatDateLong(article.publishedAt)}</time>
          <span aria-hidden="true">·</span>
          <span>{article.readingMinutes} min čitanja</span>
        </div>
      </header>
      {/* BODY */}
      <div className="mx-auto max-w-reading pt-8">
        {article.body.map((paragraph, i) => (
          <div key={paragraph.slice(0, 24)}>
            <p className="mt-4 text-[16.5px] leading-[1.72] text-ink/95 first:mt-0">{paragraph}</p>
            {article.pull && i === 1 ? (
              <blockquote className="my-7 border-l-2 border-accent pl-4 font-serif text-[21px] leading-snug text-ink">
                {article.pull}
              </blockquote>
            ) : null}
          </div>
        ))}
        <section aria-labelledby="izvori" className="mt-10 border-t border-line pt-4">
          <h2 id="izvori" className="text-[15px]">Izvori i napomene</h2>
          <ul className="mt-2 space-y-1.5 text-[12.5px] leading-relaxed text-muted">
            {article.sources.map((s) => (
              <li key={s.label}>{s.label}{s.note ? ` — ${s.note}` : ""}</li>
            ))}
            <li>Objavljeno: {formatDateTime(article.publishedAt)} (Europe/Belgrade)</li>
          </ul>
        </section>
      </div>
      {/* RELATED */}
      <section aria-labelledby="povezano" className="mt-10 border-t-2 border-ink pt-5">
        <h2 id="povezano" className="text-[20px]">Povezani tekstovi</h2>
        <ul className="mt-4 grid gap-x-10 gap-y-4 sm:grid-cols-2">
          {relatedArticles(article).map((rel) => (
            <li key={rel.slug} className="border-t border-line pt-2.5">
              <Link href={`/vesti/${rel.slug}`} className="group block">
                <span className="kicker">{rel.category} · {KIND_LABEL[rel.kind]}</span>
                <span className="mt-1 block text-[16px] leading-snug text-ink transition-colors duration-160 group-hover:text-accent">
                  {rel.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

    </article>
  );
}

