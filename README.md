# Juan Sebastian Silva Rojas Portfolio

Portfolio profesional bilingüe para mostrar perfil técnico, proyectos, laboratorios de arquitectura e iniciativas de IA.

## Stack

- React
- TypeScript
- Vite

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Project structure

- `src/data/profile.ts`: datos personales que debes completar
- `src/data/projects.ts`: proyectos destacados y laboratorio de IA
- `src/data/experience.ts`: timeline profesional
- `src/i18n/translations.ts`: textos EN / ES
- `src/App.tsx`: estructura principal
- `src/App.tsx`: páginas públicas de Silva Tech Video Factory (`/video-factory`, `/terms`, `/privacy`); edita aquí el contenido del producto y las políticas

## How translations work

The language is detected from the browser on first visit and persisted in `localStorage`.
The selector toggles all visible UI text between English and Spanish.

## Adding a project

Edit `src/data/projects.ts` and add a new entry with the required metadata. The UI renders cards and project detail pages from that central file.

## GitHub Pages

The app is configured for static hosting and includes a `404.html` fallback for internal routes.

Deployment flow:

`push` -> `GitHub Actions` -> `Vite build` -> `GitHub Pages`

This repository is prepared as a user site for:

`https://sebassilva22.github.io/`

Public product and policy pages:

- `https://sebassilva22.github.io/video-factory`
- `https://sebassilva22.github.io/privacy`
- `https://sebassilva22.github.io/terms`

The page content lives in `src/App.tsx`. Update the policy text there when the service or its data practices change. `vite.config.ts` reads `VITE_BASE_PATH`; the Pages workflow supplies the base path reported by GitHub Pages during deployment. Internal page links and canonical URLs use that configured path. The existing `public/404.html` fallback lets GitHub Pages serve direct visits to client-side routes.

GitHub Pages serves the generated `dist/` folder after each successful workflow run.

## Data to complete

- GitHub username
- LinkedIn URL
- Email
- Resume link
- Optional project URLs
