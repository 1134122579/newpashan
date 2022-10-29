/*
 * @Author: your name
 * @Date: 2021-06-28 11:36:37
 * @LastEditTime: 2021-06-30 14:01:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \answer\api\index.js
 */
import fly from "../utils/instance";
export default {
  // 登录获取登录token
  wx_mini_login(params) {
    return fly({
      url: `wx_mini_login`,
      method: "post",
      params,
      isThree: false,
    });
  },
  getUserInfo(params) {
    return fly({
      url: `getUserInfo`,
      method: "get",
      params,
      isThree: false,
    });
  },
  ckeckToken(params) {
    return fly({
      url: `checkToken`,
      method: "post",
      params,
      isThree: false,
    });
  },
  wxlogin(params) {
    return fly({
      url: `wxlogin`,
      method: "post",
      params,
      isThree: false,
    });
  },
  editUserInfo(params) {
    return fly({
      url: `editUserInfo`,
      method: "post",
      params,
      isThree: false,
    });
  },
  encrypt_info(params) {
    return fly({
      url: `encrypt_info`,
      method: "post",
      params,
      isThree: false,
    });
  },
  editDsLog(params) {
    return fly({
      url: `editDsLog`,
      method: "post",
      params,
      isThree: false,
    });
  },
  subDsLog(params) {
    return fly({
      url: `subDsLog`,
      method: "post",
      params,
      isThree: false,
    });
  },
  getDsRk(params) {
    return fly({
      url: `getDsRk`,
      method: "get",
      params,
      isThree: false,
    });
  },
  editDsLog(params) {
    return fly({
      url: `editDsLog`,
      method: "post",
      params,
      isThree: false,
    });
  },
  getDsCount(params) {
    return fly({
      url: `getDsCount`,
      method: "get",
      params,
      isThree: false,
    });
  },
  cacheDsLog(params) {
    return fly({
      url: `cacheDsLog`,
      method: "post",
      params,
      isThree: false,
    });
  },
  subPosition(params) {
    return fly({
      url: `subPosition`,
      method: "post",
      params,
      isThree: false,
    });
  },
  endDsLog(params) {
    return fly({
      url: `endDsLog`,
      method: "get",
      params,
      isThree: false,
    });
  },
  getSosList(params) {
    return fly({
      url: `getSosList`,
      method: "post",
      params,
      isThree: false,
    });
  },
  getWeather(params) {
    return fly({
      url: `getWeather`,
      method: "get",
      params,
      isThree: false,
    });
  },
  getDsCount(params) {
    return fly({
      url: `getDsCount`,
      method: "get",
      params,
      isThree: false,
    });
  },
  subSosLog(params) {
    return fly({
      url: `subSosLog`,
      method: "post",
      params,
      isThree: false,
    });
  },
  startDsLog(params) {
    return fly({
      url: `startDsLog`,
      method: "get",
      params,
      isThree: false,
    });
  },

  getSosRoute(params) {
    return fly({
      url: `getSosRoute`,
      method: "post",
      params,
      isThree: false,
    });
  },
  endSosLog(params) {
    return fly({
      url: `endSosLog`,
      method: "post",
      params,
      isThree: false,
    });
  },
  getTeamPosition(params) {
    return fly({
      url: `getTeamPosition`,
      method: "get",
      params,
      isThree: false,
    });
  },
  makeCard(params) {
    return fly({
      url: `makeCard`,
      method: "post",
      params,
      isThree: false,
    });
  },
  makeCardLog(params) {
    return fly({
      url: `makeCardLog`,
      method: "get",
      params,
      isThree: false,
    });
  },
  makeCardDetial(params) {
    return fly({
      url: `makeCardDetial`,
      method: "get",
      params,
      isThree: false,
    });
  },
  getNotice(params) {
    return fly({
      url: `getNotice`,
      method: "get",
      params,
      isThree: false,
    });
  },
  getDsLogList(params) {
    return fly({
      url: `getDsLogList`,
      method: "post",
      params,
      isThree: false,
    });
  },
  getUserDsLog(params) {
    return fly({
      url: `getUserDsLog`,
      method: "get",
      params,
      isThree: false,
    });
  },
  
};