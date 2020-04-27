import Vue from 'vue'
import Router from 'vue-router'

const Index = () => import('../views/index/index')
const Main = () => import('../views/main')

Vue.use(Router)
export default new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Main',
            redirect: '/',
            components: {
                default: Main
            },
            children: [
                {
                    path: '/',
                    name: 'Index',
                    meta: {
                        isKeepAlive: true
                    },
                    components: {
                        default: Index
                    }
                },
                {
                    path: '/article',
                    name: 'ArticleList',
                    components: {
                        default: () => import('../views/article/list')
                    }
                },
                {
                    path: '/article/:id',
                    name: 'ArticleDetail',
                    components: {
                        default: () => import('../views/article/detail')
                    }
                },
                {
                    path: '/tag',
                    name: 'Tag',
                    components: {
                        default: () => import('../views/tag/index')
                    }
                }
            ]
        },
        {
            path: '/admin',
            name: 'Admin',
            components: {
                admin: () => import('../views/admin/index')
            }
        },
        {
            path: '/user',
            name: 'UserInfo',
            components: {
                admin: () => import('../views/admin/user-info')
            }
        },
        {
            path: '/editor',
            name: 'Editor',
            components: {
                admin: () => import('../views/admin/editor')
            }
        },
        {
            path: '/github-sign',
            name: 'githubSign',
            components: {
                admin: () => import('../views/login-cb/github')
            }
        }

    ],
    scrollBehavior(to, from, savedPosition) {
        // 从第二页返回首页时savedPosition为undefined
        if (savedPosition || typeof savedPosition === 'undefined') {
            // 只处理设置了路由元信息的组件
            from.meta.isKeepAlive = typeof from.meta.isKeepAlive === 'undefined' ? undefined : false
            to.meta.isKeepAlive = typeof to.meta.isKeepAlive === 'undefined' ? undefined : true
            if (savedPosition) {
                return savedPosition
            }
        } else {
            from.meta.isKeepAlive = typeof from.meta.isKeepAlive === 'undefined' ? undefined : true
            to.meta.isKeepAlive = typeof to.meta.isKeepAlive === 'undefined' ? undefined : false
        }
    }
})
