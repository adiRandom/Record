import { AsyncStorage } from "react-native";


const LAST_ID_KEY = "last_id"

export default async function getNewActivityId() {
    const lastId = await AsyncStorage.getItem(LAST_ID_KEY);
    if (lastId) {
        AsyncStorage.setItem(LAST_ID_KEY, (Number.parseInt(lastId) + 1).toString());
        return lastId + 1;
    }
    else {
        AsyncStorage.setItem(LAST_ID_KEY, "0");
        return "0";
    }
}