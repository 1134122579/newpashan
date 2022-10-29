var t, e = require("../../@babel/runtime/helpers/interopRequireDefault"), a = e(require("../../utils/rpx2px.js")), r = e(require("../../utils/mixins/pageMixin/myPageMixin")), o = getApp(), n = require("../../utils/util.js"), i = require("../../utils/weapp-qrcode.js"), d = (0, 
a.default)(500), c = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(t) {
        var e, a, r, o, n, i, d, s = "", l = 0;
        for (t = c._utf8_encode(t); l < t.length; ) o = (e = t.charCodeAt(l++)) >> 2, n = (3 & e) << 4 | (a = t.charCodeAt(l++)) >> 4, 
        i = (15 & a) << 2 | (r = t.charCodeAt(l++)) >> 6, d = 63 & r, isNaN(a) ? i = d = 64 : isNaN(r) && (d = 64), 
        s = s + this._keyStr.charAt(o) + this._keyStr.charAt(n) + this._keyStr.charAt(i) + this._keyStr.charAt(d);
        return s;
    },
    decode: function(t) {
        var e, a, r, o, n, i, d = "", s = 0;
        for (t = t.replace(/[^A-Za-z0-9\+\/\=]/g, ""); s < t.length; ) e = this._keyStr.indexOf(t.charAt(s++)) << 2 | (o = this._keyStr.indexOf(t.charAt(s++))) >> 4, 
        a = (15 & o) << 4 | (n = this._keyStr.indexOf(t.charAt(s++))) >> 2, r = (3 & n) << 6 | (i = this._keyStr.indexOf(t.charAt(s++))), 
        d += String.fromCharCode(e), 64 != n && (d += String.fromCharCode(a)), 64 != i && (d += String.fromCharCode(r));
        return d = c._utf8_decode(d);
    },
    _utf8_encode: function(t) {
        var e = "";
        t = t.replace(/\r\n/g, "\n");
        for (var a = 0; a < t.length; a++) {
            var r = t.charCodeAt(a);
            r < 128 ? e += String.fromCharCode(r) : r > 127 && r < 2048 ? (e += String.fromCharCode(r >> 6 | 192), 
            e += String.fromCharCode(63 & r | 128)) : (e += String.fromCharCode(r >> 12 | 224), 
            e += String.fromCharCode(r >> 6 & 63 | 128), e += String.fromCharCode(63 & r | 128));
        }
        return e;
    },
    _utf8_decode: function(t) {
        var e, a, r, o = "", n = 0;
        for (e = a = 0; n < t.length; ) (e = t.charCodeAt(n)) < 128 ? (o += String.fromCharCode(e), 
        n++) : e > 191 && e < 224 ? (a = t.charCodeAt(n + 1), o += String.fromCharCode((31 & e) << 6 | 63 & a), 
        n += 2) : (a = t.charCodeAt(n + 1), r = t.charCodeAt(n + 2), o += String.fromCharCode((15 & e) << 12 | (63 & a) << 6 | 63 & r), 
        n += 3);
        return o;
    }
};

Page({
    mixins: [ r.default ],
    data: {
        text: "",
        image: "",
        qrcodeWidth: d,
        imgsrc: "",
        colorDark: "#000000"
    },
    confirmHandler: function(t) {
        var e = t.detail.value;
        this.renderCode(e);
    },
    renderCode: function(e) {
        var a = this;
        console.log("make handler"), t.makeCode(e, function() {
            console.log("make"), t.exportImage(function(t) {
                console.log(t), a.setData({
                    imgsrc: t
                });
            });
        });
    },
    inputHandler: function(t) {
        var e = t.detail.value;
        this.setData({
            text: e
        });
    },
    tapHandler: function() {
        this.renderCode(this.data.text);
    },
    save: function() {
        console.log("save"), wx.showActionSheet({
            itemList: [ "保存图片" ],
            success: function(e) {
                console.log(e.tapIndex), 0 == e.tapIndex && t.exportImage(function(t) {
                    wx.saveImageToPhotosAlbum({
                        filePath: t
                    });
                });
            }
        });
    },
    onLoad: function(e) {
        var a = this, r = n.formatTime(new Date()).split(" ");
        this.setData({
            date: r[0],
            userinfo: o.globalData.userinfo
        }), console.log("entryid ", o.globalData.entryid), wx.login({
            success: function(e) {
                wx.request({
                    url: "https://sumou-server.tsunamitek.com/dengshan?code=".concat(e.code, "&cmd=entry.detail"),
                    method: "POST",
                    data: {
                        entryId: o.globalData.entryid
                    },
                    success: function(e) {
                        console.log("entry.detail success ", e);
                        var r = e.data.data.time.split("T")[0].split("-");
                        a.setData({
                            detail: e.data.data,
                            dateArr: r
                        });
                        var n = c.encode("entry:".concat(e.data.data.entry, ",exit:").concat(e.data.data.exit, ",time:").concat(e.data.data.time, ",entryid:").concat(o.globalData.entryid));
                        a.setData({
                            text: n
                        }), console.log(a.data.detail), a.data.detail.time.split("T")[0].replace(/-/g, "/") == a.data.date ? "100" == a.data.detail.condition ? a.setData({
                            colorDark: "#F9CC55"
                        }) : a.setData({
                            colorDark: "#32CD32"
                        }) : a.setData({
                            colorDark: "#DC143C"
                        }), (t = new i("canvas", {
                            usingIn: this,
                            image: "/images/bg.png",
                            width: d,
                            height: d,
                            colorDark: a.data.colorDark,
                            colorLight: "white",
                            correctLevel: i.CorrectLevel.H
                        })).makeCode(a.data.text, function() {
                            setTimeout(function() {
                                t.exportImage(function(t) {
                                    a.setData({
                                        imgsrc: t
                                    });
                                });
                            }, 1e3);
                        }), a.tapHandler();
                    }
                });
            }
        });
    },
    onReady: function() {
        var t = n.formatTime(new Date()).split(" ");
        this.setData({
            date: t[0]
        });
    },
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