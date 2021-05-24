// pages/marks/marks.js
var app = getApp()
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
      _openid:app.globalData.openid
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
  test:function(){
    var that = this;
    var newlist=[]
    for (var i = 0; i < 3; i++) { //集合中数据的条数
      newlist[i] = that.data.nlist[i].mark //将查询结果中想要的数据挑选出来
    }
    console.log(newlist)
  },
})