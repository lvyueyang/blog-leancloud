/**
 * @param {String} title 文章标题
 * @param {String} content 文章内容 html
 * @param {String} markdown 文章内容 markdown
 * @param {Array} tags 文章标签
 * @param {String} contentType 文章内容类型 富文本/markdown
 * @param {Boolean} top 是否置顶
 * */

AV.Cloud.define('articleCreate', async function (request) {
    const {currentUser, params} = request
    const {title, content, markdown, tags = [], contentType = 'markdown', top = false} = params

    // 判断此用户的权限
    const userRole = await currentUser.getRoles()
    console.log(userRole)
    if (userRole.length === 0) {
        return Promise.reject({
            code: 'error',
            message: '您无权发布文章'
        })
    }
    if (!userRole.some(item => item._serverData.name === 'admin')) {
        return Promise.reject({
            code: 'error',
            message: '您无权发布文章'
        })
    }

    const article = new AV.Object('Article')
    article.set('title', title)
    article.set('content', content)
    article.set('markdown', markdown)
    article.set('tags', tags)
    article.set('contentType', contentType)
    article.set('top', top)
    article.set('state', '1') // 0删除，1正常
    article.set('counts', {
        look: 0, // 浏览数
        comment: 0, // 评论数
    })
    article.set('auth', currentUser)

    // 设置操作权限 [公共读，作者可写]
    let acl = new AV.ACL()
    acl.setPublicReadAccess(true)
    acl.setPublicWriteAccess(false)
    acl.setWriteAccess(currentUser, true)
    article.setACL(acl)

    try {
        const info = await article.save()
        return Promise.resolve({id: info.id})
    } catch (e) {
        console.error(e)
        return Promise.reject({
            code: 'server_error',
            message: '系统错误',
            detail: e
        })
    }
})

AV.Cloud.define('articleDetail', async function (request) {
    const {params} = request
    const {id} = params
    const query = new AV.Query('Article')
    query.equalTo('objectId', id)
    query.include('auth')

    function updateLook() {
        const article = AV.Object.createWithoutData('Article', id)
        article.increment('counts.look', 1)
        article.save()
    }

    try {
        const info = await query.first()
        updateLook()
        return Promise.resolve(info)
    } catch (e) {
        console.error(e)
        return Promise.reject({
            code: 'server_error',
            message: '系统错误',
            detail: e
        })
    }
})

/**
 * 文章评论数增加或者减少
 * @param {String} id 文章ID
 * @param {Number} increase 增加1：1  减少1:-1
 * */
AV.Cloud.define('articleCommentCount', async function (request) {
    const {params} = request
    const {id, increase} = params

    try {
        const article = AV.Object.createWithoutData('Article', id)
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