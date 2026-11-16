import type { Term } from "./types";

export const GLOSSARY: Term[] = [
  {
    term: "Spread",
    definition: "Razlika između najbolje kupovne i najbolje prodajne cene. Plaća se pri svakom izvršenju.",
    aliases: ["marža", "razlika"],
  },
  {
    term: "Likvidnost",
    definition: "Mogućnost da se pozicija zatvori bez značajnog pomeranja cene.",
    aliases: ["dubina tržišta"],
  },
  {
    term: "Obim (volumen)",
    definition: "Količina imovine koja je promenila vlasnika u posmatranom periodu.",
    aliases: ["volumen", "promet"],
  },
  {
    term: "Klizni trošak",
    definition: "Razlika između očekivane i stvarno dobijene cene kada nalog prolazi kroz više nivoa knjige.",
    aliases: ["slippage", "klizanje"],
  },
  {
    term: "Tržišna kapitalizacija",
    definition: "Cena pomnožena količinom u opticaju. Nije iznos koji se može podići prodajom.",
    aliases: ["market cap"],
  },
  {
    term: "Fraza za oporavak",
    definition: "Niz reči koje vraćaju pristup novčaniku. Ko ih ima, može da potpiše transakciju.",
    aliases: ["seed", "recovery phrase", "fraza"],
  },
  {
    term: "Kustodijalno čuvanje",
    definition: "Sredstva drži treća strana, koja ima tehnički pristup. Korisnik ima pravo, ne ključ.",
    aliases: ["custody"],
  },
  {
    term: "Stablecoin",
    definition: "Instrument čija se cena vezuje za referentnu vrednost, najčešće valutu.",
    aliases: ["stablekoin"],
  },
  {
    term: "Nalog (order)",
    definition: "Uputstvo za kupovinu ili prodaju. Tržišni se izvršava odmah, limitirajući samo po zadatoj ceni.",
    aliases: ["order"],
  },
  {
    term: "Korekcija",
    definition: "Pad cene unutar postojećeg trenda. Nije isto što i promena strukture tržišta.",
    aliases: ["pullback"],
  },
];
