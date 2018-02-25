<template>
    <div>
        <my-header v-if="!/^\/drafts/.test(this.$route.path) && !/^\/post/.test(this.$route.path)" />
        <div class='rootContainer'>
            <nuxt/>
        </div>
        <my-footer/>
    </div>
</template>
<script>
import MyFooter from '~/components/Footer.vue'
import MyHeader from '~/components/Header.vue'

export default {
    components: {
        MyFooter,
        MyHeader
    },
    created(){
        this.$Notice.config({
            top: 70
        });
    }
}
</script>
<style>
html,
body {
    background-color: #eee !important;
}

.container {
    margin: 0;
    width: 100%;
    /*padding: 75px 0;*/
    text-align: center;
}

.rootContainer {
    padding: 75px 0;
}

.button,
.button:visited {
    display: inline-block;
    color: black;
    letter-spacing: 1px;
    background-color: #fff;
    border: 2px solid #000;
    text-decoration: none;
    text-transform: uppercase;
    padding: 15px 45px;
}

.button:hover,
.button:focus {
    color: #fff;
    background-color: #000;
}

.title {
    color: #000;
    font-weight: 300;
    font-size: 2.5em;
    margin: 0;
}
</style>