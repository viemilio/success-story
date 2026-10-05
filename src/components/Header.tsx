import { motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'
import { chapters } from '../content'
import { scrollTo } from '../lib/scroll'

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-2 ${className}`}>
      <span className="text-[1.35em] font-[800] tracking-[-0.04em]">MHP</span>
      <span className="hidden sm:inline text-[0.7em] font-medium tracking-wide opacity-80">A Porsche Company</span>
    </span>
  )
}

export function Header() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const [active, setActive] = useState<string>('')
  const [open, setOpen] = useState(false)
  const [light, setLight] = useState(false)

  // Header-Farbe passt sich der Fläche darunter an (helle Kapitel → MHP Blue)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', () => {
    const el = document.elementFromPoint(window.innerWidth / 2, 36)
    setLight(!!el?.closest('[data-header="light"]'))
  })

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    chapters.forEach((c) => {
      const el = document.getElementById(c.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  const activeIdx = chapters.findIndex((c) => c.id === active)

  return (
    <>
      <motion.div style={{ scaleX }} className="fixed left-0 right-0 top-0 z-50 h-[3px] origin-left bg-kiwi" />
      <header className={`pointer-events-none fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${light ? 'text-mhp' : 'text-white'}`}>
        <div className="flex items-center justify-between px-6 py-5 md:px-10">
          <button onClick={() => scrollTo(0)} aria-label="Zum Anfang" className="pointer-events-auto">
            <Wordmark className="text-base" />
          </button>
          <div className="hidden md:flex items-center gap-3 eyebrow">
            <span className="tabular-nums">{String(Math.max(activeIdx, 0) + 1).padStart(2, '0')}</span>
            <span className="h-px w-10 bg-current opacity-50" />
            <span className="min-w-36">{activeIdx >= 0 ? chapters[activeIdx].label : 'Intro'}</span>
          </div>
          <button onClick={() => setOpen(true)} className="pointer-events-auto eyebrow flex items-center gap-3" data-cursor="Menü">
            Kapitel
            <span className="flex flex-col gap-1">
              <span className="block h-px w-6 bg-current" />
              <span className="block h-px w-4 bg-current self-end" />
            </span>
          </button>
        </div>
      </header>

      {/* Seitliche Kapitel-Navigation */}
      <nav aria-label="Kapitel" className={`fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex transition-colors duration-500 ${light ? 'text-mhp' : 'text-white'}`}>
        {chapters.map((c, i) => (
          <button key={c.id} onClick={() => scrollTo(`#${c.id}`)} className="group flex items-center justify-end gap-3" aria-label={c.label}>
            <span className="eyebrow text-[10px] opacity-0 transition-opacity group-hover:opacity-100">{c.label}</span>
            <span className={`block h-px transition-all duration-500 bg-current ${i === activeIdx ? 'w-8' : 'w-3 opacity-50'}`} />
          </button>
        ))}
      </nav>

      <motion.div
        initial={false}
        animate={open ? { clipPath: 'circle(150% at 95% 4%)' } : { clipPath: 'circle(0% at 95% 4%)' }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-[70] bg-vital text-white"
        style={{ pointerEvents: open ? 'auto' : 'none' }}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between px-6 py-5 md:px-10">
          <Wordmark className="text-base" />
          <button onClick={() => setOpen(false)} className="eyebrow" data-cursor="Zu">Schließen ✕</button>
        </div>
        <ol className="px-6 md:px-10 mt-[6vh] space-y-1">
          {chapters.map((c, i) => (
            <li key={c.id} className="overflow-hidden">
              <motion.button
                animate={open ? { y: 0 } : { y: '110%' }}
                transition={{ delay: open ? 0.25 + i * 0.05 : 0, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => {
                  setOpen(false)
                  setTimeout(() => scrollTo(`#${c.id}`), 350)
                }}
                className="group flex items-baseline gap-6 text-left"
              >
                <span className="eyebrow text-kiwi tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                <span className="display text-[clamp(2.5rem,8vh,6.5rem)] transition-transform duration-500 ease-apple group-hover:translate-x-6">
                  {c.label}
                </span>
              </motion.button>
            </li>
          ))}
        </ol>
      </motion.div>
    </>
  )
}
