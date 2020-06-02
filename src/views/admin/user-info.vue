<template>
    <div class="admin-user-index">
        <div class="user-info" v-if="userinfo">
            <div class="file-head">
                <img :src="userinfo.avatar" alt="">
                <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
                       @change="handlerFileUpload">
            </div>
            <div class="form-wrap">
                <div class="form-item">
                    <label>昵称：</label>
                    <div class="content-text">
                        <input type="text" v-model="userinfo.name">
                    </div>
                </div>
                <div class="form-item">
                    <label>性别：</label>
                    <div class="content-text">
                        <select v-model="userinfo.sex">
                            <option value="0">保密</option>
                            <option value="1">男</option>
                            <option value="2">女</option>
                            <option value="9" disabled>未说明</option>
                        </select>
                    </div>
                </div>
                <div class="form-item">
                    <label>邮箱：</label>
                    <div class="content-text">
                        <input type="email" disabled v-model="userinfo.email">
                    </div>
                </div>
                <div class="form-item">
                    <label>gitHub地址：</label>
                    <div class="content-text">
                        <input type="email" v-model="userinfo.gitHub">
                    </div>
                </div>
                <div class="form-item">
                    <label>签名：</label>
                    <div class="content-text">
                        <textarea v-model="userinfo.ones" rows="4"></textarea>
                    </div>
                </div>
                <div class="form-item">
                    <Button type="black" :loading="editLoading" class="submit-btn" @click="handlerEdit">保存修改</Button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'UserInfo',
        data() {
            return {
                form: {},
                editLoading: false
            }
        },
        computed: {
            userinfo: {
                get() {
                    return this.$root.userinfo || {}
                }
            }
        },
        mounted() {
        },
        methods: {
            async handlerFileUpload(e) {
                const file = e.target.files[0]
                if (file) {
                    const {data} = await this.$api.uploadFile(file, 'avatar-' + this.$utils.store.get('userInfo').objectId)
                    await this.$api.user.updateAvatar(data.url)
                    this.$api.removeFile(this.userinfo.avatar)
                    this.$root.getUserInfo()
                    this.$pop.message({
                        type: 'success',
                        text: '头像修改成功'
                    })
                }
            },
            async handlerEdit() {
                this.editLoading = true
                try {
                    await this.$api.user.update(this.userinfo)
                    this.$root.getUserInfo()
                    this.$pop.notice({
                        type: 'success',
                        title: '修改成功'
                    })
                } catch (e) {
                    this.$pop.notice({
                        type: 'error',
                        title: '修改失败'
                    })
                }
                this.editLoading = false
            }
        }
    }
</script>
