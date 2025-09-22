'use client'

import { useConfig } from '@/hooks/useConfig'

export default function ContactInfo() {
  const { config } = useConfig()

  return (
    <section className="border-t border-secondary pt-8">
      <h2 className="text-2xl font-semibold mb-6">Contact</h2>
      <div className="flex flex-wrap gap-8">
        <a
          href={`mailto:${config?.personal.email}`}
          className="text-primary hover:underline"
        >
          {config?.personal.email || 'Loading...'}
        </a>
        <a
          href={config?.social.github || '#'}
          className="text-primary hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          href={config?.social.linkedin || '#'}
          className="text-primary hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </div>
    </section>
  )
}