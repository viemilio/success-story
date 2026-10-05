import { motion } from 'motion/react'
import { useRef, useState } from 'react'
import { statements, type Statement } from '../content'
import { NewIndustrial } from './Logos'
import { Equalizer, useStatementClock, VideoFrame } from './VideoFrame'

const ease = [0.22, 1, 0.36, 1] as const

function Card({ s, i, onOpen }: { s: Statement; i: number; onOpen: (i: number) => void }) {
  const [hover, setHover] = useState(false)
  const video = useRef<HTMLVideoElement>(null)
  const t = useStatementClock(s, hover, video, { loop: true })

  return (
    <motion.button
      layoutId={`story-${s.id}`}
      onClick={() => onOpen(i)}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.9, delay: i * 0.08, ease }}
      whileHover={{ y: -12 }}
      className="group relative aspect-[9/16] w-[68vw] shrink-0 snap-start overflow-hidden rounded-[1.75rem] text-left ring-1 ring-white/10 sm:w-[40vw] md:w-auto"
      data-cursor="Play"
    >
      <VideoFrame s={s} t={t} playing={hover} video={video} mode="card" className="h-full w-full transition-transform duration-700 ease-apple group-hover:scale-[1.03]" />
      <span className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/15 py-1 pl-1 pr-3 text-xs font-semibold text-white ring-1 ring-white/20 backdrop-blur-xl transition duration-500 ease-apple group-hover:bg-kiwi group-hover:text-darkest">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[10px] text-darkest">▶</span>
        0:{String(s.duration).padStart(2, '0')}
      </span>
      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
        <p className="mb-2 text-sm font-medium leading-snug text-zircon">{s.topic}</p>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">{s.name}</p>
            <p className="text-xs text-white/70">{s.role}</p>
          </div>
          <Equalizer active={hover} className="text-kiwi" />
        </div>
      </div>
    </motion.button>
  )
}

/** Video-Wand: fünf kurze Statements im Hochformat. */
export function StoryWall({ onOpen }: { onOpen: (i: number) => void }) {
  return (
    <section id="statements" className="bg-white px-3 pt-3 md:px-3">
      <div className="relative overflow-hidden rounded-[2rem] bg-darkest py-20 text-white md:py-28">
      <div className="pointer-events-none absolute -top-1/3 left-1/2 h-[80%] w-[80%] -translate-x-1/2 rounded-full bg-vital/40 blur-[120px]" />
      <div className="relative mx-auto mb-14 max-w-3xl px-5 text-center">
        <p className="mb-6 inline-flex rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-kiwi ring-1 ring-white/15">Video-Statements · 1 Minute</p>
        <h2 className="display text-[clamp(3rem,7vw,7rem)]">
          Fünf Stimmen. <span className="text-zircon/50">Ein Werk.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-zircon/80">
          Die Menschen, die in Aalen <NewIndustrial onDark className="text-white" /> formen, erzählen selbst. Mit der Maus über eine Karte fahren für die Vorschau, klicken für den Film.
        </p>
      </div>

      <div className="relative flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 pt-4 [scrollbar-width:none] md:grid md:grid-cols-5 md:overflow-visible md:px-10">
        {statements.map((s, i) => (
          <Card key={s.id} s={s} i={i} onOpen={onOpen} />
        ))}
      </div>
      </div>
    </section>
  )
}
