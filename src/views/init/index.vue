<template>
    <div class="init-wrapper">
        <div>提示：请在执行登录后执行此操作</div>
        <button class="btn" @click="init">初始化</button>
    </div>
</template>

<script>
    export default {
        name: 'init',
        data() {
            return {}
        },
        created() {

        },
        methods: {
            async init() {
                try {
                    await this.$api.user.initProject()
                    this.$pop.alert('初始化成功')
                } catch (e) {
                    console.error(e)
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .init-wrapper {
        max-width: 800px;
        width: 100%;
        background: #fff;
        height: 200px;
        margin: 20vh auto 0;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        .btn {
            margin-top: 20px;
            width: 200px;
            height: 50px;
            cursor: pointer;
            border-radius: 3px;
            background: #000;
            color: #fff;
        }
    }
</style>