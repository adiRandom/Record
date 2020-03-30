import React, { useState, useEffect } from 'react'
import Activity from '../../models/Activity'
import { View, Image, Text, TouchableNativeFeedback, StyleSheet } from 'react-native'
import { convertTimestamp } from '../../utils/ConvertTimestamp'
import { Colors } from '../../assets/style/Theme'
import getActivityIcon from '../../utils/GetActivityIcon'
import ActivityIcon from '../../models/ActivityIcon'
import Routes from '../../routes/Routes'
import { Redirect } from 'react-router-native'

type CardProps = {
    activity: Activity,
    key?: string
}

const style = StyleSheet.create({
    main: {
        height: 160,
        width: 160,
        flexDirection: 'column',
        alignContent: 'flex-start',
        marginVertical: 16,
        backgroundColor: 'white',
        elevation: 4
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
        fontSize: 12
    }
})

const Card = ({ activity }: CardProps) => {

    const [icon, setIcon] = useState(null as ActivityIcon | null)
    const [redirect, setRedirect] = useState("")

    // Get icon
    useEffect(() => {
        setIcon(getActivityIcon(activity.icon.name))
    }, [])

    function goToActivity() {
        setRedirect(Routes.ACTIVITY(activity.id))
    }

    if (redirect !== "")
        return <Redirect to={redirect} />

    return (

        <View style={style.main}>
            <TouchableNativeFeedback onPress={goToActivity} background={TouchableNativeFeedback.Ripple(Colors.rippleLight, false)}>
                <View style={{
                    height: 160,
                    width: 160,
                    position: "absolute",
                    zIndex: 2
                }}>
                </View>
            </TouchableNativeFeedback>
            <View style={{ flex: 1 }}>
                <View style={style.iconContainer}>
                    <Image style={style.icon} source={icon?.file}></Image>
                </View>
                <View style={style.textContainer}>
                    <Text style={style.title}>
                        {activity.name}
                    </Text>
                    {activity.records[0] && <Text style={style.high}>
                        {`Current high: ${convertTimestamp(activity.records[0].time)}`}
                    </Text>}
                </View>
            </View>
        </View >

    )
}

export default Card;