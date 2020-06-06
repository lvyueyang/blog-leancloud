import axios from '../axios'
import {USER} from '../classMap'
import {userId} from '../api-util'

export default {
    login: {
        gitHub(code) {
            return axios.post(`/functions/gitHubLogin`, {code}, {notToken: true})
        },
        login() {
            return axios.post('/login', {
                username: 'ajax',
                password: '123456'
            })
        }
    },
    initProject() {
        return axios.post(`/functions/initProject`)
    },
    info() {
        return axios.get(`/users/me`)
    },
    update(form) {
        return axios.put(`/classes/${USER}/${userId()}`, {
            name: form.name,
            sex: form.sex,
            gitHub: form.gitHub,
            ones: form.ones,
        })
    },
    updateAvatar(avatar, id = userId()) {
        return axios.put(`/classes/${USER}/${id}`, {avatar})
    }
}