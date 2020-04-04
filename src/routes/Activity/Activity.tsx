import React, { useState, useEffect } from 'react'
import ActivityModel, { Record } from '../../models/Activity'
import { View, Image, Text, TouchableNativeFeedback, StyleSheet, Dimensions, TouchableOpacity, Modal, Animated } from 'react-native'
import Appbar from '../../components/Appbar/Appbar'
import getActivityIcon from '../../utils/GetActivityIcon'
import { convertTimestamp } from '../../utils/ConvertTimestamp'
import { Colors } from '../../assets/style/Theme'
import { getActivity, addRecordToActivity } from '../../services/Activity'
import { useParams, Redirect } from 'react-router-native'
import Routes from '../Routes'
import useTheme from '../../utils/hooks/UseTheme'
import { NavigationProps } from '../NavigationProps'

const { height, width } = Dimensions.get('screen')

const _style = StyleSheet.create({
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
        backgroundColor: Colors.primary,
        marginTop: 24,
        marginBottom: 32
    },
    icon: {
        height: 164,
        width: 164
    },
    header: {
        fontFamily: "Roboto-Ligh",
        fontSize: 32,
        marginBottom: 16
    },
    time: {
        fontFamily: "Roboto-Ligh",
        fontSize: 60,
        color: Colors.secondary
    },
    controlButton: {
        height: 72,
        width: 72,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 24,
        marginBottom: 24
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
        alignItems: 'center',
        justifyContent: 'center'
    },
    historyButtonLabel: {
        color: Colors.secondary,
        fontFamily: 'Roboto-Bold',
        fontSize: 24
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width
    },
    modalMain: {
        height,
        width,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2
    },
    modalContent: {
        flexDirection: 'column',
        alignItems: "center"
    },
    modalTitle: {
        fontSize: 40,
        fontFamily: 'Roboto-Bold',
        color: 'white'
    },
    modalTitleContainerRecord: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalTime: {
        fontFamily: 'Roboto',
        fontSize: 72,
        color: Colors.primary,
        marginTop: 32
    },
    modalOk: {
        fontSize: 36,
        fontFamily: 'Roboto-Bold',
        color: Colors.secondary,
    },
    modalBakground: {
        height,
        width,
        backgroundColor: 'black',
        zIndex: -1,
        position: 'absolute'
    }
})

const darkStyle = StyleSheet.create({
    main: {
        ..._style.main,
        backgroundColor: Colors.backgroundDark
    },
    header: {
        ..._style.header,
        color: "white"
    }
})


type ActivityPropos = {
    goBack: () => void,
}

