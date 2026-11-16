import type { Lesson, Track, TrackId } from "./types";

export const TRACKS: Track[] = [
  { id: "osnove", title: "Osnove", blurb: "Šta je zapis, šta je novčanik i zašto cena nije vrednost." },
  { id: "trziste", title: "Razumevanje tržišta", blurb: "Obim, spread, likvidnost i razlika između signala i šuma." },
  { id: "novcanici", title: "Novčanici i bezbednost", blurb: "Pristup, rezervne kopije i najčešće greške pri čuvanju." },
];

export const LESSONS: Lesson[] = [
  {
    slug: "prvi-koraci-bez-zurbe",
    number: 1,
    track: "osnove",
    title: "Prvi koraci bez žurbe",
    summary: "Šta zapravo kupujete, šta čuvate i šta nije vaša odgovornost.",
    minutes: 6,
    level: "Uvod",
    body: [
      "Kripto imovina je zapis u javnoj knjizi. Ono što posedujete nije fajl na računaru, nego pravo da potpišete transakciju koja menja stanje tog zapisa. Sve ostalo — aplikacija, berza, novčanik — samo je način da se to pravo iskoristi.",
      "Iz toga sledi prva praktična posledica: gubitak pristupa nije tehnički kvar nego gubitak imovine. Nema službe za podršku koja vraća pristup, jer bi takva služba istovremeno mogla da ga oduzme svima.",
      "Druga posledica je da se pojmovi ne mešaju. Berza je mesto gde se trguje, čuva i evidencija. Novčanik je alat za potpisivanje. Ako sredstva stoje na berzi, pristup ima berza. To nije skriveno — samo se retko izgovara.",
      "Zato prvi korak nije kupovina. Prvi korak je odluka gde će pristup biti i koliko ga ljudi ima.",
    ],
  },
  {
    slug: "cena-nije-vrednost",
    number: 2,
    track: "osnove",
    title: "Cena nije vrednost",
    summary: "Zašto poslednja transakcija opisuje jedno, a ne drugo.",
    minutes: 5,
    level: "Uvod",
    body: [
      "Cena je rezultat poslednjeg susreta ponude i tražnje. Ako je obim mali, dovoljan je jedan nalog da se pomeri za nekoliko procenata. To ne znači da je celokupna količina te imovine promenila vrednost — znači da je jedna transakcija bila skuplja ili jeftinija od prethodne.",
      "Vrednost je pitanje koje cena ne odgovara: koliko novca bi bilo potrebno da se sve proda po istoj ceni. Odgovor je uvek manji od tržišne kapitalizacije, jer bi prodaja pomerila cenu nadole.",
      "Praktična korist od ovoga je jednostavna. Kada se gleda promena, korisno je gledati i obim. Kada se gleda veličina tržišta, korisno je znati da je broj na sajtu proizvod cene i količine u opticaju, a ne iznos koji neko može da podigne.",
    ],
  },
  {
    slug: "obim-potvrdjuje-pokret",
    number: 3,
    track: "trziste",
    title: "Obim potvrđuje pokret",
    summary: "Kako razlikovati rast sa učešćem od rasta bez njega.",
    minutes: 7,
    level: "Osnovni",
    body: [
      "Obim je količina koja je promenila vlasnika u datom periodu. Kada cena raste uz obim iznad proseka, rast je napravljen uz učešće. Kada raste uz obim ispod proseka, pokret je napravilo malo naloga — i tako može i da se poništi.",
      "Metodologija je dosledna: uzme se obim za period, uporedi sa prosekom istog perioda za prethodnih sedam intervala, pa se izrazi kao odstupanje u procentima. Bez tog odnosa broj prometa ne znači ništa, jer je 500 miliona mnogo za jednu imovinu i malo za drugu.",
      "Granica je važna. Potvrda obimom povećava verovatnoću da pokret nije slučajan, ali ne govori koliko će trajati. To je razlika između opisivanja i predviđanja, i ovaj portal ostaje na prvom.",
    ],
  },
  {
    slug: "spread-i-stvarni-trosak",
    number: 4,
    track: "trziste",
    title: "Spread i stvarni trošak ulaska",
    summary: "Zašto provizija od 0,1 odsto može da košta više od jedan odsto.",
    minutes: 6,
    level: "Osnovni",
    body: [
      "Spread je razlika između najbolje kupovne i najbolje prodajne cene. Plaća se pri svakom izvršenju, čak i kada je provizija nula. Na manje likvidnim instrumentima može biti veći od svake naknade iz cenovnika.",
      "Ukupan trošak je zbir: spread + provizija + konverzija. Ako se pozicija drži kratko, zbir se deli na mali broj dana i postaje dominantan. Ako se drži godinu dana, isti iznos je zanemarljiv.",
      "Zato pitanje „kolika je provizija“ nije dovoljno. Pitanje je koliki je ukupan trošak za vaš tip transakcije — i to je jedino što kalkulator u odeljku Alati računa.",
    ],
  },
  {
    slug: "rezervna-kopija-koja-radi",
    number: 5,
    track: "novcanici",
    title: "Rezervna kopija koja radi",
    summary: "Kopija se ne proverava kada zatreba, nego pre nego što zatreba.",
    minutes: 7,
    level: "Srednji",
    body: [
      "Rezervna kopija novčanika je niz reči koje vraćaju pristup. Ako je zapisana pogrešnom rečju, pogrešnim redom ili na mestu dostupnom drugima, više nije kopija — postaje rizik.",
      "Provera se radi tako što se pristup vrati na prazan uređaj dok na novčaniku još nema vrednosti. Ako se fraza prihvati i adresa se poklapa, kopija je ispravna. Ako se ne poklapa, greška je pronađena dok ništa nije izgubljeno.",
      "Čuvanje treba da bude dosadno: offline, na dva mesta, bez fotografija i bez cloud sinhronizacije. Dosada je ovde funkcionalna karakteristika, ne nedostatak mašte.",
    ],
  },
];

export function lessonsByTrack(track: TrackId): Lesson[] {
  return LESSONS.filter((l) => l.track === track).sort((a, b) => a.number - b.number);
}

export function getLesson(slug: string): Lesson | undefined {
  return LESSONS.find((l) => l.slug === slug);
}

export const TOTAL_MINUTES = LESSONS.reduce((sum, l) => sum + l.minutes, 0);

