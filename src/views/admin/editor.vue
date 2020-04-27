<template>
    <div class="editor-wrapper">
        <header class="header-wrapper">
            <input type="text" @input="changeSaveLocalFn" class="title-input" v-model="title" placeholder="请输入文章标题...">
            <div class="right-wrapper">
                <div class="status"><span v-show="status.show">{{status.text}}</span></div>
                <dl>
                    <dt @click.stop="handlerTagToggle">发布 <i class="iconfont "
                                                             :class="tag.show ? 'icon-shangjiantou' : 'icon-xiajiantou'"></i>
                    </dt>
                    <dd @click.stop v-show="tag.show">
                        <div class="title">选择标签</div>
                        <div class="tags">
                            <Button v-for="v in tag.list" :key="v.objectId" @click="handlerActiveTag(v)"
                                    :class="{'active' : tag.active.includes(v.objectId)}">{{v.name}}
                            </Button>
                        </div>
                        <div class="text">
                            <input type="text" @keyup.enter="handlerAddTag" v-model="tag.value" placeholder="请输入标签名称">
                            <div class="tishi">按下回车键，添加标签</div>
                        </div>
                        <Button class="submit" @click="handlerSubmitArticle">确认并{{id ? '修改' : '发布'}}</Button>
                    </dd>
                </dl>
            </div>
        </header>
        <main class="editor-main" @dragenter="dropShade = true">
            <mavon-editor ref="editor" v-model="content" @change="changeSaveLocalFn" @save="handlerSaveLocal"
                          fontSize="16px"
                          :toolbars="toolbars" :toolbarsFlag="toolbarsFlag"/>
            <div class="drop-shade" :class="dropShadeLoading ? 'loading' : ''" v-show="dropShade"
                 @dragenter="dropShade = true" @drop.prevent="handlerDrop" @drag="dropShade = true"
                 @dragleave="dropShade = false">
                <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
            </div>
        </main>
    </div>
</template>
<script>

    export default {
        name: 'editor',
        data() {
            return {
                title: '',
                content: '',
                tag: {
                    list: [],
                    active: [],
                    value: '',
                    show: false,
                    default: ''
                },
                codeStyle: 'obsidian', // 主题样式
                toolbarsFlag: false,
                toolbars: {
                    underline: true, // 下划线
                    strikethrough: true, // 中划线
                    mark: true, // 标记
                    superscript: true, // 上角标
                    subscript: true, // 下角标
                    link: true, // 链接
                    imagelink: true, // 图片链接
                    table: true, // 表格
                    help: true, // 帮助
                    save: false, // 保存
                    fullscreen: false, // 全屏编辑
                    readmodel: false, // 沉浸式阅读
                    subfield: false, // 单双栏模式
                    preview: false, // 预览
                    navigation: true // 导航目录
                },
                dropShade: false,
                dropShadeLoading: false,
                status: {
                    show: false,
                    text: '已保存',
                    timer: setTimeout(() => {
                    }, 1500)
                },
                changeTimer: setTimeout(() => {
                }, 2000)
            }
        },
        computed: {
            id() {
                return this.$route.query.id
            }
        },
        mounted() {
            this.getLocalArticle()
            this.getTagsList()
            this.getArticleInfo()
            window.addEventListener('click', () => {
                this.tag.show = false
            })
        },
        methods: {
            // 发布/修改文章
            async handlerSubmitArticle() {
                await this.handlerAddTag()
                let form = {
                    title: this.title.trim(),
                    content: this.content,
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
                    if (this.id) {
                        form.id = this.id
                        res = await this.$api.article.update(form)
                    } else {
                        res = await this.$api.article.create(form)
                    }
                    const {data} = res
                    this.$utils.store.set('editor', {title: '', content: ''})
                    this.$pop.alert(`文章${this.id ? '修改' : '发布'}成功，点击确定查看文章`, () => {
                        this.$router.push('/article/' + data.objectId)
                    })
                } catch (e) {
                    console.log(e)
                    this.$pop.notice({
                        title: '文章发布失败',
                        type: 'error'
                    })
                }
            },
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
                const id = item.objectId
                const active = this.tag.active
                const index = active.indexOf(id)
                if (index < 0) {
                    active.push(id)
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
                try {
                    await this.$api.tag.create(name)
                    this.tag.active.push(name)
                    this.getTagsList()
                    this.tag.value = ''
                } catch (e) {
                    this.$pop.notice({
                        title: '添加标签失败',
                        text: '标签不能重复',
                        type: 'error'
                    })
                }
            },
            // 编辑器中添加图片
            mdAddImgUrl(name, url) {
                name = name.replace(/\[|\]|\(|\)/g, '')
                if (name) {
                    name = '未知名称'
                }
                this.$refs.editor.toolbar_left_addlink('img', name, url)
            },
            // 获取文章信息，并写入
            async getArticleInfo() {
                if (!this.id) {
                    return false
                }
                try {
                    const data = await this.$api.article.detail(this.id)
                    this.title = data.title
                    this.content = data.content
                    this.tag.active = data.tags.map(item => item.objectId)
                } catch (e) {
                    this.$pop.notice({
                        title: '获取失败',
                        type: 'error'
                    })
                }
            },
            // 文章保存到本地
            handlerSaveLocal() {
                const title = this.title.trim()
                const content = this.content
                if (!title && !content) {
                    return false
                }
                this.status.show = true
                this.status.text = '保存中'
                clearTimeout(this.status.timer)
                this.$utils.store.set('editor', {title, content})
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
                    this.content = data.content
                }
            },
            changeSaveLocalFn(code, html) {
                clearTimeout(this.changeTimer)
                this.changeTimer = setTimeout(() => {
                    this.handlerSaveLocal()
                }, 2000)
            },
            // 图片上传
            async handlerDrop(e) {
                const file = e.dataTransfer.files[0]
                try {
                    await this.uploadImg(file)
                    this.dropShadeLoading = false
                } catch (e) {
                    console.log(e)
                }
                this.dropShade = false
            },
            async uploadImg(file = false) {
                if (file) {
                    this.dropShadeLoading = true
                    let form = new FormData()
                    form.append('file', file)
                    let {data} = await this.$api.article.create(form)
                    this.mdAddImgUrl(file.name, data.url)
                }
            },
        }
    }
</script>
