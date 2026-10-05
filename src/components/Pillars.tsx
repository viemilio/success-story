import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react'
import { useState } from 'react'
import { pillars } from '../content'
import { NewIndustrial } from './Logos'

/** Vier Prinzipien als große Liste; beim Hover folgt ein Bild dem Cursor. */
export function Pillars() {
  const [active, setActive] = useState<number | null>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 250, damping: 28 })
  const sy = useSpring(y, { stiffness: 250, damping: 28 })

  return (
    <section
      id="prinzipien"
      className="relative bg-white px-5 py-24 md:px-10 md:py-40"
      onPointerMove={(e) => {
        x.set(e.clientX)
        y.set(e.clientY)
      }}
    >
      <div className="mb-16 grid gap-6 md:grid-cols-12">
        <p className="eyebrow text-vital md:col-span-3">Die Blaupause</p>
        <h2 className="display text-[clamp(2.8rem,6vw,6.5rem)] text-mhp md:col-span-9">
          Vier Prinzipien, mit denen Aalen <NewIndustrial className="text-darkest" /> formt.
        </h2>
      </div>

      <ul className="border-t border-darkest/15" onPointerLeave={() => setActive(null)}>
        {pillars.map((p, i) => (
          <li
            key={p.no}
            onPointerEnter={() => setActive(i)}
            className="group grid cursor-default gap-4 border-b border-darkest/15 py-8 transition-colors duration-500 md:grid-cols-12 md:items-center md:py-10"
          >
            <span className="eyebrow tabular-nums text-darkest/40 md:col-span-1">{p.no}</span>
            <h3 className="display text-[clamp(2.4rem,5.4vw,6rem)] transition-all duration-500 ease-apple group-hover:translate-x-4 group-hover:text-vital md:col-span-7">
              {p.title}
            </h3>
            <p className="max-w-md text-darkest/70 md:col-span-4">{p.text}</p>
            <img src={p.image} alt="" className="h-32 w-full object-cover md:hidden" loading="lazy" />
          </li>
        ))}
      </ul>

      <motion.div style={{ x: sx, y: sy }} className="pointer-events-none fixed left-0 top-0 z-30 hidden md:block">
        <AnimatePresence>
          {active !== null && (
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: -3 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              className="absolute -translate-x-1/2 -translate-y-[115%] overflow-hidden rounded-md shadow-2xl"
            >
              <img src={pillars[active].image} alt="" className="h-[180px] w-[420px] object-cover" />
              <div className="absolute inset-0 bg-mhp/20 mix-blend-multiply" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
