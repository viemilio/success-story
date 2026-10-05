import { motion, useScroll } from 'motion/react'
import { useRef } from 'react'
import { timeline } from '../content'

const ease = [0.22, 1, 0.36, 1] as const

/** Fahrplan: Linie füllt sich beim Scrollen, Stationen springen ein. */
export function Timeline() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })

  return (
    <section className="relative bg-white px-5 py-24 md:px-10 md:py-40">
      <div className="mb-16 text-center">
        <p className="eyebrow text-vital">Der Fahrplan</p>
        <h2 className="display mt-6 text-[clamp(2.8rem,6vw,6.5rem)] text-mhp">18 Monate in sechs Etappen.</h2>
      </div>
      <div ref={ref} className="relative mx-auto max-w-5xl">
        <div className="absolute bottom-0 left-4 top-0 w-[3px] bg-darkest/10 md:left-1/2 md:-translate-x-1/2" />
        <motion.div style={{ scaleY: scrollYProgress }} className="absolute bottom-0 left-4 top-0 w-[3px] origin-top bg-vital md:left-1/2 md:-translate-x-1/2" />
        <ol className="space-y-14 md:space-y-20">
          {timeline.map((e, i) => (
            <motion.li
              key={e.date}
              initial={{ opacity: 0, x: i % 2 ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-15% 0px' }}
              transition={{ duration: 0.9, ease }}
              className={`relative pl-14 md:w-1/2 md:pl-0 ${i % 2 ? 'md:ml-auto md:pl-16' : 'md:pr-16 md:text-right'}`}
            >
              <span className={`absolute left-[6px] top-1 h-5 w-5 rounded-full border-4 border-vital bg-kiwi ${i % 2 ? 'md:-left-[10px]' : 'md:left-auto md:-right-[10px]'}`} />
              <p className="eyebrow text-vital">{e.date}</p>
              <h3 className="mt-2 text-[clamp(1.8rem,3vw,2.8rem)] font-[750] tracking-[-0.03em] text-darkest">{e.title}</h3>
              <p className="mt-2 text-lg text-darkest/70">{e.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
