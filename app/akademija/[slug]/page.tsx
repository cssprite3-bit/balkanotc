import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LESSONS, getLesson, lessonsByTrack } from "@/lib/lessons";
import { LessonDone } from "@/components/lesson-done";

export function generateStaticParams() {
  return LESSONS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) return { title: "Lekcija nije pronađena" };
  return { title: lesson.title, description: lesson.summary };
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();
  const siblings = lessonsByTrack(lesson.track);
  const index = siblings.findIndex((l) => l.slug === lesson.slug);
  const next = index >= 0 ? siblings[index + 1] : undefined;

  return (
    <article className="wrap pb-10">
      <div className="border-b border-line pb-4 pt-6">
        <Link href="/akademija" className="kicker link-underline">← Akademija</Link>
      </div>
      <div className="mx-auto max-w-reading pt-8">
        <p className="kicker text-accent">Lekcija {String(lesson.number).padStart(2, "0")} · {lesson.level} · {lesson.minutes} min</p>
        <h1 className="mt-3 text-[32px] leading-[1.1] sm:text-[38px]">{lesson.title}</h1>
        <p className="mt-3 text-[16.5px] leading-relaxed text-muted">{lesson.summary}</p>
        <div className="mt-8 border-t border-line pt-6">
          {lesson.body.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="mt-4 text-[16.5px] leading-[1.72] text-ink/95 first:mt-0">{paragraph}</p>
          ))}
        </div>
        <LessonDone slug={lesson.slug} />
        <nav aria-label="Kretanje kroz lekcije" className="mt-10 border-t-2 border-ink pt-4">
          {next ? (
            <Link href={`/akademija/${next.slug}`} className="group block">
              <span className="kicker">Sledeća lekcija</span>
              <span className="mt-1 block text-[18px] text-ink transition-colors duration-160 group-hover:text-accent">
                {String(next.number).padStart(2, "0")} — {next.title}
              </span>
            </Link>
          ) : (
            <Link href="/akademija" className="group block">
              <span className="kicker">Kraj putanje</span>
              <span className="mt-1 block text-[18px] text-ink transition-colors duration-160 group-hover:text-accent">Nazad na Akademiju</span>
            </Link>
          )}
        </nav>
      </div>
    </article>
  );
}
