import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import Appbar from '../../components/Appbar/Appbar'
import { BackButton } from 'react-router-native'
import { NavigationProps } from '../NavigationProps'
import CreateButton from '../../components/CreateButton/CreateButton'

const { height } = Dimensions.get('window')

const style = StyleSheet.create({
    main: {
        height,
        zIndex: 0
    }
})


const Home = ({ goBack }: NavigationProps) => {

    return (
        <View style={style.main}>
            {/* Link android back button to router */}
            <BackButton></BackButton>
            <Appbar title="Record list" goBack={goBack}></Appbar>
            <CreateButton></CreateButton>
        </View>)
}

export default Home;