const util = require('../../utils/util.js')
const url = require('../../utils/base.js').url

// pages/about_us/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    listData: []
  },
  bindDateChange(e) {
    let that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        that.getWrongsList(res.data.id, e.detail.value)
      },
    })
  },
  todetail:function(event){
    var data = (event.currentTarget.dataset)
    wx.navigateTo({
      url: '/pages/wrong/wrongDetail/index?userId='+data.userid+'&bankId='+data.bankid
    })
  },
  getWrongsList:function(userId,date){
    let that = this;
    wx.request({
      url: url+'/wrongs/getWrongsList',
      data: {
        userId: userId,
        examtime:date
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data[0].examtime!=null){
          that.setData({
            listData: res.data
          })
        }else{
          that.setData({
            listData: []
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    var TIME = util.formatDate(new Date());
    this.setData({
      date: TIME
    });
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        that.getWrongsList(res.data.id, '')
      },
    })
    
  }
})