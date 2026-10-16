# Alur Praveen — 3D Cybersecurity Portfolio

React + TypeScript + Three.js portfolio, designed for GitHub Pages. Includes responsive CSS, interactive 3D security core, recruiter view, searchable project filtering, case study modals, cybersecurity-inspired terminal, skills, experience, credentials and contact.

## Run locally

Install Node.js 22+ and run:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. For a verified production build, run `npm run build` followed by `npm run preview`.

## Deploy to GitHub Pages

1. Create a new GitHub repository **Alur-Praveen-3D-Portfolio** and push these files to its `main` branch.
2. In **Settings → Pages → Build and deployment**, select **GitHub Actions**.
3. The included `.github/workflows/deploy.yml` builds and publishes the site.
4. If you choose a different repository name, update `base` in `vite.config.ts` to match its case-sensitive `/repo-name/` path before deploying.

The workflow installs dependencies and builds the published site. Commit `package-lock.json` after your first successful local install for reproducible builds.

## IMPORTANT: Add the real resume

The resume from the prior portfolio conversation is included as **`public/resume.pdf`**. Replace this file whenever you update your resume.

## Edit content

- Personal contact and profile information: `src/data.ts`
- Project descriptions and links: `src/data.ts`
- Experience, awards, certifications: `src/App.tsx`
- Styling: `src/style.css`
- 3D hero animation: `src/CoreScene.tsx`

The visual about card uses an abstract shield because a profile photo was not supplied.

## Honest scope

The 3D scene is a **decorative visualization** of a cybersecurity core; it does not display real traffic. The command terminal is a portfolio navigator and does not execute shell commands. GitHub Pages cannot host a Python backend. No fake contact form or analytics are included. Validate detailed claims for FootprintCheck and StegoVault against their source code before expanding their feature lists.

## Troubleshooting

- Blank GitHub Pages site: check Vite `base`, browser console, and Pages workflow status.
- 3D unavailable: website shows an abstract fallback and all content stays accessible.
- Missing resume: add `public/resume.pdf` and redeploy.
- Contact email: uses the visitor's email application; copying requires a secure context (HTTPS).


## GitHub Pages deployment — portfolioc

This version is configured for `https://pavu1234.github.io/portfolioc/`.
Upload the **contents** of this folder to the `main` branch of `pavu1234/portfolioc` (not an additional nested folder).
The workflow at `.github/workflows/static.yml` installs packages, runs the Vite build and deploys `dist/`.
Repository Settings → Pages → Build and deployment → Source: **GitHub Actions**.
The old `static.yml` must be replaced and any old `deploy.yml` removed to avoid duplicate deployments.
Node 24 actions and the pinned `ubuntu-24.04` image reduce the warning/runner migration messages; upstream Pages actions may still emit their own compatibility notices.
