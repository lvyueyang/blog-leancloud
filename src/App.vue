<template>
    <div id="app">
        <keep-alive>
            <router-view v-if="$route.meta.isKeepAlive"/>
        </keep-alive>
        <router-view v-if="!$route.meta.isKeepAlive"/>
        <router-view class="admin-main-wrapper" name="admin"/>
    </div>
</template>
<script>
    import SideBar from './components/SideBar'

    export default {
        name: 'App',
        components: {
            SideBar
        }
    }
</script>
<style lang="scss">
    @import "style/main";
</style>
