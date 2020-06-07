import axios from '../axios'
import {MESSAGE, USER} from '../classMap'
import {createPointer, listPage, userId} from '../api-util'

export default {
    list({page = 1} = {}) {
        return axios.get(`/classes/${MESSAGE}`, {
            params: {
                where: {
                    to: createPointer(USER, userId())
                },
                include: 'content',
                ...listPage(page)
            }
        })
    },

    remove(id) {
        return axios.put(`/classes/${MESSAGE}/${id}`, {
            state: '0'
        }).then(res => {
            return res
        })
    }
}