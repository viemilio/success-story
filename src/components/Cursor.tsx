import { motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'

export function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 })
  const [label, setLabel] = useState<string | null>(null)
  const [hover, setHover] = useState(false)
  const [enabled] = useState(() => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches)

  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add('has-cursor')
    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>('a, button, [data-cursor]')
      setHover(!!t)
      setLabel(t?.dataset.cursor ?? null)
    }
    window.addEventListener('pointermove', move)
    return () => {
      window.removeEventListener('pointermove', move)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [enabled, x, y])

  if (!enabled) return null
  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
    >
      <motion.div
        animate={{ width: label ? 96 : hover ? 56 : 14, height: label ? 96 : hover ? 56 : 14 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-white flex items-center justify-center"
      >
        {label && <span className="eyebrow text-[10px] text-black">{label}</span>}
      </motion.div>
    </motion.div>
  )
}
