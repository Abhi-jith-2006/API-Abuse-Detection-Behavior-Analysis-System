export interface RequestLogEvents {
  requestId: string;
  occurredAt: string;
  timestamp: string,

  method: string;
  path: string;
  statusCode: number;
  responseTimeMs: number;

  ip: string;
  userAgent?: string;

  userId: string | null;
  apiKeyId: string | null;
}
