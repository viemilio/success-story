// Variante B – „Der große Gangwechsel“. Fiktiver Kunde, fiktive Personen,
// alle Texte und Zahlen sind Platzhalter für die echte Referenz.

const u = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const cover = {
  kicker: 'Transformation · HALLBERG Antriebstechnik',
  title: ['Der große', 'Gangwechsel'],
  lead:
    'Siebzig Jahre lang baute Aalen Getriebe für den Verbrenner. Dann gab der Konzern dem Werk 18 Monate. Werkleiterin Jana Brenner hat sie genutzt, um zu zeigen, wie The New Industrial aussieht.',
  portrait: u('photo-1573496359142-b8d87734a5a2', 1600),
  coverLines: [
    { big: '2.400', small: 'Jobs gesichert, kein einziger abgebaut' },
    { big: '14', small: 'Monate vom Beschluss bis zum Serienstart' },
    { big: '5', small: 'Video-Statements aus dem Werk' },
  ],
  issue: 'Ausgabe 10 / 2026',
}

/** Ein Video-Statement. `src` = echte MP4-Datei; ohne `src` läuft eine animierte Vorschau mit Untertiteln. */
export type Statement = {
  id: string
  name: string
  role: string
  topic: string
  poster: string
  src?: string
  captions: { t: number; text: string }[]
  duration: number
}

export const statements: Statement[] = [
  {
    id: 'jana',
    name: 'Jana Brenner',
    role: 'Werkleiterin, HALLBERG Aalen',
    topic: 'Warum aufgeben keine Option war',
    poster: u('photo-1573496359142-b8d87734a5a2', 1200),
    duration: 14,
    captions: [
      { t: 0, text: 'Die E-Mail kam an einem Donnerstag, 7:42 Uhr.' },
      { t: 3.2, text: 'Achtzehn Monate. Oder wir machen zu.' },
      { t: 6.4, text: 'Mein Vater stand 38 Jahre an Linie 3.' },
      { t: 9.6, text: 'Ich wollte nicht die sein, die hier das Licht ausmacht.' },
    ],
  },
  {
    id: 'kemal',
    name: 'Kemal Aydın',
    role: 'Schichtmeister, 27 Jahre im Werk',
    topic: 'Wie es ist, die eigene Linie neu zu bauen',
    poster: u('photo-1500648767791-00dcc994a43e', 1200),
    duration: 12,
    captions: [
      { t: 0, text: 'Früher kamen die Pläne fertig aus der Zentrale.' },
      { t: 3.4, text: 'Diesmal saßen wir am digitalen Zwilling und haben selbst geplant.' },
      { t: 7.6, text: 'Zum ersten Mal hat uns jemand gefragt, wie wir arbeiten wollen.' },
    ],
  },
  {
    id: 'lea',
    name: 'Lea Schuster',
    role: 'Auszubildende Mechatronik',
    topic: 'Die Generation, die im Zwilling lernt',
    poster: u('photo-1494790108377-be9c29b29330', 1200),
    duration: 11,
    captions: [
      { t: 0, text: 'Ich habe meine Linie gebaut, bevor ich sie anfassen durfte.' },
      { t: 4, text: 'Im Simulator darf man Fehler machen.' },
      { t: 7, text: 'In der Halle macht man sie dann nicht mehr.' },
    ],
  },
  {
    id: 'sophie',
    name: 'Sophie Nguyen',
    role: 'Managerin, MHP',
    topic: 'Warum wir drei Monate in der Kantine gegessen haben',
    poster: u('photo-1438761681033-6461ffad8d80', 1200),
    duration: 12,
    captions: [
      { t: 0, text: 'Wir haben nicht aus dem Projektraum heraus beraten.' },
      { t: 3.6, text: 'Wir standen in der Halle, in jeder Schicht.' },
      { t: 7.4, text: 'Irgendwann waren wir keine Berater mehr, sondern Kollegen.' },
    ],
  },
  {
    id: 'markus',
    name: 'Dr. Markus Hallberg',
    role: 'CEO, HALLBERG Antriebstechnik',
    topic: 'Was Aalen für alle elf Werke bedeutet',
    poster: u('photo-1560250097-0b93528c311a', 1200),
    duration: 12,
    captions: [
      { t: 0, text: 'Aalen sollte unser Problemwerk sein.' },
      { t: 3.4, text: 'Heute ist es unser Leitwerk.' },
      { t: 6.4, text: 'Was hier entstanden ist, rollen wir in allen elf Werken aus.' },
    ],
  },
]

export const lead = {
  dropcap: 'E',
  paragraphs: [
    'Es gibt Werke, deren Zukunft in Tabellen entschieden wird. Aalen war so ein Werk: 71 Jahre alt, 2.400 Beschäftigte, ein Produkt, dessen Ende absehbar war. Getriebe für Verbrenner. Im März 2024 setzte der Konzernvorstand eine Frist. 18 Monate, dann wird entschieden.',
    'Was dann passierte, steht in keinem Lehrbuch. Jana Brenner legte keinen Sparplan vor, sondern einen Umbauplan. Zusammen mit MHP ließ sie das gesamte Werk als digitalen Zwilling entstehen, bevor eine einzige Maschine bewegt wurde. Und sie gab den Stift an die, die das Werk am besten kennen: die Belegschaft.',
  ],
}

