'use client'

import { useConfig } from '@/hooks/useConfig'

export default function TariffCard() {
  const { config } = useConfig()

  const serviceMap = [
    {
      key: 'hourly',
      emailSubject: 'Hourly Rate Consultation Inquiry',
      emailBody: 'Hi Marc-André,\n\nI am interested in your hourly consultation services. Could we discuss my project requirements?\n\nBest regards'
    },
    {
      key: 'project',
      emailSubject: 'Project Based Services Inquiry',
      emailBody: 'Hi Marc-André,\n\nI have a project that might be a good fit for your project-based services. Could we schedule a call to discuss the scope and timeline?\n\nBest regards'
    },
    {
      key: 'retainer',
      emailSubject: 'Creative Partnership Opportunity',
      emailBody: 'Hi Marc-André,\n\nI am interested in exploring a creative partnership opportunity. Could we discuss potential collaboration models?\n\nBest regards'
    }
  ]

  const handleEmailClick = (service: typeof serviceMap[0]) => {
    const email = config?.personal.email || 'marc-andre.vigneault@mvxtechnologies.com'
    const mailto = `mailto:${email}?subject=${encodeURIComponent(service.emailSubject)}&body=${encodeURIComponent(service.emailBody)}`
    window.open(mailto, '_self')
  }

  return (
    <>
      {serviceMap.map((service) => {
        const serviceData = config?.services[service.key as keyof typeof config.services]
        if (!serviceData) return null

        return (
          <div
            key={service.key}
            className="bg-secondary/90 backdrop-blur-sm rounded-lg p-6 border-2 border-secondary hover:border-primary transition group relative"
          >
            <h3 className="text-xl font-semibold mb-2">{serviceData.title}</h3>
            <p className="text-3xl font-bold text-primary mb-4">{serviceData.rate}</p>
            <p className="text-sm text-muted mb-4">{serviceData.description}</p>
            <ul className="space-y-2">
              {serviceData.features.map((feature) => (
                <li key={feature} className="text-sm flex items-center">
                  <span className="mr-2">✓</span> {feature}
                </li>
              ))}
            </ul>

            {/* Email Icon - appears on hover */}
            <button
              onClick={() => handleEmailClick(service)}
              className="absolute bottom-4 right-4 w-10 h-10 bg-primary/20 hover:bg-primary/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110"
              title={`Contact for ${serviceData.title}`}
            >
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        )
      })}
    </>
  )
}