import { useLayoutEffect, useRef } from 'react'

const HIDDEN_CLASSES = ['opacity-0', 'translate-y-8']

export function useReveal<T extends HTMLElement>(delayMs = 0) {
  const ref = useRef<T>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.remove(...HIDDEN_CLASSES)
      return
    }

    if (delayMs) el.style.transitionDelay = `${delayMs}ms`

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove(...HIDDEN_CLASSES)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delayMs])

  return ref
}

export const revealHidden = 'opacity-0 translate-y-8 transition-[opacity,transform] duration-700 ease-out'
