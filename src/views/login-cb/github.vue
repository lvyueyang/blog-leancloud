<template>
    <div class="login-cb-wrapper">
        <div class="wrap">
            <div class="icon">
                <i class="img " :class="{loading}"></i>
            </div>
            <div class="msg">{{text}}</div>
            <div class="info">{{info}}</div>
<!--            <code v-html="message"></code>-->
        </div>
    </div>
</template>

<script>
    export default {
        name: "github",
        data() {
            return {
                text: '登陆中，请稍后...',
                info: '',
                loading: true,
                message: ''
            }
        },
        created() {
            this.login(this.$utils.getUrlParam('code'))
        },
        methods: {
            async login(code) {
                this.text = '登陆中，请稍后...'
                this.loading = true
                try {
                    let {data} = await this.$api.user.login.gitHub(code)
                    this.$utils.store.set('token', data.result.token)
                    this.text = '登陆成功！'
                    window.opener.location.reload()
                    window.close()
                } catch (e) {
                    console.log(e)
                    this.text = '登陆失败！'
                }
                this.loading = false
            }
        }
    }
</script>
