var EARTH_RADIUS = 6378.137; //地球半径
let App = getApp();
import Api from "../../api/index";
import { parseTime } from "../../utils/index";
import storage from "../../utils/cache";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 存放当前位置经纬度
    latitude: "",
    longitude: "",
    //自定义markers数组，用于地图上特定点的显示；从数据库读取当前位置周围1km以内的点，赋值到本数组
    markers: [
      // {
      //   // 标记点（iconPath图像路径,id应该无所谓 可以用来判断用户点击了哪个marker把,经纬度，还有图像高度、宽度）
      //   iconPath: "/images/sos.png",
      //   id: 1,
      //   latitude: "31.03241",
      //   longitude: "121.22654",
      //   title: '131',
      //   height: 34
      // },
    ],
    // 画圆的参数设定（color边界框线颜色，radius半径，这里设了等于没设，因为后面会根据画面来匹配大小，stokeWidth边界框线粗细）
    circles: [
      {
        latitude: "",
        longitude: "",
        color: "#ff4163",
        fillColor: "#7cb5ec88",
        radius: 200,
        strokeWidth: 2,
      },
    ],
    options: "",
    dkList: [],
    setuseritem: {},
  },
  onLoad: function (options) {
    this.setData({
      options,
    });
    this.getCrlcle();
  },
  onShow: function () {
    // 获取当前位置
    this.getLocation();
    this.makeCardDetial();
    this.makeCardLog();
  },
  // 返回
  buttonout() {
    wx.navigateBack({
      delta: 1,
    });
  },
  // 获取用户坐标
  makeCardDetial() {
    let { options } = this.data;
    Api.makeCardDetial(options).then((res) => {
      res["rk_lat"] = res["rk_lat"] ? Number(res["rk_lat"]) : "";
      res["rk_lng"] = res["rk_lng"] ? Number(res["rk_lng"]) : "";
      res["onLat"] = res["onLat"] ? Number(res["onLat"]) : "";
      res["onLng"] = res["onLng"] ? Number(res["onLng"]) : "";
      res["upLat"] = res["upLat"] ? Number(res["upLat"]) : "";
      res["upLng"] = res["upLng"] ? Number(res["upLng"]) : "";
      res["upTime"] = res["upTime"]
        ? parseTime(res["upTime"], "{h}:{i}")
        : "未打卡";
      res["onTime"] = res["onTime"]
        ? parseTime(res["onTime"], "{h}:{i}")
        : "未打卡";
      console.log(res);
      this.setData({
        setuseritem: res,
        latitude: res.rk_lat,
        longitude: res.rk_lng,
        "circles[0].latitude": res.rk_lat,
        "circles[0].longitude": res.rk_lng,
      });
      let mask = [
        {
          iconPath: "/images/postiodn.png",
          id: 1,
          latitude: res.rk_lat,
          longitude: res.rk_lng,
          title: res.rk_name,
          // callout:{
          //   content:res.rk_name,
          //   bgColor:"#fff",
          //   color:"#333"
          // },
          width: 34,
          height: 34,
        },
        {
          iconPath: "/images/ondaka.png",
          id: 3,
          latitude: res.onLat,
          longitude: res.onLng,
          title: "上班打卡",
          width: 34,
          height: 34,
        },
        res.upLat && {
          iconPath: "/images/updaka.png",
          id: 2,
          latitude: res.upLat,
          longitude: res.upLng,
          title: "下班打卡",
          width: 34,
          height: 34,
        },
      ];
      this.setData({
        markers: mask,
      });
    });
  },
  lookuserlocation(e) {
    console.log(e);
    let { item } = e.currentTarget.dataset;

    this.setData({
      // setuseritem: item,
      "options.user_id": item.user_id,
      "options.rukou_id": item.rukou_id,
    });
    this.makeCardDetial();
  },
  // 获取队员打卡列表
  makeCardLog() {
    let {
      options: { date },
      options,
    } = this.data;
    // let date = dk_time || parseTime(new Date(), "{y}-{m}-{d}");
    let is_admin = storage.getUserInfo().is_admin == 1;
    let user_id = storage.getUserInfo().user_id;
    Api.makeCardLog({
      date,
    }).then((res) => {
      // 判断
      // 判断不是队长
      if (res.length > 0 && !is_admin) {
        res = res.filter((item) => item.user_id == user_id);
      }
      if (res.length > 0) {
        res = res.map((res) => {
          res["upTime"] = res["upTime"]
            ? parseTime(res["upTime"], "{h}:{i}")
            : "未打卡";
          res["onTime"] = res["onTime"]
            ? parseTime(res["onTime"], "{h}:{i}")
            : "未打卡";
          return res;
        });
      }
      // if (res.length > 0 && options.user_id) {
      //   let setuseritem = res.filter((item) => item.user_id == options.user_id);
      //   console.log(setuseritem);
      //   this.setData({
      //     setuseritem: setuseritem[0],
      //   });
      // }
      this.setData({
        dkList: res,
      });
    });
  },
  getLocation() {
    // 拿到当前经纬度，并赋值
    wx.getLocation({
      type: "gcj02",
    })
      .then((res) => {
        console.log(res);
        this.setData({
          // latitude: res.latitude,
          // longitude: res.longitude,
          // 注意json数组赋值的格式
          // 'circles[0].latitude': res.latitude,
          // 'circles[0].longitude': res.longitude
        });
        console.log(this.data.circles);
      })
      .catch((err) => {
        wx.showModal({
          title: "提示",
          content: "获取定位信息失败",
          showCancel: false,
        });
      });
  },
  // 回到中心
  toCurrentLocation: function (t) {
    (this.mapCtx = wx.createMapContext("map")), this.mapCtx.moveToLocation();
  },
  // 点击marker的响应事件
  markertap: function (e) {
    console.log("点击marker", e);
  },
  // 计算距离
  rad: function (d) {
    return (d * Math.PI) / 180.0;
  },
  getDistance: function (lng1, lat1, lng2, lat2) {
    var radLat1 = this.rad(lat1);
    var radLat2 = this.rad(lat2);
    var a = radLat1 - radLat2;
    var b = this.rad(lng1) - this.rad(lng2);
    var s =
      2 *
      Math.asin(
        Math.sqrt(
          Math.pow(Math.sin(a / 2), 2) +
            Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)
        )
      );
    s = s * EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000;
    return s; //返回数值单位：公里
  },
  // 设置radios半径
  getCrlcle() {
    this.wxmap = wx.createMapContext("map");
    this.wxmap.getRegion({}).then((res) => {
      console.log(res + "get");
      let lng1 = res.northeast.longitude;
      let lat1 = res.northeast.latitude;
      let lng2 = res.southwest.longitude;
      let lat2 = res.southwest.latitude;

      let longitude = lng1 - lng2;
      let latitude = lat1 - lat2;
      let flag = longitude > latitude ? true : false;
      let radius = 0;
      //计算得到短边，然后再通过*1000转变为m，除2得到半径，*0.8优化显示，让圈圈只占界面的80%！
      if (flag) {
        radius = ((this.getDistance(lng1, lat1, lng1, lat2) * 1000) / 2) * 0.8;
      } else {
        radius = ((this.getDistance(lng1, lat1, lng2, lat1) * 1000) / 2) * 0.8;
      }
      this.setData({
        "circles[0].radius": radius,
      });
      console.log(this.data.circles[0].radius);
    });
  },
});
