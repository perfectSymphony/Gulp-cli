define(["jquery", "data", "template"], function($, d, template) {
    $("body").css("visibility", "visible");

    $.ajax({
        type: "post",
        url: "/user/getInfo",
        dataType: "json",
        //成功回调
        success: function(data) {
            if (data.status == 1) {
                /*模板拼接字符串*/
                var html_ = template('userInfo', data);
                $('#user_info').html(html_);
            } else if (data.status == 0) {
                $("#datalist").html('<h1 class="tc nodadaShow">没有查询到分类的产品信息</h1>');
            }
        },
        //失败回调
        error:function(data){
            console.log(data);
        }
    });
// 第二个异步请求
    $.ajax({
        type: "post",
        url: "/user/content",
        dataType: "json",
        //成功回调
        success: function(data) {
            if (data.status == 2) {
                /*模板拼接字符串*/
                var html = template('userContent', data);
                $('#user_content').html(html);
            } else if (data.status == 0) {
                $("#datalist").html('<h1 class="tc nodadaShow">没有查询到分类的产品信息</h1>');
            }
        },
        //失败回调
        error:function(data){
            console.log(data);
        }
    });

});
