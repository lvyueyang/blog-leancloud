AV.Cloud.define('gitHubLogin', async function (request) {
    const rp = require('request-promise')
    const {code} = request.params
    const clientID = '8608ddf7d042022b7de7'
    const clientSecret = 'b8adb3ed0666a6be42795ed38921d37ad2867698'

    async function code2AccessToken() {
        try {
            // 根据code获取access_token
            const tokenOption = {
                method: 'POST',
                uri: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${code}`,
                json: true,
                headers: {
                    accept: 'application/json',
                }
            }
            const result = await rp(tokenOption)
            if (!result.access_token) {
                return Promise.reject(result)
            }
            return Promise.resolve(result)
        } catch (e) {
            return Promise.reject(e)
        }
    }

    function accessToken2Userinfo(access_token) {
        const userOption = {
            method: 'get',
            url: `https://api.github.com/user?access_token=${access_token}`,
            json: true,
            headers: {
                'User-Agent': 'leancloudBlog',
                Authorization: `token ${access_token}`
            }
        }
        return rp(userOption)
    }

    try {
        console.log('code2AccessToken', `code=${code}`)
        const {access_token} = await code2AccessToken()
        console.log(access_token)
        console.log('accessToken2Userinfo')
        const userInfo = await accessToken2Userinfo(access_token)
        console.log(userInfo)
        // 使用用户信息进行第三方登陆
        const authData = {
            openid: userInfo.node_id,
            access_token,
            expires_in: 7200,
        }
        const avUser = await AV.User.loginWithAuthData(authData, 'github')
        console.log('avUser\n', avUser)
        console.log(avUser._sessionToken)
        let user = AV.Object.createWithoutData('_User', avUser.id)
        user.set('email', userInfo.email)
        user.set('name', userInfo.name)
        user.set('avatar', userInfo.avatar_url)
        user.set('gitHub', userInfo.html_url)
        user.set('sex', '9')
        user.set('ones', '')
        let acl = new AV.ACL()
        acl.setPublicReadAccess(true)
        acl.setWriteAccess(avUser, true)
        user.setACL(acl)
        await user.save()
        return {
            token: avUser._sessionToken,
            // userInfo
        }
    } catch (e) {
        console.log(e)
        return e
    }
})