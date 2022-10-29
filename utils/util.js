var t = function(t) {
    return (t = t.toString())[1] ? t : "0" + t;
};

module.exports = {
    formatTime: function(r) {
        var e = r.getFullYear(), n = r.getMonth() + 1, a = r.getDate(), o = r.getHours(), u = r.getMinutes(), c = r.getSeconds();
        return [ e, n, a ].map(t).join("-") + " " + [ o, u, c ].map(t).join(":");
    },
    base64_encode: function(t) {
        for (var r, e, n, a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", o = 0, u = t.length, c = ""; o < u; ) {
            if (r = 255 & t.charCodeAt(o++), o == u) {
                c += a.charAt(r >> 2), c += a.charAt((3 & r) << 4), c += "==";
                break;
            }
            if (e = t.charCodeAt(o++), o == u) {
                c += a.charAt(r >> 2), c += a.charAt((3 & r) << 4 | (240 & e) >> 4), c += a.charAt((15 & e) << 2), 
                c += "=";
                break;
            }
            n = t.charCodeAt(o++), c += a.charAt(r >> 2), c += a.charAt((3 & r) << 4 | (240 & e) >> 4), 
            c += a.charAt((15 & e) << 2 | (192 & n) >> 6), c += a.charAt(63 & n);
        }
        return c;
    },
    throttle: function(t, r) {
        null != r && null != r || (r = 1500);
        var e = null;
        return function() {
            var n = +new Date();
            (n - e > r || !e) && (t.apply(this, arguments), e = n);
        };
    },
    getCurrentPageUrlWithArgs: function() {
        var t = getCurrentPages(), r = t[t.length - 1], e = r.route, n = r.options, a = e + "?";
        for (var o in n) {
            a += o + "=" + n[o] + "&";
        }
        return a = a.substring(0, a.length - 1);
    }
};