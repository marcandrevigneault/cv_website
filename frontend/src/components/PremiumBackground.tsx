'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { Container, Engine } from '@tsparticles/engine'
import ParticlesBg from 'particles-bg'
import dynamic from 'next/dynamic'

type BackgroundType =
  | 'nasa'
  | 'bubble'
  | 'snow'
  | 'confetti'
  | 'firefly'
  | 'galaxy'
  | 'neon'
  | 'polygon'
  | 'cobweb'
  | 'fountain'

export default function PremiumBackground() {
  const [init, setInit] = useState(false)
  const [currentBg, setCurrentBg] = useState<BackgroundType>('galaxy')
  const [showSelector, setShowSelector] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  const particlesLoaded = useCallback(async (container?: Container) => {
    console.log('Particles loaded', container)
  }, [])

  const options = useMemo(() => {
    const configs: Record<string, any> = {
      galaxy: {
        particles: {
          number: { value: 200, density: { enable: true } },
          color: { value: ['#3b82f6', '#06b6d4', '#8b5cf6'] },
          shape: { type: 'circle' },
          opacity: {
            value: { min: 0.1, max: 1 },
            animation: { enable: true, speed: 0.5, sync: false }
          },
          size: {
            value: { min: 1, max: 3 },
            animation: { enable: true, speed: 2, sync: false }
          },
          links: {
            enable: true,
            distance: 150,
            color: '#3b82f6',
            opacity: 0.2,
            width: 1
          },
          move: {
            enable: true,
            speed: 0.5,
            direction: 'none',
            random: true,
            straight: false,
            outModes: 'bounce'
          }
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: 'grab' },
            onClick: { enable: true, mode: 'push' }
          },
          modes: {
            grab: { distance: 200, links: { opacity: 0.5 } },
            push: { quantity: 4 }
          }
        }
      },
      neon: {
        particles: {
          number: { value: 100 },
          color: { value: ['#ff006e', '#8338ec', '#3a86ff'] },
          shape: { type: 'circle' },
          opacity: { value: 1 },
          size: { value: 3 },
          links: {
            enable: true,
            distance: 200,
            color: '#ffffff',
            opacity: 0.4,
            width: 2,
            triangles: { enable: true, opacity: 0.1 }
          },
          move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: true,
            straight: false,
            outModes: 'bounce',
            attract: { enable: true, rotateX: 600, rotateY: 1200 }
          }
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: 'repulse' },
            onClick: { enable: true, mode: 'bubble' }
          },
          modes: {
            repulse: { distance: 100, duration: 0.4 },
            bubble: { distance: 400, size: 40, duration: 2, opacity: 0.8 }
          }
        },
        background: { color: { value: 'transparent' } }
      },
      firefly: {
        particles: {
          number: { value: 50 },
          color: { value: '#ffeb3b' },
          shape: { type: 'circle' },
          opacity: {
            value: { min: 0, max: 1 },
            animation: { enable: true, speed: 1, sync: false }
          },
          size: {
            value: { min: 1, max: 3 },
            animation: { enable: true, speed: 3, sync: false }
          },
          move: {
            enable: true,
            speed: { min: 0.5, max: 1 },
            direction: 'none',
            random: true,
            straight: false,
            outModes: 'out',
            attract: { enable: false }
          },
          wobble: {
            enable: true,
            distance: 10,
            speed: 10
          },
          shadow: {
            enable: true,
            blur: 5,
            color: { value: '#ffeb3b' },
            offset: { x: 0, y: 0 }
          }
        }
      },
      confetti: {
        particles: {
          number: { value: 100 },
          color: {
            value: ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722']
          },
          shape: { type: ['circle', 'square', 'triangle'] },
          opacity: {
            value: { min: 0.5, max: 1 },
            animation: { enable: true, speed: 0.5, sync: false }
          },
          size: { value: { min: 3, max: 8 } },
          rotate: {
            value: { min: 0, max: 360 },
            direction: 'random',
            animation: { enable: true, speed: 5, sync: false }
          },
          move: {
            enable: true,
            speed: { min: 1, max: 3 },
            direction: 'bottom',
            random: false,
            straight: false,
            outModes: 'out',
            gravity: { enable: true, acceleration: 1 },
            drift: { min: -2, max: 2 }
          }
        }
      }
    }

    return configs[currentBg] || configs.galaxy
  }, [currentBg])

  const particleBgTypes = ['cobweb', 'polygon', 'fountain', 'snow', 'bubble', 'nasa']
  const tsParticleTypes = ['galaxy', 'neon', 'firefly', 'confetti']

  const isParticleBg = particleBgTypes.includes(currentBg)

  return (
    <>
      {init && !isParticleBg && (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
          className="fixed top-0 left-0 w-full h-full pointer-events-none"
          style={{ zIndex: -1 }}
        />
      )}

      {isParticleBg && (
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
          <ParticlesBg type={currentBg as any} bg={true} />
        </div>
      )}

      <button
        onClick={() => setShowSelector(!showSelector)}
        className="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-primary to-accent text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
      >
        ✨ Premium Backgrounds
      </button>

      {showSelector && (
        <div className="fixed bottom-16 right-4 bg-background/95 backdrop-blur-md border border-primary/20 rounded-xl p-6 shadow-2xl z-50 min-w-[300px]">
          <p className="text-sm mb-4 font-bold text-primary">Advanced Backgrounds</p>

          <div className="space-y-4">
            <div>
              <p className="text-xs text-muted mb-2 uppercase tracking-wider">Interactive Particles</p>
              <div className="grid grid-cols-2 gap-2">
                {tsParticleTypes.map((bg) => (
                  <button
                    key={bg}
                    onClick={() => {
                      setCurrentBg(bg as BackgroundType)
                      setShowSelector(false)
                    }}
                    className={`px-3 py-2 rounded-lg text-sm capitalize transition-all duration-300 ${
                      currentBg === bg
                        ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg'
                        : 'bg-secondary/50 hover:bg-secondary'
                    }`}
                  >
                    {bg === 'galaxy' && '🌌'}
                    {bg === 'neon' && '💫'}
                    {bg === 'firefly' && '✨'}
                    {bg === 'confetti' && '🎊'}
                    {bg}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs text-muted mb-2 uppercase tracking-wider">Premium Effects</p>
              <div className="grid grid-cols-2 gap-2">
                {particleBgTypes.map((bg) => (
                  <button
                    key={bg}
                    onClick={() => {
                      setCurrentBg(bg as BackgroundType)
                      setShowSelector(false)
                    }}
                    className={`px-3 py-2 rounded-lg text-sm capitalize transition-all duration-300 ${
                      currentBg === bg
                        ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg'
                        : 'bg-secondary/50 hover:bg-secondary'
                    }`}
                  >
                    {bg === 'nasa' && '🚀'}
                    {bg === 'bubble' && '🫧'}
                    {bg === 'snow' && '❄️'}
                    {bg === 'cobweb' && '🕸️'}
                    {bg === 'polygon' && '⬡'}
                    {bg === 'fountain' && '⛲'}
                    {bg}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}