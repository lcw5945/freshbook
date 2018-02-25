<template>
    <div class="loading-page" v-if="loading">
        <Spin fix>
            <Icon type="load-c" size=36 class="demo-spin-icon-load"></Icon>
            <div class='loadCss'>Loading</div>
        </Spin>
    </div>
</template>
<script>
export default {
    data: () => ({
        loading: false
    }),
    methods: {
        start() {
            this.loading = true;
        },
        finish() {
            this.loading = false;
        }
    }
};
</script>
<style scoped>
.loadCss {
    font-size: 14px;
    color: #2d8cf0;
    vertical-align: middle;
    text-align: center;
}

.demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
}

@keyframes ani-demo-spin {
    from {
        transform: rotate(0deg);
    }
    50% {
        transform: rotate(180deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>