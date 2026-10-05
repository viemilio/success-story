import { animate, motion } from 'motion/react'
import { useEffect, useState } from 'react'

export function Loader({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    const c = animate(0, 100, {
      duration: 1.9,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setN(Math.round(v)),
      onComplete: () => setTimeout(onDone, 250),
    })
    return () => c.stop()
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex flex-col justify-between bg-darkest p-6 md:p-10"
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      initial={{ clipPath: 'inset(0 0 0% 0)' }}
      transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="flex justify-between eyebrow text-zircon/70">
        <span>MHP · Success Story</span>
        <span>Nr. 027</span>
      </div>
      <div className="overflow-hidden">
        <motion.p
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="display text-[clamp(2.5rem,7vw,7rem)] max-w-5xl"
        >
          Eine Geschichte über Mut, ein altes Werk und <span className="text-kiwi">2.400 Menschen.</span>
        </motion.p>
      </div>
      <div className="flex items-end justify-between">
        <div className="h-px flex-1 mr-8 bg-white/15 relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 bg-kiwi" style={{ width: `${n}%` }} />
        </div>
        <span className="display tabular-nums text-[clamp(4rem,12vw,11rem)] text-vital">{n}</span>
      </div>
    </motion.div>
  )
}
