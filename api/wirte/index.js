import axios from '~/plugins/axios';
export default {
    /**
    * title: 更新草稿
    * @param title html markdown categoryid
    * @returns {*}
    */
    updateDraft(data){
        return axios.post('/v1/updateDraft',this.PostParamFormat(data))
    },
    /**
     * title: 发布文章
     * @param bookid
     * @returns {*}
     */
    publisBook(data){
        return axios.post('/v1/publisBook',this.PostParamFormat(data))
    },
    /**
     * title: 更新发布文章
     * @param bookid
     * @returns {*}
     */
    updatePost(data){
        return axios.post('/v1/updatePost',this.PostParamFormat(data))
    },
    /**
     * title: 获得分组列表
     * @param bookid
     * @returns {*}
     */
    categoryList(data){
        return axios.get('/v1/categoryList',this.GetParamFormat(data))
    },
}