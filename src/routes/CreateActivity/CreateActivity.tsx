import React, { useEffect, useState } from 'react'
import { View, Dimensions, Image, TextInput, TouchableNativeFeedback, StyleSheet, KeyboardAvoidingView } from 'react-native'
import Appbar from '../../components/Appbar/Appbar'
import { NavigationProps } from '../NavigationProps'
import GestureRecognizer from 'react-native-swipe-gestures'
import Activities from '../../assets/icons/activity/Activities'
import getActivityIcon from '../../utils/GetActivityIcon'
import { Colors } from '../../assets/style/Theme'

const { height, width } = Dimensions.get('screen')

const style = StyleSheet.create({
    main: {
        height,
        width,
        flexDirection: 'column',
    },
    iconSelecter: {
        width,
        height: 196,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary,
        marginTop: 32
    },
    icon: {
        height: 164,
        width: 164,
    },
    saveButton: {
        width: 96,
        height: 96,
        borderRadius: 100,
        backgroundColor: Colors.secondary,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: 'center',
        position: 'absolute',
        bottom: 96 + 32
    },
    saveIcon: {
        height: 54,
        width: 54,
    },
    textInputWrapper: {
        borderBottomColor: Colors.textInputBorder,
        width: 288,
        borderBottomWidth:1,
        alignSelf: 'center',
        marginTop: 96,
        height: 48,
    },
    textInput: {
        fontWeight: "300",
        fontSize: 14,
        margin: 0
    }
})


const CreateActivity = ({ goBack }: NavigationProps) => {

    const [icons, setIcons] = useState([] as any[])
    const [currentIconIndex, setCurrentIconIndex] = useState(0)
    const [name, setName] = useState("")

    // Load all icons
    useEffect(() => {
        const temp = []
        for (let icon of Activities)
            temp.push(getActivityIcon(icon));

        setIcons(temp)
    }, [])

    function nextIcon() {
        let newIndex = currentIconIndex + 1;
        if (newIndex === icons.length)
            newIndex = 0;
        setCurrentIconIndex(newIndex)
    }

    function lastIcon() {
        let newIndex = currentIconIndex - 1;
        if (newIndex === -1)
            newIndex = icons.length - 1;
        setCurrentIconIndex(newIndex)
    }

    return (
        <View style={style.main}>
            <Appbar title="New activity" canGoBack goBack={goBack} />
            <View style={style.iconSelecter}>
                <GestureRecognizer onSwipeLeft={nextIcon} onSwipeRight={lastIcon}>
                    <Image style={style.icon} source={icons[currentIconIndex]}></Image>
                </GestureRecognizer>
            </View>
            <View style={style.textInputWrapper}>
                <TextInput style={style.textInput} placeholder={"Give this activity a name"} value={name} onChangeText={setName}></TextInput>
            </View>
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#fff", true)}>
                <View style={style.saveButton}>
                    <Image style={style.saveIcon} source={require("../../assets/icons/light/save.png")}></Image>
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}


export default CreateActivity;