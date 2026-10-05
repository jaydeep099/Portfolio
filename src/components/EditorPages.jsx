/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Icon from './Icon';
import { experience, profile, projects } from '../data/portfolio';
import resume from '../assets/cv.pdf';

const ascii = ['     ██╗██████╗ ', '     ██║██╔══██╗', '     ██║██████╔╝', '██   ██║██╔═══╝ ', '╚█████╔╝██║     ', ' ╚════╝ ╚═╝     '].join('\n');

export function Welcome({ openFile }) {
  const [characters, setCharacters] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setCharacters(ascii.length); return; }
    const timer = setInterval(() => setCharacters(n => { if (n >= ascii.length) clearInterval(timer); return Math.min(n + 4, ascii.length); }), 25);
    return () => clearInterval(timer);
  }, []);
  return <div className="welcome-page">
    <div className="welcome-topline"><span><span className="green-dot"/> WORKSPACE INITIALIZED</span><span className="version">portfolio v2.0</span></div>
    <section className="hero">
      <div className="hero-copy"><p className="eyebrow">HELLO, WORLD. I’M</p><h1>Jaydeepsinh<br/><span>Parmar<span className="name-period">.</span></span></h1>
        <div className="whoami"><span className="green">❯</span> <span className="muted">whoami</span></div>
        <p className={`hero-role ${characters === ascii.length ? 'resolved' : ''}`}>{profile.title}<span className="cursor"/></p>
        <p className="hero-description">I connect systems, simplify the complex, and build<br className="desktop-break"/> software that makes everyday work better.</p>
        <div className="hero-actions"><button className="primary-button" onClick={() => openFile('silal')}>Explore my work <Icon name="arrow" size={16}/></button><button className="text-button" onClick={() => openFile('contact')}><Icon name="terminal" size={16}/> Let’s talk</button></div>
      </div>
      <div className="hero-art"><div className="art-corner top-left"/><div className="art-corner bottom-right"/><div className="ascii-label"><span className="green-dot"/> developer.config</div><pre className="ascii" aria-label="JD monogram">{ascii.slice(0, characters)}<span className="ascii-cursor">_</span></pre><div className="art-code"><span className="purple">const</span> developer <span className="muted">=</span> {'{'}<br/>&nbsp; focus: <span className="green">&quot;build. connect. solve.&quot;</span>,<br/>&nbsp; location: <span className="green">&quot;India&quot;</span>,<br/>&nbsp; curiosity: <span className="amber">Infinity</span><br/>{'}'};</div><div className="art-footer"><span>crafted with intention</span><Icon name="code" size={14}/></div></div>
    </section>
    <section className="start-section"><div className="section-label"><span>START EXPLORING</span><span>Pick a file. Get to know me.</span></div><div className="quick-links">
      {[['about', 'user', 'The person', 'A little about me', '01'], ['experience', 'branch', 'The journey', 'Where I’ve been building', '02'], ['contact', 'terminal', 'The conversation', 'Great things start with hello', '03']].map(([id, icon, title, sub, number]) => <button className="quick-card" key={id} onClick={() => openFile(id)}><div className="quick-card-top"><Icon name={icon}/><span>{number}</span></div><strong>{title}</strong><span className="quick-sub">{sub}<Icon name="arrow" size={15}/></span></button>)}
    </div></section>
    <section className="recent-section"><div className="section-label"><span>SELECTED WORK</span><button onClick={() => openFile('silal')}>View projects <Icon name="arrow" size={13}/></button></div>{projects.map((p, i) => <button className="recent-project" key={p.id} onClick={() => openFile(p.id)}><span className="project-number">0{i + 1}</span><Icon name="json"/><span className="recent-name">{p.file}<span>{p.category}</span></span><span className="project-client">{p.client}</span><Icon name="arrow" size={16}/></button>)}</section>
    <div className="welcome-footer"><span><Icon name="pin" size={13}/> {profile.location}</span><span>Made of code. Driven by curiosity.</span></div>
  </div>;
}

