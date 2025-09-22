'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface Project {
  id: string
  title: string
  category: string
  size: number
  x: number
  y: number
}

export default function ProjectBubble({ category }: { category: string }) {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const sampleProjects: Project[] = [
      { id: '1', title: 'Quantum Simulation', category: 'physics', size: 120, x: 200, y: 200 },
      { id: '2', title: 'ML Pipeline', category: 'coding', size: 100, x: 400, y: 150 },
      { id: '3', title: 'Infrastructure Design', category: 'systems', size: 110, x: 600, y: 300 },
      { id: '4', title: 'Data Analysis Tool', category: 'analysis', size: 90, x: 350, y: 350 },
      { id: '5', title: 'React Dashboard', category: 'coding', size: 95, x: 550, y: 180 },
    ]

    const filtered = category === 'all'
      ? sampleProjects
      : sampleProjects.filter(p => p.category === category)

    setProjects(filtered)
  }, [category])

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {projects.map((project) => (
        <motion.div
          key={project.id}
          className="absolute cursor-pointer"
          initial={{ scale: 0 }}
          animate={{
            scale: 1,
            x: project.x,
            y: project.y
          }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          style={{
            width: project.size,
            height: project.size,
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center p-4 hover:shadow-2xl hover:shadow-primary/50 transition-shadow">
            <p className="text-center text-sm font-medium">{project.title}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}