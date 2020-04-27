import axios from './axios'
import utils from "@/util/index"
import {ARTICLE, TAG, COMMENT, COMMENT_CHILDREN, USER, FILE} from "./classMap"

// 仅自己和管理员可写，所有人可读
function ACLWriteSetMe() {
    const id = utils.store.get('userInfo').objectId
    return {
        '*': {
            read: true,
        },
        [id]: {
            write: true
        },
        'role:Admin': {
            write: true,
        }
    }
}

function userId() {
    return utils.store.get('userInfo').objectId
}

// 分页倒序查询列表
function listPage(page) {
    return {
        count: '1',
        order: '-createdAt',
        limit: (page - 1) + 10,
        skip: (page - 1) * 10
    }
}

export const updateTagCount = async (list = [], amount = 1) => {
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

const updateDataCount = (classes, id, key, amount = 1) => {
    return axios.put(`/classes/${classes}/${id}`, {[key]: {__op: 'Increment', amount}})
}

export default {
    article: {
        list({page = 1, title = '', tag = ''}) {
            let where = {
                title: {
                    $regex: `${title}`,
                    $options: 'i'
                }
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
        create({title, content, tags = []}) {
            tags = tags.map(item => {
                return {
                    __type: 'Pointer',
                    className: TAG,
                    objectId: item
                }
            })
            const data = {
                title,
                content,
                tags,
                auth: {
                    __type: 'Pointer',
                    className: USER,
                    objectId: userId()
                },
                top: false,
                state: '1', // 0删除，1正常
                counts: {
                    like: 0,
                    look: 0,
                    comment: 0,
                },
                ACL: ACLWriteSetMe()
            }
            updateTagCount(tags, 1)
            return axios.post(`/classes/${ARTICLE}`, data)
        },
        update({title, content, tags = [], id}) {
            tags = tags.map(item => {
                return {
                    __type: 'Pointer',
                    className: TAG,
                    objectId: item
                }
            })
            return axios.put(`/classes/${ARTICLE}/${id}`, {
                title,
                content,
                tags
            })
        }
    },
    comment: {
        list({page = 1, articleId}) {
            return axios.get(`/classes/${COMMENT}`, {
                params: {
                    where: {
                        articleId,
                    },
                    include: 'auth',
                    ...listPage(page)
                }
            })
        },
        detail(objectId) {
            return axios.get(`/classes/${COMMENT}/${objectId}`, {
                params: {
                    include: 'auth'
                }
            }).then(res => {
                return res.data
            })
        },
        create({content, articleId}) {
            const data = {
                articleId,
                content,
                auth: {
                    __type: 'Pointer',
                    className: USER,
                    objectId: userId()
                },
                state: '1', // 0删除，1正常
                counts: {
                    like: 0,
                    comment: 0,
                },
                ACL: ACLWriteSetMe()
            }
            return axios.post(`/classes/${COMMENT}`, data).then(res => {
                updateDataCount(ARTICLE, articleId, 'counts.comment')
                return res
            })
        },
    },
    commentChildren: {
        list({page = 1, commentId}) {
            return axios.get(`/classes/${COMMENT_CHILDREN}`, {
                params: {
                    where: {
                        commentId,
                    },
                    include: 'auth',
                    ...listPage(page)
                }
            })
        },
        detail(objectId) {
            return axios.get(`/classes/${COMMENT_CHILDREN}/${objectId}`, {
                params: {
                    include: 'auth'
                }
            }).then(res => {
                return res.data
            })
        },
        create({content, commentId}) {
            const data = {
                commentId,
                content,
                auth: {
                    __type: 'Pointer',
                    className: USER,
                    objectId: userId()
                },
                state: '1', // 0删除，1正常
                counts: {
                    like: 0
                },
                ACL: ACLWriteSetMe()
            }
            return axios.post(`/classes/${COMMENT_CHILDREN}`, data).then(res => {
                updateDataCount(COMMENT, commentId, 'counts.comment')
                return res
            })
        },
    },
    tag: {
        list() {
            let params = {
                count: '1',
            }
            return axios.get(`/classes/${TAG}`, {params})
        },
        create(name) {
            const data = {
                name,
                auth: userId(),
                articleCount: 0,
                ACL: ACLWriteSetMe()
            }
            return axios.post(`/classes/${TAG}`, data)
        },

    },
    user: {
        login: {
            gitHub(code) {
                return axios.post(`/functions/gitHubLogin`, {code}, {notToken: true})
            }
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
    },
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
        console.log(file)
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
