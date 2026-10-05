export const profile = {
  name: 'Jaydeepsinh Parmar',
  title: 'Software Engineer & Technical Consultant',
  email: 'parmarjaydeepsinh099@gmail.com',
  github: 'https://github.com/jaydeep099',
  linkedin: 'https://www.linkedin.com/in/jaydeepsinh-parmar-084609247/',
  location: 'Ahmedabad, India',
};

// Employment dates follow the LinkedIn timeline confirmed by the portfolio owner.
// Project scope and outcomes are sourced from src/assets/cv.pdf.
export const experience = [
  { company: 'Innovage Cloud', role: 'Associate Technical Consultant', date: 'Jan 2026 — Present', current: true, detail: 'Designing and supporting Oracle Cloud integrations and VBCS applications across Finance, SCM and WMS. Translating business requirements into technical designs, APIs and reliable production workflows.', tags: ['Oracle Integration Cloud', 'VBCS', 'SQL / PL/SQL', 'Oracle Fusion'] },
  { company: 'Innovage Cloud', role: 'Technical Consultant Intern', date: 'Oct 2025 — Dec 2025', tags: ['Technical consulting', 'Oracle Cloud'] },
  { company: 'Techify Solutions Pvt Ltd', role: 'Full Stack Developer Intern', date: 'Aug 2025 — Sep 2025', tags: ['Full stack development'] },
  { company: 'CyberSec Consultants', role: 'Full Stack Developer Intern', date: 'Jun 2025 — Jul 2025', tags: ['Full stack development'] },
  { company: 'Radixweb', role: 'Software Engineering Trainee', date: 'Jan 2025 — Apr 2025', tags: ['Software engineering'] },
];

export const projects = [
  {
    id: 'silal', file: 'silal-scm.json', name: 'Connected supply chains.', client: 'SILAL', category: 'Enterprise integration', icon: 'layers',
    summary: 'Connecting Oracle Fusion, warehouse operations and the systems in between.',
    config: {
      project: 'SILAL — SCM & WMS integrations',
      client_challenge: 'Synchronize master data and transactions between Oracle Fusion SCM, WMS and external enterprise systems.',
      role: 'Oracle Cloud Technical Consultant',
      tech_stack: ['Oracle Integration Cloud', 'Oracle Fusion SCM', 'WMS', 'Oracle ATP / OCI', 'REST', 'SOAP', 'SQL', 'PL/SQL'],
      implementation: ['Item, inventory, purchase order and sales order interfaces', 'Shipment, receiving and inventory movement synchronization', 'Mappings, lookups, secure authentication and exception notifications'],
      metrics: { process_coverage: ['Inventory', 'Purchasing', 'Order Management', 'Shipping', 'Receiving', 'Warehouse operations'], outcome: 'Reliable master-data and transaction synchronization across SCM and warehouse applications.' },
      delivery: ['Technical design', 'SIT / UAT', 'Go-live', 'Production stabilization'],
    },
  },
  {
    id: 'oes', file: 'oes-finance.json', name: 'Less manual. More reliable.', client: 'OES', category: 'Finance automation', icon: 'bolt',
    summary: 'Turning bank transactions and daily ticket data into automated finance workflows.',
    config: {
      project: 'OES — Finance automation',
      client_challenge: 'Reduce manual effort in receipt classification, revenue allocation, invoice creation and General Ledger processing.',
      role: 'Oracle Cloud Technical Consultant',
      tech_stack: ['VBCS', 'OIC', 'Oracle ERP Cloud Financials', 'Oracle ATP', 'ORDS', 'REST', 'SOAP', 'FBDI', 'SFTP', 'SQL / PL/SQL'],
      implementation: ['Bank narration analysis and customer receipt classification', 'Daily ticket ingestion and revenue allocation', 'SOAP receipt creation, FBDI journals and invoices, REST credit invoices'],
      metrics: { workflows: ['Customer receipts', 'Finance automation'], outcome: 'Automated Oracle ERP financial transactions and reduced manual accounting effort.' },
      delivery: ['Requirements', 'Validation', 'UAT', 'Deployment', 'Post-production support'],
    },
  },
  {
    id: 'reconciliation', file: 'reconciliation.json', name: 'Every transaction, accounted for.', client: 'OES', category: 'Data & reconciliation', icon: 'database',
    summary: 'A clearer view of revenue, settlements and bank data across 10+ attractions.',
    config: {
      project: 'OES — Revenue reconciliation',
      client_challenge: 'Consolidate operational reports, settlements and bank data to identify revenue variances across attractions.',
      role: 'Oracle Cloud Technical Consultant',
      tech_stack: ['PL/SQL', 'OIC', 'VBCS', 'Oracle ATP', 'ORDS', 'REST', 'File-based integrations'],
      implementation: ['Revenue consolidation, validation and matching in PL/SQL', 'Adaptive VBCS columns and advanced filters', 'File-based OIC flows and ORDS data services'],
      metrics: { attractions_supported: '10+', outcome: 'Accurate revenue matching and variance identification across operational reports, settlements and bank data.' },
      delivery: ['Unit testing', 'SIT / UAT', 'Deployment', 'Production stabilization'],
    },
  },
];

export const files = [
  { id: 'welcome', name: 'Welcome', icon: 'logo', description: 'Start here · the person behind the code' },
  { id: 'about', name: 'about.md', icon: 'markdown', description: 'About me, my approach and core stack' },
  { id: 'experience', name: 'experience.md', icon: 'markdown', description: 'My journey in engineering and consulting' },
  ...projects.map(p => ({ id: p.id, name: p.file, icon: 'json', description: `${p.client} · ${p.category}` })),
  { id: 'contact', name: 'contact.sh', icon: 'terminal', description: 'Say hello · open a conversation' },
];
