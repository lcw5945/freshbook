/**
 * Created by Cray on 2017/5/25.
 */
import _ from 'lodash'

export default {
    /**
     * 验证是否登录
     * @returns {*}
     */
    checkLogin(ctx) {
        let status = null;
        if (ctx.session.userInfo && ctx.session.userInfo.userId) {
            status = true;
        } else {
            status = false;
            ctx.body = { code: 401, data: null, msg: '未登陆' }
        }
        return status
    },
    /**
     * 查询参数验证
     * @param req
     * @param res
     * @returns {*}
     */
    queryValidate(ctx) {
        let query = ctx.query
        if (typeof(query) !== 'object') {
            return null
        }
        // query = Object.keys(query).length > 0 ? query : null

        return _.omit(query, ['token'])
    },

    /**
     * 提交参数验证
     * @param req
     * @param res
     * @returns {*}
     */
    bodyValidate(ctx) {
        let body = ctx.request.body
        if (typeof(body) !== 'object') {
            return null
        }
        return _.omit(body, ['token'])
    },

    /**
     * token 验证
     * @param req
     * @param res
     * @returns {*}
     */
    tokenValidate(ctx) {
        let body = ctx.body
        let query = ctx.query
        if (typeof(body) !== 'object' || typeof(query) !== 'object') {
            return null
        }

        if (query.hasOwnProperty('token')) {
            return query
        }

        return body
    }


}