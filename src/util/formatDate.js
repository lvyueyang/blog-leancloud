import dayjs from 'dayjs'
import rT from 'dayjs/plugin/relativeTime'
import zh from 'dayjs/locale/zh-cn'

dayjs.extend(rT)
dayjs.locale(zh)
const formatDate = (date = new Date()) => {
    return dayjs(date).format('YYYY-MM-DD')
}
const relativeTime = (date = new Date()) => {
    return dayjs().to(dayjs(date))
}
export {
    formatDate,
    relativeTime
}
