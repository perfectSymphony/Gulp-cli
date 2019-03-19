const proxy = require('http-proxy-middleware');

const jsonProxy = proxy('/api', {
    target: '',
    // target: 'http://47.94.156.128:3333/banshi/front',
    changeOrigin: true,
    pathRewrite: {
        '^/api': ''
    },
    logLevel: 'debug'
})

module.exports = {
    // 服务器
    server: {
        baseDir: './dist',
        middleware: [jsonProxy]
    },
    open: true,
    ui: false,
    ghostMode: false,
    // 使用端口
    port: '3333'
}