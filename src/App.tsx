import { AnimatePresence } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'
import { Cursor } from './components/Cursor'
import { Finale } from './components/Finale'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Impact } from './components/Impact'
import { Interlude } from './components/Interlude'
import { Loader } from './components/Loader'
import { Marquee } from './components/Marquee'
import { Prologue } from './components/Prologue'
import { Stakes } from './components/Stakes'
import { Turns } from './components/Turns'
import { Voices } from './components/Voices'
import { Why } from './components/Why'
import { lockScroll, reducedMotion, ScrollTrigger, startSmoothScroll } from './lib/scroll'

export default function App() {
  const [loading, setLoading] = useState(!reducedMotion)
  const done = useCallback(() => setLoading(false), [])

  useEffect(() => {
    window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
    return startSmoothScroll()
  }, [])

  useEffect(() => {
    lockScroll(loading)
    if (!loading) requestAnimationFrame(() => ScrollTrigger.refresh())
  }, [loading])

  return (
    <>
      <AnimatePresence>{loading && <Loader onDone={done} />}</AnimatePresence>
      <Cursor />
      <Header />
      <div className="grain" aria-hidden />
      <main>
        <Hero ready={!loading} />
        <Prologue />
        <Why />
        <Marquee items={['Mut', 'Vertrauen', 'Zukunft', 'Aalen']} className="bg-kiwi text-darkest" />
        <Stakes />
        <Turns />
        <Interlude />
        <Impact />
        <Voices />
        <Finale />
      </main>
    </>
  )
}
