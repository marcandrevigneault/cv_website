import { useState, useEffect } from 'react'

export interface Config {
  personal: {
    name: string
    title: string
    tagline: string
    shortBio: string
    email: string
    phone: string
    location: string
  }
  social: {
    github: string
    linkedin: string
    twitter: string
    website: string
  }
  company: {
    name: string
    shortName: string
    domain: string
    founded: string
  }
  services: {
    hourly: ServiceTier
    project: ServiceTier
    retainer: ServiceTier
  }
  documents: {
    cv: string
    certifications: string
    portfolio: string
  }
  seo: {
    title: string
    description: string
    keywords: string[]
  }
}

interface ServiceTier {
  title: string
  rate: string
  description: string
  features: string[]
}

export function useConfig() {
  const [config, setConfig] = useState<Config | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/config.json')
      .then(res => res.json())
      .then(data => {
        setConfig(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load config:', err)
        setLoading(false)
      })
  }, [])

  return { config, loading }
}