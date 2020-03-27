import Activity from "../models/Activity";
import { AsyncStorage } from "react-native";


export default async function addActivity(activity: Activity) {
    await AsyncStorage.setItem(`activity-${activity.id}`, JSON.stringify(activity));
}