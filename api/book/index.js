/**
 * Created by user on 2017/12/8.
 */
import axios from '~/plugins/axios';

export default {
    searchBook(data){
         return axios.get('/v1/searchBook',this.GetParamFormat(data))
    },
    bookList(data){
        return axios.get('/v1/bookList',this.GetParamFormat(data));
    },
    countCategoryBook(data){
        return axios.get('/v1/countCategoryBook',this.GetParamFormat(data));
    },
    bookDetail(data){
        return axios.get('/v1/bookDetail',this.GetParamFormat(data));
    },
    updateBook(data){
        return axios.post('/v1/updateBook',this.PostParamFormat(data));
    },
    userBookList(data){
        return axios.get('/v1/userBookList',this.GetParamFormat(data));
    },
    countUserBook(data){
        return axios.get('/v1/countUserBook',this.GetParamFormat(data));
    },
    updateStar(data){
        return axios.get('/v1/updateStar',this.GetParamFormat(data));
    },
    deleteBook(data){
        return axios.post('/v1/deleteBook',this.GetParamFormat(data));
    },
}
