// pages/home.js
var appppp = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    motto:"hello world",
    buttons: [{text: '取消'}, {text: '确定'}],
    oneButton: [{text: '确定'}],
    dialogShow: false,
    showOneButtonDialog: false,
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.cloud.database().collection('task1')
      /*.get({

        success(res){
            console.log("请求成功",res)
        },

        fail(error){
            console.log("请求失败",error)
        }
      })//查询*/
  
      //es6简洁写法
      wx.cloud.database().collection('task1').get() 
        .then(res=>{
          console.log("请求成功",res)
          this.setData({
            list: res.data
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
      // 显示导航栏loading
    wx.showNavigationBarLoading();
    // 调用接口加载数据
    //this.loadData();
    // 隐藏导航栏loading
    wx.hideNavigationBarLoading();
    // 当处理完数据刷新后，wx.stopPullDownRefresh可以停止当前页面的下拉刷新
    wx.stopPullDownRefresh();
    wx.showToast({
      title: '刷新成功~',
      icon: 'success',
      duration: 1000
    })
  },

  done:function(e) {
    wx.showToast({
      title: '按过了',
      icon: 'success',
      duration: 1000
    })
    this.setData({
      dialogShow: false,
      showOneButtonDialog: false,
      
  })
  },

  changeText: function(){
    var a = appppp.globalData.userSignature;
    wx.showToast({
      title: a
    })
      this.setData({
        motto: "你好 世界"
      })
  },

  jumpTo: function(){
      wx.navigateTo({
        url: '../setting/setting',
      })
  },

  openConfirm: function () {
    this.setData({
      dialogShow: true
    })
},

tapDialogButton(e) {
  this.setData({
      dialogShow: false,
      showOneButtonDialog: false,
      
  })
  console.log("请求成功")
},

tapOneDialogButton(e) {
  this.setData({
      showOneButtonDialog: true
  })
},

fresh(e) {
  this.setData({
      showOneButtonDialog: true
  })
},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (e) {
      
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})