var t, e = require("../../@babel/runtime/helpers/interopRequireDefault"),
    a = require("../../@babel/runtime/helpers/toConsumableArray"),
    o = e(require("../../utils/rpx2px.js")),
    n = e(require("../../utils/mixins/pageMixin/myPageMixin")),
    s = getApp(),
    i = require("../../utils/util.js"),
    r = require("../../utils/weapp-qrcode.js"),
    c = (require("../../utils/wxml2canvas"),
        (0, o.default)(500)),
    d = {
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        encode: function (t) {
            var e, a, o, n, s, i, r, c = "",
                l = 0;
            for (t = d._utf8_encode(t); l < t.length;) n = (e = t.charCodeAt(l++)) >> 2, s = (3 & e) << 4 | (a = t.charCodeAt(l++)) >> 4,
                i = (15 & a) << 2 | (o = t.charCodeAt(l++)) >> 6, r = 63 & o, isNaN(a) ? i = r = 64 : isNaN(o) && (r = 64),
                c = c + this._keyStr.charAt(n) + this._keyStr.charAt(s) + this._keyStr.charAt(i) + this._keyStr.charAt(r);
            return c;
        },
        decode: function (t) {
            var e, a, o, n, s, i, r = "",
                c = 0;
            for (t = t.replace(/[^A-Za-z0-9\+\/\=]/g, ""); c < t.length;) e = this._keyStr.indexOf(t.charAt(c++)) << 2 | (n = this._keyStr.indexOf(t.charAt(c++))) >> 4,
                a = (15 & n) << 4 | (s = this._keyStr.indexOf(t.charAt(c++))) >> 2, o = (3 & s) << 6 | (i = this._keyStr.indexOf(t.charAt(c++))),
                r += String.fromCharCode(e), 64 != s && (r += String.fromCharCode(a)), 64 != i && (r += String.fromCharCode(o));
            return r = d._utf8_decode(r);
        },
        _utf8_encode: function (t) {
            var e = "";
            t = t.replace(/\r\n/g, "\n");
            for (var a = 0; a < t.length; a++) {
                var o = t.charCodeAt(a);
                o < 128 ? e += String.fromCharCode(o) : o > 127 && o < 2048 ? (e += String.fromCharCode(o >> 6 | 192),
                    e += String.fromCharCode(63 & o | 128)) : (e += String.fromCharCode(o >> 12 | 224),
                    e += String.fromCharCode(o >> 6 & 63 | 128), e += String.fromCharCode(63 & o | 128));
            }
            return e;
        },
        _utf8_decode: function (t) {
            var e, a, o, n = "",
                s = 0;
            for (e = a = 0; s < t.length;)(e = t.charCodeAt(s)) < 128 ? (n += String.fromCharCode(e),
                s++) : e > 191 && e < 224 ? (a = t.charCodeAt(s + 1), n += String.fromCharCode((31 & e) << 6 | 63 & a),
                s += 2) : (a = t.charCodeAt(s + 1), o = t.charCodeAt(s + 2), n += String.fromCharCode((15 & e) << 12 | (63 & a) << 6 | 63 & o),
                s += 3);
            return n;
        }
    };



