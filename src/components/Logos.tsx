/** Fiktives Kundenlogo – durch das echte Logo ersetzen. */
export function HallbergLogo({ className = '', compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-[0.55em] ${className}`} aria-label="HALLBERG Antriebstechnik">
      <svg viewBox="0 0 40 40" className="h-[2.1em] w-[2.1em] shrink-0" fill="none" stroke="currentColor" aria-hidden>
        <circle cx="20" cy="20" r="17.5" strokeWidth="3" />
        <path d="M13.5 11v18M26.5 11v18M13.5 20h13" strokeWidth="3.4" strokeLinecap="square" />
        <circle cx="20" cy="20" r="2.4" fill="currentColor" stroke="none" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-[800] tracking-[0.18em]">HALLBERG</span>
        {!compact && <span className="mt-[0.35em] text-[0.48em] font-semibold tracking-[0.32em] opacity-70">ANTRIEBSTECHNIK</span>}
      </span>
    </span>
  )
}

export function MhpLogo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-2 whitespace-nowrap ${className}`}>
      <span className="text-[1.35em] font-[800] tracking-[-0.04em]">MHP</span>
      <span className="text-[0.7em] font-medium tracking-wide opacity-80">A Porsche Company</span>
    </span>
  )
}

/** Typografische Kampagnenmarke „The New Industrial“. */
export function NewIndustrial({ className = '', onDark = false }: { className?: string; onDark?: boolean }) {
  return (
    <span className={`font-[800] uppercase tracking-[-0.02em] ${className}`}>
      The New <span className={onDark ? 'text-kiwi' : 'text-vital'}>Industrial</span>
    </span>
  )
}
