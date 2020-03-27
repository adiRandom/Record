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

const { height } = Dimensions.get('window')

const style = StyleSheet.create({
    main: {
        height,
        zIndex: 0
    },
    cardList: {
        flexDirection: 'row'
    }
})


const Home = ({ goBack }: NavigationProps) => {

    const [activities, setActivities] = useState([] as Activity[])

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