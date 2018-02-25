import Router from  "koa-router"
import Params from '../../utils/params'
import {commentCtrl} from '../../controls/comment'
import {booksCtrl} from '../../controls/books'
const router = new Router()

/**
 * 得到评论
 */
router.get('/comments', async (ctx, next) => {
    let {id} = Params.queryValidate(ctx)
    let data = await commentCtrl.comments(id)
    ctx.body = data
})

/**
 * 添加评论
 */
router.post('/addComment', async (ctx, next) =>{
    let params = Params.bodyValidate(ctx);
    let userInfo = ctx.session.userInfo;
    let data = await commentCtrl.addComment(params,userInfo)

   ctx.body = data
})

/**
 * 回复评论
 */
router.post('/replayComment', async (ctx, next) =>{
    let params = Params.bodyValidate(ctx)
    let userInfo = ctx.session.userInfo;
    let data = await commentCtrl.replayComment(params,userInfo)
    ctx.body = data
})



export default router;