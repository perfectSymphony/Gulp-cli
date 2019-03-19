require.config({
    baseUrl: "/static",
    urlArgs: "bust=" +  (new Date()).getTime(),
    paths: {
        style: "assets/require/css.min",
        jquery: "assets/jquery/jquery-1.11.3.min",
        qrcode: "assets/qrcode/qrcode",
        template: "assets/artTemplate/template",
        zxf_page: "assets/pagination/zxf_page",
       // mock: "public/mockjs/mock.min",
        // data: "data/data",
        index: "js/index",
        utils: "js/utils",
        nav: "js/navigation",
        footer: "js/footer",
        login: "js/login",
        matterList: "js/matterList"
    },
    shim: {
        qrcode: {
            deps: ['jquery']
        },
        // data: {
        //     deps: ["mock"]
        // },
        index: {
            deps: ["style!css/index.css"]
        }
    }
});