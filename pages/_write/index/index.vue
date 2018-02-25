<template>
    <div id="markContainer">
        <div id="toolbar" slot="toolbar">
            <span class="ql-formats"><button type="button" class="ql-bold"></button></span>
            <span class="ql-formats"><button type="button" class="ql-italic"></button></span>
            <span class="ql-formats"><button type="button" class="ql-underline"></button></span>
            <span class="ql-formats"><button type="button" class="ql-strike"></button></span>
            <span class="ql-formats"><button type="button" class="ql-blockquote"></button></span>
            <span class="ql-formats"><button type="button" class="ql-code-block"></button></span>
            <span class="ql-formats"><button type="button" class="ql-header" value="1"></button></span>
            <span class="ql-formats"><button type="button" class="ql-header" value="2"></button></span>
            <span class="ql-formats"><button type="button" class="ql-list" value="ordered"></button></span>
            <span class="ql-formats"><button type="button" class="ql-list" value="bullet"></button></span>
            <span class="ql-formats"><button type="button" class="ql-script" value="sub"></button></span>
            <span class="ql-formats"><button type="button" class="ql-script" value="super"></button></span>
            <span class="ql-formats"><button type="button" class="ql-indent" value="-1"></button></span>
            <span class="ql-formats"><button type="button" class="ql-indent" value="+1"></button></span>
            <span class="ql-formats"> <button type="button" class="ql-direction" value="rtl"></button></span>

            <span class="ql-formats"><select class="ql-size">
        <option value="small"></option>
        <option selected></option>
        <option value="large"></option>
        <option value="huge"></option>
      </select></span>
            <span class="ql-formats"><select class="ql-header">
        <option value="1"></option>
        <option value="2"></option>
        <option value="3"></option>
        <option value="4"></option>
        <option value="5"></option>
        <option value="6"></option>
        <option selected="selected"></option>
      </select></span>
            <span class="ql-formats"><select class="ql-color">
        <option selected="selected"></option>
        <option value="#e60000"></option>
        <option value="#ff9900"></option>
        <option value="#ffff00"></option>
        <option value="#008a00"></option>
        <option value="#0066cc"></option>
        <option value="#9933ff"></option>
        <option value="#ffffff"></option>
        <option value="#facccc"></option>
        <option value="#ffebcc"></option>
        <option value="#ffffcc"></option>
        <option value="#cce8cc"></option>
        <option value="#cce0f5"></option>
        <option value="#ebd6ff"></option>
        <option value="#bbbbbb"></option>
        <option value="#f06666"></option>
        <option value="#ffc266"></option>
        <option value="#ffff66"></option>
        <option value="#66b966"></option>
        <option value="#66a3e0"></option>
        <option value="#c285ff"></option>
        <option value="#888888"></option>
        <option value="#a10000"></option>
        <option value="#b26b00"></option>
        <option value="#b2b200"></option>
        <option value="#006100"></option>
        <option value="#0047b2"></option>
        <option value="#6b24b2"></option>
        <option value="#444444"></option>
        <option value="#5c0000"></option>
        <option value="#663d00"></option>
        <option value="#666600"></option>
        <option value="#003700"></option>
        <option value="#002966"></option>
        <option value="#3d1466"></option>
      </select></span>
            <span class="ql-formats"> <select class="ql-background">
        <option value="#000000"></option>
        <option value="#e60000"></option>
        <option value="#ff9900"></option>
        <option value="#ffff00"></option>
        <option value="#008a00"></option>
        <option value="#0066cc"></option>
        <option value="#9933ff"></option>
        <option selected="selected"></option>
        <option value="#facccc"></option>
        <option value="#ffebcc"></option>
        <option value="#ffffcc"></option>
        <option value="#cce8cc"></option>
        <option value="#cce0f5"></option>
        <option value="#ebd6ff"></option>
        <option value="#bbbbbb"></option>
        <option value="#f06666"></option>
        <option value="#ffc266"></option>
        <option value="#ffff66"></option>
        <option value="#66b966"></option>
        <option value="#66a3e0"></option>
        <option value="#c285ff"></option>
        <option value="#888888"></option>
        <option value="#a10000"></option>
        <option value="#b26b00"></option>
        <option value="#b2b200"></option>
        <option value="#006100"></option>
        <option value="#0047b2"></option>
        <option value="#6b24b2"></option>
        <option value="#444444"></option>
        <option value="#5c0000"></option>
        <option value="#663d00"></option>
        <option value="#666600"></option>
        <option value="#003700"></option>
        <option value="#002966"></option>
        <option value="#3d1466"></option>
      </select></span>
            <span class="ql-formats"><select class="ql-font">
        <option selected="selected"></option>
        <option value="serif"></option>
        <option value="monospace"></option>
      </select></span>
            <span class="ql-formats">
        <select class="ql-align">
        <option selected="selected"></option>
        <option value="center"></option>
        <option value="right"></option>
        <option value="justify"></option>
      </select>
      </span>
            <span class="ql-formats"><button type="button" class="ql-clean"></button></span>
            <span class="ql-formats"><button type="button" class="ql-link"></button></span>
            <!--图片按钮点击事件-->
            <span class="ql-formats">
                <button type="button" @click="uploadImg_clickHandler()" class="imgUploadBox">
                     <input id="uploadInput" type="file" ref='uploadInput' @change='uploadImg_changeHandler()'
                            style="display: none">
                     <svg viewBox="0 0 18 18"> <rect class="ql-stroke" height="10" width="12" x="3" y="4"></rect> <circle
                             class="ql-fill" cx="6" cy="7" r="1"></circle> <polyline class="ql-even ql-fill"
                                                                                     points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline> </svg>
                </button>
            </span>
            <!--<span class="ql-formats"><button type="button" class="ql-video"></button></span>-->

        </div>
        <div class="quill-editor"
             :content="content"
             @change="onEditorChange($event)"
             @ready="onEditorReady($event)"
             v-quill:myQuillEditor="editorOption">
        </div>

    </div>
