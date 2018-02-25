<template>
    <div class='profileBox'>
        <!--<div class='settingMenu'>-->
            <!--<setting-menu></setting-menu>-->
        <!--</div>-->
        <div class='contentBox'>
            <h3>个人资料修改</h3>

            <div class='editBox'>
                <div class='headImgBox'>
                    <!--<h3>头像：</h3>-->
                    <img class='headImg' :src="headimgurl" alt="" @click="toggleShow" title='点击更换头像'>
                    <!--<Button class="changeBtn">更換头像</Button>-->
                </div>
                <label>
                    <span>昵 称：</span>
                    <Input class='nickname' v-model='nickname'></Input>
                </label>

                <Button type='primary' class='saveBtn' @click='saveUserData'>保 存</Button>


                <myUpload :field="fileName"
                           @crop-success="cropSuccess"
                           v-model="show"
                           :width="300"
                           :height="300"
                           :headers="headers"
                           img-format="png"></myUpload>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from '~/plugins/axios';
    import api from '~/api';
    import { mapGetters,mapActions } from 'vuex';
    import SettingMenu from '~/components/user/SettingMenu';
    import Upload from '~/utils/upload';
    import myUpload from '~/components/vue-crop/upload-image-crop';

    export default{
        data (){
            return {
                Upload:null,
                fileName:Math.random().toString(35).substr(2),
                show: false,
                headers: {
                    smail: '*_~'
                },
                userId:'',
                headimgurl:'',
                nickname:''
            }
        },
        components: {
            'setting-menu':SettingMenu,
            myUpload
        },
        methods: {
            ...mapActions([
                'setUser'
            ]),
            toggleShow() {
                this.show = !this.show;
            },
            /**
             * 裁剪成功
             */
            async cropSuccess(imgDataUrl, field){
                let ossImgUrl = await this.Upload.uploadData(imgDataUrl,field).catch((e) => {
                    this.$Notice.error({
                        title: '上传失败，请稍后重试',
                        desc: false
                    });
                });
                if (ossImgUrl) {
                    this.headimgurl = ossImgUrl;
                }
            },
            async saveUserData(){
                let userData = await api.updateUser({userid:this.userId,params:{headimgurl:this.headimgurl,nickname:this.nickname}});

                if(userData.data.code == '200'){
                    this.setUser({headimgurl:this.headimgurl,nickname:this.nickname});

                    console.log('保存成功');
                }
            }
        },
        mounted(){
            this.userId = this.getUser.userId;
            this.nickname = this.getUser.nickname;
            this.headimgurl = this.getUser.headimgurl;

            this.Upload = new Upload();
        },
        created(){

        },
        watch: {

        },
        computed: {
            ...mapGetters({
                getUser : 'getUser'
            })
        }
    }

</script>