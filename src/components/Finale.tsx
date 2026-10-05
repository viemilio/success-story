import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react'
import { useRef } from 'react'
import { finale, moreStories } from '../content'
import { reducedMotion } from '../lib/scroll'
import { Wordmark } from './Header'

const ease = [0.22, 1, 0.36, 1] as const

function Magnetic({ children, href }: { children: React.ReactNode; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useSpring(0, { stiffness: 200, damping: 15 })
  const y = useSpring(0, { stiffness: 200, damping: 15 })
  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x, y }}
      data-cursor="Los"
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * 0.35)
        y.set((e.clientY - r.top - r.height / 2) * 0.35)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
      className="group relative inline-flex h-44 w-44 items-center justify-center overflow-hidden rounded-full bg-kiwi text-center text-darkest md:h-56 md:w-56"
    >
      <span className="absolute inset-0 translate-y-full rounded-full bg-white transition-transform duration-500 ease-apple group-hover:translate-y-0" />
      <span className="relative px-6 text-lg font-semibold leading-tight">{children}</span>
    </motion.a>
  )
}

export function Finale() {
  const mx = useMotionValue(50)
  const my = useMotionValue(50)
  const spot = useMotionTemplate`radial-gradient(circle at ${mx}% ${my}%, transparent 0, transparent 14vmax, rgba(0,4,91,0.97) 30vmax)`

  return (
    <section
      id="finale"
      className="relative overflow-hidden bg-darkest"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        mx.set(((e.clientX - r.left) / r.width) * 100)
        my.set(((e.clientY - r.top) / r.height) * 100)
      }}
    >
      {/* „Lichtschalter“: Die Maus ist die Taschenlampe in der dunklen Halle */}
      <div className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_50%,var(--color-vital),var(--color-mhp)_55%,var(--color-darkest))]" />
        <p className="eyebrow relative mb-8 text-kiwi">Epilog · Halle 4, heute</p>
        <h2 className="display relative text-[clamp(4rem,14vw,16rem)]">
          Das Licht
          <br />
          <span className="text-kiwi">brennt noch.</span>
        </h2>
        {!reducedMotion && <motion.div aria-hidden style={{ background: spot }} className="pointer-events-none absolute inset-0 hidden md:block" />}
        <p className="relative mt-10 hidden eyebrow text-zircon/60 md:block">Bewegen Sie die Maus</p>
      </div>

      <div className="relative grid gap-16 px-6 py-28 md:grid-cols-12 md:px-10 md:py-40">
        <motion.blockquote
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease }}
          className="text-[clamp(1.8rem,3.6vw,3.6rem)] font-medium leading-[1.1] tracking-[-0.03em] md:col-span-8"
        >
          „{finale.quote}“
          <footer className="mt-6 text-base font-normal tracking-normal text-zircon">Jana Brenner, Werkleiterin, HALLBERG Antriebstechnik</footer>
        </motion.blockquote>
        <div className="flex items-center md:col-span-4 md:justify-end">
          <Magnetic href="mailto:info@mhp.com?subject=Unsere%20Transformationsgeschichte">Ihre Geschichte beginnt hier →</Magnetic>
        </div>
      </div>

      <div className="relative border-t border-white/10 px-6 py-16 md:px-10">
        <p className="eyebrow mb-8 text-zircon/60">Weiterlesen</p>
        <ul className="divide-y divide-white/10">
          {moreStories.map((s) => (
            <li key={s.href}>
              <a href={s.href} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-6 py-6" data-cursor="Lesen">
                <span>
                  <span className="eyebrow text-kiwi">{s.tag}</span>
                  <span className="mt-2 block text-[clamp(1.3rem,2.4vw,2.2rem)] font-medium tracking-tight transition-transform duration-500 ease-apple group-hover:translate-x-3">{s.title}</span>
                </span>
                <span className="text-3xl transition-transform duration-500 ease-apple group-hover:-rotate-45">→</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <footer className="relative flex flex-col gap-6 border-t border-white/10 px-6 py-10 text-sm text-zircon/70 md:flex-row md:items-center md:justify-between md:px-10">
        <Wordmark className="text-white" />
        <p>© 2026 MHP Management- und IT-Beratung GmbH · Fiktive Beispiel-Story</p>
        <nav className="flex gap-6">
          <a href="https://www.mhp.com/de/impressum" className="hover:text-white">Impressum</a>
          <a href="https://www.mhp.com/de/datenschutz" className="hover:text-white">Datenschutz</a>
        </nav>
      </footer>
    </section>
  )
}
