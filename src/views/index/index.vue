<template>
    <div class="article-list">
        <div class="item" v-for="v in list" :key="v.objectId">
            <router-link :to="`/article/${v.objectId}`" class="article-title">
                <span>{{v.title}}</span>
            </router-link>
            <div class="article-info">
              <span>
                <i class="iconfont icon-time-line"></i>{{v.createdAt | formatDate}}
              </span>
                <span>
                <i class="iconfont icon-bookmark--line"></i>{{v.tags[0].name}}
              </span>
                <span>
                <i class="iconfont icon-heart-line"></i>{{v.counts.like}}
              </span>
                <span>
                <i class="iconfont icon-message--line1"></i>{{v.counts.comment}}
              </span>
                <span>
                <i class="iconfont icon-eye-line"></i>{{v.counts.look}}
              </span>
            </div>
            <div class="summery">{{v.content | contentFilter | overflowEllipsis}}</div>
            <router-link :to="`/article/${v.objectId}`" class="read-article">阅读全文</router-link>
        </div>
        <pager v-if="list" :page="page" :count="count" @next="pageFn(1)" @prev="pageFn(-1)"/>
    </div>
</template>
<div></div>
<script>
    import Pager from '../../components/Pager.vue'

    export default {
        name: 'Index',
        data() {
            return {
                list: null,
                count: 0,
                page: 1
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
                const {data} = await this.$api.article.list({page: this.page})
                this.list = data.results
                this.count = data.results.length
            },
            // 翻页
            async pageFn(number) {
                this.page += number
                await this.getList()
                this.$nextTick(() => {
                    this.$utils.scrollToTop()
                })
            }
        }
    }
</script>
