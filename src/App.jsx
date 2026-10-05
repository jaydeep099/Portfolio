import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from './components/Icon';
import { About, Contact, Experience, Project, Welcome } from './components/EditorPages';
import CommandPalette from './components/CommandPalette';
import Terminal from './components/Terminal';
import { files, profile, projects } from './data/portfolio';
import resume from './assets/cv.pdf';
import './App.css';

function initialFile() { const id = window.location.hash.slice(1); return files.some(file => file.id === id) ? id : 'welcome'; }

export default function App() {
  const [active, setActive] = useState(initialFile);
  const [tabs, setTabs] = useState(() => [...new Set(['welcome', initialFile()])]);
  const [sidebar, setSidebar] = useState(() => window.innerWidth > 760);
  const [folder, setFolder] = useState(true);
  const [editorsExpanded, setEditorsExpanded] = useState(true);
  const [rootExpanded, setRootExpanded] = useState(true);
  const [terminal, setTerminal] = useState(true);
  const [terminalHeight, setTerminalHeight] = useState(() => window.innerHeight < 750 ? 165 : 190);
  const [palette, setPalette] = useState(false);
  const [popover, setPopover] = useState(null);
  const [largeType, setLargeType] = useState(false);
  const [clock, setClock] = useState(new Date());
  const [visitCount, setVisitCount] = useState(1);
  const terminalInput = useRef(null);
  const main = useRef(null);
  const explorerToggle = useRef(null);
  const sidebarRef = useRef(null);
  const current = files.find(file => file.id === active);

  const openFile = useCallback((id) => {
    if (!files.some(file => file.id === id)) return;
    setTabs(previous => previous.includes(id) ? previous : [...previous, id]);
    setActive(id); setVisitCount(n => n + 1); setPopover(null);
    if (window.location.hash !== `#${id}`) window.history.pushState(null, '', `#${id}`);
    if (window.innerWidth <= 760) setSidebar(false);
    if (id === 'contact') { setTerminal(true); setTimeout(() => terminalInput.current?.focus(), 80); }
  }, []);
  const focusTerminal = () => { setTerminal(true); setTimeout(() => terminalInput.current?.focus(), 80); };
  function closeTab(id) {
    const next = tabs.filter(tab => tab !== id); setTabs(next);
    if (active === id) { const selected = next[Math.max(0, tabs.indexOf(id) - 1)] || next[0] || null; setActive(selected); window.history.replaceState(null, '', selected ? `#${selected}` : window.location.pathname); }
  }
  useEffect(() => { main.current?.scrollTo(0, 0); }, [active]);
  useEffect(() => {
    const timer = setInterval(() => setClock(new Date()), 30000);
    const navigate = () => openFile(initialFile());
    const keys = e => { if ((e.metaKey || e.ctrlKey) && ['k', 'p'].includes(e.key.toLowerCase())) { e.preventDefault(); setPalette(v => !v); } if ((e.ctrlKey || e.metaKey) && e.key === '`') { e.preventDefault(); setTerminal(v => !v); } if (e.key === 'Escape') { setPopover(null); if (window.innerWidth <= 760) { setSidebar(false); explorerToggle.current?.focus(); } } };
    window.addEventListener('popstate', navigate); window.addEventListener('keydown', keys);
    return () => { clearInterval(timer); window.removeEventListener('popstate', navigate); window.removeEventListener('keydown', keys); };
  }, [openFile]);
  useEffect(() => {
    const media = window.matchMedia('(max-width: 760px)');
    const resize = e => setSidebar(!e.matches);
    media.addEventListener('change', resize);
    return () => media.removeEventListener('change', resize);
  }, []);
  useEffect(() => { if (sidebar && window.innerWidth <= 760) sidebarRef.current?.querySelector('button')?.focus(); }, [sidebar]);

  return <div className={`ide ${largeType ? 'large-type' : ''}`}>
    <a className="skip-link" href="#editor-content" onClick={e => { e.preventDefault(); main.current?.focus(); }}>Skip to content</a>
    <header className="titlebar"><div className="titlebar-left"><Icon name="logo" className="brand-icon" size={22}/><span className="desktop-menu" aria-hidden="true">File <span>Edit</span> <span>View</span></span><span className="mobile-title">JD <span>/ portfolio</span></span></div><button className="command-trigger" onClick={() => setPalette(true)} aria-label="Open command palette"><Icon name="search" size={14}/><span>jaydeepsinh <span className="command-slash">/</span> portfolio</span><kbd>⌘ K</kbd></button><div className="titlebar-right"><button aria-label="Toggle explorer" title="Toggle explorer" onClick={() => setSidebar(v => !v)}><Icon name="sidebar" size={17}/></button><button aria-label="Toggle terminal" title="Toggle terminal" onClick={() => setTerminal(v => !v)}><Icon name="panel" size={17}/></button><span className="window-dots" aria-hidden="true"><i/><i/><i/></span></div></header>
    <div className="workspace"><nav className="activity-bar" aria-label="Workspace tools"><div><button ref={explorerToggle} className={sidebar ? 'active' : ''} aria-label="File explorer" aria-expanded={sidebar} aria-controls="file-explorer" title="Explorer" onClick={() => setSidebar(v => !v)}><Icon name="files" size={23}/></button><button aria-label="Search files" title="Search files" onClick={() => setPalette(true)}><Icon name="search" size={23}/></button><button className={active === 'experience' ? 'active' : ''} aria-label="Open experience" title="Experience" onClick={() => openFile('experience')}><Icon name="branch" size={23}/><span className="activity-dot"/></button><button className={active === 'silal' || active === 'oes' || active === 'reconciliation' ? 'active' : ''} aria-label="Open projects" title="Projects" onClick={() => { setSidebar(true); setFolder(true); openFile('silal'); }}><Icon name="layers" size={23}/></button><button className={active === 'contact' ? 'active' : ''} aria-label="Open contact" title="Contact" onClick={() => openFile('contact')}><Icon name="mail" size={22}/></button></div><div><button aria-label="About Jaydeepsinh" title="About me" onClick={() => openFile('about')}><Icon name="user" size={22}/></button><button aria-label="Workspace settings" title="Settings" onClick={() => setPopover(v => v === 'settings' ? null : 'settings')}><Icon name="settings" size={23}/></button></div></nav>
      {sidebar && <><button className="sidebar-backdrop" aria-label="Close file explorer" onClick={() => setSidebar(false)}/><aside id="file-explorer" className="explorer" ref={sidebarRef} aria-label="File explorer" onKeyDown={e => { if (window.innerWidth > 760 || e.key !== 'Tab') return; const buttons = [...e.currentTarget.querySelectorAll('button, a')]; if (e.shiftKey && document.activeElement === buttons[0]) { e.preventDefault(); buttons.at(-1)?.focus(); } else if (!e.shiftKey && document.activeElement === buttons.at(-1)) { e.preventDefault(); buttons[0]?.focus(); } }}><div className="explorer-title"><span>EXPLORER</span><button aria-label="Explorer commands" title="Explorer commands" onClick={() => setPalette(true)}>···</button><button className="mobile-close" aria-label="Close explorer drawer" onClick={() => setSidebar(false)}><Icon name="close" size={17}/></button></div><button className="tree-heading" aria-expanded={editorsExpanded} onClick={() => setEditorsExpanded(v => !v)}><Icon name="chevron" size={13} className={editorsExpanded ? 'rotate-down' : ''}/> OPEN EDITORS <span className="count-badge">{tabs.length}</span></button>{editorsExpanded && <div className="open-editors">{tabs.map(id => { const file = files.find(f => f.id === id); return <div className={`open-editor ${active === id ? 'selected' : ''}`} key={id}><button aria-label={`Close ${file.name} from explorer`} className="editor-close" onClick={() => closeTab(id)}><Icon name="close" size={13}/></button><button className="editor-file" onClick={() => openFile(id)}><Icon name={file.icon} size={15}/>{file.name}</button></div>; })}</div>}
      <button className="tree-heading root-heading" aria-expanded={rootExpanded} onClick={() => setRootExpanded(v => !v)}><Icon name="chevron" size={13} className={rootExpanded ? 'rotate-down' : ''}/> JAYDEEPSINH-PORTFOLIO</button>{rootExpanded && <div className="file-tree">{files.slice(0, 3).map(file => <button key={file.id} className={`tree-file ${active === file.id ? 'selected' : ''}`} onClick={() => openFile(file.id)}><Icon name={file.icon} size={16}/><span>{file.id === 'welcome' ? 'welcome.md' : file.name}</span></button>)}<button className="tree-file folder-row" onClick={() => setFolder(v => !v)} aria-expanded={folder}><Icon name="chevron" size={12} className={folder ? 'rotate-down' : ''}/><Icon name="folder" size={16}/><span>projects</span><span className="tree-count">3</span></button>{folder && <div className="project-tree">{files.slice(3, 6).map(file => <button key={file.id} className={`tree-file ${active === file.id ? 'selected' : ''}`} onClick={() => openFile(file.id)}><Icon name="json"/><span>{file.name}</span></button>)}</div>}<button className={`tree-file ${active === 'contact' ? 'selected' : ''}`} onClick={() => openFile('contact')}><Icon name="terminal" size={16}/><span>contact.sh</span></button><a className="tree-file resume-file" href={resume} download="Jaydeepsinh-Parmar-CV.pdf"><Icon name="download" size={16}/><span>resume.pdf</span><Icon name="external" size={12}/></a></div>}
      <div className="explorer-bottom"><div className="workspace-note"><span className="note-mark">{'//'}</span><p>A portfolio.<br/>An open workspace.<br/><span>A little bit of me.</span></p></div><button className="explorer-outline" onClick={() => openFile('about')}><Icon name="chevron" size={12}/> ABOUT THIS WORKSPACE</button><div className="explorer-profile"><span className="avatar">JD</span><div><strong>Jaydeepsinh Parmar</strong><span><i className="green-dot"/> Building with purpose</span></div></div></div></aside></>}
      <div className="editor-workspace"><div className="editor-tabs" role="tablist" aria-label="Open files">{tabs.map(id => { const file = files.find(f => f.id === id); return <div className={`editor-tab ${id === active ? 'active' : ''}`} key={id}><button role="tab" id={`tab-${id}`} aria-controls="editor-content" aria-selected={id === active} onClick={() => openFile(id)}><Icon name={file.icon} size={16}/><span>{file.name}</span></button><button className="tab-close" aria-label={`Close ${file.name}`} onClick={() => closeTab(id)}><Icon name="close" size={13}/></button></div>; })}<div className="tab-actions"><button title="Open a file" aria-label="Open a file" onClick={() => setPalette(true)}><Icon name="plus" size={16}/></button></div></div>
      <div className="breadcrumbs"><span>portfolio</span><Icon name="chevron" size={11}/>{projects.some(p => p.id === active) && <><span>projects</span><Icon name="chevron" size={11}/></>}{current && <><Icon name={current.icon} size={13}/><span>{current.name}</span></>}<span className="preview-indicator"><span className="green-dot"/>{active === 'about' || active === 'experience' ? 'Markdown preview' : 'Interactive preview'}</span></div>
      <main id="editor-content" role="tabpanel" aria-labelledby={active ? `tab-${active}` : undefined} tabIndex={-1} className="editor-content" ref={main}>{active === 'welcome' ? <Welcome openFile={openFile}/> : active === 'about' ? <About openFile={openFile}/> : active === 'experience' ? <Experience/> : active === 'contact' ? <Contact focusTerminal={focusTerminal}/> : projects.some(p => p.id === active) ? <Project id={active} openFile={openFile}/> : <div className="empty-editor"><Icon name="logo" size={95}/><h1>Your next discovery is a file away.</h1><button className="primary-button" onClick={() => openFile('welcome')}>Open Welcome <Icon name="arrow" size={16}/></button><button className="text-button" onClick={() => setPalette(true)}>Browse files <kbd>⌘ K</kbd></button></div>}</main>
      <Terminal visible={terminal} setVisible={setTerminal} contactMode={active === 'contact'} openFile={openFile} inputRef={terminalInput} height={terminalHeight} setHeight={setTerminalHeight} visitCount={visitCount}/></div>
    </div>
    <footer className="statusbar"><div><span className="remote-status"><Icon name="code" size={14}/></span><button title="Portfolio workspace branch (simulated)" onClick={() => setPopover(v => v === 'git' ? null : 'git')}><Icon name="branch" size={13}/> main<span className="branch-star">*</span></button><span className="status-sync" title="Workspace ready"><Icon name="sync" size={12}/></span><span className="status-diagnostics"><Icon name="circle" size={12}/> 0 <span>△</span> 0</span></div><div className="status-center"><span className="green-dot"/> All systems curious</div><div><span className="status-time"><Icon name="clock" size={12}/>{clock.toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' })} IST</span><span className="status-encoding">UTF-8</span><span className="status-language">{active === 'contact' ? 'Shell Script' : projects.some(p => p.id === active) ? 'JSON' : 'Markdown'}</span><button onClick={focusTerminal} title="Open terminal" aria-label="Open terminal"><Icon name="terminal" size={13}/></button><button aria-label="Workspace information" title="Workspace information" onClick={() => setPopover(v => v === 'info' ? null : 'info')}><Icon name="bell" size={13}/></button></div></footer>
    {popover && <><button className="popover-backdrop" aria-label="Dismiss workspace popup" onClick={() => setPopover(null)}/><div className={`workspace-popover ${popover}`} role="region" aria-label="Workspace information"><div className="popover-heading"><strong>{popover === 'settings' ? 'Workspace settings' : popover === 'git' ? 'Source control' : 'Welcome to my workspace'}</strong><button aria-label="Close workspace popup" onClick={() => setPopover(null)}><Icon name="close" size={16}/></button></div>{popover === 'settings' ? <><label><span>Larger editor text</span><input type="checkbox" checked={largeType} onChange={e => setLargeType(e.target.checked)}/></label><label><span>Integrated terminal</span><input type="checkbox" checked={terminal} onChange={e => setTerminal(e.target.checked)}/></label><p>Theme: Midnight violet<br/>Animations respect your device’s reduced-motion setting.</p></> : popover === 'git' ? <><p><Icon name="branch" size={15}/> <strong>main</strong> · portfolio workspace</p><p>This is a simulated editor branch. Browse the actual code on GitHub.</p><a className="text-button" href={profile.github} target="_blank" rel="noreferrer">Open GitHub <Icon name="external" size={14}/></a></> : <><p>Explore using the file tree, command palette, or terminal.</p><p><kbd>Ctrl / ⌘ K</kbd> Command palette<br/><kbd>Ctrl / ⌘ `</kbd> Toggle terminal</p></>}</div></>}
    {palette && <CommandPalette close={() => setPalette(false)} openFile={openFile} toggleTerminal={() => setTerminal(v => !v)} toggleSidebar={() => setSidebar(v => !v)}/>}
  </div>;
}
