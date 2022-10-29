Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var e = require("../../../@babel/runtime/helpers/typeof"), t = require("../../../@babel/runtime/helpers/createForOfIteratorHelper"), i = require("../../../@babel/runtime/helpers/classCallCheck"), n = require("../../../@babel/runtime/helpers/createClass"), o = require("./util"), a = 6291456, r = {}, l = function() {
    function e() {
        i(this, e), getApp().PAINTER_MAX_LRU_SPACE && (a = getApp().PAINTER_MAX_LRU_SPACE), 
        wx.getStorage({
            key: "savedFiles",
            success: function(e) {
                e.data && (r = e.data);
            }
        });
    }
    return n(e, [ {
        key: "download",
        value: function(e) {
            return new Promise(function(t, i) {
                if (e && o.isValidUrl(e)) {
                    var n = function(e) {
                        if (!r[e]) return;
                        return r[e].time = new Date().getTime(), wx.setStorage({
                            key: "savedFiles",
                            data: r
                        }), r[e];
                    }(e);
                    n ? wx.getSavedFileInfo({
                        filePath: n.path,
                        success: function(e) {
                            t(n.path);
                        },
                        fail: function(n) {
                            console.error("the file is broken, redownload it, ".concat(JSON.stringify(n))), 
                            s(e).then(function(e) {
                                t(e);
                            }, function() {
                                i();
                            });
                        }
                    }) : s(e).then(function(e) {
                        t(e);
                    }, function() {
                        i();
                    });
                } else t(e);
            });
        }
    } ]), e;
}();

function s(e) {
    return new Promise(function(i, n) {
        wx.downloadFile({
            url: e,
            success: function(o) {
                if (200 !== o.statusCode) return console.error("downloadFile ".concat(e, " failed res.statusCode is not 200")), 
                void n();
                var l = o.tempFilePath;
                wx.getFileInfo({
                    filePath: l,
                    success: function(n) {
                        var o, s = n.size;
                        (o = s, new Promise(function(e, i) {
                            var n = r.totalSize ? r.totalSize : 0;
                            if (o + n <= a) e(); else {
                                var l = [], s = JSON.parse(JSON.stringify(r));
                                delete s.totalSize;
                                var f, u = Object.keys(s).sort(function(e, t) {
                                    return s[e].time - s[t].time;
                                }), d = t(u);
                                try {
                                    for (d.s(); !(f = d.n()).done; ) {
                                        var v = f.value;
                                        if (n -= r[v].size, l.push(r[v].path), delete r[v], n + o < a) break;
                                    }
                                } catch (e) {
                                    d.e(e);
                                } finally {
                                    d.f();
                                }
                                r.totalSize = n, wx.setStorage({
                                    key: "savedFiles",
                                    data: r,
                                    success: function() {
                                        l.length > 0 && c(l), e();
                                    },
                                    fail: function(e) {
                                        console.error("doLru setStorage failed, ".concat(JSON.stringify(e))), i();
                                    }
                                });
                            }
                        })).then(function() {
                            (function(e, t, i) {
                                return new Promise(function(n, o) {
                                    wx.saveFile({
                                        tempFilePath: i,
                                        success: function(i) {
                                            var o = r.totalSize ? r.totalSize : 0;
                                            r[e] = {}, r[e].path = i.savedFilePath, r[e].time = new Date().getTime(), r[e].size = t, 
                                            r.totalSize = t + o, wx.setStorage({
                                                key: "savedFiles",
                                                data: r
                                            }), n(i.savedFilePath);
                                        },
                                        fail: function(t) {
                                            console.error("saveFile ".concat(e, " failed, then we delete all files, ").concat(JSON.stringify(t))), 
                                            n(i), wx.removeStorage({
                                                key: "savedFiles",
                                                success: function() {
                                                    wx.getSavedFileList({
                                                        success: function(e) {
                                                            c(e.fileList);
                                                        },
                                                        fail: function(e) {
                                                            console.error("getSavedFileList failed, ".concat(JSON.stringify(e)));
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                });
                            })(e, s, l).then(function(e) {
                                i(e);
                            });
                        }, function() {
                            i(l);
                        });
                    },
                    fail: function(e) {
                        console.error("getFileInfo ".concat(o.tempFilePath, " failed, ").concat(JSON.stringify(e))), 
                        i(o.tempFilePath);
                    }
                });
            },
            fail: function(e) {
                console.error("downloadFile failed, ".concat(JSON.stringify(e), " ")), n();
            }
        });
    });
}

function c(i) {
    var n, o = t(i);
    try {
        var a = function() {
            var t = n.value, i = t;
            "object" === e(t) && (i = t.filePath), wx.removeSavedFile({
                filePath: i,
                fail: function(e) {
                    console.error("removeSavedFile ".concat(t, " failed, ").concat(JSON.stringify(e)));
                }
            });
        };
        for (o.s(); !(n = o.n()).done; ) a();
    } catch (e) {
        o.e(e);
    } finally {
        o.f();
    }
}

exports.default = l;