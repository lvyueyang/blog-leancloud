import axios from '../axios'
import {ARTICLE, TAG, USER} from '../classMap'
import {
    ACLWriteSetMe,
    createPointer,
    listPage,
    updateDataCount,
    userId,
} from '../api-util'

/**
 * 标签文章数量增加/减少
 * @param {Array} list
 * @param {Number} amount
 * @default Promise
 * */
async function updateTagCount(list = [], amount = 1) {
    let requests = []
    for (let i of list) {
        requests.push({
            method: 'PUT',
            path: `/1.1/classes/${TAG}/${i.objectId}`,
            body: {articleCount: {__op: 'Increment', amount}}
        })
    }
    return axios.post(`/batch`, {requests})
}


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
    update({title, content, tags = [], id, contentType, top} = {}) {
        return axios.put(`/classes/${ARTICLE}/${id}`, {
            title,
            content,
            contentType,
            tags,
        })
    },
}