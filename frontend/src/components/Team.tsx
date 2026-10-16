'use client'

import { useRef, useState } from 'react'
import { company, type TeamMember } from '@/content/site'

export default function Team({ members }: { members: TeamMember[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState<TeamMember | null>(null)

  const show = (m: TeamMember) => {
    setOpen(m)
    dialogRef.current?.showModal()
  }
  const close = () => dialogRef.current?.close()

  return (
    <>
      <ul className="team-list">
        {members.map((m) => (
          <li key={m.id}>
            <button type="button" className="person" aria-haspopup="dialog" onClick={() => show(m)}>
              <span className="avatar" aria-hidden="true">{m.initials}</span>
              <span>
                <b>{m.name}</b>
                <span className="role">{m.role}</span>
              </span>
              <span className="open">View CV</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className="cv"
        aria-labelledby="cv-name"
        onClose={() => setOpen(null)}
        onClick={(e) => { if (e.target === dialogRef.current) close() }}
      >
        {open && (
          <div className="cv-in">
            <div className="cv-head">
              <span className="avatar" aria-hidden="true">{open.initials}</span>
              <div>
                <h2 id="cv-name">{open.name}</h2>
                <p>{open.role}, {company.name}</p>
              </div>
              <button type="button" className="cv-close" onClick={close}>Close</button>
            </div>
            <p className="cv-summary">{open.summary}</p>
            <div>
              <h3>From software to hardware</h3>
              <ul className="cv-span">
                {open.span.map((s) => (
                  <li key={s.title}><b>{s.title}</b>{s.skills}</li>
                ))}
              </ul>
              <div className="cv-axis-bar" aria-hidden="true" />
              <div className="cv-axis" aria-hidden="true"><span>Code and models</span><span>Hardware that flies</span></div>
            </div>
            <div>
              <h3>Experience</h3>
              <ul className="cv-xp">
                {open.experience.map((x) => (
                  <li key={x.title}>
                    <span className="when">{x.when}</span>
                    <div><b>{x.title}</b><p>{x.description}</p></div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="cv-links">
              <a href={`mailto:${company.email}`}>{company.email}</a>
              <a href={company.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href={company.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              {open.cvPdf && <a href={open.cvPdf} target="_blank" rel="noopener noreferrer">Full CV (PDF)</a>}
            </div>
          </div>
        )}
      </dialog>
    </>
  )
}
