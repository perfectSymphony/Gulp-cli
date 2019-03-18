define(["mock"], function(Mock) {
    //模拟请求数据
    Mock.mock("/user/getInfo", {
        status: 1,
        data: {
            name: "gulp",
            title: "Gulp",
            content:"基于requireJS和Gulp搭建的前端脚手架搭建成功！！！"
        }
    });
});
