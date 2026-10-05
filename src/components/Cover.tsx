import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { cover } from '../content'
import { scrollTo } from '../lib/scroll'
import { Img } from './Img'
import { HallbergLogo, MhpLogo } from './Logos'

const ease = [0.22, 1, 0.36, 1] as const

/** Hero als Magazin-Titelseite. */
export function Cover({ ready, onPlay }: { ready: boolean; onPlay: () => void }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const show = ready ? 'show' : 'hidden'

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden bg-paper">
      {/* Masthead der Titelseite */}
      <div className="relative z-20 flex items-start justify-between border-b border-darkest/15 px-5 pb-4 pt-5 md:px-10">
        <motion.p
          initial={{ y: -30, opacity: 0 }}
          animate={ready ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 1, ease }}
          className="font-[800] uppercase leading-[0.8] tracking-[-0.045em] text-[clamp(2.2rem,8.4vw,9.5rem)]"
        >
          The New <span className="text-vital">Industrial</span>
        </motion.p>
        <div className="hidden flex-col items-end gap-2 pt-2 text-right md:flex">
          <MhpLogo className="text-mhp" />
          <span className="eyebrow text-darkest/50">{cover.issue}</span>
        </div>
      </div>

      <div className="relative grid min-h-[calc(100svh-10rem)] md:grid-cols-12">
        {/* Titelbild */}
        <motion.div
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={ready ? { clipPath: 'inset(0 0 0% 0)' } : {}}
          transition={{ duration: 1.5, delay: 0.2, ease }}
          className="relative order-first h-[62svh] overflow-hidden md:order-last md:col-span-6 md:h-auto"
        >
          <motion.div style={{ scale: imgScale }} className="absolute inset-0">
            <Img src={cover.portrait} alt="Jana Brenner, Werkleiterin" loading="eager" className="h-full w-full object-cover object-top" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-darkest/70 via-transparent to-transparent" />

          {/* Kundenlogo als Badge auf dem Cover */}
          <div className="absolute right-5 top-5 rounded-sm bg-white px-4 py-3 text-darkest shadow-xl md:right-8 md:top-8">
            <HallbergLogo className="text-sm md:text-base" />
          </div>

          <ul className="absolute bottom-5 left-5 right-5 flex flex-col gap-3 md:bottom-8 md:left-8">
            {cover.coverLines.map((c, i) => (
              <motion.li
                key={c.small}
                initial={{ x: -30, opacity: 0 }}
                animate={ready ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 1 + i * 0.12, ease }}
                className="flex items-center gap-3 text-white"
              >
                <span className="min-w-[4.5ch] bg-kiwi px-2 py-0.5 text-center text-xl font-[800] tracking-tight text-darkest">{c.big}</span>
                <span className="text-sm font-medium md:text-base">{c.small}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Titeltext */}
        <motion.div style={{ y: textY }} className="relative z-10 flex flex-col justify-end gap-8 px-5 py-10 md:col-span-6 md:px-10 md:py-14">
          <motion.div
            initial="hidden"
            animate={show}
            variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.4 } } }}
            className="flex flex-col gap-7"
          >
            <motion.div variants={fade} className="flex flex-wrap items-center gap-4">
              <HallbergLogo className="text-xl text-darkest md:text-2xl" />
              <span className="h-8 w-px bg-darkest/20" />
              <span className="eyebrow text-darkest/60">Success Story</span>
            </motion.div>

            <motion.p variants={fade} className="eyebrow text-vital">{cover.kicker}</motion.p>

            <h1 className="display text-[clamp(3.2rem,7vw,8.5rem)] text-mhp">
              {cover.title.map((l, i) => (
                <span key={l} className="block overflow-hidden pb-[0.05em]">
                  <motion.span
                    className={`block ${i === 1 ? 'text-darkest' : ''}`}
                    variants={{ hidden: { y: '105%' }, show: { y: 0, transition: { duration: 1.1, ease } } }}
                  >
                    {l}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p variants={fade} className="max-w-xl text-lg leading-snug text-darkest/80 md:text-xl">
              {cover.lead}
            </motion.p>

            <motion.div variants={fade} className="flex flex-wrap items-center gap-3">
              <button
                onClick={onPlay}
                className="group inline-flex items-center gap-3 rounded-full bg-vital py-2 pl-2 pr-6 font-semibold text-white transition hover:bg-mhp"
                data-cursor="Play"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-kiwi text-darkest transition-transform duration-500 ease-apple group-hover:scale-110">
                  ▶
                </span>
                Statements ansehen
              </button>
              <button onClick={() => scrollTo('#story')} className="rounded-full border border-darkest/25 px-6 py-[0.9rem] font-semibold transition hover:border-darkest">
                Story lesen ↓
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
}
