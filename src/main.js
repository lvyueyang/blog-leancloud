import Vue from 'vue'
import App from './App'
import router from './router'
import Button from './components/Button'
import TextareaDiv from './components/TextareaDiv'
import api from './api'
import utils from './util'
import {formatDate, relativeTime} from './util/formatDate'
import userFormat from './util/userFormat'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import vuePop from 'vue-popjs'

Vue.use(mavonEditor)
Vue.use(vuePop)
Vue.component('Button', Button)
Vue.component('TextareaDiv', TextareaDiv)
Vue.filter('formatDate', formatDate)
Vue.filter('relativeTime', relativeTime)
Vue.filter('userFormat', userFormat)
Vue.config.productionTip = false
// 添加全局方法
Vue.prototype.$utils = utils
Vue.prototype.$api = api
mavonEditor.markdownIt.set({
    break: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                let code = `<i class="copy">${lang}</i><div class="code">${hljs.highlight(lang, str).value}</div>`
                return code
            } catch (__) {
            }
        }
        return ''
    }
})
// 将html转换为text
Vue.filter('contentFilter', val => {
    const html = mavonEditor.markdownIt.render(val)
    let dom = document.createElement('div')
    dom.innerHTML = html
    for (let i of dom.querySelectorAll('pre')) {
        dom.removeChild(i)
    }
    // for (let i of dom.querySelectorAll('img')) {
    //   dom.removeChild(i)
    // }
    // for (let i of dom.querySelectorAll('script')) {
    //   dom.removeChild(i)
    // }
    return dom.innerText
})
Vue.filter('overflowEllipsis', (val, number = 100) => {
    if (val.length > number) {
        return '...'.padStart(number, val)
    }
    return val
})
Vue.filter('sex', (val) => {
    const obj = {
        '0': '保密',
        '1': '男',
        '2': '女',
        '9': '未说明',
    }
    return obj[val] || '未说明'
})

Vue.prototype.$md = mavonEditor.markdownIt
new Vue({
    router,
    data: {
        isLogin: true,
        userinfo: null,
        count: {
            article: 0,
            tag: 0,
        }
    },
    created() {
        this.getUserInfo()
        this.getCounts()
    },
    methods: {
        async getUserInfo() {
            try {
                let {data} = await api.user.info()
                utils.store.set('userInfo', data)
                this.userinfo = data
                this.isLogin = true
            } catch (e) {
                this.isLogin = false
            }
        },
        async getCounts() {
            try {
                const res = await this.$api.counts()
                this.count.article = res[0]
                this.count.tag = res[1]
            } catch (e) {
            }
        },
    },
    render: h => h(App)
}).$mount('#app')
