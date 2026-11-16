import type { Article } from "./types";

const AUTHORS = {
  jp: "Jelena Pavlović",
  mk: "Miloš Kovačević",
  ad: "Ana Đurić",
  nst: "Nikola Stanković",
};

export const ARTICLES: [Article, ...Article[]] = [
  {
    slug: "cena-raste-da-li-je-prati-volumen",
    kind: "analiza",
    category: "Tržište",
    title: "Cena raste. Da li je prati i volumen?",
    dek: "Rast bez obima je najčešći oblik lažnog signala. Na ovom preseku obim potvrđuje pokret, ali samo na kratkom roku.",
    author: AUTHORS.jp,
    publishedAt: "2026-11-16T08:10:00+01:00",
    readingMinutes: 7,
    sources: [
      { label: "Presek tržišta" },
      { label: "Metodologija: 24h obim, sedmodnevni prosek, odstupanje od proseka" },
    ],
    body: [
      "Kada cena poraste, prvo pitanje nije koliko, nego uz koliko prometa. Pokret koji napravi 2 odsto uz obim ispod proseka najčešće se vrati u roku od nekoliko sesija. Pokret sa istim procentom, ali uz obim iznad proseka, ima sasvim drugu statistiku trajanja.",
      "Na ovom preseku 24-časovni obim je oko 12 odsto iznad sedmodnevnog proseka. To nije ekstrem, ali je dovoljno da rast ne bude pripisan praznom tržištu. Kod ETH je slika slabija: obim je blizu proseka, pa pokret više duguje rotaciji kapitala nego novom novcu.",
      "Treba razdvojiti dve stvari koje se stalno mešaju. Prva je obim kao potvrda — da li je pokret napravljen uz učešće. Druga je obim kao iscrpljenost — da li je promet toliko narastao da je pokret već potrošio kupce. Prva se meri u odnosu na prosek, druga u odnosu na istorijske vrhove prometa za isti instrument.",
      "U tabeli ispod vidi se i treća dimenzija: odnos prometa i tržišne kapitalizacije. Instrument sa malom kapitalizacijom i velikim prometom reaguje brže na svaki priliv, ali isto tako brže i na odliv. To nije prednost ni mana — to je karakteristika koju treba znati pre nego što se veličina pozicije odredi.",
      "Zaključak je uvek isti i uvek nezanimljiv: rast je verodostojniji kada ga prati obim, ali obim sam po sebi ne govori gde će cena biti za mesec dana. Ovo je opis stanja, ne prognoza.",
    ],
    pull: "Rast bez obima je pitanje, ne odgovor.",
    related: ["spread-trosak-koji-ne-vidis", "sta-pokrece-trziste-tri-signala"],
  },
  {
    slug: "spread-trosak-koji-ne-vidis",
    kind: "analiza",
    category: "Alati",
    title: "Spread: trošak koji ne vidiš u cenovniku",
    dek: "Naknada je samo deo cene ulaska. Razlika između kupovne i prodajne strane često je veća od provizije koju platforma navodi.",
    author: AUTHORS.mk,
    publishedAt: "2026-11-15T18:40:00+01:00",
    readingMinutes: 6,
    sources: [
      { label: "Presek tržišta" },
      { label: "Definicija: spread = najbolja prodajna − najbolja kupovna cena" },
    ],
    body: [
      "Kada se kupovina izvršava po tržišnoj ceni, plaća se najbolja prodajna cena. Kada se prodaje, dobija se najbolja kupovna. Razlika između njih je spread i plaća se pri svakom ulasku i izlasku — iako je u cenovniku navedena samo provizija.",
      "Na manje likvidnim instrumentima spread je širi i menja se tokom dana. Ujutru, dok je obim mali, razlika je najveća; ista transakcija u podne košta manje. To je jedan od retkih troškova koji se može smanjiti samo izborom trenutka.",
      "Ukupan trošak se sabira: spread + provizija + eventualna konverzija. Ako platforma naplaćuje 0,1 odsto po strani, a spread iznosi 0,4 odsto, stvarni trošak ulaska i izlaska prelazi 0,5 odsto. Kod čestih transakcija to postaje najveća pojedinačna stavka, veća od same naknade.",
      "Kalkulator u odeljku Alati računa oba dela odvojeno i zajedno, sa procentualnom i fiksnom naknadom. Formule su ispisane iznad rezultata, pa se svaki broj može proveriti ručno.",
    ],
    pull: "Provizija je vidljiva. Spread nije — dok se ne izračuna.",
    related: ["cena-raste-da-li-je-prati-volumen", "prvi-novcanik-sta-cuvas"],
  },
  {
    slug: "prvi-novcanik-sta-cuvas",
    kind: "misljenje",
    category: "Akademija",
    title: "Prvi novčanik: šta čuvaš, a šta nikada ne deliš",
    dek: "Novčanik ne čuva cenu. Čuva pristup. Razlika između te dve stvari najčešće se nauči preskupo.",
    author: AUTHORS.ad,
    publishedAt: "2026-11-15T11:05:00+01:00",
    readingMinutes: 5,
    sources: [{ label: "Edukativna putanja BalkanOTC" }],
    body: [
      "Postoji razlika između vlasništva i pristupa. Vlasništvo je zapis na mreži. Pristup je mogućnost da se tim zapisom upravlja. Prvi novčanik ne uči čoveka da trguje — uči ga gde se čuva pristup i ko ga sve ima.",
      "Fraza za oporavak je pristup, ne identitet. Ko je dobije, dobija pravo da potpiše bilo koju transakciju — bez obzira na to što je vlasnik živ i uveren da je sve u redu. Zato se ne čuva u oblaku, u beleškama telefona, u poruci sebi ili na fotografiji ekrana.",
      "Drugo pravilo je dosadnije: probajte oporavak pre nego što na novčanik legne vrednost. Provera ispravnosti rezervne kopije radi se dok je rizik nula. Ako se radi prvi put tek kada nešto krene naopako, to nije kopija nego nada.",
      "Treće: odvojiti male dnevne iznose od dugoročnog dela. Novčanik koji se koristi svaki dan ima veću površinu napada od onog koji se otvara jednom mesečno. Nije paranoja — obična higijena pristupa.",
    ],
    pull: "Ako neko ima frazu, ima i potpis. Sve ostalo je administracija.",
    related: ["prvi-koraci-bez-zurbe", "spread-trosak-koji-ne-vidis"],
  },
  {
    slug: "platni-kanali-region",
    kind: "vest",
    category: "Region",
    title: "Platni kanali: šta se menja za korisnike iz regiona",
    dek: "Tri stvari određuju da li je uplata brza: radni dan banke, valuta naloga i posrednička banka na putu.",
    author: AUTHORS.nst,
    publishedAt: "2026-11-16T07:30:00+01:00",
    readingMinutes: 4,
    sources: [{ label: "Opis opštih mehanizama plaćanja" }],
    body: [
      "Kašnjenje uplate retko dolazi sa kripto strane. Najčešće nastaje u međubankarskom koraku: nalog čeka radni dan, valuta se konvertuje jednom ili dvaput, a posrednička banka naplaćuje naknadu koju pošiljalac ne vidi unapred.",
      "Praktična provera ima tri koraka. Da li nalog ide u valuti u kojoj je otvoren račun primaoca. Da li je uplata unutar radnog vremena banke. Koliko posrednika stoji između dve banke. Nijedan odgovor ne zavisi od kripto mreže.",
    ],
    pull: "Uplata ne kasni zbog mreže. Kasni zbog koraka pre nje.",
    related: ["spread-trosak-koji-ne-vidis", "radar-regulatorne-promene"],
  },
  {
    slug: "stablecoin-likvidnost-tri-metrike",
    kind: "vest",
    category: "Tržište",
    title: "Stablecoin likvidnost: tri metrike koje vredi pratiti",
    dek: "Obim, dubina i odstupanje od nominale. Ostalo je marketing.",
    author: AUTHORS.mk,
    publishedAt: "2026-11-15T20:15:00+01:00",
    readingMinutes: 3,
    sources: [{ label: "Presek tržišta" }],
    body: [
      "Obim pokazuje koliko se trguje; dubina koliko se može proći bez pomeranja cene; odstupanje od nominale koliko tržište veruje emitentu. Prve dve metrike su tehničke, treća je poverenje izraženo u broju.",
      "Odstupanje od jedan odsto samo po sebi nije drama — drama je trajanje. Kratak otklon se vraća. Dugotrajan otklon menja pretpostavke svih koji taj instrument koriste kao gotovinu.",
    ],
    pull: "Poverenje se meri trajanjem otklona, ne njegovom veličinom.",
    related: ["cena-raste-da-li-je-prati-volumen", "platni-kanali-region"],
  },
  {
    slug: "dubina-trzista-bez-terminala",
    kind: "vest",
    category: "Edukacija",
    title: "Kako čitati dubinu tržišta bez terminala",
    dek: "Knjiga naloga nije proročište. Ali pokazuje gde se posao neće izvršiti po očekivanoj ceni.",
    author: AUTHORS.jp,
    publishedAt: "2026-11-15T09:20:00+01:00",
    readingMinutes: 4,
    sources: [{ label: "Metodološko objašnjenje" }],
    body: [
      "Dubina tržišta je spisak naloga koji čekaju izvršenje. Gustina na jednoj ceni znači da tu ima kupaca ili prodavaca; praznina znači da će veći nalog proći kroz nekoliko cena pre nego što nađe parnjaka.",
      "Za korisnika bez terminala dovoljne su dve provere: koliko iznosi razlika između najboljih cena i koliko se ta razlika širi kada se pošalje nalog veći od uobičajenog. Druga provera je važnija, jer pokazuje stvarni trošak, a ne reklamni.",
    ],
    pull: "Dubina ne govori gde će cena biti. Govori šta će koštati sada.",
    related: ["spread-trosak-koji-ne-vidis", "prvi-koraci-bez-zurbe"],
  },
  {
    slug: "radar-regulatorne-promene",
    kind: "vest",
    category: "Regulativa",
    title: "Regulatorne promene: kako ih čitati bez panike",
    dek: "Najveći deo promena menja dokumentaciju, ne pravo građana. Razlika se vidi u roku primene.",
    author: AUTHORS.ad,
    publishedAt: "2026-11-14T16:00:00+01:00",
    readingMinutes: 5,
    sources: [{ label: "Opis načina čitanja propisa" }],
    body: [
      "Predlog, usvojen tekst i rok primene su tri različita stanja. Vest koja ne kaže u kojem je stanju propis ne govori ništa korisno, ma koliko bila hitna u naslovu.",
      "Drugo pitanje je obuhvat. Promena koja se odnosi na pružaoce usluga ne menja obaveze pojedinca istog dana. Zato se uz svaku stavku na Radaru navodi status: potvrđeno, najavljeno ili nepotvrđeno.",
    ],
    pull: "Predlog nije zakon. Naslov nije rok primene.",
    related: ["platni-kanali-region", "prvi-koraci-bez-zurbe"],
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export const CATEGORIES = Array.from(new Set(ARTICLES.map((a) => a.category)));

export function relatedArticles(article: Article): Article[] {
  return article.related
    .map((slug) => getArticle(slug))
    .filter((a): a is Article => Boolean(a));
}

export function latestArticles(limit: number): Article[] {
  return [...ARTICLES]
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
    .slice(0, limit);
}
