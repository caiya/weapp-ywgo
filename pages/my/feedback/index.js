Page({
    data: {
        key: "feedbackContent",         //保存缓存反馈内容的key
        item: {
            content: "",
            create_time: "",
            update_time: "",
            state: 1        //1为新增、2修改，暂时不用
        },
        focus: false,
        placeholdertext: "点击添加您的反馈哦"
    },
    onLoad: function (options) {

    },
    /**
     * 保存数据事件
     */
    onSubmit: function (event) {
        var item = this.data.item;
        var content = event.detail.value.content;
        if (!content.trim()) {
            this.setData({
                focus: true
            });
            return;
        }
        item.content = content;
        this.setData({
            item: item
        });
        this.saveData();
    },
    onFocus: function (e) {
        this.setData({
            focus: true
        });
    },
    /**
     * 请求服务器保存数据
     */
    saveData: function () {
        var item = this.data.item;
        var now = Date.parse(new Date()) / 1000;
        item.update_time = now;
        item.create_time = now;
        this.setData({
            item: item
        });
        //提交服务端数据，测试提交到本地
        wx.setStorageSync({
            key: this.data.key,
            data: item
        });
        //给出提示
        wx.showToast({
            title: '感谢反馈',
            icon: 'success',
            duration: 2000
        });
        setTimeout(function () {
            wx.navigateBack()
        }, 1500)
    }
});