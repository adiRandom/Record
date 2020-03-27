import Activity from "../models/Activity";
import AsyncStorage  from "@react-native-community/async-storage";
import { LAST_ID_KEY } from "../utils/GetNewActivityId";


export async function addActivity(activity: Activity) {
    await AsyncStorage.setItem(`activity-${activity.id}`, JSON.stringify(activity));
}

export async function getAllActivities() {
    const lastId = await AsyncStorage.getItem(LAST_ID_KEY);
    if (lastId === null) {
        return []
    }
    else {
        const max = Number.parseInt(lastId);
        const activityKeys: string[] = [];
        for (let i = 0; i <= max; i++) {
            activityKeys.push(`activity-${i}`);
        }
        return (await AsyncStorage.multiGet(activityKeys)).map(item => JSON.parse(item[1]!!)) as Activity[];
    }
}