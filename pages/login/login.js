var t = require("../../@babel/runtime/helpers/interopRequireDefault"), e = require("../../@babel/runtime/helpers/defineProperty"), o = require("../../@babel/runtime/helpers/toConsumableArray"), a = t(require("../../utils/mixins/pageMixin/myPageMixin")), n = getApp();

require("../../utils/util.js");
import Cache from '../../utils/cache'
import Api from '../../api/index'
let App=getApp()


Page({
    mixins: [ a.default ],
    data: {
        dataBack:true,
        userInfo:{},
    },
    noAuth: function() {
        wx.redirectTo({
            url: "/".concat(n.globalData.originPage)
        });
    },
    newgetUserProfile(e) {
        let that = this
        this.setData({
          disabled: true
        })
        wx.login({
          success: res => {
            console.log(res)
            this.setData({
              code: res.code
            })
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
          }
        })
        // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
        // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        wx.getUserProfile({
          desc: '用于完善资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
          lang: 'zh_CN',
          success: (res) => {
            console.log(res)
            let obj = res
            obj.code = that.data.code
            console.log(obj)
            wx.showLoading({
              title: '登陆中..',
            })
      
            Api.wx_mini_login(obj).then(res => {
              console.log(res)
              // 获取用户信息
              Cache.setToken(res.token)
              Api.getUserInfo().then(res => {
                Cache.setUserInfo(res)
                wx.hideLoading()
                that.setData({
                  userInfo: res
                })
                App.globalData.userInfo=res
                App.globalData.is_login=false
                wx.redirectTo({
                  url: '/pages/index/index',
                })
              })
            })
          },
          complete: () => {
            that.setData({
              disabled: false
            })
          }
        })
      },
    getUserProfile: function(t) {
        var e = this;
        wx.getUserProfile({
            desc: "用于完善个人资料",
            success: function(t) {
                console.log("getUserProfile success ", t), "getUserProfile:ok" == t.errMsg && (e.setData({
                    userInfo: t.userInfo,
                    userInfoHas: !0,
                    userinfobg: "#999"
                }), n.globalData.userinfo = t.userInfo, n.globalData.sio.emit("userInfo", t.userInfo), 
                wx.showToast({
                    title: "授权成功",
                    icon: "none"
                }), wx.redirectTo({
                    url: "../phone/phone"
                }));
            }
        });
    },
    locationUpdateBackground: function() {
        var t = this;
        wx.startLocationUpdateBackground({
            success: function(e) {
                if ("startLocationUpdateBackground:ok" == e.errMsg) {
                    wx.getSetting({
                        success: function(e) {
                            1 == e.authSetting["scope.userLocationBackground"] && (wx.showToast({
                                title: "授权成功",
                                icon: "none"
                            }), t.setData({
                                startLocationUpdateBackground: "#999"
                            }), wx.setStorageSync("startLocationUpdateBackground", "true"), "true" == wx.getStorageSync("userinfo") && "true" == wx.getStorageSync("phoneState") && wx.redirectTo({
                                url: "/".concat(n.globalData.originPage)
                            }));
                        }
                    });
                    var a = 0;
                    setInterval(function() {
                        a++;
                    }, 1e3), wx.onLocationChange(function(e) {
                        if (console.log(e), a % 15 == 0) {
                            var r = {
                                latitude: e.latitude,
                                longitude: e.longitude
                            }, s = wx.getStorageSync("gps");
                            t.data.gpsState && (s ? wx.setStorageSync("gps", [].concat(o(s), [ r ])) : wx.setStorageSync("gps", r));
                        }
                        a >= 60 && ("oU3jR4t_jCIXVuJ_a8De13TN0oi8" == t.data.openid || "oU3jR4uzCvHrt-7yGCBsJykcShkU" == t.data.openid || "hold1" == t.data.openid || "hold2" == t.data.openid ? (n.globalData.sio.emit("gpsEvent", parseFloat(e.latitude) - .073545 + "/" + (parseFloat(e.longitude) + .6418105)), 
                        console.log("i1,".concat(parseFloat(e.latitude) - .073545, ",").concat(parseFloat(e.longitude) + .6418105))) : n.globalData.sio.emit("gpsEvent", e.latitude + "/" + e.longitude), 
                        a = 0);
                    }), wx.setStorageSync("startLocationUpdateBackground", "true"), "true" == wx.getStorageSync("userinfo") && "true" == wx.getStorageSync("phoneState") && wx.redirectTo({
                        url: "/".concat(n.globalData.originPage)
                    });
                } else wx.showModal({
                    showCancel: !0,
                    content: "未开启后台位置获取，请点击右上角“…”，进入设置，选择位置消息，勾选按钮“使用小程序期间和离开小程序后”。",
                    success: function(e) {
                        console.log(e), wx.openSetting({
                            success: function(e) {
                                wx.getSetting({
                                    success: function(e) {
                                        console.log(e), 1 == e.authSetting["scope.userLocationBackground"] && (wx.showToast({
                                            title: "授权成功",
                                            icon: "none"
                                        }), t.setData({
                                            startLocationUpdateBackground: "#999"
                                        }), "true" == wx.getStorageSync("userinfo") && "true" == wx.getStorageSync("phoneState") && wx.redirectTo({
                                            url: "/".concat(n.globalData.originPage)
                                        }), wx.setStorageSync("startLocationUpdateBackground", "true"));
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
                                        console.log(e), 1 == e.authSetting["scope.userLocationBackground"] && (wx.showToast({
                                            title: "授权成功",
                                            icon: "none"
                                        }), t.setData({
                                            startLocationUpdateBackground: "#999"
                                        }), "true" == wx.getStorageSync("userinfo") && "true" == wx.getStorageSync("phoneState") && wx.redirectTo({
                                            url: "/".concat(n.globalData.originPage)
                                        }), wx.setStorageSync("startLocationUpdateBackground", "true"));
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }), wx.getSetting({
            success: function(e) {
                1 == e.authSetting["scope.userLocationBackground"] && (wx.showToast({
                    title: "授权成功",
                    icon: "none"
                }), t.setData({
                    startLocationUpdateBackground: "#999"
                }), wx.setStorageSync("startLocationUpdateBackground", "true"), "true" == wx.getStorageSync("userinfo") && "true" == wx.getStorageSync("phoneState") && wx.redirectTo({
                    url: "/".concat(n.globalData.originPage)
                }));
            }
        });
    },
    getUserInfo: function(t) {
        "getUserInfo:ok" == t.detail.errMsg && (wx.setStorageSync("userinfo", !0), n.globalData.userinfo = t.detail.userInfo, 
        n.globalData.sio.emit("userInfo", t.detail.userInfo), this.setData(e({
            userInfo: t.detail.userInfo,
            userInfoHas: !0
        }, "userInfo", !0)), wx.setStorageSync("userinfo", "true"), "true" == wx.getStorageSync("phoneState") && wx.redirectTo({
            url: "/".concat(n.globalData.originPage)
        }), wx.showToast({
            title: "授权成功",
            icon: "none"
        }));
    },
    onLoad: function(t) {
        var e = this;
        wx.getStorageSync("authJudge");
        "true" != wx.getStorageSync("startLocationUpdateBackground") ? this.setData({
            locationUpdateBackgroundHas: !1
        }) : this.setData({
            locationUpdateBackgroundHas: !0
        })
        // , 
        // wx.login({
        //     success: function(t) {
        //         wx.request({
        //             url: "https://sumou-server.tsunamitek.com/dengshan?code=".concat(t.code, "&cmd=login.check"),
        //             success: function(t) {
        //                 "1" == t.data["userinfo.has"] && (e.setData({
        //                     userInfoHas: !0
        //                 }), wx.redirectTo({
        //                     url: "../phone/phone"
        //                 })), "1" == t.data["phone.has"] && e.setData({
        //                     phoneHas: !0
        //                 });
        //             }
        //         });
        //     }
        // }), wx.getUserProfile && this.setData({
        //     canIUseGetUserProfile: !0
        // });
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