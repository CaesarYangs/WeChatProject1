// pages/SettingPage/settingpage.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    localuserInfo:{},
    motto: 'Hello World',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'),
    switch_settingFastNoteChecked:false,
    nn:null,
    showauth:true,
    switch1Checked: false

  },

  logout:function(){
     wx.clearStorage({
       success: (res) => {},
     })
     app.globalData.userInfo = null
     this.setData({
       localuserInfo:null,
       showauth:true
     })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getUserProfile) {
      
      wx.getStorage({
        key: 'loginkey',
        success (res) {
          app.globalData.userInfo=res.data.userInfo,
          console.log("feched")
        }
      })
      this.setData({
        localuserInfo:app.globalData.userInfo,
        showauth:false,
        canIUseGetUserProfile: true
      })
      this.test()
    }
    var c = app.globalData.settingFastNote
    this.setData({
      switch_settingFastNoteChecked:c
    })


  },

  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  test:function(){
    this.setData({
      localuserInfo:app.globalData.userInfo
    })
  },

  auth:function(e){ //e为回调参数
    var that = this
    wx.getUserProfile({
      
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          localuserInfo:app.globalData.userInfo,
          hasUserInfo: true,
          showauth:false
        })
        try {
          wx.setStorageSync('loginkey', res)
          console.log("storged")
        } catch (e) { console.log(e)}

        wx.showToast({
          title: '登陆成功',
          icon: "success"
        })

        console.log(res)
      },
      fail: (err)=>{
        console.log(err)
      }
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

  switch_settingFastNote:function(e){
    app.globalData.settingFastNote = e.detail.value
  }
})