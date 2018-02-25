import Model from '../models/index'
import Entity from '../service/entity'
import { exec } from 'child_process';
import mongoose from 'mongoose';
import _ from 'lodash'

export default class BookControl {
    constructor() {}

    /**
     * 获得所有发布的内容
     */
    async bookList(conditions, skip, limit) {
        let sort = 'post_time',
            res = null,
            arr = [];

        // 发现
        if (conditions.type) {
            sort = 'update_time'
            delete conditions.type
        }

        let doc = await Entity.refFetchPage(Model.books, parseInt(skip), parseInt(limit), sort, {
            post: 1,
            ...conditions
        }).catch(e => {
            res = {
                code: 500,
                data: null,
                msg: 'query error'
            }
        });
        for (let i = 0; i < doc.length; i++) {
            let item = doc[i]._doc,
                comment = '';
            if (item.commentid) comment = await Entity.findById(Model.comment, item.commentid).catch(e => {
                res = {
                    code: 500,
                    data: null,
                    msg: 'query error'
                }
            });
            if (comment.comments) item['commentLength'] = comment.comments.length;
        }

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
     * 获得图书详情
     */
    async bookDetail(bookid) {
        let res = null
        let doc = await Entity.refFindById(Model.books, bookid).catch(e => {
            res = {
                code: 500,
                data: null,
                msg: 'query error'
            }
        });
        if (doc) {
            let item = doc._doc,
                comment = '',
                category = '';
            if (item.commentid) comment = await Entity.findById(Model.comment, item.commentid).catch(e => {
                res = {
                    code: 500,
                    data: null,
                    msg: 'query error'
                }
            });
            if (item.categoryid) category = await Entity.findById(Model.category, item.categoryid).catch(e => {
                res = {
                    code: 500,
                    data: null,
                    msg: 'query error'
                }
            });
            if (comment.comments) item['comment'] = comment.comments;
            if (category.name) item['category'] = category.name;
        }
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
     * 添加star
     */
    async updateStar(userid, bookid, star) {
        //参数验证
        star = star === 1 ? 1 : 0

        let res = null
        let userData = await Entity.findById(Model.user, userid).catch(e => {
            res = {
                code: 500,
                data: null,
                msg: 'user query error'
            }
        })
        let bookData = await Entity.refFindById(Model.books, bookid).catch(e => {
            res = {
                code: 500,
                data: null,
                msg: 'book query error'
            }
        })

        // 解析数据
        if (!res) {
            if (bookData && bookData.userid._id == userid) {
                res = {
                    code: 500,
                    data: null,
                    msg: '不能收藏自己的文章'
                }
            } else {
                let bookDataStar;
                let userDataStar = userData.star;
                if(bookData){
                    bookDataStar = bookData.star;
                }

                if (star == 1) {
                    if (!_.some(bookDataStar, { userid: userid })) {
                        bookDataStar.push({
                            userid: userid,
                            headimgurl: userData.headimgurl,
                            nickname: userData.nickname
                        })
                    }
                    if (!_.some(userDataStar, { bookid: bookid })) {
                        userDataStar.push(bookData)
                    }
                } else {
                    if (bookDataStar) {
                        _.remove(bookDataStar, (item) => {
                            return item.userid == userid;
                        });
                        _.remove(userDataStar, (item) => {
                            return item._id == bookid;
                        });
                    }else {
                        _.remove(userDataStar, (item) => {
                            return item._id == bookid;
                        });
                    }
                }

                //成功返回数据
                res = {
                    code: 200,
                    data: null,
                    msg: 'update success'
                }
                //开始更新如果出错设置返回出错数据
                await Entity.update(Model.books, bookid, {
                    star: bookDataStar,
                    update_time: Date.now()
                }).catch(e => {
                    res = {
                        code: 500,
                        data: null,
                        msg: 'update fail'
                    }
                })
                await Entity.update(Model.user, userid, {
                    star: userDataStar
                }).catch(e => {
                    res = {
                        code: 500,
                        data: null,
                        msg: 'update fail'
                    }
                })
            }
        }

        return new Promise((resolve) => {
            resolve(res)
        })

    }

    /**
     * 更新图书
     * title
     * html
     * markdown
     */
    async updateBook(bookid, params) {
        let res = null,
            doc = null,
            upData = _.pick(params, ['title', 'html', 'markdown', 'categoryid', 'userid', 'cover']);
        if (!upData.categoryid) upData.categoryid = '000000000000000000000000';
        upData.update_time = Date.now();

        if (bookid) {
            doc = await Entity.update(Model.books, bookid, upData).catch(e => {
                res = {
                    code: 500,
                    data: null,
                    msg: 'query error'
                }
            })
            res = res || {
                code: 200,
                data: doc,
                msg: '更新成功'
            }
        } else {
            upData['post'] = 0;
            doc = await Entity.create(Model.books, upData).catch(e => {
                res = {
                    code: 500,
                    data: null,
                    msg: 'query error'
                }
            })
            res = res || {
                code: 200,
                data: doc,
                msg: '添加成功'
            }
        }


        //返回数据
        return new Promise((resolve) => {
            resolve(res)
        })
    }

    /**
     * 删除book
     */
    async deleteBook(bookid, userInfo) {

        let res = null,
            canDeleteFlag = false;


        if (userInfo && userInfo.authority > 0) { // 权限 0 普通用户 1 管理员 2 超级管理员
            canDeleteFlag = true
        }
        if (!canDeleteFlag) {
            let bookData = await Entity.findById(Model.books, bookid).catch(e => {
                res = {
                    code: 500,
                    data: null,
                    msg: 'book query error'
                }
            })

            if (bookData.userid == userInfo.userId) { // 作者 可删除
                canDeleteFlag = true
            } else {
                res = {
                    code: 403,
                    data: {},
                    msg: '没有权限删除'
                }
            }

        }

        if (canDeleteFlag) {
            await Entity.remove(Model.books, bookid).catch(e => {
                res = {
                    code: 500,
                    data: null,
                    msg: 'delete error'
                }
            })
        }

        if (!res) {
            res = {
                code: 200,
                data: {},
                msg: 'del success'
            }
        }

        return new Promise((resolve) => {
            resolve(res);
        })
    }

    /**
     * 根据分组得到book的数量
     * title
     * cateGoryId
     */
    async countCategoryBook(conditions) {
        let res = null
        conditions.post = 1

        let categorys = await Entity.fetch(Model.category).catch(e => {
            res = {
                code: 500,
                data: null,
                msg: 'categorys query error'
            }
        })

        if (!res) {
            for (let obj of categorys) {
                conditions.categoryid = obj._id;
                let doc = await Entity.count(Model.books, conditions).catch(e => {
                    res = {
                        code: 500,
                        data: null,
                        msg: 'books query error'
                    }
                })
                obj._doc['count'] = doc
            }
        }
        // 解析数据
        if (!res) {
            res = {
                code: 200,
                data: categorys,
                msg: ''
            }
        }

        //返回数据
        return new Promise((resolve) => {
            resolve(res)
        })
    }

    /**
     * 个人主页已发布或者草稿
     * */
    async userBookList(skip, limit, conditions = {}) {
        let res = null,
            doc = [];
        skip = parseInt(skip)
        limit = parseInt(limit)
        let postCount = await Entity.count(Model.books, conditions).catch(e => {
            res = {
                code: 500,
                data: null,
                msg: 'books query error'
            }
        })

        if (postCount) {
            if (postCount <= skip) {
                skip = skip - limit;
            }
            doc = await Entity.refFetchPage(Model.books, skip, limit, 'update_time', conditions).catch(e => {
                res = {
                    code: 500,
                    data: null,
                    msg: 'query error'
                }
            });
            if (!res && doc.length > 0) {
                for (let i = 0; i < doc.length; i++) {
                    let item = doc[i]._doc,
                        category = {};
                    if (item.categoryid) {
                        category = await Entity.findById(Model.category, item.categoryid).catch(e => {
                            res = {
                                code: 500,
                                data: null,
                                msg: 'query error'
                            }
                        }) || {};
                        if (category.name) {
                            item['category'] = category.name;
                        }
                    }
                }
            }
        }

        if (!res) {
            res = {
                code: 200,
                data: { list: doc, total: postCount },
                msg: '',
            }
        }

        //返回数据
        return new Promise((resolve) => {
            resolve(res)
        })
    }

    /**
     * 个人主页已发布，草稿，收藏总数
     * */
    async countUserBook(conditions = {}) {
        let res = null;
        let postCount = await Entity.count(Model.books, Object.assign(conditions, { post: 1 })).catch(e => {
            res = {
                code: 500,
                data: null,
                msg: 'books query error'
            }
        })

        let unPostCount = await Entity.count(Model.books, Object.assign(conditions, { post: 0 })).catch(e => {
            res = {
                code: 500,
                data: null,
                msg: 'books query error'
            }
        })

        let userData = await Entity.findById(Model.user, conditions.userid).catch(e => {
            res = {
                code: 500,
                data: null,
                msg: 'query error'
            }
        })

        if (!res) {
            res = {
                code: 200,
                data: {
                    postCount,
                    unPostCount,
                    starCount: userData.star.length
                },
                msg: '',
            }
        }

        //返回数据
        return new Promise((resolve) => {
            resolve(res)
        })
    }


}

export const booksCtrl = new BookControl()