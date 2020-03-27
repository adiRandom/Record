import ActivityIcon from "../models/ActivityIcon"

export default function getActivityIcon(icon: string): ActivityIcon {
    let file;
    switch (icon) {
        case 'arm-icon': file = require("../assets/icons/activity/arm-icon.png")
        case 'boxing-icon': file = require("../assets/icons/activity/boxing-icon.png")
        case 'circles-icon': file = require("../assets/icons/activity/circles-icon.png")
        case 'fitnes-icon': file = require("../assets/icons/activity/fitnes-icon.png")
        case 'jumping-icon': file = require("../assets/icons/activity/jumping-icon.png")
        case 'paralels-icon': file = require("../assets/icons/activity/paralels-icon.png")
        case 'pushup-icon': file = require("../assets/icons/activity/pushup-icon.png")
        case 'runing-icon': file = require("../assets/icons/activity/runing-icon.png")
        case 'trophy-icon': file = require("../assets/icons/activity/trophy-icon.png")
        case 'warmup-icon': file = require("../assets/icons/activity/warmup-icon.png")
        case 'weight-icon': file = require("../assets/icons/activity/weight-icon.png")
        case 'weight-lifting-icon': file = require("../assets/icons/activity/weight-lifting-icon.png")
        default: break;
    }
    return {
        file,
        name: icon
    }
}