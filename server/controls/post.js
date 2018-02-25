import _ from 'lodash'
import Model from '../models'
import Entity from '../service/entity'
import BookControl from './books'


export default class PostControl extends BookControl {
    constructor() {
        super()
    }

    /**
     * 获得发布文章列表
     */
    async postList(userid) {
        let conditions = {
            userid: userid,
            post: 1
        }
        let res = null
        let doc = await Entity.fetch(Model.books, 'update_time', conditions).catch(e => {
            res = {
                code: 500,
                data: null,
                msg: 'query error'
            }
        })
        // 解析数据
        if (!res) {
            res = {
                code: 200,
                data: doc,
                msg: ''
            }
        }

        //返回数据
        return new Promise((resolve) => {
            resolve(res)
        })
    }

    /**
     *
     * @param {*} bookid
     */
    async publisBook(bookid, params) {
        let upData = _.pick(params, ['title', 'html', 'markdown', 'categoryid', 'userid', 'cover']);
        Object.assign(upData, {
            post: '1',
            post_time: Date.now(),
        });
        let res = null
        let doc = await Entity.update(Model.books, bookid, upData).catch(e => {
            res = {
                code: 500,
                data: null,
                msg: 'query error'
            }
        })

        res = res || {
                code: 200,
                data: doc,
                msg: 'ok'
            }

        //返回数据
        return new Promise((resolve) => {
            resolve(res)
        })
    }
}

export const postCtrl = new PostControl()