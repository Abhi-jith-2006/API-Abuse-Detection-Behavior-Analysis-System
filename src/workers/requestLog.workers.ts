import { Worker, Job } from "bullmq";
import { getRedisConnectionOptions } from "../infrastructure/redis/connection";
import { REQUEST_LOG_QUEUE_NAME } from "../infrastructure/redis/queues";
import { requestLogEvents} from "../events/requestLog.event";
import { getDbClient } from "../infrastructure/database/client";
import { insertRequestLog } from "../modules/logs/repository";
import { get5MinWindowStart } from "../modules/metrices/aggregator";
import { upsertRequestMetric } from "../modules/metrices/repository";



const connection = getRedisConnectionOptions();

export const requestLogWorker = new Worker<requestLogEvents>(
  REQUEST_LOG_QUEUE_NAME,
  async (job: Job<requestLogEvents>) => {
    const client = await getDbClient();

    try {
      await client.query("BEGIN");

      
      await insertRequestLog(client, job.data);

      
      const windowStart = get5MinWindowStart(job.data.occurredAt);

      await upsertRequestMetric(client, {
        windowStart,
        path: job.data.path,
        method: job.data.method,
        requestCount: 1,
        errorCount: job.data.statusCode >= 400 ? 1 : 0,
        avgLatencyCount: job.data.latencyMs,
      });

      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  },
  {
    connection,
    concurrency: 5,
  }
);