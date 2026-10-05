import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { turns } from '../content'
import { gsap, ScrollTrigger } from '../lib/scroll'
import { ChapterMark } from './Why'

/** Kapitel 2: horizontale Reise durch vier Wendepunkte. */
export function Turns() {
  const ref = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const el = track.current!
        const distance = () => el.scrollWidth - window.innerWidth
        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            scrub: 0.8,
            pin: true,
            invalidateOnRefresh: true,
          },
        })
        gsap.utils.toArray<HTMLElement>('[data-turn-img]').forEach((img) => {
          gsap.fromTo(img, { xPercent: -6, scale: 1.18 }, {
            xPercent: 6,
            scale: 1.06,
            ease: 'none',
            scrollTrigger: { trigger: img.parentElement, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
          })
        })
        gsap.utils.toArray<HTMLElement>('[data-turn-text]').forEach((t) => {
          gsap.from(t.children, {
            y: 60,
            opacity: 0,
            stagger: 0.08,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: t, containerAnimation: tween, start: 'left 75%' },
          })
        })
        ScrollTrigger.refresh()
      })
    },
    { scope: ref },
  )

  return (
    <section id="wie" ref={ref} className="relative overflow-hidden bg-darkest">
      <div ref={track} className="flex flex-col md:h-[100svh] md:w-max md:flex-row">
        <div className="flex w-full shrink-0 flex-col justify-between px-6 py-28 md:h-full md:w-[60vw] md:px-10">
          <ChapterMark no="02" title="Das Wie" className="text-kiwi" />
          <h2 className="display text-[clamp(3rem,7.5vw,8.5rem)]">
            Vier Momente, die <span className="text-vital">alles</span> verändert haben.
          </h2>
          <p className="max-w-md text-lg text-zircon/80">
            Keine Roadmap, kein Wasserfall. Sondern Nächte, Entscheidungen und Menschen, die einander vertraut haben.
          </p>
        </div>

        {turns.map((t, i) => (
          <article key={t.no} className="relative flex w-full shrink-0 flex-col justify-center gap-10 py-10 md:h-full md:w-[82vw] md:py-[10vh] md:pr-[6vw]">
            <div className="relative h-[28vh] overflow-hidden md:h-[32vh]">
              <img data-turn-img src={t.image} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
              <div className={`absolute inset-0 ${i % 2 ? 'bg-vital/25' : 'bg-mhp/35'} mix-blend-multiply`} />
              <p className="eyebrow absolute left-4 top-4 rounded-full bg-darkest/70 px-3 py-1 text-kiwi backdrop-blur md:left-6 md:top-6">{t.time}</p>
            </div>
            <div data-turn-text className="grid gap-8 px-6 md:grid-cols-12 md:px-0">
              <span className="display tabular-nums text-[clamp(5rem,11vw,12rem)] leading-[0.75] text-vital md:col-span-3">{t.no}</span>
              <h3 className="display text-[clamp(2.2rem,3.6vw,4.2rem)] leading-[0.95] md:col-span-5">{t.title}</h3>
              <div className="flex flex-col gap-6 md:col-span-4">
                <p className="text-lg leading-relaxed text-zircon/85">{t.text}</p>
                <div className="flex items-end gap-4 border-t border-white/15 pt-5">
                  <span className="display tabular-nums text-[clamp(2.8rem,4.4vw,4.8rem)] text-kiwi">{t.stat}</span>
                  <span className="max-w-[12rem] pb-2 text-sm text-zircon/70">{t.statLabel}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
        <div className="hidden w-[10vw] shrink-0 md:block" />
      </div>
    </section>
  )
}
