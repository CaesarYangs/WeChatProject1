// pages/markSearch/markSearch.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    actionSheetHidden: true,
    nlist:[],
    searchtitle:null,
    currentid:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  inputTitle:function(e){
    this.setData({
      searchtitle: e.detail.value
    })
    this.searchFlow()
  },
  searchFlow:function(){
    var that = this;
    let key = that.data.searchtitle;
    this.setData({
      nlist:[]
    })

    const db = wx.cloud.database()
    wx.cloud.database().collection('flow')
    .where({
      _openid:app.globalData.openid,
      flow: db.RegExp({
        regexp:'.*'+ key,
        options:'i'
      })
    })
    .get() 
      .then(res=>{
        console.log("请求成功",res)
        var list = []
        list = res.data
        list.reverse()
        this.setData({
          nlist: list,
        })
        
      })
      .catch(err=>{
        console.log("请求成功",err)
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
sheet:function(e){
  var id = e.currentTarget.dataset.id;
  this.setData({
    actionSheetHidden: !this.data.actionSheetHidden,
    currentid: id,
  })
},
seeDetail:function(e){
  console.log("点击了跳转操作",e.currentTarget.dataset.id)
  wx.navigateTo({
    url: '../flowitem/flowitem?id=' + e.currentTarget.dataset.id,
  })
},

Refresh:function(){
  this.searchFlow()
},

//删除事项
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
})