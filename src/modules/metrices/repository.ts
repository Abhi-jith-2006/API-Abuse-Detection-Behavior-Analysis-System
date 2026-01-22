import { PoolClient } from "pg";

export async function upsertRequestMetric(
    client: PoolClient,
    data: {
        windowStart: Date;
        path: string;
        method: string;
        requestCount: number;
        errorCount: number;
        avgLatencyCount: number
    }
): Promise<void>{
    await client.query(
        `
    INSERT INTO request_metrics_5m (
      window_start,
      path,
      method,
      request_count,
      error_count,
      avg_latency_ms
    )
    VALUES ($1,$2,$3,$4,$5,$6)
    ON CONFLICT (window_start, path, method)
    DO UPDATE SET
      request_count = request_metrics_5m.request_count + EXCLUDED.request_count,
      error_count = request_metrics_5m.error_count + EXCLUDED.error_count,
      avg_latency_ms =
        (
          request_metrics_5m.avg_latency_ms + EXCLUDED.avg_latency_ms
        ) / 2
    `,
    [
        data.windowStart,
        data.path,
        data.method,
        data.requestCount,
        data.errorCount,
        data.avgLatencyCount

    ]
    )
}