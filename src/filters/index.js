import Vue from 'vue'
import {formatDate, relativeTime} from '@/util/formatDate'

Vue.filter('formatDate', formatDate)
Vue.filter('relativeTime', relativeTime)

// 将html转换为text
Vue.filter('contentFilter', html => {
    let dom = document.createElement('div')
    dom.innerHTML = html
    return dom.innerText
})
// 文字截取
Vue.filter('overflowEllipsis', (val, number = 100) => {
    if (val.length > number) {
        return '...'.padStart(number, val)
    }
    return val
})
// 性别
Vue.filter('sex', (val) => {
    const obj = {
        '0': '保密',
        '1': '男',
        '2': '女',
        '9': '未说明',
    }
    return obj[val] || '未说明'
})
// 消息类型
Vue.filter('messageType', (val) => {
    const obj = {
        '1': '系统消息',
        '2': '用户消息'
    }
    return obj[val] || '其他消息'
})
