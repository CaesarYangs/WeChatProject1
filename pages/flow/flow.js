// pages/flow/flow.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nlist:[],
    actionSheetHidden: true,
    showAll:false,
    total:null,
    currentid:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.cloud.database().collection('flow')
    //   wx.cloud.database().collection('flow')
    //   .where({
    //     _openid:App.globalData.openid
    //   })
    //   .get() 
    //     .then(res=>{
    //       console.log("请求成功",res)
    //       var list = []
    //       list = res.data.reverse()
    //       this.setData({
    //         nlist: list
    //       })
    //       App.globalData.totalflow = res.total
    //     })
    //     .catch(err=>{
    //       console.log("请求成功",err)
    //     })

    //v2.0.0beta版本 使用自建服务器地址mysql数据库
    wx.cloud.callFunction({
      name: 'getData',
    })
    .then(res=>{
      console.log("云函数请求成功",res)
      App.globalData.openid = res.result.openid
    // console.log()
    let sql = "SELECT * FROM `mini1`.`flow` WHERE `_openid`= "+'"'+App.globalData.openid+'"'+"OR `_pid`="+'"'+App.globalData.pid+'"'
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
        console.log(res.result.res[0].length)
        App.globalData.totalflow = res.result.res[0].length    
         
      },
      fail: err =>{
        console.log('[云函数] [db-operator] 调用失败',err)
      }
    })
    })
    .catch(res=>{
      console.log("调用云函数失败",res)
    })
  },
  Refresh: function(){
    // wx.cloud.database().collection('flow')
    // .where({
    //   _openid:App.globalData.openid
    // })
    // .get() 
    // .then(res=>{
    //   console.log("请求成功",res)
    //   var list = []
    //   list = res.data.reverse()
    //   this.setData({
    //     nlist: list
    //   })
    //       this.loadmark()
    // })
    //v2.0.0使用自建服务器mysql数据库
    let sql = "SELECT * FROM `mini1`.`flow` WHERE `_openid`= "+'"'+App.globalData.openid+'"'+"OR `_pid`="+'"'+App.globalData.pid+'"'
    wx.cloud.callFunction({
      name:'mysqlConnect',
      data:{
        sql:sql,
      },
      success: res=>{
        console.log(res.result.res[0])
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      showAll:App.globalData.settingFlowShow
    })
    console.log('showall:'+this.showAll)
    this.onLoad()
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
    // wx.cloud.database().collection('flow')
    //   .where({
    //     _openid:App.globalData.openid
    //   })
    //   .get() 
    //     .then(res=>{
    //       console.log("请求成功",res)
    //       var list = []
    //       list = res.data.reverse()
    //       this.setData({
    //         nlist: list
    //       })
    //       wx.stopPullDownRefresh();
          
    //       wx.showToast({
    //         title: '刷新成功',
    //         icon:"success",
    //         duration: 1000
    //       })
    //     })
    //     .catch(err=>{
    //       console.log("请求成功",err)
    //     })
    let sql = "SELECT * FROM `mini1`.`flow` WHERE `_openid`= "+'"'+App.globalData.openid+'"'+"OR `_pid`="+'"'+App.globalData.pid+'"'
    wx.cloud.callFunction({
      name:'mysqlConnect',
      data:{
        sql:sql,
      },
      success: res=>{
        console.log(res.result.res[0])
        var list = []
        list = res.result.res[0].reverse()
        this.setData({
          nlist: list
        })  
        wx.stopPullDownRefresh();
      wx.showToast({
        title: '刷新成功',
        icon:"success",
        duration: 1000
      })
      },
      fail: err =>{
        console.log('[云函数] [db-operator] 调用失败',err)
      }
    })
        this.loadmark()
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

  seeD:function(e){
    var that = this;
    var id = that.data.currentid
    console.log("点击了跳转操作",id)
    wx.navigateTo({
      url: '../flowitem/flowitem?id=' + id,
    })
  },



  //删除事项
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
  console.log(id)
},
wandering:function(){
  this.Refresh()
  this.loadmark()
  wx.navigateTo({
    url: '../marks/marks',
  })
},

loadmark:function(){
  var that = this;
  var newlist=[];
  // var marklist=[]
  for (var i = 0; i <that.data.nlist.length; i++) { //集合中数据的条数
    newlist[i] = that.data.nlist[i].mark //将查询结果中想要的数据挑选出来
  }
  var m=true;
  for(var i=0;i<that.data.nlist.length; i++){
    for(var j=0;j<App.globalData.marklist.length; j++){
      if(App.globalData.marklist[j]==newlist[i]){
        m=false;
        break;
      }else{
        m=true;
      }
    }
    if(m){
      App.globalData.marklist.push(newlist[i])
    }
  }
  console.log(App.globalData.marklist)
},
searchFlow:function(){
  wx.navigateTo({
    url: '../markSearch/markSearch',
  })
}

})