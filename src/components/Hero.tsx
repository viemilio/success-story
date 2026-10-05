import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import { lazy, Suspense, useRef } from 'react'
import { hero } from '../content'
import { Img } from './Img'

const WaveField = lazy(() => import('./WaveField').then((m) => ({ default: m.WaveField })))

const ease = [0.22, 1, 0.36, 1] as const

function Line({ children, delay, className = '' }: { children: React.ReactNode; delay: number; className?: string }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span
        className={`block ${className}`}
        initial={{ y: '105%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1.2, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.86])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const portraitY = useTransform(scrollYProgress, [0, 1], ['0%', '-25%'])

  // leichtes 3D-Kippen des Portraits zur Maus
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 20 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 })

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[640px] overflow-hidden bg-darkest"
      onPointerMove={(e) => {
        mx.set(e.clientX / window.innerWidth - 0.5)
        my.set(e.clientY / window.innerHeight - 0.5)
      }}
    >
      <div className="absolute inset-0 opacity-90">
        <Suspense fallback={null}>
          <WaveField />
        </Suspense>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-darkest/80 via-transparent to-darkest/60" />

      {ready && (
        <>
          <motion.div
            style={{ y: portraitY, rotateX: rx, rotateY: ry, transformPerspective: 900 }}
            initial={{ clipPath: 'inset(100% 0 0 0)', scale: 1.15 }}
            animate={{ clipPath: 'inset(0% 0 0 0)', scale: 1 }}
            transition={{ duration: 1.6, delay: 0.5, ease }}
            className="absolute right-[6vw] top-[14vh] hidden aspect-[3/4] w-[min(28vw,420px)] overflow-hidden rounded-[2px] md:block"
            data-cursor="Jana"
          >
            <Img src={hero.portrait} alt={`${hero.protagonist}, ${hero.role}`} className="h-full w-full object-cover" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-b from-mhp/80 via-transparent to-transparent mix-blend-multiply" />
            <div className="absolute top-0 inset-x-0 p-5">
              <p className="eyebrow text-kiwi">Protagonistin</p>
              <p className="mt-1 text-xl font-semibold">{hero.protagonist}</p>
              <p className="text-sm text-zircon/80">{hero.role}, {hero.client}</p>
            </div>
          </motion.div>

          <motion.div style={{ y, scale, opacity }} className="relative z-10 flex h-full flex-col justify-end px-6 pb-[12vh] md:px-10 origin-bottom-left">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }} className="eyebrow mb-8 flex flex-wrap items-center gap-3 text-zircon">
              <span className="rounded-full border border-zircon/40 px-3 py-1">Success Story</span>
              <span>Automotive · Smart Factory</span>
              <span className="text-zircon/50">Lesezeit 6 Min.</span>
            </motion.p>
            <h1 className="display text-[clamp(3.5rem,12vw,14rem)]">
              <Line delay={0.35}>18 Monate.</Line>
              <Line delay={0.5} className="text-kiwi">2.400 Gründe.</Line>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 1, ease }}
              className="mt-8 max-w-xl text-lg text-zircon md:text-xl"
            >
              Wie Werkleiterin {hero.protagonist} ein 71 Jahre altes Getriebewerk vor dem Aus bewahrte – und es gemeinsam mit MHP zur Fabrik der Zukunft machte.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="absolute bottom-6 right-6 z-10 flex items-center gap-3 eyebrow text-zircon/70 md:right-10"
          >
            Scrollen
            <span className="relative h-10 w-px overflow-hidden bg-white/20">
              <motion.span
                className="absolute inset-x-0 top-0 h-1/2 bg-kiwi"
                animate={{ y: ['-100%', '200%'] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              />
            </span>
          </motion.div>
        </>
      )}
    </section>
  )
}
