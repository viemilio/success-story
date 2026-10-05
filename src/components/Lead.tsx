import { motion } from 'motion/react'
import { cover, lead } from '../content'
import { HallbergLogo, NewIndustrial } from './Logos'

const ease = [0.22, 1, 0.36, 1] as const

const tile = (i: number) => ({
  initial: { opacity: 0, y: 40, scale: 0.98 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, margin: '-8% 0px' },
  transition: { duration: 0.9, delay: i * 0.08, ease },
})

/** Einstieg als Bento-Raster: Statement, Steckbrief, Kennzahlen, Text, Zitat. */
export function Lead() {
  return (
    <section id="story" className="bg-white px-3 py-24 md:py-36">
      <div className="mx-auto mb-14 max-w-4xl px-5 text-center">
        <p className="mb-6 inline-flex rounded-full bg-zircon/60 px-4 py-1.5 text-sm font-medium text-mhp">Die Story</p>
        <motion.h2 {...tile(0)} className="display text-[clamp(2.6rem,6vw,6.2rem)] text-darkest">
          Die Industrie stirbt nicht. <span className="text-vital">Sie wechselt den Gang.</span>
        </motion.h2>
      </div>

      <div className="grid gap-3 md:grid-cols-6">
        {/* Steckbrief */}
        <motion.div {...tile(1)} className="flex flex-col justify-between gap-10 rounded-[2rem] bg-zircon/50 p-7 md:col-span-2 md:p-9">
          <HallbergLogo className="text-xl text-darkest" />
          <dl className="grid grid-cols-2 gap-5 text-sm">
            {[
              ['Standort', 'Aalen'],
              ['Beschäftigte', '2.400'],
              ['Branche', 'Automotive Supplier'],
              ['Partner', 'MHP'],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-darkest/50">{k}</dt>
                <dd className="mt-1 font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        {/* Kennzahlen */}
        {cover.coverLines.map((c, i) => (
          <motion.div
            key={c.small}
            {...tile(2 + i)}
            className={`flex flex-col justify-between gap-10 rounded-[2rem] p-7 md:p-9 ${['bg-vital text-white', 'bg-kiwi text-darkest', 'bg-darkest text-white'][i]} ${i === 2 ? 'md:col-span-2' : 'md:col-span-1'}`}
          >
            <span className="text-sm font-medium opacity-70">0{i + 1}</span>
            <div>
              <p className="display text-[clamp(3rem,5vw,5rem)]">{c.big}</p>
              <p className="mt-3 text-sm font-medium leading-snug opacity-80">{c.small}</p>
            </div>
          </motion.div>
        ))}

        {/* Text */}
        <motion.div {...tile(5)} className="rounded-[2rem] bg-paper p-7 md:col-span-4 md:p-12">
          <p className="text-[clamp(1.5rem,2.4vw,2.2rem)] font-medium leading-[1.2] tracking-[-0.02em] text-mhp">
            Manchmal zeigt ein einzelnes Werk, wie <NewIndustrial className="text-darkest" /> aussieht.
          </p>
          <div className="mt-10 grid gap-8 text-[1.05rem] leading-relaxed text-darkest/75 md:grid-cols-2">
            {lead.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </motion.div>

        {/* Zitat */}
        <motion.figure {...tile(6)} className="relative flex flex-col justify-between gap-10 overflow-hidden rounded-[2rem] bg-mhp p-7 text-white md:col-span-2 md:p-9">
          <span className="display text-[8rem] leading-[0.5] text-kiwi">“</span>
          <blockquote className="text-[clamp(1.6rem,2.4vw,2.3rem)] font-semibold leading-[1.1] tracking-[-0.02em]">
            Ein Plan B ist eine Einladung, Plan A nicht ernst zu nehmen.
          </blockquote>
          <figcaption className="text-sm text-zircon/80">Jana Brenner, Werkleiterin</figcaption>
        </motion.figure>
      </div>
    </section>
  )
}
