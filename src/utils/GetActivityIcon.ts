export default function getActivityIcon(icon: string) {
    switch (icon) {
        case 'arm-icon': return require("../assets/icons/activity/arm-icon.png")
        case 'boxing-icon': return require("../assets/icons/activity/boxing-icon.png")
        case 'circles-icon': return require("../assets/icons/activity/circles-icon.png")
        case 'fitnes-icon': return require("../assets/icons/activity/fitnes-icon.png")
        case 'jumping-icon': return require("../assets/icons/activity/jumping-icon.png")
        case 'paralels-icon': return require("../assets/icons/activity/paralels-icon.png")
        case 'pushup-icon': return require("../assets/icons/activity/pushup-icon.png")
        case 'runing-icon': return require("../assets/icons/activity/runing-icon.png")
        case 'trophy-icon': return require("../assets/icons/activity/trophy-icon.png")
        case 'warmup-icon': return require("../assets/icons/activity/warmup-icon.png")
        case 'weight-icon': return require("../assets/icons/activity/weight-icon.png")
        case 'weight-lifting-icon': return require("../assets/icons/activity/weight-lifting-icon.png")
        default:return null;
    }
}