<template>
    <div class="main-wrapper">
        <side-bar></side-bar>
        <div class="container">
            <router-view/>
            <div class="footer">
                © 2018 - 2020 阿炸克斯 <a target="_blank" href="http://www.miitbeian.gov.cn/">冀ICP备16025784号</a>
            </div>
        </div>
    </div>
</template>
<script>
    import SideBar from '../components/SideBar'

    export default {
        name: 'Main',
        components: {
            SideBar,
        },
    }
</script>
<style lang="scss" scoped>

    .main-wrapper {
        position: relative;
        max-width: 1000px;
        margin: 0 auto;
        display: flex;
    }

    .container {
        flex: 1;
        width: 100%;
        min-height: 100vh;
        margin-left: 20px;
        background-color: #fff;
        padding: 0 30px;
        overflow-x: hidden;
        @media (max-width: 768px) {
            margin-left: 0;
            padding: 0 10px;
            overflow: hidden;
        }
    }

    .footer {
        margin: 0 -30px;
        font-size: 12px;
        text-align: center;
        height: 60px;
        line-height: 60px;
        padding: 0;
        color: #999;
        background-color: #f5f7f9;

        a {
            color: #999;
        }
    }
</style>
