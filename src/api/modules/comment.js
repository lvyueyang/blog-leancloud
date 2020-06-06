import axios from '../axios'
import {ARTICLE, COMMENT, USER} from '../classMap'
import {ACLWriteSetMe, listPage, updateDataCount, userId, sendMessage, createPointer} from '../api-util'
import user from '@/api/modules/user'

function updateArticleCount(id, increase) {
    return axios.post(`/functions/articleCommentCount`, {id, increase})
}

export default {
    list({page = 1, articleId} = {}) {
        return axios.get(`/classes/${COMMENT}`, {
            params: {
                where: {
                    articleId,
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
        return axios.get(`/classes/${COMMENT}/${objectId}`, {
            params: {
                include: 'auth'
            }
        }).then(res => {
            return res.data
        })
    },
    create({content, articleId, articleInfo} = {}) {
        const data = {
            articleId,
            content,
            auth: {
                __type: 'Pointer',
                className: USER,
                objectId: userId()
            },
            state: '1', // 0删除，1正常
            zanUser: [],
            counts: {
                zan: 0,
                comment: 0,
            },
            ACL: ACLWriteSetMe()
        }
        sendMessage({
            to: articleInfo.auth.objectId,
            type: '2',
            content: [
                createPointer(USER, userId()),
                {
                    text: '评论了您的文章',
                    type: 'text',
                },
                createPointer(ARTICLE, articleId),
            ]
        })
        return axios.post(`/classes/${COMMENT}`, data).then(res => {
            updateArticleCount(articleId, 1)
            return res
        })
    },
    remove(id, articleId) {
        return axios.put(`/classes/${COMMENT}/${id}`, {
            state: '0'
        }).then(res => {
            updateArticleCount(articleId, -1)
            return res
        })
    }
}