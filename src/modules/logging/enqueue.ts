import {requestLogEvents} from "../../events/requestLog.event";
import { createRequestLogQueue } from "../../infrastructure/redis/queues";

const requestLogQueue = createRequestLogQueue();

export function enqueueRequestLog(event: requestLogEvents): void {
    requestLogQueue.add("request-log" , event).catch(() => {
        
    })
}