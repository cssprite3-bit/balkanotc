"use client";

import { useCallback, useEffect, useState } from "react";

const WATCH_KEY = "balkanotc:watchlist";
const PROGRESS_KEY = "balkanotc:progress";
const EVENT = "balkanotc:store";

function read(key: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x): x is string => typeof x === "string");
  } catch {
    return [];
  }
}

function write(key: string, value: string[]): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event(EVENT));
  } catch {
    /* storage disabled: the UI keeps working for this session */
  }
}

function useStoredList(key: string) {
  const [items, setItems] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => {
      setItems(read(key));
      setReady(true);
    };
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [key]);

  const has = useCallback((id: string) => items.includes(id), [items]);

  const toggle = useCallback(
    (id: string) => {
      const current = read(key);
      const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
      write(key, next);
    },
    [key],
  );

  const add = useCallback(
    (id: string) => {
      const current = read(key);
      if (!current.includes(id)) write(key, [...current, id]);
    },
    [key],
  );

  return { items, ready, has, toggle, add };
}

export function useWatchlist() {
  const { items, ready, has, toggle } = useStoredList(WATCH_KEY);
  return { symbols: items, ready, has, toggle };
}

export function useReadingProgress() {
  const { items, ready, has, add } = useStoredList(PROGRESS_KEY);
  return { completed: items, ready, has, markRead: add };
}
