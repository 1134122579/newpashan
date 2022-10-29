// src// pages/endcode/endcode.js
import Api from '../../api/index.js'
import storage from '../../utils/cache'
var r = require("../../utils/weapp-qrcode.js")
const W = wx.getSystemInfoSync().windowWidth;
const windowHeight = wx.getSystemInfoSync().windowHeight;
const rate = 750.0 / W;
const H = windowHeight * rate
// 300rpx 在6s上为 150px
const qrcode_w = 450/ rate;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    qrcode_w,
    dsdetail: "",
    end_rukou:''
  },
  caredCode() {
    let {
        userInfo
    } = this.data
    let that = this
    wx.showLoading({
        title: '生成中..',
    })
    let t = new r("canvas", {
        text: `${+new Date()}+${userInfo.idcard}+${+new Date()}`,
        width: qrcode_w,
        height: qrcode_w,
        colorDark: "#15D36A",
        colorLight: "white",
        correctLevel: r.CorrectLevel.H,
        callback: (res) => {
            // 生成二维码的临时文件
            setTimeout(() => {
                wx.hideLoading()
                that.setData({
                    createCodeImg: res.path
                })
            }, 500);
        }
    })
    console.log(t)
},
  getuser() {
    this.setData({
      userInfo: storage.getUserInfo()
    })

  },
  getUserDsLog() {
    Api.getUserDsLog().then(res => {
      console.log(res)
      this.setData({
        dsdetail: res
      })
      if(res&&res?.status==3){
        this.onjieshu()
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {end_rukou}=options
    console.log(decodeURI(end_rukou),21212213113)
    this.setData({
      end_rukou:decodeURI(end_rukou)
    })

  },
  back(){
wx.redirectTo({
  url: '/pages/index/index',
})
  },
  // 结束登山
  onjieshu(){
    let {userInfo,end_rukou,dsdetail}=this.data
    userInfo.bean_info['end_rukou']=end_rukou
    if(!dsdetail)return
    Api.endDsLog(userInfo.bean_info).then(res => {
      wx.hideLoading()
      this.getUserDsLog()
      // wx.showToast({
      //     title: '结束登山',
      //     mask: true
      // })
      // setTimeout(() => {
      //     wx.redirectTo({
      //         url: '/pages/index/index',
      //     })
      // }, 1500);
      wx.removeStorageSync('statTime')
      wx.removeStorageSync('state')
      wx.offLocationChange((data) => {
          console.log(data, "结束定位")
      })
  })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(!storage.getToken()){
      wx.redirectTo({
        url: '/pages/index/index',
      })
    }
    this.getUserDsLog()
    this.getuser()
    this.caredCode()

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})