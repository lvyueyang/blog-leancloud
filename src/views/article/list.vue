<template>
    <div class="article-list-simple">
        <div class="top">
            <div class="search">
                <input type="text" v-model="search.value" @keyup.enter="searchFn" placeholder="搜索文章">
                <Button :loading="loading" @click="searchFn"><i class="iconfont icon-sousuo" v-show="!loading"></i>搜索
                </Button>
            </div>
        </div>
        <div class="list">
            <div class="item" v-for="v in list" :key="v.objectId">
                <div class="info">
                    <span class="tag" v-for="tag in v.tags" :key="tag.objectId">{{tag.name}}</span>
                    <span class="time">{{v.createdAt | formatDate}}</span>
                </div>
                <router-link :to="`/article/${v.objectId}`" class="title">
                    <span>{{v.title}}</span>
                </router-link>
                <div class="operate-info">
                    <button>
                        <i class="iconfont icon-heart-line"></i>
                        <span> {{v.counts.like}}</span>
                    </button>
                    <button>
                        <i class="iconfont icon-message--line1"></i>
                        <span> {{v.counts.comment}}</span>
                    </button>
                </div>
            </div>
        </div>
        <pager v-if="list && list.length > 9" :page="page" :count="count" @next="pageFn(1)" @prev="pageFn(-1)"/>
    </div>
</template>
<script>
    import Pager from '../../components/Pager'

    export default {
        name: 'List',
        data() {
            return {
                search: {
                    value: ''
                },
                loading: true,
                list: [],
                page: 1,
                count: 10
            }
        },
        components: {
            Pager
        },
        created() {
            this.getList()
        },
        mounted() {
        },
        methods: {
            // 获取列表
            async getList() {
                this.loading = true
                const title = this.search.value
                const tag = this.$route.query.tag
                const params = {page: this.page, tag, title}
                const {data} = await this.$api.article.list(params)
                this.list = data.results
                this.count = data.results.length
                this.loading = false
            },
            // 翻页
            async pageFn(number) {
                this.page += number
                await this.getList()
                this.$utils.scrollToTop()
            },
            searchFn() {
                this.page = 1
                this.getList()
            }
        }
    }
</script>

<style>

</style>
