export function Marquee({ items, className = '' }: { items: string[]; className?: string }) {
  const row = [...items, ...items]
  return (
    <div data-header="light" className={`overflow-hidden whitespace-nowrap py-6 ${className}`} aria-hidden>
      <div className="inline-flex animate-[marquee_28s_linear_infinite]">
        {row.map((t, i) => (
          <span key={i} className="display mx-6 inline-flex items-center gap-12 text-[clamp(2.5rem,6vw,6rem)]">
            {t}
            <span className="inline-block h-[0.35em] w-[0.35em] rounded-full bg-current" />
          </span>
        ))}
      </div>
    </div>
  )
}
