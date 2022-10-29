var e = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../../utils/mixins/pageMixin/myPageMixin")), n = getApp();

require("../../utils/util.js");

Page({
    mixins: [ e.default ],
    data: {
        reportUrl: null,
        reportShow: !1
    },
    onLoad: function(e) {
        wx.showLoading({
            title: "加载中"
        });
        var i = e.params;
        this.setData({
            reportUrl: i
        }), this.setData({
            reportShow: !1
        }), wx.downloadFile({
            url: this.data.reportUrl,
            header: {
                sessionKey: n.globalData.sessionKey
            },
            success: function(e) {
                var n = e.tempFilePath;
                wx.openDocument({
                    filePath: n,
                    fileType: "pdf",
                    success: function(e) {
                        wx.hideLoading();
                    }
                }), setTimeout(function() {
                    wx.hideLoading();
                }, 2e3);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});