import { animate, motion, useInView } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { compare, kpis } from '../content'
import { ChapterMark } from './Why'

const ease = [0.22, 1, 0.36, 1] as const
const fmt = new Intl.NumberFormat('de-DE')

function Counter({ to, prefix = '', suffix = '' }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 2.2, ease: [0.16, 1, 0.3, 1], onUpdate: (x) => setV(Math.round(x)) })
    return () => c.stop()
  }, [inView, to])
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {fmt.format(v)}
      <span className="text-[0.45em] align-top ml-1 tracking-normal">{suffix.trim()}</span>
    </span>
  )
}

function CompareSlider() {
  const box = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState(50)
  const dragging = useRef(false)
  const update = (clientX: number) => {
    const r = box.current!.getBoundingClientRect()
    setPos(Math.max(4, Math.min(96, ((clientX - r.left) / r.width) * 100)))
  }

  return (
    <div
      ref={box}
      data-cursor="Ziehen"
      className="relative aspect-[16/11] select-none overflow-hidden touch-pan-y md:aspect-[3/1]"
      onPointerDown={(e) => {
        dragging.current = true
        ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
        update(e.clientX)
      }}
      onPointerMove={(e) => dragging.current && update(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      role="slider"
      aria-label="Vorher-Nachher-Vergleich"
      aria-valuenow={Math.round(pos)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') setPos((p) => Math.max(4, p - 5))
        if (e.key === 'ArrowRight') setPos((p) => Math.min(96, p + 5))
      }}
    >
      {/* Nachher */}
      <img src="/img/robots.webp" alt="" draggable={false} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-l from-mhp/70 via-transparent to-transparent" />
      <Side data={compare.after} align="right" />

      {/* Vorher */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src="/img/robots.webp" alt="" draggable={false} className="absolute inset-0 h-full w-full object-cover grayscale contrast-125 brightness-50" />
        <div className="absolute inset-0 bg-darkest/50" />
        <Side data={compare.before} align="left" />
      </div>

      <div className="absolute inset-y-0 w-px bg-kiwi" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-kiwi text-darkest shadow-2xl">
          <svg width="28" height="14" viewBox="0 0 28 14" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 1 1 7l6 6M21 1l6 6-6 6" />
          </svg>
        </div>
      </div>
    </div>
  )
}

function Side({ data, align }: { data: typeof compare.before; align: 'left' | 'right' }) {
  return (
    <div className={`absolute inset-y-0 flex flex-col justify-between p-6 md:p-10 ${align === 'left' ? 'left-0' : 'right-0 items-end text-right'}`}>
      <span className="display text-[clamp(3rem,8vw,8rem)] text-white">{data.year}</span>
      <div>
        <p className="text-xl font-semibold md:text-2xl">{data.title}</p>
        <ul className="mt-3 hidden space-y-1 text-sm text-zircon sm:block md:text-base">
          {data.facts.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function Impact() {
  return (
    <section id="wirkung" data-header="light" className="relative bg-white text-darkest">
      <div className="px-6 pt-32 md:px-10 md:pt-44">
        <ChapterMark no="03" title="Die Wirkung" className="text-vital" />
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease }}
          className="display mt-12 max-w-[16ch] text-[clamp(3rem,8vw,9rem)] text-mhp"
        >
          Das Licht in Halle 4 brennt. <span className="text-vital">Heller als je zuvor.</span>
        </motion.h2>
      </div>

      <div className="mt-24 grid border-t border-mhp/15 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 1, delay: i * 0.1, ease }}
            className="group relative overflow-hidden border-b border-mhp/15 p-6 sm:border-r md:p-10"
          >
            <div className="absolute inset-0 origin-bottom scale-y-0 bg-vital transition-transform duration-700 ease-apple group-hover:scale-y-100" />
            <div className="relative transition-colors duration-500 group-hover:text-white">
              <p className="display text-[clamp(3.5rem,6vw,6.5rem)] text-mhp transition-colors duration-500 group-hover:text-kiwi">
                <Counter to={k.value} prefix={k.prefix} suffix={k.suffix} />
              </p>
              <p className="mt-6 text-lg font-semibold">{k.label}</p>
              <p className="mt-1 text-sm opacity-70">{k.note}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="px-6 py-28 md:px-10 md:py-40">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h3 className="display max-w-[14ch] text-[clamp(2.4rem,5vw,5rem)] text-mhp">Gleiche Halle. Anderes Jahrhundert.</h3>
          <p className="max-w-sm text-darkest/70">Ziehen Sie den Regler und sehen Sie, was aus Linie 3 geworden ist.</p>
        </div>
        <CompareSlider />
      </div>
    </section>
  )
}
