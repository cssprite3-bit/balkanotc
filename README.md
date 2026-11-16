# BalkanOTC

Nezavisni kripto bilten za Balkan — „Tržište bez galame."

Next.js (App Router) + TypeScript (strict) + Tailwind + Motion-free CSS entrance + Recharts + Lucide.

## Pokretanje

```bash
npm install
npm run dev        # http://localhost:3000
```

Produkcija:

```bash
npm run build
npm run start
```

Provere:

```bash
npm run typecheck  # tsc --noEmit
npm run lint       # next lint
```

## Struktura

```
app/
  layout.tsx            fontovi (Newsreader, IBM Plex Sans/Mono, latin-ext), metadata, skip-link
  page.tsx              početna: traka → masthead → analiza + presek → tri uzroka → vesti → radar → akademija
  trziste/              tabela: sortiranje, pretraga, EUR/USD, lista praćenja
  vesti/                lista sa filterima (tip + kategorija) i /vesti/[slug]
  akademija/            3 putanje, numerisane lekcije, rečnik i /akademija/[slug]
  radar/                država + tema filter, status provere
  alati/                DCA scenario + kalkulator troška
  lista/                lokalna lista praćenja
  akademija/provera/    „Provera instinkta" — interaktivni kviz sa objašnjenjima
  metodologija/         izvor podataka, izračuni, granice tumačenja
components/             masthead, traka, tabela, grafikon, filteri, kalkulatori, rečnik
lib/
  types.ts              tipovi (Asset, Article, Lesson, RadarItem, Term…)
  markets.ts            deterministički demo presek + serije za 24h/7d/30d
  articles.ts           tekstovi (vest / analiza / mišljenje), izvori, povezani
  lessons.ts            lekcije po putanjama
  glossary.ts           rečnik pojmova
  radar.ts              regionalne stavke sa statusom
  search.ts             lokalna pretraga (članci + lekcije + pojmovi, bez dijakritike)
  format.ts             Intl formatiranje, sr-Latn-RS, Europe/Belgrade
  local-store.ts        localStorage: lista praćenja + napredak kroz lekcije
```

## Podaci

Nema API ključa i nema mrežnog poziva za cene. Sve vrednosti su deterministička simulacija
zamrznuta na `SNAPSHOT_ISO` (vidi `lib/markets.ts`) i svuda su označene kao **Demo podaci**.

- 24h / 7d / 30d su tri odvojena niza (različit broj uzoraka, korak, seme i amplituda), a svaki
  period ima zadatu promenu, pa se procenat u traci i procenat na grafiku poklapaju.
- Prikaz u evrima koristi fiksni kurs `EUR_PER_USD` iz `lib/markets.ts`.
- Tekstovi, autori i radarske stavke su demonstracioni; nigde se ne tvrdi da opisuju stvarne
  događaje, zakone, licence ni poreske stope.

Detalji su na strani `/metodologija`.

## Interaktivno

- **Provera instinkta** (`/akademija/provera`): 10 tvrdnji, tačno/netačno, objašnjenje posle svakog
  odgovora, rezultat i najbolji skor u `localStorage`. Radi i tastaturom (1/2 ili T/N, Enter za dalje).
- **Lista praćenja** (`/lista`) i napredak kroz lekcije — lokalno, bez naloga.
- **Kalkulatori** (`/alati`) — DCA scenario i ukupan trošak transakcije, oba sa prikazanom formulom.

## Pristupačnost i ponašanje

- Sadržaj je vidljiv bez animacije: ulaz je čist CSS (`animation-fill-mode: both`), a
  `prefers-reduced-motion` ga isključuje.
- Fokus je vidljiv, polja imaju labele, tabela ima svoj horizontalni skrol, a rast/pad je označen
  znakom i tekstom, ne samo bojom.
- Grafikon ima tekstualni opis ispod sebe (najviši nivo, promena, skaliranje).
- Nijedna stranica nema horizontalni preliv na 360, 768 i 1440 px.

## Napomena

`public/preview.html` je pomoćna stranica za pregled širine (`?w=360&h=1400&path=/`) — nije deo
sadržaja portala i može se obrisati bez uticaja na sajt.
