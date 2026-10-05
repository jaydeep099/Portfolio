/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import { files } from '../data/portfolio';

export default function CommandPalette({ close, openFile, toggleTerminal, toggleSidebar }) {
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);
  const dialog = useRef(null);
  const options = [...files.map(f => ({ ...f, action: () => openFile(f.id) })), { id: 'toggle-terminal', name: 'Toggle terminal', icon: 'terminal', description: 'Show or hide the integrated terminal', action: toggleTerminal }, { id: 'toggle-sidebar', name: 'Toggle explorer', icon: 'sidebar', description: 'Show or hide the file explorer', action: toggleSidebar }].filter(item => `${item.name} ${item.description}`.toLowerCase().includes(query.toLowerCase().replace(/^>\s*/, '')));
  useEffect(() => { const previous = document.activeElement; dialog.current.showModal(); return () => previous?.focus(); }, []);
  useEffect(() => { dialog.current.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' }); }, [index]);
  function choose(item) { if (!item) return; item.action(); close(); }
  return <dialog className="command-dialog" ref={dialog} onCancel={close} onClick={e => { if (e.target === dialog.current) close(); }} onKeyDown={e => { if (e.key === 'ArrowDown') { e.preventDefault(); setIndex(n => Math.min(n + 1, options.length - 1)); } if (e.key === 'ArrowUp') { e.preventDefault(); setIndex(n => Math.max(n - 1, 0)); } if (e.key === 'Enter') { e.preventDefault(); choose(options[index]); } }} aria-label="Command palette"><div className="palette-search"><Icon name="search"/><input aria-label="Search files and commands" role="combobox" aria-expanded="true" aria-controls="palette-options" aria-activedescendant={options[index] ? `option-${options[index].id}` : undefined} autoFocus placeholder="Go to a file or run a command…" value={query} onChange={e => { setQuery(e.target.value); setIndex(0); }}/><button onClick={close} aria-label="Close command palette"><kbd>esc</kbd></button></div><p className="palette-label">FILES & COMMANDS</p><div id="palette-options" role="listbox" className="palette-options">{options.length ? options.map((option, i) => <button id={`option-${option.id}`} role="option" aria-selected={index === i} tabIndex={-1} key={option.id} onMouseMove={() => setIndex(i)} onClick={() => choose(option)}><Icon name={option.icon}/><span><strong>{option.name}</strong><small>{option.description}</small></span>{index === i && <span className="palette-enter">↵</span>}</button>) : <p className="palette-empty">No matching files. Try “about” or “terminal”.</p>}</div><footer><span><kbd>↑</kbd><kbd>↓</kbd> to navigate</span><span><kbd>↵</kbd> to open</span><span><kbd>esc</kbd> to close</span></footer></dialog>;
}