export function About({ openFile }) {
  return <article className="markdown-page"><div className="document-label"><Icon name="markdown"/> MARKDOWN PREVIEW <span>about.md</span></div><p className="eyebrow">THE PERSON BEHIND THE CODE</p><h1>Hi, I’m Jaydeepsinh<span className="purple">.</span></h1><p className="document-lead">An engineer’s mindset.<br/>A consultant’s perspective.</p><p>I’m a software engineer and technical consultant based in Ahmedabad, India. I turn business requirements into connected systems, reliable integrations and applications that people can actually use.</p><p>My professional journey began in January 2025, with <strong>1+ years across software engineering, full stack internships and Oracle Cloud consulting</strong>. Today, I’m an Associate Technical Consultant at <strong>Innovage Cloud</strong>, working across Finance, Supply Chain Management and warehouse operations.</p><blockquote>Good software doesn’t stop at deployment. It stays reliable when real people and real data arrive.</blockquote>
    <h2><span className="heading-hash">##</span> What I bring to the table</h2><p>From requirements and technical design to testing, go-live and production support, I work across the complete delivery lifecycle.</p><div className="table-scroll"><table><thead><tr><th>Area</th><th>My toolkit</th></tr></thead><tbody>{[['Cloud & enterprise', 'Oracle Integration Cloud · Fusion ERP / SCM · OCI · ATP'], ['Applications', 'VBCS · Oracle JET · JavaScript · Java'], ['Integrations', 'REST · SOAP · FBDI · SFTP · ORDS'], ['Data & reporting', 'SQL · PL/SQL · BI Publisher · MySQL · PostgreSQL'], ['Delivery', 'Git · Docker · Postman · SIT · UAT · Production support']].map(([a, b]) => <tr key={a}><td>{a}</td><td>{b}</td></tr>)}</tbody></table></div>
    <h2><span className="heading-hash">##</span> Currently exploring</h2><ul className="exploring-list"><li>Cloud deployment patterns with AWS and Docker</li><li>More reusable, observable integration architectures</li><li>The intersection of enterprise applications and thoughtful user experiences</li></ul>
    <h2><span className="heading-hash">##</span> The foundations</h2><div className="education"><Icon name="code"/><div><strong>B.Tech in Information Technology</strong><p>Dharmsinh Desai University · 2021–2025</p><span className="muted">CGPA 7.63 / 10</span></div></div><div className="document-actions"><button className="primary-button" onClick={() => openFile('experience')}>Follow my journey <Icon name="arrow" size={16}/></button><a className="text-button" href={resume} download="Jaydeepsinh-Parmar-CV.pdf"><Icon name="download" size={16}/> Download CV</a></div></article>;
}

export function Experience() {
  return <article className="markdown-page"><div className="document-label"><Icon name="markdown"/> MARKDOWN PREVIEW <span>experience.md</span></div><p className="eyebrow">A LITTLE BETTER WITH EVERY COMMIT</p><h1>The journey so far<span className="purple">.</span></h1><p className="document-lead">Building a foundation.<br/>Then building on it.</p><p>From full stack development to enterprise cloud consulting, each role has added a new way to approach a problem.</p><div className="timeline">{experience.map((job, i) => <section className={`timeline-item ${job.current ? 'current' : ''}`} key={job.company + job.role}><span className="timeline-dot"/><div className="timeline-date">{job.date}{job.current && <span className="current-badge">CURRENT</span>}</div><h2>{job.role}</h2><h3>{job.company}</h3>{job.detail && <p>{job.detail}</p>}<div className="tags">{job.tags.map(t => <span key={t}>{t}</span>)}</div><span className="commit-hash">{['HEAD → main', 'consulting', 'full-stack', 'full-stack', 'initial commit'][i]}</span></section>)}</div><a className="text-button" href={profile.linkedin} target="_blank" rel="noreferrer">View experience on LinkedIn <Icon name="external" size={15}/></a></article>;
}

