export interface requestLogEvents {
    requestId: string;
    occurredAt: Date;
    method: string;
    path: string;
    statusCode: number;
    latencyMs: number;
    ipHash: string;
    
    userId: string|null;
}
