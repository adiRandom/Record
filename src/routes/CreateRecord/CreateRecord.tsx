import React from 'react'
import { NavigationProps } from '../NavigationProps'
import Appbar from '../../components/Appbar/Appbar'
import { View } from 'react-native'

const CreateRecord = ({goBack}:NavigationProps)=>{
    return(
        <View>
            <Appbar goBack={goBack} canGoBack title={"Add a record"}></Appbar>
            <View>
                
            </View>
        </View>
    )
}