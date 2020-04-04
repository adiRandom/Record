import React, { useState } from 'react'
import { Redirect } from 'react-router-native'
import { View, TouchableNativeFeedback, Image, Text, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native'
import { Colors } from '../../assets/style/Theme'
import Routes from "../../routes/Routes"
import useTheme from '../../utils/hooks/UseTheme'

const { height, width } = Dimensions.get('screen')

const style = StyleSheet.create({
    main: {
        flexDirection: 'column-reverse',
        position: 'absolute',
        bottom: 64,
        right: 32,
        zIndex: 10,
        alignItems: 'flex-end',
    },
    toggleButton: {
        height: 64,
        width: 64,
        borderRadius: 100,
        backgroundColor: Colors.accent,
        justifyContent: 'center',
        alignItems: 'center'
    },
    toggleButtonIcon: {
        height: 36,
        width: 36
    },
    hiddenLabel: {
        fontSize: 16,
        fontFamily: 'Roboto',
        fontWeight: '300'
    },
    hiddenContainer: {
        marginRight: 8,
        flexDirection: 'column-reverse',
        alignItems: 'flex-end',
        height,
        width,
    },
    hidden: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    hiddenLabelWrapper: {
        marginRight: 16
    },
    hiddenButton: {
        height: 48,
        width: 48,
        borderRadius: 100,
        backgroundColor: Colors.secondary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    hiddenButtonIcon: {
        height: 24,
        width: 24
    }
})

const CreateButton = () => {
    const [redirect, setRedirect] = useState("")
    const [showHidden, setShowHidden] = useState(false)

    const createLight = require("../../assets/icons/light/create.png")
    const createDark = require("../../assets/icons/dark/create.png")

    const theme = useTheme();

    if (redirect !== "")
        return (<Redirect push to={redirect} />)
    else
        return <View style={style.main}>
            <View style={style.toggleButton}>
                <TouchableNativeFeedback onPress={() => setRedirect(Routes.ADD_ACTIVITY)}
                    background={TouchableNativeFeedback.Ripple(Colors.rippleLight, true)}>
                    <View style={{ width: 64, alignItems: 'center' }}>
                        <Image style={style.toggleButtonIcon} source={theme === "dark" ? createLight:createDark}></Image>
                    </View>
                </TouchableNativeFeedback>
            </View>
            {showHidden &&
                // TODO: Fix dismiss area
                <TouchableWithoutFeedback onPress={() => setShowHidden(false)}>
                    <View style={style.hiddenContainer}>
                        <View style={{
                            ...style.hidden,
                            display: showHidden ? "flex" : "none"
                        }}>
                            <View style={style.hiddenLabelWrapper}>
                                <Text style={style.hiddenLabel}>Register a record</Text>
                            </View>
                            <View style={style.hiddenButton}>
                                <TouchableNativeFeedback onPress={() => setRedirect(Routes.ADD_RECORD)}
                                    background={TouchableNativeFeedback.Ripple(Colors.rippleLight, true)}>
                                    <View style={{ width: 64, alignItems: 'center' }}>
                                        <Image style={style.hiddenButtonIcon} source={require("../../assets/icons/light/stopwatch.png")}></Image>
                                    </View>
                                </TouchableNativeFeedback>
                            </View>
                        </View>
                        <View style={{
                            ...style.hidden,
                            display: showHidden ? "flex" : "none"
                        }}>
                            <View style={style.hiddenLabelWrapper}>
                                <Text style={style.hiddenLabel}>New activity</Text>
                            </View>
                            <View style={style.hiddenButton}>
                                <TouchableNativeFeedback onPress={() => setRedirect(Routes.ADD_ACTIVITY)}
                                    background={TouchableNativeFeedback.Ripple(Colors.rippleLight, true)}>
                                    <View style={{ width: 64, alignItems: 'center' }}>
                                        <Image style={style.hiddenButtonIcon} source={require("../../assets/icons/light/create.png")}></Image>
                                    </View>
                                </TouchableNativeFeedback>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>}
        </View>
}

export default CreateButton;