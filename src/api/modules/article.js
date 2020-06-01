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

/**
 * 获取文章收藏者
 * @param {String} articleId -文章ID
 * @return Object || undefined
 * */
async function userInCollectionArticle(articleId) {
    return axios.get(`/classes/${ARTICLE}`, {
        params: {
            where: {
                objectId: articleId,
                collectionUser: {
                    $in: [{
                        __type: 'Pointer',
                        className: USER,
                        objectId: userId()
                    }]
                }
            }
        }
    }).then(res => {
        return res.data.results[0]
    })
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
    detail(objectId) {
        return axios.get(`/classes/${ARTICLE}/${objectId}`, {
                params: {
                    include: 'tags',
                }
            }
        ).then(res => {
            return res.data
        })
    },
    create({title, content, markdown, tags = [], contentType = 'markdown'} = {}) {
        const data = {
            title,
            content,
            markdown,
            tags,
            contentType,
            auth: createPointer(USER, userId()),
            top: false,
            state: '1', // 0删除，1正常
            collectionUser: [],
            counts: {
                collection: 0,
                comment: 0,
            },
            ACL: ACLWriteSetMe()
        }
        updateTagCount(tags, 1)
        return axios.post(`/classes/${ARTICLE}`, data)
    },
    update({title, content, tags = [], id, contentType} = {}) {
        return axios.put(`/classes/${ARTICLE}/${id}`, {
            title,
            content,
            contentType,
            tags
        })
    },
    async collection(articleId) {
        const user = createPointer(USER, userId())
        const url = `/classes/${ARTICLE}`

        async function update(type = 'AddUnique', amount = 1) {
            const data = {
                collectionUser: {
                    __op: type,
                    objects: [user]
                }
            }
            try {
                const res = await axios.put(`${url}/${articleId}`, data)
                await updateDataCount(ARTICLE, articleId, 'counts.collection', amount)
                return res
            } catch (e) {
                return Promise.reject(e)
            }
        }

        try {
            const detail = await userInCollectionArticle(articleId)
            if (!detail) {
                return update('AddUnique', 1)
            }
            return update('Remove', -1)
        } catch (e) {
            return Promise.reject(e)
        }
    },
    userInCollectionArticle
}