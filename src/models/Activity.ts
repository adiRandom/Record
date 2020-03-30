import ActivityIcon from "./ActivityIcon";


export default interface Activity {
    name: string,
    icon: ActivityIcon,
    id: string,
    /**
     * Sorted by time record array
     */
    records: Record[]

}

export interface Record {
    time: number,
    date: number
}

export function sortRecordsByTime(a: Record, b: Record) {
    if (a.time < b.time)
        return -1;
    else if (a.time === b.time) {
        if (a.date > b.time)
            return -1;
    }
    return 1;
}