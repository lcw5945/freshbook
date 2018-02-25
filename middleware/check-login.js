import api from '~/api';
import { WX_HOST } from '~/api/config';
import _ from 'lodash'
export default function(ctx) {
    // console.log(process.server)
    if (process.server) {
        if (ctx.req.session && ctx.req.session.userInfo) {
            ctx.store.commit('SET_USER', ctx.req.session.userInfo)
            ctx.store.commit('SET_LOGINSTATE', true)

        } else {
            ctx.store.commit('SET_LOGINSTATE', false)
            ctx.store.commit('SET_USER', null)
        }
    } else {
        console.log('client render')
        // if (ctx.store.state.isLogin) {
        //     if (ctx.path == '/login') {
        //         ctx.$router.push({ path: '/' })
        //     }
        // }
    }

}