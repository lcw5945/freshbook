import Router from  "koa-router"
import Params from '../../utils/params'
import {postCtrl} from '../../controls/post'

const router = new Router()

/**
 * 获得发布文章列表
 */
router.get("/postList", async (ctx, next) => {
    let userid = ctx.session.userid || 1111
    let postData = await postCtrl.postList(userid)

    ctx.body = postData
})

/**
 * 获得发布文章
 */
router.get('/getPost', async (ctx, next) => {
    let userid = ctx.session.userid || 1111
    let postData = await postCtrl.bookDetail(userid)

    ctx.body = postData
})

/**
 * 更新发布文章
 */
router.post('/updatePost', async (ctx, next) => {
    if(!Params.checkLogin(ctx)){
        return
    }
    let params = Params.bodyValidate(ctx)
    let { bookid } = params;
    let postData = await postCtrl.updateBook(bookid, params)
    ctx.body = postData
})

/**
 * 发布文章
 */
router.post('/publisBook', async (ctx, next) => {

    if(!Params.checkLogin(ctx)){
        return
    }
    let params = Params.bodyValidate(ctx)
    let { bookid } = params
    if(!params.userid){
        let user = ctx.session.userInfo || {}
        params.userid = user.userId || ''
    }
    let postData = await postCtrl.publisBook(bookid,params)

    ctx.body = postData
})


export default router;