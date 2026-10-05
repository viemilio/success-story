// Variante C – „Linie 3. Ein Brief.“ Fiktiver Kunde, fiktive Personen,
// alle Texte und Zahlen sind Platzhalter für die echte Referenz.

const u = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

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

export const intro = {
  salutation: 'Lieber Papa,',
  title: 'Linie 3',
  sub: 'Ein Brief von Jana Brenner an ihren Vater. Und die Geschichte, wie ein 71 Jahre altes Werk in Aalen lernte, wieder zu leuchten.',
}

export type Scene = {
  id: string
  stamp: string
  place: string
  image: string
  fallback?: string
  tone?: 'memory' | 'night' | 'flash' | 'day'
  lines: string[]
  voice?: number
}

export const scenes: Scene[] = [
  {
    id: 'erinnerung',
    stamp: '1986',
    place: 'Aalen, Werkstor 2',
    image: '/img/robots.webp',
    tone: 'memory',
    lines: [
      'ich war sieben, als du mich das erste Mal mitgenommen hast.',
      'Linie 3. Der Lärm, der Geruch von Öl, deine Hand auf meiner Schulter.',
      'Du hast gesagt: „Ein Werk ist nicht die Halle. Es sind die Leute, die morgens das Licht anmachen.“',
    ],
  },
  {
    id: 'mail',
    stamp: '14.03.2024 · 07:42',
    place: 'Büro der Werkleitung',
    image: '/img/darkest.webp',
    tone: 'night',
    lines: [
      'An einem Donnerstag kam die E-Mail.',
      'Achtzehn Monate. Dann wird entschieden, ob es Aalen noch gibt.',
      'Ich habe lange aus dem Fenster auf Linie 3 geschaut. Und dann habe ich nicht aufgegeben.',
    ],
  },
  {
    id: 'zwilling',
    stamp: '09.04.2024 · 02:17',
    place: 'Halle 4, Nachtschicht',
    image: '/img/wave.webp',
    tone: 'night',
    lines: [
      'Wir haben uns Hilfe geholt. Die Leute von MHP blieben nachts mit uns in der Halle.',
      'Sie haben unser Werk ein zweites Mal gebaut, aus Daten. Einen digitalen Zwilling.',
      'In einer Nacht liefen 11.000 Szenarien. Am Morgen wusste ich: Es geht.',
    ],
  },
  {
    id: 'menschen',
    stamp: '17.06.2024 · 14:00',
    place: 'Halle 2, Werkstatt-Sprint',
    image: '/img/event.webp',
    tone: 'night',
    voice: 1,
    lines: [
      'Und dann haben wir das gemacht, was du immer wolltest: Wir haben die Leute gefragt.',
      'Sechshundert Kolleginnen und Kollegen haben ihre eigenen Linien entworfen.',
      'Kemal hat geweint, Papa. Er sagt, das hat ihn in 27 Jahren noch nie jemand gefragt.',
    ],
  },
  {
    id: 'rotor',
    stamp: '22.05.2025 · 03:04',
    place: 'Linie 3',
    image: '/img/glass.webp',
    tone: 'flash',
    lines: [
      'Um 3:04 Uhr lief die erste E-Achse vom Band. An deiner Linie.',
      'Vier Monate vor der Frist.',
      'Niemand ist nach Hause gegangen.',
    ],
  },
  {
    id: 'heute',
    stamp: 'Heute',
    place: 'Aalen',
    image: '/img/forest.webp',
    tone: 'day',
    lines: [
      'Heute sagen sie, wir formen The New Industrial. Die neue Industrie.',
      'Du hättest nur gelacht und gesagt: „Wir machen halt weiter.“',
      'Aber es ist mehr als das. Wir haben bewiesen, dass Zukunft hier gebaut wird. Nicht anderswo.',
    ],
  },
]

export const people = {
  count: 2400,
  title: '2.400 Lichter',
  text: 'Jeder Punkt ist ein Mensch, der am nächsten Montag wieder zur Arbeit gehen konnte. Kein einziger Arbeitsplatz ging verloren.',
  facts: [
    { value: '14', label: 'Monate bis zum Serienstart' },
    { value: '−41 %', label: 'Energie pro Bauteil' },
    { value: '380 Mio. €', label: 'Neuaufträge bis 2032' },
  ],
}

export const ending = {
  lines: ['Das Licht brennt noch, Papa.', 'Und es wird nicht mehr ausgehen.'],
  signature: 'Deine Jana',
}

export const credits = [
  { role: 'Protagonistin', name: 'Jana Brenner, Werkleiterin' },
  { role: 'Mit', name: 'Kemal Aydın · Lea Schuster · und 2.398 weiteren' },
  { role: 'Kunde', name: 'HALLBERG Antriebstechnik, Werk Aalen' },
  { role: 'Transformationspartner', name: 'MHP – A Porsche Company' },
  { role: 'Im Zeichen von', name: 'The New Industrial' },
]

export const moreStories = [
  { title: 'Simulation-First Automation: Schaefflers Weg zu Software-Defined Manufacturing', href: 'https://www.mhp.com/de/insights/unsere-erfahrung/simulation-first-automation-schaefflers-weg-zu-software-defined-manufacturing', tag: 'Manufacturing' },
  { title: 'Alle Success Stories von MHP entdecken', href: 'https://www.mhp.com/de/insights/unsere-erfahrung', tag: 'Insights' },
]
