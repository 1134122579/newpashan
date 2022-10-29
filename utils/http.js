const COM = require("../config.js");
// import storage from './cache'
const storage = require("./cache.js");

 
let baseUrl = '';
if (COM.active === 'dev') {
  baseUrl = COM.devservice;
} else {
  baseUrl = COM.proservice;
}
 
// 设置请求头
function getHeader(method, url) {
  let header = {
    'content-type': 'application/x-www-form-urlencoded'
  };
  let token=storage.getToken()
  header['Token'] = '';
  if(token){
    header['Token'] = '';
  }
  return header;
}
 
const http = ({
  url = '',
  param = {},
  other,
  isThree=false
} = {}) => {
  let timeStart = Date.now();
  return new Promise((resolve, reject) => {
    wx.request({
      url: getUrl(url),
      data: param,
      header: getHeader("POST", url),
      ...other,
      complete: (res) => {
        console.log(`耗时${Date.now() - timeStart}`);
        if (res.status >= 200 && res.status < 300) {
          if(res.status==203){
            wx.navigateTo({
              url: '/pages/login/login',
            })
            return
          }
          if(isThree){
          resolve(res)
          }
          resolve(res.data)
        } else if (res.status >= 500) {
          //token过期 验证失败
          console.log("请求失败" + res.message)
          resolve(res.data);
        } else {
          console.log(res)
          reject(res)
        }
      }
    })
  })
}
 
const upload = ({
  url = '',
  imgUrl = ''
}) => {
  let timeStart = Date.now();
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: getUrl(url), //开发者服务器地址
      header: getHeader("POST", url),
      filePath: imgUrl, //要上传文件资源的路径
      name: "imgfile", //文件对应的 key，开发者在服务端可以通过这个 key 获取文件的二进制内容
      success: (res) => {
        console.log(`耗时${Date.now() - timeStart}`);
        if (res.status >= 200 && res.status < 300) {
          if(res.status==203){
            wx.navigateTo({
              url: '/pages/login/login',
            })
            return
          }
          if(isThree){
            resolve(JSON.parse(res))  
            }
          resolve(JSON.parse(res.data))
        } else if (res.status >= 500) {
          //token过期 验证失败
          console.log("请求失败" + res.message)
          resolve(JSON.parse(res.data));
        } else {
          console.log(res)
          reject(res)
        }
      },
      fail:function(e){
        console.log("请求失败" + e.errMsg)
        resolve(e);
      }
    })
  })
}
 
const getUrl = (url) => {
  if (url.indexOf('://') == -1) {
    url = baseUrl + url;
  }
  return url
}
 
// get方法
/**
 * 
 * @param {*} url 地址
 * @param {*} param 请求参数  传参
 * @param {*} other  特殊参数
 */
const get = (url, param = {},other=[]) => {
  return http({
    url,
    param,
    other
  })
}
// post 方法
/**
 * 
 * @param {*} url 地址
 * @param {*} param 请求参数  传参
 * @param {*} other  特殊参数
 */
const post = (url, param = {},other=[]) => {
  return http({
    url,
    param,
    method: 'post',
    other
  })
}
//  上传文件的方法
const wxupload = (url, imgUrl) => {
  return upload({
    url,
    imgUrl,
  })
}
 
module.exports = {
  get,
  post,
  wxupload,
}