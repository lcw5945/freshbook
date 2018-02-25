import Koa from 'koa'
import Session from 'koa-session2'
import Router from 'koa-router'
import Compress from 'koa-compress'
import cors from 'koa-cors'
import BodyParser from 'koa-bodyparser'
import Boom from 'boom'
import {Nuxt, Builder} from 'nuxt'
import Store from "./service/store.js"
import './service/mongdb'
import webConf from '../constant/web'
import apiV1Router from './router/v1'


const app = new Koa()
const host = webConf.nuxt.host
const port = webConf.nuxt.port

app.use(BodyParser({
    formLimit: '50mb',
    jsonLimit: '50mb',
}))
app.use(cors())
app.use(Session({
    key: "hefan_freshbook",
    maxAge: 24 * 60 * 60 * 1000
    // store: new Store()  //redis
}))

app.use(Compress({
    filter: function (content_type) {
        return /js|css/i.test(content_type)
    },
    threshold: 2048,
    flush: require('zlib').Z_SYNC_FLUSH
}))

app.use(apiV1Router.routes());
app.use(apiV1Router.allowedMethods({
    throw: true,
    notImplemented: () => new Boom.notImplemented(),
    methodNotAllowed: () => new Boom.methodNotAllowed()
}));

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

//set nuxt env
config.env.NODE_ENV = process.env.NODE_ENV
console.log('Nuxt env: ' + config.env.NODE_ENV)
// Instantiate nuxt.js
const nuxt = new Nuxt(config)

// Build in development
if (config.dev) {
    const builder = new Builder(nuxt)
    builder.build().catch(e => {
        console.error(e) // eslint-disable-line no-console
        process.exit(1)
    })
}

app.use(ctx => {
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset
    ctx.req.session = ctx.session;
    return new Promise((resolve, reject) => {
        ctx.res.on('close', resolve)
        ctx.res.on('finish', resolve)
        nuxt.render(ctx.req, ctx.res, promise => {
            // nuxt.render passes a rejected promise into callback on error.
            promise.then(resolve).catch(reject)
        })
    })
})

app.listen(port)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
console.log('Server node env' + " : "+ process.env.NODE_ENV)