export const pillars = [
  {
    no: '01',
    title: 'Simulation vor Stahl',
    text: '11.000 Szenarien im digitalen Zwilling, bevor die erste Schraube gelöst wurde. Umgebaut wurde nur, was virtuell bewiesen war.',
    image: '/img/wave.webp',
  },
  {
    no: '02',
    title: 'Menschen vor Maschinen',
    text: '600 Beschäftigte haben ihre Linien selbst entworfen. Transformation wurde nicht verordnet, sondern gemeinsam gebaut.',
    image: '/img/robots.webp',
  },
  {
    no: '03',
    title: 'Tempo vor Perfektion',
    text: 'Neun Tage Umbau statt neun Wochen. Virtuelle Inbetriebnahme macht Mut zur Geschwindigkeit möglich.',
    image: '/img/glass.webp',
  },
  {
    no: '04',
    title: 'Wirkung vor Rendite',
    text: 'Minus 41 Prozent Energie pro Bauteil. Wer neu baut, baut von Anfang an effizient.',
    image: '/img/forest.webp',
  },
]

export const interview = {
  intro: 'Jana Brenner, 41, leitet das HALLBERG-Werk in Aalen seit 2021. Ein Gespräch über Mut, Zweifel und die Frage, was eine Fabrik eigentlich ist.',
  qa: [
    {
      q: 'Frau Brenner, die Frist war 18 Monate. Hatten Sie je einen Plan B?',
      a: 'Nein. Ein Plan B ist eine Einladung, Plan A nicht ganz ernst zu nehmen. Wir hatten einen Plan, ein Team und einen Zwilling, der uns jeden Morgen gesagt hat, ob wir noch auf Kurs sind.',
    },
    {
      q: 'Was hat MHP anders gemacht als andere Berater?',
      a: 'Sie haben nicht aus dem Projektraum heraus beraten. Die waren in der Nachtschicht dabei, als wir die ersten Szenarien durchgerechnet haben. Wer um drei Uhr nachts noch da ist, dem glaubt man auch tagsüber.',
    },
    {
      q: 'Man spricht von The New Industrial. Was bedeutet das für Sie?',
      a: 'Dass die Industrie nicht stirbt, sondern sich neu erfindet. Mit Software, mit Daten, aber vor allem mit Menschen, die man ernst nimmt. Aalen ist kein Sonderfall, sondern ein Prototyp.',
    },
    {
      q: 'Was würden Sie anderen Werkleitern raten?',
      a: 'Fangen Sie im Zwilling an, aber hören Sie in der Halle auf. Die beste Simulation nützt nichts, wenn die Leute an der Linie nicht mitbauen.',
    },
  ],
}

export const chart = {
  title: 'Auslastung Werk Aalen',
  unit: '%',
  points: [
    { label: 'Q1/24', v: 58 },
    { label: 'Q3/24', v: 55 },
    { label: 'Q1/25', v: 63 },
    { label: 'Q3/25', v: 81 },
    { label: 'Q1/26', v: 90 },
    { label: 'Q3/26', v: 94 },
  ],
}

export const facts = [
  { value: '2.400', label: 'Arbeitsplätze gesichert' },
  { value: '−41 %', label: 'Energie pro Bauteil' },
  { value: '9 Tage', label: 'Umbau statt 9 Wochen' },
  { value: '380 Mio. €', label: 'Neuaufträge bis 2032' },
]

export const timeline = [
  { date: 'März 2024', title: 'Die Frist', text: '18 Monate, um das Werk neu zu erfinden.' },
  { date: 'April 2024', title: 'Der Zwilling', text: 'Das Werk entsteht ein zweites Mal, virtuell. 11.000 Szenarien in einer Nacht.' },
  { date: 'Juni 2024', title: 'Die Werkstatt-Sprints', text: '600 Beschäftigte entwerfen ihre eigenen Linien.' },
  { date: 'Januar 2025', title: 'Neun Tage', text: 'Linie 3 wird umgebaut. Geplant waren neun Wochen.' },
  { date: 'Mai 2025', title: 'Der erste Rotor', text: 'Die erste E-Achse läuft vom Band, vier Monate vor der Frist.' },
  { date: '2026', title: 'Das Leitwerk', text: 'Aalen wird Blaupause für alle elf HALLBERG-Werke.' },
]

export const closing = {
  line: ['The New Industrial', 'wird nicht verkündet.', 'Es wird gebaut.'],
  sub: 'Und manchmal beginnt es in einer Getriebefabrik auf der Schwäbischen Alb.',
}

export const moreStories = [
  { title: 'Simulation-First Automation: Schaefflers Weg zu Software-Defined Manufacturing', href: 'https://www.mhp.com/de/insights/unsere-erfahrung/simulation-first-automation-schaefflers-weg-zu-software-defined-manufacturing', tag: 'Manufacturing' },
  { title: 'Alle Success Stories von MHP entdecken', href: 'https://www.mhp.com/de/insights/unsere-erfahrung', tag: 'Insights' },
]
