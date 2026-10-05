import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useRef, useState } from 'react'
import { stakes } from '../content'

const bg: Record<(typeof stakes)[number]['tone'], string> = {
  darkest: 'var(--color-darkest)',
  mhp: 'var(--color-mhp)',
  vital: 'var(--color-vital)',
  kiwi: 'var(--color-kiwi)',
}

export function Stakes() {
  const ref = useRef<HTMLElement>(null)
  const [i, setI] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => setI(Math.min(stakes.length - 1, Math.floor(v * stakes.length))))
  const s = stakes[i]
  const dark = s.tone === 'kiwi'

  return (
    <section id="einsatz" ref={ref} style={{ height: `${stakes.length * 90}vh` }} className="relative">
      <motion.div
        animate={{ backgroundColor: bg[s.tone], color: dark ? 'var(--color-darkest)' : '#fff' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        data-header={dark ? 'light' : undefined}
        className="sticky top-0 flex h-[100svh] flex-col justify-between overflow-hidden px-6 py-24 md:px-10"
      >
        <div className="flex items-center justify-between eyebrow">
          <span>Was auf dem Spiel stand</span>
          <span className="tabular-nums">
            {String(i + 1).padStart(2, '0')} / {String(stakes.length).padStart(2, '0')}
          </span>
        </div>

        <div className="relative">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={s.unit}
              initial={{ y: '40%', opacity: 0, filter: 'blur(12px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              exit={{ y: '-40%', opacity: 0, filter: 'blur(12px)' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-6 md:flex-row md:items-end md:gap-12"
            >
              <span className="display tabular-nums text-[clamp(7rem,26vw,26rem)] leading-[0.78]">{s.value}</span>
              <div className="pb-[2vw]">
                <p className="display text-[clamp(2.5rem,6vw,6rem)]">{s.unit}</p>
                <p className={`mt-4 max-w-sm text-lg md:text-xl ${dark ? 'text-darkest/75' : 'text-zircon'}`}>{s.line}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex gap-2">
          {stakes.map((x, k) => (
            <span key={x.unit} className="h-[3px] flex-1 overflow-hidden rounded-full bg-current/20">
              <motion.span
                className="block h-full bg-current"
                initial={false}
                animate={{ scaleX: k <= i ? 1 : 0 }}
                style={{ originX: 0 }}
                transition={{ duration: 0.6 }}
              />
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
