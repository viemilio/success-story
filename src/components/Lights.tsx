import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { people } from '../content'

const fmt = new Intl.NumberFormat('de-DE')

/** 2.400 Punkte, ein Punkt pro Mensch. Beim Scrollen gehen die Lichter an. */
export function Lights() {
  const ref = useRef<HTMLElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const lit = useTransform(scrollYProgress, [0.08, 0.72], [0, people.count], { clamp: true })
  const [n, setN] = useState(0)
  const textOpacity = useTransform(scrollYProgress, [0.7, 0.8], [0, 1])

  // zufällige, aber stabile Reihenfolge – wie Fenster, die nacheinander hell werden
  const order = useMemo(() => {
    const a = Array.from({ length: people.count }, (_, i) => i)
    let seed = 7
    for (let i = a.length - 1; i > 0; i--) {
      seed = (seed * 16807) % 2147483647
      const j = seed % (i + 1)
      ;[a[i], a[j]] = [a[j], a[i]]
    }
    const rank = new Array<number>(people.count)
    a.forEach((v, k) => (rank[v] = k))
    return rank
  }, [])

  const draw = (count: number) => {
    const c = canvas.current
    if (!c) return
    const dpr = Math.min(window.devicePixelRatio, 2)
    const w = c.clientWidth
    const h = c.clientHeight
    if (c.width !== w * dpr) {
      c.width = w * dpr
      c.height = h * dpr
    }
    const ctx = c.getContext('2d')!
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, w, h)
    const cols = w > h ? 60 : 30
    const rows = Math.ceil(people.count / cols)
    const gap = Math.min(w / (cols + 1), h / (rows + 1))
    const ox = (w - gap * (cols - 1)) / 2
    const oy = (h - gap * (rows - 1)) / 2
    const r = Math.max(1.4, gap * 0.16)
    for (let i = 0; i < people.count; i++) {
      const x = ox + (i % cols) * gap
      const y = oy + Math.floor(i / cols) * gap
      const on = order[i] < count
      if (on) {
        ctx.fillStyle = 'rgba(221,239,3,0.18)'
        ctx.beginPath()
        ctx.arc(x, y, r * 3, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = '#ddef03'
      } else ctx.fillStyle = 'rgba(205,214,255,0.14)'
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  useMotionValueEvent(lit, 'change', (v) => {
    const k = Math.round(v)
    setN(k)
    draw(k)
  })
  useEffect(() => {
    draw(Math.round(lit.get()))
    const onResize = () => draw(Math.round(lit.get()))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section ref={ref} className="relative h-[320vh] bg-black">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <canvas ref={canvas} className="absolute inset-0 h-full w-full" aria-hidden />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.2)_45%,transparent_70%)]" />
        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
          <p className="eyebrow mb-6 text-kiwi">Was auf dem Spiel stand</p>
          <p className="display tabular-nums text-[clamp(5rem,16vw,15rem)]" aria-live="polite">
            {fmt.format(n)}
          </p>
          <p className="mt-2 text-[clamp(1.4rem,2.6vw,2.4rem)] font-semibold">{people.title}</p>
          <motion.div style={{ opacity: textOpacity }} className="mt-8 max-w-xl">
            <p className="text-lg text-zircon/85 md:text-xl">{people.text}</p>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-white/15 pt-8">
              {people.facts.map((f) => (
                <div key={f.label}>
                  <p className="whitespace-nowrap text-[clamp(1.2rem,2.6vw,2.4rem)] font-[750] tracking-[-0.03em] text-kiwi">{f.value}</p>
                  <p className="mt-1 text-xs text-zircon/70 md:text-sm">{f.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
