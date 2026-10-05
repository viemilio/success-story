import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef, useState } from 'react'
import { statements, type Scene as SceneT } from '../content'
import { Img } from './Img'
import { VoiceBubble } from './VoiceBubble'

function Line({ text, i, n, p, first }: { text: string; i: number; n: number; p: MotionValue<number>; first: boolean }) {
  const span = 0.8 / n
  const start = 0.08 + i * span
  const last = i === n - 1
  const opacity = useTransform(p, last ? [start, start + 0.08] : [start, start + 0.08, start + span, start + span + 0.06], last ? [0, 1] : [0, 1, 1, 0.22])
  const y = useTransform(p, [start, start + 0.12], [40, 0])
  const blur = useTransform(p, [start, start + 0.1], ['blur(10px)', 'blur(0px)'])
  return (
    <motion.p style={{ opacity, y, filter: blur }} className="text-[clamp(1.7rem,3.4vw,3.4rem)] font-medium leading-[1.12] tracking-[-0.025em]">
      {first && i === 0 ? text.charAt(0).toUpperCase() + text.slice(1) : text}
    </motion.p>
  )
}

/** Eine Briefseite als Filmszene: Bild im Hintergrund, Sätze erscheinen beim Scrollen. */
export function Scene({ scene, index, total, onVoice }: { scene: SceneT; index: number; total: number; onVoice: (i: number) => void }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const scale = useTransform(p, [0, 1], [1.18, 1])
  const bars = useTransform(p, [0, 0.06, 0.94, 1], [0, 1, 1, 0])
  const flash = useTransform(p, [0.42, 0.5, 0.75], [0, 1, 0.82])
  const [lit, setLit] = useState(false)
  useMotionValueEvent(flash, 'change', (v) => setLit(v > 0.5))
  const isFlash = scene.tone === 'flash'
  const dark = isFlash && lit

  return (
    <section id={scene.id} ref={ref} data-stamp={scene.stamp} data-place={scene.place} style={{ height: `${(scene.lines.length + 1) * 75}vh` }} className="relative">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div style={{ scale }} className="absolute inset-0">
          <Img
            src={scene.image}
            alt=""
            className={`h-full w-full object-cover ${scene.tone === 'memory' ? 'grayscale contrast-125 brightness-75' : ''}`}
          />
        </motion.div>
        <div
          className={`absolute inset-0 ${
            scene.tone === 'memory'
              ? 'bg-[#2a2010]/40 mix-blend-multiply'
              : scene.tone === 'day'
                ? 'bg-gradient-to-t from-darkest via-darkest/50 to-mhp/20'
                : 'bg-gradient-to-t from-black via-darkest/70 to-darkest/40'
          }`}
        />
        {scene.tone === 'memory' && <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,black_90%)]" />}
        {isFlash && <motion.div style={{ opacity: flash }} className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,#fff_0%,var(--color-kiwi)_35%,var(--color-vital)_90%)]" />}

        {/* Kino-Balken */}
        <motion.div style={{ scaleY: bars }} className="absolute inset-x-0 top-0 z-10 h-[7vh] origin-top bg-black" />
        <motion.div style={{ scaleY: bars }} className="absolute inset-x-0 bottom-0 z-10 h-[7vh] origin-bottom bg-black" />

        <div className={`relative z-20 flex h-full flex-col justify-center px-6 transition-colors duration-700 md:px-14 ${dark ? 'text-darkest' : 'text-white'}`}>
          <div className="mx-auto w-full max-w-5xl">
            <p className={`eyebrow mb-10 flex items-center gap-3 ${dark ? 'text-mhp' : 'text-kiwi'}`}>
              <span className="tabular-nums">{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
              <span className="h-px w-10 bg-current" />
              <span>{scene.stamp}</span>
              <span className="opacity-60">· {scene.place}</span>
            </p>
            <div className="flex flex-col gap-6">
              {scene.lines.map((l, i) => (
                <Line key={l} text={l} i={i} n={scene.lines.length} p={p} first={index === 0} />
              ))}
            </div>
          </div>

          {scene.voice !== undefined && (
            <div className="absolute bottom-[11vh] right-6 md:right-14">
              <VoiceBubble s={statements[scene.voice]} onClick={() => onVoice(scene.voice!)} size="md" />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
