/**
 * Created by Cray on 2017/1/5.
 */


export const WX_HOST = (process.env.NODE_ENV === 'production') ?
    {
        appid: 'wx6598c9857934da6f', //待定
        redirect_uri: 'http://freshbook.hefantv.com/login'//待定
    } : (process.env.NODE_ENV === 'testing') ? {
        appid: 'wxddc0ea24b6040522', //待定
        redirect_uri: 'http://localhost.hefantv.com:9018/login'//待定
    } : {
        appid: 'wxf57d0ac7f1af8364',
        redirect_uri: 'http://localhost.hefantv.com:9018/login'
    };