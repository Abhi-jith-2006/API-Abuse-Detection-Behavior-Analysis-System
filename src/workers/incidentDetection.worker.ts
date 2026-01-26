
import { db } from '../infrastructure/database/client';
import { withTransaction } from '../infrastructure/database/transaction';
import { detectIncidents } from '../modules/incidents/detector';
import { IncidentRepository } from '../modules/incidents/repository';

interface MetricRow {
  id: string;
  api_key: string;
  window_start: Date;
  window_end: Date;
  request_count: number;
  error_count: number;
  avg_latency_ms: number;
}

const BATCH_SIZE = 100;

export async function runIncidentDetectionWorker(): Promise<void> {
  await withTransaction(db , async (client) => {
    
    const { rows } = await client.query<MetricRow>(
      `
      SELECT *
      FROM request_metrics_5m
      WHERE incidents_processed = false
      ORDER BY window_start
      LIMIT $1
      FOR UPDATE SKIP LOCKED
      `,
      [BATCH_SIZE]
    );

    if (rows.length === 0) {
      return;
    }

    const incidentRepo = new IncidentRepository(client);

   
    for (const row of rows) {
      const incidents = detectIncidents({
        apiKey: row.api_key,
        windowStart: row.window_start,
        windowEnd: row.window_end,
        requestCount: row.request_count,
        errorCount: row.error_count,
        avgLatencyMs: row.avg_latency_ms
      });

      for (const incident of incidents) {
        await incidentRepo.createIfNotExists(incident);
      }

     
      await client.query(
        `
        UPDATE request_metrics_5m
        SET incidents_processed = true
        WHERE id = $1
        `,
        [row.id]
      );
    }
  });
}
