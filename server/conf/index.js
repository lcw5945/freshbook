export const WX_INFO = (process.env.NODE_ENV === 'production') ? {
    appid: 'wx6598c9857934da6f', //待定
    secret: '7a6efb06382a9b7bbed17902b09b7f6a' //待定
} : (process.env.NODE_ENV === 'testing') ? {
    appid: 'wxddc0ea24b6040522', //待定
    secret: '57f7b753de0ffba0977b4c12831161d8' //待定
} : {
    appid: 'wxf57d0ac7f1af8364',
    secret: 'b8516d216e62f724a68b7ed5e068b0de'
};