import React, { useEffect, useState } from 'react'
import { View, Dimensions, Image, TextInput, TouchableNativeFeedback, StyleSheet, KeyboardAvoidingView, Text, TouchableWithoutFeedback } from 'react-native'
import Appbar from '../../components/Appbar/Appbar'
import { NavigationProps } from '../NavigationProps'
import GestureRecognizer from 'react-native-swipe-gestures'
import Activities from '../../assets/icons/activity/Activities'
import getActivityIcon from '../../utils/GetActivityIcon'
import { Colors } from '../../assets/style/Theme'
import ActivityIcon from '../../models/ActivityIcon'
import Activity from '../../models/Activity'
import getNewActivityId from '../../utils/GetNewActivityId'
import { addActivity } from '../../services/Activity'
import { Redirect } from 'react-router-native'
import Routes from '../Routes'

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
        backgroundColor: Colors.primary,
        marginTop: 32
    },
    icon: {
        height: 164,
        width: 164,
    },
    iconWrapper: {
        width,
        height: 196,
        alignItems: 'center'
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
        borderBottomWidth: 1,
        alignSelf: 'center',
        marginTop: 96,
        height: 48,
    },
    textInput: {
        fontWeight: "300",
        fontSize: 14,
        margin: 0
    },
    hintWrapper: {
        alignSelf: 'center',
        marginTop: 4
    },
    hint: {
        fontSize: 12,
        fontFamily: "Roboto-Thin",
        fontStyle: 'normal',
    }
})


const CreateActivity = ({ goBack }: NavigationProps) => {


    const [icons, setIcons] = useState([] as Array<ActivityIcon>)
    const [currentIconIndex, setCurrentIconIndex] = useState(0)
    const [name, setName] = useState("")
    const [saved, setSaved] = useState(false)

    // Load all icons
    useEffect(() => {
        const temp = [] as Array<ActivityIcon>
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

    async function createActivity() {
        const newActivity: Activity = {
            id: await getNewActivityId(),
            name,
            icon: icons[currentIconIndex],
            records:[]
        }

        addActivity(newActivity);
        setSaved(true)
    }

    if (saved)
        return <Redirect to={Routes.HOME}></Redirect>
    return (
        // TODO: Add touchable opacity to dismiss keyboard

        <View style={style.main}>
            <Appbar title="New activity" canGoBack goBack={goBack} />
            <View style={style.iconSelecter}>
                <GestureRecognizer onSwipeLeft={nextIcon} onSwipeRight={lastIcon}>
                    <TouchableWithoutFeedback>
                        <View style={style.iconWrapper}>
                            <Image style={style.icon} source={icons[currentIconIndex]?.file}></Image>
                        </View>
                    </TouchableWithoutFeedback>
                </GestureRecognizer>
            </View>
            <View style={style.hintWrapper}>
                <Text style={style.hint}>Swipe to cycle through the icons</Text>
            </View>
            {/* TODO: Fix */}
            <View style={style.textInputWrapper}>
                <TextInput style={style.textInput} placeholder={"Give this activity a name"} value={name} onChangeText={setName}></TextInput>
            </View>
            <TouchableNativeFeedback onPress={createActivity} background={TouchableNativeFeedback.Ripple(Colors.rippleLight, true)}>
                <View style={style.saveButton}>
                    <Image style={style.saveIcon} source={require("../../assets/icons/light/save.png")}></Image>
                </View>
            </TouchableNativeFeedback>
        </View>

    )
}


export default CreateActivity;