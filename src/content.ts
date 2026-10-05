// Die Story. Fiktiver Kunde, fiktive Protagonistin – alle Texte, Zahlen und
// Personen sind Platzhalter für die echte Referenz.

const u = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const hero = {
  client: 'HALLBERG Antriebstechnik',
  site: 'Werk Aalen',
  protagonist: 'Jana Brenner',
  role: 'Werkleiterin',
  portrait: u('photo-1573496359142-b8d87734a5a2', 1200),
}

export const chapters = [
  { id: 'prolog', label: 'Prolog' },
  { id: 'warum', label: 'Das Warum' },
  { id: 'einsatz', label: 'Der Einsatz' },
  { id: 'wie', label: 'Das Wie' },
  { id: 'wirkung', label: 'Die Wirkung' },
  { id: 'stimmen', label: 'Die Stimmen' },
  { id: 'finale', label: 'Finale' },
] as const

export const prologue =
  'Am 14. März 2024, um 7:42 Uhr, öffnet Jana Brenner eine E-Mail. Betreff: *Standortentscheidung Aalen.* Darin steht eine Frist. *18 Monate,* um ein Werk, das seit 71 Jahren Getriebe für Verbrenner baut, in eine Fabrik für E-Antriebe zu verwandeln. Oder es zu *schließen.*'

export const why = {
  quote: 'Ich wollte nicht die sein, die hier das Licht ausmacht.',
  paragraphs: [
    'Jana Brenner ist in Aalen aufgewachsen, drei Straßen vom Werkstor entfernt. Ihr Vater stand 38 Jahre an Linie 3. Sie kennt den Geruch von Kühlschmierstoff, bevor sie lesen kann.',
    'Als die E-Mail kommt, rechnet niemand damit, dass das Werk überlebt. Der Business Case ist klar, die Zahlen sind klar. Nur Jana sieht etwas anderes: keine Halle voller Maschinen, sondern 2.400 Menschen, die mehr können, als man ihnen zutraut.',
  ],
  image: u('photo-1581091226825-a6a2a5aee158', 1400),
  caption: 'Jana Brenner in Halle 4, wo früher Getriebegehäuse entstanden.',
}

export const stakes = [
  { value: '2.400', unit: 'Menschen', line: 'deren Arbeitsplatz an einer einzigen Entscheidung hing.', tone: 'darkest' },
  { value: '71', unit: 'Jahre', line: 'Werksgeschichte. Drei Generationen. Eine Stadt.', tone: 'mhp' },
  { value: '18', unit: 'Monate', line: 'für eine Transformation, die üblicherweise vier Jahre dauert.', tone: 'vital' },
  { value: '0', unit: 'Plan B', line: 'Jana hatte keinen. Und wollte auch keinen.', tone: 'kiwi' },
] as const

export const turns = [
  {
    no: '01',
    time: 'April 2024 · 02:17 Uhr',
    title: 'Die Nacht, in der das Werk zweimal existierte.',
    text: 'Bevor eine einzige Maschine bewegt wurde, baute das MHP-Team das gesamte Werk als digitalen Zwilling nach. In einer Nacht liefen 11.000 Szenarien durch. Am Morgen wusste Jana, was niemand für möglich hielt: Es geht.',
    stat: '11.000',
    statLabel: 'simulierte Szenarien',
    image: '/img/wave.webp',
  },
  {
    no: '02',
    time: 'Juni 2024 · Halle 2',
    title: 'Als die Meister den Stift übernahmen.',
    text: 'Keine Folien aus der Zentrale. Stattdessen: 600 Mitarbeitende, die ihre neue Linie selbst am Zwilling entwarfen. „Zum ersten Mal hat uns jemand gefragt, wie wir arbeiten wollen“, sagt Schichtmeister Kemal Aydın.',
    stat: '600',
    statLabel: 'Co-Designer aus der Belegschaft',
    image: '/img/robots.webp',
  },
  {
    no: '03',
    time: 'Januar 2025 · Linie 3',
    title: 'Der Tag, an dem Linie 3 stillstand. Absichtlich.',
    text: 'Virtuell in Betrieb genommen, real in Rekordzeit umgebaut: Die Linie, an der Janas Vater 38 Jahre stand, war nach neun Tagen wieder in Betrieb. Geplant waren neun Wochen.',
    stat: '9',
    statLabel: 'Tage statt neun Wochen Stillstand',
    image: '/img/glass.webp',
  },
  {
    no: '04',
    time: 'Mai 2025 · 03:04 Uhr',
    title: 'Der erste Rotor. Und keiner ging nach Hause.',
    text: 'Um 3:04 Uhr lief die erste E-Achse vom Band, vier Monate vor der Frist. Die Nachtschicht blieb. Die Frühschicht kam früher. Am Wochenende feierte ganz Aalen in Halle 4.',
    stat: '4',
    statLabel: 'Monate vor der Deadline',
    image: '/img/event.webp',
  },
] as const

