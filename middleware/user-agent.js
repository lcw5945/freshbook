export default function (ctx) {
  ctx.userAgent = process.server ? ctx.req.headers['user-agent'] : navigator.userAgent
}
