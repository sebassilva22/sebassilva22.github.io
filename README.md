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

## How translations work

The language is detected from the browser on first visit and persisted in `localStorage`.
The selector toggles all visible UI text between English and Spanish.

## Adding a project

Edit `src/data/projects.ts` and add a new entry with the required metadata. The UI renders cards and project detail pages from that central file.

## GitHub Pages

The app is configured for static hosting and includes a `404.html` fallback for internal routes.
If you deploy to a project repository, ensure GitHub Pages serves the built `dist/` folder.

## Data to complete

- GitHub username
- LinkedIn URL
- Email
- Resume link
- Optional project URLs

