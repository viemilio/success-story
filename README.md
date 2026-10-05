# 18 Monate. 2.400 Gründe. – MHP Success Story Microsite

Interaktive, magazinartige Landingpage für eine MHP-Referenz (fiktive Story: Werkleiterin Jana Brenner rettet das HALLBERG-Werk Aalen).

## Stack
- **React 19 + Vite 8 + TypeScript**
- **Tailwind CSS v4** – MHP-Farben als Design-Tokens (`src/index.css`)
- **Motion** (ehem. Framer Motion) – Reveals, Drag, Springs, Magnetic CTA
- **GSAP ScrollTrigger** – Pinning, Wort-für-Wort-Prolog, horizontale Kapitelstrecke
- **Lenis** – Smooth Scrolling
- **Three.js / React Three Fiber** – Partikel-Welle im Hero (Shader)

## Dramaturgie
Hero → Prolog (die E-Mail) → 01 Das Warum → Der Einsatz (2.400 / 71 / 18 / 0) → 02 Das Wie (vier Momente, horizontal) → Interlude-Zitat → 03 Die Wirkung (KPIs + Vorher/Nachher-Slider) → 04 Die Stimmen → Epilog „Das Licht brennt noch.“

## Entwicklung
```bash
npm install
npm run dev     # http://localhost:5173
npm run build
```

## Hinweise
- Alle Texte, Personen und Zahlen sind Platzhalter (`src/content.ts`).
- Personenfotos sind Unsplash-Platzhalter; fällt ein Bild aus, erscheint ein MHP-Verlauf.
  Bildbänder in `public/img/` stammen aus dem MHP Brand Board.
- Schrift: Hanken Grotesk als Platzhalter – die MHP-Hausschrift in `--font-sans` eintragen.
- „Darkest Blue“ ist als `#00045B` umgesetzt (gemessener Farbwert der Fläche im Board; der Beschriftungswert `#000FF5` wäre ein helles Blau).
- `prefers-reduced-motion` wird respektiert.

## Vorschau ohne Server
`preview/index.html` ist eine einzelne, eigenständige HTML-Datei (inkl. Code, Schrift und Bildern).
Einfach im Browser per Doppelklick öffnen. Neu erzeugen mit `npm run build:preview`.
