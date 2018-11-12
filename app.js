//app.js

const utils = require('./utils/util.js')

App({
  onLaunch: function () {

  },
  getUserInfo(cb) {
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
      
      
      
    }
  },
  getNewsInfo(typeId) {
    var that = this;
    return new utils.Promise((resolve, reject) => {
      if (that.globalData.newsInfo && that.globalData.newsInfo["" + typeId]) {
        resolve(that.globalData.newsInfo["" + typeId])
      }
      return utils.get({ "type": typeId }).then(res => {
        if (!that.globalData.newsInfo) that.globalData.newsInfo = {};
        that.globalData.newsInfo["" + typeId] = res.result.data;
        resolve(res.result.data);
      })
    });
  },
  globalData: {
    newsInfo: null,
    userInfo: null
  }
})
