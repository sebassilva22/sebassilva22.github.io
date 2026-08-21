import type { CodeSnippet } from '../types';

export const codeSnippets: CodeSnippet[] = [
  {
    id: 'spring-service',
    title: 'OrderService.java',
    descriptionEn: 'A small service boundary that keeps business rules explicit and transactional.',
    descriptionEs: 'Un límite de servicio pequeño que mantiene explícitas las reglas de negocio y la transacción.',
    language: 'Java',
    category: 'backend',
    technologies: ['Java', 'Spring Boot'],
    code: `@Service
@Transactional
public class OrderService {
  private final OrderRepository orders;
  private final EventPublisher events;

  public Order place(PlaceOrder command) {
    var order = Order.create(command.customerId(), command.lines());
    var saved = orders.save(order);

    events.publish(new OrderPlaced(saved.id()));
    return saved;
  }
}`,
    repository: 'aidtrack'
  },
  {
    id: 'event-contract',
    title: 'OrderPlaced.java',
    descriptionEn: 'An event contract designed for decoupled consumers and safe evolution.',
    descriptionEs: 'Un contrato de evento pensado para consumidores desacoplados y evolución segura.',
    language: 'Java',
    category: 'architecture',
    technologies: ['Java', 'Kafka', 'Event-driven'],
    code: `public record OrderPlaced(
  UUID eventId,
  UUID orderId,
  Instant occurredAt,
  int schemaVersion
) {
  public static OrderPlaced now(UUID orderId) {
    return new OrderPlaced(
      UUID.randomUUID(), orderId,
      Instant.now(), 1
    );
  }
}`,
    repository: 'aidtrack'
  },
  {
    id: 'ollama-client',
    title: 'LocalModelClient.py',
    descriptionEn: 'A provider boundary for local inference that keeps the rest of the app model-agnostic.',
    descriptionEs: 'Una frontera de proveedor para inferencia local que mantiene el resto de la app agnóstico al modelo.',
    language: 'Python',
    category: 'ai',
    technologies: ['Python', 'Ollama', 'LLMs'],
    code: `class LocalModelClient:
    def __init__(self, http, model: str):
        self.http = http
        self.model = model

    def answer(self, prompt: str) -> str:
        response = self.http.post("/api/generate", json={
            "model": self.model,
            "prompt": prompt,
            "stream": False,
        })
        response.raise_for_status()
        return response.json()["response"]`,
    repository: 'local-ai-coding-agent'
  },
  {
    id: 'migration-index',
    title: 'V12__order_lookup.sql',
    descriptionEn: 'A focused migration: make a common lookup fast while preserving a clear rollback path.',
    descriptionEs: 'Una migración enfocada: acelerar una consulta frecuente manteniendo un rollback claro.',
    language: 'SQL',
    category: 'data',
    technologies: ['PostgreSQL', 'Flyway'],
    code: `CREATE INDEX CONCURRENTLY IF NOT EXISTS
  idx_orders_customer_created_at
ON orders (customer_id, created_at DESC)
WHERE status <> 'CANCELLED';

-- Verify with EXPLAIN before promoting the migration.
ANALYZE orders;`,
    repository: 'aidtrack'
  },
  {
    id: 'sqs-handler',
    title: 'process_event.ts',
    descriptionEn: 'A compact queue handler with idempotency as an explicit operational concern.',
    descriptionEs: 'Un handler de cola compacto con idempotencia como preocupación operativa explícita.',
    language: 'TypeScript',
    category: 'cloud',
    technologies: ['AWS', 'SQS', 'TypeScript'],
    code: `export async function handler(event: SQSEvent) {
  for (const record of event.Records) {
    const message = JSON.parse(record.body) as OrderPlaced;
    if (await inbox.wasProcessed(message.eventId)) continue;

    await orders.project(message);
    await inbox.markProcessed(message.eventId);
  }
  return { batchItemFailures: [] };
}`,
    repository: 'aidtrack'
  }
];
