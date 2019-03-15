

module.exports = {
    port: 3333,
    startPath:'./dist/front/views/index.html',//默认打开的初始地址，可以不加
    //startPath:'./src/views/index.html',//默认打开的初始地址，可以不加
    server: {
        baseDir: './',
        directory: false
    },
    open: true,
    ui: false,
    ghostMode: false	
}
