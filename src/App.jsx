import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { MoonIcon, SunIcon, HamburgerMenuIcon, Cross1Icon, ArrowRightIcon } from '@radix-ui/react-icons'
import { CapabilityItem, PostItem, ProjectItem, SpecialismItem, WorkModal } from './components/PortfolioItems.jsx'
import { useData } from './context/DataContext'

const capabilities = [
  ['Intelligence', 'LLM applications, RAG pipelines, agent orchestration, evaluation, and production AI infrastructure.'],
  ['Product', 'Full-stack applications with clear interfaces, resilient APIs, and thoughtful interaction design.'],
  ['Systems', 'Architecture for services that stay understandable as teams, traffic, and requirements grow.'],
  ['Toolkit', 'Python, TypeScript, React, Next.js, FastAPI, PostgreSQL, and vector databases.'],
]

function number(index) {
  return String(index + 1).padStart(2, '0')
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') === 'light' ? 'light' : 'dark')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  
  const { works: projects, notes: posts, isLoading } = useData()
  const location = useLocation()

  useEffect(() => {
    if (location.hash && !isLoading) {
      const id = location.hash.substring(1)
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }, [location.hash, isLoading])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#0a0a0a' : '#f4f4ef'
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    if (isLoading) return;
    
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
  }, [isLoading])

  if (isLoading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
        <span className="blink">&lt; /&gt;</span>
      </div>
    );
  }

  return <>
    <header className="shell">
      <nav className="nav" aria-label="Primary navigation">
        <a className="mark" href="#top" aria-label="Jeeva, home" onClick={() => setIsMenuOpen(false)}>J / 26</a>
        <div className="nav-links desktop-only">
          <a href="#work">Work</a><a href="#blog">Blog</a><a href="#about">Profile</a><a href="#contact">Contact</a>
          <button className="theme-toggle" type="button" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} aria-pressed={theme === 'light'} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px' }}>{theme === 'dark' ? <SunIcon width="16" height="16" /> : <MoonIcon width="16" height="16" />}</button>
        </div>
        <button className="hamburger mobile-only flex-center" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu" aria-expanded={isMenuOpen}>
          {isMenuOpen ? <Cross1Icon width="20" height="20" /> : <HamburgerMenuIcon width="20" height="20" />}
        </button>
      </nav>
      <div className={`mobile-menu ${isMenuOpen ? 'is-open' : ''}`}>
        <nav className="mobile-nav-links">
          <a href="#work" onClick={() => setIsMenuOpen(false)}>Work</a>
          <a href="#blog" onClick={() => setIsMenuOpen(false)}>Blog</a>
          <a href="#about" onClick={() => setIsMenuOpen(false)}>Profile</a>
          <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
          <button className="theme-toggle mobile-theme" type="button" onClick={() => { setTheme(theme === 'dark' ? 'light' : 'dark'); setIsMenuOpen(false); }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>{theme === 'dark' ? <SunIcon width="20" height="20" /> : <MoonIcon width="20" height="20" />} Theme</button>
        </nav>
      </div>
    </header>

    <main id="top">
      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div><p className="eyebrow">AI engineer + full-stack developer</p><h1 id="hero-title"><span>Jeeva</span></h1></div>
          <div className="hero-bottom"><p>I turn ambitious AI ideas into reliable products, from model orchestration to the interface people actually use.</p><a className="arrow-link" href="#work">Selected work <ArrowRightIcon aria-hidden="true" width="16" height="16" /></a></div>
        </div>
        <div className="hero-visual" aria-hidden="true"><img src="/assets/hero-compute.png" alt="" width="1365" height="1690" fetchPriority="high" /></div>
      </section>

      <div className="index-strip shell" aria-label="Specialisms">{['Applied AI', 'Product engineering', 'System design'].map((item, index) => <SpecialismItem index={number(index)} key={item}>{item}</SpecialismItem>)}</div>

      <section className="section shell" id="work" aria-labelledby="work-title">
        <h2 className="section-title" id="work-title" data-reveal>Selected work</h2>
        <div className="work-list" data-reveal>{projects.map((project, index) => <ProjectItem index={number(index)} project={project} onClick={() => setSelectedProject(project)} key={project.id || index} />)}</div>
      </section>

      <section className="section shell" id="blog" aria-labelledby="blog-title">
        <h2 className="section-title" id="blog-title" data-reveal>Notes on building.</h2>
        <div className="blog-list" data-reveal>{posts.map((post, index) => <PostItem index={number(index)} title={post.title} category={post.category} id={post.id} key={post.id || index} />)}</div>
      </section>

      <section className="section shell" id="about" aria-labelledby="about-title">
        <div className="about-grid"><div className="about-label" id="about-title">Profile</div><p className="about-copy" data-reveal>I work across the stack, with a focus on <span>AI systems that are useful, observable, and built to last.</span></p></div>
        <div className="capabilities" data-reveal>{capabilities.map(([title, body]) => <CapabilityItem title={title} key={title}>{body}</CapabilityItem>)}</div>
      </section>

      <section className="section shell contact" id="contact" aria-labelledby="contact-title">
        <h2 id="contact-title" data-reveal>Have a hard problem?</h2>
        <div className="contact-row" data-reveal><p>I’m open to engineering roles and select collaborations in applied AI and product development.</p><div className="contact-details"><a href="mailto:hello@builtbyjeeva.in">hello@builtbyjeeva.in</a><a href="tel:+919025619966">+91 90256 19966</a></div></div>
      </section>
    </main>
    <footer className="shell"><span>Jeeva / AI engineer</span><span>Designed and built with intent</span></footer>
    
    {selectedProject && <WorkModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
  </>
}

export default App

