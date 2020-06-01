<template>
    <div class="comment-wrap">
        <div class="title"><span>评 论</span></div>
        <comment-rich v-model="form.value"
                      placeholder="填写你的评论内容 (支持Markdown语法，但是[表格、标题、图片]不会被转义)"
                      :loading="form.loading"
                      @submit="handlerSubmit"></comment-rich>
        <div class="list-none" v-if="list.length === 0">暂无评论</div>
        <div class="comment-list">
            <div class="comment-item" v-for="(v, index) in list" :key="v.objectId">
                <div class="parent">
                    <div class="avatar"><img :src="v.auth.avatar" alt=""/></div>
                    <div class="item-wrap-content">
                        <div class="iw-header">
                            <div class="username">
                                <span><b>{{v.auth.name}}</b></span>
                                <span>{{v.createdAt | relativeTime}}</span>
                            </div>
                            <div class="operate">
                            <span class="del"
                                  v-if="userId === v.auth.objectId"
                                  @click="handlerRemoveComment(v.objectId,index)">
                                删除
                            </span>
                                <span class="cur"
                                      @click="handlerToggleChildren(v, index)">{{v.counts.comment}}条评论</span>
                            </div>
                        </div>
                        <div class="content markdown-body" v-html="v.content"></div>
                    </div>
                </div>
                <!--子评论-->
                <div class="children-comment-list"
                     v-if="typeof v.children === 'object'"
                     v-show="v.children.show">
                    <!--回复评论输入框-->
                    <div class="comment-item">
                        <div class="parent">
                            <div class="avatar"><img :src="userInfo.avatar" alt=""></div>
                            <div class="item-wrap-content">
                                <div class="iw-header">
                                    <div class="username">
                                        <span><b>{{userInfo.name}}</b></span>
                                    </div>
                                </div>
                                <div class="content">
                                    <comment-rich v-model="v.children.content"
                                                  :placeholder="v.children.placeholder"
                                                  @submit="handlerCreateChildrenComment(v)"></comment-rich>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--子评论列表-->
                    <div class="comment-item" v-for="(c,c_index) in v.children.list" :key="c.objectId">
                        <div class="parent">
                            <div class="avatar"><img :src="c.auth.avatar" alt=""></div>
                            <div class="item-wrap-content">
                                <div class="iw-header">
                                    <div class="username">
                                        <span><b>{{c.auth.name}}</b></span>
                                        <span>{{c.createdAt | relativeTime}}</span>
                                    </div>
                                    <div class="operate">
                                        <span class="hf">回复</span>
                                        <span class="del" v-if="userId === c.auth.objectId"
                                              @click="handlerRemoveChildrenComment(c, c_index, v, index)">删除
                                        </span>
                                    </div>
                                </div>
                                <div class="content markdown-body" v-html="c.content"></div>
                            </div>
                        </div>
                    </div>
                    <div class="text-center more" v-if="v.children.more">
                        <Button :loading="v.children.loading" @click="handlerChildrenNext(v,index)">加载更多</Button>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-center more" v-if="more">
            <Button :loading="loading" @click="handlerNext">加载更多</Button>
        </div>
    </div>
</template>

