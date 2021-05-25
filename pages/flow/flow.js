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
    wx.cloud.database().collection('flow')
      wx.cloud.database().collection('flow')
      .where({
        _openid:App.globalData.openid
      })
      .get() 
        .then(res=>{
          console.log("请求成功",res)
          var list = []
          list = res.data.reverse()
          this.setData({
            nlist: list
          })
          App.globalData.totalflow = res.total
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
      var list = []
      list = res.data.reverse()
      this.setData({
        nlist: list
      })
          this.loadmark()
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
    wx.cloud.database().collection('flow')
      .where({
        _openid:App.globalData.openid
      })
      .get() 
        .then(res=>{
          console.log("请求成功",res)
          var list = []
          list = res.data.reverse()
          this.setData({
            nlist: list
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


  //删除事项
  deleteItem:function(e){
    var that = this;
    wx.cloud.database().collection('flow')
    .doc(that.data.currentid)
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
    this.setData({
      actionSheetHidden: true,
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