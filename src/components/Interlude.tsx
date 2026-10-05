import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { interlude } from '../content'
import { Img } from './Img'

/** Bild öffnet sich beim Scrollen vom schmalen Streifen zum Vollbild. */
export function Interlude() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const clip = useTransform(scrollYProgress, [0, 0.45], ['inset(38% 30% 38% 30% round 999px)', 'inset(0% 0% 0% 0% round 0px)'])
  const scale = useTransform(scrollYProgress, [0, 0.6], [1.5, 1])
  const textOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1])
  const textY = useTransform(scrollYProgress, [0.4, 0.7], [80, 0])

  return (
    <section ref={ref} className="relative h-[260vh] bg-darkest">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div style={{ clipPath: clip }} className="absolute inset-0">
          <motion.div style={{ scale }} className="h-full w-full">
            <Img src={interlude.image} fallback="/img/forest.webp" alt="" loading="eager" className="h-full w-full object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-darkest via-darkest/50 to-darkest/10" />
        </motion.div>
        <motion.figure style={{ opacity: textOpacity, y: textY }} className="relative z-10 flex h-full flex-col justify-end px-6 pb-[12vh] md:px-10">
          <span className="display text-[10rem] leading-[0.4] text-mint">“</span>
          <blockquote className="display max-w-[18ch] text-[clamp(2.4rem,6.2vw,7rem)]">{interlude.quote}</blockquote>
          <figcaption className="mt-10 flex items-center gap-4">
            <span className="h-px w-12 bg-mint" />
            <span>
              <span className="block font-semibold">{interlude.author}</span>
              <span className="block text-sm text-zircon/80">{interlude.role}</span>
            </span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  )
}
