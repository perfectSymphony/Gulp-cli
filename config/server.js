const proxy = require('http-proxy-middleware');

const jsonProxy = proxy('/api', {
    target: 'https://www.toutiao.com/api',
    changeOrigin: true,
    pathRewrite: {
        '^/api': ''
    },
    logLevel: 'debug'
})

module.exports = {
    server: {
        baseDir: './dist',
        middleware: [jsonProxy]
    },
    open: true,
    ui: false,
    ghostMode: false,
    port: '9527'
}