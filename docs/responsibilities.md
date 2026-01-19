ABHIJITH S

src/events/
├── requestLog.event.ts
├── index.ts

src/infrastructure/
├── redis/
│   ├── connection.ts
│   └── queues.ts
│
├── database/
│   ├── client.ts
│   └── transaction.ts

src/workers/
├── requestLog.worker.ts
├── index.ts

src/modules/logs/
├── repository.ts

src/modules/metrics/
├── aggregator.ts
├── repository.ts

src/admin/
├── admin.routes.ts
├── admin.controller.ts
├── admin.service.ts

migrations/
├── 001_create_request_logs.sql
├── 002_create_request_metrics_5m.sql
├── 003_create_incidents.sql

scripts/
├── cleanupOldLogs.ts
├── replayDeadJobs.ts

src/utils/
├── time.ts



ABHIRAM

src/app.ts
src/server.ts

src/modules/auth/
├── auth.controller.ts
├── auth.service.ts
├── auth.middleware.ts

src/modules/rateLimit/
├── rateLimit.middleware.ts
├── rateLimit.service.ts

src/modules/logging/
├── enqueue.ts   ← calls YOUR queue, no logic
├── index.ts

src/middleware/
├── requestContext.ts
├── errorHandler.ts


MIDHUL 


src/config/
├── thresholds.ts

src/modules/incidents/
├── detector.ts
├── rules.ts

src/types/
├── incident.ts

scripts/
├── backfillMetrics.ts


SHARED ACCESS

docker-compose.yml
Dockerfile
tsconfig.json
package.json
README.md