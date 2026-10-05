import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { prologue } from '../content'
import { gsap, reducedMotion } from '../lib/scroll'

/** Text, der sich beim Scrollen Wort für Wort „einschreibt“. *Sternchen* = Akzent. */
export function Prologue() {
  const ref = useRef<HTMLElement>(null)
  const parts = prologue.split(/(\*[^*]+\*)/).filter(Boolean)

  useGSAP(
    () => {
      if (reducedMotion) return
      const words = gsap.utils.toArray<HTMLElement>('[data-word]')
      gsap.set(words, { opacity: 0.12 })
      gsap
        .timeline({
          scrollTrigger: { trigger: ref.current, start: 'top top', end: '+=180%', scrub: 0.6, pin: true },
        })
        .to(words, { opacity: 1, stagger: 0.1, ease: 'none' })
        .fromTo('[data-stamp]', { scale: 2.2, opacity: 0, rotate: -18 }, { scale: 1, opacity: 1, rotate: -8, ease: 'back.out(2)', duration: 0.6 }, '-=0.4')
    },
    { scope: ref },
  )

  return (
    <section id="prolog" ref={ref} className="relative flex min-h-[100svh] items-center bg-darkest px-6 py-28 md:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <p className="eyebrow mb-10 text-zircon/60">Prolog — Aalen, Ostwürttemberg</p>
        <p className="relative text-[clamp(1.9rem,4.4vw,4.4rem)] font-medium leading-[1.08] tracking-[-0.03em]">
          {parts.map((part, i) => {
            const accent = part.startsWith('*')
            const text = accent ? part.slice(1, -1) : part
            return text.split(/(\s+)/).map((w, j) =>
              w.trim() ? (
                <span key={`${i}-${j}`} data-word className={accent ? 'text-kiwi' : ''}>
                  {w}
                </span>
              ) : (
                w
              ),
            )
          })}
          <span
            data-stamp
            className="pointer-events-none absolute -bottom-16 right-0 hidden rounded-sm border-4 border-kiwi px-5 py-2 text-[clamp(1rem,2vw,1.6rem)] font-extrabold uppercase tracking-[0.2em] text-kiwi md:block"
            style={{ opacity: reducedMotion ? 1 : 0 }}
          >
            Frist läuft
          </span>
        </p>
      </div>
    </section>
  )
}
