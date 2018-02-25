import baseModel from './base-model';
import _ from 'lodash';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: String,
    nickname: String,
    headimgurl: String,
    authority: Number,
    reg_time: String,
    update_time: String,
    login_time: String,
    star: Array,
    weixin: Object,
    qq: Object
}, { versionKey: false });

UserSchema.statics = _.merge(baseModel, {
    findByUsrName(userName, cb) {
        return this.findOne({ userName: userName }).exec(cb);
    },
    updateByOpts: function(conditions, doc, cb) {
        let options = {};
        let update = { $set: doc };
        return this
            .update(conditions, update, options, cb);
    },
    login(user, cb) {
        return this
            .findOne(user).exec(cb);
    }
});

export default mongoose.model('user', UserSchema, 'users');