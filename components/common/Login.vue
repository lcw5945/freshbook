<template>
    <div class='login'>
        <iframe :src="crodUrl"></iframe>
    </div>
</template>
<script>
import 'assets/css/book/bookList.scss';
import api from '~/api';
import { WX_HOST } from '~/api/config';

export default {
    data() {
        return {
            crodUrl: ''
        }
    },
    methods: {
        /**
         * 编辑最后编辑的时间，转化为...时间前
         * @oldTime 时间戳
         **/
        getPostTime(oldTime) {},

        /**
         * 点赞or取消点赞
         **/
        clickLike() {},
        /**
         * 屏幕到底部时加载列表
         **/
        loadMore() {
            this.getBookList();
        },
        async login() {
            let param = {
                code: this.$route.query.code,
                appid: WX_HOST.appid,
                secret:WX_HOST.secret
            }
            let data = await api.login(param);
        },
    },
    created() {},
    mounted() {
       // this.login();
        this.crodUrl = "https://open.weixin.qq.com/connect/qrconnect?appid=" + WX_HOST.appid + "&scope=snsapi_login&redirect_uri=" + WX_HOST.redirect_uri + "&state=111&login_type=jssdk&style=black"
    }
}
</script>
<style scoped>
</style>