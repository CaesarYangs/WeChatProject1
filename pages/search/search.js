const app = getApp()
Page({
  data: {
    list:[],
    searchtitle:null,
    currentid:null,
  },
  inputTitle:function(e){
    this.setData({
      searchtitle: e.detail.value
    })

  },
  search:function(){
    var that = this;
    let key = that.data.searchtitle;
    this.setData({
      list:[]
    })

    const db = wx.cloud.database()
    wx.cloud.database().collection('task2')
    .where({
      _openid:app.globalData.openid,
      taskname: db.RegExp({
        regexp:'.*'+ key,
        options:'i'
      })
    })
    .get() 
      .then(res=>{
        console.log("请求成功",res)
        this.setData({
          list: res.data,
        })
        
      })
      .catch(err=>{
        console.log("请求成功",err)
      })
  },
  //删除事项
  deleteItem:function(e){
    wx.cloud.database().collection('task2')
    .doc(e.currentTarget.dataset.id)
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
    this.search()
  },
  checkMove:function(e){
    wx.cloud.database().collection('task2')
    if(e.currentTarget.dataset.done){
      wx.cloud.database().collection('task2')
    .doc(e.currentTarget.dataset.id)
    .update({
      data:{
        done:false
      }
    
    })
    .then(res=>{
      // wx.showToast({
      //   title: 'Tap Check',
      //   icon:"success",
      //   duration:1000
      // })
      wx.vibrateShort()
      this.Refresh()
    })
    .catch(res=>{
      console.log("修改失败",res)
    })
    }else{
      wx.cloud.database().collection('task2')
    .doc(e.currentTarget.dataset.id)
    .update({
      data:{
        done:true
      }
    
    })
    .then(res=>{
      // wx.showToast({
      //   title: 'Tap Check',
      //   icon:"success",
      //   duration:1000
      // })
      wx.vibrateShort()
      this.Refresh()
    })
    .catch(res=>{
      console.log("修改失败",res)
    })
    }
    
    
  },
  //跳转到商品详情页
  seeDetail:function(e){
    console.log("点击了跳转操作",e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../items/items?id=' + e.currentTarget.dataset.id,
    })
  },

  touchstart: function (e) {
    //开始触摸时 重置所有删除
    let data = app.touch._touchstart(e, this.data.list) //将修改过的list setData
    this.setData({
      list: data
    })
  },

  //滑动事件处理
  touchmove: function (e) {
    let data = app.touch._touchmove(e, this.data.list,'_id')//将修改过的list setData
    this.setData({
      list: data
    })
  },
})

