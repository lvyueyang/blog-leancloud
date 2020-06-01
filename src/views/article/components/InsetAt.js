import {Node} from 'tiptap'

export default class InsetAt extends Node {

    get name() {
        return 'at'
    }

    get schema() {
        return {
            inline: true,
            attrs: {
                user: {
                    default: '',
                },
                class: {
                    default: 'at-user'
                }
            },
            group: 'inline',
            selectable: false,
            parseDOM: [
                {
                    tag: 'span',
                    getAttrs: dom => ({
                        user: dom.getAttribute('user')
                    }),
                },
            ],
            toDOM: node => {
                const {customData} = node
                return ['span', node.attrs, customData.name]
            },
        }
    }

    commands({type}) {
        return attrs => {
            return (state, dispatch) => {
                const {selection} = state
                const position = selection.$cursor ? selection.$cursor.pos : selection.$to.pos
                let node = type.create(attrs)
                node.customData = {
                    ...attrs
                }
                const transaction = state.tr.insert(position, node)
                dispatch(transaction)
            }
        }
    }
}
