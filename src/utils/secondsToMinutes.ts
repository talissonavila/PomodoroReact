import { zeroLeft } from "./zero-left";

export function secondsToMinutes(seconds: number): string {

    const _minutes = zeroLeft((seconds / 60) % 60);
    const _seconds = zeroLeft((seconds % 60) % 60);

    return `${_minutes}:${_seconds}`;
}