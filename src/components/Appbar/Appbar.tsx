import React, { useState, useEffect } from "react"
import { View, Text, Image, StyleSheet, TouchableNativeFeedback, Dimensions, TouchableWithoutFeedbackBase, TouchableWithoutFeedback, } from "react-native"
import { Colors, themeObservable } from "../../assets/style/Theme"
import useTheme from "../../utils/hooks/UseTheme"
import { Menu, DefaultTheme } from "react-native-paper"

const { width, height } = Dimensions.get('screen')

type AppbarProps = {
    title: string | undefined,
    canGoBack?: boolean,
    goBack?: () => void,
}


const style = StyleSheet.create({
    main: {
        height: 64,
        zIndex: 10,
        width,
        position: "absolute",
        top: 0,
        left: 0
    },
    appbar: {
        backgroundColor: Colors.primary,
        height: 64,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'flex-start',
        width
    },
    iconWrapper: {
        height: 32,
        width: 32,
        marginHorizontal: 16,
        alignItems: "center",
    },
    icon: {
        height: 32,
        width: 32,
    },
    menu: {
        position: 'absolute',
        right: 16
    },
    title: {
        color: "white",
        fontFamily: "Roboto",
        fontSize: 32,
        lineHeight: 37,
        fontStyle: "normal",
        // width:width-128
    }
})



const Appbar = ({ title, canGoBack, goBack }: AppbarProps) => {

    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const theme = useTheme();
    const [dropdownBackground, setDropdownBackground] = useState("white")

    const light3Dots = require("../../assets/icons/light/3dots.png");
    const dark3Dots = require("../../assets/icons/dark/3dots.png");
    const lightBack = require("../../assets/icons/light/back.png")
    const darkBack = require("../../assets/icons/dark/back.png")

    function changeTheme() {
        themeObservable.next(theme === 'dark' ? "light" : "dark");
        setIsDropdownVisible(false)
    }

    useEffect(() => {
        let background = "white"
        if (theme === "dark")
            background = Colors.backgroundDark
        setDropdownBackground(background)
    }, [theme])

    function breakText(val?: string) {
        if (val)
            if (val.length > 12)
                return val.substring(0, 12) + "..."
        return val
    }



    return (
        <View style={style.main}>
            <View style={style.appbar}>
                {/* Back button wrapper */}
                {canGoBack && <View style={style.iconWrapper}>
                    <TouchableNativeFeedback onPress={() => {
                        if (goBack) {
                            console.log(goBack)
                            goBack();
                        }
                    }} background={TouchableNativeFeedback.Ripple(Colors.rippleLight, true)} style={{ borderRadius: 100 }}>
                        <View>
                            <Image style={style.icon} source={theme === "dark" ? lightBack : darkBack}></Image>
                        </View>
                    </TouchableNativeFeedback>
                </View>}
                {/* Title wrapper */}
                {/* Correct position if no back button */}
                <View style={{ marginLeft: !canGoBack ? 64 : 0, width: width - 128 }}>
                    <Text style={{ ...style.title, color: theme !== "dark" ? "black" : "white" }}>
                        {breakText(title)}
                    </Text>
                </View>
                {/* Options menu */}
                <View style={style.menu}>
                    <Menu visible={isDropdownVisible}
                        anchor={
                            <TouchableNativeFeedback
                                background={TouchableNativeFeedback.Ripple(Colors.rippleLight)} onPress={_ => setIsDropdownVisible(true)}>
                                <Image style={style.icon} source={theme === "dark" ? light3Dots : dark3Dots}></Image>
                            </TouchableNativeFeedback>
                        }
                        onDismiss={() => setIsDropdownVisible(false)}
                    >
                        <Menu.Item onPress={changeTheme}
                            title={` Change to ${theme === 'dark' ? "light" : "dark"} theme`} />
                    </Menu>
                </View>
            </View>
        </View >
    )
}



export default Appbar;