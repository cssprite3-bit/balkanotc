import Link from "next/link";
import { ContourMark } from "./contour-mark";

export function Wordmark({ size = "lg" }: { size?: "lg" | "sm" }) {
  const text = size === "lg" ? "text-[30px] sm:text-[38px]" : "text-[22px]";
  return (
    <span className="inline-flex items-end gap-2">
      <ContourMark className="mb-[3px] h-6 w-6 shrink-0 text-accent sm:h-7 sm:w-7" />
      <span className={`font-serif font-medium leading-none tracking-[-0.02em] ${text}`}>
        Balkan<span className="relative">OTC<span className="absolute -bottom-[3px] left-0 h-[2px] w-full bg-accent" /></span>
      </span>
    </span>
  );
}

export function Masthead() {
  return (
    <div className="masthead-enter flex flex-col gap-3 border-b border-line pb-4 pt-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <Link href="/" aria-label="BalkanOTC — početna" className="inline-block">
          <Wordmark />
        </Link>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">Nezavisni kripto bilten</p>
      </div>
      <p className="max-w-[15rem] text-[12.5px] leading-snug text-muted sm:text-right">Tržište bez galame.</p>
    </div>
  );
}
