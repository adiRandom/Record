import {BehaviorSubject} from "rxjs"

export const Colors = {
    primary: "#69BBD6",
    primaryDark: "#36758A",
    secondary: "#D67E95",
    accent: "#D6CE54",
    backgroundLight: "#ffffff",
    backgroundDark: "#2E454D",
    textInputBorder: "#A5A5A5",
    rippleLight: "#eee",
    cardDark: "#214552"
}

// TODO: Store the theme
export const themeObservable = new BehaviorSubject<"light" | "dark">("light")
