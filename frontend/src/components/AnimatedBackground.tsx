'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

type BackgroundType = 'particles' | 'waves' | 'matrix' | 'geometric' | 'gradient' | 'stars'

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [currentBg, setCurrentBg] = useState<BackgroundType>('particles')
  const [showSelector, setShowSelector] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    let animationId: number

    switch (currentBg) {
      case 'particles':
        animateParticles(ctx, canvas)
        break
      case 'waves':
        animateWaves(ctx, canvas)
        break
      case 'matrix':
        animateMatrix(ctx, canvas)
        break
      case 'geometric':
        animateGeometric(ctx, canvas)
        break
      case 'gradient':
        animateGradient(ctx, canvas)
        break
      case 'stars':
        animateStars(ctx, canvas)
        break
    }

    function animateParticles(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
      const particles: Array<{x: number, y: number, vx: number, vy: number, size: number}> = []

      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1
        })
      }

      function draw() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.1)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = '#3b82f6'
        particles.forEach(p => {
          p.x += p.vx
          p.y += p.vy

          if (p.x < 0 || p.x > canvas.width) p.vx *= -1
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1

          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()
        })

        animationId = requestAnimationFrame(draw)
      }
      draw()
    }

    function animateWaves(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
      let offset = 0

      function draw() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.1)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.strokeStyle = '#06b6d4'
        ctx.lineWidth = 2

        for (let i = 0; i < 5; i++) {
          ctx.beginPath()
          for (let x = 0; x < canvas.width; x++) {
            const y = canvas.height / 2 + Math.sin((x + offset) * 0.01 + i) * 50
            if (x === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
          ctx.stroke()
        }

        offset += 2
        animationId = requestAnimationFrame(draw)
      }
      draw()
    }

    function animateMatrix(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
      const columns = Math.floor(canvas.width / 20)
      const drops: number[] = new Array(columns).fill(1)

      function draw() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.05)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = '#00ff00'
        ctx.font = '15px monospace'

        for (let i = 0; i < drops.length; i++) {
          const text = String.fromCharCode(Math.random() * 128)
          ctx.fillText(text, i * 20, drops[i] * 20)

          if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
            drops[i] = 0
          }
          drops[i]++
        }

        animationId = requestAnimationFrame(draw)
      }
      draw()
    }

    function animateGeometric(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
      let rotation = 0

      function draw() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.1)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.save()
        ctx.translate(canvas.width / 2, canvas.height / 2)
        ctx.rotate(rotation)

        ctx.strokeStyle = '#3b82f6'
        ctx.lineWidth = 1

        for (let i = 0; i < 6; i++) {
          ctx.beginPath()
          for (let j = 0; j < 6; j++) {
            const angle = (j * Math.PI * 2) / 6
            const x = Math.cos(angle) * (50 + i * 30)
            const y = Math.sin(angle) * (50 + i * 30)
            if (j === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
          ctx.closePath()
          ctx.stroke()
        }

        ctx.restore()
        rotation += 0.005
        animationId = requestAnimationFrame(draw)
      }
      draw()
    }

    function animateGradient(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
      let time = 0

      function draw() {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
        gradient.addColorStop(0, `hsl(${time % 360}, 50%, 10%)`)
        gradient.addColorStop(0.5, `hsl(${(time + 60) % 360}, 50%, 15%)`)
        gradient.addColorStop(1, `hsl(${(time + 120) % 360}, 50%, 10%)`)

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        time += 0.5
        animationId = requestAnimationFrame(draw)
      }
      draw()
    }

    function animateStars(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
      const stars: Array<{x: number, y: number, size: number, speed: number}> = []

      for (let i = 0; i < 200; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2,
          speed: Math.random() * 0.5 + 0.1
        })
      }

      function draw() {
        ctx.fillStyle = 'rgba(10, 10, 10, 1)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = 'white'
        stars.forEach(star => {
          star.y += star.speed
          if (star.y > canvas.height) {
            star.y = 0
            star.x = Math.random() * canvas.width
          }

          ctx.globalAlpha = Math.random() * 0.5 + 0.5
          ctx.fillRect(star.x, star.y, star.size, star.size)
        })
        ctx.globalAlpha = 1

        animationId = requestAnimationFrame(draw)
      }
      draw()
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [currentBg])

  const backgrounds: BackgroundType[] = ['particles', 'waves', 'matrix', 'geometric', 'gradient', 'stars']

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
        style={{
          opacity: 0.7,
          zIndex: -1
        }}
      />

      <button
        onClick={() => setShowSelector(!showSelector)}
        className="fixed bottom-4 right-4 z-50 bg-primary text-white px-4 py-2 rounded-lg shadow-lg hover:bg-accent transition"
      >
        🎨 Backgrounds
      </button>

      {showSelector && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-16 right-4 bg-secondary rounded-lg p-4 shadow-xl z-50"
        >
          <p className="text-sm mb-2 font-semibold">Choose Background:</p>
          <div className="grid grid-cols-2 gap-2">
            {backgrounds.map((bg) => (
              <button
                key={bg}
                onClick={() => {
                  setCurrentBg(bg)
                  setShowSelector(false)
                }}
                className={`px-3 py-2 rounded text-sm capitalize transition ${
                  currentBg === bg
                    ? 'bg-primary text-white'
                    : 'bg-background hover:bg-muted'
                }`}
              >
                {bg}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </>
  )
}