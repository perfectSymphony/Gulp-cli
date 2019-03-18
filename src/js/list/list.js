define(["jquery", "layui", "template"], function($, layui, template) {
    $("body").css("visibility", "visible");

    $.ajax({
        type: "GET",
        url: "/api/pc/realtime_news/",
        dataType: "json",
        //成功回调
        success: function(data) {   
            if(data.message == 'success'){
            	var data = data.data;
            	// console.log(data);
            	$("#listInfo").html(template("listInfoTpl",{list : data}))
            }else if(data.message == 'error'){
            	console.log('接口报错了');
            }
        },
        //失败回调
        error:function(data){
            alert('网络出错了！');
        }
    });
});
