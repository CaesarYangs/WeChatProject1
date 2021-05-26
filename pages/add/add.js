// pages/add/add.js
var util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    taskNote:'',
    inputTaskName: '',
    taskDate:'',
    titleEmpty: true,
    winHeight:"",//窗口高度
    currentTab:1, //预设当前项的值
    scrollLeft:0, //tab标题的滚动条位置
    ani:null,
    selectTime:0,
    flowtitle:'',
    flowmark:'',
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
    var note= this.data.taskNote
    console.log(title)


    wx.cloud.database().collection('task2')
    .add({
      data:{
        taskname:title,
        taskdate:date,
        tasknote:note,
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

    if(date){
      this.subscribe()
    }
    
  },
  inputTitle: function (e) {
    this.setData({
      title: e.detail.value
    })
  },
  inputTaskNote:function(e){
    this.setData({
      taskNote:e.detail.value
    })
  },

  clearTitle: function () {
    this.setData({
      title: '',
      taskNote:'',
      selectTime:0,
      titleEmpty: true
    })
  },

  clearFlow:function(){
    this.setData({
      flowtitle:'',
      flowmark:''
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
      taskDate: e.detail.value,
      selectTime:3
     })
  },

  bindNone:function(){
    this.setData({
      selectTime:0,
      taskDate:''
    })
  },

  bindToday:function(){
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    var Y =date.getFullYear();
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    this.setData({
      selectTime:1,
      taskDate:Y+'-'+M+'-'+D
    })
  },
  bindTommorow:function(){
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    var Y =date.getFullYear();
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    ++D;
    this.setData({
      selectTime:2,
      taskDate:Y+'-'+M+'-'+D
    })
  },
  start:function(){
    var animation = wx.createAnimation({
      duration: 2000,
        delay: 0,
        timingFunction: "linear",
    });
    animation.translate($width, 0).rotate($deg);
    animation.step();
    this.setData({
      ani:  animation.export()
    })
  },
  inputFlow:function(e){
    this.setData({
      flowtitle: e.detail.value
    })
  },
  inputflowMark:function(e){
    this.setData({
      flowmark:e.detail.value
    })
  },
  addFlow:function(){
    var fflow = this.data.flowtitle
    var fmark = this.data.flowmark
    var time = util.formatTime(new Date());

    wx.cloud.database().collection('flow')
    .add({
      data:{
        time:time,
        flow:fflow,
        mark:'#'+fmark
      }
    })
    .then(res=>{
        console.log('添加成功',res)
        wx.showToast({
          title: '添加成功',
          icon:"success"
        })
        this.clearFlow()
    })
    .catch(res=>{
      console.log('添加失败',res)
      wx.showToast({
        title: '添加失败 请重试',
        icon:"loading"
      })
    })
  },

   // 滚动切换标签样式
   switchTab:function(e){
    this.setData({
        currentTab:e.detail.current
    });
    this.checkCor();
},
// 点击标题切换当前页时改变样式
swichNav:function(e){
    var cur=e.target.dataset.current;
    if(this.data.currentTaB==cur){return false;}
    else{
        this.setData({
            currentTab:cur
        })
    }
},
//判断当前滚动超过一屏时，设置tab标题滚动条。
checkCor:function(){
  if (this.data.currentTab>4){
    this.setData({
      scrollLeft:300
    })
  }else{
    this.setData({
      scrollLeft:0
    })
  }
},
onLoad: function() {  
    var that = this; 
    //  高度自适应
    wx.getSystemInfo( {  
        success: function( res ) {  
            var clientHeight=res.windowHeight,
                clientWidth=res.windowWidth,
                rpxR=750/clientWidth;
          var  calc=clientHeight*rpxR-180;
            console.log(calc)
            that.setData( {  
                winHeight: calc  
            });  
        }  
    });
},  
footerTap:app.footerTap,

subscribe:function(){
wx.requestSubscribeMessage({
  tmplIds: ['qSd6jESVwR_oZqMaUCuEJMJdxYEjQYjtFtNQpRKm9rM'],
  success(res){
    console.log("订阅成功"+res)
  },
  fail(err){
    console.log("订阅失败"+err)
  }
})

}
})