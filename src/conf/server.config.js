
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
    port: 9527,
    //startPath:'./dist/front/html/index.html',//默认打开的初始地址，可以不加
    startPath:'./src/html/index.html',//默认打开的初始地址，可以不加
    server: {
        baseDir: './',
        middleware: [jsonProxy],
        directory: false
    },
    open: true,
    ui: false,
    ghostMode: false	
}
