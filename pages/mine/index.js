// pages/product/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname:''
  },
  personalInformation:function(){
    wx.navigateTo({
      url: '/pages/mine/editinfo/index'
    })
  },
  aboutus:function(){
    wx.navigateTo({
      url: '/pages/mine/aboutus/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'userinfo',
      success: function(res) {
        that.setData({
          nickname: res.data.nickname
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        that.setData({
          nickname: res.data.nickname
        })
      },
    })
  }
})