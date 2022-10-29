var e = require("../../@babel/runtime/helpers/interopRequireDefault"), t = require("../../@babel/runtime/helpers/defineProperty"), a = e(require("../../utils/mixins/pageMixin/myPageMixin")), s = getApp(), n = require("../../utils/util.js");

Page({
    mixins: [ a.default ],
    data: t({
        dataBack:true,
        enter: [ "南澳垃圾场登山口", "桔钓沙登山口", "七星湾登山口", "英管岭登山口", "坪山仔登山口", "黄泥湾登山口", "上横岗后屋坪登山口", "枫浪山登山口", "虎头山登山口", "鹿雁科考线登山口", "观音山登山口", "东山寺登山口01", "排牙山登山口", "盐灶水库登山口", "锣鼓山登山口", "锣鼓山公园入口", "登山口俊华园", "大鹏古道登山口", "东涌穿越登山口", "插旗山登山口", "巧巧窑鸡前登山口", "东涌码头涌口岭登山口", "西涌天文台登山口", "西贡村口登山口", "柚柑湾登山口", "俄公登山口", "半天云登山口" ],
        exit: [ "南澳垃圾场登山口", "桔钓沙登山口", "七星湾登山口", "英管岭登山口", "坪山仔登山口", "黄泥湾登山口", "上横岗后屋坪登山口", "枫浪山登山口", "虎头山登山口", "鹿雁科考线登山口", "观音山登山口", "东山寺登山口01", "排牙山登山口", "盐灶水库登山口", "锣鼓山登山口", "锣鼓山公园入口", "登山口俊华园", "大鹏古道登山口", "东涌穿越登山口", "插旗山登山口", "巧巧窑鸡前登山口", "东涌码头涌口岭登山口", "西涌天文台登山口", "西贡村口登山口", "柚柑湾登山口", "俄公登山口", "半天云登山口" ],
        group: [ "单人", "团体" ],
        reason: [ "游玩/活动", "生产作业", "采集山产品", "车辆通行", "祭祀", "迁坟", "其他" ],
        clear: !0,
        enterIndex: 0,
        ensureEnter: "南澳垃圾场登山口",
        exitIndex: 1,
        ensureExit: "桔钓沙登山口",
        groupIndex: 0,
        ensureGroup: "单人",
        reasonIndex: 0,
        ensureReason: "游玩/活动",
        prop: 0,
        refresh: !1,
        popup: !0,
        success: !0,
        isRead: !1
    }, "clear", !1),
    cancel: n.throttle(function(e) {
        var t = this;
        wx.login({
            success: function(e) {
                wx.request({
                    url: "https://sumou-server.tsunamitek.com/dengshan?code=".concat(e.code, "&cmd=entry.cancel"),
                    method: "POST",
                    data: {
                        entryId: t.data.entryid
                    },
                    success: function(e) {
                        console.log("entry.cancel success", e), wx.navigateBack({
                            delta: 0,
                            success: function() {
                                wx.showToast({
                                    title: "取消备案成功",
                                    icon: "none"
                                });
                            }
                        });
                    }
                });
            }
        });
    }, 2e3),
    createDone: function() {
        var e = this;
        0 == this.data.groupIndex ? wx.login({
            success: function(t) {
                wx.request({
                    url: "https://sumou-server.tsunamitek.com/dengshan?code=".concat(t.code, "&cmd=entry.create"),
                    method: "POST",
                    data: {
                        appid: "".concat(s.globalData.appId),
                        entry: e.data.ensureEnter,
                        exit: e.data.ensureExit,
                        time: e.data.date,
                        purpose: e.data.ensureReason,
                        type: e.data.groupIndex.toString()
                    },
                    success: function(e) {
                        console.log(e);
                    }
                });
            }
        }) : 1 == this.data.groupIndex && wx.login({
            success: function(t) {
                wx.request({
                    url: "https://sumou-server.tsunamitek.com/dengshan?code=".concat(t.code, "&cmd=entry.create"),
                    method: "POST",
                    data: {
                        appid: "".concat(s.globalData.appId),
                        entry: e.data.ensureEnter,
                        exit: e.data.ensureExit,
                        time: e.data.date,
                        purpose: e.data.ensureReason,
                        type: e.data.groupIndex.toString()
                    },
                    success: function(t) {
                        console.log(t.data.entry_id), e.setData({
                            teamid: t.data.entry_id
                        });
                    }
                });
            }
        });
    },
    bindDateChange: function(e) {
        this.setData({
            date: e.detail.value
        });
    },
    bindPickerGroup: function(e) {
        this.setData({
            groupIndex: e.detail.value,
            ensureGroup: this.data.group[e.detail.value]
        });
    },
    bindPickerEnter: function(e) {
        this.setData({
            enterIndex: e.detail.value,
            ensureEnter: this.data.enter[e.detail.value]
        });
    },
    bindPickerExit: function(e) {
        this.setData({
            exitIndex: e.detail.value,
            ensureExit: this.data.exit[e.detail.value]
        });
    },
    bindPickerReason: function(e) {
        this.setData({
            reasonIndex: e.detail.value,
            ensureReason: this.data.reason[e.detail.value]
        });
    },
    popup: function() {
        this.setData({
            popup: !1
        });
    },
    refresh: function() {
        var e = this;
        null != this.data.detail.isLeader && ("-10" != this.data.detail.condition || 0 != this.data.detail.isLeader ? "-20" == this.data.detail.condition && wx.login({
            success: function(t) {
                wx.request({
                    url: "https://sumou-server.tsunamitek.com/dengshan?code=".concat(t.code, "&cmd=entry.teammates.get"),
                    method: "POST",
                    data: {
                        teamid: e.data.detail.teamid
                    },
                    success: function(t) {
                        if (console.log("refresh success ", t), "condition not allowed" != t.data.err) {
                            if ("should move to next step" == t.data.err) {
                                e.setData({
                                    success: !1
                                });
                                var a = t.data.redirectId;
                                wx.login({
                                    success: function(t) {
                                        wx.request({
                                            url: "https://sumou-server.tsunamitek.com/dengshan?code=".concat(t.code, "&cmd=entry.detail"),
                                            method: "POST",
                                            data: {
                                                entryId: a
                                            },
                                            success: function(t) {
                                                console.log("smtns => detail", t), "-10" == t.data.data.condition && (s.globalData.detailStuff = void 0, 
                                                clearInterval(e.data.p), wx.showModal({
                                                    title: "备案成功",
                                                    content: "点击确定跳转首页。",
                                                    showCancel: !1,
                                                    success: function(e) {
                                                        e.confirm && wx.redirectTo({
                                                            url: "/pages/index/index"
                                                        });
                                                    }
                                                })), "100" == t.data.data.condition && (s.globalData.detailStuff = void 0, clearInterval(e.data.p), 
                                                console.log("order has been closed"), wx.showModal({
                                                    title: "此备案已被队长取消",
                                                    content: "点击确定跳转首页。",
                                                    showCancel: !1,
                                                    success: function(e) {
                                                        e.confirm && wx.redirectTo({
                                                            url: "/pages/index/index"
                                                        });
                                                    }
                                                }));
                                            }
                                        });
                                    }
                                });
                            }
                            null != t.data.data && null == t.data.data.currentUserNotIn ? e.setData({
                                inteam: !0
                            }) : e.setData({
                                inteam: !1
                            });
                            var n = t.data.data.teammates.length + 1;
                            e.setData({
                                leader: t.data.data.leader,
                                teammates: t.data.data.teammates,
                                refresh: !0,
                                sum: n
                            }), wx.showToast({
                                title: "刷新中...",
                                icon: "loading"
                            });
                        } else wx.showModal({
                            title: "刷新失败",
                            content: "此备案已过期、已取消或已上报。",
                            showCancel: !1,
                            success: function(e) {
                                e.confirm && wx.redirectTo({
                                    url: "/pages/index/index"
                                });
                            }
                        });
                    }
                });
            }
        }) : wx.login({
            success: function(t) {
                wx.request({
                    url: "https://sumou-server.tsunamitek.com/dengshan?code=".concat(t.code, "&cmd=entry.list"),
                    success: function(t) {
                        var a;
                        console.log("entry.list", t);
                        for (var s = 0; s < t.data.list.length; s++) if (t.data.list[s].teamid == e.data.teamid) return void (a = s);
                        console.log(a), wx.redirectTo({
                            url: "/pages/detail/detail?myteamid=".concat(a)
                        });
                    }
                });
            }
        }));
    },
    fire: function() {
        this.setData({
            fire: !0,
            promise: !1
        });
    },
    promise: function() {
        this.setData({
            promise: !0,
            isRead: !0,
            clear: !1
        });
    },
    notRead: function() {
        this.setData({
            isRead: !1,
            promise: void 0,
            fire: void 0
        });
    },
    isRead: function() {
        this.data.fire ? this.setData({
            isRead: !0
        }) : this.setData({
            fire: !1,
            clear: !0,
            popup: !1
        });
    },
    join: n.throttle(function(e) {
        var t = this;
        this.data.fire ? (this.data.subsMsg || wx.requestSubscribeMessage({
            tmplIds: [ "KG6-W5Wf235B33PwAGJ8JccsFfHmtA74Py9VfgPrX0g" ],
            success: function(e) {
                t.setData({
                    subsMsg: !0
                });
            }
        }), wx.login({
            success: function(e) {
                wx.request({
                    url: "https://sumou-server.tsunamitek.com/dengshan?code=".concat(e.code, "&cmd=entry.teammates.join"),
                    method: "POST",
                    data: {
                        teamid: t.data.teamid
                    },
                    success: function(e) {
                        console.log("join success ", e), "condition not allowed" != e.data.err ? (wx.showToast({
                            title: "加入成功"
                        }), t.setData({
                            inteam: !0
                        }), t.refresh()) : wx.showModal({
                            title: "加入失败",
                            content: "此备案已过期或已上报。",
                            showCancel: !1,
                            success: function(e) {
                                e.confirm && wx.redirectTo({
                                    url: "/pages/index/index"
                                });
                            }
                        });
                    }
                });
            }
        })) : wx.showToast({
            title: "请勾选声明后重试",
            icon: "none"
        });
    }, 2e3),
    leave: n.throttle(function(e) {
        var t = this;
        wx.login({
            success: function(e) {
                wx.request({
                    url: "https://sumou-server.tsunamitek.com/dengshan?code=".concat(e.code, "&cmd=entry.teammates.leave"),
                    method: "POST",
                    data: {
                        teamid: t.data.teamid
                    },
                    success: function(e) {
                        t.setData({
                            inteam: !1
                        }), console.log("leave success ", e), wx.showToast({
                            title: "退出成功"
                        }), clearInterval(t.data.p), s.globalData.detailStuff = void 0, wx.redirectTo({
                            url: "/pages/index/index"
                        });
                    }
                });
            }
        });
    }, 2e3),
    leaderApprove: n.throttle(function(e) {
        var t = this;
        wx.login({
            success: function(e) {
                wx.request({
                    url: "https://sumou-server.tsunamitek.com/dengshan?code=".concat(e.code, "&cmd=entry.teammates.leaderApprove"),
                    method: "POST",
                    data: {
                        teamid: t.data.teamid
                    },
                    success: function(e) {
                        s.globalData.detailStuff, console.log("approve success ", e), wx.showToast({
                            title: "申报成功"
                        }), clearInterval(t.data.p), wx.redirectTo({
                            url: "/pages/index/index"
                        });
                    }
                });
            }
        });
    }, 2e3),
    remove: n.throttle(function(e) {
        console.log(e.currentTarget.dataset.openid);
        var t = this;
        wx.login({
            success: function(a) {
                wx.request({
                    url: "https://sumou-server.tsunamitek.com/dengshan?code=".concat(a.code, "&cmd=entry.teammates.leave"),
                    method: "POST",
                    data: {
                        teamid: t.data.teamid,
                        openid: e.currentTarget.dataset.openid
                    },
                    success: function(e) {
                        console.log("leader remove success ", e), t.refresh();
                    }
                });
            }
        });
    }, 2e3),
    onLoad: function(e) {
        wx.setStorageSync("userinfo", !1), wx.setStorageSync("phoneState", !1), console.log(e), 
        s.globalData.detailStuff = e;
        var t = this;
        wx.login({
            success: function(a) {
                wx.request({
                    url: "https://sumou-server.tsunamitek.com/dengshan?code=".concat(a.code, "&cmd=extra.has"),
                    success: function(a) {
                        console.log("extra.has success ", a), "1" == a.data["extra.has"] ? (console.log("options success ", e), 
                        e.myteamid && (t.setData({
                            entryid: e.myteamid
                        }), wx.login({
                            success: function(e) {
                                wx.request({
                                    url: "https://sumou-server.tsunamitek.com/dengshan?code=".concat(e.code, "&cmd=entry.detail"),
                                    method: "POST",
                                    data: {
                                        entryId: t.data.entryid
                                    },
                                    success: function(e) {
                                        console.log(e.data), "should move to next step" == e.data.err && null != e.data.redirectId && (clearInterval(t.data.p), 
                                        wx.redirectTo({
                                            url: "/pages/detail/detail?myteamid=".concat(e.data.redirectId)
                                        })), null != e.data.data && null == e.data.data.currentUserNotIn ? t.setData({
                                            inteam: !0
                                        }) : t.setData({
                                            inteam: !1
                                        }), console.log("detail success ", e), "已过期" == e.data.err && wx.showModal({
                                            title: "进入备案失败",
                                            content: "邀请链接已过期，请确认备案。",
                                            showCancel: !1,
                                            success: function(e) {
                                                e.confirm && wx.redirectTo({
                                                    url: "/pages/index/index"
                                                });
                                            }
                                        }), "无权看" == e.data.err && wx.showModal({
                                            title: "查看备案失败",
                                            content: "您没有权限查看此备案。",
                                            showCancel: !1,
                                            success: function(e) {
                                                e.confirm && wx.redirectTo({
                                                    url: "/pages/index/index"
                                                });
                                            }
                                        });
                                        var a = e.data.data.time.split("T")[0], s = e.data.data.teammates.length + 1;
                                        t.setData({
                                            sum: s
                                        }), t.setData({
                                            detail: e.data.data,
                                            teamid: e.data.data.teamid,
                                            dateBack: a,
                                            sum: s,
                                            teammates: e.data.data.teammates,
                                            leader: e.data.data.leader
                                        }), t.refresh();
                                    }
                                });
                            }
                        })), e.groupIndex && t.setData({
                            groupIndex: e.groupIndex
                        })) 
                        : console.log('a')
                        // wx.showModal({
                        //     title: "认证",
                        //     content: "请按照流程依次授权后进入主页进行认证",
                        //     showCancel: !1,
                        //     success: function(e) {
                        //         e.confirm && (clearInterval(t.data.p), wx.redirectTo({
                        //             url: "/pages/index/index"
                        //         }));
                        //     }
                        // });
                        
                    }
                });
            }
        });
        var a = n.formatTime(new Date()).split(" ");
        this.setData({
            date: a[0]
        });
    },
    onReady: function() {},
    onShow: function() {
        var e = this;
        this.setData({
            p: setInterval(function() {
                e.refresh();
            }, 3e4)
        });
    },
    onHide: function() {
        this.data.p && clearInterval(this.data.p);
    },
    onUnload: function() {
        this.data.p && clearInterval(this.data.p);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            path: "/pages/detail/detail?myteamid=".concat(this.data.teamid, "&groupIndex=2"),
            imageUrl: "/images/share.jpg",
            title: "行山易"
        };
    }
});