export function convertTimestamp(time: number) {
    return `${Math.floor(time / 2)}:${time % 60}`;
}