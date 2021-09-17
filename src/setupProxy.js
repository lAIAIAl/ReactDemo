const { createProxyMiddleware } = require('http-proxy-middleware')
import defaultUrl from './utils/current'
module.exports = function (app) {
  app.use(createProxyMiddleware('/api', {
    target: defaultUrl,
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      "^/api1": ""
    }
  }))
}