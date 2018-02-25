import _ from 'lodash'
import Model from '../models'
import Entity from '../service/entity'
import axios from 'axios';
import jwt from "jsonwebtoken";
import adminType from "../conf/adminType";
export default class UserControl {
    constructor() {}

    /**
     * 获得用户
     */
    async getUser(userid) {
        let res = null;
        let doc = await Entity.findById(Model.user, userid).catch(e => {
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
     * 获得多用户
     * ids: array
     */
    async getUsers(ids) {
        let res = null;
        let doc = await Entity.findByMulId(Model.user, ids).catch(e => {
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
     * 登录
     */
    async login(code, appid, secret) {
        let res = null;

        let requstValue = await axios.get('https://api.weixin.qq.com/sns/oauth2/access_token', {
            params: {
                appid,
                secret,
                code,
                grant_type: 'authorization_code'
            }
        })
        let userInfoData = null,
            userInfo = null;
        if (requstValue.data.access_token) {
            userInfoData = await axios.get('https://api.weixin.qq.com/sns/userinfo', {
                params: {
                    access_token: requstValue.data.access_token,
                    openid: requstValue.data.openid
                }
            });
            userInfo = _.assign({}, userInfoData.data);
            userInfo.username = userInfo.openid;
            userInfo.weixin = userInfoData.data
            let getUserData = await Entity.find(Model.user, { username: userInfo.username }).catch((err) => {
                res = {
                    code: 500,
                    data: null,
                    msg: err
                }
            })

            if (getUserData.length && getUserData[0]._id) {
                userInfo.update_time = Date.now();
                userInfo.login_time = Date.now();
                let updateUserData = await Entity.update(Model.user, userInfo).catch((err) => {
                    res = {
                        code: 500,
                        data: null,
                        msg: err
                    }
                })
                let getUserInfo = await Entity.findById(Model.user, getUserData[0]._id).catch((err) => {
                    res = {
                        code: 500,
                        data: null,
                        msg: err
                    }
                })
                userInfo = getUserInfo
                userInfo._doc.userId = getUserInfo._id

            } else {
                if (userInfo.openid == adminType.superAdmin.openid) {
                    userInfo.authority = adminType.superAdmin.code;
                }
                userInfo.reg_time = Date.now();
                let createUserData = await Entity.create(Model.user, userInfo).catch((err) => {
                    res = {
                        code: 500,
                        data: null,
                        msg: err
                    }
                })
                userInfo = createUserData
                userInfo._doc.userId = createUserData._id
            }
            let jwtData = {
                username: userInfo.username
            };
            let token = jwt.sign({
                // exp: Math.floor(Date.now() / 1000) + (5*60*60),
                data: jwtData
            }, 'hefan', { expiresIn: '720h' }); //, {expiresIn: '5h'}

            userInfo.token = token;


        }
        return userInfo

    }

    /**
     * 修改个人资料
     * */
    async updateUser(userid, params) {
        let res = null,
            doc = null,
            updateData = _.pick(params, ['nickname', 'headimgurl']);

        if (userid) {
            doc = await Entity.update(Model.user, userid, updateData).catch(e => {
                res = {
                    code: 500,
                    data: null,
                    msg: 'update error'
                }
            })

            res = res || {
                code: 200,
                data: doc,
                msg: '更新成功'
            }
        }

        return new Promise((resolve) => {
            resolve(res)
        })
    }
 /**
     * 分页获取全部用户
     * */
    async getAllUser(limit, skip) {
        let res = null;
        let doc = await Entity.fetchPage(Model.user, skip, limit, 'update_time', {}).catch(e => {
            res = {
                code: 500,
                data: null,
                msg: 'query error'
            }
        })
        let count = await Entity.count(Model.user).catch(e => {
            res = {
                code: 500,
                data: null,
                msg: 'query error'
            }
        })

        let data = {
            tableList:doc,
            count
        }
        // 解析数据
        if (doc && count) {
            res = {
                code: 200,
                data: data,
                msg: ''
            }
        }

        //返回数据
        return new Promise((resolve) => {
            resolve(res)
        })
    }

    /**
     * 修改权限
     * */
    async updateUserAuth(userid, params) {
        let res = null,
            doc = null,
            updateData = _.pick(params, ['authority']);

        if (userid) {
            doc = await Entity.update(Model.user, userid, updateData).catch(e => {
                res = {
                    code: 500,
                    data: null,
                    msg: 'update error'
                }
            })

            res = res || {
                    code: 200,
                    data: doc,
                    msg: '更新成功'
                }
        }

        return new Promise((resolve) => {
            resolve(res)
        })
    }
}

export const userCtrl = new UserControl()