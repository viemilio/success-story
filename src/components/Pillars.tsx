import { motion } from 'motion/react'
import { useState } from 'react'
import { pillars } from '../content'
import { NewIndustrial } from './Logos'

const ease = [0.22, 1, 0.36, 1] as const

/** Vier Prinzipien als Akkordeon-Karten: Die aktive Karte öffnet sich und zeigt ihr Bild. */
export function Pillars() {
  const [active, setActive] = useState(0)

  return (
    <section id="prinzipien" className="bg-white px-3 pb-24 md:pb-36">
      <div className="rounded-[2rem] bg-paper px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto mb-14 max-w-4xl text-center">
          <p className="mb-6 inline-flex rounded-full bg-white px-4 py-1.5 text-sm font-medium text-mhp ring-1 ring-darkest/10">Die Blaupause</p>
          <h2 className="display text-[clamp(2.6rem,5.6vw,5.8rem)] text-darkest">
            Vier Prinzipien, mit denen Aalen <NewIndustrial className="text-mhp" /> formt.
          </h2>
        </div>

        <div className="flex flex-col gap-3 lg:h-[70vh] lg:flex-row">
          {pillars.map((p, i) => {
            const open = i === active
            return (
              <motion.button
                key={p.no}
                layout
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                transition={{ layout: { duration: 0.7, ease } }}
                className={`relative overflow-hidden rounded-[1.75rem] text-left ${open ? 'min-h-[60vh] lg:min-h-0 lg:flex-[3]' : 'min-h-[7rem] lg:min-h-0 lg:flex-1'} bg-darkest text-white`}
                aria-expanded={open}
              >
                <motion.img
                  src={p.image}
                  alt=""
                  animate={{ opacity: open ? 1 : 0.35, scale: open ? 1 : 1.15 }}
                  transition={{ duration: 0.9, ease }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-darkest via-darkest/50 to-darkest/10" />
                <div className="relative flex h-full flex-col justify-between gap-6 p-6 md:p-8">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold transition-colors duration-500 ${open ? 'bg-kiwi text-darkest' : 'bg-white/15 text-white'}`}>{p.no}</span>
                  <div>
                    <motion.h3 layout="position" className={`font-[750] leading-[0.95] tracking-[-0.04em] ${open ? 'text-[clamp(2.2rem,3.6vw,3.8rem)]' : 'text-[clamp(1.4rem,1.8vw,1.8rem)]'}`}>
                      {p.title}
                    </motion.h3>
                    <motion.p
                      initial={false}
                      animate={{ opacity: open ? 1 : 0, height: open ? 'auto' : 0 }}
                      transition={{ duration: 0.5, ease }}
                      className="max-w-md overflow-hidden text-lg text-zircon/90"
                    >
                      <span className="block pt-4">{p.text}</span>
                    </motion.p>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
