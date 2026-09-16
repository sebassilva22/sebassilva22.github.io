import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const routePages = [
  { path: 'privacy', title: 'Privacy Policy | Silva Tech Video Factory', description: 'How Silva Tech Video Factory handles information when you use the service.' },
  { path: 'terms', title: 'Terms of Service | Silva Tech Video Factory', description: 'Terms governing the use of Silva Tech Video Factory.' },
  { path: 'video-factory', title: 'Silva Tech Video Factory | AI Video Workflow', description: 'Prepare AI-assisted short-form marketing videos, review them, and send them to your authorized TikTok account.' },
  { path: 'projects/aidtrack', title: 'AidTrack | Juan Sebastian Silva Rojas', description: 'Humanitarian aid management and traceability platform.' },
  { path: 'projects/local-ai-coding-agent', title: 'Local AI Coding Agent | Juan Sebastian Silva Rojas', description: 'AI coding agent powered by local LLMs for repository analysis and code assistance.' },
  { path: 'projects/ai-software-assistant', title: 'AI Software Assistant | Juan Sebastian Silva Rojas', description: 'Assistant that answers questions about documentation and codebases.' }
];

function cleanRoutePages() {
  return {
    name: 'clean-route-pages',
    closeBundle() {
      const outputDir = resolve('dist');
      const baseHtml = readFileSync(resolve(outputDir, 'index.html'), 'utf8');

      for (const page of routePages) {
        const canonicalUrl = `https://sebassilva22.github.io/${page.path}`;
        const html = baseHtml
          .replace(/<title>[^<]*<\/title>/, `<title>${page.title}</title>`)
          .replace(/(<meta\s+name="description"\s+content=")[^"]*("\s*\/?>)/, `$1${page.description}$2`)
          .replace(/(<meta\s+property="og:title"\s+content=")[^"]*("\s*\/?>)/, `$1${page.title}$2`)
          .replace(/(<meta\s+property="og:description"\s+content=")[^"]*("\s*\/?>)/, `$1${page.description}$2`)
          .replace(/(<meta\s+property="og:url"\s+content=")[^"]*("\s*\/?>)/, `$1${canonicalUrl}$2`)
          .replace(/(<meta\s+name="twitter:title"\s+content=")[^"]*("\s*\/?>)/, `$1${page.title}$2`)
          .replace(/(<meta\s+name="twitter:description"\s+content=")[^"]*("\s*\/?>)/, `$1${page.description}$2`)
          .replace(/(<link\s+rel="canonical"\s+href=")[^"]*("\s*\/?>)/, `$1${canonicalUrl}$2`);
        const routeFile = resolve(outputDir, page.path, 'index.html');
        mkdirSync(dirname(routeFile), { recursive: true });
        writeFileSync(routeFile, html);
      }
    }
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', 'VITE_');
  return {
    plugins: [react(), cleanRoutePages()],
    base: env.VITE_BASE_PATH || '/'
  };
});
