let HTTP = require("http.js");
 
/**
 * 获取微信小程序授权参数
 * @param p(code,account)
 * @returns {*}
 */
export const getWeixinSmallOAuthMessage = p => HTTP.post('wechat/v1/getWeixinSmallOAuthMessage.json', p);
 
/**
 * 授权小程序获取手机号码
 * @param p(sessionKey,encrypted,iv)
 * @returns {*}
 */
export const getSmallAppPhone = p => HTTP.post('wechat/v1/getSmallAppPhone.json', p);
 
/**
 * 下载微信上传图片
 * @param p(imgfile)
 * @returns {*}
 */
export const wechaUploadImg = p => HTTP.wxupload('wechat/v1/ossUpload.json', p);
 
/**
 * OSS对象存储
 * @param p(imgfile)
 * @returns {*}
 */
export const ossUpload = p => HTTP.post('wechat/v1/ossUpload.json', p);
 
 
module.exports = {
  getWeixinSmallOAuthMessage: getWeixinSmallOAuthMessage,
  getSmallAppPhone: getSmallAppPhone,
  wechaUploadImg:wechaUploadImg,
  ossUpload: ossUpload
}