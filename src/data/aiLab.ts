export const aiExperiments = [
  { id: 'local-llms', titleEn: 'Local LLMs', titleEs: 'LLMs locales', status: 'RESEARCH', tech: ['Ollama', 'Python'], copyEn: 'Exploring private inference workflows and model-provider boundaries.', copyEs: 'Explorando flujos de inferencia privada y fronteras desacopladas de proveedor.' },
  { id: 'rag', titleEn: 'Portfolio RAG', titleEs: 'RAG para portfolio', status: 'PROTOTYPE', tech: ['RAG', 'Embeddings'], copyEn: 'Retrieval patterns for answering questions over engineering knowledge.', copyEs: 'Patrones de recuperación para responder preguntas sobre conocimiento de ingeniería.' },
  { id: 'tool-calling', titleEn: 'Tool Calling', titleEs: 'Tool Calling', status: 'IN PROGRESS', tech: ['Agents', 'APIs'], copyEn: 'Designing agents that can inspect context before taking an action.', copyEs: 'Diseñando agentes que inspeccionan el contexto antes de actuar.' },
  { id: 'vision', titleEn: 'Computer Vision', titleEs: 'Visión por computador', status: 'COMING SOON', tech: ['Python', 'Vision'], copyEn: 'A space reserved for a future applied experiment.', copyEs: 'Un espacio reservado para un futuro experimento aplicado.' }
] as const;
