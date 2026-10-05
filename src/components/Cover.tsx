import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { cover, statements } from '../content'
import { scrollTo } from '../lib/scroll'
import { HallbergLogo, MhpLogo } from './Logos'
import { Equalizer, useStatementClock, VideoFrame } from './VideoFrame'

const ease = [0.22, 1, 0.36, 1] as const

/** Hero als Bühne: Das Statement der Protagonistin läuft stumm im Hintergrund. */
export function Cover({ ready, onPlay }: { ready: boolean; onPlay: () => void }) {
  const ref = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const s = statements[0]
  const t = useStatementClock(s, true, video, { loop: true })

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const inset = useTransform(scrollYProgress, [0, 1], [12, 56])
  const radius = useTransform(scrollYProgress, [0, 1], [28, 56])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const show = ready ? 'show' : 'hidden'

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[680px] bg-white">
      <motion.div
        style={{ top: inset, left: inset, right: inset, bottom: inset, borderRadius: radius }}
        initial={{ clipPath: 'inset(8% 8% 8% 8% round 48px)', opacity: 0 }}
        animate={ready ? { clipPath: 'inset(0% 0% 0% 0% round 0px)', opacity: 1 } : {}}
        transition={{ duration: 1.6, ease }}
        className="absolute overflow-hidden bg-darkest"
      >
        <VideoFrame s={s} t={t} playing video={video} mode="bg" className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,4,91,0.55)_0%,rgba(0,4,91,0)_30%,rgba(0,4,91,0.15)_55%,rgba(0,4,91,0.92)_100%)]" />

        {/* Logo-Lockup Kunde × MHP */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.6, ease }}
          className="absolute inset-x-0 top-0 flex items-center justify-between p-5 text-white md:p-8"
        >
          <div className="flex items-center gap-4 rounded-full bg-white/10 py-2.5 pl-4 pr-5 backdrop-blur-xl ring-1 ring-white/20">
            <HallbergLogo className="text-sm md:text-base" />
            <span className="h-6 w-px bg-white/30" />
            <span className="eyebrow text-[10px] text-white/70">×</span>
            <MhpLogo className="text-sm" />
          </div>
          <span className="eyebrow hidden rounded-full bg-white/10 px-4 py-2.5 text-[10px] backdrop-blur-xl ring-1 ring-white/20 md:block">{cover.issue}</span>
        </motion.div>

        <motion.div style={{ y: contentY, opacity: contentOpacity }} className="absolute inset-x-0 bottom-0 p-5 text-white md:p-10">
          <motion.div
            initial="hidden"
            animate={show}
            variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.8 } } }}
            className="grid items-end gap-8 lg:grid-cols-12"
          >
            <div className="lg:col-span-8">
              <motion.p variants={fade} className="mb-6 inline-flex items-center gap-2 rounded-full bg-kiwi px-4 py-1.5 text-sm font-semibold text-darkest">
                Success Story · Automotive
              </motion.p>
              <h1 className="display text-[clamp(3.4rem,9vw,10rem)]">
                {cover.title.map((l) => (
                  <span key={l} className="block overflow-hidden pb-[0.05em]">
                    <motion.span className="block" variants={{ hidden: { y: '105%' }, show: { y: 0, transition: { duration: 1.1, ease } } }}>
                      {l}
                    </motion.span>
                  </span>
                ))}
              </h1>
            </div>

            <div className="flex flex-col gap-6 lg:col-span-4">
              <motion.p variants={fade} className="text-lg leading-snug text-white/85">
                {cover.lead}
              </motion.p>
              <motion.div variants={fade} className="flex flex-wrap gap-3">
                <button onClick={onPlay} className="group inline-flex items-center gap-3 rounded-full bg-white py-2 pl-2 pr-6 font-semibold text-darkest" data-cursor="Play">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-vital text-white transition-transform duration-500 ease-apple group-hover:scale-110">▶</span>
                  Statements ansehen
                </button>
                <button onClick={() => scrollTo('#story')} className="rounded-full bg-white/10 px-6 py-[0.9rem] font-semibold ring-1 ring-white/30 backdrop-blur-xl transition hover:bg-white/20">
                  Story lesen
                </button>
              </motion.div>
            </div>
          </motion.div>

          {/* „Jetzt läuft“-Hinweis */}
          <motion.div variants={fade} initial="hidden" animate={show} className="mt-8 flex items-center gap-3 border-t border-white/15 pt-5 text-sm text-white/70">
            <Equalizer active className="text-kiwi" />
            <span>
              Jetzt läuft: <strong className="font-semibold text-white">{s.name}</strong>, {s.role}
            </span>
            <span className="ml-auto hidden h-1 w-40 overflow-hidden rounded-full bg-white/20 md:block">
              <span className="block h-full origin-left bg-kiwi" style={{ transform: `scaleX(${t / s.duration})` }} />
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
}
