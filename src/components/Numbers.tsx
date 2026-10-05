import { animate, motion, useInView, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { chart, facts } from '../content'

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
    <section id="zahlen" className="relative bg-paper px-5 py-24 md:px-10 md:py-40">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="eyebrow text-vital">Die Bilanz</p>
          <h2 className="display mt-6 text-[clamp(2.8rem,5.4vw,5.8rem)] text-mhp">Von 58 auf 94 Prozent.</h2>
          <p className="mt-6 max-w-sm text-lg text-darkest/70">
            Die Auslastung eines Werks, das abgeschrieben war. Heute fertigt Aalen E-Achsen für drei Automobilhersteller.
          </p>
          <BigCounter />
        </div>

        <div ref={ref} className="md:col-span-8">
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

      <div className="mt-20 grid grid-cols-2 border-t-4 border-mhp md:grid-cols-4">
        {facts.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: i * 0.1, ease }}
            className="border-b border-darkest/15 py-8 pr-4 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0"
          >
            <p className="display text-[clamp(2.4rem,4.4vw,4.6rem)] text-mhp">{f.value}</p>
            <p className="mt-3 font-medium text-darkest/70">{f.label}</p>
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
    <div className="mt-12 rounded-2xl bg-mhp p-6 text-white">
      <p ref={ref} className="display text-[clamp(3.5rem,6vw,6rem)] tabular-nums text-kiwi">
        {v}
        <span className="ml-2 text-[0.4em] tracking-normal">Mio. €</span>
      </p>
      <p className="mt-2 text-zircon">Neuaufträge für E-Mobilität, gesichert bis 2032.</p>
    </div>
  )
}
