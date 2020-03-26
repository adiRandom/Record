import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import Appbar from '../../components/Appbar/Appbar'
import { BackButton } from 'react-router-native'
import { NavigationProps } from '../NavigationProps'

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

        </View>)
}

export default Home;