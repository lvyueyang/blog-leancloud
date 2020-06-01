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
                    <span class="tag" v-for="tag in v.tags" :key="tag">{{tag}}</span>
                    <span class="time">{{v.createdAt | formatDate}}</span>
                </div>
                <router-link :to="`/article/${v.objectId}`" class="title">
                    <span>{{v.title}}</span>
                </router-link>
                <div class="operate-info">
                    <button>
                        <i class="iconfont icon-heart-line"></i>
                        <span> {{v.counts.collection}}</span>
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

<style lang="scss" scoped>
    .article-list-simple {
        .search {
            border-bottom: 1px solid #f7f7f7;
            padding: 20px 0;
            display: flex;

            button {
                flex: 0 0 100px;
                margin-left: 10px;
            }
        }

        .list {
            min-height: calc(100vh - 143px);

            .item {
                border-bottom: 1px solid #f7f7f7;
                padding: 10px 0;

                &:hover {
                    border-bottom: 1px solid #ccc;
                }

                .info {
                    font-size: 14px;
                    color: #999;

                    .tag {
                        color: #ff0068;

                        &:after {
                            content: '';
                            background-color: #999;
                            border-radius: 50%;
                            width: 2px;
                            height: 2px;
                            display: inline-block;
                            vertical-align: middle;
                            margin: 0 4px;
                        }
                    }

                    .time {
                        font-size: 12px;
                    }
                }

                .title {
                    font-size: 20px;
                    color: #333;
                    margin: 10px 0;
                    display: block;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;

                    &:hover {
                        color: #000;
                    }
                }

                .operate-info {
                    display: flex;

                    button {
                        border-left: none;
                        padding: 3px 10px;

                        i {
                            display: inline-block;
                            font-size: 14px;
                        }

                        i, span {
                            vertical-align: middle;
                            color: #999;
                            line-height: 1;
                        }

                        &:nth-child(1) {
                            border-left: 1px solid #ccc;
                        }

                        &:hover {
                            background-color: #ccc;

                            i, span {
                                color: #fff;
                            }
                        }
                    }
                }
            }
        }

        .pager {
            margin-top: 30px;
        }
    }
</style>
