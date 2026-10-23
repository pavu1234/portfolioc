# Alur Praveen — Cybersecurity Portfolio (corrected hero)

This release corrects the screenshot problem in V5: tiny text embedded in 3D screens and very large empty black frames. The new design intentionally renders real 3D animated cybersecurity geometry **behind** readable native HTML content.

## Changes
- Rebuilt hero with large readable `DETECT. ANALYZE. DEFEND.` typography.
- Replaced abstract globe with animated 3D network endpoints (SOC, IDS, firewall, DNS, web, cloud and endpoint).
- Moving packet markers and highlighted investigation paths.
- Modern readable UI, project filters, case studies, terminal, contact and recruiter view.
- Updated 4-project resume in `public/resume.pdf`.
- GitHub Pages deployment base `/portfolioc/` and workflow included.

## Setup
Run `npm install`, then `npm run dev`. Build using `npm run build`.

## GitHub Pages
Upload the **contents** of this ZIP to the repository root `pavu1234/portfolioc` (do not nest them in another folder). Keep only one deployment workflow under `.github/workflows/`. In Settings > Pages, select GitHub Actions.

## Technical note
This is a true animated WebGL scene paired with semantic HTML. Placing paragraphs and links as tiny textures on a distant 3D plane caused the unreadable layout in V5; the correction keeps actual 3D geometry without sacrificing essential portfolio content.

Note: Dependency installation could not complete in this environment; run a build before claiming live deployment success.
