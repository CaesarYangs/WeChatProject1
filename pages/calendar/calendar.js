// pages/calendar/calendar.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    calendarConfig: {
      multi: false, // 是否开启多选,
      weekMode: false, // 周视图模式
      theme: 'elegant', // 日历主题，目前共两款可选择，默认 default 及 elegant，自定义主题在 theme 文件夹扩展
      showLunar: false, // 是否显示农历，此配置会导致 setTodoLabels 中 showLabelAlways 配置失效
      inverse: true, // 单选模式下是否支持取消选中,
      chooseAreaMode: false, // 开启日期范围选择模式，该模式下只可选择时间段
      markToday: '今', // 当天日期展示不使用默认数字，用特殊文字标记
      // defaultDay: '2018-3-6', // 默认选中指定某天；当为 boolean 值 true 时则默认选中当天，非真值则在初始化时不自动选中日期，
      highlightToday: true, // 是否高亮显示当天，区别于选中样式（初始化时当天高亮并不代表已选中当天）
      takeoverTap: false, // 是否完全接管日期点击事件（日期不会选中），配合 onTapDay() 使用
      preventSwipe: false, // 是否禁用日历滑动切换月份
      firstDayOfWeek: 'Mon', // 每周第一天为周一还是周日，默认按周日开始
      onlyShowCurrentMonth: false, // 日历面板是否只显示本月日期
      hideHeadOnWeekMode: false, // 周视图模式是否隐藏日历头部
      showHandlerOnWeekMode: true, // 周视图模式是否显示日历头部操作栏，hideHeadOnWeekMode 优先级高于此配置
      
    },
    nowSelectedDate:null,
    nowSelectedMonth:null,
    nowSelectedYear:null,
    tap:false,
    Date:null,
    clist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    wx.cloud.database().collection('task2').get() 
        .then(res=>{
          console.log("请求成功",res)
          this.setData({
            
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
  cancelTap:function(){
    this.setData({
      tap:false
    })
    app.globalData.Date = null
  },
  doTap:function() {
    
    const selectedDay = this.calendar.getSelectedDay();
    var day;
    var mon;
    var year;
    day = selectedDay[0].day;
    mon = selectedDay[0].month;
    year = selectedDay[0].year;

    if(mon<10){
      mon = '0'+mon;
    }

    app.globalData.nowSelectedDate = day;
    app.globalData.nowSelectedMonth = mon;
    app.globalData.nowSelectedYear = year;
   
    console.log(app.globalData.nowSelectedDate)
    // console.log(this.data.nowSelectedMonth)
    // console.log(this.data.nowSelectedYear)
    
    // calendar.jump({year:2018, month:6, date:6})
    this.setData({
      tap:true,
    })
    app.globalData.Date=year+'-'+mon+'-'+day;
    console.log(app.globalData.Date)
    this.getData()
  },

  getData:function(){
    wx.cloud.database().collection('task2')
    .where({
      taskdate:app.globalData.Date
    })
    .get()
    .then(res=>{
      console.log("请求成功",res)
      this.setData({
        clist: res.data
      })
    })
    .catch(err=>{
      console.log("请求成功",err)
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
  Refresh: function(){
    wx.cloud.database().collection('task2')
    .where({
      taskdate:app.globalData.Date
    })
    .get()
    .then(res=>{
      console.log("请求成功",res)
      this.setData({
        clist: res.data
      })
    })
    .catch(err=>{
      console.log("请求失败",err)
    })
  },
  
  

})