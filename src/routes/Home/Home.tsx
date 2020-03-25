import React, { useState } from 'react'
import { View } from 'react-native'
import Appbar, { ThemeDropdown } from '../../components/Appbar/Appbar'
import { BackButton } from 'react-router-native'
import { NavigationProps } from '../NavigationProps'

const Home = ({ goBack }: NavigationProps) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    return (
        <View>
            {/* Link android back button to router */}
            <BackButton></BackButton>
            <Appbar toggleDropdown={()=>setIsDropdownVisible(!isDropdownVisible)}  title="Record list" goBack={goBack}></Appbar>
            <ThemeDropdown isVisible={isDropdownVisible} />
        </View>)
}

export default Home;