export function HighlightedCode({ value }) {
  const lines = value.split('\n');
  return <div className="code-block" tabIndex={0} aria-label="Syntax highlighted source code">{lines.map((line, i) => <div className="code-line" key={i}><span className="line-number" aria-hidden="true">{i + 1}</span><code>{line.split(/("(?:[^"\\]|\\.)*"\s*:|"(?:[^"\\]|\\.)*"|\b(?:true|false|null|\d+)\b|[{}[\]])/g).map((token, j) => <span key={j} className={/^".*":$/.test(token.trim()) ? 'json-key' : /^"/.test(token) ? 'json-string' : /^(true|false|null|\d+)$/.test(token) ? 'json-number' : /^[{}[\]]$/.test(token) ? 'json-bracket' : ''}>{token}</span>)}</code></div>)}</div>;
}

export function Project({ id, openFile }) {
  const project = projects.find(p => p.id === id);
  const [copied, setCopied] = useState(false);
  useEffect(() => { setCopied(false); }, [id]);
  useEffect(() => { if (!copied) return; const timer = setTimeout(() => setCopied(false), 2000); return () => clearTimeout(timer); }, [copied]);
  async function copy() { try { await navigator.clipboard.writeText(JSON.stringify(project.config, null, 2)); setCopied(true); } catch { setCopied('failed'); } }
  return <article className="project-page"><div className="project-heading"><div><p className="eyebrow">{project.client} <span>/</span> {project.category}</p><h1>{project.name}</h1><p>{project.summary}</p></div><span className="project-emblem"><Icon name={project.icon} size={28}/></span></div><div className="source-toolbar"><span><Icon name="json"/> {project.file}</span><button className="text-button" onClick={copy}><Icon name={copied === true ? 'check' : 'files'} size={14}/>{copied === true ? 'Copied' : copied === 'failed' ? 'Select code to copy' : 'Copy JSON'}</button></div><HighlightedCode value={JSON.stringify(project.config, null, 2)}/><div className="project-bottom"><span><Icon name="check" size={14}/> Real project. Real business problem.</span><button className="text-button" onClick={() => openFile(projects[(projects.findIndex(p => p.id === id) + 1) % projects.length].id)}>Next project <Icon name="arrow" size={15}/></button></div></article>;
}

export function Contact({ focusTerminal }) {
  return <article className="markdown-page contact-page"><div className="document-label"><Icon name="terminal"/> SHELL SCRIPT <span>contact.sh</span></div><p className="eyebrow">LET’S BUILD SOMETHING THAT MATTERS</p><h1>Start a conversation<span className="purple">.</span></h1><p className="document-lead">Good things start<br/>with a simple hello.</p><p>Have an integration challenge, a project in mind, or just want to talk code? My inbox is a good place to start.</p><div className="contact-links">{[['mail', 'Email', profile.email, `mailto:${profile.email}`], ['github', 'GitHub', '@jaydeep099', profile.github], ['linkedin', 'LinkedIn', 'Jaydeepsinh Parmar', profile.linkedin], ['download', 'Resume', 'The full story · PDF', resume]].map(([icon, label, text, href]) => <a key={label} href={href} target={label === 'Email' || label === 'Resume' ? undefined : '_blank'} rel="noreferrer" download={label === 'Resume' ? 'Jaydeepsinh-Parmar-CV.pdf' : undefined}><Icon name={icon}/><span><small>{label}</small><strong>{text}</strong></span><Icon name="external" size={16}/></a>)}</div><div className="terminal-invitation"><Icon name="terminal" size={24}/><div><strong>More comfortable in the terminal?</strong><p>Type a message below to echo it, then open your email app to send.</p></div><button className="text-button" onClick={focusTerminal}>Say hello <Icon name="arrow" size={16}/></button></div></article>;
}
