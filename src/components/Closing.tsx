import { motion } from 'motion/react'
import { closing, moreStories } from '../content'
import { HallbergLogo, MhpLogo, NewIndustrial } from './Logos'

const ease = [0.22, 1, 0.36, 1] as const

export function Closing({ onPlay }: { onPlay: () => void }) {
  return (
    <section data-header="dark" className="relative overflow-hidden bg-darkest text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_80%_10%,var(--color-vital),transparent_60%)] opacity-60" />
      <div className="relative px-5 pb-20 pt-32 md:px-10 md:pt-48">
        <h2 className="display text-[clamp(3rem,9vw,10rem)]">
          {closing.line.map((l, i) => (
            <span key={l} className="block overflow-hidden pb-[0.05em]">
              <motion.span
                className={`block ${i === 0 ? 'text-kiwi' : i === 2 ? 'text-zircon' : ''}`}
                initial={{ y: '105%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: i * 0.12, ease }}
              >
                {l}
              </motion.span>
            </span>
          ))}
        </h2>
        <p className="mt-10 max-w-xl text-xl text-zircon/80">{closing.sub}</p>

        <div className="mt-16 flex flex-wrap gap-3">
          <a href="mailto:info@mhp.com?subject=The%20New%20Industrial" className="rounded-full bg-kiwi px-7 py-4 font-semibold text-darkest transition hover:bg-white" data-cursor="Los">
            Ihre New-Industrial-Story starten →
          </a>
          <button onClick={onPlay} className="rounded-full border border-white/30 px-7 py-4 font-semibold transition hover:border-white">
            ▶ Statements ansehen
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden border-y border-white/10 py-5" aria-hidden>
        <div className="inline-flex animate-[marquee_30s_linear_infinite] whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="mx-8 inline-flex items-center gap-8 text-[clamp(1.6rem,3vw,2.6rem)]">
              <NewIndustrial onDark className="text-white" />
              <span className="h-2 w-2 rounded-full bg-vital" />
            </span>
          ))}
        </div>
      </div>

      <div className="relative px-5 py-16 md:px-10">
        <p className="eyebrow mb-6 text-zircon/60">Weiterlesen</p>
        <ul className="divide-y divide-white/10">
          {moreStories.map((s) => (
            <li key={s.href}>
              <a href={s.href} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-6 py-6" data-cursor="Lesen">
                <span>
                  <span className="eyebrow text-kiwi">{s.tag}</span>
                  <span className="mt-2 block text-[clamp(1.2rem,2.2vw,2rem)] font-medium tracking-tight transition-transform duration-500 ease-apple group-hover:translate-x-3">{s.title}</span>
                </span>
                <span className="text-3xl transition-transform duration-500 ease-apple group-hover:-rotate-45">→</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <footer className="relative flex flex-col gap-6 border-t border-white/10 px-5 py-10 text-sm text-zircon/70 md:flex-row md:items-center md:justify-between md:px-10">
        <div className="flex items-center gap-6 text-white">
          <MhpLogo />
          <span className="text-white/30">×</span>
          <HallbergLogo className="text-xs" />
        </div>
        <p>© 2026 MHP Management- und IT-Beratung GmbH · Fiktive Beispiel-Story</p>
        <nav className="flex gap-6">
          <a href="https://www.mhp.com/de/impressum" className="hover:text-white">Impressum</a>
          <a href="https://www.mhp.com/de/datenschutz" className="hover:text-white">Datenschutz</a>
        </nav>
      </footer>
    </section>
  )
}
