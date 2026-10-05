# Jaydeepsinh Parmar — interactive IDE portfolio

A responsive React / Vite portfolio presented as a dark code-editor workspace.

## Run locally

```sh
npm install
npm run dev
npm run build
npm test
```

On Windows PowerShell, use `npm.cmd` if local script execution is disabled.

## Explore

- Open and close files using the explorer or editor tabs.
- Use the search button or Ctrl/Cmd + K for the command palette.
- Toggle the terminal using Ctrl/Cmd + backtick or the panel button.
- Try `help`, `ls`, `about`, `experience`, `projects`, `cat projects/silal-scm.json`, `contact`, or `resume`.
- Arrow keys recall terminal commands; Tab completes commands and file paths.
- Drag the terminal divider, or focus it and use the arrow keys, to resize the panel.
- On mobile, open the file explorer from the activity bar. Escape dismisses the drawer.

## Content

Profile, employment and project content live in `src/data/portfolio.js`.
The three case studies are derived from `src/assets/cv.pdf`: SILAL SCM/WMS integrations, OES finance automation and OES revenue reconciliation.

Employment dates follow the LinkedIn timeline confirmed by the owner: Radixweb (Jan–Apr 2025), CyberSec Consultants (Jun–Jul 2025), Techify Solutions (Aug–Sep 2025), Innovage internship (Oct–Dec 2025) and Associate Technical Consultant at Innovage (Jan 2026–present). This differs from the consolidated Jan 2025–present Innovage entry in the original CV. The downloadable PDF remains the supplied original.

## Contact behavior

The integrated terminal is a simulated shell and does not execute system commands. In contact mode, messages are echoed locally, followed by an explicit confirmation and a mailto link containing the message. Visitors complete sending in their email application. No message is silently sent, stored remotely or claimed delivered. Git branch indicators are also simulated; the displayed IST clock is live.

## Validation and hosting

`npm test` covers terminal file resolution, commands, path handling, unsupported commands and message content. The new interface passes scoped ESLint checks and the Vite production build. Browser interaction and visual testing have not been performed in this environment.

The Sites manifest is `.openai/hosting.json`; the static deployment output is `dist`. Existing legacy sections remain in the source tree but are no longer imported by the app.
