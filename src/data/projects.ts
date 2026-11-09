import type { Project } from '../types';

export const projects: Project[] = [
{
  "id": "simpacta",
  "name": "SIMPACTA · AI Sales Platform",
  "descriptionEn": "Creation and development of a multi-tenant platform for AI-assisted sales and business operations.",
  "descriptionEs": "Creación y desarrollo de una plataforma multi-tenant para ventas y operación comercial asistida por IA.",
  "longDescriptionEn": "I build SIMPACTA across backend, agent orchestration and its management portal. The sales agent connects WhatsApp with catalogs and business tools. The backend controls authorization, tenant isolation and commercial validation. Durable inbox/outbox processing and deterministic conversation regressions support reliability. Includes a travel pre-enrollment pilot, with payments and notifications subject to separate configuration and activation.",
  "longDescriptionEs": "Construyo SIMPACTA desde el backend y la orquestación de agentes hasta su portal de gestión. El agente comercial conecta WhatsApp con catálogos y herramientas de negocio. El backend controla autorización, aislamiento por tenant y validaciones comerciales. El procesamiento durable inbox/outbox y las regresiones conversacionales deterministas respaldan la confiabilidad. Incluye un piloto de preinscripción para turismo, con pagos y notificaciones sujetos a configuración y activación independientes.",
  "technologies": [
    "Java 21",
    "Spring Boot",
    "LangChain4j",
    "Ollama",
    "PostgreSQL",
    "RabbitMQ",
    "WhatsApp Cloud API",
    "React",
    "Cloudflare"
  ],
  "demoUrl": "https://simpacta.co",
  "status": "In Progress",
  "category": "AI",
  "featured": true,
  "year": "2026"
},
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

