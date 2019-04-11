// pages/about_us/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2016-09-01',
    listData: [
      { "code": "2016-09-01", "text": "2", "type": "点击查看" },
      { "code": "2016-09-01", "text": "2", "type": "点击查看" },
      { "code": "2016-09-01", "text": "3", "type": "点击查看" },
      { "code": "2016-09-01", "text": "4", "type": "点击查看" },
      { "code": "2016-09-01", "text": "5", "type": "点击查看" },
      { "code": "2016-09-01", "text": "2", "type": "点击查看" },
      { "code": "2016-09-01", "text": "1", "type": "点击查看" }
    ]

  },
  todetail:function(){
    wx.navigateTo({
      url: '/pages/answer/index'
    })
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

  }
})