<template>
    <div class='userManage'>
        <div v-show='hasAuth'>
            <Table class='tableList' :columns="columns" :data="dataList"></Table>
            <Page class='pageCount' :total="count" :current='pageCurrent' :page-size='limit' @on-change='changePage'></Page>
        </div>
        <div v-show='!hasAuth' class='warnText'>很抱歉，你没有权限访问此页面！</div>
    </div>
</template>
<script>
    import Utils from '~/utils';
    import api from '~/api';
    import {mapGetters, mapActions} from 'vuex';

    export default{
        data (){
            return {
                columns:[
                    {
                        title: '昵称',
                        key: 'nickname',
                        align: 'center',
                    },{
                        title: '权限',
                        key: 'authority',
                        align: 'center',
                        render: (h, params) => {
                            switch (params.row.authority){
                                case 0:
                                    return '普通用户';
                                    break;
                                case 1:
                                    return '管理员';
                                    break;
                                case 2:
                                    return '超级管理员';
                                    break;
                            }
                        }
                    },
                    {
                        title: '操作',
                        key: 'authority',
                        align: 'center',
                        render: (h, params) => {
                            if(params.row.authority != 2){
                                return h('div', [
                                    h('span', {
                                        style: {
                                            color: '#46a3ff',
                                            cursor: 'pointer'
                                        },
                                        on: {
                                            click: () => {
                                                this.changeAuth(params.row);
                                            }
                                        }
                                    }, params.row.authority == 0 ? '升级为管理员' : '降为普通用户'),
                                ]);
                            }

                        }
                    }
                ],
                dataList:[],
                limit:10,
                skip:0,
                count:0,
                pageCurrent:1,
                hasAuth:false
            }
        },
        methods: {
            async getAllUser(){
                let data = await api.getAllUser({limit:this.limit, skip:this.skip});
                let tableData = api.parse(data);

                this.dataList = tableData.tableList;
                this.count = tableData.count;
            },
            async saveUserData(userId,auth){
                return await api.updateUserAuth({userid:userId,params:{authority:auth}});
            },
            changeAuth(params){
                let auth = 0;
                if(params.authority == 0){
                    auth = 1;
                }else if(params.authority == 1){
                    auth = 0;
                }

                this.saveUserData(params._id,auth).then(data =>{
                    if(data.data.code == 200){
                        params.authority = auth;
                    }else {
                        this.$Notice.error({
                            title: '操作失败',
                            desc: data.data.msg
                        });
                    }
                })

            },
            changePage(page){
                this.pageCurrent = page;
                this.skip = (page-1)*this.limit;
            }
        },
        created(){
            this.getAllUser();

            if(this.userInfo.authority == 2){
                this.hasAuth = true;
            }else {
                this.hasAuth = false;
            }
        },
        computed: {
            ...mapGetters({
                userInfo: 'getUser'
            })
        },
        watch: {
            skip: {
                handler(e) {
                    this.getAllUser();
                },
                deep: true
            }
        }
    }

</script>
