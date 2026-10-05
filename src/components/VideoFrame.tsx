import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import type { Statement } from '../content'
import { Img } from './Img'

/**
 * Uhr für ein Statement. Mit echter Videodatei folgt sie `video.currentTime`,
 * ohne Datei läuft sie per requestAnimationFrame (animierte Vorschau).
 */
export function useStatementClock(
  s: Statement,
  playing: boolean,
  video: React.RefObject<HTMLVideoElement | null>,
  { loop = false, onEnd }: { loop?: boolean; onEnd?: () => void } = {},
) {
  const [clock, setClock] = useState({ id: s.id, t: 0 })
  const tRef = useRef(0)
  const idRef = useRef(s.id)
  const endRef = useRef(onEnd)
  useEffect(() => {
    endRef.current = onEnd
  })

  useEffect(() => {
    const v = video.current
    if (idRef.current !== s.id) {
      idRef.current = s.id
      tRef.current = 0
      if (v) v.currentTime = 0
    }
    if (s.src && v) {
      if (playing) v.play().catch(() => {})
      else v.pause()
    }
    if (!playing) return
    let raf = 0
    let last = performance.now()
    const tick = (now: number) => {
      if (s.src && v) tRef.current = v.currentTime
      else tRef.current += (now - last) / 1000
      last = now
      if (tRef.current >= s.duration) {
        if (loop) tRef.current = 0
        else {
          setClock({ id: s.id, t: s.duration })
          endRef.current?.()
          return
        }
      }
      setClock({ id: s.id, t: tRef.current })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [playing, s, video, loop])

  return clock.id === s.id ? clock.t : 0
}

const tc = (x: number) => `00:${String(Math.floor(x)).padStart(2, '0')}`

export function Equalizer({ active, className = '' }: { active: boolean; className?: string }) {
  return (
    <span className={`inline-flex h-4 items-end gap-[3px] ${className}`} aria-hidden>
      {[0.9, 0.5, 1.1, 0.7, 0.95].map((d, i) => (
        <span
          key={i}
          className="block h-full w-[3px] origin-bottom rounded-full bg-current"
          style={{ animation: active ? `eq ${d}s ease-in-out ${i * 0.12}s infinite` : 'none', transform: active ? undefined : 'scaleY(0.25)' }}
        />
      ))}
    </span>
  )
}

type Props = {
  s: Statement
  t: number
  playing: boolean
  video: React.RefObject<HTMLVideoElement | null>
  /** 'full' = Lower Third + große Untertitel, 'card' = kompakte Vorschau, 'bg' = nur Bild */
  mode?: 'full' | 'card' | 'bg'
  className?: string
}

/** Das eigentliche Bild: Video oder Ken-Burns-Vorschau mit Untertiteln. */
export function VideoFrame({ s, t, playing, video, mode = 'full', className = '' }: Props) {
  const p = s.duration ? t / s.duration : 0
  const caption = [...s.captions].reverse().find((c) => c.t <= t)

  return (
    <div className={`relative overflow-hidden bg-darkest ${className}`}>
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `scale(${1.06 + p * 0.12}) translate3d(${(p - 0.5) * -2.5}%, ${(p - 0.5) * -1.5}%, 0)` }}
      >
        <Img src={s.poster} alt={s.name} className="h-full w-full object-cover" draggable={false} />
      </div>
      {s.src && <video ref={video} src={s.src} playsInline muted={mode !== 'full'} loop={mode === 'bg'} className="absolute inset-0 h-full w-full object-cover" />}
      {mode !== 'bg' && <div className="absolute inset-0 bg-gradient-to-t from-darkest/90 via-darkest/10 to-darkest/30" />}

      {mode === 'full' && (
        <>
          <div className="absolute left-5 top-5 flex items-center gap-3 text-white md:left-8 md:top-8">
            <span className="flex items-center gap-2 rounded-full bg-darkest/60 px-3 py-1.5 backdrop-blur">
              <span className={`h-2 w-2 rounded-full ${playing ? 'bg-kiwi' : 'bg-white/50'}`} />
              <span className="eyebrow text-[10px]">Statement</span>
            </span>
            <span className="eyebrow tabular-nums text-[10px] text-white/70">
              {tc(t)} / {tc(s.duration)}
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
            <AnimatePresence mode="wait">
              {caption && (
                <motion.p
                  key={caption.text}
                  initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="max-w-[24ch] text-[clamp(1.4rem,2.6vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-white"
                >
                  {caption.text}
                </motion.p>
              )}
            </AnimatePresence>
            <div className="mt-5 flex items-end justify-between gap-4 text-white">
              <div className="border-l-4 border-kiwi pl-3">
                <p className="font-semibold">{s.name}</p>
                <p className="text-sm text-zircon/80">{s.role}</p>
              </div>
              <Equalizer active={playing} className="text-kiwi" />
            </div>
          </div>
        </>
      )}

      {mode === 'card' && caption && playing && (
        <p className="absolute inset-x-4 bottom-20 text-lg font-semibold leading-tight text-white">{caption.text}</p>
      )}
    </div>
  )
}
