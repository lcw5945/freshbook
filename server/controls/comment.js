import _ from 'lodash'
import { ulid } from 'ulid'
import Model from '../models'
import Params from '../utils/params'
import Entity from '../service/entity'


export default class CommentControl {

    /**
    * 查询评论
    * */
    async comments(commentid){

        let res = null;
        let doc = await Entity.findById(Model.comment,commentid ).catch(e => {
            res = {
                code: 500,
                data: null,
                msg: 'query error'
            }
        });

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
     * 添加评论
     */
    async addComment(params,userInfo){
        let doc,res;
        let {content,bookid,commentid} = params

        let time =Date.now().toString()
        let commentData = {
            userid: userInfo.userId,
            headimgurl: userInfo.headimgurl,
            nickname: userInfo.nickname,
            content: content,
            create_time: time,
            key: time
        }

        if(commentid){
            //添加评论
            await Entity.updateBase(Model.comment,{"_id":commentid},{'$push':{'comments':commentData}}).catch(e => {
                res = { code: 500, data: null, msg: 'update comment error' }
            })

            //更新book的update_time
            await Entity.update(Model.books,bookid,{'update_time': Date.now()}).catch(e => {
                res = { code: 500, data: null, msg: 'book update_time fail' }
            })

        }else{
            //评论文档
            let newDoc = {
                update_time: time,
                comments: [
                    commentData
                ]
            }
            //创建新的评论
            doc = await Entity.create(Model.comment, newDoc).catch(e => {
                res = {code: 500, data: null, msg: 'create comment error'}
            })

            commentid = doc._id;

            //更新book的评论id update_time
            await Entity.update(Model.books,bookid,{'commentid': commentid, 'update_time': Date.now() }).catch(e => {
                res = {code: 500, data: null, msg: 'book comment update error'}
            })
        }

        res = res || {
                code: 200,
                data: {
                    commentid,
                    key : commentData.key
                },
                msg: ''
        }
        //返回数据
        return new Promise((resolve) => {
            resolve(res)
        })

    }

    /**
     * 修改评论
     */
    async replayComment(params,userInfo) {
        let doc,res,comments;
        let {key,commentid,content,touser} = params;

        let time =Date.now().toString()
        let commentData = {
            userid: userInfo.userId,
            headimgurl: userInfo.headimgurl,
            nickname: userInfo.nickname,
            content: content,
            create_time: time,
            key: time
        }
        if(touser){
            commentData.touser = touser
        }

        let commentDoc = await Entity.findById(Model.comment, commentid).catch(e => {
            res = {
                code: 500,
                data: null,
                msg: 'comment query error'
            }
        })

        comments = commentDoc.comments
        comments&&comments.map((obj,index)=>{
            if(obj.key == key){
                if(obj.childcomments){
                    obj.childcomments.push(commentData)
                }else{
                    obj.childcomments = [commentData]
                }
            }
        })

        doc = Entity.update(Model.comment,commentid,{'comments':comments}).catch(e => {
            res = {
                code: 500,
                data: null,
                msg: 'update replay comment error'
            }
        })
        res = res || {
                code: 200,
                data: doc,
                msg: ''
            }
        //返回数据
        return new Promise((resolve) => {
            resolve(res)
        })
    }

}

export const commentCtrl = new CommentControl()