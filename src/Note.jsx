import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, MoonIcon, SunIcon, HamburgerMenuIcon, Cross1Icon, CopyIcon, CheckIcon } from '@radix-ui/react-icons';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useData } from './context/DataContext';

const CodeBlock = ({ node, inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || '');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(String(children).replace(/\n$/, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!inline && match) {
    return (
      <div style={{ position: 'relative', marginBottom: '2rem', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1e1e1e', padding: '0.5rem 1rem', borderBottom: '1px solid #333' }}>
          <span style={{ color: '#858585', fontSize: '0.75rem', fontFamily: 'var(--mono)', textTransform: 'uppercase' }}>
            {match[1]}
          </span>
          <button 
            onClick={handleCopy}
            style={{ background: 'transparent', border: 'none', color: '#858585', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontFamily: 'var(--mono)' }}
          >
            {copied ? <><CheckIcon /> Copied</> : <><CopyIcon /> Copy</>}
          </button>
        </div>
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={match[1]}
          PreTag="div"
          customStyle={{ margin: 0, padding: '1rem', background: '#1e1e1e', fontSize: '0.9rem' }}
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      </div>
    );
  }

  return (
    <code className={className} style={{ background: 'var(--line)', padding: '0.2rem 0.4rem', borderRadius: '4px', fontSize: '0.85em', fontFamily: 'var(--mono)' }} {...props}>
      {children}
    </code>
  );
};

export default function Note() {
  const { id } = useParams();
  const { notes, isLoading: isContextLoading } = useData();
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') === 'light' ? 'light' : 'dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    let metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) metaTheme.content = theme === 'dark' ? '#0a0a0a' : '#f4f4ef';
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (isContextLoading) return;
    const foundNote = notes.find(n => n.id === id);
    if (foundNote) {
      setNote(foundNote);
    }
    setIsLoading(false);
  }, [id, notes, isContextLoading]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading || isContextLoading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
        <span className="blink">&lt; /&gt;</span>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="shell" style={{ minHeight: '100vh', paddingTop: '10rem' }}>
        <h2>Note not found.</h2>
        <Link to="/" className="arrow-link" style={{ marginTop: '2rem', display: 'inline-flex', alignItems: 'center', gap: '0.7rem' }}><ArrowLeftIcon width="16" height="16" /> Back to home</Link>
      </div>
    );
  }

  const date = new Date(note.created_at).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <>
      <header className="shell">
        <nav className="nav" aria-label="Primary navigation">
          <Link className="mark" to="/" aria-label="Jeeva, home" onClick={() => setIsMenuOpen(false)}>J / 26</Link>
          <div className="nav-links desktop-only">
            <Link to="/#work">Work</Link><Link to="/#blog">Blog</Link><Link to="/#about">Profile</Link><Link to="/#contact">Contact</Link>
            <button className="theme-toggle" type="button" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} aria-pressed={theme === 'light'} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px' }}>{theme === 'dark' ? <SunIcon width="16" height="16" /> : <MoonIcon width="16" height="16" />}</button>
          </div>
          <button className="hamburger mobile-only flex-center" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu" aria-expanded={isMenuOpen} style={{ background: 'transparent', border: 'none', color: 'var(--ink)' }}>
            {isMenuOpen ? <Cross1Icon width="20" height="20" /> : <HamburgerMenuIcon width="20" height="20" />}
          </button>
        </nav>
        <div className={`mobile-menu ${isMenuOpen ? 'is-open' : ''}`}>
          <nav className="mobile-nav-links">
            <Link to="/#work" onClick={() => setIsMenuOpen(false)}>Work</Link>
            <Link to="/#blog" onClick={() => setIsMenuOpen(false)}>Blog</Link>
            <Link to="/#about" onClick={() => setIsMenuOpen(false)}>Profile</Link>
            <Link to="/#contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            <button className="theme-toggle mobile-theme" type="button" onClick={() => { setTheme(theme === 'dark' ? 'light' : 'dark'); setIsMenuOpen(false); }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>{theme === 'dark' ? <SunIcon width="20" height="20" /> : <MoonIcon width="20" height="20" />} Theme</button>
          </nav>
        </div>
      </header>

      <main className="shell note-page">
        <article style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '8rem' }}>
          <header style={{ margin: '4rem 0 4rem', paddingBottom: '3rem', borderBottom: '1px solid var(--line)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--line)', paddingBottom: '1rem' }}>
                <Link to="/" className="arrow-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', fontSize: '0.75rem' }}>
                  <ArrowLeftIcon width="16" height="16" /> BACK
                </Link>
                <div style={{ color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {date}
                </div>
              </div>
              
              <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', letterSpacing: '-0.06em', lineHeight: 1.05, margin: 0, fontWeight: 500, color: 'var(--ink)' }}>
                {note.title}
              </h1>
              
              {note.category && (
                <div style={{ display: 'inline-block', border: '1px solid var(--line)', padding: '0.4rem 0.8rem', fontSize: '0.7rem', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.08em', width: 'fit-content', background: 'var(--ink)', color: 'var(--paper)' }}>
                  {note.category}
                </div>
              )}
            </div>
          </header>

          <div 
            className="note-content" 
            style={{ 
              fontSize: '1.15rem', 
              lineHeight: 1.75, 
              color: 'var(--ink)',
              maxWidth: '65ch',
              margin: '0 auto'
            }}
          >
            <ReactMarkdown 
              rehypePlugins={[rehypeSanitize]}
              components={{
                code: CodeBlock,
                h1: ({node, ...props}) => <h1 style={{ fontSize: '2.5rem', margin: '3.5rem 0 1.5rem', letterSpacing: '-0.04em', lineHeight: 1.1, color: 'var(--ink)' }} {...props} />,
                h2: ({node, ...props}) => <h2 style={{ fontSize: '1.8rem', margin: '3rem 0 1.25rem', letterSpacing: '-0.03em', lineHeight: 1.2, color: 'var(--ink)' }} {...props} />,
                h3: ({node, ...props}) => <h3 style={{ fontSize: '1.4rem', margin: '2.5rem 0 1rem', letterSpacing: '-0.02em', lineHeight: 1.3, color: 'var(--ink)' }} {...props} />,
                p: ({node, ...props}) => <p style={{ marginBottom: '1.5rem', color: '#888884' }} {...props} />,
                ul: ({node, ...props}) => <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem', color: '#888884' }} {...props} />,
                ol: ({node, ...props}) => <ol style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem', color: '#888884' }} {...props} />,
                li: ({node, ...props}) => <li style={{ marginBottom: '0.5rem', paddingLeft: '0.5rem' }} {...props} />,
                blockquote: ({node, ...props}) => <blockquote style={{ borderLeft: '2px solid var(--ink)', padding: '1rem 0 1rem 1.5rem', margin: '2.5rem 0', fontStyle: 'italic', fontSize: '1.35rem', color: 'var(--muted)', background: 'transparent' }} {...props} />,
                img: ({node, ...props}) => <img style={{ width: '100%', height: 'auto', margin: '2.5rem 0', border: '1px solid var(--line)', filter: 'contrast(1.05)' }} {...props} />,
                a: ({node, ...props}) => <a style={{ color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: '4px', textDecorationThickness: '1px' }} {...props} />
              }}
            >
              {note.content}
            </ReactMarkdown>
          </div>
        </article>
      </main>
    </>
  );
}
