/**
 * Created by Cray on 2017/7/3.
 */
import baseModel from './base-model';
import _ from 'lodash';
import mongoose from 'mongoose';


const CategorySchema = new mongoose.Schema({
    name: String,
    title: String,
    update_time: String,
    iconcolor:String,
    total: Number
}, { versionKey: false });


CategorySchema.statics = _.merge(baseModel, {
});

export default mongoose.model('category', CategorySchema, 'categorys');