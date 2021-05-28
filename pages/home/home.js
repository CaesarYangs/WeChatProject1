// home.js
const App = getApp()
Page({
  /**
   * 页面的初始数据
   */
  
  data: {
    list:[],
    iconType: 'search',
    done:null
  },
  // 使文本框进入可编辑状态
  showInput: function () {
    this.setData({
      inputShowed: true   //设置文本框可以输入内容
    });
  },
  // 取消搜索
  hideInput: function () {
    this.setData({
      inputShowed: false
    });
  },
  searchDetail(){
    wx.navigateTo({
      url: '../search/search',
    })
  }, 
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
    // wx.cloud.database().collection('task2')
    //   wx.cloud.database().collection('task2')
    //   .where({
    //     _openid:App.globalData.openid
    //   })
    //   .get() 
    //     .then(res=>{
    //       console.log("请求成功",res)
    //       this.setData({
    //         list: res.data
    //       })
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
    let sql = "SELECT * FROM `mini1`.`tasks` WHERE `_openid`= "+'"'+App.globalData.openid+'"'
    wx.cloud.callFunction({
      name:'mysqlConnect',
      data:{
        sql:sql,
      },
      success: res=>{
        console.log(res.result.res[0])
        this.setData({
          list: res.result.res[0]
        })
      },
      fail: err =>{
        console.log('[云函数] [db-operator] 调用失败',err)
      }
    })
    })
    .catch(res=>{
      console.log("调用云函数失败",res)
    })
    
    // wx.request({
    //   url: 'https://panel.cyang.site/flowence/test.php',
    //   method:'get',
    //   data:{
    //     name:'yr'
    //   },
    //   header:{
    //     'content-type':'application/json'
    //   },
    //   success(res){
    //     console.log("与cy服务器建立连接"+res)
    //     console.log(res.data)
    //   },
    //   fail(err){
    //     console.log("连接失败"+res)
    //   }
    // })

    
    
    
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
    // this.onLoad()
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

  Refresh: function(){
    //v1.0.0使用微信云开发数据库
    // wx.cloud.database().collection('task2')
    // .where({
    //   _openid:App.globalData.openid
    // })
    // .get() 
    // .then(res=>{
    //   console.log("请求成功",res)
    //       this.setData({
    //         list: res.data
    //       })
    // })

    //v2.0.0使用自建服务器mysql数据库
    let sql = "SELECT * FROM `mini1`.`tasks` WHERE `_openid`= "+'"'+App.globalData.openid+'"'
    wx.cloud.callFunction({
      name:'mysqlConnect',
      data:{
        sql:sql,
      },
      success: res=>{
        console.log(res.result.res[0])
        this.setData({
          list: res.result.res[0]
        })
      },
      fail: err =>{
        console.log('[云函数] [db-operator] 调用失败',err)
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
      // wx.cloud.database().collection('task2')
      // .where({
      //   _openid:App.globalData.openid
      // })
      // .get() 
      //   .then(res=>{
      //     console.log("请求成功",res)
      //     this.setData({
      //       list: res.data
      //     })
          
      //   })
      //   .catch(err=>{
      //     console.log("请求成功",err)
      //   })


        let sql = "SELECT * FROM `mini1`.`tasks` WHERE `_openid`= "+'"'+App.globalData.openid+'"'
        wx.cloud.callFunction({
          name:'mysqlConnect',
          data:{
            sql:sql,
          },
          success: res=>{
            console.log(res.result.res[0])
            this.setData({
              list: res.result.res[0]
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
      url: '../items/items?id=' + e.currentTarget.dataset.id,
    })
  },

  touchstart: function (e) {
    //开始触摸时 重置所有删除
    let data = App.touch._touchstart(e, this.data.list) //将修改过的list setData
    this.setData({
      list: data
    })
  },

  //滑动事件处理
  touchmove: function (e) {
    let data = App.touch._touchmove(e, this.data.list,'_id')//将修改过的list setData
    this.setData({
      list: data
    })
  },

  //删除事项
  deleteItem:function(e){
    //v1.0.0使用云开发数据库
    // wx.cloud.database().collection('task2')
    // .doc(e.currentTarget.dataset.id)
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
    var that = this;
    //v1.0.0连接微信云开发数据库
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
    //   wx.showToast({
    //     title: 'Tap Check',
    //     icon:"success",
    //     duration:1000
    //   })
    //   wx.vibrateShort()
    //   this.Refresh()
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
    //   wx.showToast({
    //     title: 'Tap Check',
    //     icon:"success",
    //     duration:1000
    //   })
    //   wx.vibrateShort()
    //   this.Refresh()
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
    
    
  }
  
})
