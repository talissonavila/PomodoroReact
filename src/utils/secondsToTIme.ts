import { zeroLeft } from "./zero-left";

export function secondsToTime(seconds: number): string {
    
    const _hours = zeroLeft((seconds / 3600));
    const _minutes = zeroLeft((seconds / 60) % 60);
    const _seconds = zeroLeft((seconds % 60) % 60);

    return `${_hours}h ${_minutes}m ${_seconds}s`;
}