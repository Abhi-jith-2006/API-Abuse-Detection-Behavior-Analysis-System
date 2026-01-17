ABHIJITH S

src/events/
├── requestLog.event.ts
├── index.ts
pgsql
Copy code
src/infrastructure/
├── redis/
│   ├── connection.ts
│   └── queues.ts
│
├── database/
│   ├── client.ts
│   └── transaction.ts
bash
Copy code
src/workers/
├── requestLog.worker.ts
├── index.ts
bash
Copy code
src/modules/logs/
├── repository.ts
bash
Copy code
src/modules/metrics/
├── aggregator.ts
├── repository.ts
pgsql
Copy code
src/admin/
├── admin.routes.ts
├── admin.controller.ts
├── admin.service.ts
pgsql
Copy code
migrations/
├── 001_create_request_logs.sql
├── 002_create_request_metrics_5m.sql
├── 003_create_incidents.sql
Copy code
scripts/
├── cleanupOldLogs.ts
├── replayDeadJobs.ts
css
Copy code
src/utils/
├── time.ts



ABHIRAM

src/app.ts
src/server.ts
bash
Copy code
src/modules/auth/
├── auth.controller.ts
├── auth.service.ts
├── auth.middleware.ts
bash
Copy code
src/modules/rateLimit/
├── rateLimit.middleware.ts
├── rateLimit.service.ts
pgsql
Copy code
src/modules/logging/
├── enqueue.ts   ← calls YOUR queue, no logic
├── index.ts
bash
Copy code
src/middleware/
├── requestContext.ts
├── errorHandler.ts


MIDHUL 


src/config/
├── thresholds.ts
bash
Copy code
src/modules/incidents/
├── detector.ts
├── rules.ts
bash
Copy code
src/types/
├── incident.ts
Copy code
scripts/
├── backfillMetrics.ts


SHARED ACCESS

docker-compose.yml
Dockerfile
tsconfig.json
package.json
README.md