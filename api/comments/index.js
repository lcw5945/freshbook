/**
 * Created by user on 2017/12/21.
 */
import axios from '~/plugins/axios';

export default {
    comments(data){
        return axios.get('/v1/comments',this.GetParamFormat(data))
    },
    addComment(data){
        return axios.post('/v1/addComment',this.PostParamFormat(data))
    },
    replayComment(data){
        return axios.post('/v1/replayComment',this.PostParamFormat(data))
    }

}