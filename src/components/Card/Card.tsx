import React, { useState, useEffect } from 'react'
import Activity from '../../models/Activity'
import { View, Image, Text, TouchableNativeFeedback, StyleSheet } from 'react-native'
import { convertTimestamp } from '../../utils/ConvertTimestamp'
import { Colors } from '../../assets/style/Theme'
import getActivityIcon from '../../utils/GetActivityIcon'
import ActivityIcon from '../../models/ActivityIcon'

type CardProps = {
    activity: Activity,
    key?: string
}

const style = StyleSheet.create({
    main: {
        // TODO: Fix elevation
        height: 160,
        width: 160,
        elevation: 8,
        flexDirection: 'column',
        alignContent: 'flex-start',
        marginVertical: 16,
        marginHorizontal: 16
    },
    iconContainer: {
        height: 80,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        height: 64,
        width: 64,
    },
    textContainer: {
        flexDirection: 'column',
        alignContent: 'flex-start',
        paddingLeft: 16
    },
    title: {
        fontFamily: "Roboto-Bold",
        fontSize: 16
    },
    high: {
        fontFamily: "Roboto-Light",
        fontSize: 8
    }
})

const Card = ({ activity }: CardProps) => {

    const [icon, setIcon] = useState(null as ActivityIcon | null)

    // TODO: Fix icon not showing
    // Get icon
    useEffect(() => {
        setIcon(getActivityIcon(activity.icon.name))
    })

    return (
        <View style={style.main}>
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#fff")}>
                <View >
                    <View style={style.iconContainer}>
                        <Image style={style.icon} source={icon?.file}></Image>
                    </View>
                    <View style={style.textContainer}>
                        <Text style={style.title}>
                            {activity.name}
                        </Text>
                        {activity.high && <Text style={style.high}>
                            {`Current high: ${convertTimestamp(activity.high)}`}
                        </Text>}
                    </View>
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}

export default Card;