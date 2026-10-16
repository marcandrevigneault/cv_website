'use client'

import { useEffect, useRef, useState } from 'react'
import { runDoubleSlit } from '@/lib/doubleSlit'
import { bandLabel, spectrumRGB, waveState } from '@/lib/wave'

// Wavelength slider is logarithmic: 0..1000 maps to 100 nm..3 µm.
const nmFromSlider = (v: number) => 100 * Math.pow(30, v / 1000)
const sliderFromNm = (nm: number) => Math.round((1000 * Math.log(nm / 100)) / Math.log(30))

const formatNm = (nm: number) => (nm < 1000 ? `${Math.round(nm)} nm` : `${(nm / 1000).toFixed(2)} µm`)

export default function DoubleSlit() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [lamSlider, setLamSlider] = useState(sliderFromNm(532))
  const [slitUm, setSlitUm] = useState(1.8)
  const [fieldUm, setFieldUm] = useState<number | null>(null)
  const params = useRef({ nm: 532, slitNm: 1800 })

  const nm = nmFromSlider(lamSlider)
  const rgb = spectrumRGB(nm)

  useEffect(() => {
    params.current = { nm, slitNm: slitUm * 1000 }
    waveState.nm = nm
    waveState.slitNm = slitUm * 1000
    waveState.rgb = rgb
  }, [nm, slitUm, rgb])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    let lastField = 0
    return runDoubleSlit(
      canvas,
      () => params.current,
      (f) => {
        if (Math.abs(f - lastField) > 0.05) { lastField = f; setFieldUm(f) }
      },
    )
    // restart under reduced motion so the single still frame reflects the sliders
  }, [lamSlider, slitUm])

  return (
    <figure className="slit">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Animated double-slit experiment: a plane wave passes two slits and forms interference fringes on a screen at the right"
      />
      <figcaption>
        Double slit. Light enters from the left and the fringes form on the screen at the right.
        {fieldUm !== null && ` Field shown: ${fieldUm.toFixed(1)} µm across.`}
      </figcaption>
      <div className="slit-controls">
        <label htmlFor="slit-wavelength">Wavelength</label>
        <input
          id="slit-wavelength"
          type="range"
          min={0}
          max={1000}
          step={1}
          value={lamSlider}
          onChange={(e) => setLamSlider(+e.target.value)}
          style={{ accentColor: `rgb(${rgb.join(',')})` }}
        />
        <output htmlFor="slit-wavelength">{formatNm(nm)}</output>
        <label htmlFor="slit-spacing">Slit spacing</label>
        <input
          id="slit-spacing"
          type="range"
          min={0.5}
          max={3.6}
          step={0.05}
          value={slitUm}
          onChange={(e) => setSlitUm(+e.target.value)}
        />
        <output htmlFor="slit-spacing">{slitUm.toFixed(2)} µm</output>
        <p className="slit-band">{bandLabel(nm)}</p>
        <p className="slit-hint">Click anywhere on the page, even between letters, to send a wave.</p>
      </div>
    </figure>
  )
}
