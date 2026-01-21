import { PoolClient } from "pg";
import { RequestLogEvents } from "../../events/requestLog.event";

export async function insertRequestLog(
    client: PoolClient,
    event: RequestLogEvents
): Promise <void>{
    await client.query(
           `
    INSERT INTO request_logs (
      request_id,
      timestamp,
      method,
      path,
      status_code,
      ip,
      user_agent,
      user_id,
      response_time_ms
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    ON CONFLICT (request_id) DO NOTHING
    `,
    [
        event.requestId,
        event.timestamp,
        event.method,
        event.path,
        event.statusCode,
        event.ip,
        event.userAgent ?? null,
        event.userId ?? null,
        event.responseTimeMs
    ]
    );
}