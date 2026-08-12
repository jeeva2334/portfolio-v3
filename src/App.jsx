import { useEffect, useState } from 'react'
import { CapabilityItem, PostItem, ProjectItem, SpecialismItem } from './components/PortfolioItems.jsx'

const projects = [
  ['Autonomous Orchestration Engine', 'Python / LangGraph / Astra DB', 'Multi-agent systems', '/assets/agent-network.png'],
  ['Financial Data Terminal', 'Next.js / FastAPI / ECharts', 'Real-time analytics', '/assets/system-layers.png'],
  ['Secure Desktop Client', 'Go / Wails / React', 'Local-first tooling', '/assets/hero-compute.png'],
]

const posts = [
  ['What agent systems need in production', 'AI systems'],
  ['RAG is a product problem', 'Applied AI'],
  ['Interfaces for complex systems', 'Engineering'],
]

const capabilities = [
  ['Intelligence', 'LLM applications, RAG pipelines, agent orchestration, evaluation, and production AI infrastructure.'],
  ['Product', 'Full-stack applications with clear interfaces, resilient APIs, and thoughtful interaction design.'],
  ['Systems', 'Architecture for services that stay understandable as teams, traffic, and requirements grow.'],
  ['Toolkit', 'Python, Go, TypeScript, React, Next.js, FastAPI, PostgreSQL, and vector databases.'],
]

function number(index) {
  return String(index + 1).padStart(2, '0')
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') === 'light' ? 'light' : 'dark')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#0a0a0a' : '#f4f4ef'
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const items = document.querySelectorAll('[data-reveal]')
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach(item => item.classList.add('visible'))
      return
    }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      }
    }), { threshold: .14 })
    items.forEach(item => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  return <>
    <header className="shell">
      <nav className="nav" aria-label="Primary navigation">
        <a className="mark" href="#top" aria-label="Jeeva, home">J / 26</a>
        <div className="nav-links">
          <a href="#work">Work</a><a href="#blog">Blog</a><a href="#about">Profile</a><a href="#contact">Contact</a>
          <button className="theme-toggle" type="button" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} aria-pressed={theme === 'light'} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? 'Light' : 'Dark'}</button>
        </div>
      </nav>
    </header>

    <main id="top">
      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div><p className="eyebrow">AI engineer + full-stack developer</p><h1 id="hero-title"><span>Jeeva builds</span><span>AI systems.</span></h1></div>
          <div className="hero-bottom"><p>I turn ambitious AI ideas into reliable products, from model orchestration to the interface people actually use.</p><a className="arrow-link" href="#work">Selected work <span aria-hidden="true">↘</span></a></div>
        </div>
        <div className="hero-visual" aria-hidden="true"><img src="/assets/hero-compute.png" alt="" width="1365" height="1690" fetchPriority="high" /></div>
      </section>

      <div className="index-strip shell" aria-label="Specialisms">{['Applied AI', 'Product engineering', 'System design'].map((item, index) => <SpecialismItem index={number(index)} key={item}>{item}</SpecialismItem>)}</div>

      <section className="section shell" id="work" aria-labelledby="work-title">
        <h2 className="section-title" id="work-title" data-reveal>Selected work</h2>
        <div className="work-list" data-reveal>{projects.map(([title, stack, type, image], index) => <ProjectItem index={number(index)} title={title} stack={stack} type={type} image={image} key={title} />)}</div>
      </section>

      <section className="section shell" id="blog" aria-labelledby="blog-title">
        <h2 className="section-title" id="blog-title" data-reveal>Notes on building.</h2>
        <div className="blog-list" data-reveal>{posts.map(([title, category], index) => <PostItem index={number(index)} title={title} category={category} key={title} />)}</div>
      </section>

      <section className="section shell" id="about" aria-labelledby="about-title">
        <div className="about-grid"><div className="about-label" id="about-title">Profile</div><p className="about-copy" data-reveal>I work across the stack, with a focus on <span>AI systems that are useful, observable, and built to last.</span></p></div>
        <div className="capabilities" data-reveal>{capabilities.map(([title, body]) => <CapabilityItem title={title} key={title}>{body}</CapabilityItem>)}</div>
      </section>

      <section className="section shell contact" id="contact" aria-labelledby="contact-title">
        <h2 id="contact-title" data-reveal>Have a hard problem?</h2>
        <div className="contact-row" data-reveal><p>I’m open to engineering roles and select collaborations in applied AI and product development.</p><div className="contact-details"><a href="mailto:your.email@example.com">your.email@example.com</a><a href="tel:+910000000000">+91 00000 00000</a></div></div>
      </section>
    </main>
    <footer className="shell"><span>Jeeva / AI engineer</span><span>Designed and built with intent</span></footer>
  </>
}

export default App
