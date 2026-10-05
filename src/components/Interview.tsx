import { motion } from 'motion/react'
import { useRef, useState } from 'react'
import { interview, statements } from '../content'
import { useStatementClock, VideoFrame } from './VideoFrame'

const ease = [0.22, 1, 0.36, 1] as const

/** Klassisches Magazin-Interview, daneben das Video-Statement „sticky“. */
export function Interview() {
  const s = statements[0]
  const [playing, setPlaying] = useState(false)
  const video = useRef<HTMLVideoElement>(null)
  const t = useStatementClock(s, playing, video, true)

  return (
    <section id="interview" className="relative bg-zircon px-5 py-24 md:px-10 md:py-40">
      <div className="grid gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="sticky top-28">
            <button
              onClick={() => setPlaying((p) => !p)}
              className="group relative block aspect-[4/5] w-full overflow-hidden rounded-2xl text-left"
              data-cursor={playing ? 'Pause' : 'Play'}
              aria-label={playing ? 'Statement pausieren' : 'Statement abspielen'}
            >
              <VideoFrame s={s} t={t} playing={playing} video={video} className="h-full w-full" />
              {!playing && (
                <span className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-kiwi text-2xl text-darkest shadow-2xl transition-transform duration-500 ease-apple group-hover:scale-110">
                  ▶
                </span>
              )}
            </button>
            <p className="mt-4 text-sm text-darkest/60">Video-Statement · {s.name} über den Moment, in dem alles begann.</p>
          </div>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <p className="eyebrow text-vital">Das Interview</p>
          <h2 className="display mt-6 text-[clamp(2.8rem,5.6vw,6rem)] text-mhp">„Fangen Sie im Zwilling an. Hören Sie in der Halle auf.“</h2>
          <p className="mt-8 text-xl font-medium leading-snug text-darkest/80">{interview.intro}</p>

          <div className="mt-14 space-y-12">
            {interview.qa.map((x, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-12% 0px' }}
                transition={{ duration: 0.9, ease }}
              >
                <p className="text-xl font-[750] leading-snug tracking-tight text-mhp md:text-2xl">{x.q}</p>
                <p className="mt-4 text-lg leading-relaxed text-darkest/85">
                  <span className="font-semibold text-darkest">Brenner: </span>
                  {x.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
