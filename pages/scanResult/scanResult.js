var a = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../../utils/mixins/pageMixin/myPageMixin")), e = getApp(), t = require("../../utils/util.js"), r = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(a) {
        var e, t, n, o, s, i, d, c = "", l = 0;
        for (a = r._utf8_encode(a); l < a.length; ) o = (e = a.charCodeAt(l++)) >> 2, s = (3 & e) << 4 | (t = a.charCodeAt(l++)) >> 4, 
        i = (15 & t) << 2 | (n = a.charCodeAt(l++)) >> 6, d = 63 & n, isNaN(t) ? i = d = 64 : isNaN(n) && (d = 64), 
        c = c + this._keyStr.charAt(o) + this._keyStr.charAt(s) + this._keyStr.charAt(i) + this._keyStr.charAt(d);
        return c;
    },
    decode: function(a) {
        var e, t, n, o, s, i, d = "", c = 0;
        for (a = a.replace(/[^A-Za-z0-9\+\/\=]/g, ""); c < a.length; ) e = this._keyStr.indexOf(a.charAt(c++)) << 2 | (o = this._keyStr.indexOf(a.charAt(c++))) >> 4, 
        t = (15 & o) << 4 | (s = this._keyStr.indexOf(a.charAt(c++))) >> 2, n = (3 & s) << 6 | (i = this._keyStr.indexOf(a.charAt(c++))), 
        d += String.fromCharCode(e), 64 != s && (d += String.fromCharCode(t)), 64 != i && (d += String.fromCharCode(n));
        return d = r._utf8_decode(d);
    },
    _utf8_encode: function(a) {
        var e = "";
        a = a.replace(/\r\n/g, "\n");
        for (var t = 0; t < a.length; t++) {
            var r = a.charCodeAt(t);
            r < 128 ? e += String.fromCharCode(r) : r > 127 && r < 2048 ? (e += String.fromCharCode(r >> 6 | 192), 
            e += String.fromCharCode(63 & r | 128)) : (e += String.fromCharCode(r >> 12 | 224), 
            e += String.fromCharCode(r >> 6 & 63 | 128), e += String.fromCharCode(63 & r | 128));
        }
        return e;
    },
    _utf8_decode: function(a) {
        var e, t, r, n = "", o = 0;
        for (e = t = 0; o < a.length; ) (e = a.charCodeAt(o)) < 128 ? (n += String.fromCharCode(e), 
        o++) : e > 191 && e < 224 ? (t = a.charCodeAt(o + 1), n += String.fromCharCode((31 & e) << 6 | 63 & t), 
        o += 2) : (t = a.charCodeAt(o + 1), r = a.charCodeAt(o + 2), n += String.fromCharCode((15 & e) << 12 | (63 & t) << 6 | 63 & r), 
        o += 3);
        return n;
    }
};

Page({
    mixins: [ a.default ],
    data: {},
    scanCode: t.throttle(function(a) {
        wx.scanCode({
            onlyFromCamera: !0,
            success: function(a) {
                console.log("scanCode success ", a), "scanCode:ok" == a.errMsg && (e.globalData.scanResult = r.decode(a.result), 
                wx.redirectTo({
                    url: "/pages/scanResult/scanResult?ensureEnter=".concat(e.globalData.squadEnter)
                }));
            },
            fail: function(a) {
                console.log("scanCode fail ", a);
            }
        });
    }, 2e3),
    onLoad: function(a) {
        console.log(a), this.setData({
            squadEnter: a.ensureEnter
        });
        var r = this, n = t.formatTime(new Date()).split(" ");
        this.setData({
            date: n[0],
            scanResult: e.globalData.scanResult
        });
        for (var o = this.data.scanResult.split(","), s = 0; s < o.length; s++) {
            o[s] = o[s].split(":");
            for (var i = 0; i < o[s].length; i++) "time" == o[s][i] && this.setData({
                scanTime: o[s][i + 1].split("T")[0].replace(/-/g, "/")
            }), "entryid" == o[s][i] && this.setData({
                entryid: o[s][i + 1]
            });
        }
        this.setData({
            info: o
        }), wx.login({
            success: function(a) {
                wx.request({
                    url: "https://sumou-server.tsunamitek.com/dengshan?code=".concat(a.code, "&cmd=squad.human.verify"),
                    method: "POST",
                    data: {
                        entryId: r.data.entryid,
                        entry: r.data.squadEnter,
                        date: r.data.date.replace(/\//g, "-")
                    },
                    success: function(a) {
                        if (console.log("squad.human.verify success ", a), r.setData({
                            verify: a.data.data
                        }), a.data.data.fullname) {
                            for (var e = a.data.data.fullname.split(""), t = 0; t < e.length; t++) 0 == t || t == e.length - 1 ? e[t] : e[t] = "*";
                            var n = e.join().replace(/,/g, "");
                            r.setData({
                                fullnameTrans: n
                            });
                        }
                        r.data.date == r.data.scanTime && r.data.squadEnter == r.data.verify.entry ? (console.log("日期校验", r.data.date == r.data.scanTime), 
                        console.log("登山口校验", r.data.squadEnter == r.data.verify.entry), console.log("scan PASS"), 
                        r.setData({
                            verifyDate: !0,
                            verifyEntry: !0,
                            pass: !0,
                            color: "#32CD32"
                        })) : (r.data.date != r.data.scanTime ? (console.log("日期校验", r.data.date == r.data.scanTime), 
                        r.setData({
                            verifyDate: !1
                        })) : (console.log("日期校验", r.data.date == r.data.scanTime), r.setData({
                            verifyDate: !0
                        })), r.data.squadEnter != r.data.verify.entry ? (console.log("登山口校验", r.data.squadEnter == r.data.verify.entry), 
                        console.log("登山口校验", r.data.squadEnter, r.data.verify.entry), r.setData({
                            verifyEntry: !1
                        })) : (console.log("登山口校验", r.data.squadEnter == r.data.verify.entry), r.setData({
                            verifyEntry: !0
                        })), console.log("scan FAILED"), r.setData({
                            pass: !1,
                            color: "#DC143C"
                        }));
                    },
                    fail: function(a) {
                        console.log("squad.human.verify fail", a);
                    }
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            path: "/pages/index/index",
            imageUrl: "/images/share.jpg",
            title: "行山易"
        };
    }
});