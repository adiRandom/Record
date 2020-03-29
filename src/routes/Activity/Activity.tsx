import React, { useState, useEffect } from 'react'
import ActivityModel from '../../models/Activity'
import { View, Image, Text, TouchableNativeFeedback, StyleSheet, Dimensions, TouchableOpacity, Modal } from 'react-native'
import Appbar from '../../components/Appbar/Appbar'
import getActivityIcon from '../../utils/GetActivityIcon'
import { convertTimestamp } from '../../utils/ConvertTimestamp'
import { Colors } from '../../assets/style/Theme'
import { getActivity } from '../../services/Activity'
import { useParams } from 'react-router-native'

const { height, width } = Dimensions.get('screen')

const style = StyleSheet.create({
    main: {
        height,
        width,
        flexDirection: 'column',
    },
    iconContainer: {
        width,
        height: 196,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:Colors.primary,
        marginTop:24,
        marginBottom:32
    },
    icon: {
        height: 164,
        width: 164
    },
    header: {
        fontFamily: "Roboto-light",
        fontSize: 32,
        marginBottom:16
    },
    time: {
        fontFamily: "Roboto-light",
        fontSize: 60,
        color: Colors.secondary
    },
    controlButton: {
        height: 72,
        width: 72,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        marginTop:24,
        marginBottom:24
    },
    buttonIcon: {
        width: 32,
        height: 32
    },
    startButton: {
        backgroundColor: Colors.secondary
    },
    stopButton: {
        backgroundColor: Colors.secondary
    },
    pauseButton: {
        backgroundColor: Colors.accent
    },
    historyButton: {
        height: 48,
        width: 216,
        backgroundColor: Colors.primary,
        borderRadius: 37,
        alignItems:'center',
        justifyContent:'center'
    },
    historyButtonLabel: {
        color: 'white',
        fontFamily: 'Roboto-bold',
        fontSize: 24
    },
    buttonContainer: {
        flexBasis: 'row',
        justifyContent: 'space-evenly',
    },
    modalMain: {
        height,
        width,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalContent: {
        flexDirection: 'column',
    },
    modalTitle: {
        fontSize: 40,
        fontFamily: 'Roboto-bold',
        color: 'white'
    },
    modalTitleContainerRecord: {
        flexDirection: 'column',
        alignContent: 'center'
    },
    modalTime: {
        fontFamily: 'Roboto',
        fontSize: 72,
        color: Colors.primary
    },
    modalOk: {
        fontSize: 36,
        fontFamily: 'Roboto-bold',
        color: Colors.secondary
    }
})


type ActivityPropos = {
    goBack: () => void,
}

const Activity = ({ goBack }: ActivityPropos) => {
    const [time, setTime] = useState(0);
    const [activity, setActivity] = useState(null as ActivityModel  | null)
    const [interval, rSetInterval] = useState(null as any)
    const [timeElapsed, setTimeElapsed] = useState(false)
    const [isRecord, setIsRecord] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const { id } = useParams()

    // Effect handling stopwatch
    useEffect(() => {
        if (timeElapsed) {
            setTime(time + 0.1);
            setTimeElapsed(false)
        }
    }, [timeElapsed])

    //Get activity by ID
    useEffect(() => {
        getActivity(id!!).then(res => setActivity(res))
    }, [])

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
        // TOOD: Check if it is record
        clearImmediate(interval);
        setShowModal(true)
        setInterval(null)
    }

    function dismissModal() {
        setShowModal(false);
        setTime(0)
    }

    return (
        <View style={style.main}>
            {/* TODO: If it is a new record, make the time shake */}
            <Modal animated animationType={"fade"} visible={showModal}>
                <View style={style.modalMain}>
                    <View style={style.modalContent}>
                        {isRecord &&
                            <View style={style.modalTitleContainerRecord}>
                                <Text style={style.modalTitle}>CONGRATULATIONS</Text>
                                <Text style={style.modalTitle}>A NEW RECORD</Text>
                            </View>
                        }
                        {!isRecord && <Text style={style.modalTitle}>YOU JUST GOT:</Text>}
                        <Text style={style.modalTime}>{convertTimestamp(time)}</Text>
                        <TouchableOpacity onPress={dismissModal}>
                            <Text style={style.modalOk}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Appbar title={activity?.name.toUpperCase()} goBack={goBack} canGoBack={true}></Appbar>
            <View style={style.iconContainer}>
                <Image style={style.icon} source={getActivityIcon(activity?.icon.name).file}></Image>
            </View>
            <View style={{
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Text style={style.header}>
                    Go set a new record
            </Text>
                <Text style={style.time}>
                    {convertTimestamp(time)}
                </Text>
                {interval === null && <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(Colors.rippleLight)} onPress={start}>
                    <View style={{ ...style.controlButton, ...style.startButton }}>
                        <Image source={require("../../assets/icons/light/start.png")}></Image>
                    </View>
                </TouchableNativeFeedback>}
                {interval !== null &&
                    <View style={style.buttonContainer}>
                        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(Colors.rippleLight)} onPress={pause}>
                            <View style={{ ...style.controlButton, ...style.pauseButton }}>
                                <Image source={require("../../assets/icons/light/pause.png")}></Image>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(Colors.rippleLight)} onPress={stop}>
                            <View style={{ ...style.controlButton, ...style.stopButton }}>
                                <Image source={require("../../assets/icons/light/stop.png")}></Image>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                }
                {/* TODO: Change text color on press */}
                <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(Colors.rippleLight)}>
                    <View style={style.historyButton}>
                        <Text style={style.historyButtonLabel}>SEE HISTORY</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        </View>
    )
}

export default Activity;