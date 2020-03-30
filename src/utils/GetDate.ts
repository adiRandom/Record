export default function getDate(date:number|undefined){
    if(!date)
        return ""

    const dateObj = new Date(date)
    return `${dateObj.getDate()}/${dateObj.getMonth()}/${dateObj.getFullYear()}`;
}