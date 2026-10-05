import { motion } from 'motion/react'
import { statements } from '../content'
import { NewIndustrial } from './Logos'
import { VoiceBubble } from './VoiceBubble'

const offsets = ['md:mt-0', 'md:mt-40', 'md:-mt-10', 'md:mt-32', 'md:mt-4']

/** Die Stimmen schweben wie Lichter im Raum. */
export function Voices({ onOpen }: { onOpen: (i: number) => void }) {
  return (
    <section id="stimmen" className="relative overflow-hidden bg-darkest px-6 py-32 md:px-14 md:py-44">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-vital/25 blur-[140px]" />
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="font-[family-name:var(--font-hand)] text-[clamp(2rem,4vw,3.4rem)] leading-none text-kiwi">Du würdest sie mögen, Papa.</p>
        <h2 className="display mt-6 text-[clamp(3rem,7vw,7rem)]">Die Stimmen von Aalen.</h2>
        <p className="mx-auto mt-6 max-w-lg text-lg text-zircon/80">
          Fünf Menschen, die <NewIndustrial onDark className="text-white" /> jeden Tag formen. Tippen Sie auf ein Gesicht.
        </p>
      </div>
      <div className="relative mt-20 flex flex-wrap items-start justify-center gap-x-10 gap-y-14 md:gap-x-14">
        {statements.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ type: 'spring', stiffness: 120, damping: 16, delay: i * 0.1 }}
            className={offsets[i]}
          >
            <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }}>
              <VoiceBubble s={s} onClick={() => onOpen(i)} />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
