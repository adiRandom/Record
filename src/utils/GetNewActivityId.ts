import { AsyncStorage } from "react-native";


export const LAST_ID_KEY = "last_id"

export default async function getNewActivityId() {
    const lastId = await AsyncStorage.getItem(LAST_ID_KEY);
    if (lastId) {
        const nLastId = Number.parseInt(lastId)
        AsyncStorage.setItem(LAST_ID_KEY, (nLastId + 1).toString());
        return (nLastId + 1).toString();
    }
    else {
        AsyncStorage.setItem(LAST_ID_KEY, "0");
        return "0";
    }
}