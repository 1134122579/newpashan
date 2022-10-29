// pages/count/count.js
let App = getApp();
import Api from "../../api/index";
import storage from "../../utils/cache";
import {
  parseTime
} from "../../utils/index";
let tmie = null;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    DsLogList: [],
    isgps: false,
    enddate: "",
    DkList: [],
    dk_time: "",
    isloadtion: false,
    loadtion: "",
    lat: "",
    lng: "",
    page: 1,
    is_jy: 1,
    isNulist: false,
    getdataCount: "",
    all_numAll: "",
    beianAll: "",
    zaituAll: "",
    jieshuAll: "",
    userInfo: App.globalData.userInfo,
    jy_list: [],
  },
  getSum(total, num) {
    console.log(total, num);
    return total + num.all_num;
  },
  goJypage(event) {
    console.log(event);
    let {
      item
    } = event.currentTarget.dataset;
    if (item.status == 2) {
      App.isGetlocation(() => {
        item["latitude"] = item["lat"];
        item["longitude"] = item["lng"];
        wx.setStorageSync("JYZB", item);
        wx.navigateTo({
          url: `/pages/jiuyuanDetail/jiuyuanDetail?beian_id=${item.id}&name=${item.name}`,
        });
      });
    } else {
      wx.showToast({
        title: "已完成救援",
        icon: "none",
      });
    }
  },
  golookpage(event) {
    let {
      item
    } = event.currentTarget.dataset;
    let {
      dk_time,
      isgps
    } = this.data;
    let that = this;
    if (isgps) {
      wx.navigateTo({
        url: `/pages/lookdkpage/lookdkpage?user_id=${item.user_id}&date=${dk_time}&rukou_id=${item.rukou_id}`,
      });
    } else {
      App.isGps(() => {
        that.setData({
          isgps: true,
        });
        wx.navigateTo({
          url: `/pages/lookdkpage/lookdkpage?user_id=${item.user_id}&date=${dk_time}&rukou_id=${item.rukou_id}`,
        });
      });
    }
  },
  getCount() {
    Api.getDsCount().then((res) => {
      let all_numAll = res.reduce((total, num) => {
        return total + num.all_num;
      }, 0);
      let beianAll = res.reduce((total, num) => {
        return total + num.beian;
      }, 0);
      let zaituAll = res.reduce((total, num) => {
        return total + num.zaitu;
      }, 0);
      let jieshuAll = res.reduce((total, num) => {
        return total + num.jieshu;
      }, 0);
      this.setData({
        getdataCount: res,
        userInfo: storage.getUserInfo(),
        all_numAll,
        beianAll,
        zaituAll,
        jieshuAll,
      });
    });
  },
  getSosList() {
    let {
      is_jy,
      page,
      jy_list
    } = this.data;
    console.log(is_jy,'getSosList')
    if (is_jy != 1) {
      Api.getSosList({
        page,
      }).then((res) => {
        this.setData({
          isNulist: res.length <= 0 ? true : false,
        });
        if (page == 1) {
          this.setData({
            jy_list: res,
          });
        } else {
          this.setData({
            jy_list: jy_list.concat(res),
          });
        }
      });
    }
  },

  tj() {
    this.setData({
      is_jy: 1,
    });
  },
  jy() {
    this.setData({
      is_jy: 2,
      page: 1,
    });
    this.getSosList();
  },
  dk() {
    console.log(3);
    this.setData({
      is_jy: 3,
      page: 1,
    });
    this.makeCardLog();
  },
  jl() {
    console.log(4);
    this.setData({
      is_jy: 4,
      page: 1,
    });
    this.getDsLogList()
  },
  // 获取登山记录
  getDsLogList() {
    let {
      page,
      DsLogList
    } = this.data
    Api.getDsLogList({
      page
    }).then(res => {
      console.log(res,'getDsLogList')
      this.setData({
        isNulist: res.length <= 0
      })
      if (page == 1) {
        this.setData({
          DsLogList: res,
        })
      } else {
        this.setData({
          DsLogList: DsLogList.concat(res)
        })
      }

    })
  },

  //触底响应函数
  onBottom() {
    var that = this;
    let {
      is_jy
    } = this.data
    this.data.page++;
    console.log(this.data.page,is_jy);
    if (is_jy == 4) {
      this.getDsLogList()
    } else {
      this.getSosList();
    }
  },
  // 获取打卡列表
  makeCardLog() {
    let {
      dk_time,
      userInfo
    } = this.data;
    let date = dk_time || parseTime(new Date(), "{y}-{m}-{d}");
    let is_admin = storage.getUserInfo().is_admin == 1;
    let user_id = storage.getUserInfo().user_id;
    Api.makeCardLog({
      date
    }).then((res) => {
      // res=[]
      if (res.length > 0) {
        res = res.map((res) => {
          res["upTime"] = res["upTime"] ?
            parseTime(res["upTime"], "{h}:{i}") :
            "未打卡";
          res["onTime"] = res["onTime"] ?
            parseTime(res["onTime"], "{h}:{i}") :
            "未打卡";
          return res;
        });
      }
      // 判断是否已有自己
      let ismy = res.filter((item) => item.user_id == user_id).length <= 0 || res.length <= 0;
      // 没有追加一个
      if (ismy) {
        let myuserinfo = {
          upTime: "未打卡",
          headimgurl: userInfo.headimgurl,
          name: userInfo.name,
          onTime: "未打卡",
          rukou_id: userInfo.rukou_id,
          user_id: userInfo.user_id,
        };
        res.push(myuserinfo);
      }
      console.log(res)
      // 判断不是队长
      if (res.length > 0 && !is_admin) {
        res = res.filter((item) => item.user_id == user_id);
      }
      this.setData({
        DkList: res,
      });
    });
  },
  bindDateChange: function (e) {
    console.log("picker发送选择改变，携带值为", e.detail.value);
    this.setData({
      dk_time: e.detail.value,
    });
    this.makeCardLog();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      enddate: parseTime(new Date(), "{y}-{m}-{d}")
    })
  },
  onDkonclick1(res) {
    let {
      type
    } = this.data;
    let rukou_id = storage.getUserInfo().rukou_id;
    let that = this;
    const lat = res.latitude;
    const lng = res.longitude;
    Api.makeCard({
      type,
      lat,
      lng,
      rukou_id
    }).then((res) => {
      wx.showToast({
        title: "打卡成功",
      });
      that.makeCardLog();
    });
  },

  onDkonclick(e) {
    let {
      item
    } = e.currentTarget.dataset;
    console.log(21);
    let {
      isgps,
      isloadtion,
      loadtion
    } = this.data;
    let that = this;
    if (item.user_id != storage.getUserInfo().user_id) {
      wx.showToast({
        title: "非本人，禁止打卡",
        icon: "none",
      });
      return;
    }
    if (isgps) {
      if (isloadtion) {
        let res = loadtion;
        that.onDkonclick1(res);
        clearTimeout(tmie);
        tmie = setTimeout(() => {
          that.setData({
            loadtion: res,
            isloadtion: false,
          });
        }, 3000);
      } else {
        wx.getLocation({
          success(res) {
            that.setData({
              loadtion: res,
              isloadtion: true,
            });
          },
        });
      }
    } else {
      App.isGps((res) => {
        that.setData({
          isgps: true,
          loadtion: res,
          isloadtion: true,
        });
        this.onDkonclick1(res);
      });
    }
  },
  // 获取时间
  getType() {
    let h = new Date(
      parseTime(new Date(), "{y}/{m}/{d}") + " 12:00:00"
    ).getTime();
    let nT = new Date().getTime();
    console.log(h, nT);
    this.setData({
      dk_time: parseTime(new Date(), "{y}-{m}-{d}"),
      type: nT > h ? 2 : 1,
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */

  onShow: function () {
    this.getCount();
    this.makeCardLog();
    this.getSosList();
    this.getType();
    let that = this;
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let {
      is_jy
    } = this.data;
    if (is_jy != 1) {
    console.log(112);
      this.onBottom();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});