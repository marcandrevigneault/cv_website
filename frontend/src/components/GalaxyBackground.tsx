'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { Container, Engine } from '@tsparticles/engine'

export default function GalaxyBackground() {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  const particlesLoaded = useCallback(async (container?: Container) => {
    console.log('Galaxy particles loaded')
  }, [])

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile() // Initial check
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const options = useMemo(() => ({
    particles: {
      number: {
        value: isMobile ? 200 : 500,
        density: { enable: true, value_area: 800 }
      },
      color: { value: ['#3b82f6', '#06b6d4', '#8b5cf6'] },
      shape: { type: 'circle' },
      opacity: {
        value: { min: 0.1, max: 1 },
        animation: { enable: true, speed: 0.5, sync: false }
      },
      size: {
        value: { min: 1, max: 6 },
        animation: { enable: true, speed: 2, sync: false }
      },
      links: {
        enable: !isMobile,
        distance: 175,
        color: '#3b82f6',
        opacity: 0.5,
        width: 1
      },
      move: {
        enable: true,
        speed: isMobile ? 0.3 : 0.5,
        direction: 'none' as const,
        random: true,
        straight: false,
        outModes: 'bounce' as const
      },
      position: {
        x: { value: 25, spread: 25 },
        y: { value: 25, spread: 20 }
      }
    },
    interactivity: {
      events: {
        onHover: {
          enable: !isMobile,
          mode: 'grab' as const
        },
        onClick: {
          enable: !isMobile,
          mode: 'push' as const
        }
      },
      modes: {
        grab: {
          distance: 200,
          links: { opacity: 0.7 }
        },
        push: { quantity: 1 }
      }
    },
    background: { color: { value: 'transparent' } }
  }), [])

  return (
    <>
      {init && (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
          className="fixed top-0 left-0 w-full h-full pointer-events-none"
          style={{ zIndex: -1 }}
        />
      )}
    </>
  )
}