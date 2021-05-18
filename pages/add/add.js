// pages/add/add.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    inputTaskName: '',
    taskDate:'',
    titleEmpty: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var time = util.formatTime(new Date());
    this.setData({
      systemdate:time
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


  addTask:function(){
    
    var title = this.data.title
    var date = this.data.taskDate
    console.log(title)


    wx.cloud.database().collection('task2')
    .add({
      data:{
        taskname:title,
        taskdate:date,
        done:false
      }
    })
    .then(res=>{
        console.log('添加成功',res)
        wx.showToast({
          title: '添加成功',
          icon:"success"
        })
        this.clearTitle()
        this.clearDate()
    })
    .catch(res=>{
      console.log('添加失败',res)
      wx.showToast({
        title: '添加失败 请重试',
        icon:"loading"
      })
    })


    
  },
  inputTitle: function (e) {
    this.setData({
      title: e.detail.value
    })
  },

  clearTitle: function () {
    this.setData({
      title: '',
      titleEmpty: true
    })
  },

  clearDate:function(){
    this.setData({
      taskDate:''
    })
  },

  bindKeyInput: function (e) {
    this.setData({
      //inputTaskName: e.detail.value
    })
    console.log(e.detail.value)
  },

  bindDateChange:function(e){
    this.setData({
      taskDate: e.detail.value
     })
  }

})