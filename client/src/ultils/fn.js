import icons from "./icons"
import moment from "moment"

const { AiFillStar } = icons
export const renderStar = (number) => {
    if (number > 5) number = 5
    const stars = []
    for (let i = 0; i < number; i++) stars.push(<AiFillStar size={16} color='#f59e0b' />)
    for (let i = number; i < 5; i++) stars.push(<AiFillStar size={16} />)

    return stars
}

export const formatVietnameseToString = (keyword) => {
    return keyword
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .split(" ")
        .join("-")
}

export const formatNumber = (number) => {
    const letter = number >= Math.pow(10, 9) ? 'B' : number >= Math.pow(10, 6) ? 'M' : 'K'
    const n = number < Math.pow(10, 3) ? 1 : number < Math.pow(10, 6) ? 1000 : 1000000
    if (number < 1000) return number
    return `${Math.round(number / n)}${letter}`
}
export function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
export function getDaysInMonth(endDay) {
    const today = new Date()
    const endPreviousMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate()
    let day = 1
    let prevDayStart = 1
    const daysInMonths = []
    while (prevDayStart <= +endPreviousMonth) {
        const month = new Date().getMonth()
        const year = new Date().getFullYear() % 1000
        daysInMonths.push(`${prevDayStart < 10 ? '0' + prevDayStart : prevDayStart}-${month < 10 ? `0${month}` : month}-${year}`)
        prevDayStart += 1
    }
    while (day <= +endDay) {
        const month = new Date().getMonth() + 1
        const year = new Date().getFullYear() % 1000
        daysInMonths.push(`${day < 10 ? '0' + day : day}-${month < 10 ? `0${month}` : month}-${year}`)
        day += 1
    }
    return daysInMonths.filter((el, index, self) => index > self.length - 15)
}
export function getMonthInYear(endMonth) {
    const thisMonth = new Date().getMonth() + 1
    let month = 1
    let startLastYear = 1
    const daysInMonths = []
    while (startLastYear <= 12) {
        const year = new Date().getFullYear() % 1000
        daysInMonths.push(`${startLastYear < 10 ? `0${startLastYear}` : startLastYear}-${year - 1}`)
        startLastYear += 1
    }
    while (month <= +endMonth) {
        const year = new Date().getFullYear() % 1000
        daysInMonths.push(`${month < 10 ? `0${month}` : month}-${year}`)
        month += 1
    }
    return daysInMonths.filter((el, index, self) => index > self.length - 8)
} 