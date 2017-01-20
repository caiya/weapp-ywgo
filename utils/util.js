const Promise = require('./Promise')

const categories = [{ "id": "top", "name": "头条" ,index:0},
{ "id": "shehui", "name": "社会" ,index:1},
{ "id": "guonei", "name": "国内" ,index:2},
{ "id": "yule", "name": "娱乐" ,index:3},
{ "id": "tiyu", "name": "体育" ,index:4},
{ "id": "junshi", "name": "军事" ,index:5},
{ "id": "keji", "name": "科技" ,index:6},
{ "id": "caijing", "name": "财经" ,index:7},
{ "id": "shishang", "name": "时尚" ,index:8}];


function requestGet(data) {
  return request('GET', data)
}

function requestPost(data) {
  return request('POST', data)
}

const DOMAIN = 'https://v.juhe.cn/toutiao/index';
const KEY = 'c419699e576519892ebf87bbd3c8158c';

// 小程序上线需要https
function request(method, data = {}) {
  data.key = KEY;
  // wx.showNavigationBarLoading()
  wx.showToast({
    title: '加载中',
    icon: 'loading',
    duration: 10000
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: DOMAIN,
      method: method,
      data: data,
      header: { 'content-type': 'application/json' },
      method: method.toUpperCase(), // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        // wx.hideNavigationBarLoading()
        wx.hideToast();
        resolve(res.data)
      },
      fail: function (msg) {
        console.log('reqest error', msg)
        // wx.hideNavigationBarLoading()
        wx.hideToast();
        reject('fail')
      }
    })
  })
}

const BASEURL = 'https://api.budejie.com/api/api_open.php';
const APPID = 'c419699e576519892ebf87bbd3c8158c';
const SHOWAPI_SIGN = '5425306dc3a04fed953f6251725673b6';

//这里请求的是不得姐api
function requestDynamic(method, data = {}) {
  data.appid = APPID;
  data.SHOWAPI_SIGN = SHOWAPI_SIGN;
  // wx.showNavigationBarLoading()
  wx.showToast({
    title: '加载中',
    icon: 'loading',
    duration: 10000
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASEURL,
      method: method,
      data: data,
      header: { 'content-type': 'application/json' },
      method: method.toUpperCase(), // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        wx.hideToast();
        resolve(res)
      },
      fail: function (msg) {
        console.log('reqest error', msg)
        wx.hideToast();
        reject('fail')
      }
    })
  })
}

function showLoading(title = "请稍后", duration = 5000) {
  wx.showToast({
      title: title ,
      icon: 'loading',
      duration:(duration <= 0) ? 5000 : duration
  });
}

module.exports = {
  categories, Promise,
  get: requestGet, post: requestPost, request,showLoading,requestDynamic
}
