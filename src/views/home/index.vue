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
                <i class="iconfont icon-bookmark--line"></i>{{v.tags[0]}}
              </span>
                <span>
                <i class="iconfont icon-heart-line"></i>{{v.counts.collection}}
              </span>
                <span>
                <i class="iconfont icon-message--line1"></i>{{v.counts.comment}}
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
        name: 'Home',
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
        mounted() {
            this.getList()
        },
        activated() {
            this.getList()
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
<style lang="scss" scoped>
    .article-list {
        padding-top: 1px;
        width: 100%;
        min-height: calc(100vh - 60px);

        .item {
            position: relative;
            padding-top: 20px;
            padding-bottom: 30px;

            &:after {
                content: "";
                position: absolute;
                bottom: 0;
                left: 50px;
                right: 50px;
                border-bottom: 1px dashed #ccc;
            }

            &:nth-last-of-type(2) {
                &:after {
                    display: none;
                }
            }

            .summery {
                text-align: center;
                margin-bottom: 20px;
                color: #999;
            }

            .read-article {
                display: block;
                width: 100px;
                text-align: center;
                padding: 3px;
                margin: 0 auto;
                border: 2px solid #555;
                color: #555;
                font-size: 13px;
                transition: all .5s;

                &:hover {
                    border-color: #000;
                    background-color: #000;
                    color: #fff;
                }
            }
        }

        .top {
            margin-bottom: 30px;
            line-height: 30px;
        }
    }
</style>