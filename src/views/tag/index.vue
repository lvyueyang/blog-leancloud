<template>
    <div class="tag-wrapper">
        <div class="title">目前共计{{$root.count.tag}}个标签</div>
        <div class="tag-list">
            <ul>
                <!-- :to="`/article?tag=${v.objectId}`" -->
                <router-link v-for="v in list" :key="v.objectId" tag="li" to=""
                             :style="{'font-size': v.size + 'px'}">{{v.name}}
                </router-link>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Tag',
        data() {
            return {
                list: []
            }
        },
        created() {
            this.getList()
        },
        mounted() {
        },
        methods: {
            async getList() {
                const {data} = await this.$api.tag.list()
                this.list = data.results.map(i => {
                    i.size = i.articleCount + 14
                    if (i.size > 33) {
                        i.size = 33
                    }
                    return i
                })
            }
        }
    }
</script>

<style>

</style>
