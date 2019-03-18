require.config({
    baseUrl: "../",
    urlArgs: "bust=" +  (new Date()).getTime(),
    paths: {
        style: "public/require/css.min",
        jquery: "public/jquery/jquery-1.11.3.min",
        qrcode: "public/qrcode/qrcode",
        template: "public/artTemplate/template",
        mock: "public/mockjs/mock.min",
        layui: 'public/layui/layui',
        data: "data/data",
        index: "js/index/index",
        utils: "js/commonjs/utils",
        list: "js/list/list"
    },
    shim: {
        qrcode: {
            deps: ['jquery'],
            exports: 'qrcode'
        },
        data: {
            deps: ["mock"]
        },
        layui: {
            deps: ["style!public/layui/css/layui.css"]
        },
        index: {
            deps: ["style!css/page/index.css"]
        },
        list: {
            deps: ["style!css/page/list.css"]
        }
    }
});
