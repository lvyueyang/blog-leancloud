import Vue from 'vue'
import App from './App'
import router from './router'
import Button from './components/Button'
import api from '@/api'
import utils from './util'
import './assets/highlightjs/styles/github.css'
import vuePop from 'vue-popjs'
import './filters/index'
Vue.use(vuePop)
Vue.component('Button', Button)

Vue.config.productionTip = false
Vue.prototype.$utils = utils
Vue.prototype.$api = api

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
                utils.store.set('userInfo', '')
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
