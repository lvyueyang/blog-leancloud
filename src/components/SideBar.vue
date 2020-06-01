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
            <div class="user-info" v-if="userinfo">
                <div class="avatar" @click="routerAdminFn"><img :src="userinfo.avatar" alt=""></div>
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
                window.open(url, 'githubsign', 'menubar=0,scrollbars=1, resizable=1,status=0,titlebar=0,toolbar=0,location=0,width=520,height=780')
            },
        }
    }
</script>
<style lang="scss" scoped>
    .side-bar {
        position: sticky;
        top: 0;
        width: 230px;
        flex: 0 0 230px;

        .blog-name {
            background-color: #000;
            color: #fff;
            font-size: 25px;
            padding: 15px 0;

            small {
                color: #fff;
                padding: 0 5px;
                font-size: 12px;
                cursor: pointer;

                &:hover {
                    text-decoration: underline;
                }
            }
        }

        .menu {
            padding: 20px 0;
            background-color: #fff;

            li {
                padding: 0 15px;
                height: 35px;
                line-height: 35px;
                cursor: pointer;
                color: #666;
                transition: all .3s;

                i {
                    vertical-align: middle;
                }

                span {
                    padding-left: 5px;
                    vertical-align: middle;
                }

                &:hover {
                    color: #333;
                    background-color: #eee;
                }
            }
        }

        .search {
            display: flex;
            margin-top: 10px;
            background-color: #fff;
            padding: 15px;

            input {
                transition: all .3s;

                &:focus + button {
                    border-color: #333;
                    color: #333;
                }
            }

            button {
                transition: all .3s;
                border-left: none;
                white-space: nowrap;
                color: #999;
            }
        }

        .user-info {
            margin-top: 10px;
            background-color: #fff;
            padding: 20px 0;

            .avatar {
                width: 90px;
                height: 90px;
                margin: 0 auto;
                padding: 3px;
                border: 1px solid #eee;
                border-radius: 50%;
                cursor: pointer;
                transition: all .3s;

                img {
                    border-radius: 50%;
                    width: 100%;
                    transition: all .3s;
                }

                &:hover {
                    transform: scale(1.2, 1.2);
                    border-color: #333;
                    border-radius: 3px;

                    img {
                        border-radius: 3px;
                    }

                    & + .name {
                        opacity: 0;
                    }
                }
            }

            .name {
                font-size: 12px;
                margin: 5px 0;
                font-weight: 700;
                transition: all .3s;
            }

            .summary {
                font-size: 12px;
                color: #999;
                text-align: center;
                padding: 0 15px;
            }
        }

        .column {
            display: flex;
            flex-wrap: wrap;
            background-color: #fff;
            padding: 20px 15px;

            li {
                flex: 1;
                text-align: center;
                border-right: 1px solid #eee;
                color: #666;
                cursor: pointer;

                &:hover {
                    .num {
                        color: #333;
                    }
                }

                &:last-of-type {
                    border: none;
                }

                .num {
                    transition: all .3s;
                    color: inherit;
                    font-weight: 600;
                    font-size: 16px;
                }

                .title {
                    font-size: 12px;
                }
            }
        }

        .friend-link {
            display: flex;
            flex-wrap: wrap;
            background-color: #fff;
            padding: 20px;
            border-top: 1px solid #eee;
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;

            a {
                display: block;
                flex: 0 0 50%;
                transition: all .3s;
                font-size: 12px;
                color: #666;
                padding: 2px 10px;
                cursor: pointer;
                border-radius: 3px;
                text-align: center;

                &:hover {
                    color: #333;
                    background-color: #f5f5f5;

                    .icon-juejin {
                        color: #007fff;
                    }
                }

                i {
                    font-size: 13px;
                    margin-right: 5px;
                }
            }
        }

        @media (max-width: 768px) {
            display: none;
            width: 100%;
            position: fixed;
            left: 0;
            top: 0;
            height: 100vh;
            overflow-y: auto;
            background-color: #f5f7f9;
            z-index: 100;
            &.mobile {
                display: block;
            }
        }
    }

    .side-bar-toggle {
        position: fixed !important;
        bottom: 34px;
        right: 20px;
        z-index: 100;
        width: 40px;
        height: 40px;
        display: none;
        overflow: hidden;
        padding: 0;

        i {
            line-height: 1;
            font-size: 25px;
            color: #fff;
        }

        .icon-close-fill {
            font-size: 20px;
        }

        &:hover {
            i {
                color: #fff !important;
            }
        }

        @media (max-width: 768px) {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
</style>