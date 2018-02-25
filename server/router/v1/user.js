import Router from "koa-router"
import _ from 'lodash'
import Params from '../../utils/params'
import { userCtrl } from '../../controls/user'
import { WX_INFO } from '../../conf/index'
const router = new Router()

router.get("/login", async(ctx, next) => {

    let { code } = Params.queryValidate(ctx);

    let data = await userCtrl.login(code, WX_INFO.appid, WX_INFO.secret)
    if (data) {
        ctx.session.userInfo = data;
        ctx.req.session = ctx.session.userInfo;
        ctx.request.session = ctx.session.userInfo;
        ctx.cookies.set('hefan_freshbook', ctx.cookies.get('hefan_freshbook'), {
            maxAge: 24 * 60 * 60 * 1000
        });
        ctx.body = {
            code: 200,
            data: data,
            msg: '登录成功！'
        }
    } else {
        ctx.body = {
            code: 200,
            data: [],
            msg: '登录失败，请重新扫码！'
        }
    }



})
router.get("/logout", async(ctx, next) => {
    if (ctx.session && ctx.session.userInfo) {
        ctx.session.userInfo = null;
        ctx.req.session = ctx.session.userInfo;
        ctx.request.session = ctx.session.userInfo;
    }
    ctx.body = {
        code: 200,
        data: [],
        msg: '退出成功！'
    }
})
router.get("/checkLogin", async(ctx, next) => {
    let loginState = false;
    if (ctx.session && ctx.session.userInfo) {
        loginState = true;
    }
    ctx.body = {
        code: 200,
        data: loginState,
        msg: '登陆状态查询成功！'
    }
})
router.get("/getUser", async(ctx, next) => {
    let { userid, limit, skip } = Params.queryValidate(ctx);
    limit = parseInt(limit);
    skip = parseInt(skip);
    if (userid) {
        let userData = await userCtrl.getUser(userid)
        userData.data._doc.starLen = userData.data.star.length;
        if (_.isInteger(limit) && _.isInteger(skip) && limit > 0 && userData.data.star.length > skip) {
            skip = skip >= 0 ? skip : 0;

            userData.data.star = userData.data.star.splice(skip, limit)

        }
        ctx.body = userData;

    } else {
        ctx.body = {
            code: 400,
            data: {},
            msg: "查询参数错误"
        }
    }

    // ctx.body = {
    //     result: true,
    //     data: ['hubo', 'xygo', 'xxy', 'pangong']
    // }
})

router.post('/updateUser', async(ctx, next) => {
    let { userid, params } = Params.bodyValidate(ctx);

    if (userid) {
        let data = await userCtrl.updateUser(userid, params);
        ctx.body = data;
    } else {
        ctx.body = {
            code: 400,
            data: {},
            msg: "更新失败"
        }
    }
})

router.get('/getAllUser', async(ctx, next) => {
    let { limit, skip } = Params.queryValidate(ctx);
    limit = parseInt(limit);
    skip = parseInt(skip);

    if (_.isInteger(limit) && _.isInteger(skip) && limit > 0) {
        let data = await userCtrl.getAllUser(limit, skip);
        ctx.body = data;
    } else {
        ctx.body = {
            code: 400,
            data: {},
            msg: "查询参数错误"
        }
    }
})

router.post('/updateUserAuth', async(ctx, next) => {
    let { userid, params } = Params.bodyValidate(ctx);

    if (userid) {
        let data = await userCtrl.updateUserAuth(userid, params);
        ctx.body = data;
    } else {
        ctx.body = {
            code: 400,
            data: {},
            msg: "更新失败"
        }
    }
})

export default router;