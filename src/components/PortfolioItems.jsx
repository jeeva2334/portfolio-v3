import { ArrowTopRightIcon, Cross1Icon } from '@radix-ui/react-icons'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export function SpecialismItem({ index, children }) {
  return <div className="index-item"><strong>{index}</strong>&nbsp;&nbsp; {children}</div>
}

export function ProjectItem({ index, project, onClick }) {
  const handleClick = (e) => {
    e.preventDefault();
    onClick();
  };

  return <a className="project" href="#" onClick={handleClick}>
    <span className="project-number">{index}</span>
    <h3>{project.title}</h3>
    <span className="project-meta">{project.stack}<br />{project.type}</span>
    <span className="project-arrow" aria-hidden="true"><ArrowTopRightIcon width="24" height="24" /></span>
    <img className="project-preview" src={project.image} alt="" width="1536" height="1024" loading="lazy" />
  </a>
}

export function WorkModal({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!project) return null;
  const isExternal = Boolean(project.link);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <Cross1Icon width="24" height="24" />
        </button>
        <div className="modal-image">
          <img src={project.image} alt={project.title} />
        </div>
        <div className="modal-body">
          <h2 className="modal-title">{project.title}</h2>
          <div className="modal-meta">
            <span>{project.stack}</span> / <span>{project.type}</span>
          </div>
          <p className="modal-desc">{project.description || 'No description available for this work.'}</p>
          {isExternal && (
            <a className="modal-link-button" href={project.link} target="_blank" rel="noopener noreferrer">
              View Project <ArrowTopRightIcon width="16" height="16" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export function PostItem({ index, title, category, id }) {
  if (id) {
    return <Link to={`/note/${id}`} className="post" style={{ textDecoration: 'none' }}>
      <span className="post-number">{index}</span>
      <h3>{title}</h3>
      <span className="post-meta">{category}<br />Read now <ArrowTopRightIcon style={{ display: 'inline', verticalAlign: 'text-bottom' }} width="12" height="12" /></span>
    </Link>
  }
  return <article className="post">
    <span className="post-number">{index}</span>
    <h3>{title}</h3>
    <span className="post-meta">{category}<br />Read soon</span>
  </article>
}

export function CapabilityItem({ title, children }) {
  return <article className="capability"><h3>{title}</h3><p>{children}</p></article>
}
