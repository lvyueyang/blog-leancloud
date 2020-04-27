<template>
    <div class="comment-wrap">
        <div class="title"><span>评 论</span></div>
        <comment-rich v-model="form.value"
                      placeholder="填写你的评论内容"
                      :loading="form.loading"
                      @submit="handlerSubmit"></comment-rich>
        <div class="comment-list">
            <div class="comment-item" v-for="(v, index) in list" :key="v.objectId">
                <!--评论人信息-->
                <div class="user-info">
                    <div class="avatar"><img :src="v.auth.avatar" alt=""/></div>
                    <div class="username">{{v.auth.name}}</div>
                </div>
                <!--评论内容-->
                <div class="content" v-html="v.content"></div>
                <!--操作-->
                <div class="operate">
                    <div class="like"><i class="iconfont icon-thumb-up-line"></i><span>{{v.counts.like}}</span></div>
                    <div @click="handlerToggleChildren(v, index)">{{v.counts.comment}}条评论</div>
                    <span>{{v.createdAt | relativeTime}}</span>
                    <span>&emsp;</span>
                    <div v-if="userId === v.auth.objectId" @click="handlerRemoveComment(v.objectId)">删除</div>
                </div>
                <!--子评论-->
                <div class="children-comment-list" v-if="typeof v.children === 'object'" v-show="v.children.show">
                    <!--回复评论输入框-->
                    <comment-rich v-model="v.children.content"
                                  :placeholder="v.children.placeholder"
                                  @submit="handlerCreateChildrenComment(v)"></comment-rich>
                    <!--列表-->
                    <div class="comment-item" v-for="c in v.children.list" :key="c.objectId">
                        <div class="user-info">
                            <div class="avatar"><img :src="c.auth.avatar" alt=""></div>
                            <div class="username">{{c.auth.name}}</div>
                        </div>
                        <div class="content" v-html="c.content"></div>
                        <div class="operate">
                            <span>{{c.createdAt | relativeTime}}</span>
                            <div class="hf">回复</div>
                            <div class="del" @click="handlerRemoveChildrenComment(v, c.objectId)">删除</div>
                        </div>
                    </div>
                    <div class="text-center" style="margin-top: 20px;" v-if="v.children.more">
                        <Button :loading="v.children.loading" @click="handlerChildrenNext(v,index)">加载更多</Button>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-center" style="margin-top: 20px;" v-if="more">
            <Button :loading="loading" @click="handlerNext">加载更多</Button>
        </div>
    </div>
</template>

<script>
    import Button from "@/components/Button"
    import CommentRich from './comment-rich'

    export default {
        name: 'Comment',
        props: {
            articleId: [String, Number],
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
                    console.log(data)
                    this.list.push(...data.results)
                    this.more = data.results.length === 10
                } catch (e) {
                }
            },
            async handlerSubmit() {
                this.form.loading = true
                try {
                    const res = await this.$api.comment.create({
                        content: this.form.value,
                        articleId: this.articleId
                    })
                    this.form.value = ''
                    this.$api.comment.detail(res.data.objectId).then(res => {
                        this.list.unshift(res)
                    })
                } catch (e) {
                }
                this.form.loading = false
            },
            handlerNext() {
                this.page += 1
                this.getList()
            },
            handlerRemoveComment(id) {

            },
            // 子评论
            handlerToggleChildren(item, index) {
                if (!item.children) {
                    item.children = {
                        show: false,
                        content: '',
                        loading: false,
                        placeholder: `回复：${item.auth.name}`,
                        list: [],
                        page: 1,
                    }
                }
                item.children.show = !item.children.show
                if (item.children.show) {
                    this.list[index].children.list = []
                    this.getChildrenCommentList(item.children.page, item.objectId, index)
                }
                this.list.splice(0, 0)
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
                        content: item.children.content
                    })
                    const info = await this.$api.commentChildren.detail(data.objectId)
                    console.log(info)
                    item.children.list.unshift(info)
                    this.list.splice(0, 0)
                } catch (e) {

                }
            },
            handlerRemoveChildrenComment() {
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

        .comment-rich {
            padding: 15px 20px 10px;
            margin-bottom: 10px;
            background-color: #f7f7f7;
        }

        .comment-item {
            border-bottom: 1px solid #eee;
            padding: 10px 0 20px;
            color: #333;

            &:last-of-type {
                border: none;
            }

            .user-info {
                display: flex;
                align-items: center;
                margin-bottom: 5px;

                .username {
                    font-weight: 700;
                }

                .avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 2px;
                    overflow: hidden;
                    margin-right: 10px;
                    border: 1px solid #eee;
                }
            }

            .content {
                margin-left: 45px;
                padding: 8px 10px;
                background-color: #f5f5f5;
                border-radius: 3px;

                img {
                    max-width: 100%;
                    vertical-align: middle;
                }
            }

            .operate {
                padding: 10px 0 0 50px;
                font-size: 12px;
                line-height: 1;
                display: flex;
                align-items: center;
                color: #666;

                & > div {
                    margin-right: 15px;
                    cursor: pointer;
                }

                .like {
                    cursor: pointer;
                    background: #f7f7f7;
                    padding: 2px 5px;
                    border-radius: 3px;

                    span {
                        vertical-align: middle;
                    }

                    i {
                        vertical-align: middle;
                        margin-right: 3px;
                        font-size: 14px;
                    }
                }
            }
        }

        .children-comment-list {
            display: block;
            padding: 0 10px 15px;
            border: 1px solid #ddd;
            margin: 10px 0 0 50px;

            .comment-item {
                font-size: 13px;
                padding-bottom: 15px;

                .user-info {
                    margin-bottom: 5px;

                    .avatar {
                        width: 30px;
                        height: 30px;
                    }
                }

                .operate {
                    padding-left: 40px;

                    .hf, .del {
                        font-size: 12px;
                        display: none;
                        margin-left: 15px;

                        &:hover {
                            color: #333;
                        }
                    }

                    .del {
                        margin-left: 0;
                    }
                }

                .content {
                    margin-left: 35px;
                }

                &:hover {
                    .hf, .del {
                        display: block;
                    }
                }
            }

            .comment-rich {
                background: transparent;
                padding: 10px 0;
                margin: 0;

                .operate {
                    margin-top: 0;
                }
            }
        }
    }
</style>
