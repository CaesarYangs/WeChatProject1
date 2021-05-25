// pages/markDetail/markDetail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nlist:[],
    actionSheetHidden: true,
    thismark:null,
    currentid:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var mark = options.markname;
      wx.cloud.database().collection('flow')
      .where({
        _openid:app.globalData.openid,
        mark:mark
      })
      .get() 
        .then(res=>{
          console.log("请求成功",res)
          this.setData({
            nlist: res.data,
            thismark:mark
          })
          App.globalData.totalflow = res.total
        })
        .catch(err=>{
          console.log("请求成功",err)
        })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.Refresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  Refresh: function(){
    var that = this
    var mark = that.data.thismark;
    console.log(mark)
    wx.cloud.database().collection('flow')
    .where({
      _openid:app.globalData.openid,
      mark:mark
    })
    .get() 
    .then(res=>{
      console.log("请求成功",res)
          this.setData({
            nlist: res.data
          })
          wx.stopPullDownRefresh();
          wx.showToast({
            title: '刷新成功',
            icon:"success",
            duration:1000
          })
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  seeDetail:function(e){
    console.log("点击了跳转操作",e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../flowitem/flowitem?id=' + e.currentTarget.dataset.id,
    })
  },
  deleteItem:function(e){
    var that = this;
    wx.cloud.database().collection('flow')
    .doc(that.data.currentid)
    .remove()
    .then(res=>{
      this.Refresh()
      wx.showToast({
        title: '删除成功',
        icon:"success",
        duration:1000
      })
    })
    .catch(res=>{
      wx.showToast({
        title: '删除失败',
        duration:1000
      })
    })
    this.setData({
      actionSheetHidden: true,
    })
  },
  sheet:function(e){
    var id = e.currentTarget.dataset.id;
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden,
      currentid: id,
    })
  },

actionSheetTap: function(e) {
  this.setData({
    actionSheetHidden: !this.data.actionSheetHidden
  })
},
actionSheetChange: function(e) {
  this.setData({
    actionSheetHidden: !this.data.actionSheetHidden
  })
},
bindItemTap:function(e){
  console.log('tap ' + e.currentTarget.dataset.name)
},
listenerButton: function() {
  this.setData({
    actionSheetHidden: !this.data.actionSheetHidden
  });
},
listenerActionSheet: function() {

  this.setData({
    actionSheetHidden: !this.data.actionSheetHidden,
  })
},
})