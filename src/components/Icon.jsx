/* eslint-disable react/prop-types */
const paths = {
  logo: <><path d="m15 3 6 2v14l-6 2L6 13l-3 3-2-2 5-5 9-6Z"/><path d="m15 3-9 6 9 7V3Z"/></>,
  files: <><rect x="7" y="7" width="13" height="15" rx="1"/><path d="M15 7V2H2v15h5"/></>,
  search: <><circle cx="10.5" cy="10.5" r="7"/><path d="m16 16 5 5"/></>,
  branch: <><circle cx="6" cy="4" r="2"/><circle cx="6" cy="20" r="2"/><circle cx="18" cy="6" r="2"/><path d="M6 6v12m0-5c8 0 12-1 12-5"/></>,
  terminal: <><path d="m4 6 6 6-6 6m9 0h7"/></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/></>,
  settings: <><path d="m9 3-1 3-3 1-2 4 2 3 1 4 4 2 3-1 4-1 2-4-1-3-1-4-4-2-4 1Z"/><circle cx="11" cy="12" r="3"/></>,
  user: <><circle cx="12" cy="8" r="4"/><path d="M4 22v-3a8 8 0 0 1 16 0v3"/></>,
  arrow: <path d="M4 12h16m-6-6 6 6-6 6"/>,
  external: <><path d="M14 3h7v7m0-7L10 14m0-10H4a1 1 0 0 0-1 1v15a1 1 0 0 0 1 1h15a1 1 0 0 0 1-1v-6"/></>,
  chevron: <path d="m9 5 7 7-7 7"/>,
  close: <path d="m6 6 12 12M6 18 18 6"/>,
  check: <path d="m4 12 5 5L20 6"/>,
  circle: <circle cx="12" cy="12" r="8"/>,
  download: <><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/></>,
  folder: <path d="M3 6V4h7l2 3h9v13H3V6Z"/>,
  layers: <><path d="m12 3 10 5-10 5L2 8l10-5Zm-10 9 10 5 10-5M2 16l10 5 10-5"/></>,
  bolt: <path d="m14 2-10 12h7l-1 8 10-12h-7l1-8Z"/>,
  database: <><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0"/></>,
  github: <><path d="M9 21c-5 1-5-3-7-3m14 4v-4c0-1-.2-2-1-2 4 0 7-2 7-6 0-2-1-3-2-4 0-2 0-3-1-4-2 0-3 1-4 2-2-1-4-1-6 0C8 3 7 2 5 2c-1 1-1 2-1 4-1 1-2 2-2 4 0 4 3 6 7 6-1 0-1 1-1 2v4"/></>,
  linkedin: <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 10v7m0-11v1m5 10v-7m0 3c0-4 5-4 5 0v4"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  pin: <><path d="M19 9c0 5-7 12-7 12S5 14 5 9a7 7 0 0 1 14 0Z"/><circle cx="12" cy="9" r="2"/></>,
  plus: <path d="M12 4v16M4 12h16"/>,
  trash: <><path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7"/></>,
  panel: <><rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 15h18"/></>,
  sidebar: <><rect x="3" y="3" width="18" height="18" rx="1"/><path d="M9 3v18"/></>,
  bell: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></>,
  sync: <><path d="M3 10a9 9 0 0 1 15-6l3 3m0-5v5h-5M21 14a9 9 0 0 1-15 6l-3-3m0 5v-5h5"/></>,
  code: <><path d="m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18"/></>,
};
export default function Icon({ name, size = 18, className = '' }) {
  if (name === 'json' || name === 'markdown') return <span aria-hidden="true" className={`file-symbol ${name} ${className}`}>{name === 'json' ? '{ }' : 'M↓'}</span>;
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>{paths[name] || paths.code}</svg>;
}
