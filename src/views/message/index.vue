<template>
    <div class="admin-user-index">
        <ul class="message-list" style="padding: 10px;">
            <li v-for="v in list" :key="v._id">
                <div class="type"><span>{{v.type | messageType}}</span>
                    <small>{{v.createdAt | relativeTime}}</small>
                </div>
                <div>
                    <template v-for="c in v.content">
                        <span v-if="c.className === '_User'">用户 <span class="link">{{c.name}} </span></span>
                        <span class="link" v-if="c.className === 'Article'">{{c.title}}</span>
                        <span class="text" v-if="c.type === 'text'"> {{c.text}} </span>
                    </template>
                </div>
            </li>
        </ul>
        <div class="list-none" v-if="list.length === 0">暂无消息</div>
        <pager v-if="list && list.length > 9"
               :page="page"
               :count="count"
               @next="pageFn(1)"
               @prev="pageFn(-1)"/>
    </div>
</template>

<script>
    import Pager from '../../components/Pager'

    export default {
        name: 'Message',
        data() {
            return {
                loading: true,
                list: [],
                page: 1,
                count: 10
            }
        },
        components: {
            Pager
        },
        created() {
            this.getMsgList()
        },
        methods: {
            async getMsgList() {
                try {
                    this.loading = true
                    const {data} = await this.$api.message.list()
                    this.list = data.results
                    this.count = data.results.length
                    this.loading = false
                } catch (e) {
                    console.error(e)
                }
            },
            // 翻页
            async pageFn(number) {
                this.page += number
                await this.getList()
                this.$utils.scrollToTop()
            },
        }
    }
</script>
<style>
    body {
        overflow: hidden;
    }
</style>
<style lang="scss" scoped>
    .login-cb-wrapper {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;

        .wrap {
            max-width: 800px;
            width: 100%;
            padding: 50px 15px;
            background-color: #fff;
            margin-top: 20vh;

            .icon {
                text-align: center;
                padding: 30px;

                .img {
                    display: block;
                    margin: 0 auto;
                    width: 90px;
                    height: 90px;
                    background: url("data:image/svg+xml,%3Csvg class='icon' viewBox='0 0 1049 1024' xmlns='http://www.w3.org/2000/svg' width='131.125' height='128'%3E%3Cdefs%3E%3Cstyle/%3E%3C/defs%3E%3Cpath d='M524.98 0C234.675 0 0 234.676 0 524.98c0 232.068 150.367 428.5 358.968 498.034 26.075 5.215 35.636-11.299 35.636-25.206 0-12.168-.87-53.888-.87-97.347-146.02 31.29-176.441-62.58-176.441-62.58-23.468-60.842-58.235-76.487-58.235-76.487-47.804-32.16 3.477-32.16 3.477-32.16 53.02 3.477 80.833 53.89 80.833 53.89 46.935 79.963 122.553 57.364 152.974 43.458 4.346-33.898 18.253-57.366 33.029-70.403-116.47-12.169-239.023-57.365-239.023-259.013 0-57.365 20.86-104.3 53.89-140.806-5.216-13.037-23.469-66.926 5.214-139.067 0 0 44.328-13.907 144.282 53.888 41.72-11.299 86.918-17.383 131.245-17.383s89.525 6.084 131.245 17.383c99.955-67.795 144.283-53.888 144.283-53.888 28.682 72.141 10.43 126.03 5.215 139.067 33.897 36.505 53.888 83.44 53.888 140.806 0 201.648-122.553 245.975-239.891 259.013 19.122 16.514 35.636 47.804 35.636 97.347 0 70.403-.87 126.899-.87 144.282 0 13.907 9.562 30.421 35.637 25.206 208.6-69.533 358.967-265.966 358.967-498.035C1049.96 234.676 814.413 0 524.98 0z'/%3E%3Cpath d='M199.04 753.571c-.869 2.608-5.215 3.477-8.692 1.739s-6.084-5.215-4.345-7.823c.869-2.607 5.215-3.477 8.691-1.738s5.215 5.215 4.346 7.822zm20.86 23.468c-2.607 2.607-7.822.87-10.43-2.608-3.476-3.476-4.346-8.691-1.738-11.299 2.607-2.607 6.953-.869 10.43 2.608 3.477 4.346 4.346 9.56 1.738 11.299zM240.76 807.46c-3.476 2.607-8.691 0-11.299-4.346-3.477-4.346-3.477-10.43 0-12.168 3.477-2.608 8.692 0 11.3 4.346 3.476 4.345 3.476 9.56 0 12.168zm28.683 29.552c-2.607 3.476-8.692 2.607-13.907-1.739-4.346-4.345-6.084-10.43-2.607-13.037 2.607-3.477 8.691-2.608 13.907 1.738 4.345 3.477 5.215 9.561 2.607 13.038zm39.113 16.514c-.87 4.346-6.954 6.084-13.038 4.346-6.084-1.738-9.56-6.954-8.692-10.43.87-4.346 6.954-6.084 13.038-4.346 6.084 1.738 9.56 6.084 8.692 10.43zm42.59 3.477c0 4.346-5.216 7.822-11.3 7.822-6.084 0-11.3-3.476-11.3-7.822s5.216-7.823 11.3-7.823c6.084 0 11.3 3.477 11.3 7.823zm39.981-6.954c.87 4.346-3.477 8.692-9.56 9.561-6.085.87-11.3-1.738-12.17-6.084-.868-4.346 3.477-8.692 9.562-9.56 6.084-.87 11.299 1.737 12.168 6.083zm0 0'/%3E%3C/svg%3E") no-repeat center center;
                    background-size: 100%;

                    &.loading {
                        animation: aniLoading 1.5s linear infinite;
                        transform: scale(1);
                    }
                }
            }

            .msg {
                font-size: 20px;
                text-align: center;
            }

            .info {
                text-align: center;
                font-size: 14px;
                color: #ccc;
                margin-bottom: 30px;
                line-height: 1.7;
            }
        }
    }

    @keyframes aniLoading {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.2);
        }
        100% {
            transform: scale(1);
        }
    }
</style>