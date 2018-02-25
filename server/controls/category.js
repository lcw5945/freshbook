import _ from 'lodash'
import Model from '../models'
import Entity from '../service/entity'

export default class CategoryControl{

    /**
     * 获得分类列表
     */
    async categoryList() {
        let res = null;
        let doc = await Entity.fetch(Model.category).catch(e => {
            res = {
                code: 500,
                data: null,
                msg: 'query error'
            }
        })

        // 解析数据
        if (doc) {
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
     * 获得类别
     * @param {*} categoryid 
     */
    async categoryDetail(categoryid) {
        let res = null
        let doc = await Entity.findById(Model.category, categoryid).catch(e => {
            res = {
                code: 500,
                data: null,
                msg: 'query error'
            }
        })
        // 解析数据
        if (doc) {
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
     * 文章总数加1
     * @param {*} categoryid 
     */
    async updateTotal(categoryid) {
        let res = null
        let doc = await Entity.findById(Model.category, categoryid).catch(e => {
            res = {
                code: 500,
                data: null,
                msg: 'query error'
            }
        })
        // 解析数据
        if (doc) {
            res = {
                code: 200,
                data: {},
                msg: ''
            }

            await Entity.update(Model.category, categoryid, {
                total : doc.total + 1
            }).catch(e => {
                res = {
                    code: 500,
                    data: null,
                    msg: 'update fail'
                }
            })
        }

        //返回数据
        return new Promise((resolve) => {
            resolve(res)
        })
    }
}

export const categoryControl = new CategoryControl()
