import Vue from 'vue'
import axios from 'axios'
import utils from '../util/index'
import vPop from 'vue-popjs'

Vue.use(vPop)
const pop = Vue.prototype.$pop

axios.defaults.baseURL = process.env.VUE_APP_SERVE + '/1.1'
// 请求拦截器
axios.interceptors.request.use(function (config) {
    const token = utils.store.get('token')
    config.headers['X-LC-Id'] = process.env['VUE_APP_LEANCLOUD_APPID']
    config.headers['X-LC-Key'] = process.env['VUE_APP_LEANCLOUD_APPKEY']
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
    console.log(response)
    if (response && response.data) {
        const data = response.data
        const status = response.status
        const {code, message, error} = data
        if (response.config.url.includes('/users/me')) {
            return Promise.reject(data)
        }
        if (status === 500) {
            pop.notice({
                title: '系统错误',
                type: 'error'
            })
        } else if (status === 400) {
            pop.notice({
                title: error,
                type: 'error'
            })
        }
        if (code === 403) {
            pop.notice({
                title: message || error,
                type: 'error'
            })
        } else if (code === 401) {
            pop.notice({
                title: '没有登陆',
                type: 'error'
            })
        } else {
            pop.notice({
                title: '操作失败',
                type: 'error'
            })
        }
        return Promise.reject(data)
    } else {
        return Promise.reject(error)
    }
})

export default axios
