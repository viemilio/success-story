import { useState, type ImgHTMLAttributes } from 'react'

/**
 * Bild mit markenkonformem Fallback: Lädt ein (Platzhalter-)Foto nicht, wird
 * zuerst `fallback` versucht, danach erscheint eine Fläche im MHP-Verlauf.
 */
export function Img({ className = '', alt, src, fallback, ...rest }: ImgHTMLAttributes<HTMLImageElement> & { fallback?: string }) {
  const [stage, setStage] = useState<0 | 1 | 2>(0)
  if (stage === 2 || !src)
    return (
      <div
        role="img"
        aria-label={alt}
        className={`${className} bg-[radial-gradient(120%_90%_at_30%_20%,var(--color-vital),var(--color-mhp)_45%,var(--color-darkest))]`}
      />
    )
  return (
    <img
      alt={alt}
      src={stage === 0 ? src : fallback}
      loading="lazy"
      decoding="async"
      onError={() => setStage(stage === 0 && fallback ? 1 : 2)}
      className={className}
      {...rest}
    />
  )
}
