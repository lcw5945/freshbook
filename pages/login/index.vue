<template>
    <div class='login'>
        <iframe :src="crodUrl" v-if='!hasCode'></iframe>
        <Spin size="large" fix v-else></Spin>
    </div>
</template>
<script>
import 'assets/css/book/bookList.scss';
import api from '~/api';
import { WX_HOST } from '~/api/config';
import { mapGetters, mapActions } from 'vuex'
export default {
    data() {
        return {
            crodUrl: '',
            hasCode: this.$route.query.code
        }
    },
    computed: {
        ...mapGetters({
            getUser: 'getUser',
            isLogin: 'getLoginState'
        })
    },
    methods: {
        ...mapActions({
            setUser: 'setUser',
            setLoginState: 'setLoginState'
        }),
        async login() {
            if (this.isLogin) {
                this.$router.push({ path: '/' })
                return
            }
            if (!this.isLogin && this.hasCode) {
                let param = {
                    code: this.hasCode
                }
                let loginInfo = await api.login(param)

                loginInfo = api.parse(loginInfo)
                this.setLoginState(true)
                this.setUser(loginInfo)
                const localStorage = window.localStorage || {}
                let loginBtnUrl = localStorage.getItem('loginBtnUrl')
                if (loginBtnUrl != '/login') {
                    this.$router.push({ path: loginBtnUrl })
                }
            }
        }
    },
    created() {},
    mounted() {
        this.login()
        this.crodUrl = "https://open.weixin.qq.com/connect/qrconnect?appid=" + WX_HOST.appid + "&scope=snsapi_login&redirect_uri=" + WX_HOST.redirect_uri + "&state=111&login_type=jssdk&style=black"
    }
}
</script>