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
      // wx.cloud.database().collection('flow')
      // .where({
      //   _openid:app.globalData.openid,
      //   mark:mark
      // })
      // .get() 
      //   .then(res=>{
      //     console.log("请求成功",res)
      //     this.setData({
      //       nlist: res.data,
      //       thismark:mark
      //     })
      //     App.globalData.totalflow = res.total
      //   })
      //   .catch(err=>{
      //     console.log("请求成功",err)
      //   })
       //v2.0.0beta版本 使用自建服务器地址mysql数据库
    

    let sql = "SELECT * FROM `mini1`.`flow` WHERE `_openid`= "+'"'+app.globalData.openid+'"'+"AND `mark`="+"'"+mark+"'"
    wx.cloud.callFunction({
      name:'mysqlConnect',
      data:{
        sql:sql,
      },
      success: res=>{
        console.log(res.result.res[0])
        // this.setData({
        //   nlist: res.result.res[0]
        // })
        var list = []
        list = res.result.res[0].reverse()
        this.setData({
          nlist: list,
          thismark:mark
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
    // console.log(mark)
    // wx.cloud.database().collection('flow')
    // .where({
    //   _openid:app.globalData.openid,
    //   mark:mark
    // })
    // .get() 
    // .then(res=>{
    //   console.log("请求成功",res)
    //       this.setData({
    //         nlist: res.data
    //       })
    //       wx.stopPullDownRefresh();
    //       wx.showToast({
    //         title: '刷新成功',
    //         icon:"success",
    //         duration:1000
    //       })
    // })

    //V2.0.0使用自建服务器的mysql服务
    let sql = "SELECT * FROM `mini1`.`flow` WHERE `_openid`= "+'"'+app.globalData.openid+'"'+"AND `mark`="+"'"+mark+"'"
    wx.cloud.callFunction({
      name:'mysqlConnect',
      data:{
        sql:sql,
      },
      success: res=>{
        console.log(res.result.res[0])
        // this.setData({
        //   nlist: res.result.res[0]
        // })
        var list = []
        list = res.result.res[0].reverse()
        this.setData({
          nlist: list
        })
         
      },
      fail: err =>{
        console.log('[云函数] [db-operator] 调用失败',err)
      }
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
    // wx.cloud.database().collection('flow')
    // .doc(that.data.currentid)
    // .remove()
    // .then(res=>{
    //   this.Refresh()
    //   wx.showToast({
    //     title: '删除成功',
    //     icon:"success",
    //     duration:1000
    //   })
    // })
    // .catch(res=>{
    //   wx.showToast({
    //     title: '删除失败',
    //     duration:1000
    //   })
    // })
    // this.setData({
    //   actionSheetHidden: true,
    // })

    //v2.0.0使用自建服务器的mysql服务
    //v2.0.0使用自建服务器mysql数据库
    let sql = "DELETE FROM `mini1`.`flow` WHERE `_id`=" +"'"+that.data.currentid+"'";
    wx.cloud.callFunction({
      name:'mysqlConnect',
      data:{
        sql:sql,
      },
      success: res=>{
        console.log(res.result.res[0])
        this.Refresh()
           wx.showToast({
            title: '删除成功',
            icon:"success",
            duration:1000
          })
         this.setData({
          actionSheetHidden: true,
        })
      },
      fail: err =>{
        console.log('[云函数] [db-operator] 调用失败',err)
      }
      
    })
  },
  sheet:function(e){
    var id = e.currentTarget.dataset.id;
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden,
      currentid: id,
    })
  },
  seeD:function(e){
    var that = this;
    var id = that.data.currentid
    console.log("点击了跳转操作",id)
    wx.navigateTo({
      url: '../flowitem/flowitem?id=' + id,
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