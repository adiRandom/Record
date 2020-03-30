import ActivityIcon from "../models/ActivityIcon"

export default function getActivityIcon(icon: string | undefined): ActivityIcon {
    let file;
    switch (icon) {
        case 'arm-icon': file = require("../assets/icons/activity/arm-icon.png"); break;
        case 'boxing-icon': file = require("../assets/icons/activity/boxing-icon.png"); break;
        case 'circles-icon': file = require("../assets/icons/activity/circles-icon.png"); break;
        case 'fitnes-icon': file = require("../assets/icons/activity/fitnes-icon.png"); break;
        case 'jumping-icon': file = require("../assets/icons/activity/jumping-icon.png"); break;
        case 'paralels-icon': file = require("../assets/icons/activity/paralels-icon.png"); break;
        case 'pushup-icon': file = require("../assets/icons/activity/pushup-icon.png"); break;
        case 'runing-icon': file = require("../assets/icons/activity/runing-icon.png"); break;
        case 'trophy-icon': file = require("../assets/icons/activity/trophy-icon.png"); break;
        case 'warmup-icon': file = require("../assets/icons/activity/warmup-icon.png"); break;
        case 'weight-icon': file = require("../assets/icons/activity/weight-icon.png"); break;
        case 'weight-lifting-icon': file = require("../assets/icons/activity/weight-lifting-icon.png"); break;
        default: break;
    }
    return {
        file,
        name: icon ? icon : ""
    }
}