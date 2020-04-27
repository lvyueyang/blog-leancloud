<template>
    <div>
        <div class="side-bar" :class="mobileShow ? 'mobile' : ''">
            <div class="blog-name text-center">
                <div>阿炸克斯</div>
                <div>
                    <small v-if="$root.isLogin" @click="quitFn">退出</small>
                    <template v-else>
                        <small @click="githubLogin">GitHub登录</small>
                        <!--<small @click="$root.login.show = true, $root.login.loginView = false">注册</small>-->
                    </template>
                </div>
            </div>
            <ul class="menu" @click="mobileHide">
                <router-link tag="li" to="/"><i class="iconfont icon-home--fill5"></i><span>首页</span></router-link>
                <router-link tag="li" to="/tag"><i class="iconfont icon-bookmark--fill"></i><span>标签</span>
                </router-link>
                <router-link tag="li" to="/article"><i class="iconfont icon-search--fill"></i><span>搜索</span>
                </router-link>
            </ul>
            <div class="user-info" v-if="userinfo" @click="routerAdminFn">
                <div class="img"><img :src="userinfo.avatar" alt=""></div>
                <div class="name text-center">{{userinfo.name}}</div>
                <div class="summary">{{userinfo.ones}}</div>
            </div>
            <ul class="column" @click="mobileHide">
                <router-link to="/article" tag="li">
                    <div class="num">{{count.article}}</div>
                    <div class="title">日志</div>
                </router-link>
                <router-link to="/tag" tag="li">
                    <div class="num">{{count.tag}}</div>
                    <div class="title">标签</div>
                </router-link>
                <!--<li>-->
                <!--<div class="num">0</div>-->
                <!--<div class="title">说说</div>-->
                <!--</li>-->
            </ul>
            <div class="friend-link">
                <a target="_blank" href="https://github.com/lvyueyang">
                    <i class="iconfont icon-GitHub"></i>
                    GitHub
                </a>
                <a target="_blank" href="https://juejin.im/user/585407be61ff4b0063af58be">
                    <i class="iconfont icon-juejin"></i>
                    掘金
                </a>
            </div>
        </div>
        <Button class="side-bar-toggle" type="black" @click="mobileShow=!mobileShow">
            <i v-if="!mobileShow" class="iconfont icon-menu-line"></i>
            <i v-else class="iconfont icon-close-fill"></i>
        </Button>
    </div>
</template>

<script>
    export default {
        name: 'SideBar',
        props: {},
        data() {
            return {
                left: 0,
                mobileShow: false
            }
        },
        computed: {
            userinfo() {
                return this.$root.userinfo
            },
            count() {
                return this.$root.count
            }
        },
        async mounted() {
        },
        methods: {
            quitFn() {
                this.$pop.confirm({
                    content: '确定要退出吗？',
                    ok: async () => {
                        localStorage.setItem('token', '')
                        // await this.$http.post('/v1/signOut')
                        window.location.reload()
                    }
                })
            },
            routerAdminFn() {
                if (this.$root.isLogin) {
                    this.$router.push('/admin')
                    this.mobileHide()
                }
            },
            mobileHide() {
                this.$emit('linkClick')
            },
            githubLogin() {
                let client_id = process.env.VUE_APP_CLIENT_ID
                let url = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=user,public_repo&state=login`
                window.open(url, 'githubsign', "menubar=0,scrollbars=1, resizable=1,status=0,titlebar=0,toolbar=0,location=0,width=520,height=780")
            },
        }
    }
</script>
