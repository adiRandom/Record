import React, { useState, useEffect } from 'react'
import Activity from '../../models/Activity'
import { View, Image, Text, TouchableNativeFeedback } from 'react-native'
import Appbar from '../../components/Appbar/Appbar'
import getActivityIcon from '../../utils/GetActivityIcon'
import { convertTimestamp } from '../../utils/ConvertTimestamp'
import { Colors } from '../../assets/style/Theme'

type ActivityPropos = {
    goBack: () => void,
    activity: Activity
}

const Activity = ({ goBack, activity }: ActivityPropos) => {
    const [time, setTime] = useState(0);
    const [interval, rSetInterval] = useState(null as any)
    const [timeElapsed, setTimeElapsed] = useState(false)

    useEffect(() => {
        if (timeElapsed) {
            setTime(time + 0.1);
            setTimeElapsed(false)
        }
    }, [timeElapsed])

    function start() {
        const stopwatch = setInterval(() => {
            setTimeElapsed(true);
        }, 100)
        rSetInterval(stopwatch);
    }

    function pause() {
        clearImmediate(interval);
    }

    function stop() {
        // TODO: Add modal

        clearImmediate(interval);
        setTime(0);
        setInterval(null)
    }
    return (
        <View>
            <Appbar title={activity.name.toUpperCase()} goBack={goBack} canGoBack={true}></Appbar>
            <View>
                <Image source={getActivityIcon(activity.icon.name).file}></Image>
            </View>
            <Text>
                Go set a new record
            </Text>
            <Text>
                {convertTimestamp(time)}
            </Text>
            {interval === null && <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(Colors.rippleLight)} onPress={start}>
                <View>
                    <Image source={require("../../assets/icons/light/start.png")}></Image>
                </View>
            </TouchableNativeFeedback>}
            {interval !== null &&
                <View>
                    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(Colors.rippleLight)} onPress={start}>
                        <View>
                            <Image source={require("../../assets/icons/light/pause.png")}></Image>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(Colors.rippleLight)} onPress={start}>
                        <View>
                            <Image source={require("../../assets/icons/light/stop.png")}></Image>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            }
            {/* TODO: Change text color on press */}
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(Colors.rippleLight)}>
                <View>
                    <Text>SEE HISTORY</Text>
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}