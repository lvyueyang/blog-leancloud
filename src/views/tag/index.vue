<template>
    <div class="tag-wrapper">
        <div class="title">目前共计{{$root.count.tag}}个标签</div>
        <div class="tag-list">
            <ul>
                <router-link v-for="v in list"
                             :to="`/article?tag=${v.name}`"
                             :key="v.objectId"
                             tag="li"
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

<style lang="scss" scoped>
    .tag-wrapper {
        min-height: calc(100vh - 63px);
        padding-top: 50px;
        padding-bottom: 30px;

        .title {
            text-align: center;

            span {
                margin-left: 10px;
                color: #999;
                cursor: pointer;
                font-size: 12px;
            }
        }

        .tag-list {
            margin-top: 30px;

            li {
                display: inline-block;
                border-bottom: 1px solid #999;
                word-wrap: break-word;
                margin: 10px;
                cursor: pointer;
            }
        }
    }
</style>
