require.config({
    baseUrl: "/static",
    urlArgs: "bust=" +  (new Date()).getTime(),
    paths: {
        style: "assets/require/css.min",
        jquery: "assets/jquery/jquery-1.11.3.min",
        template: "assets/artTemplate/template",
        layui: 'assets/layui/layui',
        index: "js/index",
        utils: "js/utils",
    },
    shim: {
        layui: {
            deps: ["style!assets/layui/css/layui.css"]
        },
        index: {
            deps: ["style!css/index.css"]
        }
    }
});