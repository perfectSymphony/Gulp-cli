define(["jquery", "utils", "template", "qrcode"], function($, utils, template, qrcode) {
    $("body").css("visibility", "visible");
    // const imgUrlPrefix = '/static/images/';
    const interfaceProxy = utils.interfaceProxy()


    // 调接口
    window.onload = function() {
        query();
    };

    var query = () => {
        var obj = utils.GetRequest();
        var b64DecodeUnicode = utils.b64DecodeUnicode;
        var sxjbxxId = b64DecodeUnicode(obj.sxjbxxId);
        var urlStr = b64DecodeUnicode(obj.urlStr);
        console.log(urlStr)
        if (sxjbxxId == "") {
            alert("该事项名称id错误！");
        } else {
            queryData(sxjbxxId, urlStr);
        }
    }

    var queryData = (sxjbxxId, urlStr) => {
        $.ajax({
            type: "GET",
            url: interfaceProxy + urlStr,
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
                sxjbxxId: sxjbxxId,
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
        return data.matterExtend != '' && data.matterExtend != 0 && data.matterExtend != null && data.matterExtend != 'undefined';
    }

    // 回调函数
    var callback = (data) => {
        console.log(data);
        if (isData(data)) {

            //申报、预约
            var user = utils.GetRequest();
        }
    }

    //回调失败
    var ajaxError = (e) => {
        alert('网络开小差了');
    }

    //弥补template模板引擎的本身的不足
    var toChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    var toUnitChar = ["", "十", "百", "千", "万", "亿", "万亿", "亿亿"];
    template.helper('numberToChar', function(number) {
        var toStr = '',
            toLargeStr = '';
        var toUnitStr = 0;
        var flag = true;
        while (number > 0) {
            var v = number % 10;
            if (v === 0) {
                if (!flag) {
                    flag = true;
                    toLargeStr = toChar[v] + toLargeStr;
                }
            } else {
                flag = false;
                toStr = toChar[v];
                toStr += toUnitChar[toUnitStr];
                toLargeStr = toStr + toLargeStr;
            }
            toUnitStr++;
            number = Math.floor(number / 10);
        }
        return toLargeStr;
    });

});