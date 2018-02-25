<template>
    <div id='articleCard'>
        <div class='hasContent' v-show='total'>
            <div class='cardBox' v-for="item in userBookList" @click='toDetail(item._id)'>
                <div v-if='isStar' class='starBox' title='取消收藏' @click.stop='cancelStar(item)'>
                    <Icon class='star' type="ios-star"></Icon>
                </div>
                <div v-else-if='!isStar && isLogin && (isSelf || getUser.authority>0 )' class='starBox' title='删除' @click.stop='deleteBook(item)'>
                    <Icon class='star' type="trash-a"></Icon>
                </div>
                <div style="float: left;width:180px;">
                    <h3 class='g-ellipsis' v-text='item.title?item.title:"未知标题"'></h3>
                    <p class='g-ellipsis' v-if='item.categoryid && item.categoryid.name'>
                        <Icon type="record" style='margin-right:5px;color:#f1e05a;' :style='{"color":item.categoryid.iconcolor}'></Icon>{{item.categoryid.name}}</p>
                </div>
                <img v-if='item.cover' :src="item.cover" alt="">
                <Icon v-else type="social-github" size='88'></Icon>
            </div>
            <Page class='pageCount' :total="total" :current='pageCurrent' :page-size='limit' @on-change='changePage'></Page>
        </div>
        <div class='noContent' v-show='!total'>
            没有可显示内容~
        </div>
        <Spin size="large" fix v-if="loading"></Spin>
    </div>
</template>
<script>
import api from '~/api';
import { mapGetters } from 'vuex';
export default {
    props: ['pageType', 'isSelf', 'changeCount', 'count'],
    data() {
        return {
            article: {
                title: 'myStore',
                language: 'vue'
            },
            pageCurrent: 1,
            isStar: false,
            skip: 0, // 从第几条开始请求
            limit: 10, // 每次请求的条数
            userBookList: [], //当页数据
            post: 1, //是否发布
            total: 0, //数据总数
            loading: true, //是否显示loading
            pageNum: 1,
            nowUserId: this.$route.params.id || 0
        }
    },
    computed: {
        ...mapGetters({
            getUser: 'getUser',
            isLogin: 'getLoginState'
        })
    },

    components: {},
    methods: {
        async cancelStar(item) {
            let data = await api.updateStar({ bookid: item._id, star: 0 });
            if (parseInt(data.data.code) === 200) {
                this.getStarBooks();
                this.changeCount('starCount')
                 this.total--;
            }
        },
        async deleteBook(item) {
            let data = await api.deleteBook({ bookid: item._id });
            data = data.data;
            if (data && data.code === 200) {
                this.getBooks()
                if (item.post) {
                    this.changeCount('postCount')
                } else {
                    this.changeCount('unPostCount')
                }
                this.total--;
            }
        },
        async getBooks() {
            this.loading = true;
            let data = await api.userBookList({
                skip: this.skip,
                limit: this.limit,
                conditions: { userid: this.nowUserId, post: this.post }
            });
            let bookList = api.parse(data);
            this.userBookList = bookList.list
            this.loading = false;
            this.isStar = false;
        },
        async getStarBooks() {
            this.loading = true;
            let data = await api.getUser({ userid: this.nowUserId, limit: this.limit, skip: this.skip });
            let userData = api.parse(data);
            this.userBookList = userData.star;
            this.loading = false;
            this.isStar = true;
        },
        initData() {
            this.skip = 0;
            this.pageCurrent = 1
            if (this.pageType === 'collection') {
                this.total = this.count.starCount;
                this.getStarBooks();
            } else {
                if (this.pageType === 'draft') {

                    this.total = this.count.unPostCount;
                    this.post = 0;
                } else {

                    this.total = this.count.postCount;
                    this.post = 1;
                }
                this.getBooks();
            }

        },
        changePage(page) {
            this.skip = (page - 1) * this.limit;
            this.pageCurrent = page
        },
        /**
         * 进入详情页或者修改页
         * */
        toDetail(id) {
            if (this.pageType === 'draft') {
                this.$router.push({ path: '/drafts', query: { bookid: id } })
            } else {
                this.$router.push({ path: '/books', query: { id: id } })
            }
        }
    },
    mounted() {
        this.initData();
    },
    watch: {
        skip: {
            handler(e) {
                if (this.pageType === 'collection') {
                    this.getStarBooks();
                } else {
                    if (this.pageType === 'draft') {
                        this.post = 0;
                    } else {
                        this.post = 1;
                    }
                    this.getBooks();
                }
            },
            deep: true
        },
        pageType: {
            handler(val) {
                this.initData()
            },
            deep: true
        }
    }
}
</script>