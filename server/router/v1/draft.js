import Router from  "koa-router"
import Params from '../../utils/params'
import {draftCtrl} from '../../controls/draft'

const router = new Router()

/**
 * 获得草稿列表
 */
router.get("/draftList", async (ctx, next) => {
    let userid = ctx.session.userid || 1111
    let draftData = await draftCtrl.draftList(userid)

    ctx.body = draftData
})

/**
 * 获得草稿
 */
router.get('/getDraft', async (ctx, next) => {
    let {bookid} = Params.queryValidate(ctx)
    let draftData = await draftCtrl.bookDetail(bookid)

    ctx.body = draftData
})

/**
 * 更新草稿
 */
router.post('/updateDraft', async (ctx, next) => {

    if(!Params.checkLogin(ctx)){
        return
    }

    let params = Params.bodyValidate(ctx);
    let {bookid} = params;
    if(!params.userid){
        let user = ctx.session.userInfo || {}
        params.userid = user.userId || ''
    }
    let draftData = await draftCtrl.updateBook(bookid, params)
    ctx.body = draftData
})

export default router;