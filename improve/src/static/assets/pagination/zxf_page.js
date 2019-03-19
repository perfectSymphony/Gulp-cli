define(["jquery"], function($) {
(function($) {
    function isInteger(obj) {
        return typeof obj === 'number' && obj % 1 === 0
    }
    var zp = {
        init: function(obj, pageinit) {
            var that = this;
            that.currentObj = obj;
            that.pageinit = pageinit;
            //订阅数据列表改变事件
            $.subscribe && $.subscribe('topic/ListDatasChange', function(num) {
                that.changeListData(num);
            });
            return (function() {
                zp.addhtml(obj, pageinit);
                zp.bindEvent(obj, pageinit);
            }());
        },
        changeListData: function(pageNum) {
            var that = this;
            that.pageinit.pageNum = pageNum;
            that.pageinit.current = 1;
            that.addhtml(that.currentObj, that.pageinit);
        },
        addhtml: function(obj, pageinit) {
            return (function() {
                obj.empty();
                if (isInteger(pageinit.pageNum)) {
                    /*上一页*/
                    if (pageinit.current > 1) {
                        obj.append('<a href="javascript:;" class="prebtn">上一页</a>');
                    } else {
                        obj.remove('.prevPage');
                        obj.append('<span class="disabled">上一页</span>');
                    }
                    //总页数
                    var total = pageinit.pageNum;
                    //当前页
                    var current = pageinit.current;
                    var content = '';
                    //总页数大于6时候
                    if (total > 6) {
                        //当前页数小于5时显示省略号
                        if (current < 5) {
                            for (var i = 1; i < 6; i++) {
                                if (current == i) {
                                    content += '<span class="current">' + i + '</span>';
                                } else {
                                    content += "<a href='javascript:;' class='zxfPagenum'>" + i + "</a>";
                                }
                            }
                            content += ". . .";
                            content += "<a href='javascript:;' class='zxfPagenum'>" + total + "</a>";
                        } else {
                            //判断页码在末尾的时候
                            if (current < total - 3) {
                                for (var i = current - 2; i < current + 3; i++) {
                                    if (current == i) {
                                        content += "<span class='current'>" + i + "</span>";
                                    } else {
                                        content += "<a href='javascript:;' class='zxfPagenum'>" + i + "</a>";
                                    }
                                }
                                content += ". . .";
                                content += "<a href='javascript:;' class='zxfPagenum'>" + total + "</a>";
                                //页码在中间部分时候 
                            } else {
                                content += "<a href='javascript:;' class='zxfPagenum'>1</a>";
                                content += ". . .";
                                for (var i = total - 4; i < total + 1; i++) {
                                    if (current == i) {
                                        content += "<span class='current'>" + i + "</span>";
                                    } else {
                                        content += "<a href='javascript:;' class='zxfPagenum'>" + i + "</a>";
                                    }
                                }
                            }
                        }
                        //页面总数小于6的时候
                    } else {
                        for (var i = 1; i < total + 1; i++) {
                            if (current == i) {
                                content += "<span class='current'>" + i + "</span>";
                            } else {
                                content += "<a href='javascript:;' class='zxfPagenum'>" + i + "</a>";
                            }
                        }
                    }
                    obj.append(content);

                    /*下一页*/
                    if (pageinit.current >= pageinit.pageNum) {
                        obj.remove('.nextbtn');
                        obj.append('<span class="disabled">下一页</span>');
                    } else {
                        obj.append('<a href="javascript:;" class="nextbtn">下一页</a>');
                    }
                    /*尾部*/
                    obj.append('<span>' + '共' + '<b>' + pageinit.pageNum + '</b>' + '页，' + '</span>');
                    obj.append('<span>' + '到第' + '<input type="text" class="zxfinput" value="1"/>' + '页' + '</span>');
                    obj.append('<span class="zxfokbtn">' + '确定' + '</span>');
                }
            }());
        },
        bindEvent: function(obj, pageinit) {
            return (function() {
                obj.on('click', 'a.firstbtn', function() {
                    var cur = parseInt(2);
                    var current = $.extend(pageinit, { "current": cur - 1 });
                    zp.addhtml(obj, current);
                    if (typeof(pageinit.backfun) == "function") {
                        pageinit.backfun(current);
                    }
                });
                obj.on("click", "a.prebtn", function() {
                    var cur = parseInt(obj.children("span.current").text());
                    var current = $.extend(pageinit, { "current": cur - 1 });
                    zp.addhtml(obj, current);
                    if (typeof(pageinit.backfun) == "function") {
                        pageinit.backfun(current);
                    }
                });
                obj.on("click", "a.zxfPagenum", function() {
                    var cur = parseInt($(this).text());
                    var current = $.extend(pageinit, { "current": cur });
                    zp.addhtml(obj, current);
                    if (typeof(pageinit.backfun) == "function") {
                        pageinit.backfun(current);
                    }
                });
                obj.on("click", "a.nextbtn", function() {
                    var cur = parseInt(obj.children("span.current").text());
                    var current = $.extend(pageinit, { "current": cur + 1 });
                    zp.addhtml(obj, current);
                    if (typeof(pageinit.backfun) == "function") {
                        pageinit.backfun(current);
                    }
                });
                obj.on("click", "a.lastbtn", function() {
                    var cur = parseInt(pageinit.pageNum - 1);
                    var current = $.extend(pageinit, { "current": cur + 1 });
                    zp.addhtml(obj, current);
                    if (typeof(pageinit.backfun) == "function") {
                        pageinit.backfun(current);
                    }
                });
                obj.on("click", "span.zxfokbtn", function() {
                    var cur = parseInt($("input.zxfinput").val());
                    var current = $.extend(pageinit, { "current": cur });
                    if (current.current > current.pageNum) {
                        current.current = current.pageNum;
                        cur = current.pageNum;
                    }
                    if(current.current < 1){
                        current.current = 1;
                        cur = 1;
                    }
                    zp.addhtml(obj, { "current": cur, "pageNum": pageinit.pageNum });
                    if (typeof(pageinit.backfun) == "function") {
                        $("input.zxfinput").val(current.current);
                        pageinit.backfun(current);
                    }
                });
            }());
        }
    }
    $.fn.createPage = function(options) {
        var pageinit = $.extend({
            pageNum: 15,
            current: 1,
            backfun: function() {}
        }, options);
        zp.init(this, pageinit);
    }
}(jQuery));    
})