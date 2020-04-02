import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import Appbar from '../../components/Appbar/Appbar'
import { BackButton } from 'react-router-native'
import { NavigationProps } from '../NavigationProps'
import CreateButton from '../../components/CreateButton/CreateButton'
import Activity from '../../models/Activity'
import { getAllActivities } from '../../services/Activity'
import Card from '../../components/Card/Card'
import AsyncStorage from '@react-native-community/async-storage'
import { Colors } from '../../assets/style/Theme'
import useTheme from '../../utils/hooks/UseTheme'


const { height } = Dimensions.get('window')

const _style = StyleSheet.create({
    main: {
        height,
        zIndex: 0
    },
    cardList: {
        flexDirection: 'row',
        zIndex: 1,
        justifyContent: 'space-evenly',
    }
})

const darkStyle = StyleSheet.create({
    main: {
        ..._style.main,
        backgroundColor: Colors.backgroundDark
    }
})

const Home = ({ goBack }: NavigationProps) => {

    const [activities, setActivities] = useState([] as Activity[])
    const theme = useTheme()
    const [style, setStyle] = useState(_style);

    useEffect(() => {
        //Update styling
        let newStyle = _style;
        if (theme === "dark")
            newStyle = { ..._style, ...darkStyle as any };

        setStyle(newStyle);
    }, [theme])

    // Fetch activities
    useEffect(() => {
        getAllActivities().then(res => setActivities(res))
    }, [])


    return (
        <View style={style.main}>
            {/* Link android back button to router */}
            <BackButton></BackButton>
            <Appbar title="Record list" goBack={goBack}></Appbar>
            <View style={style.cardList}>
                {activities.map((val: Activity, index: number) => <Card key={index.toString()} activity={val}></Card>)}
            </View>
            <CreateButton></CreateButton>
        </View>)
}

export default Home;