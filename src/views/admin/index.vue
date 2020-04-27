<template>
    <div class="admin-user-index">
        <div class="user-info" v-if="userinfo">
            <div class="file-head">
                <img :src="userinfo.avatar" alt="">
                <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
                       @change="handlerFileUpload">
            </div>
            <div class="username"><span>{{userinfo.name}}</span>
                <small>{{userinfo.sex | sex}}</small>
            </div>
        </div>
        <div class="link-list">
            <router-link to="/editor" class="on" target="_blank"><span>发布文章</span></router-link>
            <router-link to=""><span>我的收藏</span></router-link>
            <router-link :to="`/user`"><span>我的资料</span></router-link>
            <router-link to=""><span>我的消息</span></router-link>
            <router-link to=""><span>私&emsp;&emsp;信</span></router-link>
            <router-link to="/"><span>返回首页</span></router-link>
        </div>
        <div class="message-list">
            <ul>
                <li v-for="v in msg" :key="v._id">
                    <div class="type"><span>消息类型</span>
                        <small>{{v.createAt | relativeTime}}</small>
                    </div>
                    <div v-html="v.content"></div>
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
            }
        },
        created() {
        },
        methods: {
            async getMsgListFn() {
                const {data} = await this.$http.get('/v1/message')
                this.msg = data.list
            },
            async handlerFileUpload(e) {
                const file = e.target.files[0]
                if (file) {
                    this.$api.uploadFile(file, 'avatar-' + this.$utils.store.get('userInfo').objectId)
                }
            },
        }
    }
</script>
