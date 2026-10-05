import { motion } from 'motion/react'
import { useRef, useState } from 'react'
import { statements, type Statement } from '../content'
import { NewIndustrial } from './Logos'
import { Equalizer, useStatementClock, VideoFrame } from './VideoFrame'

const ease = [0.22, 1, 0.36, 1] as const

function Card({ s, i, onOpen }: { s: Statement; i: number; onOpen: (i: number) => void }) {
  const [hover, setHover] = useState(false)
  const video = useRef<HTMLVideoElement>(null)
  const t = useStatementClock(s, hover, video, true)

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
      className={`group relative aspect-[9/16] w-[68vw] shrink-0 snap-start overflow-hidden rounded-2xl text-left sm:w-[40vw] md:w-auto ${i % 2 ? 'md:translate-y-16' : ''}`}
      data-cursor="Play"
    >
      <VideoFrame s={s} t={t} playing={hover} video={video} mode="card" className="h-full w-full transition-transform duration-700 ease-apple group-hover:scale-[1.03]" />
      <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-darkest transition duration-500 ease-apple group-hover:scale-110 group-hover:bg-kiwi">
        ▶
      </span>
      <span className="eyebrow absolute right-4 top-6 text-[10px] text-white/80">0:{String(s.duration).padStart(2, '0')}</span>
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
    <section id="statements" data-header="dark" className="relative overflow-hidden bg-darkest py-24 text-white md:py-36">
      <div className="mb-14 grid gap-8 px-5 md:grid-cols-12 md:px-10">
        <div className="md:col-span-7">
          <p className="eyebrow mb-6 text-kiwi">Video-Statements · 1 Minute</p>
          <h2 className="display text-[clamp(3rem,7vw,7.5rem)]">
            Fünf Stimmen.
            <br />
            <span className="text-zircon/50">Ein Werk.</span>
          </h2>
        </div>
        <p className="self-end text-lg text-zircon/80 md:col-span-4 md:col-start-9">
          Die Menschen, die in Aalen <NewIndustrial onDark className="text-white" /> formen, erzählen selbst. Fahren Sie über eine Karte für die Vorschau, klicken Sie für den Film.
        </p>
      </div>

      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-20 [scrollbar-width:none] md:grid md:grid-cols-5 md:gap-5 md:overflow-visible md:px-10">
        {statements.map((s, i) => (
          <Card key={s.id} s={s} i={i} onOpen={onOpen} />
        ))}
      </div>
    </section>
  )
}
