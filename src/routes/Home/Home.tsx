import React from 'react'
import { View } from 'react-native'
import Appbar from '../../components/Appbar/Appbar'
import { BackButton } from 'react-router-native'
import { NavigationProps } from '../NavigationProps'

const Home = ({goBack}:NavigationProps) => {
    return (
        <View>
            {/* Link android back button to router */}
            <BackButton></BackButton>
            <Appbar title="Record list" goBack={goBack}></Appbar>
        </View>)
}

export default Home;