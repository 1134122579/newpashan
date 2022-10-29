var a = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../../utils/mixins/pageMixin/myPageMixin")), t = getApp();

Page({
    mixins: [ a.default ],
    data: {
        id: "",
        resdata: [],
        file: [],
        src: [],
        cmsEp: "https://sumou-server.tsunamitek.com",
        path: {
            list: "/cmsQuery?",
            detail: "/cmsDetail?",
            thumbPath: "/cms/uploads/article"
        },
        port: ":3000",
        q: "q=",
        type: ""
    },
    preview: function() {
        wx.previewImage({
            urls: [ this.data.resdata.text1 ]
        });
    },
    onLoad: function(a) {
        this.setData({
            id: a.id
        });
        var e = this;
        wx.request({
            url: e.data.cmsEp + e.data.path.detail + e.data.q + e.data.id + "&appid=".concat(t.globalData.appId),
            method: "GET",
            success: function(a) {
                for (var i in console.log(a.data), e.setData({
                    resdata: a.data,
                    type: a.data.type
                }), e.data.resdata) {
                    var s = e.data.resdata;
                    -1 != i.indexOf("file") && "filename" != i && e.data.file.push(s[i]);
                }
                e.setData({
                    file: e.data.file
                });
                for (var d = 0; d < e.data.file.length; d++) e.data.src.push(e.data.cmsEp + e.data.port + e.data.path.thumbPath + "/".concat(t.globalData.appId) + "/" + e.data.resdata.id + "/" + e.data.file[d]);
                e.setData({
                    src: e.data.src
                });
                var n = a.data.title.split(";");
                e.setData({
                    titleArr: n
                });
            }
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
            path: "/pages/index/index",
            imageUrl: "/images/share.jpg",
            title: "行山易"
        };
    }
});