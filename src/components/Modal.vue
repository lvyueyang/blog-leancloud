<template>
    <div class="modal" v-show="show">
        <div class="modal-wrap">
            <div class="close" @click="handlerClose"><i class="iconfont icon-close-fill"></i></div>
            <div class="modal-title">
                <slot name="title"></slot>
            </div>
            <div class="modal-body"></div>
            <div class="modal-footer">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Modal',
        props: {
            value: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                show: false
            }
        },
        watch: {
            value: {
                handler(val) {
                    this.show = val
                },
                immediate: true
            },
            show: {
                handler(val) {
                    let visibility = 'hidden'
                    if (val) {
                        visibility = 'hidden'
                    } else {
                        visibility = 'scroll'
                    }
                    document.body.style.overflow = visibility
                },
                immediate: true
            }
        },
        mounted() {
            document.body.appendChild(this.$el)
        },
        methods: {
            handlerClose() {
                this.show = false
                this.$emit('input', false)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .modal {
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .3);
        color: #333;
        overflow-y: auto;

        .modal-wrap {
            position: relative;
            width: 50%;
            margin: 40px auto 10px;
            display: block;
            border-radius: 2px;
            background: #fff;

            .close {
                position: absolute;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                right: 10px;
                top: 10px;
                cursor: pointer;
                color: #666;

                &:hover {
                    color: #000;
                }
            }

            .modal-title {
                height: 45px;
                line-height: 45px;
                padding-left: 10px;
                font-size: 16px;
                border-bottom: 1px solid #ddd;
            }

            .modal-body {
                padding: 10px;
                background: #fff;
            }

            .modal-footer {
                display: flex;
                justify-content: flex-end;
                padding: 0 10px;
                align-items: center;
                height: 45px;
                border-top: 1px solid #ddd;
            }

        }
    }
</style>
