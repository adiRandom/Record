import ActivityIcon from "./ActivityIcon";
import getActivityIcon from "../utils/GetActivityIcon";


export default interface Activity {
    name: string,
    icon: ActivityIcon,
    id: string,
    /**
     * Sorted by time record array
     */
    records: Record[]
    isRecordHighest:boolean
}


export interface Record {
    time: number,
    date: number
}

export function sortRecordsByTimeLowest(a: Record, b: Record) {
    if (a.time < b.time)
        return -1;
    else if (a.time === b.time) {
        if (a.date > b.time)
            return -1;
    }
    return 1;
}

export function sortRecordsByTimeHighest(a: Record, b: Record) {
    if (a.time > b.time)
        return -1;
    else if (a.time === b.time) {
        if (a.date > b.time)
            return -1;
    }
    return 1;
}


