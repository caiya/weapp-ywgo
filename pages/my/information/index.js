var app = getApp()
Page({
  data: {
    userInfo: null,
    userListInfo: [{
      icon: '/static/images/icon@my.png',
      text: '姓名',
      tapEvent: "nameTap"
    }]
  },
  onLoad: function (options) {
    //调用应用实例的方法获取全局数据
    var that = this;
    app.getUserInfo(function (user) {
      var userListInfo = that.data.userListInfo;
      that.data.userListInfo[0].value = user.nickName;
      that.setData({
        userInfo: user,
        userListInfo: userListInfo
      })
    });
  },
  selectPicture() {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        if (tempFilePaths.length) {
          var img = tempFilePaths[0];
          var userinfo = that.data.userInfo;
          userinfo.avatarUrl = img;
          that.setData({
            userInfo: userinfo
          })
          app.globalData.userInfo.avatarUrl = img;    //更新全局
        }
      }
    })
  }
})