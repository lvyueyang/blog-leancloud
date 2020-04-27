<template>
    <div contenteditable="true" @input="onInput" v-text="value"></div>
</template>

<script>
    export default {
        name: 'textareaDiv',
        props: {
            value: String,
            type: {
                type: String,
                default: 'text'
            }
        },
        data() {
            return {
                text: this.value
            }
        },
        methods: {
            onInput(e) {
                if (this.type === 'text') {
                    this.$emit('input', e.target.innerText)
                } else {
                    this.$emit('input', e.target.innerHTML)
                }
            }
        }
    }
</script>
