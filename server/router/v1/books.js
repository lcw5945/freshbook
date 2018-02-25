import Router from "koa-router"
// import koaBody from 'koa-body'
import _ from 'lodash'
import Params from '../../utils/params'
import { booksCtrl } from '../../controls/books'
import { categoryControl } from '../../controls/category'

const router = new Router()

/**
 * 获得book列表
 */
router.get("/bookList", async(ctx, next) => {
    let { title, categoryid, type, limit, skip } = Params.queryValidate(ctx)
    let conditions = {};
    limit = parseInt(limit);
    skip = parseInt(skip);
    if (_.isInteger(limit) && _.isInteger(skip)) {
        if (title) {
            const reg = new RegExp(title, 'i') //不区分大小写
            conditions['title'] = { $regex: reg }
        }
        if (categoryid) {
            conditions['categoryid'] = categoryid;
        }
        if (type) {
            conditions['type'] = type;
        }
        let bookData = await booksCtrl.bookList(conditions, skip, limit);
        ctx.body = bookData
    } else {
        ctx.body = {
            code: 400,
            data: {},
            msg: "查询参数错误"
        }
    }

})


/**
 * 根据分组获得book的count
 */
router.get("/countCategoryBook", async(ctx, next) => {
    let { title } = Params.queryValidate(ctx)
    let conditions = {}
    if (title) {
        const reg = new RegExp(title, 'i') //不区分大小写
        conditions.title = { $regex: reg }
    }

    let categorys = await booksCtrl.countCategoryBook(conditions)
    ctx.body = categorys

})


/**
 * 获得文章详情
 */
router.get('/bookDetail', async(ctx, next) => {
    let { bookid } = Params.queryValidate(ctx)
    let bookData = await booksCtrl.bookDetail(bookid)
    ctx.body = bookData
})


/**
 * star or unstar
 */
router.get('/updateStar', async(ctx, next) => {
    let { bookid, star } = Params.queryValidate(ctx)
    if (_.isUndefined(bookid) || _.isUndefined(star)) {
        ctx.body = {
            code: 400,
            msg: "查询参数错误"
        }
    } else {
        let userid = ctx.session.userInfo.userId || 1111
        let bookData = await booksCtrl.updateStar(userid, bookid, parseInt(star))
        ctx.body = bookData
    }

})

/**
 * 删除文章0
 *
 *
 */
router.post('/deleteBook', async(ctx, next) => {
    let { params } = Params.bodyValidate(ctx);
    let { bookid } = params;
    let user = ctx.session.userInfo
    let data = {
        code: 401,
        data: {},
        msg: 'bookid is empty'
    }
    if (!_.isUndefined(bookid)) {
        data = await booksCtrl.deleteBook(bookid, user)
    }
    ctx.body = data
})

/**
 * 个人主页已发布或者草稿
 * */
router.get("/userBookList", async(ctx, next) => {
    let { limit, skip, conditions } = Params.queryValidate(ctx);

    limit = parseInt(limit);
    skip = parseInt(skip);
    conditions = JSON.parse(conditions);
    if (_.isInteger(limit) && _.isInteger(skip)) {
        let bookData = await booksCtrl.userBookList(skip, limit, conditions);
        ctx.body = bookData
    } else {
        ctx.body = {
            code: 400,
            data: {},
            msg: "查询参数错误"
        }
    }

})
/**
 * 个人主页已发布，草稿，收藏总数
 * */
router.get("/countUserBook", async(ctx, next) => {
    let { conditions } = Params.queryValidate(ctx);
    conditions = JSON.parse(conditions);
    if (conditions) {
        let bookData = await booksCtrl.countUserBook(conditions);
        ctx.body = bookData
    } else {
        ctx.body = {
            code: 400,
            data: {},
            msg: "查询参数错误"
        }
    }

})

export default router;