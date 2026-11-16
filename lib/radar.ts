import type { RadarItem } from "./types";

export const RADAR: RadarItem[] = [
  {
    id: "rs-placanja-nalozi",
    country: "Srbija",
    topic: "Plaćanja",
    title: "Nalozi u dinarima i stranoj valuti: gde najčešće zastane uplata",
    dek: "Koraci kroz koje nalog prolazi, bez tvrdnji o rokovima pojedinih banaka.",
    date: "2026-11-14",
    status: "potvrdjeno",
    source: "Opis opštih mehanizama plaćanja",
  },
  {
    id: "hr-regulativa-obuhvat",
    country: "Hrvatska",
    topic: "Regulativa",
    title: "Obuhvat propisa: obaveze pružalaca i obaveze korisnika",
    dek: "Zašto ista promena ne znači isto za registrovanog pružaoca i za korisnika.",
    date: "2026-11-12",
    status: "najavljeno",
    source: "Opis čitanja propisa",
  },
  {
    id: "si-infrastruktura-cvorista",
    country: "Slovenija",
    topic: "Infrastruktura",
    title: "Mrežna čvorišta u regionu: lokacija menja cenu prenosa",
    dek: "Kako fizička putanja podataka utiče na vreme potvrde i trošak transakcije.",
    date: "2026-11-11",
    status: "potvrdjeno",
    source: "Tehničko objašnjenje",
  },
  {
    id: "ba-obrazovanje-radionice",
    country: "Bosna i Hercegovina",
    topic: "Obrazovanje",
    title: "Radionice o bezbednosti novčanika: šta donose, a šta ne",
    dek: "Obrazovni format ne zamenjuje ličnu proveru pristupa, ali smanjuje broj osnovnih grešaka.",
    date: "2026-11-09",
    status: "nepotvrdjeno",
    source: "Najava bez potvrde organizatora",
  },
  {
    id: "me-trziste-berze",
    country: "Crna Gora",
    topic: "Tržište",
    title: "Lokalne berze i dubina tržišta: mali obim, veliki spread",
    dek: "Na malim tržištima razlika između najboljih cena raste brže od provizije.",
    date: "2026-11-07",
    status: "potvrdjeno",
    source: "Presek tržišta",
  },
  {
    id: "mk-placanja-prasak",
    country: "Severna Makedonija",
    topic: "Plaćanja",
    title: "Gotovinske uplate i digitalni nalozi: gde se lome rokovi",
    dek: "Zašto uplata koja izgleda trenutna na ekranu nije ista stvar kao nalog u banci.",
    date: "2026-11-05",
    status: "najavljeno",
    source: "Opis mehanizama",
  },
];

export const RADAR_COUNTRIES = Array.from(new Set(RADAR.map((r) => r.country)));
export const RADAR_TOPICS = Array.from(new Set(RADAR.map((r) => r.topic)));

