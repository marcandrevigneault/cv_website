import { useState, useEffect } from 'react'

export interface Achievement {
  title: string
  description: string
  year: number
}

export interface Paper {
  title: string
  journal: string
  year: number
  link: string
}

export interface Project {
  id: string
  title: string
  category: string
  description: string
  technologies: string[]
  year?: number
  link: string
  documentLink?: string
}

export interface Content {
  personal: {
    name: string
    title: string
    email: string
    github: string
    linkedin: string
  }
  achievements: Achievement[]
  papers: Paper[]
  projects: Project[]
}

export function useContent() {
  const [content, setContent] = useState<Content | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/content.json')
      .then(res => res.json())
      .then(data => {
        setContent(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load content:', err)
        setLoading(false)
      })
  }, [])

  return { content, loading }
}