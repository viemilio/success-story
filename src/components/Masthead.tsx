import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useState } from 'react'
import { scrollTo } from '../lib/scroll'
import { HallbergLogo } from './Logos'

const nav = [
  { id: 'statements', label: 'Statements' },
  { id: 'story', label: 'Story' },
  { id: 'prinzipien', label: 'Prinzipien' },
  { id: 'interview', label: 'Interview' },
  { id: 'zahlen', label: 'Zahlen' },
]

/** Schwebende Glas-Navigation mit Fortschrittsring. */
export function Masthead({ onPlay }: { onPlay: () => void }) {
  const { scrollY, scrollYProgress } = useScroll()
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState('')
  const [progress, setProgress] = useState(0)

  useMotionValueEvent(scrollY, 'change', (y) => setVisible(y > window.innerHeight * 0.7))
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    setProgress(p)
    const current = nav.filter((n) => {
      const el = document.getElementById(n.id)
      return el && el.getBoundingClientRect().top < window.innerHeight * 0.4
    })
    setActive(current.at(-1)?.id ?? '')
  })

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ y: -80, opacity: 0, x: '-50%' }}
          animate={{ y: 0, opacity: 1, x: '-50%' }}
          exit={{ y: -80, opacity: 0, x: '-50%' }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          className="fixed left-1/2 top-4 z-50 flex w-[calc(100%-2rem)] max-w-max items-center gap-2 rounded-full bg-darkest/80 p-1.5 text-white shadow-[0_20px_60px_-20px_rgba(0,4,91,0.6)] ring-1 ring-white/10 backdrop-blur-2xl"
        >
          <button onClick={() => scrollTo(0)} className="flex items-center gap-2 rounded-full px-3 py-1.5">
            <HallbergLogo compact className="text-[11px]" />
          </button>
          <nav className="hidden items-center lg:flex">
            {nav.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(`#${n.id}`)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition ${active === n.id ? 'text-darkest' : 'text-white/70 hover:text-white'}`}
              >
                {active === n.id && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-white" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                <span className="relative">{n.label}</span>
              </button>
            ))}
          </nav>
          <span className="relative ml-auto h-9 w-9 shrink-0" aria-hidden>
            <svg viewBox="0 0 36 36" className="h-9 w-9 -rotate-90">
              <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="3" />
              <circle cx="18" cy="18" r="15" fill="none" stroke="var(--color-kiwi)" strokeWidth="3" strokeLinecap="round" strokeDasharray={94.25} strokeDashoffset={94.25 * (1 - progress)} />
            </svg>
          </span>
          <button onClick={onPlay} className="flex items-center gap-2 rounded-full bg-kiwi px-4 py-2 text-sm font-semibold text-darkest" data-cursor="Play">
            ▶ <span className="hidden sm:inline">Statements</span>
          </button>
        </motion.header>
      )}
    </AnimatePresence>
  )
}
