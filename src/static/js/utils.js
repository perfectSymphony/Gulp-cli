define(['jquery'], function($) {
    return {
        GetRequest: function() {
            var url = location.search;
            var theRequest = {};
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                var strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        },
        b64DecodeUnicode: function(str) {
            return decodeURIComponent(atob(str).split('').map(function(transBase64) {
                return '%' + ('00' + transBase64.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
        },
        interfaceProxy: () => '/api'
    }
});