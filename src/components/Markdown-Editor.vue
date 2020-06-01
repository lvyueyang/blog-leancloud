<template>
    <div class="markdown-editor" @dragenter="dropShade = true">
        <div class="editor">
            <textarea ref="Textarea"></textarea>
        </div>
        <div class="markdown-body" ref="MdBody" v-html="mdContent"></div>

        <div class="drop-shade" :class="dropShadeLoading ? 'loading' : ''" v-show="dropShade"
             @dragenter="dropShade = true" @drop.prevent="handlerDrop" @drag="dropShade = true"
             @dragleave="dropShade = false">
            <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
        </div>
    </div>
</template>

<script>
    import CodeMirror from 'codemirror'
    import 'codemirror/lib/codemirror.css'
    import 'codemirror/mode/markdown/markdown'
    import {renderArticle} from '@/util/renderMarkdown'

    export default {
        name: 'MarkdownEditor',
        props: {
            value: ''
        },
        data() {
            return {
                editor: null,
                content: '',
                mdContent: '',
                dropShade: false,
                dropShadeLoading: false,
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            setContent(text) {
                this.editor.setValue(text)
            },
            getContent() {
                return {
                    markdown: this.editor.getValue(),
                    html: this.mdContent,
                }
            },
            init() {
                const editor = CodeMirror.fromTextArea(this.$refs['Textarea'], {
                    mode: 'markdown',
                    lineNumbers: false,
                    lineWrapping: true,
                })
                this.editor = editor
                const mdView = this.$refs['MdBody']
                this.setMdContent()
                editor.on('change', () => {
                    this.setMdContent()
                    this.$emit('change', this.getContent())
                })
                editor.on('scroll', () => {
                    const {top, height, clientHeight} = this.editor.getScrollInfo()
                    const position = top / (height - clientHeight)
                    mdView.scrollTop = position * (mdView.scrollHeight - mdView.clientHeight)
                })
            },
            setMdContent() {
                this.mdContent = renderArticle(this.editor.getValue())
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
                    // let {data} = await this.$api.article.create(form)
                    // this.mdAddImgUrl(file.name, data.url)
                }
            },
        }
    }
</script>

<style lang="scss">
    .markdown-editor {
        position: relative;
        z-index: 9;
        flex: 1;
        display: flex;
        height: calc(100vh - 60px);

        .editor {
            flex: 0 0 50%;
            display: flex;
            flex-direction: column;
            height: 100%;
            border-right: 1px solid #bbb;
        }

        .CodeMirror {
            flex: 1;
            background: #f7f7f7;
            font-family: 'Monda', "PingFang SC", "Microsoft YaHei", sans-serif;
            cursor: text;
            padding: 5px 10px;
            font-size: 14px;
            line-height: 24px;

            .CodeMirror-vscrollbar {
                outline: none;
            }
        }

        .cm-s-default .cm-header {
            color: #000 !important;
        }

        .cm-s-default .cm-comment {
            word-break: break-all;
        }

        .markdown-body {
            height: 100%;
            overflow-y: auto;
            padding: 15px;
        }

        .drop-shade {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 2000;
            width: 100%;
            height: 100%;
            display: flex;
            border: 2px dashed #000;
            background-color: rgba(238, 238, 238, .5);
            background-image: url("../assets/img/drag.svg");
            background-repeat: no-repeat;
            background-position: center center;
            background-size: 50px;
            opacity: 1;
            overflow-x: hidden;

            input {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                opacity: 0;
            }

            &.loading {
                background-image: url("../assets/img/upload.svg");
                background-size: auto;
                border: none;

                &:after {
                    position: absolute;
                    content: '';
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 0;
                    background-color: rgba(0, 0, 0, .3);
                    animation: heightAni 3s infinite linear;
                }
            }
        }
    }

    @keyframes heightAni {
        0% {
            height: 0;
            opacity: 1;
        }
        95% {
            height: 100%;
            opacity: 1;
        }
        100% {
            height: 100%;
            opacity: 0;
        }
    }
</style>