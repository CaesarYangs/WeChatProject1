const app = getApp()
Page({
  data: {},
  controlurl:function(e){
    var clickword = e.currentTarget.dataset.text;
    console.log(clickword)
    this.setData({
      click: clickword
    })
     //显示搜索中的提示
     wx.showLoading({
      title: '搜索中',
      icon: 'loading'
    })
    let that = this;
    wx.request({
      url: 'https://www.xxx.xxx/api/xcx_search.php?keyword='+clickword,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data[0].resname)
        that.setData({
          re: res.data
        })
        //搜索成功后，隐藏搜索中的提示
        wx.hideLoading();
      }
    })
},
  //执行点击事件
  formSubmit: function (e) {
    //声明当天执行的
    var that = this;
    //获取表单所有name=keyword的值
    var formData = e.detail.value.keyword;
    //显示搜索中的提示
    wx.showLoading({
      title: '搜索中',
      icon: 'loading'
    })
    //向搜索后端服务器发起请求
    wx.request({
      //URL
      url: 'https://www.xxx.xxx/api/xcx_search.php?keyword=' + formData,
      //发送的数据
      data: formData,
      //请求的数据时JSON格式
      header: {
        'Content-Type':'application/json'
      },
      //请求成功
      success: function (res) {
        //控制台打印（开发调试用）
        console.log(res.data)
        //把所有结果存进一个名为re的数组
        that.setData({
          re: res.data,
        })
        //搜索成功后，隐藏搜索中的提示
        wx.hideLoading();
      }
    })
  },
})

