# CYBERVERSE V2 — Hybrid Cinematic 3D Cybersecurity Portfolio

A six-station, interactive 3D command center featuring a cinematic opening, animated network lab, project vault, career archive, contact uplink, **and a working simulated terminal station**. A lightweight Recruiter View is also included.

## Features
- Cinematic opening (skip immediately) and 3D station-to-station camera transitions
- Six clickable stations with top navigation, bottom waypoint buttons, and keyboard shortcuts
- Functional project demo/source links, contact email, LinkedIn, GitHub and downloadable **photo-free** resume
- Terminal with `help`, `about`, `skills`, `projects`, `experience`, `education`, `certifications`, `contact`, `github`, `linkedin`, `resume`, `clear`; arrow-key history, Tab autocomplete, buttons and keyboard support
- Responsive desktop, tablet and mobile navigation and content alignment; reduced-motion CSS
- Recruiter View with projects, work experience, resume and the terminal
- Simulation only; no real scanning, exploitation, or device access

## Run
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Deploy to GitHub Pages
Upload the **contents** of this folder (not its enclosing folder) to `pavu1234/portfolioc` on `main`. GitHub Actions builds the project and deploys `dist/`. Vite is configured with `base: '/portfolioc/'`.

## QA checklist
- Verify the GitHub Actions build succeeds; check both desktop and mobile views
- Navigate all six stations and check Previous/Next at both ends
- Enter `help`, `projects`, `resume`, and `clear` in Terminal
- Test all four projects' Live Demo and Source links
- Test the updated resume at `/portfolioc/resume.pdf`
- Check mobile header, terminal form, recruiter view, and the contact controls

> Local production build was not available in the authoring environment because npm registry DNS returned `EAI_AGAIN`; GitHub Actions is the build verification step. The 3D environment is a 9D-style immersive effect, not literal nine-dimensional technology.


## V3 — Destination-first interactions

- Navigating to a room reveals the animated 3D destination before any detailed content.
- The **View Station** button unlocks after a short camera travel transition.
- Click **View Station** to open the content for that destination; click **X**, outside the panel, or press **Escape** to close it.
- Moving to another room always closes the previous room's information.
- The terminal opens only after arriving at its room and selecting **View Station**.
- Recruiter View remains available as a direct-access accessibility alternative.
