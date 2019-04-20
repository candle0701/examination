// pages/product/index.js
const img = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555758474537&di=42b173b087280fb382d9ca41ea5ac7e8&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F02%2F84%2F66%2F5a5ddb9bb94f4_610.jpg'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wximg:'',
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
          nickname: res.data[0].nickname,
          wximg: res.data[0].img == 'null' ? img : res.data[0].img
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
          nickname: res.data[0].nickname,
          wximg: res.data[0].img == 'null' ?img:res.data[0].img
        })
      },
    })
  }
})