import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from 'react';
import { profile } from './data/profile';
import { projects } from './data/projects';
import { skillGroups } from './data/skills';
import { experience } from './data/experience';
import { architectures } from './data/architecture';
import { aiExperiments } from './data/aiLab';
import { codeSnippets } from './data/codeSnippets';
import { fallbackRepositories } from './data/repositories';
import { translations } from './i18n/translations';
import { useLocale } from './hooks/useLocale';
import { useGithubRepositories } from './hooks/useGithubRepositories';
import type { Architecture, CodeSnippet, Locale, Project, Repository } from './types';

const routeFromLocation = () => {
  const path = window.location.pathname.replace(/\/+$/, '');
  return new URLSearchParams(window.location.search).get('p') || path || '/';
};

function App() {
  const { locale, setLocale } = useLocale();
  const t = translations[locale];
  const [route, setRoute] = useState(routeFromLocation());
  const [commandOpen, setCommandOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const featured = useMemo(() => projects.filter((project) => project.featured), []);
  const currentProject = projects.find((project) => `/projects/${project.id}` === route);

  useEffect(() => {
    const onPop = () => setRoute(window.location.pathname || '/');
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    document.title = `${profile.name} | ${locale === 'en' ? 'Senior Backend Engineer' : 'Ingeniero Backend Senior'}`;
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setCommandOpen((open) => !open);
      }
      if (event.key === 'Escape') {
        setCommandOpen(false);
        setAssistantOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  if (currentProject) return <ProjectPage locale={locale} setLocale={setLocale} project={currentProject} />;
  return <HomePage locale={locale} setLocale={setLocale} t={t} featured={featured} isCommandOpen={commandOpen} setCommandOpen={setCommandOpen} isAssistantOpen={assistantOpen} setAssistantOpen={setAssistantOpen} />;
}

type Translations = (typeof translations)['en'];
type SetLocale = Dispatch<SetStateAction<Locale>>;
type Callback<T> = Dispatch<SetStateAction<T>>;

function HomePage({ locale, setLocale, t, featured, isCommandOpen, setCommandOpen, isAssistantOpen, setAssistantOpen }: { locale: Locale; setLocale: SetLocale; t: Translations; featured: Project[]; isCommandOpen: boolean; setCommandOpen: Callback<boolean>; isAssistantOpen: boolean; setAssistantOpen: Callback<boolean> }) {
  const github = useGithubRepositories(fallbackRepositories);
  const [activeArchitecture, setActiveArchitecture] = useState(architectures[0]);
  const [activeSnippet, setActiveSnippet] = useState<CodeSnippet>(codeSnippets[0]);
  const [activeTech, setActiveTech] = useState('Spring Boot');

  const handleNavigate: Callback<string> = (target) => {
    if (typeof target !== 'string') return;
    setCommandOpen(false);
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app-shell">
      <Header locale={locale} setLocale={setLocale} onCommand={() => setCommandOpen(true)} t={t} />
      <main>
        <Hero locale={locale} t={t} onAssistant={() => setAssistantOpen(true)} />
        <Dashboard t={t} />
        <WorkSection locale={locale} t={t} featured={featured} repositories={github.repositories} githubLoading={github.loading} githubError={github.error} />
        <CodeLab t={t} activeSnippet={activeSnippet} setActiveSnippet={setActiveSnippet} />
        <ArchitectureLab locale={locale} t={t} active={activeArchitecture} setActive={setActiveArchitecture} />
        <AILab locale={locale} t={t} />
        <TechStack locale={locale} t={t} activeTech={activeTech} setActiveTech={setActiveTech} />
        <Experience locale={locale} t={t} />
        <Contact locale={locale} t={t} onAssistant={() => setAssistantOpen(true)} />
      </main>
      <Footer t={t} />
      <CommandPalette t={t} open={isCommandOpen} onClose={() => setCommandOpen(false)} onNavigate={handleNavigate} />
      <Assistant locale={locale} t={t} open={isAssistantOpen} onClose={() => setAssistantOpen(false)} />
    </div>
  );
}

function Header({ locale, setLocale, onCommand, t }: { locale: Locale; setLocale: SetLocale; onCommand: () => void; t: Translations }) {
  return <header className="site-header"><a className="monogram" href="#top" aria-label="Juan Sebastian Silva Rojas home"><span>JS</span><i>_</i></a><nav className="site-nav" aria-label="Primary navigation"><a href="#work">{t.nav.work}</a><a href="#code">{t.nav.code}</a><a href="#architecture">{t.nav.architecture}</a><a href="#ai">{t.nav.ai}</a><a href="#experience">{t.nav.experience}</a></nav><div className="header-actions"><a className="header-github" href={profile.github} target="_blank" rel="noreferrer" aria-label="Open GitHub profile">GH <ArrowUpRight /></a><button className="locale-switch" onClick={() => setLocale(locale === 'en' ? 'es' : 'en')} aria-label="Change language">{locale.toUpperCase()} <span>/</span> {locale === 'en' ? 'ES' : 'EN'}</button><button className="command-trigger" onClick={onCommand} aria-label={t.common.command}><span className="command-key">⌘</span><span className="command-label">K</span></button></div></header>;
}

function Hero({ locale, t, onAssistant }: { locale: Locale; t: Translations; onAssistant: () => void }) {
  return <section className="hero section-frame" id="top"><div className="hero-content"><div className="eyebrow"><span className="pulse-dot" />{t.hero.available}</div><p className="hero-index">01 / ENGINEERING PORTFOLIO</p><h1>Juan Sebastian<br /><span>Silva Rojas</span></h1><p className="hero-role">{locale === 'en' ? 'Senior Backend Engineer' : 'Ingeniero Backend Senior'} <span>·</span> {locale === 'en' ? 'Software Architecture' : 'Arquitectura de Software'}</p><p className="hero-title">{t.hero.title}</p><p className="hero-copy">{t.hero.copy}</p><div className="hero-actions"><a className="button button-primary" href="#work">{t.hero.explore} <ArrowRight /></a><a className="text-link" href={profile.github} target="_blank" rel="noreferrer">{t.hero.github} <ArrowUpRight /></a><a className="text-link" href={profile.linkedin} target="_blank" rel="noreferrer">{t.hero.linkedin} <ArrowUpRight /></a></div><button className="assistant-launch" onClick={onAssistant}><span className="assistant-orb">✦</span><span><small>{t.assistant.label}</small><strong>{t.assistant.examples[0]}</strong></span><span className="assistant-arrow">↗</span></button></div><ArchitectureVisual /></section>;
}

function ArchitectureVisual() {
  return <div className="hero-architecture" aria-label="Animated distributed system architecture visualization"><div className="visual-topline"><span>LIVE / SYSTEM MAP</span><span className="live-state"><i /> HEALTHY</span></div><div className="architecture-map"><div className="map-node node-client">CLIENTS<span>web · mobile · services</span></div><div className="map-line vertical"><i /></div><div className="map-node node-gateway">API GATEWAY<span>auth · routing · limits</span></div><div className="map-line vertical"><i /></div><div className="map-branch"><div className="map-line branch-left"><i /></div><div className="map-line branch-mid"><i /></div><div className="map-line branch-right"><i /></div></div><div className="map-services"><div className="map-node node-service"><b>01</b>SERVICES<span>domain logic</span></div><div className="map-node node-service"><b>02</b>EVENTS<span>Kafka · SQS</span></div><div className="map-node node-service accent-node"><b>03</b>AI LAYER<span>agents · RAG</span></div></div><div className="map-branch lower"><div className="map-line branch-left"><i /></div><div className="map-line branch-mid"><i /></div><div className="map-line branch-right"><i /></div></div><div className="map-foot"><div className="map-node small-node">DATABASE<span>Postgres</span></div><div className="map-node small-node">WORKERS<span>async jobs</span></div><div className="map-node small-node">OBSERVABILITY<span>traces</span></div></div></div><div className="visual-footer"><span><b>6</b> nodes active</span><span>event flow <i className="signal" /></span></div></div>;
}

function Dashboard({ t }: { t: Translations }) {
  const items = [['10+', t.dashboard.years], ['Backend', t.dashboard.core], ['Cloud', t.dashboard.cloud], ['AI', t.dashboard.current], ['Open source', t.dashboard.source]];
  return <section className="dashboard section-frame" aria-label="Engineering dashboard">{items.map(([value, label], index) => <div className="dashboard-item" key={label}><span className="dashboard-index">0{index + 1}</span><strong>{value}</strong><small>{label}</small></div>)}</section>;
}

function WorkSection({ locale, t, featured, repositories, githubLoading, githubError }: { locale: Locale; t: Translations; featured: Project[]; repositories: Repository[]; githubLoading: boolean; githubError: boolean }) {
  const featuredNames = new Set(featured.map((project) => project.name.toLowerCase()));
  const otherRepositories = repositories.filter((repo) => !featuredNames.has(repo.name.toLowerCase())).slice(0, 4);
  return <section className="section-frame section-block" id="work"><SectionHeading kicker={t.work.kicker} title={t.work.title} copy={t.work.copy} /><div className="featured-work">{featured.map((project, index) => <ProjectCaseStudy key={project.id} project={project} locale={locale} t={t} reverse={index % 2 === 1} />)}</div><div className="open-source-header"><div><p className="section-kicker">{t.work.openSource}</p><h3>{t.work.repositories}</h3></div><span className="github-live"><i /> {githubLoading ? t.work.loading : t.work.live}</span></div>{githubError && <p className="fallback-note">{t.work.fallback}</p>}<div className="repo-grid">{otherRepositories.map((repo) => <RepositoryCard key={repo.id} repo={repo} />)}</div><a className="view-all" href={profile.repositories} target="_blank" rel="noreferrer">{t.work.viewAll} <ArrowUpRight /></a></section>;
}

function ProjectCaseStudy({ project, locale, t, reverse }: { project: Project; locale: Locale; t: Translations; reverse: boolean }) {
  const description = locale === 'en' ? project.descriptionEn : project.descriptionEs;
  const longDescription = locale === 'en' ? project.longDescriptionEn : project.longDescriptionEs;
  return <article className={`project-case ${reverse ? 'project-case-reverse' : ''}`}><div className="case-visual"><div className="case-visual-header"><span>{project.category.toUpperCase()} / {project.year}</span><span className="case-status">{project.status}</span></div><div className="case-diagram"><span className="diagram-ring ring-one" /><span className="diagram-ring ring-two" /><span className="diagram-core">{project.name.slice(0, 2).toUpperCase()}</span><div className="diagram-label label-a">DOMAIN</div><div className="diagram-label label-b">DATA</div><div className="diagram-label label-c">EVENTS</div></div><div className="case-visual-footer"><span>ENGINEERING CASE</span><span>↗</span></div></div><div className="case-content"><p className="case-number">0{project.id === 'aidtrack' ? '1' : '2'} / FEATURED WORK</p><h3>{project.name}</h3><p className="case-description">{description}</p><div className="case-block"><span>{t.work.problem}</span><p>{longDescription}</p></div><div className="tag-row">{project.technologies.slice(0, 5).map((tech) => <span key={tech}>{tech}</span>)}</div><div className="case-actions"><a className="button button-primary" href={`/projects/${project.id}`}>{t.work.explore} <ArrowRight /></a>{project.githubUrl ? <a className="text-link" href={project.githubUrl} target="_blank" rel="noreferrer">{t.work.source} <ArrowUpRight /></a> : <span className="muted-action">{t.work.source} — {t.common.noUrl}</span>}</div></div></article>;
}

function RepositoryCard({ repo }: { repo: Repository }) {
  return <a className="repo-card" href={repo.htmlUrl} target="_blank" rel="noreferrer"><div className="repo-card-top"><span className="repo-mark">⌘</span><span className="repo-arrow">↗</span></div><h4>{repo.name}</h4><p>{repo.description}</p><div className="repo-meta"><span>{repo.language || 'Code'}</span><span>★ {repo.stars}</span><span>⑂ {repo.forks}</span></div></a>;
}

function CodeLab({ t, activeSnippet, setActiveSnippet }: { t: Translations; activeSnippet: CodeSnippet; setActiveSnippet: Callback<CodeSnippet> }) {
  const [copied, setCopied] = useState(false);
  const categories = Object.keys(t.code.tabs) as CodeSnippet['category'][];
  const snippets = codeSnippets.filter((snippet) => snippet.category === activeSnippet.category);
  const copyCode = async () => {
    await navigator.clipboard?.writeText(activeSnippet.code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };
  return <section className="section-frame section-block code-section" id="code"><SectionHeading kicker={t.code.kicker} title={t.code.title} copy={t.code.copy} /><div className="code-lab"><aside className="code-sidebar"><div className="sidebar-label">/ SELECT A LAYER</div>{categories.map((category) => <button key={category} className={activeSnippet.category === category ? 'active' : ''} onClick={() => { const next = codeSnippets.find((snippet) => snippet.category === category); if (next) setActiveSnippet(next); }}>{t.code.tabs[category]}</button>)}<div className="sidebar-foot"><span>5 examples</span><span>↳ curated</span></div></aside><div className="code-editor"><div className="editor-chrome"><div className="window-dots"><i /><i /><i /></div><span>{activeSnippet.title}</span><span className="editor-language">{activeSnippet.language}</span></div><div className="snippet-picker">{snippets.map((snippet) => <button key={snippet.id} className={snippet.id === activeSnippet.id ? 'active' : ''} onClick={() => setActiveSnippet(snippet)}>{snippet.title.replace(/\..*/, '')}</button>)}</div><div className="code-body"><CodeLines code={activeSnippet.code} highlightLines={activeSnippet.highlightLines} /></div><div className="editor-footer"><div><span className="code-dot" /> {activeSnippet.language} <span className="footer-divider">·</span> {activeSnippet.technologies.join(' · ')}</div><div className="editor-actions"><span>{t.code.engineeringExample}</span><button onClick={copyCode}>{copied ? t.code.copied : t.code.copyButton}</button>{activeSnippet.sourceUrl && <a href={activeSnippet.sourceUrl} target="_blank" rel="noreferrer">{t.code.source} ↗</a>}</div></div></div></div></section>;
}

function CodeLines({ code, highlightLines = [] }: { code: string; highlightLines?: number[] }) {
  return <pre className="code-pre" aria-label="Code example"><code>{code.split('\n').map((line, index) => <span className={`code-line ${highlightLines.includes(index + 1) ? 'highlight' : ''}`} key={`${index}-${line}`}><i>{String(index + 1).padStart(2, '0')}</i><b dangerouslySetInnerHTML={{ __html: colorize(line) }} /></span>)}</code></pre>;
}

function colorize(line: string) {
  const escaped = line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return escaped.replace(/(\/\/.*|#.*|--.*)$/g, '<em>$1</em>').replace(/\b(class|public|private|return|new|const|for|if|async|def|export|function)\b/g, '<strong>$1</strong>').replace(/("[^"\n]*"|'[^'\n]*')/g, '<span>$1</span>');
}

function ArchitectureLab({ locale, t, active, setActive }: { locale: Locale; t: Translations; active: Architecture; setActive: Callback<Architecture> }) {
  return <section className="section-frame section-block" id="architecture"><SectionHeading kicker={t.architecture.kicker} title={t.architecture.title} copy={t.architecture.copy} /><div className="architecture-lab"><div className="architecture-selector">{architectures.map((architecture) => <button key={architecture.id} className={active.id === architecture.id ? 'active' : ''} onClick={() => setActive(architecture)}><span>{architecture.id === active.id ? '●' : '○'}</span>{locale === 'en' ? architecture.nameEn : architecture.nameEs}</button>)}</div><div className="architecture-detail"><div className="system-diagram"><SystemDiagram variant={active.id} /></div><div className="architecture-notes"><p className="section-kicker">{active.id.toUpperCase()} / SYSTEM NOTE</p><h3>{locale === 'en' ? active.nameEn : active.nameEs}</h3><p>{locale === 'en' ? active.summaryEn : active.summaryEs}</p><dl><div><dt>{t.architecture.design}</dt><dd>{locale === 'en' ? active.decisionEn : active.decisionEs}</dd></div><div><dt>{t.architecture.tradeoffs}</dt><dd>{locale === 'en' ? active.tradeoffsEn : active.tradeoffsEs}</dd></div></dl><div className="tag-row">{active.tech.map((tech) => <span key={tech}>{tech}</span>)}</div></div></div></div></section>;
}

function SystemDiagram({ variant }: { variant: string }) {
  const ai = variant === 'ai-agent';
  const event = variant === 'event-driven';
  const serverless = variant === 'serverless';
  return <svg viewBox="0 0 620 330" role="img" aria-label="System architecture diagram"><defs><linearGradient id="node" x1="0" x2="1"><stop stopColor="#151d31" /><stop offset="1" stopColor="#0c1220" /></linearGradient><filter id="glow"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs><g className="diagram-lines"><path d="M310 42 V86 M310 132 V170 M310 214 V258" /><path d="M310 170 H130 M310 170 H490" /><path d="M130 214 V258 M490 214 V258" /></g><g className="diagram-pulse"><circle r="4"><animateMotion dur="3s" repeatCount="indefinite" path="M310 42 V258" /></circle><circle r="4"><animateMotion dur="3.5s" repeatCount="indefinite" path="M310 170 H130 V258" /></circle></g><DiagramNode x="235" y="12" w="150" label={ai ? 'PROMPT' : serverless ? 'EVENT SOURCE' : 'CLIENTS'} /><DiagramNode x="210" y="86" w="200" label={ai ? 'ORCHESTRATOR' : serverless ? 'API GATEWAY' : 'API GATEWAY'} /><DiagramNode x="220" y="170" w="180" label={ai ? 'TOOLS + RAG' : event ? 'EVENT BUS' : 'SERVICES'} /><DiagramNode x="55" y="258" w="150" label={ai ? 'VECTOR STORE' : event ? 'CONSUMERS' : serverless ? 'FUNCTIONS' : 'DATABASE'} /><DiagramNode x="235" y="258" w="150" label={ai ? 'MODEL' : event ? 'PROJECTIONS' : 'DATA'}/><DiagramNode x="415" y="258" w="150" label={ai ? 'GUARDRAILS' : event ? 'RETRY / DLQ' : serverless ? 'OBSERVABILITY' : 'EVENTS'} /></svg>;
}

function DiagramNode({ x, y, w, label }: { x: number; y: number; w: number; label: string }) { return <g className="diagram-node" transform={`translate(${x} ${y})`} filter="url(#glow)"><rect width={w} height="46" rx="4" fill="url(#node)" /><rect width="3" height="46" rx="1" fill="#75d5c0" /><text x="18" y="28">{label}</text></g>; }

function AILab({ locale, t }: { locale: Locale; t: Translations }) {
  return <section className="section-frame section-block ai-section" id="ai"><SectionHeading kicker={t.ai.kicker} title={t.ai.title} copy={t.ai.copy} /><div className="ai-grid">{aiExperiments.map((experiment, index) => <article className="ai-card" key={experiment.id}><div className="ai-card-top"><span className="ai-number">0{index + 1}</span><span className={`state state-${experiment.status.toLowerCase().replaceAll(' ', '-')}`}>{experiment.status}</span></div><div className="ai-icon">{index === 0 ? '◌' : index === 1 ? '⌁' : index === 2 ? '✦' : '◇'}</div><h3>{locale === 'en' ? experiment.titleEn : experiment.titleEs}</h3><p>{locale === 'en' ? experiment.copyEn : experiment.copyEs}</p><div className="tag-row">{experiment.tech.map((tech) => <span key={tech}>{tech}</span>)}</div></article>)}</div></section>;
}

function TechStack({ locale, t, activeTech, setActiveTech }: { locale: Locale; t: Translations; activeTech: string; setActiveTech: Callback<string> }) {
  const groups = skillGroups.slice(0, 4);
  const relatedProjects = projects.filter((project) => project.technologies.some((technology) => technology.toLowerCase().includes(activeTech.toLowerCase())));
  return <section className="section-frame section-block tech-section"><SectionHeading kicker={t.tech.kicker} title={t.tech.title} copy={t.tech.copy} /><div className="tech-layout"><div className="tech-groups">{groups.map((group) => <div className="tech-group" key={group.key}><span className="tech-group-name">{locale === 'en' ? group.titleEn : group.titleEs}</span><div className="tech-items">{group.items.slice(0, 6).map((tech) => <button key={tech} className={activeTech === tech ? 'active' : ''} onClick={() => setActiveTech(tech)}>{tech}</button>)}</div></div>)}</div><aside className="tech-context"><span className="section-kicker">{activeTech}</span><h3>{t.tech.used}</h3>{relatedProjects.length > 0 ? relatedProjects.map((project) => <a key={project.id} href={`/projects/${project.id}`}>{project.name}<ArrowRight /></a>) : <p>{locale === 'en' ? 'Code Lab examples and engineering practice.' : 'Ejemplos del Code Lab y práctica de ingeniería.'}</p>}<a href="#code" className="context-link">Code Lab <ArrowRight /></a></aside></div></section>;
}

function Experience({ locale, t }: { locale: Locale; t: Translations }) {
  return <section className="section-frame section-block experience-section" id="experience"><SectionHeading kicker={t.experience.kicker} title={t.experience.title} copy={t.experience.copy} /><div className="experience-list">{experience.map((job, index) => <article className="experience-row" key={job.company}><div className="experience-time"><span>0{index + 1}</span><strong>{job.period === '4+ years' ? '2021—' : job.period === 'Almost 2 years' ? '2019—2021' : job.period === '2 years' ? '2017—2019' : '2016—2017'}</strong></div><div><h3>{job.role}</h3><p className="experience-company">{job.company}</p><p>{locale === 'en' ? job.summaryEn : job.summaryEs}</p></div><div className="experience-tags">{(locale === 'en' ? job.highlightsEn : job.highlightsEs).slice(0, 2).map((highlight) => <span key={highlight}>{highlight}</span>)}</div></article>)}</div></section>;
}

function Contact({ locale, t, onAssistant }: { locale: Locale; t: Translations; onAssistant: () => void }) {
  return <section className="contact-section section-frame section-block" id="contact"><div><p className="section-kicker">06 / NEXT SYSTEM</p><h2>{locale === 'en' ? 'Have a hard problem?' : '¿Tienes un problema difícil?'}</h2><p>{locale === 'en' ? 'Let’s talk about the system behind it.' : 'Hablemos del sistema que hay detrás.'}</p></div><div className="contact-actions"><a className="button button-primary" href={`mailto:${profile.email}`}>{t.footer.email} <ArrowUpRight /></a><button className="button button-quiet" onClick={onAssistant}>{t.assistant.label} <span>✦</span></button></div></section>;
}

function Footer({ t }: { t: Translations }) { return <footer className="site-footer section-frame"><div><span className="monogram footer-mark">JS<i>_</i></span><p>{t.footer.designed}<br /><strong>{profile.name}</strong></p></div><div className="footer-links"><a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={`mailto:${profile.email}`}>{t.footer.email}</a></div><span className="built-with">{t.footer.built}</span></footer>; }

function SectionHeading({ kicker, title, copy }: { kicker: string; title: string; copy: string }) { return <div className="section-heading"><div><p className="section-kicker">{kicker}</p><h2>{title}</h2></div><p>{copy}</p></div>; }
function ArrowRight() { return <span aria-hidden="true">→</span>; }
function ArrowUpRight() { return <span aria-hidden="true">↗</span>; }

function CommandPalette({ t, open, onClose, onNavigate }: { t: Translations; open: boolean; onClose: () => void; onNavigate: Callback<string> }) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const commands = [{ label: t.nav.work, target: '#work', keywords: 'projects aidtrack' }, { label: t.nav.architecture, target: '#architecture', keywords: 'architecture systems' }, { label: t.nav.ai, target: '#ai', keywords: 'ai lab agents' }, { label: t.nav.code, target: '#code', keywords: 'code java spring python sql typescript kafka' }, { label: t.nav.experience, target: '#experience', keywords: 'experience work' }, { label: 'GitHub', target: profile.github, keywords: 'github source repositories' }, { label: 'LinkedIn', target: profile.linkedin, keywords: 'linkedin contact' }];
  const filtered = commands.filter((command) => `${command.label} ${command.keywords}`.toLowerCase().includes(query.toLowerCase()));
  const activate = (command: (typeof commands)[number]) => { if (command.target.startsWith('#')) onNavigate(command.target); else window.open(command.target, '_blank', 'noopener,noreferrer'); };
  if (!open) return null;
  return <div className="modal-backdrop" onMouseDown={onClose}><div className="command-modal" role="dialog" aria-modal="true" aria-label={t.common.command} onMouseDown={(event) => event.stopPropagation()} onKeyDown={(event) => { if (event.key === 'ArrowDown') { event.preventDefault(); setActiveIndex((index) => filtered.length ? (index + 1) % filtered.length : 0); } if (event.key === 'ArrowUp') { event.preventDefault(); setActiveIndex((index) => filtered.length ? (index - 1 + filtered.length) % filtered.length : 0); } if (event.key === 'Enter' && filtered[activeIndex]) { event.preventDefault(); activate(filtered[activeIndex]); } }}><div className="command-input"><span>⌕</span><input autoFocus value={query} onChange={(event) => { setQuery(event.target.value); setActiveIndex(0); }} placeholder="Search portfolio…" /><kbd>ESC</kbd></div><div className="command-list">{filtered.map((command, index) => <button key={command.label} className={index === activeIndex ? 'active' : ''} autoFocus={index === 0 && !query} onMouseEnter={() => setActiveIndex(index)} onClick={() => activate(command)}><span className="command-icon">{command.target === '#code' ? '</>' : '→'}</span>{command.label}<span className="command-hint">↵</span></button>)}{filtered.length === 0 && <p className="command-empty">No matching systems found.</p>}</div><div className="command-footer"><span><kbd>↑</kbd><kbd>↓</kbd> navigate</span><span><kbd>↵</kbd> open</span><span><kbd>ESC</kbd> close</span></div></div></div>;
}

function Assistant({ locale, t, open, onClose }: { locale: Locale; t: Translations; open: boolean; onClose: () => void }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const respond = (value: string) => {
    setQuestion(value);
    const lower = value.toLowerCase();
    if (lower.includes('architecture') || lower.includes('arquitectura')) setAnswer(t.assistant.answerArchitecture);
    else if (lower.includes('ai') || lower.includes('ia') || lower.includes('agent')) setAnswer(t.assistant.answerAi);
    else if (lower.includes('code') || lower.includes('código') || lower.includes('spring') || lower.includes('java')) setAnswer(t.assistant.answerCode);
    else if (lower.includes('project') || lower.includes('proyecto')) setAnswer(`${t.assistant.answerProjects} Java, Spring Boot, PostgreSQL and AI.`);
    else setAnswer(t.assistant.empty);
  };
  if (!open) return null;
  return <div className="modal-backdrop assistant-backdrop" onMouseDown={onClose}><div className="assistant-panel" role="dialog" aria-modal="true" aria-label={t.assistant.label} onMouseDown={(event) => event.stopPropagation()}><div className="assistant-heading"><div><span className="assistant-orb">✦</span><span>{t.assistant.label}</span></div><button onClick={onClose} aria-label={t.common.close}>×</button></div><div className="assistant-answer">{answer || <span className="answer-placeholder">{t.assistant.empty}</span>}{answer && <span className="answer-cursor" />}</div><div className="assistant-examples">{t.assistant.examples.map((example) => <button key={example} onClick={() => respond(example)}>{example} <ArrowRight /></button>)}</div><form className="assistant-form" onSubmit={(event) => { event.preventDefault(); if (question.trim()) respond(question); }}><input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder={t.assistant.placeholder} /><button aria-label="Ask">→</button></form><small className="assistant-note">{locale === 'en' ? 'Local portfolio data · no external API' : 'Datos locales del portfolio · sin API externa'}</small></div></div>;
}

function ProjectPage({ locale, setLocale, project }: { locale: Locale; setLocale: SetLocale; project: Project }) {
  return <div className="app-shell"><Header locale={locale} setLocale={setLocale} onCommand={() => undefined} t={translations[locale]} /><main className="section-frame project-detail-page"><a className="back-link" href="/#work">← {locale === 'en' ? 'Back to work' : 'Volver al trabajo'}</a><p className="section-kicker">{project.category.toUpperCase()} / {project.year}</p><h1>{project.name}</h1><p className="detail-lede">{locale === 'en' ? project.longDescriptionEn : project.longDescriptionEs}</p><div className="tag-row">{project.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div><div className="detail-actions">{project.githubUrl ? <a className="button button-primary" href={project.githubUrl} target="_blank" rel="noreferrer">GitHub <ArrowUpRight /></a> : <span className="muted-action">Coming soon</span>}</div></main></div>;
}

export default App;
