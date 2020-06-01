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
                    <i class="iconfont icon-heart-line"></i>{{info.counts.collection}}
                </div>
                <div class="span">
                    <i class="iconfont icon-message--line1"></i>{{info.counts.comment}}
                </div>
                <!--<div class="span">
                    <i class="iconfont icon-eye-line"></i>{{info.counts.look}}
                </div>-->
                <div class="span collection" @click="handlerCollection">
                    {{isCollection ? '已收藏' : '收藏'}}
                </div>
                <router-link v-if="userId === info.auth.objectId"
                             class="span cur"
                             target="_blank"
                             :to="'/editor?id='+ info.objectId">编辑
                </router-link>
            </div>
            <div class="content-html markdown-body" v-html="info.content"></div>
            <div class="article-tags">
                <router-link :to="`/article?tag=${v}`" v-for="v in info.tags" :key="v"># {{v}}
                </router-link>
            </div>
            <div class="page">
                <router-link v-if="info.prev" :to="`/article/${info.prev._id}`">上一篇 : {{info.prev.title}}</router-link>
                <span v-else></span>
                <router-link v-if="info.next" :to="`/article/${info.next._id}`">下一篇 : {{info.next.title}}</router-link>
                <span v-else></span>
            </div>
            <!--评论部分-->
            <comment :article-id="articleId" :article-info="info"></comment>
        </template>
    </div>
</template>

<script>
    import Comment from './components/comment'

    export default {
        name: 'ArticleDetail',
        data() {
            return {
                info: null,
                loading: true,
                articleError: false,
                addLoading: false,
                isCollection: false
            }
        },
        computed: {
            articleId() {
                return this.$route.params.id
            },
            userId() {
                return this.$utils.store.get('userInfo').objectId
            }
        },
        components: {Comment},
        async mounted() {
            this.loading = true
            this.articleError = false
            await this.getDetail()
            this.loading = false
            this.judgeCollection()
        },
        methods: {
            async judgeCollection() {
                try {
                    const d = await this.$api.article.userInCollectionArticle(this.articleId)
                    this.isCollection = !!d
                } catch (e) {
                    this.isCollection = false
                }
            },
            // 获取文章详情
            async getDetail() {
                const id = this.articleId
                try {
                    this.info = await this.$api.article.detail(id)
                } catch (e) {
                    this.$pop.notice({
                        title: '获取失败',
                        type: 'error'
                    })
                    this.articleError = true
                }
            },
            async handlerCollection() {
                const id = this.articleId
                try {
                    await this.$api.article.collection(id)
                    await this.getDetail()
                    await this.judgeCollection()
                } catch (e) {
                    console.log(e)
                    this.$pop.notice({
                        title: '操作失败',
                        type: 'error'
                    })
                }

            },
        }
    }
</script>
<style lang="scss" scoped>
    .article-detail {
        min-height: calc(100vh - 63px);
        padding-top: 50px;
        padding-bottom: 30px;

        .content-html {
            margin-top: 40px;
            margin-bottom: 20px;
            width: 100%;
            overflow: hidden;
        }

        .page {
            display: flex;
            justify-content: space-between;
            border-top: 1px dashed #eee;
            font-size: 12px;
            padding-top: 15px;
            margin-top: 25px;

            a {
                color: #666;

                &:hover {
                    color: #333;

                    i {
                        color: #333;
                    }
                }
            }

            i {
                font-size: 12px;
            }
        }
    }
</style>