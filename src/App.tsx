import { useEffect, useMemo, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import { profile } from './data/profile';
import { skillGroups } from './data/skills';
import { projects } from './data/projects';
import { architectures } from './data/architecture';
import { experience } from './data/experience';
import { translations } from './i18n/translations';
import { useLocale } from './hooks/useLocale';
import type { Locale, Project } from './types';

const routeFromLocation = () => {
  const path = window.location.pathname.replace(/\/+$/, '');
  const fromQuery = new URLSearchParams(window.location.search).get('p');
  return fromQuery || path || '/';
};

function App() {
  const { locale, setLocale } = useLocale();
  const t = translations[locale];
  const [route, setRoute] = useState(routeFromLocation());

  useEffect(() => {
    const queryPath = new URLSearchParams(window.location.search).get('p');
    if (queryPath) {
      window.history.replaceState({}, '', queryPath);
      setRoute(queryPath);
    } else {
      setRoute(window.location.pathname);
    }
    const onPop = () => setRoute(window.location.pathname || '/');
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    document.title = `${profile.name} | ${locale === 'en' ? 'Senior Backend Engineer' : 'Ingeniero Backend Senior'}`;
  }, [locale]);

  const featured = useMemo(() => projects.filter((project) => project.featured), []);
  const currentProject = projects.find((project) => `/projects/${project.id}` === route);

  if (currentProject) return <ProjectPage locale={locale} setLocale={setLocale} project={currentProject} />;
  return <HomePage locale={locale} setLocale={setLocale} t={t} featured={featured} />;
}

type Translations = (typeof translations)['en'];
type SetLocale = Dispatch<SetStateAction<Locale>>;

function HomePage({ locale, setLocale, t, featured }: { locale: Locale; setLocale: SetLocale; t: Translations; featured: Project[] }) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">{profile.name}</div>
        <nav className="nav">
          <a href="#about">{t.nav.about}</a>
          <a href="#skills">{t.nav.skills}</a>
          <a href="#projects">{t.nav.projects}</a>
          <a href="#labs">{t.nav.labs}</a>
          <a href="#experience">{t.nav.experience}</a>
          <a href="#contact">{t.nav.contact}</a>
        </nav>
        <button className="lang-toggle" onClick={() => setLocale(locale === 'en' ? 'es' : 'en')}>{locale === 'en' ? 'EN | ES' : 'ES | EN'}</button>
      </header>
      <main>
        <section className="hero section">
          <div className="hero-copy">
            <div className="brand-mark">
              <div className="brand-mark__logo" aria-hidden="true">
                <span className="brand-mark__s">S</span>
                <span className="brand-mark__t">T</span>
              </div>
              <div className="brand-mark__text">
                <span>{profile.name}</span>
                <strong>Executive Technology Portfolio</strong>
              </div>
            </div>
            <p className="eyebrow">{profile.titleEn}</p>
            <h1>{profile.name}</h1>
            <h2>{t.hero.role1}</h2>
            <div className="hero-subtitle">
              <span>{t.hero.role2}</span>
              <span>{t.hero.role3}</span>
            </div>
            <p className="lede">{locale === 'en' ? profile.taglineEn : profile.taglineEs}</p>
            <div className="cta-row">
              <a className="btn primary" href="#projects">{t.hero.cta1}</a>
              <a className="btn" href={`https://${profile.github}`} target="_blank" rel="noreferrer">{t.hero.cta2}</a>
              <a className="btn" href={`https://${profile.linkedin}`} target="_blank" rel="noreferrer">{t.hero.cta3}</a>
              <a className="btn" href={profile.resume}>{t.hero.cta4}</a>
            </div>
            <div className="brand-strip">
              <span>SOFTWARE</span>
              <span>INNOVATION</span>
              <span>PERFORMANCE</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-panel">
              <div className="hero-panel__header">
                <span>Architecture Flow</span>
                <small>Backend to AI</small>
              </div>
              <div className="flow-card">
                <div>Client</div><div>↓</div><div>API</div><div>↓</div><div>Microservices</div><div>↓</div><div>Cloud</div><div>↓</div><div>AI</div>
              </div>
              <div className="hero-panel__footer">
                <span>Code</span>
                <span>Solve</span>
                <span>Scale</span>
              </div>
            </div>
          </div>
        </section>
        <Section id="about" title={t.about.title}>
          <div className="about-grid">
            <p className="section-copy">{t.about.body}</p>
            <div className="profile-card">
              <h3>{t.profile.title}</h3>
              <ul>
                <li>{t.profile.education}</li>
                <li>{t.profile.technologist}</li>
                <li>{t.profile.certification}</li>
                <li>{t.profile.languages}</li>
              </ul>
            </div>
          </div>
        </Section>
        <Section id="skills" title={t.skills.title}>
          <div className="skill-grid">{skillGroups.map((group) => <article className="skill-card" key={group.key}><h3>{locale === 'en' ? group.titleEn : group.titleEs}</h3><div className="pill-list">{group.items.map((item) => <span key={item}>{item}</span>)}</div></article>)}</div>
        </Section>
        <Section id="projects" title={t.projects.title}>
          <div className="project-grid">{featured.map((project) => <ProjectCard key={project.id} project={project} locale={locale} common={t.common} />)}</div>
        </Section>
        <Section id="labs" title={t.labs.title}>
          <div className="lab-grid">
            <LabBlock title={t.labs.architecture} items={architectures} locale={locale} />
            <AILab locale={locale} />
          </div>
        </Section>
        <Section id="experience" title={t.experience.title}>
          <div className="timeline">
            {experience.map((job) => (
              <article key={job.company} className="timeline-item">
                <div className="timeline-meta">
                  <strong>{job.company}</strong>
                  <span>{job.role}</span>
                  <span>{job.period}</span>
                </div>
                <div className="timeline-body">
                  <p>{locale === 'en' ? job.summaryEn : job.summaryEs}</p>
                  <div className="pill-list">
                    {(locale === 'en' ? job.highlightsEn : job.highlightsEs).map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>
        <Section id="contact" title={t.contact.title}><div className="contact-box"><p>{t.contact.cta}</p><div className="cta-row"><a className="btn primary" href={`mailto:${profile.email}`}>Email</a><a className="btn" href={`https://${profile.github}`} target="_blank" rel="noreferrer">GitHub</a><a className="btn" href={`https://${profile.linkedin}`} target="_blank" rel="noreferrer">LinkedIn</a></div></div></Section>
      </main>
    </div>
  );
}

function ProjectCard({ project, locale, common }: { project: Project; locale: Locale; common: Translations['common'] }) {
  const desc = locale === 'en' ? project.descriptionEn : project.descriptionEs;
  return <article className="project-card"><div className="card-top"><span className="status">{project.status === 'Coming Soon' ? common.comingSoon : project.status}</span><span>{project.category}</span></div><h3>{project.name}</h3><p>{desc}</p><div className="pill-list">{project.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div><div className="card-actions"><a href={`/projects/${project.id}`}>Open</a>{project.githubUrl ? <a href={project.githubUrl}>GitHub</a> : <span>{common.comingSoon}</span>}</div></article>;
}

function LabBlock({ title, items, locale }: { title: string; items: typeof architectures; locale: Locale }) {
  return <article className="lab-card"><h3>{title}</h3><div className="arch-list">{items.map((item) => <div className="arch-item" key={item.id}><strong>{locale === 'en' ? item.nameEn : item.nameEs}</strong><p>{locale === 'en' ? item.decisionEn : item.decisionEs}</p><small>{item.tech.join(' · ')}</small></div>)}</div></article>;
}

function AILab({ locale }: { locale: Locale }) {
  const prompts = locale === 'en'
    ? ['What backend technologies does Juan use?', 'Show me projects using Java.', 'What AI projects is Juan working on?']
    : ['¿Qué tecnologías backend usa Juan?', 'Muéstrame proyectos que usen Java.', '¿En qué proyectos de IA trabaja Juan?'];
  return <article className="lab-card"><h3>AI Lab</h3><div className="ai-demo">{prompts.map((prompt) => <button key={prompt} className="ai-pill">{prompt}</button>)}</div><p>{locale === 'en' ? 'This demo is powered by local portfolio data and is ready to connect to a future RAG backend.' : 'Esta demo usa datos locales del portfolio y está lista para conectarse luego a un backend RAG real.'}</p></article>;
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <section id={id} className="section"><div className="section-head"><h2>{title}</h2></div>{children}</section>;
}

function ProjectPage({ locale, setLocale, project }: { locale: Locale; setLocale: SetLocale; project: Project }) {
  return <div className="app-shell"><header className="topbar"><a className="brand" href="/">Juan Sebastian Silva Rojas</a><button className="lang-toggle" onClick={() => setLocale(locale === 'en' ? 'es' : 'en')}>{locale === 'en' ? 'EN | ES' : 'ES | EN'}</button></header><main className="section"><a className="back-link" href="/">← Back</a><article className="project-detail"><h1>{project.name}</h1><p>{locale === 'en' ? project.longDescriptionEn : project.longDescriptionEs}</p><div className="detail-grid"><Detail label="Status" value={project.status} /><Detail label="Category" value={project.category} /><Detail label="Year" value={project.year} /></div><div className="pill-list">{project.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div><div className="card-actions"><a href={project.githubUrl || '#'}>{project.githubUrl ? 'GitHub' : 'Coming soon'}</a><a href={project.architectureUrl || '#'}>{project.architectureUrl ? 'Architecture' : 'Coming soon'}</a><a href={project.demoUrl || '#'}>{project.demoUrl ? 'Demo' : 'Coming soon'}</a></div></article></main></div>;
}

function Detail({ label, value }: { label: string; value: string }) { return <div className="detail"><span>{label}</span><strong>{value}</strong></div>; }

export default App;
