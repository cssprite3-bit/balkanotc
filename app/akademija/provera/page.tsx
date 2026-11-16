import type { Metadata } from "next";
import Link from "next/link";
import { Quiz } from "@/components/quiz";
import { QUIZ_MAX } from "@/lib/quiz";

export const metadata: Metadata = {
  title: "Provera instinkta",
  description: "Deset tvrdnji o tržištu, novčanicima i troškovima. Tačno ili netačno, sa objašnjenjem posle svakog odgovora.",
};

export default function QuizPage() {
  return (
    <div className="wrap pb-10">
      <div className="border-b border-line pb-4 pt-6">
        <Link href="/akademija" className="kicker link-underline">← Akademija</Link>
      </div>

      <header className="max-w-reading pt-8">
        <p className="kicker text-accent">Interaktivno · {QUIZ_MAX} tvrdnji</p>
        <h1 className="mt-2 text-[32px] leading-[1.1] sm:text-[40px]">Provera instinkta</h1>
        <p className="mt-3 text-[16.5px] leading-relaxed text-muted">
          Većina grešaka ne dolazi iz neznanja, nego iz navike. Ovih deset tvrdnji postoje zato da se vidi gde navika
          pobedi mehaniku.
        </p>
      </header>

      <div className="mt-6 max-w-reading">
        <Quiz />
      </div>

      <div className="mt-6 max-w-reading border-t border-line pt-4">
        <p className="text-[12.5px] leading-relaxed text-muted">
          Rezultat se čuva samo u ovom pregledaču. Nema rang lista, nema brojača drugih korisnika i nema slanja
          odgovora — portal ne zna ko je odgovarao. Objašnjenja pokrivaju iste ideje
          kao <Link href="/akademija" className="link-underline">lekcije u Akademiji</Link>.
        </p>
      </div>
    </div>
  );
}
