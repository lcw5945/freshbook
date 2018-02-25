<template>
    <div>
        <div class="detail" v-if="detailContent">
            <Detail :bookDetailChild="detailContent" :changeLikeStatus='changeLikeStatus'></Detail>
            <Comment :bookcommentid="detailContent.commentid" :bookid="detailContent._id"></Comment>
            <BackTop :bottom="105" :right="30">
                <div class='goTop'>
                    <Icon type="jet"></Icon>
                </div>
            </BackTop>
            <div class='starFixBtn' @click='clickLike'>
                <i class="iconfont icon-collection_fill" v-show='isLike'></i>
                <i class="iconfont icon-collection" v-show='!isLike'></i>
            </div>
        </div>
        <div class="remove" v-else>
            <i class="iconfont icon-empty_fill" style="font-size: 150px;color:rgb(178, 186, 194)"></i>
            <!-- <img src="../../assets/img/logo.png" alt=""> -->
            <p style="font-size: 26px;color:rgb(178, 186, 194);margin-top: 70px;">此文章已被删除</p>
        </div>
    </div>
</template>
<script>
import Detail from './detail.vue';
import api from '~/api';
import _ from 'lodash'
import Comment from '~/components/books/comments';
import { mapGetters, mapActions } from 'vuex';
export default {
    async asyncData({ req, query }) {
        let data = await api.bookDetail({ bookid: query.id });
        let detailContent = api.parse(data);
        return { detailContent }
    },
    data() {
        return {
            userInfo: {},
//            detailContent: {},
            isLike: false,
        }
    },
    computed: {
        ...mapGetters({
            isLogin: 'getLoginState',
            getUser: 'getUser'
        })
    },
    methods: {
        ...mapActions(['setBookDetil']),
        changeLikeStatus(isLike) {
            this.isLike = isLike
        },
        /**
         * 点赞or取消点赞
         **/
        async clickLike() {
            if (this.isLogin) {
                let star = this.isLike ? 0 : 1;
                let data = await api.updateStar({ bookid: this.detailContent && this.detailContent._id, star });
                if (parseInt(data.data.code) === 200) {
                    if (this.isLike) {
                        let itemIndex = _.findIndex(this.detailContent.star, o => o.userid === this.getUser.userId);
                        this.detailContent.star.splice(itemIndex, 1);
                    } else {
                        let user = {
                            headimgurl: this.getUser.headimgurl,
                            nickname: this.getUser.nickname,
                            userid: this.getUser.userId,
                        }
                        this.detailContent.star.push(user);
                    }

                    this.isLike = !this.isLike;
                    this.detailContent.isLike = this.isLike
                } else {
                    this.$Notice.error({
                        title: '收藏失败',
                        desc: data.data.msg
                    });
                }
            } else {
                let localStorage = window.localStorage || {}
                localStorage.setItem('loginBtnUrl', this.$route.fullPath)
                this.$router.push({ path: '/login' })
            }
        }
    },
    head() {
        return {
            title: 'detail'
        }
    },
    components: {
        Detail,
        Comment
    },
    created() {
        if (this.detailContent) {
            let star = _.findIndex(this.detailContent.star, o => o.userid === this.getUser.userId);
            this.setBookDetil(this.detailContent)
            star > -1 ? this.isLike = true : this.isLike = false;
        }
    }
}
</script>