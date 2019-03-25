define(["jquery", "utils", "layui", "template"], function($, utils, layui,template) {
    $("body").css("visibility", "visible");
    const interfaceProxy = utils.interfaceProxy()

    // 调接口
    window.onload = function() {
        queryData();
    };

    var queryData = () => {
        $.ajax({
            type: "GET",
            url: interfaceProxy + '/pc/feed/?category=gallery_old_picture',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
                // xxId: xxId,
            },
            beforeSend: beforeSend,
            success: callback,
            error: ajaxError
        })
    }

    //
    var beforeSend = (xmlHttp) => {
        xmlHttp.setRequestHeader("Cache-Control", "private,must-revalidate");
    }

    var isData = (data) => {
        return data != '' && data != 0 && data != null && data != 'undefined';
    }

    // 回调函数
    var callback = (data) => {
        if (isData(data)) {
            if(data.message == 'success'){
                var data = data.data;
                console.log(data);
                $(".demo").html(template("demoTpl",{list : data}))
            } else if(data.message == 'error'){
                console.log('接口报错了')
            }
        }
    }

    //回调失败
    var ajaxError = (e) => {
        alert('请检查您的网络');
    }

    //弥补artTemplate渲染引擎本身的不足   
    var toChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    var toUnitChar = ["", "十", "百", "千", "万", "亿", "万亿", "亿亿"];
    template.helper('numberToChar', function(number) {
        var toStr = '',
            toLargeStr = '';
        var toUnitStr = 0;
        var flag = true;
        while (number > 0) {
            var integer = number % 10;
            if (integer === 0) {
                if (!flag) {
                    flag = true;
                    toLargeStr = toChar[integer] + toLargeStr;
                }
            } else {
                flag = false;
                toStr = toChar[integer];
                toStr += toUnitChar[toUnitStr];
                toLargeStr = toStr + toLargeStr;
            }
            toUnitStr++;
            number = Math.floor(number / 10);
        }
        return toLargeStr;
    });

});