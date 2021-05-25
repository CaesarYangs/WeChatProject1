// pages/marks/marks.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nlist:[],
    total:null,
    marklist:[],
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
          nlist: res.data,
          marklist:app.globalData.marklist
        })
        
      })
      .catch(err=>{
        console.log("请求成功",err)
      })
      console.log(app.globalData.marklist)
      
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
    wx.cloud.database().collection('flow')
    .where({
      _openid:app.globalData.openid
    })
    .get() 
      .then(res=>{
        console.log("请求成功",res)
        this.setData({
          nlist: res.data,
          marklist:app.globalData.marklist
        })
        wx.stopPullDownRefresh()
      })
      .catch(err=>{
        console.log("请求成功",err)
      })
      console.log(app.globalData.marklist)
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
    var newlist=[];
    // var marklist=[]
    for (var i = 0; i <that.data.nlist.length; i++) { //集合中数据的条数
      newlist[i] = that.data.nlist[i].mark //将查询结果中想要的数据挑选出来
    }
    var m=true;
    for(var i=0;i<that.data.nlist.length; i++){
      for(var j=0;j<that.data.marklist.length; j++){
        if(that.data.marklist[j]==newlist[i]){
          m=false;
          break;
        }else{
          m=true;
        }
      }
      if(m){
        that.data.marklist.push(newlist[i])
      }
    }
    console.log(that.data.marklist)
  },
  seeMark:function(e){
    wx.navigateTo({
      url: '../markDetail/markDetail?markname=' + e.currentTarget.dataset.markname,
    })
    
  }
})