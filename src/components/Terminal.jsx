/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import { files, profile, projects } from '../data/portfolio';
import { commandList, parseCommand } from '../data/commands';
import resume from '../assets/cv.pdf';

export default function Terminal({ visible, setVisible, contactMode, openFile, inputRef, height, setHeight, visitCount }) {
  const [panel, setPanel] = useState('terminal');
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [lines, setLines] = useState([{ type: 'boot', text: 'Welcome to my little corner of the internet.' }, { type: 'hint', text: 'Type help to explore, or click a file in the explorer.' }]);
  const output = useRef(null);
  const pointerCleanup = useRef(null);
  useEffect(() => () => pointerCleanup.current?.(), []);
  useEffect(() => { if (output.current) output.current.scrollTop = output.current.scrollHeight; }, [lines, visible, panel]);
  useEffect(() => {
    if (!contactMode) return;
    setPanel('terminal');
    setLines(previous => [...previous, { type: 'command', text: 'cat contact.sh' }, { type: 'links' }, { type: 'hint', text: 'Say hello below. Messages are echoed locally; use the email link to send.' }]);
  }, [contactMode]);
  useEffect(() => { if (visible) setPanel('terminal'); }, [visible]);
  function add(...entries) { setLines(previous => [...previous, ...entries].slice(-150)); }
  function submit(event) {
    event.preventDefault();
    if (!input.trim()) return;
    const raw = input.trim();
    const result = parseCommand(raw);
    setHistory(previous => [...previous, raw]); setHistoryIndex(-1); setInput('');
    if (result.type === 'clear') { setLines([]); return; }
    add({ type: 'command', text: raw });
    if (result.type === 'navigate') { openFile(result.id); add({ type: 'success', text: `Opened ${files.find(f => f.id === result.id).name}` }); }
    else if (result.type === 'help') add({ type: 'help' });
    else if (result.type === 'whoami') add({ type: 'success', text: `${profile.name} — ${profile.title}` });
    else if (result.type === 'ls') add({ type: 'files' });
    else if (result.type === 'projects') add({ type: 'projects' });
    else if (result.type === 'pwd') add({ type: 'text', text: '/home/jaydeepsinh/portfolio' });
    else if (result.type === 'date') add({ type: 'text', text: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'short' }) + ' IST' });
    else if (result.type === 'resume') add({ type: 'resume' });
    else if (result.type === 'error') add({ type: 'error', text: result.text });
    else if (result.type === 'echo' || (result.type === 'unknown' && contactMode)) { const message = result.type === 'echo' ? result.text : raw; add({ type: 'text', text: message }, { type: 'message', text: message }); }
    else add({ type: 'error', text: `Command not found: ${raw.split(' ')[0]}. Type help for available commands.` });
  }
  function onKey(event) {
    if (event.key === 'ArrowUp') { event.preventDefault(); const index = historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1); setHistoryIndex(index); setInput(history[index] || ''); }
    if (event.key === 'ArrowDown') { event.preventDefault(); const index = historyIndex + 1; if (index >= history.length) { setHistoryIndex(-1); setInput(''); } else { setHistoryIndex(index); setInput(history[index] || ''); } }
    if (event.key === 'Tab' && input) { const candidates = [...commandList, ...files.map(f => `open ${f.name}`), ...files.map(f => `cat ${f.name}`)]; const match = candidates.find(command => command.startsWith(input)); if (match) { event.preventDefault(); setInput(match); } }
    if (event.ctrlKey && event.key === 'l') { event.preventDefault(); setLines([]); }
    if (event.ctrlKey && event.key === 'c') { event.preventDefault(); setInput(''); add({ type: 'text', text: '^C' }); }
  }
  function resize(event) {
    event.preventDefault();
    const start = event.clientY, initial = height;
    const move = e => setHeight(Math.max(140, Math.min(window.innerHeight * .65, initial + start - e.clientY)));
    const end = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', end); pointerCleanup.current = null; };
    pointerCleanup.current?.(); pointerCleanup.current = end;
    window.addEventListener('pointermove', move); window.addEventListener('pointerup', end);
  }
  if (!visible) return null;
  const links = <div className="terminal-links"><a href={profile.github} target="_blank" rel="noreferrer">github ↗</a><a href={profile.linkedin} target="_blank" rel="noreferrer">linkedin ↗</a><a href={`mailto:${profile.email}`}>email ↗</a><a href={resume} download="Jaydeepsinh-Parmar-CV.pdf">resume.pdf ↓</a></div>;
  return <section className="terminal-panel" aria-label="Integrated terminal" style={{ height }}>
    <div className="terminal-resizer" role="separator" aria-label="Resize terminal" aria-orientation="horizontal" aria-valuemin={140} aria-valuemax={Math.floor(window.innerHeight * .65)} aria-valuenow={Math.round(height)} tabIndex={0} onPointerDown={resize} onKeyDown={e => { if (['ArrowUp', 'ArrowDown'].includes(e.key)) { e.preventDefault(); setHeight(h => Math.min(window.innerHeight * .65, Math.max(140, h + (e.key === 'ArrowUp' ? 30 : -30)))); } }}/>
    <div className="terminal-toolbar"><div className="panel-tabs" role="tablist" aria-label="Bottom panel">{['problems', 'output', 'terminal'].map(p => <button key={p} id={`panel-tab-${p}`} role="tab" aria-controls="panel-content" aria-selected={panel === p} className={panel === p ? 'selected' : ''} onClick={() => setPanel(p)}>{p}{p === 'problems' && <span className="count-badge">0</span>}</button>)}</div><div className="terminal-tools"><span><Icon name="terminal" size={14}/> zsh</span><button title="New terminal session" aria-label="New terminal session" onClick={() => { setLines([{ type: 'success', text: 'New session ready. Type help to get started.' }]); setPanel('terminal'); setInput(''); inputRef.current?.focus(); }}><Icon name="plus" size={17}/></button><button title="Clear terminal" aria-label="Clear terminal" onClick={() => setLines([])}><Icon name="trash" size={15}/></button><button title="Maximize or restore terminal" aria-label="Maximize or restore terminal" onClick={() => setHeight(height > 260 ? 190 : window.innerHeight * .55)}><Icon name="chevron" size={15} className={height > 260 ? 'rotate-down' : 'rotate-up'}/></button><button title="Close terminal" aria-label="Close terminal" onClick={() => setVisible(false)}><Icon name="close" size={17}/></button></div></div>
    <div id="panel-content" role="tabpanel" aria-labelledby={`panel-tab-${panel}`} className="terminal-body" ref={output}>
      {panel === 'problems' ? <p className="muted"><Icon name="check" size={14}/> No problems detected in this portfolio workspace.</p> : panel === 'output' ? <div className="terminal-output"><p>[workspace] Portfolio initialized successfully.</p><p>[navigation] {visitCount} file visits this session.</p><p>[contact] Local echo mode. Email opens in your mail application.</p></div> : <><div className="terminal-log" role="log" aria-live="polite" aria-relevant="additions">{lines.map((line, i) => <div className={`terminal-line ${line.type}`} key={i}>
        {line.type === 'command' ? <><span className="green">❯</span> {line.text}</> : line.type === 'links' ? links : line.type === 'help' ? <div className="help-grid">{[['about / experience', 'Meet me and explore my journey'], ['projects / ls projects', 'Explore the project files'], ['open <file> / cat <file>', 'Open a file in the editor'], ['contact / ./contact.sh', 'Start a conversation'], ['whoami / pwd / date', 'A little context'], ['resume / clear / echo <text>', 'Download CV, clear, or echo'], ['↑ ↓ / Tab', 'Command history / autocomplete']].map(([a, b]) => <div key={a}><span>{a}</span><span>{b}</span></div>)}</div> : line.type === 'files' || line.type === 'projects' ? <div className="terminal-file-list">{(line.type === 'projects' ? files.filter(f => projects.some(p => p.id === f.id)) : files).map(file => <button key={file.id} onClick={() => openFile(file.id)}>{file.name}</button>)}</div> : line.type === 'resume' ? <a href={resume} download="Jaydeepsinh-Parmar-CV.pdf">↓ Download Jaydeepsinh-Parmar-CV.pdf</a> : line.type === 'message' ? <><span className="green">✓ Message echoed successfully (local only).</span> <a href={`mailto:${profile.email}?subject=Let%E2%80%99s%20connect&body=${encodeURIComponent(line.text)}`}>Open email to send ↗</a></> : line.text}
      </div>)}</div><form className="terminal-prompt" onSubmit={submit}><label htmlFor="terminal-input"><span className="prompt-user">visitor</span><span className="muted">@</span><span className="purple">jaydeepsinh</span><span className="muted"> ~/portfolio</span><span className="green prompt-chevron">❯</span></label><input id="terminal-input" aria-label={contactMode ? 'Terminal command or message' : 'Terminal command'} ref={inputRef} value={input} onChange={e => { setInput(e.target.value); setHistoryIndex(-1); }} onKeyDown={onKey} placeholder={contactMode ? 'Type your message or a command…' : 'Try “help”'} autoComplete="off" autoCapitalize="off" spellCheck="false"/><button type="submit" className="terminal-enter" aria-label="Run terminal command">↵</button></form></>}
    </div>
  </section>;
}
