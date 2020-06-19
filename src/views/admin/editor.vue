<template>
    <div class="editor-wrapper">
        <header class="header-wrapper">
            <input type="text" @input="changeSaveLocalFn" class="title-input" v-model="title" placeholder="请输入文章标题...">
            <div class="right-wrapper">
                <div class="status"><span v-show="status.show">{{status.text}}</span></div>
                <dl>
                    <dt @click.stop="handlerTagToggle">
                        发布
                        <i class="iconfont "
                           :class="tag.show ? 'icon-shangjiantou' : 'icon-xiajiantou'"></i>
                    </dt>
                    <dd @click.stop v-show="tag.show">
                        <div class="title">选择标签</div>
                        <div class="tags">
                            <Button v-for="v in tag.list" :key="v.objectId" @click="handlerActiveTag(v)"
                                    :class="{'active' : tag.active.includes(v.name)}">{{v.name}}
                            </Button>
                        </div>
                        <div class="text">
                            <input type="text" @keyup.enter="handlerAddTag" v-model="tag.value" placeholder="请输入标签名称">
                            <div class="tip">按下回车键，添加标签</div>
                        </div>
                        <Button class="submit" @click="handlerSubmitArticle">确认并{{id ? '修改' : '发布'}}</Button>
                    </dd>
                </dl>
            </div>
        </header>
        <markdown-editor ref="Editor" @change="changeSaveLocalFn"></markdown-editor>
    </div>
