require.config({
    baseUrl: "/static",
    urlArgs: "bust=" +  (new Date()).getTime(),
    paths: {
        style: "assets/require/css.min",
        jquery: "assets/jquery/jquery-1.11.3.min",
        template: "assets/artTemplate/template",
       // mock: "public/mockjs/mock.min",
        // data: "data/data",
        index: "js/index",
        utils: "js/utils",
    },
    shim: {
        // data: {
        //     deps: ["mock"]
        // },
        index: {
            deps: ["style!css/index.css"]
        }
    }
});