import { motion } from 'motion/react'
import { credits, ending, moreStories } from '../content'
import { HallbergLogo, MhpLogo, NewIndustrial } from './Logos'

const ease = [0.22, 1, 0.36, 1] as const

/** Ende des Briefs im Licht, Unterschrift, Abspann. */
export function Ending({ onPlay }: { onPlay: () => void }) {
  return (
    <>
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,var(--color-darkest)_0%,var(--color-vital)_35%,var(--color-zircon)_70%,#fff_100%)] px-6 pb-40 pt-56 text-center md:px-14">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-15% 0px' }} className="mx-auto max-w-5xl">
          {ending.lines.map((l, i) => (
            <span key={l} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                variants={{ hidden: { y: '105%' }, show: { y: 0, transition: { duration: 1.3, delay: i * 0.25, ease } } }}
                className={`display block text-[clamp(3rem,8vw,8.5rem)] ${i === 0 ? 'text-white' : 'text-darkest'}`}
              >
                {l}
              </motion.span>
            </span>
          ))}
          <motion.p
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 2, delay: 0.8, ease: [0.65, 0, 0.35, 1] }}
            className="mx-auto mt-20 w-max -rotate-3 font-[family-name:var(--font-hand)] text-[clamp(3.5rem,8vw,7rem)] leading-none text-mhp"
          >
            {ending.signature}
          </motion.p>
        </motion.div>
      </section>

      {/* Abspann */}
      <section className="bg-white px-6 pb-24 pt-10 text-center text-darkest md:px-14">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-12">
          <span className="h-24 w-px bg-darkest/20" />
          {credits.map((c, i) => (
            <motion.div
              key={c.role}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 1, delay: i * 0.05, ease }}
            >
              <p className="eyebrow text-darkest/50">{c.role}</p>
              <p className="mt-3 text-[clamp(1.4rem,2.6vw,2.2rem)] font-semibold tracking-[-0.02em]">
                {c.name === 'The New Industrial' ? <NewIndustrial /> : c.name}
              </p>
            </motion.div>
          ))}
          <div className="mt-6 flex items-center gap-6 text-darkest">
            <HallbergLogo className="text-base" />
            <span className="text-darkest/30">×</span>
            <MhpLogo className="text-mhp" />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="mailto:info@mhp.com?subject=The%20New%20Industrial" className="rounded-full bg-mhp px-7 py-4 font-semibold text-white transition hover:bg-vital" data-cursor="Los">
              Ihre Geschichte mit MHP schreiben →
            </a>
            <button onClick={onPlay} className="rounded-full px-7 py-4 font-semibold ring-1 ring-darkest/20 transition hover:ring-darkest">
              ▶ Alle Stimmen ansehen
            </button>
          </div>
        </div>

        <ul className="mx-auto mt-28 max-w-5xl divide-y divide-darkest/10 border-t border-darkest/10 text-left">
          {moreStories.map((s) => (
            <li key={s.href}>
              <a href={s.href} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-6 py-6" data-cursor="Lesen">
                <span>
                  <span className="eyebrow text-vital">{s.tag}</span>
                  <span className="mt-2 block text-[clamp(1.1rem,2vw,1.7rem)] font-medium tracking-tight transition-transform duration-500 ease-apple group-hover:translate-x-3">{s.title}</span>
                </span>
                <span className="text-2xl transition-transform duration-500 ease-apple group-hover:-rotate-45">→</span>
              </a>
            </li>
          ))}
        </ul>
        <footer className="mx-auto mt-16 flex max-w-5xl flex-col items-center justify-between gap-4 text-sm text-darkest/60 md:flex-row">
          <p>© 2026 MHP Management- und IT-Beratung GmbH · Fiktive Beispiel-Story</p>
          <nav className="flex gap-6">
            <a href="https://www.mhp.com/de/impressum" className="hover:text-darkest">Impressum</a>
            <a href="https://www.mhp.com/de/datenschutz" className="hover:text-darkest">Datenschutz</a>
          </nav>
        </footer>
      </section>
    </>
  )
}
