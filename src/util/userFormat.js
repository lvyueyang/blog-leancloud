export default (value) => {
    const reg = /\[@.*\]\(\/user\/.*\)/g
    if (reg.test(value)) {
        const str = value.match(reg)
        for (let i of str) {
            let href = i.match(/\(.*\)/g)[0].replace(/\(/, '').replace(/.$/, '')
            let text = i.match(/\[@.*\]/g)[0].replace(/\[/, '').replace(/.$/, '')
            const a = `<a href="${href}">${text}</a>`
            const index = value.indexOf(i)
            const len = i.length
            const c = value.substring(0, index)
            const d = value.substring(index + len, value.length)
            value = c + a + d
        }
    }
    return value
}
