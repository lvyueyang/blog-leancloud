<template>
    <div class="article-detail">
        <div class="text-center" v-if="loading">文章加载中...</div>
        <div class="text-center" v-if="articleError">文章加载失败，或者文章不存在</div>
        <template v-if="info">
            <div class="article-title"><span>{{info.title}}</span></div>
            <div class="article-info">
                <div class="span">
                    <i class="iconfont icon-time-line"></i>{{info.createdAt | formatDate}}
                </div>
                <div class="span">
                    <i class="iconfont icon-heart-line"></i>{{info.counts.like}}
                </div>
                <div class="span">
                    <i class="iconfont icon-message--line1"></i>{{info.counts.comment}}
                </div>
                <div class="span">
                    <i class="iconfont icon-eye-line"></i>{{info.counts.look}}
                </div>
                <div class="span collection">
                    收藏
                </div>
                <router-link class="span cur" target="_blank" :to="'/editor?id='+ info.objectId">编辑</router-link>
            </div>
            <div class="content-html markdown-body" v-html="info.content"></div>
            <div class="article-tags">
                <router-link :to="`/article?tag=${v.objectId}`" v-for="v in info.tags" :key="v.objectId"># {{v.name}}
                </router-link>
            </div>
            <div class="page">
                <router-link v-if="info.prev" :to="`/article/${info.prev._id}`">上一篇 : {{info.prev.title}}</router-link>
                <span v-else></span>
                <router-link v-if="info.next" :to="`/article/${info.next._id}`">下一篇 : {{info.next.title}}</router-link>
                <span v-else></span>
            </div>
            <!--评论部分-->
            <comment :article-id="articleId"></comment>
        </template>
    </div>
</template>

<script>
    import Comment from './components/comment'
    import userFormat from '../../util/userFormat'

    export default {
        name: 'ArticleDetail',
        data() {
            return {
                info: null,
                loading: true,
                articleError: false,
                addLoading: false
            }
        },
        computed: {
            articleId() {
                return this.$route.params.id
            }
        },
        components: {Comment},
        mounted() {
            this.init()
        },
        methods: {
            init() {
                this.getDetail()
            },
            // 获取文章详情
            async getDetail() {
                this.loading = true
                this.articleError = false
                const id = this.$route.params.id
                try {
                    const data = await this.$api.article.detail(id)
                    // console.log(data)
                    data.content = this.$md.render(data.content)
                    this.info = data
                } catch (e) {
                    this.$pop.notice({
                        title: '获取失败',
                        type: 'error'
                    })
                    this.articleError = true
                }
                this.loading = false
            },
        }
    }
</script>
