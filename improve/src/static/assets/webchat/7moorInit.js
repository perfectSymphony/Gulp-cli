/**
 * Created by yaxi on 2015-07-28.
 */
window.console = window.console || (function(){
    var c = {}; c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile
        = c.clear = c.exception = c.trace = c.assert = function(){};
    return c;
})();
String.prototype.m7trim = function () {
    var value = "";
    return "undefined" == typeof this ? "" : (value = this.replace(/^\s*/g, ""), value.replace(/\s*$/g, ""));
};

var hostUrl = "//webchat.7moor.com/";

//兼容本地测试
//console.log(window.location.href.substr(0,4));
if(window.location.href.substr(0,4)!="http"){
    hostUrl = "http://webchat.7moor.com/"
}

(function () {
    var ie = !!(window.attachEvent && !window.opera);
    var wk = /webkit\/(\d+)/i.test(navigator.userAgent) && (RegExp.$1 < 525);
    var fn = [];
    var run = function () {
        for (var i = 0; i < fn.length; i++) fn[i]();
    };
    var d = document;
    d.ready = function (f) {
        if (!ie && !wk && d.addEventListener) {
            return d.addEventListener('DOMContentLoaded', f, false);
        }
        if (fn.push(f) > 1) return;
        if (ie) {
            (function () {
                try {
                    d.documentElement.doScroll('left');
                    run();
                }
                catch (err) {
                    setTimeout(arguments.callee, 0);
                }
            })();
        } else if (wk) {
            var t = setInterval(function () {
                if (/^(loaded|complete)$/.test(d.readyState))
                    clearInterval(t), run();
            }, 0);
        }
    };
})();
var clientId = "";
var otherParams = "";
if(typeof qimoClientId == "string" && qimoClientId != "undefined"){
    clientId = encodeURIComponent(qimoClientId);
}
if(typeof qimoClientId == "object"){
    clientId = qimoClientId.userId || "";
    // otherParams = encodeURIComponent(qimoClientId.customField)
}
var qimo_config =
{
    chatHost: hostUrl,
    accessId: 0,
    language: 'zh-CN',
    autoShow:true,
    version: '1.0',
    chatPage: hostUrl +"view/moor_chat.html",
    companyConfigUrl: hostUrl + "online",
    urlTitle:encodeURIComponent(document.title),
    fromUrl: encodeURIComponent(window.location.href),
    clientId: clientId,
    location: window.location.host,
    otherParams: otherParams,
    referrer: document.referrer || "",
    videoPage:'https://rtc.7moor.com/',
    screenSharePage: 'https://rtc.7moor.com:9443',
    userBehaviorVideoId: ""
};

var onlineData = undefined;

(function () {
    var scripts = {
        localInit: "7moorInit.js",
        pcChat: qimo_config.chatHost + "javascripts/QiMoIMSDK.js",
        json2: qimo_config.chatHost + "javascripts/json2.js",
        ubaJs:"//user-analysis.7moor.com/js/uba.min.js",
        mobileBackJs: './javascripts/mobileBackFunc.js'
    };
    var makeQuery = function (json) {
        json = json || {};
        var query_arr = [];
        json.__ = new Date().getTime();
        for (var key in json) {
            var val = json[key];
            query_arr.push(key + '=' + encodeURIComponent(val));
        }
        var query = query_arr.join('&').replace(/%20/g, '+');
        return query;
    }

    var Configure = {
        init: function () {
            this.getAccessId();
            var data = {
                accessId: qimo_config.accessId,
                location: encodeURIComponent(window.location.host),
                referrer: document.referrer || "",
                callbackF: "getChatConfig",
                action:"getOnlineStates"
            };
            this.loadJsonp(qimo_config.companyConfigUrl, data);
        },

        parseQuerystring : function (queryStr) {
            if ("string" != typeof queryStr)return {};
            var queryStr = queryStr.m7trim();
            if ("" === queryStr)return {};

            var json = {};
            try {
                for (var pairs = queryStr.split("&"), i = 0; i < pairs.length; i++) {
                    var kv = pairs[i].split("=");
                    kv[0] && kv[1] && (json[kv[0]] = decodeURIComponent(kv[1]))
                }
            } catch (e) {

            }
            return json;
        },
        getAccessId: function () {
            var s = document.getElementsByTagName("script");
            var src;
            for (var i = 0, n = s.length; i < n; i++) {
                src = s[i]["src"];
                if (src && src.indexOf(scripts.localInit) > -1) {
                    src = src.toLowerCase();
                    break;
                }
            }
            if (src && src.indexOf("accessid=") > 0) {
                var querys = this.parseQuerystring(src.substr(src.indexOf("?") + 1));
                qimo_config.accessId = querys.accessid;
                qimo_config.language = querys.language === 'en' ? 'en' : 'zh-CN'
                if(querys.autoshow){
                    qimo_config.autoShow = querys.autoshow;
                }
                if(querys.wap){
                    qimo_config.wap = querys.wap;
                }
            }

            scripts.pcChat = scripts.pcChat + "?accessId=" + qimo_config.accessId;
            this.loadJs();

        },
        addJsElement: function (src) {
            var el = document.createElement("script");
            el.setAttribute("charset", "UTF-8");
            el.src = src;
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(el, s)
        },

        loadJs: function () {
            //this.addJsElement(scripts.pcChat);
            this.addJsElement(scripts.json2);
        },

        loadJsonp : function (url, data) {
            var query = makeQuery(data);
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.setAttribute("charset", "UTF-8");
            script.src = url + "?" + query;
            try {
                document.body.appendChild(script);
            } catch (e) {
                document.ready(function () {
                    document.body.appendChild(script);
                });

            }
        },
        loadUbaJs: function () {
            var getCookie =function (key) {
                var strCookie = document.cookie
                var arrCookie = strCookie.split('; ')
                for (var i = 0; i < arrCookie.length; i++) {
                    var arr = arrCookie[i].split('=')
                    if (arr[0] == key)
                        return arr[1]
                }
                return ''
            };
            var skey = 'qimo_seosource_' + qimo_config.accessId;
            var times = 0;
            var interval = setInterval(function () {
                times++;
                if (getCookie(skey) || times > 10) {
                    Configure.addJsElement(scripts.ubaJs+"?v="+qimo_config.version);
                    clearInterval(interval);
                }
            }, 100);
        }

    };
    Configure.init();

    window.getChatConfig = function (c) {
        onlineData = c;
        qimo_config.version = c.version;
        qimo_config.companyName= c.companyName;
        qimo_config.account = c.account;
        if (onlineData.backJsEnable === true) {
            Configure.addJsElement(scripts.mobileBackJs)
        }
        Configure.addJsElement(scripts.pcChat+"&v="+qimo_config.version);
        Configure.loadUbaJs();
    };
})();
