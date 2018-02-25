<template>
    <div class="categoryBox">
        <h3>Languages</h3>
        <ul>
            <li v-for=" cate in categoryCounts " :class="{select: cate._id === categoryid}" v-if="cate.count > 0">
                <nuxt-link v-if="cate._id != categoryid" @click='chooseCate_clickHandler()' :to="{path:'/', query:{title:title,categoryid:cate._id}}" >
                    <div >
                        {{cate.name}}
                        <span class="count">{{cate.count}}</span>
                    </div>
                </nuxt-link>
                <div v-if="cate._id == categoryid">
                    {{cate.name}}
                    <nuxt-link  :to="{path:'/', query:{title:title,type:'all'}}" >
                        <span class="close" >×</span>
                    </nuxt-link>
                </div>

            </li>
        </ul>
    </div>
</template>

<script >
    //js
    import axios from '~/plugins/axios';
    import api from '~/api';
    export default {
        name: 'seachCategory',
        data(){
            return {
                title:'',
                categoryCounts:[],
            }
        },
        methods:{
            chooseCate_clickHandler(){
//                window.location.reload()
            }
        },
        mounted(){
            let {title} =  this.$route.query;
            this.title = title;
            api.countCategoryBook({title:this.title}).then((res)=>{
                 this.categoryCounts = api.parse(res);
            }).catch((e) => {
                console.error({ statusCode: 404, message: 'seach book count not found' })
            })

        },
        computed:{
            categoryid(){
                return this.$route.query['categoryid']
            }
        }
    }
</script>

