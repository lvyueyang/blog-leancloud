export default {
    store: {
        get(key) {
            try {
                return JSON.parse(localStorage.getItem(key))
            } catch (e) {
                return localStorage.getItem(key)
            }
        },
        set(key, value) {
            if (typeof value === 'object') {
                localStorage.setItem(key, JSON.stringify(value))
            } else {
                localStorage.setItem(key, value)
            }
        }
    },
    scrollToTop: () => {
        let Y = window.scrollY
        let h = window.document.body.scrollHeight
        const s = h / 20
        const wy = setInterval(() => {
            Y -= s
            window.scrollTo(0, Y)
            if (Y <= 0) {
                clearInterval(wy)
            }
        }, 20)
    },
    getUrlParam(name) {
        let url = window.location.search
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
        let result = url.substr(1).match(reg)
        return result ? decodeURIComponent(result[2]) : null
    },
    // 仅自己和管理员可写，所有人可读
    ACLWriteSetMe() {
        const id = this.store.get('userInfo').objectId
        return {
            '*': {
                read: true,
            },
            [id]: {
                write: true
            },
            'role:Admin': {
                write: true,
            }
        }
    }
}
