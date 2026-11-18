'use client'

import { useEffect } from 'react'
import { runDividers } from '@/lib/waveFx'

/** Animates the wave dividers inside #site. */
export default function WaveFx() {
  useEffect(() => {
    const root = document.getElementById('site')
    if (!root) return
    return runDividers(root)
  }, [])

  return null
}
