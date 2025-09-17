### [Live Site](https://geroldladrera.github.io/frontend-portfolio-demo/)

<a href="https://ibb.co/Xx3QHvF1"><img src="https://i.ibb.co/5hn0Zfsm/Screenshot-2025-09-15-at-4-13-25-PM.png" alt="Screenshot-2025-09-15-at-4-13-25-PM" border="0"></a>

# Frontend Portfolio Project: Semantic, Responsive, Accessible

Key Features

1. Responsive Design – Mobile-first, optimized for different screen sizes.
2. Accessibility – Semantic HTML, keyboard navigation, ARIA roles, prefers-reduced-motion.
3. Reusable Components – Consistent, scalable card layout system.
4. Performance – Built with Vite for fast development and optimized production builds.
5. Interactivity – Scroll animations, hover states, and accessible modal implementation.
6. Maintainable Styles – SCSS with variables, mixins, and utility classes for consistency.

Two responsive components built from the provided design:

1. **What Does Cooking Mean?** — image mosaic + copy with CTA
2. **Taste the Colours** — three colour tiles whose images open in a modal

Live logging of all anchor clicks, subtle animations, and a small build step.

---

## Tech choices & reasoning

- **Vite + Vanilla JS + SCSS**: extremely fast DX, tiny config, tree‑shakes and minifies for production. No runtime framework is needed.
- **SCSS**: variables/mixins and nested rules to keep the CSS maintainable. Output is auto‑prefixed via PostCSS.
- **Semantic HTML**: sections, headings, figures, figcaptions, alt text, `aria-*` where relevant.
- **Accessibility**: skip link, reduced‑motion check, keyboard‑dismissible modal, focus restoration, labelled dialog.
- **CMS‑friendly**: no fixed text heights; grid/flex layouts grow and wrap with arbitrary copy lengths; all images use `object-fit`.
- **Interactivity**: hover elevation, underline animation on CTA, scroll‑reveal, and a lightweight accessible modal.
- **Logging requirement**: a single event‑delegated listener captures _all_ `<a>` clicks and `console.log`s the element.

---

## Project structure

```
frontend-portfolio-demo/
├── index.html
├── package.json
├── postcss.config.js
├── vite.config.js
├── .gitignore
├── src/
│   ├── main.js
│   ├── styles.scss
│   └── assets/
│       ├── placeholder.png
│       └── README.txt   # names for dropping Zeplin exports
└── README.md
```

---

## Running locally

```bash
# 1) Install deps
npm i

# 2) Start dev server (Chrome/Firefox/Edge latest)
npm run dev
```

Open the printed local URL. Code changes hot‑reload.

### Build for production

```bash
npm run build
npm run preview   # to test the built /dist locally
```

---

## Implementation notes that map to the brief

- **Modern HTML5**: Semantic landmarks, headings, figures, and ARIA on the modal dialog.
- **Anchor click capture**: `document.addEventListener('click', {capture:true})` logs the actual element clicked or its closest `<a>`.
- **Animations**: subtle elevation + underline hover; items scroll‑reveal using `IntersectionObserver`, disabled for users who prefer reduced motion.
- **Responsive**: mobile‑first CSS grid; works from 320px up. Add proper meta viewport in `<head>`.
- **Cooking section anchors**: all three mosaic images **and** the CTA are anchors, as requested.
- **Taste section modal**: Each image is inside an anchor. Click opens an accessible modal with caption; `Esc`, close button, and backdrop click all close it.
- **Copy lengths vary**: nothing relies on fixed heights; long text wraps; tiles grow; grid reflows at 900px and 520px breakpoints.
- **Build step**: Vite + PostCSS (autoprefixer) + Sass are included in `devDependencies` and used by scripts.

---

## Notes

- The layout aims to be true to the attached design while being resilient to CMS changes.
- I avoided hard‑coding text lengths and kept imagery aspect ratios flexible.
- The modal is deliberately framework‑free and keyboard accessible.
- Tested in latest Chrome/Firefox/Edge. Auto‑prefixer covers vendor differences where needed.
