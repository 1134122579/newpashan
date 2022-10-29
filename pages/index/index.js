import storage from '../../utils/cache'
let App = getApp()
import Api from '../../api/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isNoticeshow: false,
    Noticecontent: {},
    is_ts: false,
    isone: true,
    isTwo: false,
    Weather: {},
    isUser: true,
    isToken: false,
    enter: [],
    date: '',
    enterIndex: '',
    ensureEnter: '',
    modify: false,
    DsCount: '',
    userInfo: App.globalData.userInfo
  },
  noticeOnClick() {
    this.setData({
      isNoticeshow: true
    })
  },
  scanCode() {
    // wx.navigateTo({
    //   url: '/pages/endcode/endcode?end_rukou=' + '出口',
    // })
    // return
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log(res.path)
        if (res.path) {
          wx.navigateTo({
            url: "/" + res.path,
          })
        } else {
          // wx.showToast({
          //   title: '扫码错误，请从新扫码',
          //   duration: 1000,
          //   icon: "none",
          // })
        }

      }
    })
  },
  onNoticeClose() {
    this.setData({
      isNoticeshow: false
    })
  },
  onTSclone() {
    this.setData({
      isone: true,
      isTwo: false,
      is_ts: false
    })
    wx.setStorageSync('ISTS', true)
  },
  onOne() {
    this.setData({
      isone: false,
      isTwo: true
    })
  },
  getNotice() {
    Api.getNotice().then(res => {
      console.log(res, 21212332132321312)

      this.setData({
        Noticecontent: res
      })
    })
  },
  onTwo() {
    this.setData({
      isone: true,
      isTwo: false,
      is_ts: false
    })
  },
  onanlione() {
    wx.navigateTo({
      url: '/pages/anlione/anlione',
    })
  },
  onanlitwo() {
    wx.navigateTo({
      url: '/pages/anlitwo/anlitwo',
    })
  },
  onanlithree() {
    wx.navigateTo({
      url: '/pages/anlithree/anlithree',
    })
  },
  cancel() {
    var e = this;
    let {
      bean_info
    } = storage.getUserInfo()
    Api.cacheDsLog({
      ...bean_info
    }).then(res => {
      wx.showToast({
        title: '备案已取消',
        icon: 'none',
        mask: true
      })
      this.setData({
        "userInfo.bean_info": ''
      })
    })

  },
  onanlitiaoli() {
    // wx.navigateTo({
    //   url: '/pages/anlitiaoli/anlitiaoli',
    // })
    wx.navigateTo({
      url: '/pages/anlithree/anlithree',
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    });
  },
  pdf() {
    wx.navigateTo({
      url: '/pages/pdf/pdf',
    })
  },
  // 获取数据
  getDsCount() {
    return
    Api.getDsCount().then(res => {
      this.setData({
        DsCount: res
      })
    })
  },
  //  判断是否登录
  islogin(callback) {
    let token = storage.getToken()
    let userInfo = storage.getUserInfo()
    if (token) {
      if (userInfo.is_auth == 1) {
        (callback && typeof (callback) === "function") && callback();
      } else {
        wx.navigateTo({
          url: '/pages/testify/testify',
        })

      }
    } else {
      this.setData({
        is_ts: true
      })
      // wx.showModal({
      //   content: '请点击左上方登录按钮',
      //   showCancel: false,
      //   title: '暂未登录',
      // })
      // wx.redirectTo({
      //   url: '/pages/login/login',
      // })
    }
  },
  modify() {
    this.setData({
      modify: !this.data.modify
    })
  },
  goAdmin() {
    wx.navigateTo({
      url: '/pages/count/count',
    })
  },
  bindPickerEnter: function (e) {
    this.setData({
      enterIndex: e.detail.value,
      ensureEnter: this.data.enter[e.detail.value]['name']
    });
  },
  getDsRk() {
    Api.getDsRk().then(res => {
      this.setData({
        enter: res
      })
    })
  },
  confirmModify() {
    let {
      userInfo,
      date,
      ensureEnter
    } = this.data
    if (!ensureEnter) {
      wx.showToast({
        title: '请选择登山入口',
        icon: 'none'
      })
      return
    }
    if (!date) {
      wx.showToast({
        title: '请选择日期',
        icon: 'none'
      })
      return
    }
    userInfo['bean_info']['rukou'] = ensureEnter
    userInfo['bean_info']['ds_time'] = date

    Api.editDsLog({
      ...userInfo.bean_info
    }).then(res => {
      this.getUser()
      wx.showToast({
        title: '修改成功',
      })
      this.cancelModify()
    })
  },
  start() {
    wx.navigateTo({
      url: '/pages/entryDetail/entryDetail',
    })
    // App.isGetlocation(() => {

    // })
  },

  cancelModify() {
    this.setData({
      modify: !this.data.modify
    })
  },
  getWeather() {
    Api.getWeather().then(res => {
      console.log()
      res['BG'] = res.power.slice(0, 1)
      this.setData({
        Weather: res
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: App.globalData.userInfo
    })
  },
  record() {
    this.islogin((res) => {
      wx.navigateTo({
        url: '/pages/add/add',
      })
      return
      wx.navigateTo({
        url: '../backgroundLocation/backgroundLocation',
      })
    })
  },
  newgetUserProfile(e) {
    let that = this
    this.setData({
      disabled: true
    })
    wx.login({
      success: res => {
        console.log(res)
        this.setData({
          code: res.code
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      lang: 'zh_CN',
      success: (res) => {
        console.log(res)
        let obj = res
        obj.code = that.data.code
        console.log(obj)
        wx.showLoading({
          title: '登陆中..',
        })

        Api.wx_mini_login(obj).then(res => {
          console.log(res)
          // 获取用户信息
          storage.setToken(res.token)
          Api.getUserInfo().then(res => {
            storage.setUserInfo(res)

            wx.hideLoading()
            that.setData({
              userInfo: res,
              isToken: !storage.getToken() ? false : true
            })
            App.globalData.userInfo = res
            App.globalData.is_login = false
            if (res.is_auth != 1) {
              wx.navigateTo({
                url: '/pages/testify/testify',
              })
            }
          })
        })
      },
      complete: () => {
        that.setData({
          disabled: false,
        })
      }
    })
  },
  toTestify() {
    this.islogin(() => {
      wx.navigateTo({
        url: '../testify/testify',
      })
    })
  },
  toUser() {
    this.islogin(() => {
      wx.navigateTo({
        url: '../user/user',
      })
    })
  },
  async getUser() {
    let res = await Api.getUserInfo()
    storage.setUserInfo(res)
    this.setData({
      userInfo: res
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // wx.setStorageSync('ISTS', false)
    if (!storage.getToken()) {
      let ISTS = wx.getStorageSync('ISTS')
      this.setData({
        is_ts: ISTS ? false : true
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      isToken: !storage.getToken() ? false : true
    })
    this.getWeather()
    this.getNotice()
    if (storage.getToken()) {
      this.getDsCount()
      this.getUser()
      this.getDsRk()
    }
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