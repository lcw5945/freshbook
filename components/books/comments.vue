<template>
    <div class="commentContainer w800">
        <ul>
            <li v-for="(comment,index) in comments" :key="index">
                <div class="user">
                    <img :src="comment.headimgurl" />
                    <p>{{ comment.nickname }}</p>
                </div>
                <div class="cont">
                    <p>
                        {{ comment.content }}
                    </p>
                    <div class="time">
                        {{ formatDate(comment.create_time) }} <span @click="showReplay(index)">回复{{ comment.childcomments?'('+comment.childcomments.length+')':'' }}</span>
                    </div>
                    <div class="replay" v-show="comment.childcomments || comment.isShow ">
                        <ul>
                            <li v-for="(child, childIndex) in comment.childcomments" :key="childIndex">
                                <img :src="child.headimgurl" />
                                <div>
                                    <span class="username">{{ child.nickname }}</span><span v-if="child.touser" class="touser"> @{{child.touser.nickname}}</span>：{{child.content}}
                                    <div class="time">{{ formatDate(child.create_time) }} <span @click="addToUserHandler(index,childIndex)">回复</span></div>
                                </div>
                            </li>
                        </ul>
                        <div class="replayTip">
                            <span v-show="comment.touser">回复{{ comment.touser.nickname }} :</span>
                            <div class="say" @click="showWriteReplayHandler(index)">我也说一句</div>
                        </div>
                        <div class="write" v-show="comment.isWriteShow">
                            <i-input v-model="comment.replayContent" type="textarea" :rows="4" placeholder="请输入..."></i-input>
                            <button @click="replayComment(index)">发表</button>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <div class="writeBox">
            <p>发表回复</p>
            <div class="write">
                <i-input v-model="content" type="textarea" :rows="4" placeholder="请输入..."></i-input>
                <button @click="addCommentHandler()">发表</button>
            </div>
        </div>
    </div>
</template>
<script>
import Utils from '~/utils';
import api from '~/api';
import { mapActions, mapGetters } from 'vuex'
export default {
    props: ['bookcommentid', 'bookid'],
    data() {
        return {
            comments: [],
            content: "", // 评论内容
            commentid: this.bookcommentid, // 评论id
        }
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUser',
        })
    },
    methods: {
        isLogin() {
            if (!this.userInfo.nickname) {

                this.$Notice.warning({
                    title: '请登录后在操作',
                });

                return false;
            }
            return true
        },
        formatDate(time) {
            return Utils.formatDate(time)
        },
        showReplay(index) {
            let obj = this.comments[index];
            this.comments[index].isShow = !obj.isShow
        },
        /**
         * 点击写评论
         * */
        showWriteReplayHandler(index) {

            if (!this.isLogin()) {
                return false
            }

            let obj = this.comments[index];
            this.comments[index].isWriteShow = !obj.isWriteShow
            this.comments[index].touser = ''
        },
        /**
         * 点击评论中的回复
         * */
        addToUserHandler(index,childIndex) {

            if (!this.isLogin()) {
                return false
            }

            let obj = this.comments[index];
            if(childIndex){
                obj=obj.childcomments[childIndex]
            }

            this.comments[index].touser = {
                userid: obj.userid,
                headimgurl: obj.headimgurl,
                nickname: obj.nickname
            }
            this.comments[index].isWriteShow = true;

        },
        async initData() {
            if (!this.commentid) {
                return;
            }
            let commRes = await api.comments({ id: this.commentid }).catch((e) => {
                console.error({ statusCode: 404, message: ' comment not found' })
            })

            let data = api.parse(commRes)
            data && data.comments.map((obj) => {
                obj.isShow = false
                obj.replayContent = ''
                obj.touser = ''
                obj.isWriteShow = obj.childcomments && obj.childcomments.length > 0 ? false : true
            })

            this.comments = data && data.comments || []

        },
        /*
         * 发表评论
         * */
        async addCommentHandler() {

            if (!this.isLogin()) {
                return false
            }

            if(!this.content){
                this.$Notice.warning({
                    title: '请输入评论内容！',
                });
                return
            }

            let commRes = await api.addComment({ content: this.content, bookid: this.bookid, commentid: this.commentid }).catch((e) => {
                console.error({ statusCode: 404, message: ' comment add error' })
            })

            let data = api.parse(commRes)

            if (!this.commentid) {
                this.commentid = data.commentid

            }
            this.content = ''
            this.initData()

        },
        async replayComment(index) {

            if (!this.isLogin()) {
                return false
            }

            if(!this.comments[index].replayContent){
                this.$Notice.warning({
                    title: '请输入回复内容！',
                });
                return
            }


            let obj = this.comments[index];
            let touser = obj.touser;

            let commRes = await api.replayComment({ content: obj.replayContent, commentid: this.commentid, key: obj.key, touser }).catch((e) => {
                console.error({ statusCode: 404, message: ' comment replay error' })
            })
            this.comments[index].replayContent = ''

            this.initData()
        }

    },
    mounted() {
        this.initData()
        this.$Notice.config({
            top: 70
        });
    }

}
</script>
<style scoped>
</style>