"use client";

import { useWatchlist } from "@/lib/local-store";

export function WatchCount() {
  const { symbols, ready } = useWatchlist();
  if (!ready || symbols.length === 0) return null;
  return (
    <span className="num ml-0.5 inline-flex min-w-[18px] justify-center border border-line px-1 text-[10.5px] leading-[16px] text-muted">
      {symbols.length}
    </span>
  );
}
