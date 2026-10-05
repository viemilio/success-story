import { motion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { statements } from '../content'
import { lockScroll } from '../lib/scroll'
import { Img } from './Img'
import { useStatementClock, VideoFrame } from './VideoFrame'

/** Vollbild-Player im Stories-Format: tippen = weiter/zurück, halten = Pause. */
export function StoryPlayer({ start, onClose }: { start: number; onClose: () => void }) {
  const [i, setI] = useState(start)
  const [paused, setPaused] = useState(false)
  const video = useRef<HTMLVideoElement>(null)
  const s = statements[i]
  const t = useStatementClock(s, !paused, video)
  const holdTimer = useRef<number>(0)
  const held = useRef(false)

  const next = useCallback(() => (i < statements.length - 1 ? setI(i + 1) : onClose()), [i, onClose])
  const prev = useCallback(() => setI((x) => Math.max(0, x - 1)), [])

  useEffect(() => {
    if (t >= s.duration) next()
  }, [t, s.duration, next])

  useEffect(() => {
    lockScroll(true)
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === ' ') {
        e.preventDefault()
        setPaused((p) => !p)
      }
    }
    window.addEventListener('keydown', key)
    return () => {
      lockScroll(false)
      window.removeEventListener('keydown', key)
    }
  }, [next, prev, onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-darkest"
      role="dialog"
      aria-modal
      aria-label="Video-Statements"
    >
      {/* unscharfer Hintergrund aus dem aktuellen Bild */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        <Img key={s.id} src={s.poster} alt="" className="h-full w-full scale-125 object-cover blur-3xl" />
      </div>

      <div className="relative flex h-full w-full items-center justify-center gap-6 md:h-[92vh]">
        {/* Nachbarn als Vorschau (Desktop) */}
        <Neighbor index={i - 1} onClick={prev} />

        <motion.div
          layoutId={i === start ? `story-${s.id}` : undefined}
          className="relative h-full w-full overflow-hidden md:aspect-[9/16] md:h-full md:w-auto md:rounded-2xl"
          onPointerDown={() => {
            held.current = false
            holdTimer.current = window.setTimeout(() => {
              held.current = true
              setPaused(true)
            }, 220)
          }}
          onPointerUp={(e) => {
            clearTimeout(holdTimer.current)
            if (held.current) {
              setPaused(false)
              return
            }
            const r = e.currentTarget.getBoundingClientRect()
            if (e.clientX - r.left < r.width * 0.3) prev()
            else next()
          }}
          data-cursor="Weiter"
        >
          <VideoFrame s={s} t={t} playing={!paused} video={video} className="h-full w-full" />

          {/* Fortschrittssegmente */}
          <div className="absolute inset-x-3 top-3 flex gap-1.5">
            {statements.map((x, k) => (
              <span key={x.id} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/30">
                <span
                  className="block h-full origin-left bg-white"
                  style={{ transform: `scaleX(${k < i ? 1 : k > i ? 0 : t / s.duration})` }}
                />
              </span>
            ))}
          </div>
          <p className="eyebrow absolute inset-x-5 top-16 text-[10px] text-kiwi md:top-20 md:inset-x-8">{s.topic}</p>
        </motion.div>

        <Neighbor index={i + 1} onClick={next} />
      </div>

      <div className="absolute right-4 top-4 z-10 flex gap-2 md:right-8 md:top-8">
        <button
          onClick={() => setPaused((p) => !p)}
          className="eyebrow rounded-full bg-white/10 px-4 py-2 text-white backdrop-blur hover:bg-white/20"
        >
          {paused ? 'Play' : 'Pause'}
        </button>
        <button onClick={onClose} className="eyebrow rounded-full bg-white px-4 py-2 text-darkest" data-cursor="Zu">
          Schließen ✕
        </button>
      </div>
      <p className="eyebrow absolute bottom-5 left-1/2 hidden -translate-x-1/2 text-[10px] text-white/50 md:block">
        ← → navigieren · Leertaste pausieren · Esc schließen
      </p>
    </motion.div>
  )
}

function Neighbor({ index, onClick }: { index: number; onClick: () => void }) {
  const s = statements[index]
  if (!s) return <div className="hidden w-[14vh] lg:block" />
  return (
    <button onClick={onClick} className="group relative hidden aspect-[9/16] h-[38%] overflow-hidden rounded-xl opacity-50 transition hover:opacity-90 lg:block">
      <Img src={s.poster} alt={s.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-darkest to-transparent" />
      <span className="absolute bottom-3 left-3 right-3 text-left text-sm font-semibold text-white">{s.name}</span>
    </button>
  )
}
