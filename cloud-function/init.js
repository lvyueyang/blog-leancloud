AV.Cloud.define('initProject', async function (request) {
    const {currentUser, params} = request
    try {
        // 判断是否已经存在admin
        let roleQuery = new AV.Query(AV.Role)
        // 查询 name 等于 Administrator 的角色
        roleQuery.equalTo('name', 'admin')
        let role = await roleQuery.first()
        console.log(role)
        if (role) {
            return Promise.reject({
                code: 'error',
                message: '初始化失败，admin已存在'
            })
        }
        let roleAcl = new AV.ACL()
        roleAcl.setPublicReadAccess(true)
        roleAcl.setPublicWriteAccess(false)
        roleAcl.setWriteAccess(currentUser, true)
        let adminRole = new AV.Role('admin', roleAcl)
        adminRole.getUsers().add(currentUser)

        await adminRole.save()
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
