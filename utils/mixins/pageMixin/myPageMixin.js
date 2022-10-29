var a = getApp(), e = require("../../util.js");

module.exports = {
    data: {
        dataBack: !1,
        pageData: {},
        phone: "",
        userInfo: !1
    },
    onLoad: function(t) {
        var o = this;
        a.globalData.originPage && null != a.globalData.originPage || (a.globalData.originPage = e.getCurrentPageUrlWithArgs());
        for (var n = getCurrentPages()[0].route, s = [ "pages/index/index", "pages/login/login", "pages/article/article", "pages/registered/registered", "pages/detail/detail" ], g = [], i = 0; i < s.length; i++) {
            var r = n.indexOf(s[i]);
            g.push(r);
        }
        var l = g.indexOf(0);
        if (0 == l) ; else if (-1 == l && !a.globalData.navigated) {
            // wx.login({
            //     success: function(e) {
            //         console.log("wx request"), wx.request({
            //             url: "https://sumou-server.tsunamitek.com/dengshan?code=".concat(e.code, "&cmd=login.check"),
            //             timeout: "5000",
            //             success: function(e) {
            //                 wx.setStorageSync("authJudge", e.data), console.log("login.check success", e.data), 
            //                 console.log("1" == e.data["userinfo.has"] && "1" == e.data["phone.has"]), "1" == e.data["userinfo.has"] && "1" == e.data["phone.has"] || ("1" != e.data["userinfo.has"] || "1" != e.data["phone.has"] && !a.globalData.navigated) && (wx.navigateTo({
            //                     url: "/pages/login/login"
            //                 }), a.globalData.navigated = !0);
            //             },
            //             fail: function(e) {
            //                 console.log("storage"), "true" == wx.getStorageSync("userinfo") && wx.getStorageSync("phoneState"), 
            //                 "true" == wx.getStorageSync("userinfo") && "true" == wx.getStorageSync("phoneState") || wx.navigateTo({
            //                     url: "/pages/login/login"
            //                 }), a.globalData.navigated = !0;
            //             }
            //         });
            //     }
            // });
        }
        a.globalData.pageData ? this.setData({
            dataBack: !0,
            pageData: a.globalData.pageData
        }) : a.globalData.pageDataCallbackList.push(function(a) {
            o.setData({
                dataBack: !0,
                pageData: a
            }), o.setData({
                enter: a.entry,
                exit: a.exit,
                entryEN: a.entryEN
            });
        }), a.globalData.phone ? this.setData({
            phone: a.globalData.phone
        }) : a.globalData.phoneCallBackList.push(function(a) {
            o.setData({
                phone: a
            });
        }), wx.getSetting({
            success: function(a) {
                1 == a.authSetting["scope.userInfo"] && o.setData({
                    userInfo: !0
                });
            }
        });
    },
    getUserProfile: function(e) {
        var t = this;
        wx.getUserProfile({
            desc: "用于完善个人资料",
            success: function(o) {
                console.log("getUserProfile success ", o), "getUserProfile:ok" == o.errMsg && (t.setData({
                    userInfo: o.userInfo,
                    hasUserInfo: !0
                }), a.globalData.userinfo = o.userInfo, a.globalData.sio.emit("userInfo", o.userInfo), 
                e.currentTarget.dataset.page && wx.navigateTo({
                    url: "/pages/".concat(e.currentTarget.dataset.page, "/").concat(e.currentTarget.dataset.page)
                }));
            }
        });
    },
    getUserInfo: function(e) {
        "getUserInfo:ok" == e.detail.errMsg && (this.setData({
            userInfo: !0
        }), a.globalData.sio.emit("userInfo", e.detail.userInfo));
    },
    getPhone: function(e) {
        var t = this, o = this;
        "getPhoneNumber:ok" == e.detail.errMsg && wx.login({
            success: function(n) {
                a.globalData.sio.emit("phoneNumber", n.code + "/" + JSON.stringify(e.detail)), console.log("getphone success", n), 
                wx.setStorageSync("phoneState", "true"), o.setData({
                    phone: e.detail,
                    phonebg: "#999",
                    phoneHas: !0
                }), wx.showToast({
                    title: "授权成功",
                    icon: "none"
                }), a.globalData.phone = e.detail, 1 == t.data.userInfoHas && 1 == t.data.phoneHas && "true" == wx.getStorageSync("startLocationUpdateBackground") && wx.redirectTo({
                    url: "/".concat(a.globalData.originPage)
                });
            }
        });
    },
    onShow: function() {
        a.globalData.sio.emit("pageEvent", this.route + "/show");
    },
    onHide: function() {
        a.globalData.sio.emit("pageEvent", this.route + "/hide");
    },
    onUnload: function() {
        a.globalData.sio.emit("pageEvent", this.route + "/hide");
    }
};