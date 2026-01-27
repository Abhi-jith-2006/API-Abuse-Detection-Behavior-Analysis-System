import { db } from '../infrastructure/database/client';
import { withTransaction } from '../infrastructure/database/transaction';

const WINDOW_MINUTES = 5;

function floorTo5Min(date: Date): Date {
  const d = new Date(date);
  d.setSeconds(0, 0);
  const minutes = d.getMinutes();
  d.setMinutes(minutes - (minutes % WINDOW_MINUTES));
  return d;
}

export async function runMetricsAggregationWorker(
  from: Date,
  to: Date
): Promise<void> {
  const windowStart = floorTo5Min(from);
  const windowEnd = floorTo5Min(to);

  await withTransaction(db, async (client) => {
    await client.query(
      `
      INSERT INTO request_metrics_5m (
        window_start,
        api_key,
        request_count,
        error_count,
        avg_latency_ms,
        incident_processed
      )
      SELECT
        $1 AS window_start,
        api_key,
        COUNT(*) AS request_count,
        COUNT(*) FILTER (WHERE status_code >= 400) AS error_count,
        AVG(latency_ms)::int AS avg_latency_ms,
        false
      FROM request_logs
      WHERE request_time >= $1
        AND request_time < $2
      GROUP BY api_key
      ON CONFLICT (window_start, api_key)
      DO UPDATE SET
        request_count = EXCLUDED.request_count,
        error_count = EXCLUDED.error_count,
        avg_latency_ms = EXCLUDED.avg_latency_ms
      `,
      [windowStart, windowEnd]
    );
  });
}
