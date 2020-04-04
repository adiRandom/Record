import React, { useState, useEffect } from 'react'
import { NavigationProps } from '../NavigationProps'
import Appbar from '../../components/Appbar/Appbar'
import Activity from '../../models/Activity'
import { getActivity } from '../../services/Activity'
import { useParams } from 'react-router-native'
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native'
import { convertTimestamp } from '../../utils/ConvertTimestamp'
import getDate from '../../utils/GetDate'
import { Colors } from '../../assets/style/Theme'
import useTheme from '../../utils/hooks/UseTheme'

const { width, height } = Dimensions.get('screen')

const _style = StyleSheet.create({
    main: {
        flexDirection: 'column',
        width,
        height
    },
    top: {
        marginTop: 24,
        height: 160,
        borderBottomColor: Colors.primary,
        borderBottomWidth: 0.5,
        flexDirection: 'column',
        alignItems: 'center'
    },
    title: {
        fontFamily: 'Roboto-Bold',
        color: Colors.secondary,
        fontSize: 60,
        marginBottom: 32,
    },
    high: {
        fontFamily: 'Roboto-Light',
        color: Colors.primary,
        fontSize: 36,
    },
    listView: {
        paddingTop: 64,
        marginHorizontal: 32
    },
    listItem: {
        fontSize: 18,
        fontFamily: 'Roboto-Light',
        marginBottom: 16
    }
})

const darkStyle = StyleSheet.create({
    main: {
        ..._style.main,
        backgroundColor: Colors.backgroundDark
    },
    listItem:{
        ..._style.listItem,
        color:"white"
    }
})

const History = ({ history }: NavigationProps) => {

    const [activity, setAtivity] = useState(null as Activity | null)
    const { id } = useParams()
    const theme = useTheme()
    const [style, setStyle] = useState(_style);

    useEffect(() => {
        //Update styling
        let newStyle = _style;
        if (theme === "dark")
            newStyle = { ..._style, ...darkStyle as any };

        setStyle(newStyle);
    }, [theme])

    useEffect(() => {
        //Fetch activity
        getActivity(id!!).then(res => setAtivity(res))
    }, [])

    return (
        <View style={style.main}>
            <Appbar canGoBack goBack={history.goBack} title={activity?.name} />
            <View style={{marginTop:64}}>
                <View style={style.top}>
                    <Text style={style.title}>History</Text>
                    <Text style={style.high}>{`Current high: ${convertTimestamp(activity?.records[0]?.time)}`}</Text>
                </View>
                <View style={style.listView}>
                    <FlatList data={activity?.records} renderItem={({ item, index }) => {
                        return (
                            <Text style={style.listItem}>{`${index + 1}.  ${convertTimestamp(item.time)} - ${getDate(item.date)}`}</Text>
                        )
                    }
                    }></FlatList>
                </View>
            </View >
        </View>
    )
}

export default History