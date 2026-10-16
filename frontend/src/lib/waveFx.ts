// Page effects tied to the simulator:
//  1. Section dividers drawn as travelling waves (period follows the wavelength,
//     amplitude beats like the two-slit fringe envelope).
//  2. Click ripples: a 2D scalar wave equation on a 2 px grid covering the whole document,
//     so waves keep travelling below the fold and are there when you scroll.
//     Walls are the real glyph shapes of the page text, plus images and controls,
//     so waves pass between letters, diffract around small text and reflect off the title.

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

const CELL = 2 // px per grid cell
const C2 = 0.45 // (c·dt/dx)², stable below 0.5
const STEPS = 2 // steps per frame ≈ 160 px/s
const DAMP = 0.998 // per step: amplitude ×0.79 per second on top of geometric spreading
const NO_RIPPLE = 'a,button,input,label,output,dialog,canvas,.person,.site-nav,.contact'

interface Source { x: number; y: number; period: number; age: number }

/**
 * The grid lives in document coordinates (whole page height). Only the active band of rows
 * is stepped, and only the rows under the viewport are drawn on the fixed `layer` canvas.
 */
export function runRipples(root: HTMLElement, layer: HTMLCanvasElement): () => void {
  if (prefersReducedMotion()) return () => {}
  let gw = 0, gh = 0, vh = 0
  let u = new Float32Array(0), up = new Float32Array(0), wall = new Uint8Array(0)
  let off: HTMLCanvasElement, ox: CanvasRenderingContext2D, img: ImageData
  let active = false, ready = false, raf = 0
  let y0 = 0, y1 = 0, x0 = 0, x1 = 0 // active box, in cells
  let sources: Source[] = []

  const docHeight = () => Math.max(document.documentElement.scrollHeight, window.innerHeight)

  const allocate = () => {
    const dp = Math.min(window.devicePixelRatio || 1, 2)
    layer.width = window.innerWidth * dp
    layer.height = window.innerHeight * dp
    gw = Math.ceil(window.innerWidth / CELL)
    gh = Math.ceil(docHeight() / CELL)
    vh = Math.ceil(window.innerHeight / CELL) + 1
    u = new Float32Array(gw * gh)
    up = new Float32Array(gw * gh)
    wall = new Uint8Array(gw * gh)
    off = document.createElement('canvas')
    off.width = gw
    off.height = vh
    ox = off.getContext('2d')!
    img = ox.createImageData(gw, vh)
    sources = []
    active = false
    buildMask()
    ready = true
  }

  // Walls: every character of the page drawn in its computed font at its document position,
  // plus images, the simulator and its controls, the team card outline and the footer.
  const buildMask = () => {
    const mask = document.createElement('canvas')
    mask.width = gw
    mask.height = gh
    const g = mask.getContext('2d', { willReadFrequently: true })!
    const sy = window.scrollY
    g.fillStyle = '#000'
    g.strokeStyle = '#000'
    g.textBaseline = 'alphabetic'
    g.setTransform(1 / CELL, 0, 0, 1 / CELL, 0, 0)
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => (n.nodeValue && n.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT),
    })
    const range = document.createRange()
    let n: Node | null
    while ((n = walker.nextNode())) {
      const el = n.parentElement
      if (!el || el.closest('canvas,dialog,.contact,.site-nav,script,style')) continue
      const cs = getComputedStyle(el)
      g.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`
      const m = g.measureText('Hg')
      const size = parseFloat(cs.fontSize)
      const asc = m.fontBoundingBoxAscent || size * 0.8
      const desc = m.fontBoundingBoxDescent || size * 0.2
      const s = n.nodeValue!
      for (let i = 0; i < s.length; i++) {
        if (s[i] === ' ' || s[i] === '\n') continue
        range.setStart(n, i)
        range.setEnd(n, i + 1)
        const r = range.getBoundingClientRect()
        if (!r.width) continue
        g.fillText(s[i], r.left, r.top + sy + (r.height - (asc + desc)) / 2 + asc)
      }
    }
    root.querySelectorAll('img, .slit canvas, .slit input, .contact').forEach((el) => {
      const r = el.getBoundingClientRect()
      g.fillRect(r.left, r.top + sy, r.width, r.height)
    })
    root.querySelectorAll('.person').forEach((el) => {
      const r = el.getBoundingClientRect()
      g.lineWidth = 2
      g.strokeRect(r.left + 1, r.top + sy + 1, r.width - 2, r.height - 2)
    })
    const d = g.getImageData(0, 0, gw, gh).data
    for (let i = 0; i < gw * gh; i++) wall[i] = d[i * 4 + 3] > 110 ? 1 : 0
  }

  const step = () => {
    for (let k = sources.length - 1; k >= 0; k--) {
      const s = sources[k]
      const ph = s.age / s.period
      if (ph > 3) { sources.splice(k, 1); continue }
      const amp = 1.2 * Math.sin(2 * Math.PI * ph) * Math.sin((Math.PI * ph) / 3)
      for (let y = -2; y <= 2; y++) for (let x = -2; x <= 2; x++) {
        const X = s.x + x, Y = s.y + y
        if (X < 1 || Y < 1 || X >= gw - 1 || Y >= gh - 1) continue
        const i = Y * gw + X
        if (!wall[i]) u[i] += amp * Math.exp(-(x * x + y * y) / 2) * 0.8
      }
      s.age++
    }
    // the wavefront moves under one cell per step, so growing the box by one cell is enough
    y0 = Math.max(1, y0 - 1); y1 = Math.min(gh - 2, y1 + 1)
    x0 = Math.max(1, x0 - 1); x1 = Math.min(gw - 2, x1 + 1)
    let max = 0
    for (let y = y0; y <= y1; y++) {
      const row = y * gw
      for (let x = x0; x <= x1; x++) {
        const i = row + x
        if (wall[i]) { up[i] = 0; continue }
        const v = (2 * u[i] - up[i] + C2 * (u[i - 1] + u[i + 1] + u[i - gw] + u[i + gw] - 4 * u[i])) * DAMP
        up[i] = v
        const a = v < 0 ? -v : v
        if (a > max) max = a
      }
    }
    const t = u; u = up; up = t
    return max
  }

  const render = () => {
    const [r, g, b] = waveState.rgb
    const top = Math.floor(window.scrollY / CELL)
    const d = img.data
    for (let y = 0; y < vh; y++) {
      const Y = top + y
      for (let x = 0; x < gw; x++) {
        const j = (y * gw + x) * 4
        const i = Y * gw + x
        const v = Y < gh ? u[i] : 0
        const a = Y >= gh || wall[i] ? 0 : v > 0 ? Math.min(1, v * 2.2) : Math.min(1, -v * 0.8)
        d[j] = r; d[j + 1] = g; d[j + 2] = b; d[j + 3] = a * a * 200
      }
    }
    ox.putImageData(img, 0, 0)
    const c = layer.getContext('2d')!
    const sx = layer.width / window.innerWidth
    c.clearRect(0, 0, layer.width, layer.height)
    c.imageSmoothingEnabled = true
    const frac = window.scrollY - top * CELL // sub-cell scroll offset, px
    c.drawImage(off, 0, -frac * sx, gw * CELL * sx, vh * CELL * sx)
  }

  const loop = () => {
    let max = 0
    for (let s = 0; s < STEPS; s++) max = step()
    render()
    if (max > 0.003 || sources.length) raf = requestAnimationFrame(loop)
    else { active = false; u.fill(0); up.fill(0); render() }
  }

  const onClick = (e: MouseEvent) => {
    if ((e.target as Element).closest(NO_RIPPLE)) return
    if (!ready || gh !== Math.ceil(docHeight() / CELL)) allocate()
    const x = Math.round(e.clientX / CELL)
    const y = Math.round((e.clientY + window.scrollY) / CELL)
    const period = pagePeriodPx(waveState.nm) / (Math.sqrt(C2) * CELL) // in steps
    sources.push({ x, y, period, age: 0 })
    if (!active) { y0 = y1 = y; x0 = x1 = x; active = true; raf = requestAnimationFrame(loop) }
    else { y0 = Math.min(y0, y); y1 = Math.max(y1, y); x0 = Math.min(x0, x); x1 = Math.max(x1, x) }
  }
  const onScroll = () => { if (!active && ready) render() }
  const onResize = () => { ready = false; cancelAnimationFrame(raf); active = false; const c = layer.getContext('2d')!; c.clearRect(0, 0, layer.width, layer.height) }

  window.addEventListener('resize', onResize)
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('click', onClick)
  return () => {
    cancelAnimationFrame(raf)
    window.removeEventListener('resize', onResize)
    window.removeEventListener('scroll', onScroll)
    document.removeEventListener('click', onClick)
  }
}
