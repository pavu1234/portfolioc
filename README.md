# Praveen's Hacker Room

Original interactive 3D hacker-room portfolio, inspired by the exploratory 3D-room concept of mbilalkhan.com. All room geometry is generated at runtime with Three.js (no copied proprietary room models or source).

## Features
- One explorable 3D room with animated RGB lighting, three working monitors, desk, laptop, workstation, shelves, books, plants, chair, PC tower, wall board, and decorative equipment.
- Click **monitors** for Projects, **laptop** for Terminal, **wall board** for About, **cabinet** for Experience, **file drawer** for Resume, **door** for Contact.
- Hover outlines and object tooltips. Camera orbit via drag; zoom with wheel; camera guided focus via object clicks; reset view button.
- Working terminal commands; mobile-friendly panels; performance settings and reduced motion support.
- Includes photo-free `public/resume.pdf` and GitHub Pages workflow for `/portfolioc/`.

## Run
```bash
npm install
npm run dev
npm run build
```

## Important deployment step
Replace all files in `pavu1234/portfolioc`, removing old `src/World.tsx`, TypeScript files, and previous workflows. Set GitHub Pages Source to **GitHub Actions**. Upload files from this folder's root, not the enclosing folder.
