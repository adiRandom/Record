export function convertTimestamp(time: number | undefined) {
    if (!time)
        return "-"
    const seconds = Math.floor(time)
    return `${Math.floor(seconds / 60)}:${seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60}`;
}