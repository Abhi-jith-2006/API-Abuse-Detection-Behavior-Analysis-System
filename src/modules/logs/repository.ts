import { PoolClient } from "pg";
import { requestLogEvents } from "../../events/requestLog.event";

export async function insertRequestLog(
  client: PoolClient,
  event: requestLogEvents
): Promise<void> {
  await client.query(
    `
    INSERT INTO request_logs (
      request_id,
      occurred_at,
      method,
      path,
      status_code,
      latency_ms,
      ip_hash,
      user_id
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    ON CONFLICT (request_id) DO NOTHING
    `,
    [
      event.requestId,
      event.occurredAt,
      event.method,
      event.path,
      event.statusCode,
      event.latencyMs,
      event.ipHash,
      event.userId,
    ]
  );
}