import utils from '../util'
import axios from './axios'
import {MESSAGE, USER} from './classMap'

/**
 * 创建Pointer对象
 * @param {String} className
 * @param {String} objectId
 * @return Object
 * */
export function createPointer(className, objectId) {
    return {
        __type: 'Pointer',
        className,
        objectId
    }
}

/**
 * 仅自己和管理员可写，所有人可读
 * @return Object
 * */
export function ACLWriteSetMe() {
    const id = utils.store.get('userInfo').objectId
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

/**
 * 当前登录用户ID
 * @return String
 * */
export function userId() {
    try {
        return utils.store.get('userInfo').objectId || ''
    } catch (e) {
        return ''
    }
}

/**
 * 分页倒序查询列表
 * @return Object
 * */
export function listPage(page) {
    return {
        count: '1',
        order: '-createdAt',
        limit: (page - 1) + 10,
        skip: (page - 1) * 10
    }
}


/**
 * 数字增加/减少
 * @param {String} classes
 * @param {String}  id
 * @param {String} key
 * @param {Number} amount 1:增加  -1:减少
 * @return Object
 * */
export async function updateDataCount(classes, id, key, amount = 1) {
    return axios.put(`/classes/${classes}/${id}`, {[key]: {__op: 'Increment', amount}})
}

/**
 * 发送消息
 * @param {String} from 发送者
 * @param {String} to 接收者
 * @param {Array} content 消息内容
 * @param {String} title 消息标题
 * @param {String} type 消息类型 1:系统消息  2:用户消息 3:私信
 * */

export async function sendMessage({from = userId(), to = '', content = [], title = '', type = '1'} = {}) {
    try {
        const data = {
            title,
            content,
            type,
            from: createPointer(USER, from),
            to: createPointer(USER, to),
            read: false,
            ACL: ACLWriteSetMe()
        }
        return await axios.post(`classes/${MESSAGE}`, data)
    } catch (e) {
        console.error(e)
    }
}