"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { QUIZ, QUIZ_BEST_KEY, QUIZ_MAX, verdictFor } from "@/lib/quiz";
import { getLesson } from "@/lib/lessons";

type Phase = "intro" | "play" | "result";

export function Quiz() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<boolean | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [best, setBest] = useState<number | null>(null);
  const liveRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(QUIZ_BEST_KEY);
      if (raw !== null) {
        const parsed = Number(raw);
        if (Number.isFinite(parsed)) setBest(parsed);
      }
    } catch {
      /* storage disabled: the quiz still runs, the best score is just not kept */
    }
  }, []);

  const item = QUIZ[index];
  const total = QUIZ_MAX;

  const score = useMemo(
    () => answers.reduce((sum, answer, i) => (answer === QUIZ[i]?.answer ? sum + 1 : sum), 0),
    [answers],
  );

  useEffect(() => {
    if (phase !== "result") return;
    setBest((prev) => {
      if (prev !== null && prev >= score) return prev;
      try {
        window.localStorage.setItem(QUIZ_BEST_KEY, String(score));
      } catch {
        /* ignore */
      }
      return score;
    });
  }, [phase, score]);

  const start = useCallback(() => {
    setPhase("play");
    setIndex(0);
    setPicked(null);
    setAnswers([]);
  }, []);

  const answer = useCallback(
    (value: boolean) => {
      if (phase !== "play" || picked !== null) return;
      setPicked(value);
      setAnswers((prev) => [...prev, value]);
    },
    [phase, picked],
  );

  const next = useCallback(() => {
    if (picked === null) return;
    if (index + 1 >= QUIZ.length) {
      setPhase("result");
      return;
    }
    setIndex((i) => i + 1);
    setPicked(null);
  }, [index, picked]);

  useEffect(() => {
    if (phase !== "play") return;
    const onKey = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (picked === null && (key === "1" || key === "t")) {
        event.preventDefault();
        answer(true);
      } else if (picked === null && (key === "2" || key === "n")) {
        event.preventDefault();
        answer(false);
      } else if (picked !== null && (key === "enter" || key === " " || key === "arrowright")) {
        event.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, picked, answer, next]);

  if (phase === "intro") {
    return (
      <section className="border border-line bg-surface" aria-labelledby="kviz-naslov">
        <div className="border-b border-line px-4 py-4 sm:px-6">
          <p className="kicker text-accent">Interaktivno</p>
          <h2 id="kviz-naslov" className="mt-1 text-[24px] leading-tight sm:text-[27px]">
            Kako radi
          </h2>
          <p className="mt-2 max-w-[58ch] text-[14px] leading-relaxed text-muted">
            Deset tvrdnji o tržištu, novčanicima i troškovima. Za svaku birate tačno ili netačno, a objašnjenje
            dobijate odmah — ne na kraju. Nema naloga i nema slanja odgovora.
          </p>
        </div>
        <div className="grid gap-0 sm:grid-cols-[1fr_auto] sm:items-center">
          <dl className="grid grid-cols-3 divide-x divide-line border-b border-line sm:border-b-0 sm:border-r">
            <div className="px-4 py-3">
              <dt className="kicker">Tvrdnji</dt>
              <dd className="num mt-0.5 font-mono text-[18px] text-ink">{total}</dd>
            </div>
            <div className="px-4 py-3">
              <dt className="kicker">Trajanje</dt>
              <dd className="num mt-0.5 font-mono text-[18px] text-ink">~3 min</dd>
            </div>
            <div className="px-4 py-3">
              <dt className="kicker">Najbolji</dt>
              <dd className="num mt-0.5 font-mono text-[18px] text-ink">{best === null ? "—" : `${best}/${total}`}</dd>
            </div>
          </dl>
          <div className="px-4 py-4 sm:px-6">
            <button onClick={start} className="btn w-full sm:w-auto">Počni proveru</button>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
              Tasteri 1 / 2 ili T / N
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (phase === "result") {
    const verdict = verdictFor(score);
    const missed = QUIZ.filter((q, i) => answers[i] !== q.answer);
    return (
      <section className="border border-line bg-surface" aria-labelledby="kviz-rezultat">
        <div className="border-b border-line px-4 py-5 sm:px-6">
          <p className="kicker text-accent">Rezultat</p>
          <p className="num mt-2 font-mono text-[44px] leading-none text-ink">
            {score}
            <span className="text-[20px] text-muted">/{total}</span>
          </p>
          <h2 id="kviz-rezultat" className="mt-3 text-[24px] leading-tight">{verdict.title}</h2>
          <p className="mt-2 max-w-[56ch] text-[14px] leading-relaxed text-muted">{verdict.detail}</p>
          <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
            Najbolji rezultat u ovom pregledaču: {best === null ? score : Math.max(best, score)}/{total}
          </p>
        </div>

        {missed.length > 0 ? (
          <div className="border-b border-line px-4 py-4 sm:px-6">
            <h3 className="text-[16px]">Gde je instinkt omašio</h3>
            <ul className="mt-2 divide-y divide-line">
              {missed.map((q) => (
                <li key={q.id} className="py-2.5">
                  <p className="text-[14px] leading-snug text-ink">
                    <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent">
                      {q.answer ? "Tačno" : "Netačno"}
                    </span>
                    <span className="mx-2 text-muted" aria-hidden="true">·</span>
                    {q.statement}
                  </p>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted">{q.explanation}</p>
                  {q.lesson ? (
                    <Link href={`/akademija/${q.lesson}`} className="mt-1 inline-block text-[12.5px] link-underline">
                      {(() => {
                        const lesson = getLesson(q.lesson);
                        return lesson ? `Lekcija ${String(lesson.number).padStart(2, "0")} — ${lesson.title}` : "Lekcija koja ovo pokriva";
                      })()}
                    </Link>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="border-b border-line px-4 py-4 text-[14px] text-ink sm:px-6">
            Bez promašaja. Sledeći korak nije još jedan kviz, nego primena istih pravila na sopstveni nalog.
          </p>
        )}

        <div className="flex flex-wrap items-center gap-2 px-4 py-4 sm:px-6">
          <button onClick={start} className="btn">Pokušaj ponovo</button>
          <Link href="/akademija" className="btn-quiet">Nazad na Akademiju</Link>
          <Link href="/metodologija" className="btn-quiet">Metodologija</Link>
        </div>
      </section>
    );
  }

  const correct = item ? picked === item.answer : false;
  const progress = Math.round(((index + (picked !== null ? 1 : 0)) / total) * 100);

  return (
    <section className="border border-line bg-surface" aria-labelledby="kviz-pitanje">
      <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-2.5 sm:px-6">
        <p className="num font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
          Tvrdnja {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
        <p className="num font-mono text-[11px] text-muted">
          Pogođeno {score}
        </p>
      </div>
      <div className="h-[3px] w-full bg-line" role="presentation">
        <div className="h-full bg-accent transition-[width] duration-240" style={{ width: `${progress}%` }} />
      </div>

      <div className="px-4 py-6 sm:px-6">
        <h2 id="kviz-pitanje" className="max-w-[46ch] font-serif text-[22px] leading-[1.3] text-ink sm:text-[26px]">
          {item?.statement}
        </h2>

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            onClick={() => answer(true)}
            disabled={picked !== null}
            aria-pressed={picked === true}
            className={`inline-flex min-w-[132px] items-center justify-between gap-3 border px-4 py-2.5 text-[14px] transition-colors duration-160 ${
              picked === null
                ? "border-ink bg-ink text-surface hover:bg-[#2b3630]"
                : picked === true
                  ? "border-ink bg-ink text-surface"
                  : "border-line text-muted"
            }`}
          >
            Tačno
            <span className="font-mono text-[10px] opacity-60">1</span>
          </button>
          <button
            onClick={() => answer(false)}
            disabled={picked !== null}
            aria-pressed={picked === false}
            className={`inline-flex min-w-[132px] items-center justify-between gap-3 border px-4 py-2.5 text-[14px] transition-colors duration-160 ${
              picked === null
                ? "border-line text-ink hover:border-ink"
                : picked === false
                  ? "border-ink bg-ink text-surface"
                  : "border-line text-muted"
            }`}
          >
            Netačno
            <span className="font-mono text-[10px] opacity-60">2</span>
          </button>
        </div>

        {picked !== null ? (
          <div className="mt-5 border-t border-line pt-4">
            <p className={`text-[13px] font-medium ${correct ? "text-positive" : "text-negative"}`}>
              {correct ? "Tačno." : "Nije tačno."}{" "}
              <span className="font-normal text-ink">
                Tačan odgovor je {item?.answer ? "tačno" : "netačno"}.
              </span>
            </p>
            <p className="mt-1.5 max-w-[62ch] text-[14px] leading-relaxed text-muted">{item?.explanation}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button onClick={next} className="btn">
                {index + 1 >= total ? "Vidi rezultat" : "Sledeća tvrdnja"}
              </button>
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">Enter</span>
            </div>
          </div>
        ) : null}

        <p ref={liveRef} aria-live="polite" className="sr-only">
          {picked === null ? "" : `${correct ? "Tačno" : "Nije tačno"}. ${item?.explanation ?? ""}`}
        </p>
      </div>
    </section>
  );
}
