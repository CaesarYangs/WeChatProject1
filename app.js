// app.js
App({
  onLaunch() {
    
    wx.cloud.init({
      env:"cloud1-2gh44cwi9f65894a"//云开发环境id
    })


    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var userinfo = this
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.getUserInfo({
          success: res =>{
            userinfo.globalData.userInfo = res.userInfo
            console.log(res.signature)
            userinfo.globalData.userSignature = res.signature
          }
        })
      }
    })
    
    
    console.log(userinfo)
  },
  globalData: {
    userInfo:{},
    userSignature:null,
    userNickName:null,
    userAvatarURL:null,
    settingFastNote:null
  }
})
