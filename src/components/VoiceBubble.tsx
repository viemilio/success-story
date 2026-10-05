import { motion } from 'motion/react'
import { useRef, useState } from 'react'
import type { Statement } from '../content'
import { useStatementClock, VideoFrame } from './VideoFrame'

/** Runde Video-Bubble wie ein Facetime-Anruf; Ring zeigt den Fortschritt. */
export function VoiceBubble({ s, onClick, size = 'lg' }: { s: Statement; onClick: () => void; size?: 'md' | 'lg' }) {
  const [hover, setHover] = useState(false)
  const video = useRef<HTMLVideoElement>(null)
  const t = useStatementClock(s, true, video, { loop: true })
  const dim = size === 'lg' ? 'h-40 w-40 md:h-52 md:w-52' : 'h-28 w-28 md:h-36 md:w-36'
  const c = 2 * Math.PI * 48

  return (
    <button
      onClick={onClick}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      className="group flex flex-col items-center gap-3 text-center text-white"
      data-cursor="Play"
      aria-label={`Statement von ${s.name} ansehen`}
    >
      <motion.span animate={{ scale: hover ? 1.08 : 1 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className={`relative block ${dim}`}>
        <span className="absolute inset-[6px] overflow-hidden rounded-full">
          <VideoFrame s={s} t={t} playing video={video} mode="bg" className="h-full w-full" />
          <span className="absolute inset-0 bg-darkest/20 transition group-hover:bg-transparent" />
        </span>
        <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
          <circle cx="50" cy="50" r="48" fill="none" stroke="white" strokeOpacity="0.2" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="48" fill="none" stroke="var(--color-kiwi)" strokeWidth="2" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - t / s.duration)} />
        </svg>
        <span className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full bg-kiwi text-xs text-darkest shadow-lg">▶</span>
      </motion.span>
      <span>
        <span className="block font-semibold">{s.name}</span>
        <span className="block max-w-[14rem] text-xs text-zircon/70">{s.role}</span>
      </span>
    </button>
  )
}
