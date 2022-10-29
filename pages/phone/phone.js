var e = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../../utils/mixins/pageMixin/myPageMixin")), n = getApp(), t = require("../../utils/util.js");
import API from '../../api/index'

Page({
    mixins: [ e.default ],
    data: {
        clear: !0
    },
    toIndex: t.throttle(function(e) {
        wx.redirectTo({
            url: "/pages/index/index"
        });
    }, 2e3),
    clear: function() {
        this.setData({
            clear: !1
        });
    },
    getPhone: function(e) {
        wx.redirectTo({
            url: "../backgroundLocation/backgroundLocation"
        });
        return
        var t = this;
        "getPhoneNumber:ok" == e.detail.errMsg && wx.login({
            success: function(o) {
                console.log(o)
                let code =o.code
                // API.encrypt_info()
               n.globalData.sio.emit("phoneNumber", o.code + "/" + JSON.stringify(e.detail)), console.log("getphone success", o), 
                wx.setStorageSync("phoneState", "true"), t.setData({
                    phone: e.detail,
                    phonebg: "#999",
                    phoneHas: !0
                }), wx.showToast({
                    title: "授权成功",
                    icon: "none"
                }), n.globalData.phone = e.detail, wx.redirectTo({
                    url: "../backgroundLocation/backgroundLocation"
                });
            }
        });
    },
    onLoad: function(e) {
        n.globalData.spot = e.spot;
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