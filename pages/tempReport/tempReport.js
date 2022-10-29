var t = require("../../@babel/runtime/helpers/toConsumableArray");

Page({
    data: {},
    gps: function() {
        var o = this;
        wx.startLocationUpdateBackground({
            success: function(e) {
                if ("startLocationUpdateBackground:ok" == e.errMsg) {
                    wx.getSetting({
                        success: function(t) {
                            1 == t.authSetting["scope.userLocationBackground"] && (o.setData({
                                startLocationUpdateBackground: "#999"
                            }), wx.setStorageSync("startLocationUpdateBackground", "true"));
                        }
                    });
                    var a = 0;
                    setInterval(function() {
                        a++;
                    }, 1e3), wx.onLocationChange(function(e) {
                        if (console.log(e), a >= 1) {
                            var n = e;
                            n.latitude = parseFloat(e.latitude).toFixed(6), n.longitude = parseFloat(e.longitude).toFixed(6), 
                            o.setData({
                                currentStatus: n,
                                altitude: e.altitude.toFixed(2)
                            });
                        }
                        if (a >= 60) {
                            "oU3jR4t_jCIXVuJ_a8De13TN0oi8" == o.data.openid || "oU3jR4uzCvHrt-7yGCBsJykcShkU" == o.data.openid || "hold1" == o.data.openid || "hold2" == o.data.openid ? (app.globalData.sio.emit("gpsEvent", parseFloat(e.latitude) - .073545 + "/" + (parseFloat(e.longitude) + .6418105)), 
                            console.log("e1,".concat(parseFloat(e.latitude) - .073545, ",").concat(parseFloat(e.longitude) + .6418105))) : app.globalData.sio.emit("gpsEvent", e.latitude + "/" + e.longitude);
                            var i = {
                                latitude: e.latitude,
                                longitude: e.longitude
                            }, s = wx.getStorageSync("gps");
                            o.data.gpsState && (s ? wx.setStorageSync("gps", [].concat(t(s), [ i ])) : wx.setStorageSync("gps", i)), 
                            a = 0;
                        }
                    });
                } else wx.showModal({
                    showCancel: !0,
                    content: "未开启后台位置获取，请点击右上角“…”，进入设置，选择位置消息，勾选按钮“使用小程序期间和离开小程序后”。",
                    success: function(e) {
                        console.log(e), wx.openSetting({
                            success: function(e) {
                                wx.getSetting({
                                    success: function(e) {
                                        if (console.log(e), 1 == e.authSetting["scope.userLocationBackground"]) {
                                            var a = 0;
                                            setInterval(function() {
                                                a++;
                                            }, 1e3), wx.onLocationChange(function(e) {
                                                if (console.log(e), a >= 1) {
                                                    var n = e;
                                                    n.latitude = parseFloat(e.latitude).toFixed(6), n.longitude = parseFloat(e.longitude).toFixed(6), 
                                                    o.setData({
                                                        currentStatus: n,
                                                        altitude: e.altitude.toFixed(2)
                                                    });
                                                }
                                                if (a >= 60) {
                                                    "oU3jR4t_jCIXVuJ_a8De13TN0oi8" == o.data.openid || "oU3jR4uzCvHrt-7yGCBsJykcShkU" == o.data.openid || "hold1" == o.data.openid || "hold2" == o.data.openid ? (app.globalData.sio.emit("gpsEvent", parseFloat(e.latitude) - .073545 + "/" + (parseFloat(e.longitude) + .6418105)), 
                                                    console.log("e2,".concat(parseFloat(e.latitude) - .073545, ",").concat(parseFloat(e.longitude) + .6418105))) : app.globalData.sio.emit("gpsEvent", e.latitude + "/" + e.longitude);
                                                    var i = {
                                                        latitude: e.latitude,
                                                        longitude: e.longitude
                                                    }, s = wx.getStorageSync("gps");
                                                    o.data.gpsState && (s ? wx.setStorageSync("gps", [].concat(t(s), [ i ])) : wx.setStorageSync("gps", i)), 
                                                    a = 0;
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        });
                    }
                });
            },
            fail: function() {
                wx.showModal({
                    showCancel: !0,
                    content: "未开启后台位置获取，请点击右上角“…”，进入设置，选择位置消息，勾选按钮“使用小程序期间和离开小程序后”。",
                    success: function(e) {
                        wx.openSetting({
                            success: function(e) {
                                wx.getSetting({
                                    success: function(e) {
                                        if (console.log(e), 1 == e.authSetting["scope.userLocationBackground"]) {
                                            wx.showToast({
                                                title: "授权成功",
                                                icon: "none"
                                            }), o.setData({
                                                startLocationUpdateBackground: "#999"
                                            });
                                            var a = 0;
                                            setInterval(function() {
                                                a++;
                                            }, 1e3), wx.onLocationChange(function(e) {
                                                if (console.log(e), a >= 1) {
                                                    var n = e;
                                                    n.latitude = parseFloat(e.latitude).toFixed(6), n.longitude = parseFloat(e.longitude).toFixed(6), 
                                                    o.setData({
                                                        currentStatus: n,
                                                        altitude: e.altitude.toFixed(2)
                                                    });
                                                }
                                                if (a >= 60) {
                                                    "oU3jR4t_jCIXVuJ_a8De13TN0oi8" == o.data.openid || "oU3jR4uzCvHrt-7yGCBsJykcShkU" == o.data.openid || "hold1" == o.data.openid || "hold2" == o.data.openid ? (app.globalData.sio.emit("gpsEvent", parseFloat(e.latitude) - .073545 + "/" + (parseFloat(e.longitude) + .6418105)), 
                                                    console.log("e3,".concat(parseFloat(e.latitude) - .073545, ",").concat(parseFloat(e.longitude) + .6418105))) : app.globalData.sio.emit("gpsEvent", e.latitude + "/" + e.longitude);
                                                    var i = {
                                                        latitude: e.latitude,
                                                        longitude: e.longitude
                                                    }, s = wx.getStorageSync("gps");
                                                    o.data.gpsState && (s ? wx.setStorageSync("gps", [].concat(t(s), [ i ])) : wx.setStorageSync("gps", i)), 
                                                    a = 0;
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    report: function() {
        var t = this;
        wx.login({
            success: function(o) {
                wx.request({
                    url: "https://sumou-server.tsunamitek.com/dengshan?code=".concat(o.code, "&cmd=report.commit"),
                    method: "POST",
                    data: {
                        lat: parseFloat(t.data.currentStatus.latitude).toFixed(6),
                        lng: parseFloat(t.data.currentStatus.longitude).toFixed(6),
                        entryId: "紧急上报"
                    },
                    success: function(t) {
                        console.log("report.commit success", t), wx.showToast({
                            title: "上报成功"
                        });
                    }
                });
            }
        });
    },
    onLoad: function(t) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});