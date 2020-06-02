<template>
    <div class="comment-rich">
        <textarea v-show="!md.show" ref="Editor" :placeholder="placeholder" v-model="content"></textarea>
        <div v-show="md.show" class="markdown-wrap" v-html="md.content"></div>
        <div class="img-list">
            <div class="item"></div>
        </div>
        <div class="operate">
            <div class="left">
                <div class="icon" title="添加图片" @click="handlerInsetImage">
                    <i class="iconfont icon-image-fill"></i>
                </div>
                <div class="icon" title="插入代码" @click="handlerInsetBlockCode">
                    <i class="iconfont icon-terminal-fill"></i>
                </div>
                <div class="icon" title="添加引用" @click="handlerInsetQuote">
                    <i class="iconfont icon-double-quotes-l"></i>
                </div>
                <div class="icon" title="添加连接" @click="handlerInsetLink">
                    <i class="iconfont icon-link"></i>
                </div>
                <div class="icon" title="加粗" @click="handlerInsetBold">
                    <i class="iconfont icon-bold"></i>
                </div>
                <div class="icon" title="斜体" @click="handlerInsetItalic">
                    <i class="iconfont icon-italic"></i>
                </div>
                <div class="icon" title="删除线" @click="handlerInsetStrikethrough">
                    <i class="iconfont icon-strikethrough"></i>
                </div>
                <div class="icon" title="预览" @click="handlerPreview">
                    <i class="iconfont icon-file-word--line"></i>
                </div>
            </div>
            <Button type="black" @click="handlerSubmit" :loading="loading">评论</Button>
        </div>
    </div>
</template>

<script>
    import Button from '@/components/Button'
    import {renderComment} from '@/util/renderMarkdown'

    export default {
        name: 'CommentRich',
        props: {
            value: {
                type: String,
                value: ''
            },
            placeholder: String,
            submit: Function,
            loading: Boolean,
        },
        data() {
            return {
                md: {
                    show: false,
                    content: ''
                }
            }
        },
        computed: {
            content: {
                get() {
                    return this.value
                },
                set(val) {
                    this.setValue(val)
                }
            }
        },
        watch: {},
        components: {
            Button,
        },
        mounted() {
        },
        methods: {
            async handlerSubmit() {
                await this.$emit('submit')
            },
            handlerInsetImage() {
                let text = '![]()'
                let offset = 2
                this.insetStr(text, offset, true)
            },
            handlerPreview() {
                this.md.show = !this.md.show
                if (this.md.show) {
                    this.md.content = renderComment(this.content)
                }
            },
            handlerInsetBold() {
                let text = '**{-}**'
                let offset = 2
                this.insetStr(text, offset, true)
            },
            handlerInsetItalic() {
                let text = '*{-}*'
                let offset = 1
                this.insetStr(text, offset, true)
            },
            handlerInsetStrikethrough() {
                let text = '~~{-}~~'
                let offset = 2
                this.insetStr(text, offset, true)
            },
            handlerInsetBlockCode() {
                let text = '\n``` \n\n```\n'
                let offset = 5
                if (this.content.length === 0) {
                    offset -= 1
                    text = '``` \n\n```\n'
                }
                this.insetStr(text, offset)
            },
            handlerInsetQuote() {
                let text = '\n> \n'
                let offset = 3
                if (this.content.length === 0) {
                    offset -= 1
                    text = '> \n'
                }
                this.insetStr(text, offset)
            },
            handlerInsetLink() {
                let text = '[]()'
                let offset = 1
                this.insetStr(text, offset)
            },
            insetStr(text, offset = 0, transition = false) {
                const editor = this.$refs['Editor']
                const start = editor.selectionStart
                const end = editor.selectionEnd
                const content = this.content
                if (transition && (start !== end)) {
                    let selectStr = content.substring(start, end)
                    console.log(selectStr)
                    text = text.replace(/{-}/ig, selectStr)
                } else {
                    text = text.replace(/{-}/ig, '')
                }
                let val = content.substring(0, start) + text + content.substring(end, content.length)
                this.setValue(val)
                this.$nextTick(() => {
                    editor.selectionStart = start + offset
                    editor.selectionEnd = start + offset
                    editor.focus()
                })
            },
            setValue(val) {
                this.$emit('input', val)
            }
        },
    }
</script>

<style lang="scss" scoped>
    .comment-rich {
        padding: 15px 20px 10px;
        margin-bottom: 10px;
        background-color: #f7f7f7;
        border-radius: 3px;

        textarea, .markdown-wrap {
            resize: vertical;
            max-height: 80vh;
            min-height: 100px;
            overflow-y: auto;
            border-radius: 3px;
        }

        .markdown-wrap {
            border: 1px solid #ccc;
            background: #fff;
            padding: 5px 15px;
        }

        .operate {
            padding-left: 0;
            margin-top: 15px;
            display: flex;
            justify-content: space-between;

            .btn {
                padding: 6px 20px;
                letter-spacing: 5px;
            }

            .left {
                display: flex;
                align-items: center;
                flex: 1;
                overflow-x: auto;
                margin-right: 10px;

                .icon {
                    cursor: pointer;
                    padding: 0 10px;
                    color: #666;

                    i {
                        font-size: 18px;
                    }

                    &:hover {
                        color: #000;
                    }
                }
            }
        }
    }
</style>
