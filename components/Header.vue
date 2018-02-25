<template>
    <header>
        <div class='headBox'>
            <nuxt-link :to="{path:'/'}">
                <img class='logoIcon' src="../assets/img/icon.png" alt="">
                <!-- <img class='logo' src="../assets/img/logo.png" alt=""> -->
            </nuxt-link>
            <div class="searchBox">
                <div class="nav" :class="{active:type != 'find'}">
                    <nuxt-link :to="{path:'/'}">
                        <i class="iconfont icon-homepage"></i>
                        <span>首页</span>
                    </nuxt-link>
                </div>
                <div class="nav" :class="{active:type == 'find'}">
                    <nuxt-link :to="{path:'/',query:{'type':'find'}}">
                        <i class="iconfont icon-browse"></i>
                        <span>发现</span>
                    </nuxt-link>
                </div>
                <Input class='searchInput' v-model="searchContent" icon="ios-search-strong" placeholder="请输入要搜索的内容" @on-click='toSearch' @on-enter='toSearch'></Input>
            </div>
            <!--<nuxt-link :to="{path: '/drafts'}">-->
            <div class='writeArticle' @click='toWrite'>
                <i class="iconfont icon-brush_fill"></i>
                <span>写文章</span>
            </div>
            <!--</nuxt-link>-->
            <div class='loginBox' v-if='pagePath!="/login"'>
                <span v-show='!isLogin' class='loginBtn'><LoginBtn></LoginBtn> </span>
                <user-menu v-show='isLogin' />
            </div>
        </div>
    </header>
</template>
<script>
import UserMenu from '~/components/common/UserMenu';
import LoginBtn from '~/components/common/LoginBtn';
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            searchContent: '',
            type: '',
            pagePath: ''
        }
    },
    components: {
        UserMenu,
        LoginBtn
    },
    methods: {
        ...mapActions({
            setUser: 'setUser'
        }),
        changePath() {
            // 设置页面的type
            if (this.$route.path == '/') {
                this.type = this.$route.query.type
            }
            this.pagePath = this.$route.path
        },
        toSearch() {
            this.$router.push({ path: '/', query: { title: this.searchContent } });
        },
        toWrite() {
            if (this.isLogin) {
                this.$router.push({ path: '/drafts' });
            } else {
                let localStorage = window.localStorage || {}
                localStorage.setItem('loginBtnUrl', this.$route.fullPath)
                this.$router.push({ path: '/login' })

            }
        }
    },

    mounted() {
        this.changePath()
    },
    created() {
        if (this.$route.query.title) {
            this.searchContent = this.$route.query.title;
        }
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        '$route': 'changePath'
    },
    computed: {
        ...mapGetters({
            getUser: 'getUser',
            isLogin: 'getLoginState'
        })
    },
}
</script>