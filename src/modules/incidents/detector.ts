

export interface RequestMetric5m {
  apiKey: string;
  windowStart: Date;
  windowEnd: Date;
  requestCount: number;
  errorCount: number;
  avgLatencyMs: number;
}



export type IncidentSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface DetectedIncident {
  entityType: 'api_key';
  entityId: string;

  incidentType: 'HIGH_REQUEST_RATE';
  severity: IncidentSeverity;

  windowStart: Date;
  windowEnd: Date;

  metricSnapshot: {
    requestCount: number;
    errorCount: number;
    avgLatencyMs: number;
  };
}


const HIGH_REQUEST_RATE_THRESHOLD = 3000;



export function detectIncidents(
  metric: RequestMetric5m
): DetectedIncident[] {
  const incidents: DetectedIncident[] = [];

  if (metric.requestCount > HIGH_REQUEST_RATE_THRESHOLD) {
    incidents.push({
      entityType: 'api_key',
      entityId: metric.apiKey,

      incidentType: 'HIGH_REQUEST_RATE',
      severity: 'high',

      windowStart: metric.windowStart,
      windowEnd: metric.windowEnd,

      metricSnapshot: {
        requestCount: metric.requestCount,
        errorCount: metric.errorCount,
        avgLatencyMs: metric.avgLatencyMs
      }
    });
  }

  return incidents;
}
