<template>
    <div class="pager">
        <button @click="prev" v-if="page > 1">上一页</button>
        <!--<a href="" class="active">1</a>-->
        <!--<a href="">2</a>-->
        <!--<span>...</span>-->
        <!--<a href="">15</a>-->
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
