<template>
    <div id="markContainer">
        <mavon-editor
                ref='md'
                :value=markDownVal
                @scrollStyle=true
                default_open="preview"
                @imgAdd="$imgAdd"
                @change="$change"
                @imgDel="$imgDel"
        />
    </div>
</template>

<script>
    import api from '~/api';
    import Upload from '~/utils/upload';
    //    import axios from 'axios';
    import _ from 'lodash';
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: 'id',
        data(){
            return {
                UploadMark: {},
                markDownVal: '',
                bookData: {},
                timer: null,
                firstFlag: 2
            }
        },
        methods: {
            ...mapActions(['setArticle', 'updateDraft']),
            $change(value){
                console.log(this.firstFlag);
                this.setArticle({
                    markdown: value,
                });
                if (this.firstFlag >= 3) {
                    this.updateDraft({
                        markdown: value,
                    })
                }else{
                    this.firstFlag++
                }
            },

            // 绑定@imgAdd event
            async $imgAdd(pos, $file){
                if ($file['type'].includes('image')) {
                    let ossImgUrl = await this.UploadMark.uploadData($file).catch((e) => {
                        this.$Notice.error({
                            title: '上传失败，请稍后重试',
                            desc: false
                        });
                    });
                    ossImgUrl && this.$refs.md.$img2Url(pos, ossImgUrl);
                } else {
                    this.$Notice.error({
                        title: '上传类型错误,请上传图片',
                        desc: false
                    });
                }
            },
            $imgDel(){

            },
        },
        created(){
            this.UploadMark = new Upload();
            if (this.getArticle.bookid) {
                this.markDownVal = this.getArticle.markdown
                this.firstFlag = 0;
            }
        },
        mounted(){

        },
        watch: {},
        computed: {
            ...mapGetters(['getArticle'])
        },
    }
</script>
<style lang="scss" scoped="" type="text/css">
    #markContainer {
        min-height: 600px;
        padding: 20px;
    }

    .v-note-wrapper {
        min-height: 600px;
        z-index: 0;
    }

</style>

