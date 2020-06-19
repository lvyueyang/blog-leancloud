import axios from '../axios'
import {ARTICLE} from '../classMap'
import {
    listPage,
} from '../api-util'

export default {
    list({page = 1, title = '', tag = ''} = {}) {
        let where = {
            title: {
                $regex: `${title}`,
                $options: 'i'
            },
            state: {
                $ne: '0'
            },
        }
        if (tag) {
            where.tags = tag
        }
        return axios.get(`/classes/${ARTICLE}`, {
            params: {
                where,
                include: 'tags',
                ...listPage(page)
            }
        })
    },
    detail(id) {
        return axios.post(`/functions/articleDetail `, {id}).then(res => {
            return res.data.result
        })
    },
    create({title, content, markdown, tags = [], contentType = 'markdown', top = false} = {}) {
        const data = {
            title,
            content,
            markdown,
            tags,
            contentType,
            top,
        }
        return axios.post(`/functions/articleCreate`, data)
    },
    update({title, content, markdown, tags = [], id, contentType = 'markdown', top} = {}) {
        return axios.put(`/classes/${ARTICLE}/${id}`, {
            title,
            content,
            markdown,
            contentType,
            tags,
        })
    },
}