</template>

<script>

    import {mapActions, mapGetters} from 'vuex';
    import Upload from '~/utils/upload';
    export default {
        data () {
            return {
                UploadEditor: null,
                myQuillEditor: '',
                content: '',
                firstFlag: true,
                editorOption: {
                    modules: {
                        toolbar: '#toolbar'
                        /*toolbar: [
                         ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                         ['blockquote', 'code-block'],

                         [{'header': 1}, {'header': 2}],               // custom button values
                         [{'list': 'ordered'}, {'list': 'bullet'}],
                         [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
                         [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
                         [{'direction': 'rtl'}],                         // text direction

                         [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
                         [{'header': [1, 2, 3, 4, 5, 6, false]}],

                         [{'color': []}, {'background': []}],          // dropdown with defaults from theme
                         [{'font': []}],
                         [{'align': []}],
                         ['clean'],
                         ['link', 'image']// remove formatting button
                         ]*/
                    }
                }
            }
        },
        created(){
            this.UploadEditor = new Upload();
        },

        mounted() {
            /* 是否是有html数据*/
            if (this.getArticle.html) {
                this.content = this.getArticle.html;
                this.firstFlag = false;
            }
        },
        methods: {
            ...mapActions(['setArticle', 'updateDraft']),

            onEditorReady(editor) {
                this.myQuillEditor = editor;
                console.log('editor ready!', editor)
            },
            onEditorChange({edior, html, text}) {
                console.log(html);
                this.setArticle({
                    html,
                });
                if (this.firstFlag) {
                    this.updateDraft({
                        html,
                    })
                }
                this.firstFlag = true;
            },
            uploadImg_clickHandler(){
                this.$refs.uploadInput.click()
            },
            async uploadImg_changeHandler(){
                let that = this;
                let $file = this.$refs.uploadInput.files[0];
                if ($file['type'].includes('image')) {
                    let ossImgUrl = await this.UploadEditor.uploadData($file).catch((e) => {
                        that.$Notice.error({
                            title: '上传失败，请稍后重试',
                            desc: false
                        });
                    });
                    if (ossImgUrl) {
                        let selection = this.myQuillEditor.getSelection();
                        let cursorPositon = 0;
                        if (selection) {
                            cursorPositon = selection['index']
                        }

                        this.$Modal.confirm({
                            onOk: () => {
                                this.myQuillEditor.insertEmbed(cursorPositon, 'image', ossImgUrl + `?x-oss-process=image/resize,w_${this.value},limit_0`)   // 调用编辑器的 insertEmbed 方法，插入URL
                                this.value = ''
                            },
                            render: (h) => {
                                return h('div', [h('div', {
                                    style: {
                                        marginBottom: '10px'
                                    }
                                }, "请输入宽度"), h('Input', {
                                    props: {
                                        value: this.value,
                                        autofocus: true,
                                        maxlength:4,
                                        placeholder: '请输入宽度'
                                    },
                                    on: {
                                        input: (val) => {
                                            this.value = val
                                        }
                                    }
                                })])
                            }
                        })

                    }
                } else {
                    this.$Notice.error({
                        title: '上传类型错误,请上传图片',
                        desc: false
                    });
                }
            }
        },
        computed: {
            ...mapGetters(['getArticle'])
        },
    }
</script>
<style lang="scss" scoped>
    #markContainer {
        width: 100%;
        /*margin: 0 auto;*/
        padding: 50px;
        .quill-editor {
            min-height: 500px;
            max-height: 100px;
            overflow-y: auto;
        }

    }

</style>