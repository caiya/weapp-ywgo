var app = getApp()
Page({
  data: {
    phoneNumber: "400-086-9166",
    version: "v1.0.0",
    aboutme: "博客园：www.cnblogs.com/vipzhou/",
    userInfo: null,
    projectSource: 'https://github.com/liuxuanqiang/wechat-weapp-mall',
    userListInfo: [{
      icon: '../../static/images/icon@dt.png',
      text: '我的动态',
      isunread: true,
      unreadNum: 6,
      tapEvent: "dynamicTap"
    }, {
      icon: '../../static/images/icon@info.png',
      text: '我的资料',
      isunread: false,
      unreadNum: 1,
      tapEvent: "infoTap"
    }, {
      icon: '../../static/images/icon@modfi.png',
      text: '意见反馈',
      tapEvent: "adviceTap"
    }, {
      icon: '../../static/images/iconfont-kefu.png',
      text: '联系客服',
      tapEvent: "contactTap"
    }, {
      icon: '../../static/images/version.png',
      text: '当前版本',
      tapEvent: "versionTap"
    }, {
      icon: '../../static/images/iconfont-help.png',
      text: '关于作者',
      tapEvent: "aboutTap"
    }]
  },
  onShow: function () {
    //调用应用实例的方法获取全局数据
    var that = this;
    app.getUserInfo(function (user) {
      //更新数据，实际页面数据已经取到，但是多数情况下就是不显示，目前不知道原因
      that.setData({
        userInfo: user
      })
    })
  },

  // 点击事件处理
  dynamicTap() {    //动态
    // wx.showToast({
    //   title: '开发中',
    //   icon: 'success',
    //   duration: 2000
    // })
    wx.navigateTo({
      url: '/pages/dynamic/index'
    })
  },
  versionTap() {      //版本
    wx.showToast({
      title: '版本：' + this.data.version,
      icon: 'success',
      mask: true,
      duration: 2000
    })
  },
  aboutTap() {      //关于我
    wx.showModal({
      title: '关于我',
      content: this.data.aboutme,
      showCancel: false
    })
  },
  contactTap() {   //联系客服
    wx.makePhoneCall({
      phoneNumber: this.data.phoneNumber //仅为示例，并非真实的电话号码
    })
  },
  adviceTap() {    //意见反馈
    wx.navigateTo({
      url: '/pages/my/feedback/index'
    })
  },
  infoTap() {    //我的资料
    wx.navigateTo({
      url: '/pages/my/information/index'
    })
  },
  profileTap() {   //点击头像，放大
    wx.previewImage({
      urls: [this.data.userInfo.avatarUrl] // 需要预览的图片http链接列表
    })
  }
})