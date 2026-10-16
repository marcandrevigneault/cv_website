'use client'

import { useEffect, useRef } from 'react'
import { runDividers, runRipples } from '@/lib/waveFx'

/** Mounts the wave dividers and the click-ripple layer for everything inside #site. */
export default function WaveFx() {
  const layerRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const root = document.getElementById('site')
    const layer = layerRef.current
    if (!root || !layer) return
    const stopDividers = runDividers(root)
    const stopRipples = runRipples(root, layer)
    return () => { stopDividers(); stopRipples() }
  }, [])

  return <canvas ref={layerRef} className="ripple-layer" aria-hidden="true" />
}
