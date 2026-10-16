import DoubleSlit from '@/components/DoubleSlit'
import Team from '@/components/Team'
import WaveFx from '@/components/WaveFx'
import { company, products, publications, services, team, work } from '@/content/site'

const Divider = () => <canvas className="wdiv" aria-hidden="true" />

export default function Home() {
  return (
    <>
      <WaveFx />
      <div id="site">
        <header className="site-nav">
          <div className="wrap">
            <a className="logo" href="#top">{company.name}</a>
            <nav aria-label="Main">
              <a href="#work">Work</a>
              <a href="#team">Team</a>
              <a href="#services">Services</a>
              <a href="#products">Products</a>
              <a href="#publications">Publications</a>
            </nav>
          </div>
        </header>

        <main>
          <section className="hero" id="top">
            <div className="wrap">
              <h1>{company.name}</h1>
              <p className="lede">{company.lede}</p>
              <p className="where">{company.where}</p>
              <a className="cta" href="#contact">Discuss a project</a>
              <DoubleSlit />
            </div>
          </section>

          <section className="sec" id="work">
            <Divider />
            <div className="wrap">
              <h2>Selected work</h2>
              <ul className="work-list">
                {work.map((w) => (
                  <li key={w.title}>
                    <span className="yr">{w.year}</span>
                    <div>
                      <h3>{w.link ? <a href={w.link} target="_blank" rel="noopener noreferrer">{w.title}</a> : w.title}</h3>
                      <p className="cat">{w.category}</p>
                      <p className="desc">{w.description}</p>
                      <p className="tags">{w.tags.join(' / ')}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="sec" id="team">
            <Divider />
            <div className="wrap">
              <h2>Team</h2>
              <Team members={team} />
            </div>
          </section>

          <section className="sec" id="services">
            <Divider />
            <div className="wrap">
              <h2>Ways to work with us</h2>
              <ul className="svc-list">
                {services.map((s) => (
                  <li key={s.title}>
                    <h3>{s.title}</h3>
                    <p className="rate">{s.rate}</p>
                    <p className="sd">{s.description}</p>
                    <p className="feat">{s.features}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="sec" id="products">
            <Divider />
            <div className="wrap">
              <h2>Products</h2>
              <ul className="prod-list">
                {products.map((p) => (
                  <li key={p.name} className="product">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.icon} alt="" width={64} height={64} />
                    <div>
                      <h3>{p.name}</h3>
                      <p className="pd">{p.description}</p>
                      <p className="ps">
                        {p.appStore && <a href={p.appStore} target="_blank" rel="noopener noreferrer">App Store</a>}
                        {p.googlePlay && <a href={p.googlePlay} target="_blank" rel="noopener noreferrer">Google Play</a>}
                        {p.website && <a href={p.website} target="_blank" rel="noopener noreferrer">Website</a>}
                        {p.status && <span>{p.status}</span>}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="sec" id="publications">
            <Divider />
            <div className="wrap">
              <h2>Publications</h2>
              <ul className="pub-list">
                {publications.map((p) => (
                  <li key={p.title}>
                    <span className="yr">{p.year}</span>
                    <div>
                      <p className="t">{p.link ? <a href={p.link} target="_blank" rel="noopener noreferrer">{p.title}</a> : p.title}</p>
                      <p className="j">{p.venue}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </main>

        <footer className="contact" id="contact">
          <div className="wrap">
            <h2>Have a hard physics problem?</h2>
            <a className="mail" href={`mailto:${company.email}`}>{company.email}</a>
            <div className="links">
              <a href={company.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href={company.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