const Activity = ({ history }: NavigationProps) => {
    const [time, setTime] = useState(0);
    const [activity, setActivity] = useState(null as ActivityModel | null)
    const [interval, rSetInterval] = useState(null as any)
    const [timeElapsed, setTimeElapsed] = useState(false)
    const [isRecord, setIsRecord] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const { id } = useParams()
    const [redirect, setRedirect] = useState("")
    const theme = useTheme()
    const [style, setStyle] = useState(_style);

    const startLight = require("../../assets/icons/light/start.png")
    const startDark = require("../../assets/icons/dark/start.png")

    const stopLight = require("../../assets/icons/light/stop.png")
    const stopDark = require("../../assets/icons/dark/stop.png")

    const pauseLight = require("../../assets/icons/light/pause.png")
    const pauseDark = require("../../assets/icons/dark/pause.png")


    useEffect(() => {
        //Update styling
        let newStyle = _style;
        if (theme === "dark")
            newStyle = { ..._style, ...darkStyle as any };

        setStyle(newStyle);
    }, [theme])

    // Effect handling stopwatch
    useEffect(() => {
        if (timeElapsed) {
            setTime(time + 0.1);
            setTimeElapsed(false);
        }
    }, [timeElapsed])



    //Get activity by ID
    useEffect(() => {
        getActivity(id!!).then(res => setActivity(res))
    }, [])

    function start() {
        // Continue if it was a pause
        setIsPaused(false)
        const stopwatch = setInterval(() => {
            setTimeElapsed(true);
            // console.log('hey')
        }, 100)
        rSetInterval(stopwatch);
    }

    function pauseOrResume() {
        if (isPaused) {
            start()
        }
        else {
            clearInterval(interval);
            setIsPaused(true);
        }
    }


    function stop() {
        // TOOD: Check if it is record

        const record: Record = {
            time,
            date: Date.now()
        }

        let isNewRecord = false

        if (activity && activity.records[0] && activity.records[0].time > record.time)
            isNewRecord = true;
        addRecordToActivity(activity!!, record).then(updatedActivity => {
            setActivity(updatedActivity)
            setIsRecord(isNewRecord)
            clearInterval(interval);
            setShowModal(true)
            rSetInterval(null)
        });
    }

    function dismissModal() {
        setShowModal(false);
        setTime(0)
    }


    if (redirect !== "")
        return <Redirect push to={redirect} />

    return (
        <View style={style.main}>
            {/* TODO: If it is a new record, make the time shake */}
            <Modal animated animationType={"fade"} visible={showModal}>

                <View style={style.modalMain}>
                    <View style={style.modalBakground}>
                        <Image style={style.modalBakground} source={require("../../assets/images/Background.png")}></Image>
                    </View>
                    <View style={style.modalContent}>
                        {isRecord &&
                            <View style={{ ...style.modalTitleContainerRecord }}>
                                <Text style={style.modalTitle}>CONGRATULATIONS</Text>
                                <Text style={style.modalTitle}>A NEW RECORD</Text>
                            </View>
                        }
                        {!isRecord && <Text style={style.modalTitle}>YOU JUST GOT:</Text>}
                        <Text style={style.modalTime}>{convertTimestamp(time)}</Text>
                        <View style={{ marginTop: 64 }}>
                            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(Colors.secondary)} onPress={dismissModal}>
                                <View style={{ width: 96, alignItems: 'center' }}>
                                    <Text style={style.modalOk}>OK</Text>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    </View>
                </View>
            </Modal>
            <Appbar title={activity?.name.toUpperCase()} goBack={history.goBack} canGoBack={true}></Appbar>
            <View style={{ marginTop: 64 }}>
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
                        {convertTimestamp(time) === "-" ? "0:00" : convertTimestamp(time)}
                    </Text>
                    {interval === null &&
                        <View style={{ ...style.controlButton, ...style.startButton }}>
                            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(Colors.rippleLight, true)} onPress={start}>
                                <View >
                                    <Image source={theme === "dark" ? startLight : startDark}></Image>
                                </View>
                            </TouchableNativeFeedback>
                        </View>}
                    {interval !== null &&
                        <View style={style.buttonContainer}>
                            <View style={{ ...style.controlButton, ...style.pauseButton }}>
                                <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(Colors.rippleLight, true)} onPress={pauseOrResume}>
                                    <View >
                                        {isPaused && <Image source={theme === "dark" ? startLight : startDark}></Image>}
                                        {!isPaused && <Image source={theme === "dark" ? pauseLight : pauseDark}></Image>}
                                    </View>
                                </TouchableNativeFeedback>
                            </View>
                            <View style={{ ...style.controlButton, ...style.stopButton }}>
                                <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(Colors.rippleLight, true)} onPress={stop}>
                                    <View >
                                        <Image source={theme === "dark" ? stopLight : stopDark}></Image>
                                    </View>
                                </TouchableNativeFeedback>
                            </View>
                        </View>
                    }
                    <View style={style.historyButton}>
                        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(Colors.rippleLight, true)}
                            onPress={() => setRedirect(Routes.ACTIVITY_HISTORY(id!!))}>
                            <View style={{ width: 216, alignItems: 'center' }}>
                                <Text style={style.historyButtonLabel}>SEE HISTORY</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Activity;