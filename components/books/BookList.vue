<template>
    <div style="min-height: 500px">
        <ul class="book-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="100">
            <li class="book-item" v-for="(item,index) in bookList" :key="index">
                <div class="top-line">
                    <span @click="toUser(item.userid)">
                    <nuxt-link v-if="item.userid" :to="{path: '/user/info/'+item.userid._id}">
                        <img :src="item.userid.headimgurl" class="headimgurl" v-show="item.userid">
                       <span class="nickname">{{ item.userid && item.userid.nickname }}</span>
                    </nuxt-link>
                    </span> {{ item | getPostTime($route.query.type) }}
                </div>
                <nuxt-link :to="{ path: '/books', query:{id:item&&item._id}}">
                    <div :style="{width:item.cover?'75%':'95%'}">
                        <div class="title">{{ item.title }}</div>
                        <div class="brief">{{ item.brief }} </div>
                    </div>
                    <img :src="item.cover" class="cover" v-if="item.cover" />
                    <div class="buttons">
                        <nuxt-link :to="{path:'/', query:{categoryid:item.categoryid&&item.categoryid._id}}">
                            <div class="category">
                                {{ item.categoryid && item.categoryid.name }}
                            </div>
                        </nuxt-link>
                        <div class="zan" @click.prevent="clickLike(item)" :class="{'zaned':item.isLike &&isLogin }">
                            <i class='iconfont icon-collection_fill'></i>
                            <span>{{ item.star.length ? item.star.length : '' }}</span>
                        </div>
                        <nuxt-link :to="{ path: `/books?id=${item._id}#comment`}" target="_blank">
                            <div class="comment">
                                {{ item.commentLength }}
                            </div>
                        </nuxt-link>
                        <div class='delete' v-if="removePowers(getUser,item)" @click.prevent.stop="deleteBook(item._id)">
                            <Icon type="trash-a" size='16'></Icon>
                        </div>
                    </div>
                </nuxt-link>
            </li>
        </ul>
        <div class='nomore' v-if='nomore' style="margin-top:20px">
            <Icon type="social-dropbox-outline" size='300' color='#b2bac2' v-if='this.$route.query.title&& skip == 10 && bookList.length == 0'></Icon>
            <br>
            <div style="font-size:18px" v-if='$route.query.title && skip == 10 && bookList.length == 0'>暂无符合条件文章!</div>
            <div style="font-size:18px" v-else-if='!$route.query.title && skip== 10 && bookList.length == 0'>暂无数据</div>
            <div style="font-size:14px" v-else>没有更多了！</div>
        </div>
    </div>
</template>
<script>
import '~/assets/css/book/bookList.scss';
import Utils from '~/utils';
import api from '~/api';
import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {
            bookList: [], // 列表
            skip: 0, // 从第几条开始请求
            limit: 10, // 每次请求的条数
            getListAjax: true, // 是否获取列表接口
            nomore: false,
            oldCategoryid:''
        }
    },
    computed: {
        ...mapGetters({
            isLogin: 'getLoginState',
            getUser: 'getUser'
        })
    },
    methods: {
        ...mapActions({
            setAuthor: 'setAuthor'
        }),
        /**
         * 编辑最后编辑的时间，转化为...时间前
         * @oldTime 时间戳
         **/
        getPostTime(obj) {
            // let time = obj.post_time
            // if (this.$route.query.type == 'find') {
            //     time = obj.update_time
            // }

            //return Utils.getPostTime(time);
        },
        /**
         * 列表接口请求
         **/
        async getBookList() {
            console.log(this.$route.query);
            let { title, categoryid, type } = this.$route.query;
            if (this.getListAjax) {
                this.getListAjax = false;
                let data = await api.bookList({ title, categoryid, type, skip: this.skip, limit: this.limit });
                data = api.parse(data);
                if (data.length < 10) {
                    this.nomore = true
                }
                data.forEach((item, index) => {
                    let star = _.findIndex(item.star, o => o.userid === this.getUser.userId);
                    star > -1 ? item.isLike = true : item.isLike = false;
                    let content = item.markdown || item.html
                    item.brief = Utils.ToText(content).substring(0, 300) //简介
                });
                this.bookList.push(...data);
                this.skip = this.skip + this.limit;
                if (data.length === this.limit) this.getListAjax = true;
            }
        },
        /**
         * 点赞or取消点赞
         **/
        async clickLike(item) {
            if (this.isLogin) {
                let star = item.isLike ? 0 : 1;
                let data = await api.updateStar({ bookid: item._id, star });
                if (parseInt(data.data.code) === 200) {
                    let user = {
                        headimgurl: this.getUser.headimgurl,
                        nickname: this.getUser.nickname,
                        userid: this.getUser.userId,
                    }
                    item.isLike ? _.remove(item.star, i => i.userid == this.getUser.userId) : item.star.push(user);
                    item.isLike = !item.isLike;
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
         * 屏幕到底部时加载列表
         **/
        loadMore() {
            this.getBookList();
        },
        /**
         * 更新跳转用户详情页，所需要的vuex数据
         **/
        toUser(item) {
            this.setAuthor({
                userId: item._id,
                nickname: item.nickname,
                headimgurl: item.headimgurl,
                username: item.username
            });
        },
        /**
         * 删除文章
         **/
        async deleteBook(id) {
            let data = await api.deleteBook({ bookid: id });
            data = data.data;
            if (data && data.code === 200) {
                let removerIndex = this.bookList.findIndex((item, index) => {
                    return item._id === id;
                })
                this.bookList.splice(removerIndex, 1);
            }

        },
        /**
         * 判断用户删除文章权限
         **/
        removePowers(getUser, item) {
            return Utils.removePowers(getUser, item);
        }
    },
    created() {
        console.log(111);
        this.$Notice.config({
            top: 70
        });
    },
    watch: {
        $route: {
            handler(e) {
                this.getListAjax = true;
                this.skip = 0;
                this.bookList = [];
                this.getBookList()
            },
            deep: true
        }
    },
    mounted() {}
}
</script>
<style scoped>
</style>