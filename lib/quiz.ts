export interface QuizItem {
  id: string;
  statement: string;
  answer: boolean;
  explanation: string;
  /** Lesson that covers the same idea. */
  lesson?: string;
}

/**
 * Ten statements that separate mechanics from intuition. Every explanation is
 * self-contained: no external source is claimed, and none of the numbers here
 * depend on the demo market snapshot.
 */
export const QUIZ: QuizItem[] = [
  {
    id: "novac-ulazi",
    statement: "Ako cena poraste 10 odsto, to znači da je na tržište ušlo 10 odsto novog novca.",
    answer: false,
    explanation:
      "Cena je rezultat poslednje transakcije, ne količine uplaćenog novca. Na tankom tržištu i mali nalog pomera cenu, iako novi kapital nije ušao.",
    lesson: "cena-nije-vrednost",
  },
  {
    id: "obim-potvrda",
    statement: "Obim iznad proseka povećava verovatnoću da pokret nije slučajan.",
    answer: true,
    explanation:
      "Kada rast prati obim, u pokretu je učestvovalo više naloga. To je potvrda učešća, ali ne i tvrdnja koliko će pokret trajati.",
    lesson: "obim-potvrdjuje-pokret",
  },
  {
    id: "kapitalizacija",
    statement: "Tržišna kapitalizacija je iznos koji vlasnik može da podigne prodajom svega.",
    answer: false,
    explanation:
      "Kapitalizacija je cena pomnožena količinom u opticaju. Prodaja svih jedinica oborila bi cenu, pa je stvarni iznos koji se može podići manji.",
    lesson: "cena-nije-vrednost",
  },
  {
    id: "spread-nula-provizija",
    statement: "Spread se plaća i kada platforma ne naplaćuje nikakvu proviziju.",
    answer: true,
    explanation:
      "Spread je razlika između najbolje kupovne i najbolje prodajne cene. Plaća se pri svakom izvršenju, bez obzira na cenovnik provizija.",
    lesson: "spread-i-stvarni-trosak",
  },
  {
    id: "fraza-potpis",
    statement: "Ko ima frazu za oporavak, ima i mogućnost da potpiše transakciju.",
    answer: true,
    explanation:
      "Fraza vraća pristup ključu, a ključ potpisuje. Zato se fraza ne čuva u oblaku, u beleškama telefona ni na fotografiji ekrana.",
    lesson: "rezervna-kopija-koja-radi",
  },
  {
    id: "berza-kontrola",
    statement: "Sredstva koja stoje na berzi su u isključivoj kontroli korisnika.",
    answer: false,
    explanation:
      "Berza tehnički drži pristup sredstvima. Korisnik ima pravo na isplatu, ne ključ. To nije skriveno pravilo, samo se retko izgovara.",
    lesson: "prvi-koraci-bez-zurbe",
  },
  {
    id: "dca-definicija",
    statement: "DCA znači da se isti iznos ulaže u redovnim intervalima, bez obzira na cenu.",
    answer: true,
    explanation:
      "Poenta je doslednost, ne tajming. DCA ne garantuje prinos i ne uklanja rizik — menja samo način na koji se pozicija gradi.",
  },
  {
    id: "stablecoin-otklon",
    statement: "Odstupanje stablecoina od nominale opasno je samo ako je veliko.",
    answer: false,
    explanation:
      "Kratak otklon se vraća; dugotrajan menja pretpostavke svih koji taj instrument koriste kao gotovinu. Trajanje je važnije od veličine.",
  },
  {
    id: "likvidnost",
    statement: "Na dubljem tržištu veći nalog prolazi uz manje pomeranje cene.",
    answer: true,
    explanation:
      "Dubina je količina koja može da se prođe bez pomeranja cene. Zato se klizni trošak meri na konkretnom nalogu, a ne prosekom.",
    lesson: "spread-i-stvarni-trosak",
  },
  {
    id: "analiza-misljenje",
    statement: "Analiza i mišljenje su ista vrsta teksta, samo je mišljenje kraće.",
    answer: false,
    explanation:
      "Analiza objašnjava mehanizam i pokazuje pretpostavke. Mišljenje je potpisan stav jednog autora. Na ovom portalu to su odvojene oznake.",
  },
];

export const QUIZ_MAX = QUIZ.length;
export const QUIZ_BEST_KEY = "balkanotc:quiz-best";

export function verdictFor(score: number): { title: string; detail: string } {
  if (score >= 9) {
    return {
      title: "Instinkt je istreniran.",
      detail: "Ostalo je da se ista pravila primenjuju dosledno, ne samo da se znaju.",
    };
  }
  if (score >= 6) {
    return {
      title: "Osnove stoje, dve stvari štekaju.",
      detail: "Pogledaj objašnjenja ispod — greške su obično u istoj porodici pojmova.",
    };
  }
  if (score >= 3) {
    return {
      title: "Vredi proći putanju Osnove ponovo.",
      detail: "Prve dve lekcije pokrivaju većinu tvrdnji na kojima se ljudi najčešće spotaknu.",
    };
  }
  return {
    title: "Počni od lekcije 01.",
    detail: "Bez žurbe: prva lekcija objašnjava šta se tačno kupuje i šta se čuva.",
  };
}
