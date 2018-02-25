<template>
    <div id="wirteBox">
        <header class="writeheader">
            <div class="articleTitle">
                <input v-model="paramsData.title" v-on:input="editTitle_changeHandler()" type="text"
                       placeholder="请输入标题..."/>
            </div>
            <div class="userBox">
                <div v-if="getUser.userId">
                    <user-menu/>
                </div>
                <div v-else>
                    <nuxt-link :to="{path:'/login'}">
                        <span style="color: #007fff;font-size: 14px;">登录</span>
                    </nuxt-link>
                </div>
            </div>
            <div class="articleOtherBox">
                <div class="articleHeadImgBox">
                    <i :class="[{chooseImg:this.cover.length},'icon' ,'iconfont' ,'icon-tupian']"
                       @click="showAndHideBox_clickHandler('showUploadBox')"></i>
                    <div class="uploadImgBox" v-show="uploadImgShowBoxFlag">
                        <h3>添加封面大图 <span v-if="this.cover.length > 0" @click="cover=''"
                                         style="font-size: 12px;color: rgb(0, 127, 255);float: right;cursor: pointer;">删除</span>
                        </h3>
                        <div class="uploadImgShowBox">
                            <div class="addBtnBox" v-if="this.cover.length == 0">
                                <button class="addBtn">点击此处添加图片</button>
                                <input ref='uploadInput' type="file" @change='uploadImg_changeHandler()'>
                            </div>
                            <div class="showImgBox" v-else>
                                <img :src="cover" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="changEditWayBox">
                    <div @click='showAndHideBox_clickHandler("editChangeModal")'>
                        <Icon type="android-more-horizontal"></Icon>
                    </div>
                    <div class="changEditWayContainer" v-show='editChangeModalFlag'
                         @click="changEditWay_clickHandler()">
                        切换到{{editType}}编辑器
                    </div>
                </div>
                <div class="articlePublishBox">
                    <button class="publishBtn" @click='showAndHideBox_clickHandler("articleChooseBox")'>
                        <span>发布&nbsp;</span>
                        <Icon type="arrow-down-b"></Icon>
                    </button>
                    <div class="articleChooseBox" v-show="articleChooseBoxFlag">
                        <h3>发布文章</h3>
                        <h4>选择分类</h4>
                        <ul>
                            <li v-for='item in categoryList' :key="item['_id']"
                                :class='{active_chooseGroup:categoryid==item["_id"]}'
                                @click="chooseGroup_clickHandler(item['_id'])" v-text="item['name']">
                            </li>
                        </ul>
                        <button class="publish-btn" @click="publishArticle_clickHandler()">确定并发布</button>
                    </div>
                </div>
            </div>
        </header>
        <nuxt-child/>
    </div>
</template>

