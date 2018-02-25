<template>
    <div id='userInfoContainer'>
        <div class='userInfoBox'>
            <img :src='userInfo.headimgurl' alt="">
            <p class='username' v-text='userInfo.nickname'></p>
            <!--<p v-text='userInfo.remarks'></p>-->
            <!--<nuxt-link :to="{ path: '/user/setting/profile'}" v-show='isSelf'>-->
            <!--<Button>修改资料</Button>-->
            <!--</nuxt-link>-->
        </div>
        <div class='opusBox'>
            <Menu mode="horizontal" theme="light" :active-name="activeName" @on-select='selectTab'>
                <MenuItem name="allArticle"> 已发布
                <Badge class='tabBadge' :count='count.postCount' />
                </MenuItem>
                <MenuItem name="draft" v-show='isSelf'> 草稿
                <Badge class='tabBadge' :count='count.unPostCount' />
                </MenuItem>
                <MenuItem name="collection" v-show='isSelf'> 收藏
                <Badge class='tabBadge' :count='count.starCount' />
                </MenuItem>
            </Menu>
            <article-list ref='articleList' :pageType='activeName' :isSelf='isSelf' :changeCount='changeCount' :count='count'></article-list>
        </div>
    </div>
</template>
<script>
import axios from '~/plugins/axios';
import api from '~/api';
import { mapGetters } from 'vuex';
import ArticleList from '~/components/user/ArticleList';

export default {
    validate({ params }) {
        console.log('user-id-page validate params.id', params.id)
        return String(params.id).length === 24
    },
    async asyncData ({params, query, error, store}) {
        let data = await api.getUser({ userid: params.id, limit: 0, skip: 0 });
        let userData = api.parse(data);

        let countData = await api.countUserBook({ conditions: { userid: params.id } })
        let count = api.parse(countData);
        let isSelf = false,activeName = query.pageName || 'allArticle';

        if (store.state.user.userId == params.id) {
            isSelf = true;
        } else {
            isSelf = false;
            activeName = 'allArticle';
        }

        return {
            userInfo:userData,
            count,
            activeName,
            isSelf
        }
    },
    data() {
        return {}
    },
    components: {
        ArticleList
    },
    methods: {
        selectTab(name) {
            this.activeName = name;
            //this.$refs['articleList'].initData()
        },
        changeCount(type) {
            this.count[type]--;
            this.$forceUpdate()
        },
        initData() {
            if (!this.isLogin && this.isSelf) {
                this.$router.push({ path: '/login' })
                return
            }
        },
    },
    head() {
        return {
            title: '个人主页'
        }
    },
    created(){
        this.initData();
    },
    computed: {
        ...mapGetters({
            isLogin: 'getLoginState'
        })
    }
}
</script>