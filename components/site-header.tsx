"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { Masthead } from "./wordmark";
import { MarketBar } from "./market-bar";
import { SearchDialog } from "./search-dialog";
import { WatchCount } from "./watch-count";
import type { Asset } from "@/lib/types";

const NAV = [
  { href: "/trziste", label: "Tržište" },
  { href: "/vesti", label: "Vesti" },
  { href: "/akademija", label: "Akademija" },
  { href: "/radar", label: "Balkanski radar" },
  { href: "/alati", label: "Alati" },
];

export function SiteHeader({
  assets,
  eurPerUsd,
  fetchedAt,
}: {
  assets: Asset[];
  eurPerUsd: number;
  fetchedAt: string;
}) {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <MarketBar assets={assets} eurPerUsd={eurPerUsd} fetchedAt={fetchedAt} />
      <div className="wrap">
        <Masthead />
        <div className="flex items-center justify-between gap-4 py-2">
          <nav aria-label="Glavna navigacija" className="hidden sm:block">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-1">
              {NAV.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`text-[13px] tracking-[0.01em] transition-colors duration-160 hover:text-accent ${
                        active ? "text-accent" : "text-ink"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="flex items-center gap-1 sm:gap-2">
            <button onClick={() => setSearchOpen(true)} className="btn-quiet" aria-label="Otvori pretragu">
              <Search className="h-4 w-4" aria-hidden="true" />
              <span className="hidden md:inline">Pretraga</span>
            </button>
            <Link href="/lista" className="btn-quiet">
              Lista <WatchCount />
            </Link>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="btn-quiet sm:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobilna-navigacija"
              aria-label="Meni"
            >
              {menuOpen ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
            </button>
          </div>
        </div>
        {menuOpen ? (
          <nav id="mobilna-navigacija" aria-label="Mobilna navigacija" className="border-t border-line pb-3 sm:hidden">
            <ul className="flex flex-col">
              {NAV.map((item) => (
                <li key={item.href} className="border-b border-line/70">
                  <Link href={item.href} onClick={() => setMenuOpen(false)} className="block py-3 text-[15px]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
