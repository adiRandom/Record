export function convertTimestamp(time: number) {
    const seconds = Math.floor(time)
    return `${Math.floor(seconds / 2)}:${seconds % 60<10?`0${seconds%60}`:seconds%60}`;
}