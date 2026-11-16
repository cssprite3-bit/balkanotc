import type { CSSProperties, ReactNode } from "react";

type Tag = "div" | "section" | "li" | "article";

/**
 * Entrance motion is pure CSS (`animation-fill-mode: both`), so the content is
 * always visible in its final state — no JavaScript, no observer, no risk of a
 * section staying hidden when it never intersects the viewport.
 */
export function Reveal({
  children,
  delay = 0,
  as = "div",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  as?: Tag;
  className?: string;
}) {
  const cls = `reveal ${className}`.trim();
  const style: CSSProperties | undefined = delay > 0 ? { animationDelay: `${delay}ms` } : undefined;

  if (as === "section") return <section className={cls} style={style}>{children}</section>;
  if (as === "li") return <li className={cls} style={style}>{children}</li>;
  if (as === "article") return <article className={cls} style={style}>{children}</article>;
  return <div className={cls} style={style}>{children}</div>;
}
