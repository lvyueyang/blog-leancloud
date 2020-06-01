import axios from './axios'
import {ARTICLE, TAG, FILE} from './classMap'
import {
    userId,
    ACLWriteSetMe,
} from './api-util'

import article from './modules/article'
import comment from './modules/comment'
import commentChildren from './modules/commentChildren'
import user from './modules/user'
import message from './modules/message'

export default {
    article,
    comment,
    commentChildren,
    message,
    tag: {
        list() {
            return axios.get(`/classes/${TAG}`, {params: {count: '1',}})
        },
        create(name) {
            return axios.post(`/classes/${TAG}`, {
                name,
                auth: userId(),
                articleCount: 0,
                ACL: ACLWriteSetMe()
            })
        },
    },
    user,
    counts() {
        let requests = []
        for (let i of [ARTICLE, TAG]) {
            requests.push({
                method: 'GET',
                path: `/1.1/classes/${i}`,
                params: {
                    count: 1,
                    limit: 0
                }
            },)
        }
        return axios.post(`/batch`, {requests}).then(res => {
            return res.data.map(item => {
                return item.success.count
            })
        })
    },
    uploadFile(file, name) {
        const formData = new FormData()
        formData.append('file', file)
        return axios.post(`/files/${name}`, formData, {
            headers: {
                'Content-Type': file.type
            }
        })
    },
    async removeFile(url) {
        try {
            const {data} = await axios.get(`/classes/${FILE}`, {
                params: {
                    where: {
                        url
                    }
                }
            })
            const id = data.results[0]
            if (id) {
                await axios.delete(`/files/${id}`)
                return Promise.resolve()
            }
        } catch (e) {
            return Promise.resolve()
        }
    },
}
