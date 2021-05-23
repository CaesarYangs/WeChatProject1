// pages/flow/flow.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nlist:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.database().collection('flow')
      wx.cloud.database().collection('flow')
      .where({
        _openid:App.globalData.openid
      })
      .get() 
        .then(res=>{
          console.log("请求成功",res)
          this.setData({
            nlist: res.data
          })
        })
        .catch(err=>{
          console.log("请求成功",err)
        })
  },
  Refresh: function(){
    wx.cloud.database().collection('flow')
    .where({
      _openid:App.globalData.openid
    })
    .get() 
    .then(res=>{
      console.log("请求成功",res)
          this.setData({
            nlist: res.data
          })
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
    wx.cloud.database().collection('flow')
      .where({
        _openid:App.globalData.openid
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
            duration: 1000
          })
        })
        .catch(err=>{
          console.log("请求成功",err)
        })
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

  //跳转到商品详情页
  seeDetail:function(e){
    console.log("点击了跳转操作",e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../flowitem/flowitem?id=' + e.currentTarget.dataset.id,
    })
  },

  touchstart: function (e) {
    //开始触摸时 重置所有删除
    let data = App.touch._touchstart(e, this.data.nlist) //将修改过的list setData
    this.setData({
      nlist: data
    })
  },

  //滑动事件处理
  touchmove: function (e) {
    let data = App.touch._touchmove(e, this.data.nlist,'_id')//将修改过的list setData
    this.setData({
      nlist: data
    })
  },

  //删除事项
  deleteItem:function(e){
    wx.cloud.database().collection('flow')
    .doc(e.currentTarget.dataset.id)
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

  },
})