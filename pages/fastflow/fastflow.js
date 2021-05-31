// pages/fastflow/fastflow.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pid:null,
  },

  inputTitle:function(e){
    this.setData({
      pid: e.detail.value
    })
    
  },

  search:function(){
    var that = this;
    var key = that.data.pid;
    app.globalData.pid = key;
    console.log(app.globalData.pid)
    wx.showToast({
      title: '绑定成功',
      icon:'success'
    })
    wx.switchTab({
      url: '../SettingPage/settingpage',
    })
    
  }
})