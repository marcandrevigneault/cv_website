'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import ProjectBubble from '@/components/ProjectBubble'

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = ['all', 'physics', 'coding', 'systems', 'analysis']

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-16 max-w-7xl">

        <h1 className="text-4xl font-bold mb-8">Projects & Blog</h1>

        <div className="flex gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-secondary hover:bg-muted'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="relative min-h-[600px]">
          <ProjectBubble category={selectedCategory} />
        </div>
      </div>
    </main>
  )
}