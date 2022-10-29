var n = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../../utils/mixins/pageMixin/myPageMixin"));

getApp();

Page({
    mixins: [ n.default ],
    data: {},
    onLoad: function(n) {
        this.mapCtx = wx.createMapContext("myMap"), this.mapCtx.moveToLocation();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});