export const interlude = {
  quote: 'Wir haben keine Fabrik digitalisiert. Wir haben 2.400 Menschen eine Zukunft gebaut.',
  author: 'Dr. Thomas Reiter',
  role: 'Partner, MHP – A Porsche Company',
  image: u('photo-1448375240586-882707db888b', 2400),
}

export const kpis = [
  { value: 2400, suffix: '', label: 'Arbeitsplätze gesichert', note: 'Kein einziger betriebsbedingter Abbau.' },
  { value: 14, suffix: ' Mon.', label: 'bis zum Serienstart', note: 'Branchenschnitt: 36 Monate.' },
  { value: 41, prefix: '−', suffix: ' %', label: 'Energie pro Bauteil', note: 'Durch simulationsoptimierte Linien.' },
  { value: 380, suffix: ' Mio. €', label: 'Neuaufträge E-Mobilität', note: 'Gesichert bis 2032.' },
] as { value: number; prefix?: string; suffix: string; label: string; note: string }[]

export const compare = {
  before: { year: '2024', title: 'Getriebe für Verbrenner', facts: ['Auslastung 58 %', 'Standort in Prüfung', 'Ø Alter der Anlagen: 23 Jahre'] },
  after: { year: '2026', title: 'E-Achsen für drei OEMs', facts: ['Auslastung 94 %', 'Leitwerk der Gruppe', 'Vollständiger digitaler Zwilling'] },
}

export const voices = [
  { name: 'Kemal Aydın', role: 'Schichtmeister, 27 Jahre im Werk', quote: 'Ich dachte, ich bring meinen Kindern bei, wie man ein Werk zumacht. Jetzt bring ich ihnen bei, wie man eins neu erfindet.', image: u('photo-1500648767791-00dcc994a43e', 800) },
  { name: 'Lea Schuster', role: 'Auszubildende Mechatronik', quote: 'Ich habe am digitalen Zwilling meine Linie gebaut, bevor ich sie anfassen durfte. Wer kann das schon von sich sagen?', image: u('photo-1494790108377-be9c29b29330', 800) },
  { name: 'Frank Wolters', role: 'Betriebsratsvorsitzender', quote: 'Transformation hieß bei uns immer: Abbau. Jana hat bewiesen, dass es auch heißen kann: Aufbau.', image: u('photo-1507003211169-0a1dd7228f2d', 800) },
  { name: 'Sophie Nguyen', role: 'Managerin, MHP', quote: 'Wir haben drei Monate mit in der Kantine gegessen. Danach waren wir kein Dienstleister mehr. Wir waren Kollegen.', image: u('photo-1438761681033-6461ffad8d80', 800) },
  { name: 'Dr. Markus Hallberg', role: 'CEO, HALLBERG Antriebstechnik', quote: 'Aalen ist heute unser Leitwerk. Was hier passiert ist, rollen wir in allen elf Werken aus.', image: u('photo-1560250097-0b93528c311a', 800) },
] as const

export const finale = {
  quote: 'Mein Vater hat gesagt: Ein Werk ist nicht die Halle. Es sind die Leute, die morgens das Licht anmachen.',
}

export const moreStories = [
  { title: 'Simulation-First Automation: Schaefflers Weg zu Software-Defined Manufacturing', href: 'https://www.mhp.com/de/insights/unsere-erfahrung/simulation-first-automation-schaefflers-weg-zu-software-defined-manufacturing', tag: 'Manufacturing' },
  { title: 'Alle Success Stories von MHP entdecken', href: 'https://www.mhp.com/de/insights/unsere-erfahrung', tag: 'Insights' },
]
