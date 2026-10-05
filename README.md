# Variante B: „Der große Gangwechsel“ – The New Industrial

Alternative MHP-Success-Story-Microsite mit Video-Statements und Magazin-Aufmachung
(Variante A „18 Monate. 2.400 Gründe.“ liegt auf `claude/mhp-success-story-site-q5df29`).

## Experience
- **Cover-Hero** wie eine Magazin-Titelseite: Kampagnen-Masthead „The New Industrial“, Kundenlogo (HALLBERG), Titelzeile, Cover-Lines
- **Video-Wand**: fünf Statements im Hochformat, Hover = stumme Vorschau, Klick = Vollbild-Player im Stories-Format
  (tippen weiter/zurück, halten = Pause, ← → / Leertaste / Esc)
- **Redaktioneller Einstieg** mit Steckbrief, Initial und Pull-Quote
- **Vier Prinzipien**, mit denen der Kunde The New Industrial formt (Bild folgt dem Cursor)
- **Interview** im Magazin-Stil mit „sticky“ Video-Statement
- **Bilanz**: Kurve zeichnet sich beim Scrollen, Kennzahlen
- **Fahrplan**-Timeline und Schluss-Statement

## Videos einsetzen
In `src/content.ts` bei einem Statement `src: '/video/name.mp4'` ergänzen (Datei nach `public/video/`).
Untertitel (`captions`) und Länge (`duration`) laufen dann synchron zum Video.
Ohne `src` zeigt der Player eine animierte Vorschau (Ken-Burns-Effekt auf dem Foto, dazu Untertitel).

## Entwicklung
```bash
npm install
npm run dev            # http://localhost:5173
npm run build:preview  # eigenständige Datei preview/index.html
```

## Hinweise
- Kunde, Logo, Personen, Zitate und Zahlen sind fiktive Platzhalter. Fotos von Unsplash, mit MHP-Verlauf als Fallback.
- „The New Industrial“ ist hier rein typografisch umgesetzt – bei Bedarf durch das offizielle Kampagnen-Artwork ersetzen.
- Schrift: Hanken Grotesk als Platzhalter für die MHP-Hausschrift (`--font-sans`).
