import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap py-16">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">404</p>
      <h1 className="mt-3 max-w-[24ch] text-[34px] leading-tight sm:text-[42px]">Ova stranica ne postoji.</h1>
      <p className="mt-3 max-w-[56ch] text-[15px] leading-relaxed text-muted">
        Adresa je ili pogrešno ukucana ili je tekst uklonjen. Pretraga radi lokalno i pokriva članke, lekcije i rečnik.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <Link href="/" className="btn">Početna</Link>
        <Link href="/vesti" className="btn-quiet">Vesti i analize</Link>
        <Link href="/akademija" className="btn-quiet">Akademija</Link>
        <Link href="/trziste" className="btn-quiet">Tržište</Link>
      </div>
    </div>
  );
}
