<template>
    <div @click="toLogin">登录</div>
</template>
<script>
export default {
    data() {
        return {}
    },
    methods: {
        toLogin() {
            let localStorage = window.localStorage || {}
            localStorage.setItem('loginBtnUrl', this.$route.fullPath)
            this.$router.push({ path: '/login' })
        }
    }


}
</script>