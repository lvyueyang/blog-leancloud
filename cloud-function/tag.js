AV.Cloud.define('tagCreate', async function (request) {
    const {currentUser, params} = request
    const {name} = params

    // 判断此用户的权限
    const userRole = await currentUser.getRoles()
    console.log(userRole)
    if (userRole.length === 0) {
        return Promise.reject({
            code: 'error',
            message: '您无权添加标签'
        })
    }
    if (!userRole.some(item => item._serverData.name === 'admin')) {
        return Promise.reject({
            code: 'error',
            message: '您无权添加标签'
        })
    }

    const tag = new AV.Object('Tag')
    tag.set('name', name)
    tag.set('auth', currentUser)

    // 设置操作权限 [公共读，作者可写]
    let acl = new AV.ACL()
    acl.setPublicReadAccess(true)
    acl.setPublicWriteAccess(false)
    acl.setWriteAccess(currentUser, true)
    tag.setACL(acl)

    try {
        const info = await tag.save()
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
