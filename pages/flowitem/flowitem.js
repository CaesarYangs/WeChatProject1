// pages/flowitem/flowitem.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flows:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    // wx.cloud.database().collection('flow')
    // .doc(id)
    // .get()
    // .then(res=>{
    //   this.setData({
    //     flows:res.data
    //   })
    //   console.log('详情请求成功',res)
    // })
    // .catch(res=>{
    //   console.log('详情请求失败',res)
    // })

    //v2.0.0beta版本 使用自建服务器地址mysql数据库
    
    let sql = "SELECT * FROM `flow` WHERE `_id` ="+id;
    wx.cloud.callFunction({
      name:'mysqlConnect',
      data:{
        sql:sql,
      },
      success: res=>{
        console.log(res.result.res[0])
        this.setData({
          flows: res.result.res[0]
        })
      },
      fail: err =>{
        console.log('[云函数] [db-operator] 调用失败',err)
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

  }
})