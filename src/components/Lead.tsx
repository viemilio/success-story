import { motion } from 'motion/react'
import { lead } from '../content'
import { NewIndustrial } from './Logos'

const ease = [0.22, 1, 0.36, 1] as const

/** Redaktioneller Einstieg im Magazinsatz. */
export function Lead() {
  return (
    <section id="story" className="relative bg-paper px-5 py-24 md:px-10 md:py-40">
      <div className="grid gap-12 md:grid-cols-12">
        <aside className="md:col-span-3">
          <div className="sticky top-28 flex flex-col gap-6 border-t-4 border-mhp pt-5">
            <p className="eyebrow text-mhp">Die Story</p>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-4 text-sm md:grid-cols-1">
              {[
                ['Kunde', 'HALLBERG Antriebstechnik'],
                ['Standort', 'Aalen, 2.400 Beschäftigte'],
                ['Branche', 'Automotive Supplier'],
                ['Partner', 'MHP – A Porsche Company'],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-darkest/50">{k}</dt>
                  <dd className="font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>

        <div className="md:col-span-8 md:col-start-5">
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease }}
            className="text-[clamp(1.7rem,3.2vw,3rem)] font-medium leading-[1.12] tracking-[-0.025em] text-mhp"
          >
            Die Industrie stirbt nicht. Sie wechselt den Gang. Und manchmal zeigt ein einzelnes Werk, wie <NewIndustrial className="text-darkest" /> aussieht.
          </motion.p>

          <div className="mt-14 grid gap-8 text-lg leading-relaxed text-darkest/80 md:grid-cols-2">
            {lead.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 1, delay: i * 0.12, ease }}
              >
                {i === 0 && <span className="float-left mr-3 mt-1 text-[5rem] font-[800] leading-[0.75] text-vital">{lead.dropcap}</span>}
                {i === 0 ? p.slice(1) : p}
              </motion.p>
            ))}
          </div>

          <motion.figure
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease }}
            className="relative mt-20 border-l-4 border-kiwi pl-6 md:pl-10"
          >
            <blockquote className="display text-[clamp(2.4rem,5vw,5rem)] text-darkest">„Ein Plan B ist eine Einladung, Plan A nicht ernst zu nehmen.“</blockquote>
            <figcaption className="mt-6 eyebrow text-darkest/60">Jana Brenner, Werkleiterin</figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  )
}
