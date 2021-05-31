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
  Refresh:function(){
    var that = this;
    let key = that.data.searchtitle;
    this.setData({
      list:[]
    })
    //v2.0.0使用自建服务器mysql数据库
    let sql = "SELECT * FROM `mini1`.`tasks` WHERE `_openid`= "+'"'+app.globalData.openid+'"'+"AND `taskname` LIKE "+"'%"+key+"%'"
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
          list: list,
        })
         
      },
      fail: err =>{
        console.log('[云函数] [db-operator] 调用失败',err)
      }
    })
  },

  search:function(){
    
    var that = this;
    let key = that.data.searchtitle;
    this.setData({
      list:[]
    })

    // const db = wx.cloud.database()
    // wx.cloud.database().collection('task2')
    // .where({
    //   _openid:app.globalData.openid,
    //   taskname: db.RegExp({
    //     regexp:'.*'+ key,
    //     options:'i'
    //   })
    // })
    // .get() 
    //   .then(res=>{
    //     console.log("请求成功",res)
    //     this.setData({
    //       list: res.data,
    //     })
        
    //   })
    //   .catch(err=>{
    //     console.log("请求成功",err)
    //   })
     //v2.0.0使用自建服务器mysql数据库
     let sql = "SELECT * FROM `mini1`.`tasks` WHERE `_openid`= "+'"'+app.globalData.openid+'"'+"AND `taskname` LIKE "+"'%"+key+"%'"
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
           list: list,
         })
          
       },
       fail: err =>{
         console.log('[云函数] [db-operator] 调用失败',err)
       }
     })
  },
  //删除事项
  deleteItem:function(e){
    // wx.cloud.database().collection('task2')
    // .doc(e.currentTarget.dataset.id)
    // .remove()
    // .then(res=>{
    //   this.search()
    //   wx.showToast({
    //     title: '删除成功',
    //     icon:"success",
    //     duration:1000
    //   })
    // })
    // .catch(res=>{
    //   console.log(res)
    //   wx.showToast({
    //     title: '删除失败',
    //     duration:1000
    //   })
    // })

    //v2.0.0使用自建服务器mysql数据库
    let sql = "DELETE FROM `mini1`.`tasks` WHERE `_id`=" +e.currentTarget.dataset.id;
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
        
      },
      fail: err =>{
        console.log('[云函数] [db-operator] 调用失败',err)
      }
    })
    
  },
  checkMove:function(e){
    // wx.cloud.database().collection('task2')
    // if(e.currentTarget.dataset.done){
    //   wx.cloud.database().collection('task2')
    // .doc(e.currentTarget.dataset.id)
    // .update({
    //   data:{
    //     done:false
    //   }
    
    // })
    // .then(res=>{
    //   // wx.showToast({
    //   //   title: 'Tap Check',
    //   //   icon:"success",
    //   //   duration:1000
    //   // })
    //   wx.vibrateShort()
    //   this.search()
    // })
    // .catch(res=>{
    //   console.log("修改失败",res)
    // })
    // }else{
    //   wx.cloud.database().collection('task2')
    // .doc(e.currentTarget.dataset.id)
    // .update({
    //   data:{
    //     done:true
    //   }
    
    // })
    // .then(res=>{
    //   // wx.showToast({
    //   //   title: 'Tap Check',
    //   //   icon:"success",
    //   //   duration:1000
    //   // })
    //   wx.vibrateShort()
    //   this.search()
    // })
    // .catch(res=>{
    //   console.log("修改失败",res)
    // })
    // }
    //v2.0.0连接自建服务器mysql数据库

    let sql = "UPDATE `mini1`.`tasks` SET `done` = "+!e.currentTarget.dataset.done+" WHERE `_id` =" +e.currentTarget.dataset.id;
    wx.cloud.callFunction({
      name:'mysqlConnect',
      data:{
        sql:sql,
      },
      success: res=>{
        this.Refresh()
        wx.vibrateShort()
           wx.showToast({
            title: '修改成功',
            icon:"success",
            duration:1000
          })
        
      },
      fail: err =>{
        console.log('[云函数] [db-operator] 调用失败',err)
      }
    })
    
    
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

