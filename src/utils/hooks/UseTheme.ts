import { useEffect, useState } from "react";
import { themeObservable } from "../../assets/style/Theme";

export default function useTheme(): "light" | "dark" {
    //Subscribe to the observable

    const [theme, setTheme] = useState("light" as "light" | "dark")

    useEffect(() => {
        const sub = themeObservable.subscribe({
            next: val =>  setTheme(val)
        })
        return ()=>sub.unsubscribe();
    })

    return theme;
}