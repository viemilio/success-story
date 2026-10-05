import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import { useState } from 'react'
import { scrollTo } from '../lib/scroll'
import { HallbergLogo, MhpLogo, NewIndustrial } from './Logos'

const nav = [
  { id: 'statements', label: 'Statements' },
  { id: 'story', label: 'Story' },
  { id: 'prinzipien', label: 'Prinzipien' },
  { id: 'interview', label: 'Interview' },
  { id: 'zahlen', label: 'Zahlen' },
]

export function Masthead({ onPlay }: { onPlay: () => void }) {
  const { scrollY, scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const [visible, setVisible] = useState(false)
  const [dark, setDark] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    setVisible(y > window.innerHeight * 0.75)
    const el = document.elementFromPoint(window.innerWidth / 2, 80)
    setDark(!!el?.closest('[data-header="dark"]'))
  })

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-colors duration-500 ${
            dark ? 'border-white/10 bg-darkest/75 text-white' : 'border-darkest/10 bg-paper/80 text-darkest'
          }`}
        >
          <div className="flex items-center justify-between gap-6 px-5 py-3 md:px-10">
            <button onClick={() => scrollTo(0)} className="flex items-center gap-4 text-left">
              <NewIndustrial onDark={dark} className="text-lg md:text-xl" />
              <span className="hidden h-6 w-px bg-current opacity-20 sm:block" />
              <span className="hidden sm:block">
                <HallbergLogo compact className="text-xs" />
              </span>
            </button>
            <nav className="hidden items-center gap-6 lg:flex">
              {nav.map((n) => (
                <button key={n.id} onClick={() => scrollTo(`#${n.id}`)} className="eyebrow opacity-70 transition hover:opacity-100">
                  {n.label}
                </button>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              <span className="hidden md:block">
                <MhpLogo className="text-sm" />
              </span>
              <button onClick={onPlay} className="flex items-center gap-2 rounded-full bg-kiwi px-4 py-2 text-sm font-semibold text-darkest" data-cursor="Play">
                ▶ <span className="hidden sm:inline">Statements</span>
              </button>
            </div>
          </div>
          <motion.div style={{ scaleX }} className="h-[2px] origin-left bg-vital" />
        </motion.header>
      )}
    </AnimatePresence>
  )
}
