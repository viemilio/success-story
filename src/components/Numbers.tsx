import { animate, motion, useInView, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { chart, facts as allFacts } from '../content'

const facts = allFacts.filter((f) => !f.value.includes('Mio'))

const ease = [0.22, 1, 0.36, 1] as const
const W = 1000
const H = 380
const pad = 30

/** Wirtschaftsteil: Kurve zeichnet sich beim Scrollen, darunter die harten Fakten. */
export function Numbers() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'center 45%'] })
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1])

  const min = 40
  const max = 100
  const pts = chart.points.map((p, i) => ({
    ...p,
    x: pad + (i / (chart.points.length - 1)) * (W - pad * 2),
    y: H - pad - ((p.v - min) / (max - min)) * (H - pad * 2),
  }))
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p.x},${p.y}`).join(' ')
  const area = `${d} L${pts.at(-1)!.x},${H - pad} L${pts[0].x},${H - pad} Z`

  return (
    <section id="zahlen" className="bg-white px-3 pb-24 md:pb-36">
      <div className="grid gap-3 md:grid-cols-12">
        <div className="flex flex-col rounded-[2rem] bg-paper p-7 md:col-span-4 md:p-10">
          <p className="inline-flex self-start rounded-full bg-white px-4 py-1.5 text-sm font-medium text-mhp ring-1 ring-darkest/10">Die Bilanz</p>
          <h2 className="display mt-auto pt-10 text-[clamp(2.8rem,5vw,5.4rem)] text-darkest">Von 58 auf <span className="text-vital">94 Prozent.</span></h2>
          <p className="mt-6 max-w-sm text-lg text-darkest/70">
            Die Auslastung eines Werks, das abgeschrieben war. Heute fertigt Aalen E-Achsen für drei Automobilhersteller.
          </p>
        </div>

        <div ref={ref} className="rounded-[2rem] bg-paper p-6 md:col-span-8 md:p-10">
          <div className="flex items-center justify-between border-b border-darkest/15 pb-3 text-sm">
            <span className="font-semibold">{chart.title}</span>
            <span className="text-darkest/50">in {chart.unit}, quartalsweise</span>
          </div>
          <svg viewBox={`0 0 ${W} ${H + 40}`} className="mt-4 w-full overflow-visible" role="img" aria-label="Auslastung stieg von 58 auf 94 Prozent">
            {[50, 70, 90].map((g) => {
              const y = H - pad - ((g - min) / (max - min)) * (H - pad * 2)
              return (
                <g key={g}>
                  <line x1={pad} x2={W - pad} y1={y} y2={y} stroke="currentColor" strokeOpacity="0.1" />
                  <text x={W - pad} y={y - 6} textAnchor="end" className="fill-darkest/40 text-[13px]">{g}</text>
                </g>
              )
            })}
            <motion.path d={area} fill="url(#fill)" style={{ opacity: draw }} />
            <motion.path d={d} fill="none" stroke="var(--color-vital)" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" style={{ pathLength: draw }} />
            {pts.map((p, i) => (
              <Dot key={p.label} p={p} i={i} n={pts.length} draw={draw} last={i === pts.length - 1} />
            ))}
            {pts.map((p) => (
              <text key={p.label} x={p.x} y={H + 28} textAnchor="middle" className="fill-darkest/50 text-[14px]">{p.label}</text>
            ))}
            <defs>
              <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="var(--color-vital)" stopOpacity="0.22" />
                <stop offset="1" stopColor="var(--color-vital)" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
        <BigCounter />
        {facts.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: i * 0.1, ease }}
            className={`flex flex-col justify-between gap-8 rounded-[2rem] p-6 md:p-8 ${['bg-zircon/60', 'bg-mint/90', 'bg-kiwi', 'bg-vital text-white'][i]}`}
          >
            <span className="text-sm font-medium opacity-60">0{i + 1}</span>
            <div>
              <p className="display text-[clamp(2.2rem,3.4vw,3.6rem)]">{f.value}</p>
              <p className="mt-3 text-sm font-medium opacity-75">{f.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function Dot({ p, i, n, draw, last }: { p: { x: number; y: number; v: number }; i: number; n: number; draw: ReturnType<typeof useTransform<number, number>>; last: boolean }) {
  const at = i / (n - 1)
  const scale = useTransform(draw, [Math.max(0, at - 0.05), at], [0, 1])
  return (
    <motion.g style={{ scale, transformOrigin: `${p.x}px ${p.y}px` }}>
      <circle cx={p.x} cy={p.y} r={last ? 12 : 7} fill={last ? 'var(--color-kiwi)' : 'white'} stroke="var(--color-vital)" strokeWidth="4" />
      <text x={p.x} y={p.y - 22} textAnchor="middle" className={`font-bold ${last ? 'fill-vital text-[26px]' : 'fill-darkest text-[16px]'}`}>
        {p.v}
      </text>
    </motion.g>
  )
}

function BigCounter() {
  const ref = useRef<HTMLParagraphElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, 380, { duration: 2, ease: [0.16, 1, 0.3, 1], onUpdate: (x) => setV(Math.round(x)) })
    return () => c.stop()
  }, [inView])
  return (
    <div className="col-span-2 flex flex-col justify-between gap-8 rounded-[2rem] bg-darkest p-6 text-white md:col-span-1 md:p-8">
      <span className="text-sm font-medium text-white/60">Neuaufträge</span>
      <div>
        <p ref={ref} className="display text-[clamp(2.2rem,3.4vw,3.6rem)] tabular-nums text-kiwi">
          {v}
          <span className="ml-1 text-[0.45em] tracking-normal">Mio. €</span>
        </p>
        <p className="mt-3 text-sm text-zircon">E-Mobilität, gesichert bis 2032</p>
      </div>
    </div>
  )
}