const W = wx.getSystemInfoSync().windowWidth;
const rate = 750.0 / W;
// 300rpx 在6s上为 150px
const qrcode_w = 300 / rate;
let JStimeDSQ = ''
let UPDKDD = ""
let lineTime = ''
let App = getApp()
import storage from "../../utils/cache"
import Api from '../../api/index'
import {
    parseTime
} from "../../utils/index.js"
Page({
    mixins: [n.default],
    data: {
        markerList: [],
        name: '',
        jystatusDWobj:{},
        jy_location: [],
        Jyarray: [],
        jyObj: '',
        userInfo: App.globalData.userInfo,
        mask: true,
        jy_loaction: {},
        statusPoup: true,
        createCodeImg: "",
        qrcodeWidth: qrcode_w,
        latitude: 22.510274072389358,
        longitude: 114.52162398098838,
        markers: [],
        statusArr: [],
        statusDWobj: {},
        newpolyline: [{
            points: [],
            width: 3,
            dottedLine: !1,
            arrowLine: !0,
            color: "#4E63A"
        }],
        beian_id: '',
        currentStatus: '',
        altitude: '',
        JStime: "00:00:00",
        gpsState: !0,
        timecostItv: !1,
        foldState: !0,
        satellite: !1,
        startLocstartationUpdateBackground: ''
    },
    bindchange(event) {
        let index = event.detail.value
        let {
            Jyarray
        } = this.data
        this.setData({
            jyObj: Jyarray[index].name,
            beian_id: Jyarray[index].id,
            jy_loaction: Jyarray[index],
            jystatusDWobj:Jyarray[index]
        })
    },
    getSosList() {
        let {
          page,
          Jyarray
        } = this.data
          Api.getSosList({
            page
          }).then(res => {
           res=res.filter(item=>item.status!=2)
            this.setData({
              isNulist: res.length <= 0 ? true : false
            })
            if (page == 1) {
              this.setData({
                Jyarray: res
              })
            } else {
              this.setData({
                Jyarray: Jyarray.concat(res)
              })
            }
          })
      },
    // 设置路线
    // setPolyline() {
    //     clearInterval(lineTime)
    //     let that = this
    //     lineTime = setInterval(() => {
    //         let {
    //             statusDWobj,
    //             newpolyline
    //         } = that.data
    //         let polylineone = {
    //             points: newpolyline['points'].concat([statusDWobj]),
    //             width: 3,
    //             dottedLine: !1,
    //             arrowLine: !0,
    //             color: "#4E63A9"
    //         }
    //         console.log(polylineone, "polylineone")
    //         that.setData({
    //             newpolyline: polylineone
    //         })
    //     }, 30000);


    // },
    fold: i.throttle(function (t) {
        this.setData({
            foldState: !1
        });
    }, 2e3),
    unfold: i.throttle(function (t) {
        this.setData({
            foldState: !0
        });
    }, 2e3),
    onSos() {
        let {
            beian_id
        } = this.data

        wx.showModal({
            title: '救援完成',
            content: '已完成该项救援行动',
            success: res => {
                console.log(res)
                if (res.confirm) {
                    wx.showLoading({
                        title: '提交中...',
                    })
                    Api.endSosLog({
                        id: beian_id
                    }).then(res => {
                        wx.hideLoading()
                        clearInterval(UPDKDD)
                        wx.showToast({
                          title: '已完成救援',
                          icon:'none',
                          mack:true
                        })
                        wx.navigateBack({
                            delta: 1,
                        })
                    })
                } else {
                    console.log('取消')
                }
            },
            complete: res => {

            }
        })

    },
    showNum(num) {
        if (num < 10) {
            return '0' + num
        }
        return num
    },
    time() {
        let getoldDate = wx.getStorageSync('statTime')
        if (getoldDate) {
            let That = this
            clearInterval(JStimeDSQ)
            JStimeDSQ = setInterval(() => {
                let newDate = +new Date()
                let time = parseInt((newDate - getoldDate) / 1000)
                let s = 0,
                    i = 0,
                    h = 0
                s = That.showNum(time % 60)
                i = That.showNum(parseInt(time / 60) % 60)
                h = That.showNum(parseInt(time / 60 / 60))
                That.setData({
                    // JStime: parseTime(time, "{h}:{i}:{s}")
                    JStime: `${h}:${i}:${s}`
                })
            }, 1000);
            That.upDK()
            // That.setPolyline()
        } else {
            this.setData({
                mask: true
            })
        }
    },
    // 上传打卡
    upDK() {
        let {
            statusDWobj,
            userInfo
        } = this.data
        clearInterval(UPDKDD)
        let JYZB= wx.getStorageSync("JYZB")
        console.log(JYZB)
        Api.subPosition({
            lat: statusDWobj.latitude,
            lng: statusDWobj.longitude,
            beian_id: JYZB["id"]
        }).then(res => {
            wx.showToast({
                title: '已开始救援',
                icon: 'none'
            })
        })
        UPDKDD = setInterval(() => {
            Api.subPosition({
                lat: statusDWobj.latitude,
                lng: statusDWobj.longitude,
                beian_id: JYZB["id"]
            }).then(res => {
                console.log("上传当前位置成功成功", res)
            })
        }, 300000);
    },
    // 获取救援路线
    getPoyline() {
        let {
            beian_id
        } = this.data
        Api.getSosRoute({
            beian_id
        }).then(res => {
            let list = res.map(item => {
                return {
                    latitude: item.lat,
                    longitude: item.lng,
                }
            })
            let jy_location = list[list.length - 1]
            this.setData({
                jy_location,
                newpolyline: [{
                    points: list,
                    width: 5,
                    dottedLine: false,
                    arrowLine: true,
                    color: "#ff0000"
                }]
            })
        })
    },
    cancel: i.throttle(function (t) {
        var e = this;
        let {
            bean_info
        } = this.data.userInfo
        Api.cacheDsLog({
            bean_info
        }).then(res => {
            wx.showToast({
                title: '取消备案',
                icon: 'none',
                mask: true
            })
            setTimeout(() => {
                wx.redirectTo({
                    url: '/pages/index/index',
                })
            }, 1500);
        })

    }, 2e3),
    start: i.throttle(function (t) {
        let newDate = +new Date()
        wx.setStorageSync("state", !0);
        let {
            statusDWobj,
            userInfo
        } = this.data
        var e = this;
        let JYZB= wx.getStorageSync("JYZB")
        Api.startDsLog().then(res => {
            Api.subPosition({
                lat: statusDWobj.latitude,
                lng: statusDWobj.longitude,
                beian_id: JYZB["id"]
            }).then(res => {
                clearInterval(JStimeDSQ)
                // e.setPolyline()
                wx.setStorageSync('statTime', newDate)
                e.time()
                wx.showToast({
                    title: '开始登山',
                    icon: "none"
                })
                e.setData({
                    mask: !1,
                    timecostItv: !0
                })
            })
        })
    }, 2e3),
    onjishu() {
        let {
            userInfo
        } = this.data
        wx.showLoading({
            title: '上传中',
        })
        Api.endDsLog().then(res => {
            Api.endDsLog(userInfo.bean_info).then(res => {
                wx.hideLoading()
                wx.showToast({
                    title: '结束登山',
                    mask: true
                })
                setTimeout(() => {
                    wx.redirectTo({
                        url: '/pages/index/index',
                    })
                }, 1500);
                clearInterval(JStimeDSQ)
                clearInterval(UPDKDD)
                clearInterval(lineTime)
                wx.removeStorageSync('statTime')
                wx.removeStorageSync('state')
                wx.offLocationChange((data) => {
                    console.log(data, "结束定位")
                })
            })
        })

    },
    onstartJy() {
        console.log("开始救援", 1234556789)
    },

    lookCode() {
        console.log(1)
        this.setData({
            mask: true,
            statusPoup: false
        })
    },

    // 获取救援队
    async getTeamPosition() {
        let {
            markerList
        } = this.data
        let res = await Api.getTeamPosition()
        res = res.map(item => {
            return {
                latitude: item.lat,
                longitude: item.lng,
                title: "救援队员",
                // iconPath:item.headimgurl,
                iconPath:"/images/sos1.png",
                
                width:40,
                height:40,
                // callout: {
                //     borderRadius:50,
                //     color:"#57BE6A"
                // }
            }
        })
        let JYZB = wx.getStorageSync('JYZB')
        JYZB["title"] = "被救援者"
        // JYZB["iconPath"] =JYZB['headimgurl']
        JYZB["iconPath"] ="/images/sos.png"
        JYZB["width"] = 40
        JYZB["height"] = 40
        // JYZB["label"] = {
        //     // content:"被救援者",  
        //     color:'#ffffff',
        //     bgColor:"#ff0000",
        //     anchorY:JYZB.longitude,
        //     anchorX:JYZB.latitude,
        // }
        
        // JYZB["callout"] = {
        //     borderRadius:50,
        //     color:"#57BE6A"
        // }
        
        this.setData({
            markerList: res.concat([JYZB]),
            jystatusDWobj:JYZB
        })
    },
    onLoad: function (e) {
        console.log(e, 123)
        this.setData({
            beian_id: e.beian_id,
            name: e.name
        })
        let that = this
        var o = this;
        wx.getSystemInfo({
            success: function (t) {
                console.log("getSystemInfo success", t), o.setData({
                    windowHeight: 2 * t.windowHeight,
                    windowWidth: 2 * t.windowWidth
                });
            }
        });
        wx.startLocationUpdateBackground({
            success: function (t) {
                if ("startLocationUpdateBackground:ok" == t.errMsg) {
                    wx.getSetting({
                        success: function (t) {
                            1 == t.authSetting["scope.userLocationBackground"] && (o.setData({
                                startLocationUpdateBackground: "#999"
                            }), wx.setStorageSync("startLocationUpdateBackground", "true"));
                        }
                    });
                    var e = 0;
                    setInterval(function () {
                        e++;
                    }, 1e3), wx.onLocationChange(function (t) {
                        var n = t;
                        n.latitude = parseFloat(t.latitude).toFixed(6), n.longitude = parseFloat(t.longitude).toFixed(6)
                        that.setData({
                            statusDWobj: n
                        })
                        wx.setStorageSync('location', t)
                        return

                        let {
                            latitude,
                            longitude,
                            altitude
                        } = t
                        that.setData({
                            statusDWobj: {
                                latitude: parseFloat(latitude).toFixed(6),
                                longitude: parseFloat(longitude).toFixed(6),
                                altitude
                            },
                        })
                        if (console.log(t), e >= 1) {
                            var n = t;
                            n.latitude = parseFloat(t.latitude).toFixed(6), n.longitude = parseFloat(t.longitude).toFixed(6);
                            o.setData({
                                statusArr: [{
                                    latitude,
                                    longitude,
                                    altitude
                                }],
                                currentStatus: n,
                                altitude: t.altitude.toFixed(2)
                            });
                        }

                    });
                } else wx.showModal({
                    showCancel: !0,
                    content: "未开启后台位置获取，请点击右上角“…”，进入设置，选择位置消息，勾选按钮“使用小程序期间和离开小程序后”。",
                    success: function (t) {
                        wx.navigateBack({
                          delta: 1,
                        })
                        return
                        console.log(t), wx.openSetting({
                            success: function (t) {
                                wx.getSetting({
                                    success: function (t) {
                                        if (console.log(t), 1 == t.authSetting["scope.userLocationBackground"]) {
                                            var e = 0;
                                            setInterval(function () {
                                                e++;
                                            }, 1e3), wx.onLocationChange(function (t) {
                                                var n = t;
                                                n.latitude = parseFloat(t.latitude).toFixed(6), n.longitude = parseFloat(t.longitude).toFixed(6)
                                                that.setData({
                                                    statusDWobj: n
                                                })
                                                wx.setStorageSync('location', t)
                                                return
                                                let {
                                                    latitude,
                                                    longitude,
                                                    altitude
                                                } = t
                                                that.setData({
                                                    statusDWobj: {
                                                        latitude: parseFloat(latitude).toFixed(6),
                                                        longitude: parseFloat(longitude).toFixed(6),
                                                        altitude
                                                    },
                                                })
                                                if (console.log(t), e >= 1) {
                                                    var n = t;
                                                    n.latitude = parseFloat(t.latitude).toFixed(6), n.longitude = parseFloat(t.longitude).toFixed(6),
                                                        o.setData({
                                                            currentStatus: n,
                                                            altitude: t.altitude.toFixed(2)
                                                        });
                                                }

                                            });
                                        }
                                    }
                                });
                            }
                        });
                    }
                });
            },
            fail: function () {
                wx.showModal({
                    showCancel: !0,
                    content: "未开启后台位置获取，请点击右上角“…”，进入设置，选择位置消息，勾选按钮“使用小程序期间和离开小程序后”。",
                    success: function (t) {
                        wx.navigateBack({
                            delta: 1,
                          })
                          return
                        wx.openSetting({
                            success: function (t) {
                                wx.getSetting({
                                    success: function (t) {

                                        if (console.log(t), 1 == t.authSetting["scope.userLocationBackground"]) {
                                            wx.showToast({
                                                title: "授权成功",
                                                icon: "none"
                                            }), o.setData({
                                                startLocationUpdateBackground: "#999"
                                            });
                                            var e = 0;
                                            setInterval(function () {
                                                e++;
                                            }, 1e3), wx.onLocationChange(function (t) {
                                                var n = t;
                                                n.latitude = parseFloat(t.latitude).toFixed(6), n.longitude = parseFloat(t.longitude).toFixed(6)
                                                that.setData({
                                                    statusDWobj: n
                                                })
                                                wx.setStorageSync('location', t)
                                                return
                                                let {
                                                    latitude,
                                                    longitude,
                                                    altitude
                                                } = t
                                                that.setData({
                                                    statusDWobj: {
                                                        latitude: parseFloat(latitude).toFixed(6),
                                                        longitude: parseFloat(longitude).toFixed(6),
                                                        altitude
                                                    },
                                                })
                                                if (console.log(t), e >= 1) {
                                                    var n = t;
                                                    n.latitude = parseFloat(t.latitude).toFixed(6), n.longitude = parseFloat(t.longitude).toFixed(6),
                                                        o.setData({
                                                            currentStatus: n,
                                                            altitude: t.altitude.toFixed(2)
                                                        });
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
        this.toCurrentLocation();
    },
    toDQLocation() {

    },
    toCurrentLocation: i.throttle(function (t) {
        this.mapCtx = wx.createMapContext("myMap"), this.mapCtx.moveToLocation();
        // console.log(   this.mapCtx)
    }, 2e3),

    onReady: function () {},
    onShow: function (e) {
        this.getPoyline()
        this.getTeamPosition()
      
        console.log(this.data.markerList, 1223)
        let that = this
        if (storage.getToken()) {
            Api.getUserInfo().then(res => {
                storage.setUserInfo(res)
                this.setData({
                    userInfo: storage.getUserInfo()
                })
                // that.time()
            })
        }

    },
    onHide: function () {},
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    onShareAppMessage: function () {}
});