<script>
    import api from '~/api';
    import Upload from '~/utils/upload';
    import UserMenu from '~/components/common/UserMenu';
    import {mapGetters, mapActions} from 'vuex';
    import _ from 'lodash';
    export default {
        name: 'write',
        validate ({params}) {
            return params['write'] == 'post' || params['write'] == 'drafts'
        },
        async asyncData ({params, query, error}) {
            const {bookid} = query;
            let categoryList, bookDetail, categoryid = '5a447c41a1e52f0a03be2d7e', cover = '', post = 0,
                paramsData = {title: ''};
            categoryList = await api.categoryList().catch(() => {
                error({statusCode: 404, message: 'categoryList error'})
            })
            if (bookid) {
                bookDetail = await api.bookDetail({bookid}).catch(() => {
                    error({statusCode: 404, message: 'categoryList error'})
                });
                bookDetail = api.parse(bookDetail);

                if (bookDetail) {
                    if (bookDetail["categoryid"]) categoryid = bookDetail["categoryid"]['_id'];
                    if (bookDetail["cover"]) cover = bookDetail["cover"];
                    if (bookDetail["post"]) post = bookDetail["post"];
                    if (bookDetail["title"]) paramsData["title"] = bookDetail["title"];
                }
            }
            return {
                categoryList: api.parse(categoryList) || [],
                categoryid,
                cover,
                paramsData,
                bookid,
                post
            }
        },
        async fetch ({store, query}) {
            const {bookid} = query;
            let commitData = {
                "markdown": '',
                "html": '',
                "title": '',
                "bookid": '',
                "cover": '',
                "categoryid": '',
            };
            if (bookid) {
                let {data} = await api.bookDetail({bookid}).catch(() => {
                    error({statusCode: 404, message: 'categoryList error'})
                });
                data = api.parse(data);
                commitData = {
                    bookid: data['_id'],
                    markdown: data['markdown'],
                    html: data['html'],
                    title: data['title'],
                    cover: data['cover'],
                    categoryid: data['categoryid'],
                }
            }
            store.commit('SET_ARTICLE', commitData);
        },
        data(){
            return {
                editChangeModalFlag: false,
                articleChooseBoxFlag: false,
                uploadImgShowBoxFlag: false,
                editType: this.$route.path.includes('markdown') ? "富文本" : "Markdown",
                paramsData: {
                    title: '',
                },
                categoryid: '',
                cover: '',
                UploadCover: {},
                timer: null,
            }
        },
        components: {
            UserMenu
        },
        methods: {
            ...mapActions(['setArticle', 'updateDraft']),
            /* title 编辑事件 */
            editTitle_changeHandler(){
                let title = this.paramsData.title;
                this.setArticle({
                    title
                });
                this.updateDraft({
                    title
                })
            },
            /* 切换编辑器 按钮*/
            changEditWay_clickHandler(){
                let editType = this.editType,
                    path = '';
                this.$Modal.confirm({
                    title: `切换到${editType}编辑器`,
                    content: '<p>切换写作模式后，当前内容不会迁移，会自动保存为草稿。</p>',
                    onOk: () => {
                        if (editType == 'Markdown') {
                            path = "/drafts/markdown";
                            editType = '富文本';
                        } else {
                            path = "/drafts";
                            editType = "Markdown";
                        }
                        this.paramsData.title = '';
                        this.categoryid = '';
                        this.cover = '';
                        this.setArticle(({
                            html: '',
                            markdown: ''
                        }))
                        this.$router.push({path});
                        this.editType = editType;
                        this.editChangeModalFlag = false;
                    }
                });
            },
            /* 控制元素div显示 隐藏*/
            showAndHideBox_clickHandler(type){
                let {articleChooseBoxFlag, uploadImgShowBoxFlag, editChangeModalFlag} = this
                this.articleChooseBoxFlag = false;
                this.uploadImgShowBoxFlag = false;
                this.editChangeModalFlag = false;
                switch (type) {
                    case 'editChangeModal':     /* 显示隐藏 切换编辑器 蒙版*/
                        this.editChangeModalFlag = !editChangeModalFlag;
                        break;
                    case 'articleChooseBox':   /* 显示隐藏 发布选择分组的div*/
                        this.articleChooseBoxFlag = !articleChooseBoxFlag;
                        break;
                    case 'showUploadBox':    /* 显示 隐藏 上传div*/
                        this.uploadImgShowBoxFlag = !uploadImgShowBoxFlag;
                        break;
                }
            },
            /* 选择分组 */
            chooseGroup_clickHandler(categoryid, e){
                this.categoryid = categoryid;
            },
            /* 文章图片 上传 */
            async uploadImg_changeHandler(val){
                let that = this
                let $file = this.$refs.uploadInput.files[0];

                if ($file['type'].includes('image')) {
                    let ossImgUrl = await this.UploadCover.uploadData($file).catch((e) => {
                        that.$Notice.error({
                            title: '上传失败，请稍后重试',
                            desc: false
                        });
                    });
                    if (ossImgUrl) {
                        this.cover = ossImgUrl;
                        this.setArticle(({
                            cover: ossImgUrl
                        }))
                        this.updateDraft(({
                            cover: ossImgUrl
                        }))
                    }
                } else {
                    this.$Notice.error({
                        title: '上传类型错误,请上传图片',
                        desc: false
                    });
                }
            },
            /* 发布 文章*/
            publishArticle_clickHandler(){
                this.debounce()
            },
            publishData_callback(){
                let params = {}
                let {categoryid, cover} = this;
                if (!this.getArticle.title) {
                    return this.$Message.warning('标题为空');
                }
                if (!categoryid) {
                    return this.$Message.warning('请选择分类');
                }
                if (!this.getArticle.markdown && !this.getArticle.html) {
                    return this.$Message.warning('请输入内容');
                }
                Object.assign(params, this.getArticle, {categoryid, cover});
                if (!this.post) {
                    api.publisBook(params).then((res) => {
                        let _data = api.parse(res);
                        if (_data) {
                            this.post = _data['post'];
                            this.$Message.success('发布成功');
                            this.$router.push({path: '/'});
                        }
                    })
                } else {
                    api.updatePost(params).then((res) => {
                        let _data = api.parse(res);
                        if (_data) {
                            this.$Message.success('更新成功');
                            this.$router.push({path: '/books', query: {id: params.bookid}});
                        }
                    })
                }
            }
        },
        created(){
            this.debounce = _.debounce(this.publishData_callback, 300);
            this.UploadCover = new Upload();
        },
        updated(){
            if (!this.UploadCover.uploadData) this.UploadCover = new Upload();
        },
        mounted(){

        },
        watch: {},
        computed: {
            ...mapGetters(['getArticle', 'getUser'])
        },
    };
</script>


