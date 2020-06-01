<template>
    <button class="btn" :class="'btn-'+ type" :disabled="loading" @click="$emit('click')">
        <span v-if="loading" class="loading-fix" @click.stop></span>
        <i v-if="loading" class="iconfont icon-shuaxin loading-icon"></i>
        <slot></slot>
    </button>
</template>
<script>
    export default {
        name: 'Button',
        props: {
            loading: {
                type: Boolean,
                default: false
            },
            type: {
                type: String,
                default: ''
            }
        },
        data() {
            return {}
        },
        mounted() {
        },
        methods: {}
    }
</script>
<style lang="scss" scoped>
    .btn {
        position: relative;
        padding: 3px 12px;
        background: #fff;
        border: 1px solid #ccc;
        color: #666;
        border-radius: 3px;

        .loading-icon {
            margin-right: 3px;
            display: inline-block;
            animation: rotateLoading 1s linear infinite;
            font-size: 14px;
            transform-style: preserve-3d;
        }

        span {
            vertical-align: middle;
        }

        &:hover {
            border-color: #333;
            color: #333;

            i {
                color: #333;
            }
        }

        &:active {
            border-color: #333;
            color: #333;
            opacity: 0.7;
        }

        &.btn-black {
            background-color: #000;
            color: #fff;
            border-color: #000;

            &:hover {
                .loading-icon {
                    color: #fff;
                }
            }
        }

        &[disabled] {
            &:active {
                opacity: 1;
            }
        }

        .loading-fix {
            position: absolute;
            left: -1px;
            top: -1px;
            right: -1px;
            bottom: -1px;
            background-color: #fff;
            opacity: .6;
        }
    }
</style>
