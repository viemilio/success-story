# Variante B: „Der große Gangwechsel“ – Video-Statements

Alternative MHP-Success-Story-Microsite mit Video-Statements und Magazin-Aufmachung
(Variante A „18 Monate. 2.400 Gründe.“ liegt auf `claude/mhp-success-story-site-q5df29`).

## Experience
- **Video-Hero**: Statement der Protagonistin läuft stumm als Bühne, Logo-Lockup HALLBERG × MHP, Headline im Magazinstil
- **Video-Wand**: fünf Statements im Hochformat, Hover = stumme Vorschau, Klick = Vollbild-Player im Stories-Format
  (tippen weiter/zurück, halten = Pause, ← → / Leertaste / Esc)
- **Story als Bento-Raster**: Steckbrief, Kennzahlen-Kacheln, Text, Zitat
- **Vier Prinzipien** als aufklappende Bildkarten
- **Interview als Chat-Verlauf** mit „sticky“ Video-Statement
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
