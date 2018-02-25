/**
 * Created by Cray on 2017/7/3.
 */
import baseModel from './base-model';
import _ from 'lodash';
import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    comments: [],
    update_time: String
}, { versionKey: false });


CommentSchema.statics = _.merge(baseModel, {
});

export default mongoose.model('comment', CommentSchema, 'comments');