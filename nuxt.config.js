var webpack = require('webpack')
var webConf = require('./constant/web')

module.exports = {
    debug: true,
    /*
     ** Headers of the page
     */
    head: {
        title: 'starter',
        meta: [
            {charset: 'utf-8'},
            {hid: 'description', name: 'description', content: 'h5 freshbook'}
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    /*
     ** Global CSS
     */
    css: [
        { src: 'quill/dist/quill.bubble.css', lang: 'css' }, //
        { src: 'quill/dist/quill.snow.css', lang: 'css' }, //
        { src: 'quill/dist/quill.core.css', lang: 'css' }, //
        { src: '~assets/css/debug.scss', lang: 'scss' }, // 指定 scss 而非 sass
        { src: '~/assets/css/main.scss', lang: 'scss' } // 指定 scss 而非 sass
    ],
    /**
     * 环境变量
     */
    env: {
        baseUrl: process.env.BASE_URL || `http://${webConf.nuxt.host}:${webConf.nuxt.port}`
    },
    router: {
        middleware: ['visits', 'user-agent', 'check-login']
    },
    /*
     ** Add axios globally
     */
    build: {
        vendor: ['axios', 'qs'],
        plugins: [
            new webpack.DefinePlugin({
                'process.VERSION': require('./package.json').version,
                __DEV: true
            })
        ],
        /*
         ** Run ESLINT on save
         */
        extend(config, ctx) {
            if (ctx.isClient) {
                // config.module.rules.push({
                //   enforce: 'pre',
                //   test: /\.(js|vue)$/,
                //   loader: 'eslint-loader',
                //   exclude: /(node_modules)/
                // })
                config.module.rules.push({ test: /iview.src.*?js$/, loader: 'babel-loader' })
                config.watch = true
            }
        }
    },
    plugins: [{ src: '~plugins/iview', ssr: true }, { src: '~plugins/filters' , ssr: false}, { src: '~plugins/mavon-eidor', ssr: false },
        { src: '~plugins/infinite-scroll', ssr: false }, { src: '~plugins/vue-html5-editor', ssr: false }
    ],
    loading: '~/components/common/Loading.vue',
    watchers: {
        webpack: {
            aggregateTimeout: 300,
            ignored: /node_modules/,
            poll: 1000
        }
    }
}