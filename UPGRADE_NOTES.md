# 3D Portfolio V2 — visual upgrade

This version increases 3D depth and visual motion while retaining functional sections, project information, contact links, and recruiter view.

## Upgrades
- True WebGL layered security core with nested shells, animated orbits, tracked satellites, interconnected network nodes, data particles, sparkles, and richer colored lighting.
- Mouse-reactive and continuously animated 3D motion.
- Project tiles now have multi-layer scanning backgrounds, orbiting visual rings, floating symbols, and 3D hover depth.
- Dynamic holographic glow, animated ambiance, scroll position beam, and enhanced hover transitions.
- Updated four-project `public/resume.pdf` (replaces the old resume).
- Added missing Vite environment types for TypeScript.

## GitHub Pages installation
Upload all extracted files to the ROOT of `pavu1234/portfolioc` keeping folders intact. Do not upload the enclosing folder itself. Existing `.github/workflows/static.yml` builds the site and deploys `dist/`. Repository Pages source must be set to GitHub Actions.

## Motion and performance
Animations are simplified on smaller screens, and reduced-motion settings suppress decorative CSS animation. The site requires WebGL for its full hero model, but retains a fallback for WebGL errors and a light recruiter mode.
