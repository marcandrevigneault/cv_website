import { company } from '@/content/site'

/** Plain text pages (privacy policy, licence) in the site's type, without the animated home page. */
export default function Legal({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <div id="site">
      <header className="site-nav">
        <div className="wrap">
          <a className="logo" href="/">{company.name}</a>
        </div>
      </header>
      <main className="legal">
        <div className="wrap">
          <h1>{title}</h1>
          <p className="legal-date">Last updated {updated}</p>
          {children}
          <p>
            Questions: <a href={`mailto:${company.email}`}>{company.email}</a>
          </p>
        </div>
      </main>
    </div>
  )
}
