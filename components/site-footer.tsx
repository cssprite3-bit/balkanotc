import Link from "next/link";
import { formatDateTime } from "@/lib/format";

export function SiteFooter({ fetchedAt, sourceName }: { fetchedAt: string; sourceName: string }) {
  return (
    <footer className="mt-16 border-t-2 border-ink bg-paper">
      <div className="wrap grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-serif text-[19px] text-ink">BalkanOTC</p>
          <p className="mt-2 max-w-[26ch] text-[13px] leading-relaxed text-muted">
            Nezavisni kripto bilten za Balkan. Analiza, vesti i edukacija bez hajpa. Portal nije menjačnica i ne
            izvršava transakcije.
          </p>
        </div>
        <nav aria-label="Navigacija u podnožju">
          <p className="kicker">Sadržaj</p>
          <ul className="mt-3 space-y-2 text-[13.5px]">
            <li><Link className="link-underline" href="/trziste">Tržište</Link></li>
            <li><Link className="link-underline" href="/vesti">Vesti i analize</Link></li>
            <li><Link className="link-underline" href="/akademija">Akademija</Link></li>
            <li><Link className="link-underline" href="/akademija/provera">Provera instinkta</Link></li>
            <li><Link className="link-underline" href="/radar">Balkanski radar</Link></li>
            <li><Link className="link-underline" href="/alati">Alati</Link></li>
          </ul>
        </nav>
        <div>
          <p className="kicker">Metodologija</p>
          <p className="mt-3 text-[13px] leading-relaxed text-muted">
            Cene i grafikoni odgovaraju preseku sa stanjem na {formatDateTime(fetchedAt)}. Izvor je označen uz
            svaki blok podataka.
          </p>
          <p className="mt-2">
            <Link className="text-[13px] link-underline" href="/metodologija">
              Cela metodologija
            </Link>
          </p>
        </div>
        <div>
          <p className="kicker">Izvori i napomene</p>
          <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-muted">
            <li>{sourceName}</li>
            <li>Tekstovi ne predstavljaju investicioni savet.</li>
            <li>Vremenska zona prikaza: Europe/Belgrade.</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="wrap flex flex-col gap-2 py-4 text-[11.5px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 BalkanOTC</p>
          <p className="font-mono uppercase tracking-[0.16em]">Tržište bez galame</p>
        </div>
      </div>
    </footer>
  );
}
