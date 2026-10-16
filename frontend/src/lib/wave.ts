// Shared state between the double-slit simulator and the page effects (dividers, ripples).
// The simulator writes it; the effects read it every frame.

export type RGB = [number, number, number]

export const waveState: { nm: number; slitNm: number; rgb: RGB } = {
  nm: 532,
  slitNm: 1800,
  rgb: [37, 70, 168],
}

/** Wavelength (nm) to a display colour. UV and IR get fixed false colours. */
export function spectrumRGB(nm: number): RGB {
  if (nm < 380) return [92, 62, 160]
  if (nm > 750) return [140, 40, 48]
  let r = 0, g = 0, b = 0
  if (nm < 440) { r = (440 - nm) / 60; b = 1 }
  else if (nm < 490) { g = (nm - 440) / 50; b = 1 }
  else if (nm < 510) { g = 1; b = (510 - nm) / 20 }
  else if (nm < 580) { r = (nm - 510) / 70; g = 1 }
  else if (nm < 645) { r = 1; g = (645 - nm) / 65 }
  else { r = 1 }
  const edge = nm < 420 ? 0.35 + (0.65 * (nm - 380)) / 40 : nm > 700 ? 0.35 + (0.65 * (750 - nm)) / 50 : 1
  // darkened so the colour reads on the light page background
  return [r, g, b].map((c) => Math.round(255 * Math.pow(c * edge, 0.8) * 0.72)) as RGB
}

export function bandLabel(nm: number): string {
  if (nm < 380) return 'Ultraviolet, shown in false colour'
  if (nm > 750) return 'Infrared, shown in false colour'
  return 'Visible light, shown in its own colour'
}

/** On-page wave period in px for decorative waves (dividers, ripple rings). */
export function pagePeriodPx(nm: number): number {
  return Math.max(14, Math.min(140, 38 * Math.pow(nm / 532, 0.6)))
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
