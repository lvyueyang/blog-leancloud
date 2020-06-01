import MarkdownIt from 'markdown-it'
import hljs from '../assets/highlightjs/highlight.pack'

export function renderArticle(text) {
    const md = new MarkdownIt({
        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return `<i class="copy">${lang}</i><div class="code">${hljs.highlight(lang, str).value}</div>`
                } catch (__) {
                }
            }

            return ''
        }
    })
    return md.render(text)
}

export function renderComment(text) {
    const md = new MarkdownIt({
        highlight: (str, lang) => {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return hljs.highlight(lang, str).value
                } catch (__) {
                }
            }
            return ''
        }
    })
    md.disable(['table', 'heading'])
    return md.render(text)
}
