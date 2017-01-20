//index.js
//获取应用实例

var app = getApp()

var utils = require("../../utils/util.js")

Page({
    data: {
        categories: utils.categories,
        currentTab: "top",
        "top": [],
        "shehui": [],
        "guonei": [],
        "yule": [],
        "tiyu": [],
        "junshi": [],
        "keji": [],
        "caijing": [],
        "shishang": [],
        currentTopItem: "0"
    },
    // 页面初次准备好
    onReady: function () {
        var that = this;
        app.getNewsInfo("top").then(res => {
            that.setData({
                top: res
            });
        })
    },
    changeCategory: function (ev) {
        var that = this;
        var id = ev.currentTarget.dataset.id;
        this.setData({
            currentTopItem: ev.currentTarget.dataset.index
        });
        if (this.data.currentTab != id) {
            this.setData({ currentTab: id })
            //获取当前缓存中对应的tab数据，如果当前tab数据不存在则request请求，否则不请求
            app.getNewsInfo(id).then(res => {
                var obj = {}
                obj[id + ""] = res;
                that.setData(obj);
            })
        }
    },
    bindChange(e) {
        var that = this;
        var id = this.getIdFromIndex(e.detail.current);
        that.setData({
            currentTopItem: e.detail.current,
            currentTab:id
        });
        if (!this.data[id].length) {
            app.getNewsInfo(id + "").then(res => {
                var obj = {};
                obj[id + ""] = res;
                that.setData(obj);
            })
        }
    },
    loadMoreData() {
        console.log("已经加载到底部了...")
    },
    getIdFromIndex(index) {
        var id = "top";
        switch (index + "") {
            case "0":
                break;
            case "1":
                id = "shehui";
                break;
            case "2":
                id = "guonei";
                break;
            case "3":
                id = "yule";
                break;
            case "4":
                id = "tiyu";
                break;
            case "5":
                id = "junshi";
                break;
            case "6":
                id = "keji";
                break;
            case "7":
                id = "caijing";
                break;
            case "8":
                id = "shishang";
                break;
        }
        return id;
    },
    bindscroll(ev){
        console.log(ev)
    }
})
