import React, { useState, useEffect } from 'react'
import { NavigationProps } from '../NavigationProps'
import Appbar from '../../components/Appbar/Appbar'
import { View, Picker, Text, TextInput, StyleSheet, Dimensions } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DatePicker from 'react-native-datepicker'
import Activity from '../../models/Activity'
import getDate from '../../utils/GetDate'
import { getAllActivities } from '../../services/Activity'

const { width, height } = Dimensions.get("screen")

const style = StyleSheet.create({
    main: {
        width,
        height
    }
})

const CreateRecord = ({ goBack }: NavigationProps) => {
    const [activityId, setActivityId] = useState("")
    const [activities, setActivities] = useState([] as Activity[])
    const [date, setDate] = useState(0)
    const [time, setTime] = useState(0)

    useEffect(() => {
        getAllActivities().then(res => setActivities(res))
    }, [])

    function convertToTimestamp(val: String) {
        const split = val.split(":");
        let res = 0;
        if (split.length != 2) { }
        // TODO: Add invalid format error
        else {
            const [min, sec] = split;
            // TODO: check for invalid
            res = Number.parseInt(min) * 60 + Number.parseInt(sec);
        }
        setTime(res);
    }

    return (
        <View style={style.main}>
            <Appbar goBack={goBack} canGoBack title={"Add a record"}></Appbar>
            <KeyboardAwareScrollView enableOnAndroid={true}>
                <View style={{ height: height - 64 }}>
                    <View>
                        <Text>Pick an activity</Text>
                        <Picker selectedValue={activityId} onValueChange={(val) => setActivityId(val)}>
                            {activities.map(val => <Picker.Item label={val.name} value={val.id}>
                            </Picker.Item>)}
                        </Picker>
                    </View>
                    <TextInput value={time !== 0 ? time.toString() : ""} onChangeText={convertToTimestamp}
                        placeholder={""}
                    ></TextInput>
                    <DatePicker placeholder={"Pick a date"}
                        format={"DD/MM/YYYY"} androidMode={"calendar"} date={getDate(date)}
                        onDateChange={(dateStr: string, date: Date) => setDate(Math.round(date.getTime() / 1000))}>
                    </DatePicker>
                </View>
            </KeyboardAwareScrollView>
        </View >
    )
}

export default CreateRecord;