import ActivityIcon from "./ActivityIcon";


export default interface Activity {
    name: string,
    icon: ActivityIcon,
    high: number|null,
    id:string
}