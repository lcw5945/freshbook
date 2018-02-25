import api from '~/api';
import {WX_HOST} from '~/api/config';
import _ from 'lodash';
import querystring from "querystring";
import url from "url";
let articleTmer = null;
export default {
    nuxtServerInit({commit}, {req}) {

        // if (req.session && req.session.userInfo) {
        //     console.log('1111', req.session.userInfo)
        //     commit('SET_USER', req.session.userInfo)
        // } else {
        //     let param = {
        //         code: querystring.parse(url.parse(req.url).query).code,
        //         appid: WX_HOST.appid,
        //         secret: WX_HOST.secret
        //     }
        //     api.login(param).then((res) => {
        //         //console.log(res.data)
        //         req.session.userInfo = res.data.data
        //         console.log('信息', res.data.data, req.session.userInfo)
        //         commit('SET_USER', res.data)
        //     });

        // }
    },
    setUser: (context, data = {}) => {
        context.commit('SET_USER', data)
    },
    setArticle: ({commit, state}, data = {}) => {
        commit('SET_ARTICLE', data);
    },
    updateDraft({commit, state}, data = {}){
        let {article, user} = state;
        let params = {
            userid: user.userId || ''
        }
        Object.assign(params, article, data);
        if(!params.markdown && !params.cover && !params.title && !params.html) return

        clearTimeout(articleTmer);
        articleTmer = setTimeout(() => {
            api.updateDraft(params).then((res) => {
                let _data = api.parse(res)||{};
                if (_data['_id']) {
                    let bookid = _data['_id'];
                    // params['bookid'] = _data['_id'];
                    commit('SET_ARTICLE', {bookid});
                }
            })
        }, 500)
    },
    setAuthor: (context, data = {}) => {
        context.commit('SET_AUTHOR', data);
    },
    initArticle: ({commit, state}, data = {}) => {
        commit('INIT_ARTICLE', data);
    },
    setLoginState: (context, data = {}) => {
        context.commit('SET_LOGINSTATE', data);
    },
    setBookDetil:(context, data = {}) => {
        context.commit('SET_BOOKDETIL', data);
    },
}