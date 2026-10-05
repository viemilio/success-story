import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { intro, statements } from '../content'
import { scrollTo } from '../lib/scroll'
import { Img } from './Img'
import { HallbergLogo, MhpLogo } from './Logos'

const ease = [0.22, 1, 0.36, 1] as const

/** Hero: Dunkelheit. Dann springt flackernd das Hallenlicht an. */
export function Intro({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 1.25])
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const portraitY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[680px] overflow-hidden bg-black">
      {/* Portrait, erst im Licht sichtbar */}
      <motion.div
        style={{ y: portraitY, animation: ready ? 'flicker 2.4s linear 0.6s both' : undefined, opacity: ready ? undefined : 0 }}
        className="absolute inset-y-0 right-0 w-full md:w-[62%]"
      >
        <Img src={statements[0].poster} alt="Jana Brenner" loading="eager" className="h-full w-full object-cover object-[50%_20%] grayscale-[35%]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
        <div className="absolute inset-0 bg-mhp/30 mix-blend-color" />
      </motion.div>

      {/* Lichtkegel von oben */}
      <div
        aria-hidden
        style={{ animation: ready ? 'flicker 2.4s linear 0.6s both' : undefined, opacity: ready ? undefined : 0 }}
        className="pointer-events-none absolute left-[18%] top-0 h-full w-[60vw] -translate-x-1/2 bg-[conic-gradient(from_180deg_at_50%_0%,transparent_160deg,rgba(205,214,255,0.16)_175deg,rgba(205,214,255,0.22)_180deg,rgba(205,214,255,0.16)_185deg,transparent_200deg)] mix-blend-screen"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 2.6, duration: 1.2 }}
        className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-5 text-white md:p-8"
      >
        <span className="flex items-center gap-4">
          <HallbergLogo className="text-sm" />
          <span className="text-white/40">×</span>
          <MhpLogo className="text-sm" />
        </span>
        <span className="eyebrow hidden text-[10px] text-white/60 md:block">Eine MHP Success Story</span>
      </motion.div>

      <motion.div style={{ opacity: fade }} className="relative z-10 flex h-full flex-col justify-center px-6 md:px-14">
        <motion.p
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={ready ? { clipPath: 'inset(0 0% 0 0)' } : {}}
          transition={{ duration: 1.6, delay: 2.9, ease: [0.65, 0, 0.35, 1] }}
          className="font-[family-name:var(--font-hand)] text-[clamp(2.4rem,5vw,4.5rem)] leading-none text-kiwi"
        >
          {intro.salutation}
        </motion.p>
        <motion.h1
          style={{ scale: titleScale }}
          initial={{ opacity: 0, filter: 'blur(24px)', letterSpacing: '0.1em' }}
          animate={ready ? { opacity: 1, filter: 'blur(0px)', letterSpacing: '-0.05em' } : {}}
          transition={{ duration: 2.2, delay: 1.4, ease }}
          className="display origin-left text-[clamp(6rem,21vw,22rem)] leading-[0.8]"
        >
          {intro.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 3.6, ease }}
          className="mt-8 max-w-lg text-lg leading-snug text-zircon/85 md:text-xl"
        >
          {intro.sub}
        </motion.p>
        <motion.button
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ delay: 4.2, duration: 1 }}
          onClick={() => scrollTo('#erinnerung')}
          className="group mt-12 flex items-center gap-4 self-start text-sm font-semibold text-white"
          data-cursor="Lesen"
        >
          <span className="relative flex h-14 w-14 items-center justify-center rounded-full ring-1 ring-white/30 transition group-hover:bg-white group-hover:text-darkest">↓</span>
          Brief lesen
        </motion.button>
      </motion.div>
    </section>
  )
}
