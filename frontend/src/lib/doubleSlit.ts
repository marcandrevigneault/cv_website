// 2D double-slit: plane wave -> barrier with two slits -> cylindrical waves -> screen intensity.
// The view zooms so both slits always fit and the wavelength stays resolvable.

import { prefersReducedMotion, waveState } from './wave'

const W = 320
const H = 200
const BARRIER = Math.round(W * 0.13)
const SCREEN = Math.round(W * 0.86)
const BG: [number, number, number] = [243, 243, 241]
const INK: [number, number, number] = [28, 30, 34]

export interface SlitParams {
  nm: number
  slitNm: number
}

/**
 * Runs the simulation on `canvas`. `getParams` is read every frame.
 * `onView` reports the width of the field shown, in µm. Returns a stop function.
 */
export function runDoubleSlit(
  canvas: HTMLCanvasElement,
  getParams: () => SlitParams,
  onView: (fieldUm: number) => void,
): () => void {
  const still = prefersReducedMotion()
  const off = document.createElement('canvas')
  off.width = W
  off.height = H
  const ox = off.getContext('2d')!
  const img = ox.createImageData(W, H)
  const px = img.data
  const ctx = canvas.getContext('2d')!
  let acc = new Float32Array(H)
  let last = { nm: 0, slitNm: 0 }
  let raf = 0
  const t0 = performance.now()

  const size = () => {
    const r = canvas.getBoundingClientRect()
    const dp = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = Math.max(1, Math.round(r.width * dp))
    canvas.height = Math.max(1, Math.round(r.height * dp))
  }
  size()
  window.addEventListener('resize', size)

  const put = (i: number, c: readonly number[], a: number) => {
    px[i] = BG[0] + (c[0] - BG[0]) * a
    px[i + 1] = BG[1] + (c[1] - BG[1]) * a
    px[i + 2] = BG[2] + (c[2] - BG[2]) * a
    px[i + 3] = 255
  }

  const draw = (now: number) => {
    const { nm, slitNm } = getParams()
    if (nm !== last.nm || slitNm !== last.slitNm) {
      acc = new Float32Array(H) // let the new pattern develop from scratch
      last = { nm, slitNm }
    }
    const co = waveState.rgb
    const t = (now - t0) / 1000
    const scale = Math.min((0.55 * H) / slitNm, 14 / nm) // px per nm
    const lam = Math.max(3, nm * scale)
    const k = (2 * Math.PI) / lam
    const w = still ? 0 : t * 7
    const d = slitNm * scale
    const y1 = H / 2 - d / 2
    const y2 = H / 2 + d / 2
    onView(W / scale / 1000)

    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const i = (y * W + x) * 4
        if (x < BARRIER) {
          const v = Math.cos(k * x - w)
          put(i, co, 0.12 + 0.38 * (v * 0.5 + 0.5))
        } else if (x <= BARRIER + 1) {
          put(i, Math.abs(y - y1) < 2.5 || Math.abs(y - y2) < 2.5 ? BG : INK, 1)
        } else if (x >= SCREEN - 1 && x < SCREEN + 2) {
          put(i, BG, 0)
        } else if (x < SCREEN - 1) {
          const dx = x - BARRIER
          const r1 = Math.hypot(dx, y - y1)
          const r2 = Math.hypot(dx, y - y2)
          const v = (Math.cos(k * r1 - w) / Math.sqrt(r1 + 1) + Math.cos(k * r2 - w) / Math.sqrt(r2 + 1)) * 2.6
          const a = Math.max(0, Math.min(1, 0.5 + 0.5 * v))
          put(i, co, a * a * 0.9)
        }
      }
    }

    // Screen: time-averaged intensity, relaxing toward the current pattern so it develops.
    const dx = SCREEN - BARRIER
    const I = new Float32Array(H)
    let max = 0
    for (let y = 0; y < H; y++) {
      const r1 = Math.hypot(dx, y - y1)
      const r2 = Math.hypot(dx, y - y2)
      I[y] = 1 / r1 + 1 / r2 + (2 * Math.cos(k * (r1 - r2))) / Math.sqrt(r1 * r2)
      if (I[y] > max) max = I[y]
    }
    for (let y = 0; y < H; y++) {
      acc[y] += (I[y] / max - acc[y]) * (still ? 1 : 0.06)
      for (let x = SCREEN + 2; x < W; x++) put((y * W + x) * 4, co, Math.min(1, acc[y]))
    }

    ox.putImageData(img, 0, 0)
    ctx.imageSmoothingEnabled = true
    ctx.drawImage(off, 0, 0, canvas.width, canvas.height)

    // intensity profile just left of the screen
    ctx.strokeStyle = 'rgb(28,30,34)'
    ctx.lineWidth = Math.max(1, canvas.width / 400)
    ctx.beginPath()
    const sx = (canvas.width * (SCREEN - 2)) / W
    const amp = canvas.width * 0.07
    for (let y = 0; y < H; y++) {
      const yy = ((y + 0.5) * canvas.height) / H
      const xx = sx - acc[y] * amp
      if (y) ctx.lineTo(xx, yy)
      else ctx.moveTo(xx, yy)
    }
    ctx.stroke()

    if (!still) raf = requestAnimationFrame(draw)
  }

  raf = requestAnimationFrame(draw)
  return () => {
    cancelAnimationFrame(raf)
    window.removeEventListener('resize', size)
  }
}

