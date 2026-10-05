# Variante C: „Linie 3. Ein Brief.“ – maximal emotional

Dritte MHP-Success-Story-Microsite zum Vergleich
(A: `claude/mhp-success-story-site-q5df29`, B: `claude/mhp-success-story-video`).

## Idee
Die Seite ist ein Brief: Werkleiterin Jana Brenner schreibt ihrem Vater, der 38 Jahre an Linie 3 stand.
Die Dramaturgie führt von der Dunkelheit ins Licht.

1. **Intro**: schwarz, das Hallenlicht springt flackernd an, „Lieber Papa,“ in Handschrift, Titel „Linie 3“
2. **Sechs Briefseiten als Filmszenen** mit Kino-Balken, Bildern mit langsamem Zoom und Sätzen, die beim Scrollen erscheinen
   (Erinnerung 1986 in Schwarzweiß → E-Mail → Nacht des Zwillings → Menschen → 3:04 Uhr → Heute)
3. **2.400 Lichter**: ein Punkt pro Mensch, die Lichter gehen beim Scrollen nacheinander an
4. **Lichtblitz um 3:04 Uhr**: die Szene wird hell, als die erste E-Achse läuft
5. **Die Stimmen**: schwebende Video-Bubbles wie bei einem Videoanruf, Klick öffnet den Story-Player
6. **Finale im Licht**: „Das Licht brennt noch, Papa.“, Unterschrift „Deine Jana“, Abspann wie im Kino

Unten links zeigen Ort und Zeit der aktuellen Szene an, wo man sich im Brief befindet.

## Entwicklung
```bash
npm install
npm run dev
npm run build:preview  # eigenständige Datei preview/index.html
```

## Hinweise
- Alle Personen, Texte und Zahlen sind fiktive Platzhalter (`src/content.ts`), Fotos von Unsplash mit MHP-Verlauf als Fallback.
- Videos: bei einem Statement `src: '/video/name.mp4'` ergänzen, sonst läuft eine animierte Vorschau.
- Handschrift (Caveat) nur für Anrede und Unterschrift, sonst Hanken Grotesk als Platzhalter für die MHP-Hausschrift.
