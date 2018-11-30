define(["mock"], function(Mock) {
    //模拟请求数据
    Mock.mock("/user/getInfo", {
        status: 1,
        data: {
            name: "gulp",
            title: "Gulp",
            content:"基于gulp搭建的前端自动化构建"
        }
    });
    Mock.mock("/user/content", {
        status: 2,
        data: {
            title: "Gulp",
            content:"基于gulp搭建的前端自动化构建"
        }
    });
});
