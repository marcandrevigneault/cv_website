'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Skill {
  id: string
  title: string
  icon: string
  color: string
  skills: string[]
  description: string
  projects: string[]
}

export default function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set())
  const [cardsPerRow, setCardsPerRow] = useState(3)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('/skills.json')
      .then(res => res.json())
      .then(data => setSkills(data.categories))
      .catch(() => {
        setSkills([
          {
            id: 'physics',
            title: 'Physics',
            icon: '🔬',
            color: '#3b82f6',
            skills: ['Quantum Mechanics', 'Statistical Physics', 'Computational Physics'],
            description: 'Deep expertise in theoretical and computational physics.',
            projects: ['Quantum simulation', 'Statistical solver']
          }
        ])
      })
  }, [])

  // Detect cards per row based on screen size
  useEffect(() => {
    const updateCardsPerRow = () => {
      const width = window.innerWidth
      if (width < 768) {
        setCardsPerRow(1) // Mobile: 1 card per row
      } else if (width < 1024) {
        setCardsPerRow(2) // Tablet: 2 cards per row
      } else {
        setCardsPerRow(3) // Desktop: 3 cards per row
      }
    }

    updateCardsPerRow()
    window.addEventListener('resize', updateCardsPerRow)
    return () => window.removeEventListener('resize', updateCardsPerRow)
  }, [])

  const handleCardClick = (index: number) => {
    const rowIndex = Math.floor(index / cardsPerRow)

    setExpandedRows(prev => {
      const newSet = new Set(prev)
      if (newSet.has(rowIndex)) {
        newSet.delete(rowIndex)
      } else {
        newSet.clear() // Close other rows
        newSet.add(rowIndex)
      }
      return newSet
    })
  }

  const getRowIndex = (index: number) => Math.floor(index / cardsPerRow)
  const isCardExpanded = (index: number) => expandedRows.has(getRowIndex(index))

  return (
    <>
      {/* Cards Grid */}
      <div ref={containerRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((category, index) => {
          const isExpanded = isCardExpanded(index)
          const rowIndex = getRowIndex(index)

          return (
            <motion.div
              key={category.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                layout: {
                  type: "spring",
                  bounce: 0.2,
                  duration: 0.5
                }
              }}
              onClick={() => handleCardClick(index)}
              className={`
                relative overflow-hidden
                bg-gradient-to-br from-gray-900/50 to-gray-800/30
                backdrop-blur-sm rounded-xl p-4 cursor-pointer
                border border-gray-700/50
                transition-all duration-300
                ${isExpanded
                  ? 'shadow-2xl border-gray-600/50 bg-gradient-to-br from-gray-900/70 to-gray-800/50'
                  : 'hover:shadow-lg hover:-translate-y-1 hover:border-gray-600/50'
                }
              `}
            >
              {/* Subtle gradient overlay */}
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  background: `linear-gradient(135deg, ${category.color}40 0%, transparent 50%)`
                }}
              />

              <div className="relative z-10">
                <div className={`flex items-center justify-between ${isExpanded ? 'mb-4' : 'mb-0'}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{category.icon}</span>
                    <h3 className="font-semibold text-lg text-gray-100">
                      {category.title}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-400"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </motion.div>
                </div>

                {/* Expansion Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: 'easeInOut',
                        delay: 0.05
                      }}
                      className="space-y-4 overflow-hidden"
                    >
                      <p className="text-gray-300 leading-relaxed text-sm">
                        {category.description}
                      </p>

                      <div>
                        <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                          Technical Skills
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {category.skills.map((skill) => (
                            <motion.span
                              key={skill}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.2 }}
                              className="px-2 py-1 bg-gray-800/50 text-gray-300 rounded text-xs
                                       border border-gray-700/30"
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {category.projects && category.projects.length > 0 && (
                        <div>
                          <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                            Notable Projects
                          </h4>
                          <ul className="space-y-1">
                            {category.projects.map((project) => (
                              <li key={project} className="text-gray-300 text-sm flex items-start">
                                <span className="text-gray-500 mr-2">•</span>
                                <span>{project}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Row Expansion Indicator */}
      {expandedRows.size > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-4"
        >
          <p className="text-xs text-gray-500">
            Click any card to collapse row
          </p>
        </motion.div>
      )}
    </>
  )
}