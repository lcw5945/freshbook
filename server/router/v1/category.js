import Router from  "koa-router"
import _ from 'lodash'
import {categoryControl} from '../../controls/category'

const router = new Router()

/**
 * 获得分类列表
 */
router.get("/categoryList", async (ctx, next) => {
    let data = await categoryControl.categoryList()
    ctx.body = data
})

export default router;