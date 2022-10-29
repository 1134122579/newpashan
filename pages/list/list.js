var t = require("../../@babel/runtime/helpers/interopRequireDefault"), e = require("../../@babel/runtime/helpers/objectSpread2"), a = t(require("../../utils/mixins/pageMixin/myPageMixin")), n = getApp(), i = require("../../utils/util.js");

Page({
    mixins: [ a.default ],
    data: {
        enter: [ "桔钓沙登山口", "七星湾登山口", "英管岭登山口", "上横岗后屋坪登山口", "鹿雁科考线登山口", "东涌穿越登山口", "巧巧窑鸡前登山口", "东涌码头涌口岭登山口", "西涌天文台登山口", "西贡村口登山口", "柚柑湾登山口", "俄公登山口", "半天云登山口" ]
    },
    // bindPickerEnter: function(t) {
    //     this.setData({
    //         enterIndex: t.detail.value,
    //         ensureEnter: this.data.enter[t.detail.value]
    //     });
    // },
    // confirmModify: i.throttle(function(t) {
    //     var e = this;
    //     this.data.ensureEnter ? this.data.dateN ? this.data.ensureEnter != this.data.entryData.entry || this.data.dateN != this.data.entryData.time.split("/").join("-") ? this.data.ensureEnter && wx.login({
    //         success: function(t) {
    //             wx.showLoading({
    //                 title: "修改中...",
    //                 icon: "none"
    //             }), wx.request({
    //                 url: "https://sumou-server.tsunamitek.com/dengshan?code=".concat(t.code, "&cmd=entry.modify"),
    //                 method: "POST",
    //                 data: {
    //                     entryId: e.data.entryData.id,
    //                     entry: e.data.ensureEnter,
    //                     exit: " ",
    //                     time: e.data.dateN,
    //                     purpose: e.data.entryData.purpose
    //                 },
    //                 success: function(t) {
    //                     console.log("entry.modify success", t), wx.hideLoading({
    //                         success: function(t) {}
    //                     }), e.setData({
    //                         modify: !1
    //                     }), e.init();
    //                 }
    //             });
    //         }
    //     }) : wx.showToast({
    //         title: "信息未发生改变",
    //         icon: "error"
    //     }) : wx.showToast({
    //         title: "请选择日期",
    //         icon: "error"
    //     }) : wx.showToast({
    //         title: "请选择登山口",
    //         icon: "error"
    //     });
    // }, 2e3),
    // cancelModify: i.throttle(function(t) {
    //     this.setData({
    //         modify: !1
    //     });
    // }, 2e3),
    // bindDateChange: function(t) {
    //     this.setData({
    //         dateN: t.detail.value
    //     });
    // },
    // modify: i.throttle(function(t) {
    //     var e = t.currentTarget.dataset.entrydata;
    //     this.setData({
    //         entryData: e,
    //         ensureEnter: null,
    //         dateN: null,
    //         modify: !0
    //     });
    // }, 2e3),
    // toQR: i.throttle(function(t) {
    //     console.log(t.currentTarget.dataset.condition), "-20" == t.currentTarget.dataset.condition && t.currentTarget.dataset.teamid == t.currentTarget.dataset.entryid ? wx.navigateTo({
    //         url: "/pages/detail/detail?myteamid=".concat(t.currentTarget.dataset.teamid)
    //     }) : "-10" == t.currentTarget.dataset.condition || "0" == t.currentTarget.dataset.condition ? "-10" == t.currentTarget.dataset.condition ? wx.navigateTo({
    //         url: "/pages/entryDetail/entryDetail?entryId=".concat(t.currentTarget.dataset.entryid, "&state=false")
    //     }) : wx.navigateTo({
    //         url: "/pages/entryDetail/entryDetail?entryId=".concat(t.currentTarget.dataset.entryid, "&state=true")
    //     }) : t.currentTarget.dataset.entryid && wx.navigateTo({
    //         url: "/pages/QR/QR"
    //     }), n.globalData.entryid = t.currentTarget.dataset.entryid;
    // }, 2e3),
    // init: function() {
    //     var t = this;
    //     wx.login({
    //         success: function(a) {
    //             wx.request({
    //                 url: "https://sumou-server.tsunamitek.com/dengshan?code=".concat(a.code, "&cmd=entry.list"),
    //                 success: function(a) {
    //                     console.log("list success ", a), t.setData({
    //                         list: a.data.list
    //                     });
    //                     for (var n = [], i = 0; i < t.data.list.length; i++) {
    //                         var r = t.data.list[i].time.split("T")[0], s = e(e({}, t.data.list[i]), {}, {
    //                             dateBack: r
    //                         });
    //                         n.push(s);
    //                     }
    //                     t.setData({
    //                         list: n
    //                     });
    //                 }
    //             });
    //         }
    //     });
    // },
    onLoad: function(t) {
        var e = this;
        wx.getSystemInfo({
            success: function(t) {
                console.log(t), e.setData({
                    screenHeight: 2 * t.screenHeight,
                    screenWidth: 2 * t.screenWidth
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        this.init();
    },
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