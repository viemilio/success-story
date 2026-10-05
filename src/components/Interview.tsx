import { motion } from 'motion/react'
import { useRef, useState } from 'react'
import { interview, statements } from '../content'
import { Img } from './Img'
import { useStatementClock, VideoFrame } from './VideoFrame'

const ease = [0.22, 1, 0.36, 1] as const

/** Interview als Gesprächsverlauf, daneben das Video-Statement. */
export function Interview() {
  const s = statements[0]
  const [playing, setPlaying] = useState(false)
  const video = useRef<HTMLVideoElement>(null)
  const t = useStatementClock(s, playing, video, { loop: true })

  return (
    <section id="interview" className="bg-white px-3 pb-24 md:pb-36">
      <div className="grid gap-3 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="sticky top-24">
            <button
              onClick={() => setPlaying((p) => !p)}
              className="group relative block aspect-[4/5] w-full overflow-hidden rounded-[2rem] text-left"
              data-cursor={playing ? 'Pause' : 'Play'}
              aria-label={playing ? 'Statement pausieren' : 'Statement abspielen'}
            >
              <VideoFrame s={s} t={t} playing={playing} video={video} className="h-full w-full" />
              {!playing && (
                <span className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-2xl text-white ring-1 ring-white/40 backdrop-blur-xl transition duration-500 ease-apple group-hover:scale-110 group-hover:bg-kiwi group-hover:text-darkest">
                  ▶
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="rounded-[2rem] bg-zircon/45 p-6 md:p-12 lg:col-span-7">
          <p className="mb-6 inline-flex rounded-full bg-white px-4 py-1.5 text-sm font-medium text-mhp">Das Interview</p>
          <h2 className="display text-[clamp(2.4rem,4.6vw,4.8rem)] text-darkest">„Fangen Sie im Zwilling an. Hören Sie in der Halle auf.“</h2>
          <p className="mt-6 max-w-xl text-lg text-darkest/70">{interview.intro}</p>

          <div className="mt-12 flex flex-col gap-4">
            {interview.qa.map((x, i) => (
              <div key={i} className="flex flex-col gap-4">
                <motion.p
                  initial={{ opacity: 0, x: 40, scale: 0.96 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: 0.6, ease }}
                  className="ml-auto max-w-[85%] rounded-[1.5rem] rounded-br-md bg-mhp px-6 py-4 text-lg font-semibold leading-snug text-white"
                >
                  {x.q}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, x: -40, scale: 0.96 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: 0.6, delay: 0.15, ease }}
                  className="flex max-w-[92%] items-end gap-3"
                >
                  <Img src={s.poster} alt="" className="h-10 w-10 shrink-0 rounded-full object-cover" />
                  <p className="rounded-[1.5rem] rounded-bl-md bg-white px-6 py-4 text-[1.05rem] leading-relaxed text-darkest/85 shadow-[0_10px_30px_-15px_rgba(0,4,91,0.25)]">
                    {x.a}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
