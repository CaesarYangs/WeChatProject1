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
    switch1Checked: false,
    switch3Checked: false,

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

    wx.cloud.callFunction({
      name: 'getData',
    })
    .then(res=>{
      console.log("云函数请求成功",res)
      app.globalData.openid = res.result.openid
    })
    .catch(res=>{
      console.log("调用云函数失败",res)
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
  },
  switch_settingFlowShow:function(e){
    app.globalData.settingFlowShow = e.detail.value
  },

  showOpenid:function(){
    wx.showModal({
      title: 'Openid',
      content: app.globalData.openid,
  })
  },

  test1:function(){
    wx.cloud.callFunction({
      name: 'createCollections',
      data:{
        
      }
    })
    .then(res=>{
      console.log("建表成功",res)
    })
    .catch(res=>{
      console.log("调用云函数失败",res)
    })
  },
  switch3Change:function(){
    app.globalData.settingFlowShow = !app.globalData.settingFlowShow;
    console.log(app.globalData.settingFlowShow)
  },
  cardSetting:function(){
    wx.showModal({
      title: '首页卡片样式设置',
      content: '功能开发中... 请等待下次更新',
      showCancel: false,
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
    
  },
  feedback:function(){
    wx.showModal({
      title: 'Feedback是一件很重要的事',
      content: '请邮件至：caesaryangs@outlook.com',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  },
  handleToWebSite1() {
    const url = 'https://github.com/CaesarYangs/WeChatProject1'; // 跳转的外链
    const navtitle = '关于软件-github地址';
    wx.navigateTo({
      // 跳转到webview页面
      url: `/pages/webview1/webview1?url=${url}&nav=${navtitle}`,
    });
  },
  handleToWebSite2() {
    const url = 'https://github.com/CaesarYangs/WeChatProject1/blob/master/README.md'; // 跳转的外链
    const navtitle = '帮助文档'; 
    wx.navigateTo({
      // 跳转到webview页面
      url: `/pages/webview1/webview1?url=${url}&nav=${navtitle}`,
    });
  },
  handleToWebSite3() {
    const url = 'https://github.com/CaesarYangs/WeChatProject1/blob/master/AboutDevelopers'; // 跳转的外链
    const navtitle = 'AboutDevelopers';
    wx.navigateTo({
      // 跳转到webview页面
      url: `/pages/webview1/webview1?url=${url}&nav=${navtitle}`,
    });
  },
})