"use client";

import { useReadingProgress } from "@/lib/local-store";

export function LessonDone({ slug }: { slug: string }) {
  const { has, markRead, ready } = useReadingProgress();
  const done = ready && has(slug);
  return (
    <button
      onClick={() => markRead(slug)}
      aria-pressed={done}
      className={`btn-quiet mt-6 ${done ? "border-positive text-positive" : ""}`}
    >
      {done ? "✓ Zabeleženo kao pročitano" : "Označi lekciju kao pročitanu"}
    </button>
  );
}

export function ProgressLine() {
  const { completed, ready } = useReadingProgress();
  if (!ready) return null;
  return (
    <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
      Pročitano lokalno: {completed.length}
    </p>
  );
}
