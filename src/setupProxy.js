const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function (app) {
  app.use(createProxyMiddleware('/api', {
    target: 'http://alaiala.com',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      "^/api1": ""
    }
  }))
}