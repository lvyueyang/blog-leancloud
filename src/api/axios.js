import Vue from 'vue'
import axios from 'axios'
import utils from '../util/index'
import CONFIG from '../config'
import vPop from 'vue-popjs'

Vue.use(vPop)
const pop = Vue.prototype.$pop

axios.defaults.baseURL = CONFIG.leancloud.apiUrl + '/1.1'
// 请求拦截器
axios.interceptors.request.use(function (config) {
    const token = utils.store.get('token')
    config.headers['X-LC-Id'] = CONFIG.leancloud.AppID
    config.headers['X-LC-Key'] = CONFIG.leancloud.AppKey
    config.headers['Content-Type'] = 'application/json'
    if (token && !config.notToken) {
        // 写入token
        config.headers['X-LC-Session'] = token
    }
    return config
}, function (error) {
    return Promise.reject(error)
})
// 响应拦截器
axios.interceptors.response.use(function (res) {
    // console.log(res)
    if (res.status === 401) {
        Vue.$root.login.show = true
        return Promise.reject(res.data)
    }
    return res
}, function (error) {
    // 对响应错误做点什么
    const {response} = JSON.parse(JSON.stringify(error))
    if (response && response.data) {
        const data = response.data
        const status = response.status
        const {code, message} = data
        if (status === 500) {
            pop.notice({
                title: '系统错误',
                type: 'error'
            })
        }
        if (code === 401 || code === 403) {
            if (!response.config.url.includes('v1/userinfo')) {
                pop.notice({
                    title: message,
                    type: 'error'
                })
            }
        }
        if (code === 401) {
            if (!response.config.url.includes('v1/userinfo')) {
                pop.notice({
                    title: '没有登陆',
                    type: 'error'
                })
            }
        }
        return Promise.reject(data)
    } else {
        return Promise.reject(error)
    }
})

export default axios
