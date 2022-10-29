var t = require("../../@babel/runtime/helpers/interopRequireDefault"), e = require("../../@babel/runtime/helpers/defineProperty"), i = t(require("../../utils/mixins/pageMixin/myPageMixin")), n = (getApp(), 
require("../../utils/util.js"), require("./routeKML.js"));

Page({
    mixins: [ i.default ],
    routeKML: n,
    data: {
        latitude: 22.510274072389358,
        longitude: 114.52162398098838,
        markers: [ {
            id: 1,
            latitude: 22.50734493127976,
            longitude: 114.52625205348444,
            name: "T.I.T 创意园"
        } ],
        covers: [ {
            latitude: 23.099994,
            longitude: 113.34452,
            iconPath: "/image/location.png"
        }, {
            latitude: 23.099994,
            longitude: 113.30452,
            iconPath: "/image/location.png"
        } ],
        route: [ {
            id: 1,
            name: "吉钓沙至七星湾"
        }, {
            id: 2,
            name: "东涌南文头天文台"
        } ]
    },
    change: function(t) {
        if (t.currentTarget.dataset.id) for (var i = 0; i < this.data.routeKML.length; i++) this.data.routeKML[i].id == t.currentTarget.dataset.id && this.setData(e({
            polyline: [ {
                points: this.data.routeKML[i].points,
                width: 1,
                dottedLine: !1,
                arrowLine: !0,
                borderWidth: 1,
                colorList: [ "#ff6471", "#999" ]
            } ],
            markers: [ {
                id: 1,
                latitude: 22.50734493127976,
                longitude: 114.52625205348444,
                name: "T.I.T 创意园"
            } ]
        }, "markers", [ {
            id: 1,
            latitude: this.data.routeKML[i].points[0].latitude,
            longitude: this.data.routeKML[i].points[0].longitude,
            callout: {
                content: this.data.route[t.currentTarget.dataset.id - 1].name,
                padding: 10,
                borderRadius: 10,
                borderColor: "#ff0000"
            }
        } ]));
    },
    onLoad: function(t) {
        var e = this;
        this.setData({
            routeKML: n.routeKML
        }), wx.getSystemInfo({
            success: function(t) {
                console.log("getSystemInfo success", t), e.setData({
                    windowHeight: 2 * t.windowHeight
                });
            }
        });
    },
    routeChanging: function() {
        this.setData({
            routeChanging: !0
        });
    },
    onReady: function() {
        this.mapCtx = wx.createMapContext("myMap"), this.mapCtx.moveToLocation();
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});