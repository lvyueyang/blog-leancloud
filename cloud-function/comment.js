/**
 * 文章评论数增加或者减少
 * @param {String} id 文章ID
 * @param {Number} increase 增加1：1  减少1:-1
 * */
AV.Cloud.define('commentCount', async function (request) {
    const {params} = request
    const {id, increase} = params

    try {
        const article = AV.Object.createWithoutData('Comment', id)
        article.increment('counts.comment', increase)
        await article.save()
        return Promise.resolve({
            code: 'success'
        })
    } catch (e) {
        console.error(e)
        return Promise.reject({
            code: 'server_error',
            message: '系统错误',
            detail: e
        })
    }
})