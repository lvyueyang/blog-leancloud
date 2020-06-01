<template>
    <div class="pager">
        <button @click="prev" v-if="page > 1">上一页</button>
        <button @click="next" v-if="count >= 10">下一页</button>
    </div>
</template>

<script>
    export default {
        name: 'Pager',
        props: {
            page: {
                type: [Number, String],
                default: 1
            },
            count: {
                type: [Number, String],
                default: 10
            }
        },
        methods: {
            prev() {
                this.$emit('prev')
            },
            next() {
                this.$emit('next')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .pager {
        text-align: center;
        margin-bottom: 30px;
        font-size: 13px;

        button {
            border: none;
            margin: 0 15px;

            &:hover {
                text-decoration: underline;
            }
        }

        a, span {
            color: #333;
            padding: 3px 10px;
            margin: 0 3px;
        }

        a {
            &:hover, &.active {
                background-color: #eee;
            }
        }
    }

</style>