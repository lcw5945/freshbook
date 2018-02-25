<template>
    <section class="container">
        <div class="content">
            <div class="bookBox">
                <BookList></BookList>
            </div>
            <div class="categorybox">
                <category></category>
            </div>
        </div>
        <BackTop :bottom="105" :right="30">
            <div class='goTop'>
                <Icon type="jet"></Icon>
            </div>
        </BackTop>
    </section>
</template>
<script>
import BookList from '~/components/books/BookList.vue';
import category from '~/components/common/Category'

export default {
    data() {
        return {

        }
    },
    methods: {},
    head() {
        return {
            title: 'FreshBook'
        }
    },
    components: {
        BookList,
        category
    },
}
</script>
<style scoped>
.goTop {
    background: rgba(70, 163, 255, .9);
    color: #fff;
    text-align: center;
    border-radius: 2px;
}

.title {
    margin: 30px 0;
}

.users {
    list-style: none;
    margin: 0;
    padding: 0;
}

.user {
    margin: 10px 0;
}
</style>