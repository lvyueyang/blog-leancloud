import axios from '../axios'
import {COMMENT_CHILDREN, USER} from '../classMap'
import {ACLWriteSetMe, createPointer, listPage, userId} from '../api-util'

function updateCommentCount(id, increase) {
    return axios.post(`/functions/commentCount `, {id, increase})
}

export default {
    list({page = 1, commentId} = {}) {
        return axios.get(`/classes/${COMMENT_CHILDREN}`, {
            params: {
                where: {
                    commentId,
                    state: {
                        $ne: '0'
                    }
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
    create({content, commentId} = {}) {
        const data = {
            commentId,
            content,
            auth: createPointer(USER, userId()),
            state: '1', // 0删除，1正常
            counts: {
                zan: 0
            },
            ACL: ACLWriteSetMe()
        }
        return axios.post(`/classes/${COMMENT_CHILDREN}`, data).then(res => {
            updateCommentCount(commentId, 1)
            return res
        })
    },
    remove(id, commentId) {
        return axios.put(`/classes/${COMMENT_CHILDREN}/${id}`, {
            state: '0'
        }).then(res => {
            updateCommentCount(commentId, -1)
            return res
        })
    }
}