</template>
<script>
    import MarkdownEditor from '@/components/Markdown-Editor'

    export default {
        name: 'editor',
        data() {
            return {
                title: '',
                tag: {
                    list: [],
                    active: [],
                    value: '',
                    show: false,
                    default: ''
                },
                status: {
                    show: false,
                    text: '已保存',
                    timer: null
                },
                changeTimer: null
            }
        },
        components: {
            MarkdownEditor
        },
        watch: {},
        computed: {
            id() {
                return this.$route.query.id
            },
            editor() {
                return this.$refs['Editor']
            }
        },
        mounted() {
            document.body.style.overflow = 'hidden'
            this.getLocalArticle()
            this.getTagsList()
            this.getArticleInfo()
            window.addEventListener('click', () => {
                this.tag.show = false
            })
            window.addEventListener('keydown', this.ctrlAndS, false)
        },
        beforeDestroy() {
            document.body.style.overflow = 'scroll'
            window.removeEventListener('keydown', this.ctrlAndS, false)
        },
        methods: {
            // 发布/修改文章
            async handlerSubmitArticle() {
                await this.handlerAddTag()
                const {html, markdown} = this.editor.getContent()
                let form = {
                    title: this.title.trim(),
                    content: html,
                    markdown,
                    tags: this.tag.active
                }
                if (!form.title || !form.content.trim() || form.tags.length === 0) {
                    this.$pop.notice({
                        title: '缺少必填参数',
                        text: '文章 标题，内容，标签必须填写',
                        type: 'error'
                    })
                    return
                }
                try {
                    let res
                    let id
                    if (this.id) {
                        form.id = this.id
                        res = await this.$api.article.update(form)
                        id = this.id
                    } else {
                        res = await this.$api.article.create(form)
                        id = res.data.result.id
                    }
                    this.$utils.store.set('editor', {title: '', content: ''})
                    this.$pop.alert(`文章${this.id ? '修改' : '发布'}成功，点击确定查看文章`, () => {
                        this.$router.push('/article/' + id)
                    })
                } catch (e) {
                    console.log(e)
                }
            },
            // 获取文章信息，回显
            async getArticleInfo() {
                if (!this.id) {
                    return false
                }
                try {
                    const data = await this.$api.article.detail(this.id)
                    this.title = data.title
                    this.tag.active = data.tags
                    this.$nextTick(() => {
                        this.editor.setContent(data.markdown)
                    })
                } catch (e) {
                    this.$pop.notice({
                        title: '获取失败',
                        type: 'error'
                    })
                }
            },
            // 文章保存到本地
            ctrlAndS(e) {
                if (e.keyCode == 83 && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)) {
                    this.handlerSaveLocal()
                    e.preventDefault()
                }
            },
            handlerSaveLocal() {
                const title = this.title.trim()
                const {markdown} = this.editor.getContent()
                if (!title && !markdown) {
                    return false
                }
                this.status.show = true
                this.status.text = '保存中'
                clearTimeout(this.status.timer)
                this.$utils.store.set('editor', {title, content: markdown})
                this.status.text = '已保存'
                this.status.timer = setTimeout(() => {
                    this.status.show = false
                }, 1500)
            },
            getLocalArticle() {
                if (this.id) {
                    return
                }
                const data = this.$utils.store.get('editor')
                if (!data) {
                    return
                }
                if (!this.title && !this.content) {
                    this.title = data.title
                    this.editor.setContent(data.content)
                }
            },
            changeSaveLocalFn(code, html) {
                clearTimeout(this.changeTimer)
                this.changeTimer = setTimeout(() => {
                    this.handlerSaveLocal()
                }, 2000)
            },
            // 标签操作
            handlerTagToggle() {
                this.tag.show = !this.tag.show
            },
            // 获取标签列表
            async getTagsList() {
                const {data} = await this.$api.tag.list()
                this.tag.list = data.results
            },
            // 选择标签
            handlerActiveTag(item) {
                const name = item.name
                const active = this.tag.active
                const index = active.indexOf(name)
                if (index < 0) {
                    active.push(name)
                } else {
                    active.splice(index, 1)
                }
            },
            // 添加标签
            async handlerAddTag() {
                const name = this.tag.value.trim()
                if (!name) {
                    return
                }
                if (this.tag.list.some(item => item.name === name)) {
                    this.$pop.notice({
                        title: '标签不能重复',
                        type: 'error'
                    })
                    return
                }
                try {
                    await this.$api.tag.create(name)
                    this.tag.active.push(name)
                    this.getTagsList()
                    this.tag.value = ''
                } catch (e) {
                    console.error(e)
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .editor-wrapper {
        display: flex;
        flex-direction: column;
        height: 100vh;
        background-color: #fff;

        .header-wrapper {
            position: relative;
            z-index: 10;
            flex: 0 0 60px;
            display: flex;
            border-bottom: 1px solid #ccc;

            .title-input {
                border: none;
                font-size: 23px;
                font-weight: 700;
                padding: 0 20px;
                color: #333;
            }

            .right-wrapper {
                position: relative;
                flex: 0 0 160px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 20px;
                font-size: 16px;

                .status {
                    color: #ccc;

                    span {
                        text-decoration: underline;

                    }
                }

                dt {
                    cursor: pointer;

                    .iconfont {
                        font-size: 14px;
                    }
                }

                dd {
                    position: absolute;
                    right: 0;
                    top: 100%;
                    width: 350px;
                    background-color: #fff;
                    padding: 20px;
                    border: 1px solid #ccc;
                    border-right: none;

                    &:after {
                        position: absolute;
                        content: "";
                        width: 10px;
                        height: 10px;
                        border-left: 1px solid #ccc;
                        border-top: 1px solid #ccc;
                        background-color: #fff;
                        top: -6px;
                        right: 40px;
                        margin-left: 5px;
                        transform: rotate(45deg);
                    }

                    .title {
                        font-size: 18px;
                        color: #999;
                        font-weight: 700;
                        line-height: 2;
                        margin-bottom: 10px;
                    }

                    .tags {
                        max-height: 170px;
                        overflow-y: auto;
                        margin-bottom: 25px;

                        .btn {
                            padding: 5px 10px;
                            margin: 0 10px 10px 0;

                            &.active {
                                border-color: #000;
                                background-color: #000;
                                color: #fff;
                            }
                        }
                    }

                    .text {
                        transition: all .2s;

                        input {
                            border: none;
                            border-bottom: 1px solid #ccc;
                            border-radius: 0;

                            &:focus {
                                border-color: #000;

                                & + .tip {
                                    opacity: 1;
                                }
                            }
                        }

                        .tip {
                            padding: 5px 0 0 5px;
                            opacity: 0;
                            color: #ccc;
                            font-size: 12px;
                        }
                    }

                    .submit {
                        padding: 8px 20px;
                        display: block;
                        margin: 15px auto 0;
                        border-color: #000;
                        color: #000;
                        font-size: 16px;

                        &:hover {
                            background-color: #000;
                            color: #fff;
                        }
                    }
                }
            }
        }
    }
</style>