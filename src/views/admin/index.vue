<template>
    <div class="admin-user-index">
        <div class="user-info" v-if="userinfo">
            <div class="file-head">
                <img :src="userinfo.avatar" alt="">
            </div>
            <div class="username"><span>{{userinfo.name}}</span>
                <small>{{userinfo.sex | sex}}</small>
            </div>
        </div>
        <div class="link-list">
            <router-link to="/editor" class="on" target="_blank"><span>发布文章</span></router-link>
            <router-link :to="`/user`"><span>我的资料</span></router-link>
            <router-link to=""
                         v-if="$route.query.id">
                <span>私信他</span>
            </router-link>
            <router-link to=""
                         v-if="!$route.query.id || $route.query.id === userinfo.objectId">
                <span>私信</span>
            </router-link>
            <router-link to="/"><span>返回首页</span></router-link>
        </div>
        <div class="message-list">
            <ul>
                <li v-for="v in msg" :key="v._id">
                    <div class="type"><span>{{v.type | messageType}}</span>
                        <small>{{v.createdAt | relativeTime}}</small>
                    </div>
                    <div>
                        <template v-for="c in v.content">
                            <span v-if="c.className === '_User'">用户 <span class="link">{{c.name}} </span></span>
                            <span class="link" v-if="c.className === 'Article'">{{c.title}}</span>
                            <span class="text" v-if="c.type === 'text'"> {{c.text}} </span>
                        </template>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Admin',
        data() {
            return {
                msg: []
            }
        },
        computed: {
            userinfo() {
                return this.$root.userinfo || {}
            },
            route() {
                return this.$route
            }
        },
        mounted() {
            this.getMsgList()
        },
        methods: {
            async getMsgList() {
                const {data} = await this.$api.message.list()
                this.msg = data.results
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>