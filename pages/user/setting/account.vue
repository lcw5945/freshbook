<template>
    <div>
    </div>
</template>
<script>
    import axios from '~/plugins/axios';
    import api from '~/api';
    import { mapGetters } from 'vuex';

    export default{
        data (){
            return {}
        },
        components: {},
        methods: {},
        mounted(){

        },
        watch: {},
        computed: {
            ...mapGetters({
                getUser : 'getUser'
            })
        }
    }

</script>