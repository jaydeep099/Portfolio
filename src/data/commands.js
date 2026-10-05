import { files } from './portfolio.js';
export const commandList = ['help', 'whoami', 'ls', 'pwd', 'about', 'experience', 'projects', 'contact', 'resume', 'clear', 'date', 'open', 'cat', 'cd', 'echo'];
export function parseCommand(input) {
  const trimmed = input.trim();
  const [command, ...rest] = trimmed.split(/\s+/);
  const argument = rest.join(' ').replace(/^["']|["']$/g, '');
  const aliases = { home: 'welcome', about: 'about', experience: 'experience', projects: 'silal', contact: 'contact', './contact.sh': 'contact', 'contact.sh': 'contact' };
  if (!trimmed) return { type: 'empty' };
  if (aliases[command] && !argument) return { type: 'navigate', id: aliases[command] };
  if (['open', 'cat', 'cd'].includes(command)) {
    const target = argument.replace(/^\.\//, '').replace(/^projects\//, '').replace(/\/$/, '');
    const file = files.find(f => f.id === target || f.name.toLowerCase() === target.toLowerCase() || (f.id === 'welcome' && target === 'welcome.md'));
    if (file) return { type: 'navigate', id: file.id };
    if (target === '..' || target === '~' || target === '') return { type: 'navigate', id: 'welcome' };
    if (target === 'projects') return { type: 'projects' };
    if (target === 'cv.pdf' || target === 'resume.pdf') return { type: 'resume' };
    return { type: 'error', text: `File not found: ${argument}. Type ls to see available files.` };
  }
  if (command === 'echo') return { type: 'echo', text: argument };
  if (command === 'ls' && argument.replace(/\/$/, '') === 'projects') return { type: 'projects' };
  if (['help', 'whoami', 'ls', 'pwd', 'resume', 'clear', 'date'].includes(command)) return { type: command };
  return { type: 'unknown', text: trimmed };
}
