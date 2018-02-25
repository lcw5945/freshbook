
import _ from 'lodash'
import Model from '../models'
import Entity from '../service/entity'
import BookControl from './books'

export default class DraftControl extends BookControl {
    constructor(){
        super()
    }
    /**
     * 获得草稿列表
     */
    async draftList(userid) {
        let conditions = {
            userid: userid,
            post: 0
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
}

export const draftCtrl = new DraftControl()