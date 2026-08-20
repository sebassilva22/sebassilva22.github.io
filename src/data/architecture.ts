export const architectures = [
  { id: 'microservices', nameEn: 'Microservices Architecture', nameEs: 'Arquitectura de Microservicios', tech: ['Spring Boot', 'REST', 'Kafka', 'Docker'], decisionEn: 'Split business domains for independent deployment and team autonomy.', decisionEs: 'Separar dominios para despliegue independiente y autonomía de equipos.' },
  { id: 'event-driven', nameEn: 'Event Driven Architecture', nameEs: 'Arquitectura Orientada a Eventos', tech: ['Kafka', 'SQS', 'SNS', 'EventBridge'], decisionEn: 'Use events to decouple services and improve scalability.', decisionEs: 'Usar eventos para desacoplar servicios y mejorar escalabilidad.' },
  { id: 'serverless', nameEn: 'Serverless Architecture', nameEs: 'Arquitectura Serverless', tech: ['Lambda', 'API Gateway', 'S3', 'CloudFront'], decisionEn: 'Optimize delivery for selective workloads and lower ops overhead.', decisionEs: 'Optimizar entrega para cargas específicas y reducir operación.' },
  { id: 'ai-agent', nameEn: 'AI Agent Architecture', nameEs: 'Arquitectura de Agentes IA', tech: ['LLMs', 'Tool Calling', 'RAG', 'Ollama'], decisionEn: 'Separate assistant UI from provider orchestration to keep future backends swappable.', decisionEs: 'Separar la UI del asistente de la orquestación para permitir cambiar el backend.' }
];

