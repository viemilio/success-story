import { AnimatePresence } from 'motion/react'
import { Fragment, useEffect, useState } from 'react'
import { scenes } from './content'
import { Cursor } from './components/Cursor'
import { Ending } from './components/Ending'
import { Hud } from './components/Hud'
import { Intro } from './components/Intro'
import { Lights } from './components/Lights'
import { Scene } from './components/Scene'
import { StoryPlayer } from './components/StoryPlayer'
import { Voices } from './components/Voices'
import { startSmoothScroll } from './lib/scroll'

export default function App() {
  const [ready, setReady] = useState(false)
  const [story, setStory] = useState<number | null>(null)

  useEffect(() => {
    window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
    const stop = startSmoothScroll()
    const id = requestAnimationFrame(() => setReady(true))
    return () => {
      stop()
      cancelAnimationFrame(id)
    }
  }, [])

  return (
    <>
      <Cursor />
      <Hud onPlay={() => setStory(0)} />
      <div className="grain" aria-hidden />
      <main>
        <Intro ready={ready} />
        {scenes.map((s, i) => (
          <Fragment key={s.id}>
            <Scene scene={s} index={i} total={scenes.length} onVoice={setStory} />
            {s.id === 'mail' && <Lights />}
            {s.id === 'rotor' && <Voices onOpen={setStory} />}
          </Fragment>
        ))}
        <Ending onPlay={() => setStory(0)} />
      </main>
      <AnimatePresence>{story !== null && <StoryPlayer start={story} onClose={() => setStory(null)} />}</AnimatePresence>
    </>
  )
}
