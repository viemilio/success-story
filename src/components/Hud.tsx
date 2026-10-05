import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useState } from 'react'
import { scrollTo } from '../lib/scroll'
import { HallbergLogo } from './Logos'

/** Dezente Einblendungen: Ort & Zeit unten links, Logo und Stimmen-Button oben. */
export function Hud({ onPlay }: { onPlay: () => void }) {
  const { scrollY } = useScroll()
  const [stamp, setStamp] = useState<{ s: string; p: string } | null>(null)
  const [show, setShow] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    setShow(y > window.innerHeight * 0.8)
    const el = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2)?.closest<HTMLElement>('[data-stamp]')
    setStamp(el ? { s: el.dataset.stamp!, p: el.dataset.place! } : null)
  })

  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pointer-events-none fixed inset-0 z-40 text-white mix-blend-difference">
          <div className="flex items-center justify-between p-5 md:p-8">
            <button onClick={() => scrollTo(0)} className="pointer-events-auto">
              <HallbergLogo compact className="text-xs" />
            </button>
            <button onClick={onPlay} className="pointer-events-auto eyebrow flex items-center gap-2 rounded-full px-4 py-2 ring-1 ring-white/40" data-cursor="Play">
              ▶ Stimmen
            </button>
          </div>
          <div className="absolute bottom-5 left-5 md:bottom-8 md:left-8">
            <AnimatePresence mode="wait">
              {stamp && (
                <motion.p
                  key={stamp.s}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="eyebrow flex items-center gap-3 text-[10px]"
                >
                  <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                  <span className="tabular-nums">{stamp.s}</span>
                  <span className="opacity-60">{stamp.p}</span>
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
