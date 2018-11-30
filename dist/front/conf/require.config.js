require.config({
    baseUrl: "../",
    urlArgs: "bust=" +  (new Date()).getTime(),
    paths: {
        style: "public/require/css.min",
        jquery: "public/jquery/jquery-1.11.3.min",
        qrcode: "public/qrcode/qrcode",
        template: "public/artTemplate/template",
        mock: "public/mockjs/mock.min",
        data: "data/data",
        index: "static/js/index/index",
        utils: "static/js/commonjs/utils",
        page1: "static/js/page1/page1"
    },
    shim: {
        qrcode: {
            deps: ['jquery'],
            exports: 'qrcode'
        },
        data: {
            deps: ["mock"]
        },
        index: {
            deps: ["style!static/css/page/index.css"]
        },
        page1: {
            deps: ["style!static/css/page/page1.css"]
        }
    }
});
