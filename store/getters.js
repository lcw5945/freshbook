export default {
    getUser: state => {
        return state.user
    },
    getArticle: state => {
        return state.article
    },
    getAuthor: state => {
        return state.author
    },
    getLoginState: state => {
        return state.isLogin
    },
    getBookDetail: state => {
        return state.bookDetail
    },
}