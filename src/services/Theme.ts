import { themeObservable } from "../assets/style/Theme";
import AsyncStorage from "@react-native-community/async-storage";

export default function startObserveTheme() {
    themeObservable.subscribe(val => {
        AsyncStorage.setItem("theme", val)
    })
}


export async function getPreferedTheme() {
    const theme: "light" | "dark" | null = await AsyncStorage.getItem("theme") as "light" | "dark" | null;
    if (!theme)
        return "light"
    return theme;
}