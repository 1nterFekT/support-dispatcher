import type { Request } from "../models/Request.ts";

export function formatRequest(request: Request): string {
    return `${request.id}(${request.priority})`;
}

export function formatRequests(requests: Request[]): string {
    return requests.map(formatRequest).join(", ");
}
