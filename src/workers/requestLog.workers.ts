import { Worker, Job } from "bullmq";
import { getRedisConnectionOptions } from "../infrastructure/redis/connection";
import { REQUEST_LOG_QUEUE_NAME } from "../infrastructure/redis/queues";
import { RequestLogEvents } from "../events/requestLog.event";
import { getDbClient } from "../infrastructure/database/client";
import { insertRequestLog } from "../modules/logs/repository";

const connection = getRedisConnectionOptions();

export const requestLogWorker = new Worker<RequestLogEvents>(
  REQUEST_LOG_QUEUE_NAME,
  async (job: Job<RequestLogEvents>) => {
    const client = await getDbClient();

    try {
      await client.query("BEGIN");
      await insertRequestLog(client, job.data);
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
