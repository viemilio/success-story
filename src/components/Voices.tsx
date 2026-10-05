import { motion } from 'motion/react'
import { useRef, useState } from 'react'
import { voices } from '../content'
import { Img } from './Img'
import { ChapterMark } from './Why'

const ease = [0.22, 1, 0.36, 1] as const

export function Voices() {
  const viewport = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const v = voices[active]

  return (
    <section id="stimmen" className="relative overflow-hidden bg-mhp py-32 md:py-44">
      <div className="px-6 md:px-10">
        <ChapterMark no="04" title="Die Stimmen" className="text-kiwi" />
        <div className="mt-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <h2 className="display max-w-[12ch] text-[clamp(3rem,7vw,8rem)]">Eine Halle. 2.400 Geschichten.</h2>
          <p className="max-w-xs text-zircon/80">Ziehen Sie die Karten, klicken Sie auf ein Gesicht.</p>
        </div>
      </div>

      {/* Großes Zitat der gewählten Person */}
      <div className="mt-16 min-h-[14rem] px-6 md:min-h-[18rem] md:px-10">
        <motion.blockquote
          key={v.name}
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease }}
          className="max-w-5xl text-[clamp(1.6rem,3.4vw,3.4rem)] font-medium leading-[1.1] tracking-[-0.025em]"
        >
          <span className="text-kiwi">„</span>
          {v.quote}
          <span className="text-kiwi">“</span>
          <footer className="mt-6 text-base font-normal tracking-normal text-zircon">
            <strong className="font-semibold text-white">{v.name}</strong> · {v.role}
          </footer>
        </motion.blockquote>
      </div>

      <div ref={viewport} className="mt-12 overflow-hidden pl-6 md:pl-10" data-cursor="Ziehen">
        <motion.div drag="x" dragConstraints={viewport} dragElastic={0.12} className="flex w-max gap-5 pr-10">
          {voices.map((p, i) => (
            <motion.button
              key={p.name}
              onClick={() => setActive(i)}
              whileHover={{ y: -10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className={`group relative h-[52vh] max-h-[520px] w-[72vw] max-w-[360px] shrink-0 overflow-hidden text-left outline-offset-4 ${i === active ? 'ring-4 ring-kiwi' : ''}`}
            >
              <Img src={p.image} alt={p.name} draggable={false} className="pointer-events-none h-full w-full object-cover grayscale transition duration-700 ease-apple group-hover:scale-105 group-hover:grayscale-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-darkest via-darkest/10 to-transparent" />
              <div className={`absolute inset-0 bg-vital mix-blend-color transition-opacity duration-500 ${i === active ? 'opacity-0' : 'opacity-60 group-hover:opacity-0'}`} />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-xl font-semibold">{p.name}</p>
                <p className="text-sm text-zircon/80">{p.role}</p>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
