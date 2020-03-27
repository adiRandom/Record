import React, { useState } from "react"
import { View, Text, Image, StyleSheet, TouchableNativeFeedback, } from "react-native"
import { Colors } from "../../assets/style/Theme"


type AppbarProps = {
    title: string,
    canGoBack?: boolean,
    goBack?: () => void,
}


const style = StyleSheet.create({
    main: {
        height: 64,
        zIndex: 10
    },
    appbar: {
        backgroundColor: Colors.primary,
        height: 64,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'flex-start',
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
        right: 8
    },
    menuList: {
        position: 'absolute',
        right: 8,
        top: 8,
        elevation: 4,
        backgroundColor: 'white',
        height: 48,
        zIndex: 2,
    },
    menuItem: {
        height: 48,
        padding: 16,
        justifyContent: "center"
    },
    menuItemLabel: {
        fontSize: 18,
        fontFamily: 'Roboto',
        fontWeight: '300',
        fontStyle: 'normal'
    },
    title: {
        color: "white",
        fontWeight: "500",
        // TODO: Fix fonts
        fontFamily: "Roboto",
        fontSize: 32,
        lineHeight: 37,
        fontStyle: "normal"
    }
})

type ThemeDropdownProps = {
    isVisible: boolean,
}

export const ThemeDropdown = ({ isVisible }: ThemeDropdownProps) => {
    if (isVisible)
        // TODO: Add dismiss toucable fullscreen
        return (<View style={style.menuList}>
            <TouchableNativeFeedback>
                {/* TODO: Change text based on teme */}
                <View style={style.menuItem}>
                    <Text style={style.menuItemLabel}>
                        Change to dark theme
                    </Text>
                </View>
            </TouchableNativeFeedback>
        </View>)
    return null;
}


const Appbar = ({ title, canGoBack, goBack }: AppbarProps) => {

    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    return (
        <View style={style.main}>
            <View style={style.appbar}>
                {/* Back button wrapper */}
                {canGoBack && <View style={style.iconWrapper}>
                    {/* TODO:Fix ripple round */}
                    <TouchableNativeFeedback onPress={() => {
                        if (goBack)
                            goBack();
                        // TODO: Add roipple color to a variable if needed to be adjusted with theme
                    }} background={TouchableNativeFeedback.Ripple("#fff", true)} style={{ borderRadius: 100 }}>
                        <View>
                            <Image style={style.icon} source={require("../../assets/icons/light/back.png")}></Image>
                        </View>
                    </TouchableNativeFeedback>
                </View>}
                {/* Title wrapper */}
                {/* Correct position if no back button */}
                <View style={{ marginLeft: !canGoBack ? 64 : 0 }}>
                    <Text style={style.title}>
                        {title}
                    </Text>
                </View>
                {/* Options menu */}
                <View style={style.menu}>
                    <View style={{ ...style.iconWrapper, marginRight: 0 }}>
                        {/* Button wrapper */}
                        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#fff", true)}
                            onPress={() => setIsDropdownVisible(!isDropdownVisible)}>
                            <View>
                                <Image style={style.icon} source={require("../../assets/icons/light/3dots.png")}></Image>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
            </View>
            <ThemeDropdown isVisible={isDropdownVisible} />
        </View >
    )
}



export default Appbar;