var e = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../../utils/mixins/pageMixin/myPageMixin")), t = getApp(), s = require("../../utils/util.js");

Page({
    mixins: [ e.default ],
    data: {
        team: [ "南澳消防森林中队" ],
        teamIndex: 0,
        ensureTeam: void 0
    },
    getUserProfile: function(e) {
        var s = this;
        wx.getUserProfile({
            desc: "用于完善个人资料",
            success: function(e) {
                console.log("getUserProfile success ", e), "getUserProfile:ok" == e.errMsg && (s.setData({
                    userInfo: e.userInfo,
                    hasUserInfo: !0
                }), t.globalData.userinfo = e.userInfo, t.globalData.sio.emit("userInfo", e.userInfo));
            }
        });
    },
    getUserInfo: function(e) {
        "getUserInfo:ok" == e.detail.errMsg && (this.setData({
            userInfo: !0
        }), t.globalData.userinfo = e.detail.userInfo, t.globalData.sio.emit("userInfo", e.detail.userInfo));
    },
    name: function(e) {
        /^((?![\u3000-\u303F])[\u2E80-\uFE4F]|\·)*(?![\u3000-\u303F])[\u2E80-\uFE4F](\·)*$/.test(e.detail.value) ? this.setData({
            name: e.detail.value
        }) : wx.showModal({
            title: "校验错误",
            content: "只允许输入汉字,请重新输入"
        });
    },
    bindPickerTeam: function(e) {
        this.setData({
            teamIndex: e.detail.value,
            ensureTeam: this.data.team[e.detail.value]
        });
    },
    confirm: s.throttle(function(e) {
        var t = this;
        this.data.name && this.data.ensureTeam ? wx.login({
            success: function(e) {
                wx.request({
                    url: "https://sumou-server.tsunamitek.com/dengshan?code=".concat(e.code, "&cmd=squad.reg"),
                    method: "POST",
                    data: {
                        fullname: t.data.name,
                        squad: t.data.ensureTeam
                    },
                    success: function(e) {
                        console.log("squad.reg success ", e), wx.redirectTo({
                            url: "/pages/index/index?role=teammate"
                        });
                    },
                    fail: function(e) {
                        console.log("squad.reg fail", e);
                    }
                });
            }
        }) : this.data.hasUserInfo ? this.data.phone ? this.data.name ? this.data.ensureTeam || wx.showToast({
            icon: "none",
            title: "请选择所属中队"
        }) : wx.showToast({
            icon: "none",
            title: "请填写姓名"
        }) : wx.showToast({
            icon: "none",
            title: "请授权电话号码"
        }) : wx.showToast({
            icon: "none",
            title: "请授权微信信息"
        });
    }, 2e3),
    onLoad: function(e) {
        console.log(e), 1 == e.squadType && this.setData({
            squadType: 1,
            ensureTeam: "南澳中队登山口队员"
        }), wx.login({
            success: function(e) {
                wx.request({
                    url: "https://sumou-server.tsunamitek.com/dengshan?code=".concat(e.code, "&cmd=squad.check"),
                    success: function(e) {
                        console.log(e), 1 == e.data.isSquad && wx.showModal({
                            title: "已注册",
                            content: "点击确定跳转主页后选择队员端进入。",
                            showCancel: !1,
                            success: function(e) {
                                e.confirm && wx.redirectTo({
                                    url: "/pages/index/index?role=teammate"
                                });
                            }
                        });
                    }
                });
            }
        }), wx.getUserProfile && this.setData({
            canIUseGetUserProfile: !0
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
            path: "/pages/registered/registered",
            imageUrl: "/images/share.jpg",
            title: "行山易"
        };
    }
});