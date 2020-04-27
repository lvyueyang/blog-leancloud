<template>
    <div class="login">
        <div class="form">
            <div class="title">
                <span>{{$root.login.loginView ? '登录' : '注册'}}</span>
                <i class="iconfont icon-cuowu" @click="$root.login.show = false"></i>
            </div>
            <!--<div class="label-input">
                <input type="text" v-model="form.username" placeholder="请输入用户名">
            </div>
            <div class="label-input">
                <input type="password" v-model="form.pws" placeholder="请输入密码" autocomplete="off">
            </div>
            <template v-if="$root.login.loginView">
                <div class="text-center">
                    <Button type="black" :loading="loading" @click="Login">登录</Button>
                </div>
                &lt;!&ndash;<div class="text">
                    <span>没有账号？ <span class="cur" @click="toggleReg(false)">注册</span></span>
                    <router-link to="">忘记密码?</router-link>
                </div>&ndash;&gt;
            </template>-->
            <!--<template v-else>
                <div class="text-center">
                    <Button type="black" :loading="loading" @click="register">注册</Button>
                </div>
                <div class="text-center cur" style="margin-top: 10px;" @click="toggleReg(true)">已有账号登录</div>
            </template>-->
<!--            <div class="text-center" style="margin-top: 10px;">没有账号？点击下方GitHub登陆</div>-->
            <div class="more-login">
                <i class="iconfont icon-GitHub" @click="githubLogin"></i>
                <!--<i class="iconfont icon-qq" id="qqLoginBtn"></i>-->
                <!--<i class="iconfont icon-weixin-copy"></i>-->
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Login',
        data() {
            return {
                form: {
                    username: '',
                    pws: ''
                },
                loading: false
            }
        },
        mounted() {
        },
        methods: {
            githubLogin() {
                let client_id = process.env.VUE_APP_CLIENT_ID
                let url = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=user,public_repo&state=login`
                window.open(url, 'githubsign', "menubar=0,scrollbars=1, resizable=1,status=0,titlebar=0,toolbar=0,location=0,width=520,height=780")
            },
        }
    }
</script>
