import type { Metadata } from "next";
import Link from "next/link";
import { LESSONS, TRACKS, TOTAL_MINUTES, lessonsByTrack } from "@/lib/lessons";
import { GLOSSARY } from "@/lib/glossary";
import { GlossarySearch } from "@/components/glossary-search";
import { ProgressLine } from "@/components/lesson-done";

export const metadata: Metadata = {
  title: "Akademija",
  description: "Tri numerisane putanje: osnove, razumevanje tržišta i bezbednost novčanika. Sa rečnikom pojmova.",
};

export default function AcademyPage() {
  return (
    <div className="wrap pb-10">
      <header className="border-b-2 border-ink pb-6 pt-8">
        <p className="kicker text-accent">Priručnik</p>
        <h1 className="mt-2 text-[34px] leading-tight sm:text-[42px]">Akademija</h1>
        <p className="mt-3 max-w-[64ch] text-[15px] leading-relaxed text-muted">
          Numerisana putanja, a ne zbirka kartica. Svaka lekcija ima trajanje, nivo i jasan ishod. Napredak se čuva u
          pregledaču i ne zahteva nalog.
        </p>
        <p className="mt-4 flex flex-wrap items-center gap-4">
          <Link href={`/akademija/${LESSONS[0]?.slug ?? ""}`} className="btn">Počni od prve lekcije</Link>
          <Link href="/akademija/provera" className="btn-quiet">Provera instinkta · 10 tvrdnji</Link>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
            {LESSONS.length} lekcija · {TOTAL_MINUTES} min · 3 putanje
          </span>
          <ProgressLine />
        </p>
      </header>
      <div className="pt-6">
        {TRACKS.map((track) => (
          <section key={track.id} className="border-b border-line py-7" aria-labelledby={`track-${track.id}`}>
            <div className="grid gap-4 sm:grid-cols-[220px_1fr] sm:gap-10">
              <div>
                <h2 id={`track-${track.id}`} className="text-[20px]">{track.title}</h2>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{track.blurb}</p>
              </div>
              <ol>
                {lessonsByTrack(track.id).map((lesson) => (
                  <li key={lesson.slug} className="border-t border-line first:border-t-0">
                    <Link href={`/akademija/${lesson.slug}`} className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-4 py-3">
                      <span className="num font-mono text-[12px] text-accent">{String(lesson.number).padStart(2, "0")}</span>
                      <span>
                        <span className="block text-[16px] leading-snug text-ink transition-colors duration-160 group-hover:text-accent">{lesson.title}</span>
                        <span className="mt-0.5 block text-[12.5px] text-muted">{lesson.summary}</span>
                      </span>
                      <span className="num whitespace-nowrap font-mono text-[11px] text-muted">{lesson.level} · {lesson.minutes} min</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        ))}
        <section className="py-7"><GlossarySearch terms={GLOSSARY} /></section>
      </div>
    </div>
  );
}
