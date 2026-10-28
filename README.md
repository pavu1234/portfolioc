# Alur Praveen — Cinematic Cybersecurity Portfolio (Chapter Edition)

This is an original cybersecurity-themed redesign inspired by the user's request for an immersive experience comparable in feel to `28october2026.com`.

**Reference limitation:** The reference website could not be accessed from this environment. Its exact visuals and interactions were not inspected, so this project is an original interpretation, not a pixel-faithful reproduction.

## What's new
- Bold editorial hero: “THINK LIKE AN ANALYST.”
- Animated WebGL cybersecurity server-room background and floating 3D network topology.
- Immersive chapter-like sections with a signal-green visual identity.
- More descriptive project introductions and case studies, working external links and filters.
- Accessible recruiter mode, terminal, responsive navigation.
- Updated photo-free resume at `public/resume.pdf`.
- GitHub Pages base path `/portfolioc/` and Actions workflow.

## Run
`npm install && npm run dev`

## Build
`npm run build`

## Deploy
Upload the **contents of this folder** to the root of `pavu1234/portfolioc`, commit to `main`, and ensure Settings → Pages → Build and deployment uses GitHub Actions. The included workflow builds `dist/` and deploys it.

## Verification
Package structure and resume inclusion checked. Production build has **not** been run successfully in this environment, because `npm install` could not resolve registry.npmjs.org. The GitHub Actions workflow should be checked after upload.

All apparent threat traffic is simulated for presentation and does not reflect visitors or real-time incidents.
