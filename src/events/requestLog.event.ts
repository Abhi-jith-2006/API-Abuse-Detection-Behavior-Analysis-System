export interface requestLogEvents {
    eventId: string;
    occuredAt: Date;
    method: string;
    path: string;
    statusCode: number;
    latencyMs: number;
    ipHash: string;
    
    userId: string|null;
    apiKeyId: string|null;
}