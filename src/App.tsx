import { AnimatePresence, LayoutGroup } from 'motion/react'
import { useEffect, useState } from 'react'
import { Closing } from './components/Closing'
import { Cover } from './components/Cover'
import { Cursor } from './components/Cursor'
import { Interview } from './components/Interview'
import { Lead } from './components/Lead'
import { Masthead } from './components/Masthead'
import { Numbers } from './components/Numbers'
import { Pillars } from './components/Pillars'
import { StoryPlayer } from './components/StoryPlayer'
import { StoryWall } from './components/StoryWall'
import { Timeline } from './components/Timeline'
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
    <LayoutGroup>
      <Cursor />
      <Masthead onPlay={() => setStory(0)} />
      <main>
        <Cover ready={ready} onPlay={() => setStory(0)} />
        <StoryWall onOpen={setStory} />
        <Lead />
        <Pillars />
        <Interview />
        <Numbers />
        <Timeline />
        <Closing onPlay={() => setStory(0)} />
      </main>
      <AnimatePresence>{story !== null && <StoryPlayer start={story} onClose={() => setStory(null)} />}</AnimatePresence>
    </LayoutGroup>
  )
}
