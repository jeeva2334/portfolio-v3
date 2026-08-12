export function SpecialismItem({ index, children }) {
  return <div className="index-item"><strong>{index}</strong>&nbsp;&nbsp; {children}</div>
}

export function ProjectItem({ index, title, stack, type, image }) {
  return <a className="project" href="#contact">
    <span className="project-number">{index}</span>
    <h3>{title}</h3>
    <span className="project-meta">{stack}<br />{type}</span>
    <span className="project-arrow" aria-hidden="true">&nearr;</span>
    <img className="project-preview" src={image} alt="" width="1536" height="1024" loading="lazy" />
  </a>
}

export function PostItem({ index, title, category }) {
  return <article className="post">
    <span className="post-number">{index}</span>
    <h3>{title}</h3>
    <span className="post-meta">{category}<br />Read soon</span>
  </article>
}

export function CapabilityItem({ title, children }) {
  return <article className="capability"><h3>{title}</h3><p>{children}</p></article>
}
