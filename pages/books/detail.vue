<template>
    <div class="detail-content" v-if="bookDetailChild">
        <div class="w800">
            <div class="header" v-if="bookDetail.userid">
                <nuxt-link :to="{path: '/user/info/'+creatorId}">
                    <img :src="bookDetail.userid.headimgurl">
                    <div>
                        <p>{{ bookDetail.userid.nickname }}</p>
                        <span>{{ formatDate(bookDetail.post_time) }}</span>
                    </div>
                </nuxt-link>
                <div type="ghost" class='delete-book' v-if="removePowers(getUser,bookDetail)" @click.prevent="deleteBook">删除</div>
                <button v-if="bookDetail.userid._id === this.getUser.userId" @click="goEdit">编辑
                </button>
            </div>
            <div class="content">
                <h1>{{ bookDetail.title }}</h1>
                <template v-if="bookDetail.markdown">
                    <mavon-editor ref='mavonEditor' :subfield="false" default_open="preview" :editable="false" :toolbarsFlag="false" :value="bookDetail.markdown" @change="change"></mavon-editor>
                </template>
                <template v-else>
                    <div class="ql-editor" v-html="bookDetail.html"></div>
                </template>
                <div class="category" v-if="bookDetail.category">
                    {{ bookDetail.category }}
                </div>
                <div></div>
                <div class="zan" :class="{'zaned':bookDetail.isLike}" @click="clickLike(bookDetail)">
                    <i class='iconfont icon-collection_fill' v-show='bookDetail.isLike'></i>
                    <i class='iconfont icon-collection' v-show='!bookDetail.isLike'></i>
                    <span>{{ bookDetail.star.length }}</span>
                </div>
                <ul class="headimgurls g-clearfix">
                    <li class="userImg" v-for="(item,index) in starList" :key="index">
                        <img :src="item.headimgurl" alt="">
                    </li>
                    <li class="downShow" v-show="showAllStar" @click="updatedStarList">...
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import Utils from '~/utils';
import { mapGetters } from 'vuex';
import api from '~/api';
import _ from 'lodash';

export default {
    head() {
        return {
            title: this.getBookDetail.title
        }
    },
    data() {
        return {
            bookDetail: {
                star: [] // 点过赞的用户
            }, // 详情页的数据
            starList: [], // 点过赞的人员列表
            firstUpdated: true, // 更新后第一次获取bookDetail
            creatorId: '',
            showAllStar: false
        }
    },
    computed: {
        ...mapGetters({
            isLogin: 'getLoginState',
            getUser: 'getUser',
            getBookDetail: 'getBookDetail',
        })
    },
    mounted() {
        this.initData()
        this.creatorId = this.bookDetail.userid && this.bookDetail.userid._id
    },
    methods: {
        /**
         * 初始化数据
         * */
        initData() {
            if (this.firstUpdated && !_.isEmpty(this.bookDetailChild)) {
                this.bookDetail = this.bookDetailChild
                let star = _.findIndex(this.bookDetail.star, o => o.userid === this.getUser.userId);
                this.bookDetail.isLike = star > -1 ? true : false;
                // this.updatedStarList();
                if (this.bookDetail.star.length > 2) {
                    this.starList = this.bookDetail.star.slice(0, 2)
                    this.showAllStar = true
                } else {
                    this.starList = this.bookDetail.star
                    this.showAllStar = false
                }
                this.firstUpdated = false;
            }
        },
        /**
         * 删除文章
         **/
        async deleteBook() {
            let data = await api.deleteBook({ bookid: this.bookDetail._id });
            data = data.data;
            if (data && data.code === 200) {
                this.$router.push({ path: '/' })
            }
        },
        /**
         * 时间戳转化为日期
         **/
        formatDate(post_time) {
            if (!parseInt(post_time)) return '';
            return Utils.formatDate(new Date(parseInt(post_time)));
        },
        /**
         * markdown插件发生改变时添加导航
         **/
        change() {
            const mavonEditor = this.$refs.mavonEditor;
            const navigationContent = mavonEditor.$refs.navigationContent;
            // mavonEditor.s_navigation = true;
            document.querySelector('.v-note-navigation-wrapper').style.display = 'block';
            navigationContent.innerHTML = mavonEditor.d_render;
            let nodes = navigationContent.children;
            if (nodes.length) {
                for (let i = 0; i < nodes.length; i++) {
                    this.judageH(nodes[i], i, nodes, mavonEditor);
                }
            }
        },
        /**
         * 遍历导航目录
         **/
        judageH(node, i, nodes, mavonEditor) {
            let reg = /^H[1-6]{1}$/;
            if (!reg.exec(node.tagName)) {
                node.style.display = 'none';
            } else {
                node.onclick = function() {
                    let vShowContent = mavonEditor.$refs.vShowContent;
                    window.scrollTo(0, vShowContent.children[i].offsetTop + 200);
                }
            }
        },
        /**
         * 展示点赞人员头像
         **/
        updatedStarList() {
            this.starList = this.bookDetail.star
            this.showAllStar = false
        },
        /**
         * 点赞or取消点赞
         **/
        async clickLike(item) {
            if (this.isLogin) {
                let star = item.isLike ? 0 : 1;
                let data = await api.updateStar({ bookid: item && item._id, star });

                console.log(data);
                if (parseInt(data.data.code) === 200) {
                    if (item.isLike) {
                        let itemIndex = _.findIndex(item.star, o => o.userid === this.getUser.userId);
                        let starListIndex = _.findIndex(this.starList.star, o => o.userid === this.getUser.userId);
                        item.star.splice(itemIndex, 1);
                        if (item.star.length <= 2) {
                            this.showAllStar = false
                        }
                    } else {
                        let user = {
                            headimgurl: this.getUser.headimgurl,
                            nickname: this.getUser.nickname,
                            userid: this.getUser.userId,
                        }
                        item.star.push(user);
                    }
                    item.isLike = !item.isLike;
                    this.changeLikeStatus(item.isLike)
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
        },
        /**
         * 跳转修改页
         **/
        goEdit() {
            if (this.bookDetail.markdown) {
                this.$router.push({ path: '/post/markdown', query: { bookid: this.bookDetail._id } })
            } else {
                this.$router.push({ path: '/post', query: { bookid: this.bookDetail._id } })
            }

        },
        /**
         * 判断用户删除文章权限
         **/
        removePowers(getUser, item){
            return Utils.removePowers(getUser, item);
        }
    },
    props: ['bookDetailChild', 'changeLikeStatus'],
}
</script>