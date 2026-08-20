import type { Locale } from '../types';

export const translations = {
  en: {
    nav: { about: 'About', skills: 'Skills', projects: 'Projects', labs: 'Labs', experience: 'Experience', contact: 'Contact' },
    hero: { role1: 'Senior Backend Engineer', role2: 'Software Architecture', role3: 'AI Engineering', cta1: 'View Projects', cta2: 'GitHub', cta3: 'LinkedIn', cta4: 'Download Resume' },
    about: { title: 'About Me', body: 'Systems Engineer with 10+ years building software and designing enterprise solutions across backend, architecture, cloud and microservices. I focus on business-oriented systems and am actively exploring how generative AI and agentic workflows can improve products and development cycles.' },
    profile: { title: 'Profile Highlights', education: 'Systems Engineering at UNAD', technologist: 'Analysis and Development Technologist at SENA', certification: 'C1 English certification (CEFR)', languages: 'Spanish native or bilingual, English full professional' },
    skills: { title: 'Skills' },
    projects: { title: 'Featured Projects', status: 'Status', category: 'Category' },
    labs: { title: 'Labs', architecture: 'Architecture Lab', ai: 'AI Lab' },
    experience: { title: 'Experience' },
    contact: { title: 'Contact', cta: "Let's build something interesting." },
    common: { comingSoon: 'Coming soon', research: 'Research', prototype: 'Prototype', inProgress: 'In Progress' }
  },
  es: {
    nav: { about: 'Sobre mí', skills: 'Skills', projects: 'Proyectos', labs: 'Labs', experience: 'Experiencia', contact: 'Contacto' },
    hero: { role1: 'Ingeniero Backend Senior', role2: 'Arquitectura de Software', role3: 'Ingeniería IA', cta1: 'Ver Proyectos', cta2: 'GitHub', cta3: 'LinkedIn', cta4: 'Descargar CV' },
    about: { title: 'Sobre mí', body: 'Ingeniero de Sistemas con más de 10 años desarrollando software y diseñando soluciones empresariales en backend, arquitectura, cloud y microservicios. Me enfoco en software orientado a negocio y actualmente exploro cómo la IA generativa y los agentes pueden mejorar productos y ciclos de desarrollo.' },
    profile: { title: 'Perfil Resumido', education: 'Ingeniería de Sistemas en la UNAD', technologist: 'Tecnólogo en Análisis y Desarrollo de Sistemas en el SENA', certification: 'Certificación de inglés C1 (CEFR)', languages: 'Español nativo o bilingüe, Inglés profesional completo' },
    skills: { title: 'Skills' },
    projects: { title: 'Proyectos Destacados', status: 'Estado', category: 'Categoría' },
    labs: { title: 'Labs', architecture: 'Laboratorio de Arquitectura', ai: 'Laboratorio de IA' },
    experience: { title: 'Experiencia' },
    contact: { title: 'Contacto', cta: 'Construyamos algo interesante.' },
    common: { comingSoon: 'Próximamente', research: 'Investigación', prototype: 'Prototipo', inProgress: 'En progreso' }
  }
} satisfies Record<Locale, any>;
