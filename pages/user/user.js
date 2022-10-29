var t = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../../utils/mixins/pageMixin/myPageMixin")), e = getApp(), a = require("../../utils/util.js");
let App=getApp()
import storage from '../../utils/cache'
Page({
    mixins: [ t.default ],
    data: {
        userInfo:App.globalData.userIfo
    },
    toFire: a.throttle(function(t) {
        wx.navigateTo({
            url: "/pages/fire/fire"
        });
    }, 2e3),
    toPromise: a.throttle(function(t) {
        wx.navigateTo({
            url: "/pages/promise/promise"
        });
    }, 2e3),
    changeTestify: a.throttle(function(t) {
        wx.navigateTo({
            url: "/pages/testify/testify?state=reset"
        });
    }, 2e3),
    toList: a.throttle(function(t) {
        wx.navigateTo({
            url: "/pages/list/list"
        });
    }, 2e3),
    onLoad: function(t) {
        // this.setData({
        // userInfo:App.globalData.userIfo
        // })
        return
        if (console.log(e.globalData), this.setData({
            userInfoDataBase: e.globalData.userInfoDataBase
        }), e.globalData.extraInfo && this.setData({
            userinfo: e.globalData.userinfo,
            extraInfo: e.globalData.extraInfo
        }), this.data.extraInfo.fullname) {
            for (var a = this.data.extraInfo.fullname.split(""), i = 0; i < a.length; i++) 0 == i || i == a.length - 1 ? a[i] : a[i] = "*";
            var n = a.join().replace(/,/g, "");
            this.setData({
                fullnameTrans: n
            });
        }
        if (this.data.extraInfo.idcard) {
            for (var o = this.data.extraInfo.idcard.split(""), r = 0; r < o.length; r++) r >= 9 && r <= o.length - 3 ? o[r] = "*" : o[r];
            var s = o.join().replace(/,/g, "");
            this.setData({
                idcardTrans: s
            });
        }
    },
    goOut(){
        storage.removeToken()
        storage.removeUserInfo()
        App.globalData.userInfo=""
        wx.showToast({
          title: '退出成功！1秒后跳转首页',
          icon:'none'
        })
        setTimeout(() => {
            wx.redirectTo({
                url: '/pages/index/index',
              })
        }, 1500);
    },
    onReady: function() {
        console.log(App.globalData.userIfo)
       App.globalData.userInfo= storage.getUserInfo()
        this.setData({
            userInfo: storage.getUserInfo()
            })
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
});