'use client'

import Navigation from '@/components/Navigation'
import SkillsSection from '@/components/SkillsSection'
import TariffCard from '@/components/TariffCard'
import ContactInfo from '@/components/ContactInfo'
import { useConfig } from '@/hooks/useConfig'
import { useContent } from '@/hooks/useContent'

export default function Home() {
  const { config } = useConfig()
  const { content, loading } = useContent()

  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="container mx-auto px-4 py-16 max-w-6xl relative">

        <section className="mb-16">
          <h1 className="text-5xl font-bold mb-4">{config?.personal.name || 'Loading...'}</h1>
          <p className="text-xl text-muted">{config?.personal.tagline || '...'}</p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8">Skills</h2>
          <SkillsSection />
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8">Services & Tariffs</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <TariffCard />
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8">Notable Projects</h2>
          <div className="space-y-6">
            {loading ? (
              <p className="text-muted">Loading...</p>
            ) : (
              <>
                {/* Projects */}
                <div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {content?.projects.map((project) => (
                      <div key={project.id} className="bg-secondary/90 backdrop-blur-md rounded-lg p-4 border border-gray-500/40 hover:border-primary transition-all duration-300 group relative">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{project.title}</h4>
                          {project.year && (
                            <span className="text-xs text-primary font-medium">{project.year}</span>
                          )}
                        </div>
                        <p className="text-sm text-muted mb-3">{project.description}</p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {project.technologies.map((tech) => (
                            <span key={tech} className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <span className="text-xs text-accent">{project.category}</span>

                        {/* Icons Container */}
                        <div className="absolute bottom-4 right-4 flex gap-2">
                          {/* External Link Icon - always visible if link exists and is not "#" */}
                          {project.link && project.link !== "#" && (
                            <button
                              onClick={() => window.open(project.link.startsWith('http') ? project.link : `https://${project.link}`, '_blank')}
                              className="w-8 h-8 bg-primary/20 hover:bg-primary/30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                              title={`View ${project.title}`}
                            >
                              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </button>
                          )}

                          {/* Document Link Icon - always visible if documentLink exists */}
                          {project.documentLink && (
                            <button
                              onClick={() => window.open(project.documentLink, '_blank')}
                              className="w-8 h-8 bg-accent/20 hover:bg-accent/30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                              title={`View ${project.title} Document`}
                            >
                              <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8">Papers & Contributions</h2>
          <div className="space-y-4">
            {loading ? (
              <p className="text-muted">Loading...</p>
            ) : (
              <div className="grid gap-4">
                {content?.papers
                  .sort((a, b) => b.year - a.year)
                  .map((paper, index) => (
                  <div key={index} className="bg-secondary/90 backdrop-blur-md rounded-lg p-4 border border-gray-500/40 hover:border-primary transition-all duration-300">
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <h4 className="font-semibold text-lg">{paper.title}</h4>
                      <span className="text-sm text-primary font-medium whitespace-nowrap">{paper.year}</span>
                    </div>
                    <p className="text-sm text-accent mb-3">{paper.journal}</p>
                    {paper.link && (
                      <a
                        href={paper.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-primary hover:underline"
                      >
                        Read Paper
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8">Documents</h2>
          <div className="flex gap-4 flex-wrap">
            <a
              href={config?.documents.cv || '/documents/cv.pdf'}
              className="px-6 py-3 bg-secondary rounded-lg hover:bg-primary transition"
            >
              Download CV
            </a>
            <a
              href={config?.documents.certifications || '/documents/certifications.pdf'}
              className="px-6 py-3 bg-secondary rounded-lg hover:bg-primary transition"
            >
              Certifications
            </a>
          </div>
        </section>

        <ContactInfo />
      </div>
    </main>
  )
}