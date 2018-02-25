<template>
    <div id='userMenu'>
        <Dropdown trigger="click">
            <a>
                <img class='headImg' :src='userInfo.headimgurl' alt="">
                <Icon type="arrow-down-b"></Icon>
            </a>
            <DropdownMenu slot="list">
                <span class='nickName g-ellipsis' v-html='userInfo.nickname'></span>
                <DropdownItem divided>
                    <nuxt-link :to="{path:'/drafts'}">写文章</nuxt-link>
                </DropdownItem>
                <DropdownItem>
                    <nuxt-link :to="{path:'/user/info/'+userInfo.userId,query:{pageName:'draft'}}">草稿</nuxt-link>
                </DropdownItem>
                <DropdownItem divided>
                    <nuxt-link :to="{path:'/user/info/'+userInfo.userId,query:{pageName:'allArticle'}}">我的主页</nuxt-link>
                </DropdownItem>
                <DropdownItem>
                    <nuxt-link :to="{path:'/user/info/'+userInfo.userId,query:{pageName:'collection'}}">我的收藏</nuxt-link>
                </DropdownItem>
                <DropdownItem divided v-show='this.userInfo.authority == 2'>
                    <nuxt-link :to="{path:'/user/manage'}">用户管理</nuxt-link>
                </DropdownItem>
                <!--<DropdownItem divided>-->
                    <!--<nuxt-link :to="{path:'/user/setting/profile'}">设置</nuxt-link>-->
                <!--</DropdownItem>-->
                <DropdownItem divided>
                    <span @click='logout'>登出</span>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>
<script>
import api from '~/api';
import { mapGetters, mapActions } from 'vuex'
export default {
    data() {
        return {}
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUser',
            isLogin: 'getLoginState'
        })
    },

    methods: {
        ...mapActions({
            setUser: 'setUser',
            setLoginState: 'setLoginState'
        }),
        logout() {
            api.logout().then((res) => {
                this.setLoginState(false)
                this.setUser(null)
                this.$router.push({path:'/',query:{tp:Date.now()}})
            })
        }
    },
    mounted() {
  
    },
    watch: {}
}
</script>