<template>
    <div class="comment-rich">
        <textarea class="textarea" :placeholder="placeholder" maxlength="100" :value="value" @input="handlerInput"></textarea>
        <div class="operate">
            <div class="left"></div>
            <Button type="black" @click="handlerSubmit" :loading="loading">评论</Button>
        </div>
    </div>
</template>

<script>
    import Button from "@/components/Button"

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
        components: {Button},
        methods: {
            handlerInput(e) {
                this.$emit('input', e.target.value)
            },
            async handlerSubmit() {
                await this.$emit('submit')
            }
        },
    }
</script>

<style lang="scss">
    .comment-rich {
        .textarea {
            width: 100%;
            min-width: 100%;
            max-width: 100%;
            height: 6.5em;
            min-height: 6.5em;
            outline: none;
            font-size: 14px;
            transition: border .3s;
            box-shadow: none;

            &::-webkit-scrollbar {
                width: 6px;
                height: 6px;
                background-color: #F5F5F5;
            }

            &::-webkit-scrollbar-thumb {
                -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
                background-color: #ccc;
            }

            &:focus {
                border-color: #666;
            }
        }

        .operate {
            margin-top: 15px;
            display: flex;
            justify-content: space-between;

            .btn {
                padding: 6px 20px;
                letter-spacing: 5px;
            }
        }
    }
</style>
