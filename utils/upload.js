import api from '~/api';
import axios from 'axios';
class Upload {
    constructor() {
        this.getOssData();
    }

    getOssData() {
        api.getAliOssUploadCfg().then((res) => {
//          let _data = api.parse(res);
            let _data = res['data'];
            this.ossData = _data;
            // Object.assign(this.ossData, _data);
        })
    }
    uploadData($file, $fileName) {
        let fileName = $fileName;
        if ($fileName) {
            $file = convertBase64UrlToBlob($file);
        } else {
            fileName = $file['name'];
        }

        var ossData = this.ossData;
        var request = new FormData();
        var dateTimer = Date.now() + '_';
        var ossImgUrl = ossData.host + '/' + ossData.dir + dateTimer + fileName;
        console.log(ossImgUrl);
        request.append('OSSAccessKeyId', ossData.accessid);
        request.append('policy', ossData.policy);
        request.append('Signature', ossData.signature);
        request.append('success_action_status', '200');
        request.append('key', ossData.dir + dateTimer + fileName);
        request.append('file', $file);
        request.append('dir', ossData.dir);
        function convertBase64UrlToBlob(urlData) {
            let bytes = window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte

            //处理异常,将ascii码小于0的转换为大于0
            let ab = new ArrayBuffer(bytes.length);
            let ia = new Uint8Array(ab);
            for (let i = 0; i < bytes.length; i++) {
                ia[i] = bytes.charCodeAt(i);
            }

            return new Blob([ab], {type: 'image/png'});
        }

        return new Promise((reslove, reject) => {
            axios({
                url: "http://h5-active.oss-cn-beijing.aliyuncs.com/",
                data: request,
                method: "POST",
            }).then((data) => {
                reslove(ossImgUrl)
            }).catch((e) => {
                reject(e)
            })
        })

    }


}
export default Upload;