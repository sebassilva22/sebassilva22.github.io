import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'aidtrack',
    name: 'AidTrack',
    descriptionEn: 'Humanitarian aid management and traceability platform.',
    descriptionEs: 'Plataforma para gestión y trazabilidad de ayuda humanitaria.',
    longDescriptionEn: 'A modular platform concept to connect disasters, organizations, donations, inventory and distribution tracking with strong traceability across the aid lifecycle.',
    longDescriptionEs: 'Un concepto de plataforma modular para conectar desastres, organizaciones, donaciones, inventario y seguimiento de distribución con trazabilidad de extremo a extremo.',
    technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'Flyway', 'REST APIs', 'Modular Architecture'],
    status: 'Prototype',
    category: 'Backend',
    featured: true,
    year: '2026'
  },
  {
    id: 'local-ai-coding-agent',
    name: 'Local AI Coding Agent',
    descriptionEn: 'AI coding agent powered by local LLMs for repo analysis and code assistance.',
    descriptionEs: 'Agente de código con IA local para análisis de repositorios y asistencia técnica.',
    longDescriptionEn: 'Research prototype for repository understanding, tool calling, and safe code modification using local models.',
    longDescriptionEs: 'Prototipo de investigación para comprensión de repositorios, tool calling y modificaciones seguras usando modelos locales.',
    technologies: ['Python', 'Ollama', 'Local LLM', 'Tool Calling', 'RAG', 'Git'],
    status: 'Research',
    category: 'AI',
    featured: true,
    year: '2026'
  },
  {
    id: 'ai-software-assistant',
    name: 'AI Software Assistant',
    descriptionEn: 'Assistant that answers questions about documentation and codebases.',
    descriptionEs: 'Asistente que responde preguntas sobre documentación y código.',
    longDescriptionEn: 'Prototype focused on knowledge retrieval from project docs, APIs and code artifacts.',
    longDescriptionEs: 'Prototipo centrado en recuperación de conocimiento desde documentación, APIs y código.',
    technologies: ['RAG', 'Python', 'Embeddings', 'Docs', 'LLM'],
    status: 'In Progress',
    category: 'AI',
    featured: true,
    year: '2026'
  }
];

