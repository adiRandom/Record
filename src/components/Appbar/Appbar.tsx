import React, { useState } from "react"
import { View, Text, Image, StyleSheet, TouchableNativeFeedback, TouchableOpacity, } from "react-native"
import { Colors } from "../../assets/style/Theme"


type AppbarProps = {
    title: string,
    canGoBack?: boolean,
    goBack?: () => void,
    toggleDropdown?: () => void
}


const style = StyleSheet.create({
    main: {
        backgroundColor: Colors.primary,
        height: 64,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'flex-start',
        zIndex: 1
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
    menuList: {
        position: 'absolute',
        right: 48,
        top: 64,
        elevation: 4,
        backgroundColor: 'white',
        height: 48
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
        fontFamily: "Roboto",
        fontSize: 32,
        lineHeight: 37,
        fontStyle: "normal"
    }
})


const Appbar = ({ title, canGoBack, goBack, toggleDropdown }: AppbarProps) => {

    return (
        <View style={style.main}>
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
                <View style={{ ...style.iconWrapper }}>
                    {/* Button wrapper */}
                    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#fff", true)}
                        onPress={() => {
                            if (toggleDropdown)
                                toggleDropdown();
                        }}>
                        <View>
                            <Image style={style.icon} source={require("../../assets/icons/light/3dots.png")}></Image>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>
        </View >
    )
}


type ThemeDropdownProps = {
    isVisible: boolean,
}
export const ThemeDropdown = ({ isVisible }: ThemeDropdownProps) => {
    if (isVisible)
        // TODO: Style
        return (<View style={style.menuList}>
            <TouchableOpacity>
                {/* TODO: Change text based on teme */}
                <View>
                    <Text style={style.menuItemLabel}>
                        Change to dark theme
                    </Text>
                </View>
            </TouchableOpacity>
        </View>)
    return null;
}

export default Appbar;