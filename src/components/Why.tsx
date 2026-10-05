import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { why } from '../content'
import { Img } from './Img'

const ease = [0.22, 1, 0.36, 1] as const

export function ChapterMark({ no, title, className = '' }: { no: string; title: string; className?: string }) {
  return (
    <div className={`flex items-center gap-4 eyebrow ${className}`}>
      <span className="tabular-nums">{no}</span>
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease }}
        className="h-px w-16 origin-left bg-current"
      />
      <span>{title}</span>
    </div>
  )
}

export function Why() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  const clip = useTransform(scrollYProgress, [0.05, 0.4], ['inset(18% 12% 18% 12%)', 'inset(0% 0% 0% 0%)'])
  const quoteWords = why.quote.split(' ')

  return (
    <section id="warum" ref={ref} data-header="light" className="relative bg-zircon text-darkest">
      <div className="px-6 pt-32 md:px-10 md:pt-44">
        <ChapterMark no="01" title="Das Warum" className="text-mhp" />
        <motion.blockquote
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-15% 0px' }}
                    className="display mt-12 max-w-[14ch] text-[clamp(3rem,9vw,10rem)] text-mhp"
        >
          {quoteWords.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <motion.span
                className="inline-block"
                variants={{ hidden: { y: '110%' }, show: { y: 0, transition: { duration: 1, delay: i * 0.05, ease } } }}
              >
                {i === 0 ? '„' : ''}
                {w}
                {i === quoteWords.length - 1 ? '“' : ''}&nbsp;
              </motion.span>
            </span>
          ))}
        </motion.blockquote>
        <p className="mt-8 eyebrow text-mhp/70">— Jana Brenner, Werkleiterin</p>
      </div>

      <div className="mt-24 grid gap-12 px-6 pb-32 md:grid-cols-12 md:px-10 md:pb-44">
        <motion.figure style={{ clipPath: clip }} className="relative aspect-[4/5] overflow-hidden md:col-span-7 md:aspect-[16/11]">
          <motion.div style={{ y: imgY }} className="absolute -inset-y-[14%] inset-x-0">
            <Img src={why.image} alt={why.caption} className="h-full w-full object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-mhp/25 mix-blend-multiply" />
          <figcaption className="absolute bottom-0 left-0 bg-darkest px-4 py-3 text-xs text-zircon md:text-sm">{why.caption}</figcaption>
        </motion.figure>

        <div className="flex flex-col justify-end gap-8 md:col-span-5 md:pl-6">
          {why.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 1, delay: i * 0.15, ease }}
              className={i === 0 ? 'text-2xl font-medium leading-snug tracking-tight md:text-3xl' : 'text-lg leading-relaxed text-darkest/75'}
            >
              {i === 0 && <span className="float-left mr-3 mt-1 text-[4.5rem] font-bold leading-[0.8] text-vital">J</span>}
              {i === 0 ? p.slice(1) : p}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  )
}
