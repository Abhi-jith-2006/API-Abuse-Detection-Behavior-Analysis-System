import { Queue } from "bullmq";
import { getRedisConnectionOptions } from "./connection";

export const REQUEST_LOG_QUEUE_NAME = "request-log";

export function createRequestLogQueue(): Queue {
  return new Queue(REQUEST_LOG_QUEUE_NAME, {
    connection: getRedisConnectionOptions(),
    defaultJobOptions: {
      attempts: 5,
      backoff: {
        type: "exponential",
        delay: 500,
      },
      removeOnComplete: true,
      removeOnFail: false,
    },
  });
}
