/**
 * Created by Cray on 2017/7/3.
 */
import baseModel from './base-model';
import _ from 'lodash';
import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
    title: String,
    cover: String,
    html: String,
    markdown: String,
    // categoryid: String,
    categoryid: {type: mongoose.Schema.ObjectId, ref: 'category'},
    commentid: String,
    post: Number,
    update_time: String,
    post_time: String,
    star: Array,
    userid: {type: mongoose.Schema.ObjectId, ref: 'user'}
}, {versionKey: false});

BookSchema.statics = _.merge(baseModel, {
    fetchPage: function (skip, limit, cb, sortType = 'post_time', conditions = {}) {
        return this
            .find(conditions)
            .skip(skip)
            .limit(limit)
            .sort({[sortType]: 'desc'})
            .exec(cb);
    },
    refFetchPage: async function (skip, limit, cb, sortType = 'post_time', conditions = {}) {
        return this
            .find(conditions)
            .populate([{
                path: 'userid',
                select: {_id: 1, username: 1, nickname: 1, headimgurl: 1, authority: 1} //user的字段
            },{
                path: 'categoryid',
            }])
            .skip(skip)
            .limit(limit)
            .sort({[sortType]: 'desc'})
            .exec(cb);
    },
    refFindById: function (id, callback) {
        return this.findOne({_id: id})
            .populate([{
                path: 'userid',
                select: {_id: 1, username: 1, nickname: 1, headimgurl: 1, authority: 1}
            },{
                path: 'categoryid',
            }])
            .exec(callback);
    }
});

export default mongoose.model('book', BookSchema, 'books');