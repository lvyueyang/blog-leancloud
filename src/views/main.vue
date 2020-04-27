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
