var t = require("../../@babel/runtime/helpers/interopRequireDefault"), a = require("../../@babel/runtime/helpers/toConsumableArray"), e = t(require("../../utils/mixins/pageMixin/myPageMixin")), o = (getApp(), 
require("../../utils/util.js")), n = require("../../utils/WSCoordinate");

Page({
    mixins: [ e.default ],
    data: {
        coordinate: !1,
        results: [],
        markers: [],
        picg: [ {
            path: "../../images/warning.png",
            prop: "用户上报位置"
        }, {
            path: "../../images/now.png",
            prop: "用户实时位置"
        }, {
            path: "../../images/green.png",
            prop: "队员位置（5分钟内）"
        } ],
        satellite: !1,
        picgHidden: !1,
        GPS: [ "WGS-84", "GCJ-02", "Baidu" ]
    },
    copy: function() {
        this.setData({
            copy: !0
        });
    },
    copyOrdinate: function() {
        var t = this;
        wx.setClipboardData({
            data: "".concat(t.data.aftype.latitude, ",").concat(t.data.aftype.longitude),
            success: function(a) {
                wx.showToast({
                    title: "复制成功",
                    success: function(a) {
                        t.setData({
                            copy: !1
                        });
                    }
                });
            }
        });
    },
    copyCancel: function() {
        this.setData({
            copy: !1
        });
    },
    satellite: function() {
        this.setData({
            satellite: !this.data.satellite
        });
    },
    picg: function() {
        this.setData({
            picgHidden: !this.data.picgHidden
        });
    },
    chooseCoordinate: function() {
        this.setData({
            coordinate: !0
        });
    },
    content: function(t) {
        this.setData({
            content: t.detail.value
        });
    },
    lat: function(t) {
        /^[0-9]+(.[0-9]{0,9})?$/.test(t.detail.value) ? this.setData({
            lat: t.detail.value
        }) : wx.showToast({
            title: "请输入正确数字",
            icon: "none"
        });
    },
    lng: function(t) {
        /^[0-9]+(.[0-9]{0,9})?$/.test(t.detail.value) ? this.setData({
            lng: t.detail.value
        }) : wx.showToast({
            title: "请输入正确数字",
            icon: "none"
        });
    },
    bindPickerGPS: function(t) {
        this.setData({
            GPSIndex: t.detail.value,
            ensureGPS: this.data.GPS[t.detail.value]
        });
    },
    bindPickerGPSType: function(t) {
        var a;
        this.setData({
            GPSIndex: t.detail.value,
            ensureGPS: this.data.GPS[t.detail.value]
        }), "WGS-84" == this.data.ensureGPS && (a = n.transformFromWGSToGCJ(parseFloat(this.data.eventData.latitude), parseFloat(this.data.eventData.longitude))), 
        "GCJ-02" == this.data.ensureGPS && (a = {
            latitude: parseFloat(this.data.eventData.latitude),
            longitude: parseFloat(this.data.eventData.longitude)
        }), "Baidu" == this.data.ensureGPS && (a = n.transformFromBaiduToGCJ(parseFloat(this.data.eventData.latitude), parseFloat(this.data.eventData.longitude))), 
        this.setData({
            aftype: a
        });
    },
    ordinateCancel: o.throttle(function(t) {
        this.setData({
            coordinate: !1
        });
    }, 2e3),
    toCurrentLocation: o.throttle(function(t) {
        this.mapCtx = wx.createMapContext("myMap"), this.mapCtx.moveToLocation();
    }, 2e3),
    toEventLocation: o.throttle(function(t) {
        this.mapCtx = wx.createMapContext("myMap"), this.mapCtx.moveToLocation({
            longitude: parseFloat(this.data.eventData.longitude),
            latitude: parseFloat(this.data.eventData.latitude)
        }), console.log("1");
    }, 2e3),
    ordinateConfirm: o.throttle(function(t) {
        var e;
        this.data.ensureGPS ? this.data.lat && this.data.lng ? this.data.content ? (console.log(this.data.ensureGPS), 
        "WGS-84" == this.data.ensureGPS && (e = n.transformFromWGSToGCJ(parseFloat(this.data.lat), parseFloat(this.data.lng))), 
        "GCJ-02" == this.data.ensureGPS && (e = {
            latitude: parseFloat(this.data.lat),
            longitude: parseFloat(this.data.lng)
        }), "Baidu" == this.data.ensureGPS && (e = n.transformFromBaiduToGCJ(parseFloat(this.data.lat), parseFloat(this.data.lng))), 
        console.log(e), this.setData({
            lat: parseFloat(e.latitude),
            lng: parseFloat(e.longitude)
        }), this.mapCtx = wx.createMapContext("myMap"), this.mapCtx.moveToLocation({
            longitude: parseFloat(this.data.lng),
            latitude: parseFloat(this.data.lat)
        }), this.setData({
            markers: [].concat(a(this.data.markers), [ {
                id: 99999,
                latitude: this.data.lat,
                longitude: this.data.lng,
                width: "15",
                height: "15",
                iconPath: "../../images/warning.png",
                callout: {
                    content: "".concat(this.data.content),
                    borderRadius: 10,
                    padding: 10,
                    display: "BYCLICK"
                },
                label: {
                    content: "".concat(this.data.lat, ",").concat(this.data.lng),
                    padding: 10,
                    borderRadius: 10,
                    bgColor: "#fff"
                }
            } ]),
            coordinate: !1
        })) : wx.showToast({
            title: "请输入字符",
            icon: "none"
        }) : wx.showToast({
            title: "请输入坐标",
            icon: "none"
        }) : wx.showToast({
            title: "请选择坐标系",
            icon: "none"
        });
    }, 2e3),
    refresh: function(t, e) {
        console.log("============================="), console.log(t, e);
        var o = this, n = t.data.data[e].openid, s = t.data.data[e].id, i = t.data.data[e].condition, c = t.data.data[e].fullname;
        wx.login({
            success: function(t) {
                wx.request({
                    url: "https://sumou-server.tsunamitek.com/dengshan?code=".concat(t.code, "&cmd=squad.position.byopenid"),
                    method: "POST",
                    data: {
                        openId: n
                    },
                    success: function(t) {
                        console.log("squad.position.byopenid success ", t);
                        var d = t.data.data.time.split("T")[0].split("Z")[1], l = {
                            id: "".concat(e) + 1 + 100001,
                            latitude: "".concat(t.data.data.lat),
                            longitude: "".concat(t.data.data.lng),
                            iconPath: "../../images/now.png",
                            height: 15,
                            width: 15,
                            callout: {
                                content: "".concat(s, ",").concat(i, ",").concat(c, "的最新位置,").concat(n, ",").concat(d),
                                borderRadius: 10,
                                padding: 10,
                                display: "BYCLICK"
                            },
                            label: {
                                content: "".concat(t.data.data.lat, ",").concat(t.data.data.lng),
                                padding: 10,
                                borderRadius: 10,
                                bgColor: "#fff"
                            }
                        };
                        o.setData({
                            markers: [].concat(a(o.data.markers), [ l ])
                        });
                    }
                });
            }
        });
    },
    refreshFUP: function(t, e, o, n, s) {
        var i = this;
        if (this.data.options) {
            var c = this.data.options;
            t = c.openId, n = c.fullname, o = c.id;
        }
        wx.login({
            success: function(c) {
                wx.request({
                    url: "https://sumou-server.tsunamitek.com/dengshan?code=".concat(c.code, "&cmd=squad.position.byopenid"),
                    method: "POST",
                    data: {
                        openId: t
                    },
                    success: function(c) {
                        console.log("squad.position.byopenid success ", c), i.setData({
                            markers: [].concat(a(i.data.markers), [ {
                                id: 19991,
                                latitude: "".concat(c.data.data.lat),
                                longitude: "".concat(c.data.data.lng),
                                iconPath: "../../images/now.png",
                                height: 15,
                                width: 15,
                                callout: {
                                    content: "".concat(o, ",").concat(e, ",").concat(n, "的最新位置,").concat(t, ",").concat(s),
                                    borderRadius: 10,
                                    padding: 10,
                                    display: "BYCLICK"
                                },
                                label: {
                                    content: "".concat(c.data.data.lat, ",").concat(c.data.data.lng),
                                    padding: 10,
                                    borderRadius: 10,
                                    bgColor: "#fff"
                                }
                            } ])
                        }), i.mapCtx = wx.createMapContext("myMap"), i.mapCtx.moveToLocation({
                            longitude: parseFloat(c.data.data.lng),
                            latitude: parseFloat(c.data.data.lat)
                        });
                    }
                });
            }
        });
    },
    onPointTap: function(t) {
        var e = this, o = this;
        if (this.data.isLeader) {
            if (console.log(t.detail.markerId), t.detail.markerId > "10000" && t.detail.markerId <= "19990") for (var n = function(n) {
                if (e.data.markers[n].id == "".concat(t.detail.markerId)) {
                    console.log(n), console.log(e.data.markers[n].callout.content.split(","));
                    var s = e.data.markers[n].callout.content.split(",")[0], i = e.data.markers[n].callout.content.split(",")[1], c = e.data.markers[n].callout.content.split(",")[3], d = e.data.markers[n].callout.content.split(",")[4], l = e.data.markers[n].callout.content.split(",")[2].split("的上报位置")[0];
                    if (e.refreshFUP(c, i, s, l, d), "1" == i) {
                        console.log(o.data.markers[n]);
                        var r = o.data.markers[n], u = r.callout.content.split(",");
                        u[1] = "1", u = u.join(","), r.iconPath = "../../images/warning.png", r.callout.content = u, 
                        o.data.markers.splice(n, 1), o.setData({
                            markers: [].concat(a(o.data.markers), [ r ])
                        });
                    }
                    "0" == i && wx.showModal({
                        title: "用户位置未分发",
                        content: "".concat(e.data.markers[n].callout.content),
                        confirmText: "分发",
                        cancelText: "取消",
                        success: function(t) {
                            t.confirm && wx.login({
                                success: function(t) {
                                    wx.request({
                                        url: "https://sumou-server.tsunamitek.com/dengshan?code=".concat(t.code, "&cmd=squad.report.approve"),
                                        method: "POST",
                                        data: {
                                            id: s
                                        },
                                        success: function(t) {
                                            console.log(o.data.markers[n]);
                                            var e = o.data.markers[n], s = e.callout.content.split(",");
                                            s[1] = "1", s = s.join(","), e.iconPath = "../../images/warning.png", e.callout.content = s, 
                                            o.data.markers.splice(n, 1), console.log("w", e), o.setData({
                                                markers: [].concat(a(o.data.markers), [ e ])
                                            }), console.log("squad.report.approve success", t);
                                        }
                                    });
                                }
                            }), t.cancel;
                        }
                    });
                }
            }, s = 0; s < this.data.markers.length; s++) n(s);
            "99999" == t.detail.markerId && wx.showModal({
                title: "创建事件",
                content: "该坐标为您手动生成，是否完成创建并上报下发？",
                success: function(t) {
                    t.confirm && wx.login({
                        success: function(t) {
                            wx.request({
                                url: "https://sumou-server.tsunamitek.com/dengshan?code=".concat(t.code, "&cmd=squad.report.create"),
                                method: "POST",
                                data: {
                                    lat: o.data.lat.toString(),
                                    lng: o.data.lng.toString(),
                                    comment: o.data.content.toString(),
                                    approved: "1"
                                },
                                success: function(t) {
                                    console.log(t);
                                    for (var a = o.data.markers, e = 0; e < a.length; e++) "99999" == a[e].id && (a[e].id = "100000");
                                    o.setData({
                                        markers: a
                                    }), wx.showToast({
                                        title: "上报创建成功",
                                        icon: "none"
                                    });
                                }
                            });
                        }
                    });
                }
            }), t.detail.markerId, t.detail.markerId;
        } else if (this.data.isSquad) {
            if (console.log(t.detail.markerId), t.detail.markerId > "10000" && t.detail.markerId <= "19990") {
                console.log(this.data.markers);
                for (var i = 0; i < this.data.markers.length; i++) if (this.data.markers[i].id == "".concat(t.detail.markerId)) {
                    console.log(i), console.log(this.data.markers[i].callout.content.split(","));
                    var c = this.data.markers[i].callout.content.split(",")[0], d = this.data.markers[i].callout.content.split(",")[1], l = this.data.markers[i].callout.content.split(",")[3], r = this.data.markers[i].callout.content.split(",")[4], u = this.data.markers[i].callout.content.split(",")[2].split("的上报位置")[0];
                    this.refreshFUP(l, d, c, u, r), console.log(o.data.markers[i]);
                    var p = o.data.markers[i], h = p.callout.content.split(",");
                    h[1] = "1", h = h.join(","), p.iconPath = "../../images/warning.png", p.callout.content = h, 
                    o.data.markers.splice(i, 1), o.setData({
                        markers: [].concat(a(o.data.markers), [ p ])
                    });
                }
            }
            t.detail.markerId, t.detail.markerId;
        }
    },
    onLoad: function(t) {
        var e, o, n = this;
        t.openId && (new RegExp("队长录入_").test(t.openId) ? (e = t.openId.split("队长录入_")[1], 
        this.setData({
            fullname: "队长"
        })) : (e = t.openId, this.setData({
            fullname: t.fullname
        })));
        t.lat && this.setData({
            eventData: {
                latitude: t.lat,
                longitude: t.lng
            }
        }), wx.login({
            success: function(a) {
                wx.request({
                    url: "https://sumou-server.tsunamitek.com/dengshan?code=".concat(a.code, "&cmd=squad.report.list"),
                    success: function(a) {
                        for (var s = 0; s < a.data.data.length; s++) if (a.data.data[s].id == t.id) {
                            console.log(a.data.data[s]);
                            var i = void 0;
                            i = "队长" == n.data.fullname ? 1e5 : 19990, n.setData({
                                latitude: t.lat,
                                longitude: t.lng,
                                markers: [ {
                                    id: i,
                                    latitude: t.lat,
                                    longitude: t.lng,
                                    iconPath: o,
                                    height: 15,
                                    width: 15,
                                    callout: {
                                        content: "".concat(t.id, ",").concat(t.condition, ",").concat(n.data.fullname, "的上报位置,").concat(e, ",").concat(a.data.data[s].createdAt.split("T")[1].split("Z")[0]),
                                        borderRadius: 10,
                                        padding: 10,
                                        display: "BYCLICK"
                                    },
                                    label: {
                                        content: "".concat(t.lat, ",").concat(t.lng),
                                        padding: 10,
                                        borderRadius: 10,
                                        bgColor: "#fff"
                                    }
                                } ]
                            });
                        }
                    }
                });
            }
        }), t != {} && this.setData({
            options: t
        }), "1" == t.condition && (o = "../../images/warning.png"), "0" == t.condition && (o = "../../images/warning.png"), 
        this.mapCtx = wx.createMapContext("myMap"), this.mapCtx.moveToLocation({
            longitude: parseFloat(t.lng),
            latitude: parseFloat(t.lat)
        }), wx.login({
            success: function(t) {
                wx.request({
                    url: "https://sumou-server.tsunamitek.com/dengshan?code=".concat(t.code, "&cmd=squad.position.list"),
                    success: function(t) {
                        console.log("squad.position.list success", t);
                        for (var e = t.data.data[5], o = 0; o < e.length; o++) "" != e[o].lat && "" != e[o].lng && n.setData({
                            markers: [].concat(a(n.data.markers), [ {
                                id: n.data.markers.length + o + 1,
                                latitude: e[o].lat,
                                longitude: e[o].lng,
                                iconPath: "../../images/green.png",
                                height: 15,
                                width: 15,
                                callout: {
                                    content: "".concat(e[o].fullname, "5分钟内的上报位置"),
                                    borderRadius: 10,
                                    padding: 10
                                }
                            } ])
                        });
                    }
                });
            }
        }), wx.login({
            success: function(t) {
                wx.request({
                    url: "https://sumou-server.tsunamitek.com/dengshan?code=".concat(t.code, "&cmd=squad.check"),
                    success: function(t) {
                        n.setData({
                            isLeader: t.data.isLeader,
                            isSquad: t.data.isSquad
                        });
                    }
                });
            }
        }), wx.getSystemInfo({
            success: function(t) {
                console.log("getSystemInfo success", t), n.setData({
                    windowHeight: 2 * t.windowHeight
                });
            }
        }), wx.login({
            success: function(t) {
                wx.request({
                    url: "https://sumou-server.tsunamitek.com/dengshan?code=".concat(t.code, "&cmd=squad.position.byopenid"),
                    data: {
                        openId: "队长录入_oU3jR4t_jCIXVuJ_a8De13TN0oi8"
                    },
                    success: function(t) {
                        console.log(t);
                    }
                });
            }
        }), wx.login({
            success: function(t) {
                wx.request({
                    url: "https://sumou-server.tsunamitek.com/dengshan?code=".concat(t.code, "&cmd=squad.position.byopenid"),
                    data: {
                        openId: "oU3jR4t_jCIXVuJ_a8De13TN0oi8"
                    },
                    success: function(t) {
                        console.log(t);
                    }
                });
            }
        }), wx.onCompassChange(function(t) {
            n.setData({
                rotate: 360 - t.direction.toFixed(0)
            });
        });
    },
    onReady: function() {
        this.mapCtx = wx.createMapContext("myMap");
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