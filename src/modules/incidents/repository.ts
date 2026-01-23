

import { PoolClient } from 'pg';
import { DetectedIncident } from './detector';

export class IncidentRepository {
  constructor(private readonly client: PoolClient) {}

  async createIfNotExists(incident: DetectedIncident): Promise<void> {
    await this.client.query(
      `
      INSERT INTO incidents (
        entity_type,
        entity_id,
        incident_type,
        severity,
        window_start,
        window_end,
        metric_snapshot,
        status
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,'open')
      ON CONFLICT (entity_type, entity_id, incident_type, window_start)
      DO NOTHING
      `,
      [
        incident.entityType,
        incident.entityId,
        incident.incidentType,
        incident.severity,
        incident.windowStart,
        incident.windowEnd,
        incident.metricSnapshot
      ]
    );
  }
}
