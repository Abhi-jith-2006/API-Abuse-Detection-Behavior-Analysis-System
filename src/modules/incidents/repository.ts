

import { PoolClient } from 'pg';
import { DetectedIncident } from './detector';

export type IncidentStatus = 'open' | 'acknowledged' | 'resolved';
export type IncidentEntityType = 'api_key' | 'ip' | 'user';

export interface Incident {
  id: string;
  entityType: IncidentEntityType;
  entityId: string;
  incidentType: string;
  severity: string;
  status: IncidentStatus;
  detectedAt: Date;
  windowStart: Date;
  windowEnd: Date;
}

export class IncidentRepository {
  constructor(private readonly client: PoolClient) {}

  async findMany(params: {
    status?: IncidentStatus;
    entityType?: IncidentEntityType;
    limit: number;
    offset: number;
  }): Promise<Incident[]> {
    const conditions: string[] = [];
    const values: any[] = [];
    let idx = 1;

    if (params.status) {
      conditions.push(`status = $${idx++}`);
      values.push(params.status);
    }

    if (params.entityType) {
      conditions.push(`entity_type = $${idx++}`);
      values.push(params.entityType);
    }

    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const query = `
      SELECT
        id,
        entity_type,
        entity_id,
        incident_type,
        severity,
        status,
        detected_at,
        window_start,
        window_end
      FROM incidents
      ${whereClause}
      ORDER BY detected_at DESC
      LIMIT $${idx++}
      OFFSET $${idx++}
    `;

    values.push(params.limit, params.offset);

    const { rows } = await this.client.query(query, values);

    return rows.map((r) => ({
      id: r.id,
      entityType: r.entity_type,
      entityId: r.entity_id,
      incidentType: r.incident_type,
      severity: r.severity,
      status: r.status,
      detectedAt: r.detected_at,
      windowStart: r.window_start,
      windowEnd: r.window_end,
    }));
  }

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