<script>
    import Button from '@/components/Button'
    import CommentRich from './comment-rich'
    import {renderComment} from '@/util/renderMarkdown'

    export default {
        name: 'Comment',
        props: {
            articleId: [String, Number],
            articleInfo: Object
        },
        data() {
            return {
                form: {
                    value: '',
                    loading: false
                },
                page: 1,
                list: [],
                loading: false,
                more: false
            }
        },
        computed: {
            userId() {
                return this.$utils.store.get('userInfo').objectId || ''
            },
            userInfo() {
                return this.$utils.store.get('userInfo')
            }
        },
        components: {
            Button,
            CommentRich
        },
        mounted() {
            this.getList()
        },
        methods: {
            async getList() {
                try {
                    const {data} = await this.$api.comment.list({page: this.page, articleId: this.articleId})
                    // console.log(data)
                    this.list.push(...data.results)
                    this.more = data.results.length === 10
                } catch (e) {
                }
            },
            async handlerSubmit() {
                this.form.loading = true
                try {
                    const res = await this.$api.comment.create({
                        content: renderComment(this.form.value),
                        articleId: this.articleId,
                        articleInfo: this.articleInfo
                    })
                    this.form.value = ''
                    this.$api.comment.detail(res.data.objectId).then(res => {
                        this.list.unshift(res)
                    })
                } catch (e) {
                    console.error(e)
                }
                this.form.loading = false
            },
            handlerNext() {
                this.page += 1
                this.getList()
            },
            handlerRemoveComment(id, i) {
                this.$pop.confirm({
                    content: `确定要删除这条评论吗？`,
                    ok: async () => {
                        try {
                            await this.$api.comment.remove(id, this.articleId)
                            this.list.splice(i, 1)
                        } catch (e) {
                            console.log(e)
                        }
                    }
                })
            },
            // 子评论
            handlerToggleChildren(item, index) {
                if (!item.children) {
                    this.$set(this.list[index], 'children', {
                        show: false,
                        content: '',
                        loading: false,
                        placeholder: `回复：${item.auth.name}`,
                        list: [],
                        page: 1,
                    })
                }
                this.$set(this.list[index].children, 'show', !item.children.show)
                if (item.children.show) {
                    this.$set(this.list[index].children, 'list', [])
                    this.getChildrenCommentList(item.children.page, item.objectId, index)
                }
            },
            async getChildrenCommentList(page, commentId, index) {
                this.list[index].children.loading = true
                try {
                    const {data} = await this.$api.commentChildren.list({page, commentId})
                    this.list[index].children.more = (data.results.length === 10)
                    this.list[index].children.list.push(...data.results)
                } catch (e) {
                }
                this.list[index].children.loading = false
                this.list.splice(0, 0)
            },
            async handlerCreateChildrenComment(item) {
                try {
                    const {data} = await this.$api.commentChildren.create({
                        commentId: item.objectId,
                        content: renderComment(item.children.content)
                    })
                    item.children.content = ''
                    const info = await this.$api.commentChildren.detail(data.objectId)
                    item.children.list.unshift(info)
                    this.list.splice(0, 0)
                } catch (e) {
                }
            },
            handlerRemoveChildrenComment(c, c_index, item, index) {
                this.$pop.confirm({
                    content: `确定要删除这条评论吗？`,
                    ok: async () => {
                        try {
                            await this.$api.commentChildren.remove(c.objectId, item.objectId)
                            this.list[index].children.list.splice(c_index, 1)
                        } catch (e) {
                            console.log(e)
                        }
                    }
                })
            },
            handlerChildrenNext(item, index) {
                item.children.page += 1
                this.getChildrenCommentList(item.children.page, item.objectId, index)
            }
        },
    }
</script>

<style lang="scss">
    .comment-wrap {
        margin: 40px 0 0;

        .title {
            text-align: center;
            color: #333;
            font-weight: 500;
            font-size: 18px;
            margin-bottom: 20px;

            span {
                border-bottom: 2px solid #999;
            }
        }


        .comment-item {
            padding: 10px 0;
            color: #333;

            .parent {
                display: flex;
            }

            .avatar {
                flex: 0 0 40px;
                width: 40px;
                height: 40px;
                border-radius: 2px;
                overflow: hidden;
                margin-right: 10px;
            }

            .item-wrap-content {
                position: relative;
                flex: 1;
                border: 1px solid #ccc;
                border-radius: 4px;

                &:after {
                    position: absolute;
                    top: 11px;
                    right: 100%;
                    left: -16px;
                    display: block;
                    width: 0;
                    height: 0;
                    pointer-events: none;
                    content: " ";
                    border-color: transparent;
                    border-style: solid solid outset;
                    border-width: 8px;
                    border-right-color: #f6f8fa;
                }

                &:before {
                    position: absolute;
                    top: 13px;
                    left: -6px;
                    display: block;
                    z-index: 2;
                    width: 9px;
                    height: 9px;
                    pointer-events: none;
                    content: " ";
                    border: 1px solid transparent;
                    border-top-color: #ccc;
                    border-left-color: #ccc;
                    transform: rotate(-45deg);
                }

            }

            .iw-header {
                background: #f6f8fa;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px;
                border-bottom: 1px solid #ccc;
                border-top-left-radius: 4px;
                border-top-right-radius: 4px;

                .username {
                    font-size: 12px;

                    span {
                        margin-right: 10px;
                    }
                }
            }

            .content {
                padding: 8px 10px;
                background-color: #fff;
                border-radius: 4px;
                font-size: 14px;
            }

            .operate {
                font-size: 12px;
                line-height: 1;
                color: #666;

                span {
                    margin: 0 5px;
                }

                .del, .hf {
                    margin-left: 1em;
                    cursor: pointer;

                    &:hover {
                        color: #ff0068;
                    }
                }
            }
        }

        .more {
            margin: 8px auto 20px;

            button {
                border: none;
                text-decoration: underline;
            }
        }

        .children-comment-list {
            display: block;
            margin: 10px 0 0 50px;

            .comment-rich {
                background: transparent;
                padding: 10px 0;
                margin: 0;
            }
        }
    }
</style>
