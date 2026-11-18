// Page effect tied to the simulator: section dividers drawn as travelling waves
// (period follows the wavelength, amplitude beats like the two-slit fringe envelope).

import { pagePeriodPx, prefersReducedMotion, waveState } from './wave'

export function runDividers(root: HTMLElement): () => void {
  const still = prefersReducedMotion()
  const canvases = Array.from(root.querySelectorAll<HTMLCanvasElement>('canvas.wdiv'))
  let raf = 0
  const t0 = performance.now()

  const draw = (now: number) => {
    const t = (now - t0) / 1000
    const dp = Math.min(window.devicePixelRatio || 1, 2)
    const col = `rgb(${waveState.rgb.join(',')})`
    const P = pagePeriodPx(waveState.nm)
    canvases.forEach((c, idx) => {
      const r = c.getBoundingClientRect()
      if (r.bottom < 0 || r.top > window.innerHeight) return
      if (c.width !== Math.round(r.width * dp)) {
        c.width = Math.round(r.width * dp)
        c.height = Math.round(r.height * dp)
      }
      const g = c.getContext('2d')!
      const mid = r.height / 2
      const beat = Math.max(90, Math.min(3000, r.width * 0.9 * (waveState.nm / waveState.slitNm)))
      g.setTransform(dp, 0, 0, dp, 0, 0)
      g.clearRect(0, 0, r.width, r.height)
      g.strokeStyle = col
      g.lineWidth = 2
      g.lineJoin = 'round'
      g.beginPath()
      for (let x = 0; x <= r.width; x += 2) {
        const env = 0.25 + 0.75 * Math.pow(Math.cos((Math.PI * (x - t * 20)) / beat), 2)
        const y = mid + (mid - 2) * env * Math.sin((2 * Math.PI * x) / P - t * 3 - idx)
        if (x) g.lineTo(x, y)
        else g.moveTo(x, y)
      }
      g.stroke()
    })
    if (!still) raf = requestAnimationFrame(draw)
  }
  raf = requestAnimationFrame(draw)
  // static frames need a redraw when scrolled into view
  const onScroll = () => { if (still) requestAnimationFrame(draw) }
  window.addEventListener('scroll', onScroll, { passive: true })
  return () => {
    cancelAnimationFrame(raf)
    window.removeEventListener('scroll', onScroll)
  }
}
