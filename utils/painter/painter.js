var t = require("../../@babel/runtime/helpers/interopRequireDefault"), e = require("../../@babel/runtime/helpers/createForOfIteratorHelper"), n = t(require("./lib/pen")), i = t(require("./lib/downloader")), r = require("./lib/util"), a = new i.default();

function o(t, e) {
    String.prototype.toPx = function(n) {
        var i = (n ? /^-?[0-9]+([.]{1}[0-9]+){0,1}(rpx|px)$/g : /^[0-9]+([.]{1}[0-9]+){0,1}(rpx|px)$/g).exec(this);
        if (!this || !i) return console.error("The size: ".concat(this, " is illegal")), 
        0;
        var r = i[2], a = parseFloat(this), o = 0;
        return "rpx" === r ? o = Math.round(a * t * (e || 1)) : "px" === r && (o = Math.round(a * (e || 1))), 
        o;
    };
}

Component({
    canvasWidthInPx: 0,
    canvasHeightInPx: 0,
    paintCount: 0,
    properties: {
        customStyle: {
            type: String
        },
        palette: {
            type: Object,
            observer: function(t, e) {
                this.isNeedRefresh(t, e) && (this.paintCount = 0, this.startPaint());
            }
        },
        widthPixels: {
            type: Number,
            value: 0
        },
        dirty: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        picURL: "",
        showCanvas: !0,
        painterStyle: ""
    },
    methods: {
        isEmpty: function(t) {
            for (var e in t) return !1;
            return !0;
        },
        isNeedRefresh: function(t, e) {
            return !(!t || this.isEmpty(t) || this.data.dirty && r.equal(t, e));
        },
        startPaint: function() {
            var t = this;
            if (!this.isEmpty(this.properties.palette)) {
                if (!getApp().systemInfo || !getApp().systemInfo.screenWidth) try {
                    getApp().systemInfo = wx.getSystemInfoSync();
                } catch (t) {
                    var e = "Painter get system info failed, ".concat(JSON.stringify(t));
                    return that.triggerEvent("imgErr", {
                        error: e
                    }), void console.error(e);
                }
                var i = getApp().systemInfo.screenWidth / 750;
                o(i, 1), this.downloadImages().then(function(e) {
                    var r = e.width, a = e.height;
                    if (r && a) {
                        t.canvasWidthInPx = r.toPx(), t.properties.widthPixels && (o(i, t.properties.widthPixels / t.canvasWidthInPx), 
                        t.canvasWidthInPx = t.properties.widthPixels), t.canvasHeightInPx = a.toPx(), t.setData({
                            painterStyle: "width:".concat(t.canvasWidthInPx, "px;height:").concat(t.canvasHeightInPx, "px;")
                        });
                        var s = wx.createCanvasContext("k-canvas", t);
                        new n.default(s, e).paint(function() {
                            t.saveImgToLocal();
                        });
                    } else console.error("You should set width and height correctly for painter, width: ".concat(r, ", height: ").concat(a));
                });
            }
        },
        downloadImages: function() {
            var t = this;
            return new Promise(function(n, i) {
                var r = 0, o = 0, s = JSON.parse(JSON.stringify(t.properties.palette));
                if (s.background && (r++, a.download(s.background).then(function(t) {
                    s.background = t, o++, r === o && n(s);
                }, function() {
                    o++, r === o && n(s);
                })), s.views) {
                    var c, h = e(s.views);
                    try {
                        var u = function() {
                            var t = c.value;
                            t && "image" === t.type && t.url && (r++, a.download(t.url).then(function(e) {
                                t.url = e, wx.getImageInfo({
                                    src: t.url,
                                    success: function(e) {
                                        t.sWidth = e.width, t.sHeight = e.height;
                                    },
                                    fail: function(e) {
                                        t.url = "", console.error("getImageInfo ".concat(t.url, " failed, ").concat(JSON.stringify(e)));
                                    },
                                    complete: function() {
                                        o++, r === o && n(s);
                                    }
                                });
                            }, function() {
                                o++, r === o && n(s);
                            }));
                        };
                        for (h.s(); !(c = h.n()).done; ) u();
                    } catch (t) {
                        h.e(t);
                    } finally {
                        h.f();
                    }
                }
                0 === r && n(s);
            });
        },
        saveImgToLocal: function() {
            var t = this, e = this;
            setTimeout(function() {
                wx.canvasToTempFilePath({
                    canvasId: "k-canvas",
                    success: function(t) {
                        e.getImageInfo(t.tempFilePath);
                    },
                    fail: function(t) {
                        console.error("canvasToTempFilePath failed, ".concat(JSON.stringify(t))), e.triggerEvent("imgErr", {
                            error: t
                        });
                    }
                }, t);
            }, 300);
        },
        getImageInfo: function(t) {
            var e = this;
            wx.getImageInfo({
                src: t,
                success: function(n) {
                    if (e.paintCount > 5) {
                        var i = "The result is always fault, even we tried ".concat(5, " times");
                        return console.error(i), void e.triggerEvent("imgErr", {
                            error: i
                        });
                    }
                    Math.abs((n.width * e.canvasHeightInPx - e.canvasWidthInPx * n.height) / (n.height * e.canvasHeightInPx)) < .01 ? e.triggerEvent("imgOK", {
                        path: t
                    }) : e.startPaint(), e.paintCount++;
                },
                fail: function(t) {
                    console.error("getImageInfo failed, ".concat(JSON.stringify(t))), e.triggerEvent("imgErr", {
                        error: t
                    });
                }
            });
        }
    }
});