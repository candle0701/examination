const url = require('../../../utils/base.js').url
// pages/answer/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    choiceList: [],
    rightimg:'http://img3.imgtn.bdimg.com/it/u=2073212123,362606884&fm=200&gp=0.jpg',
    wrongimg:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2190694592,3659767110&fm=26&gp=0.jpg"
  },

  /*
  *
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
      wx.request({
        url: url+'/choice/getDoneAnswer',
        data: {
          bankId: options.bankId,
          userId: options.userId
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
            that.setData({
              choiceList: res.data
            })
        }
      })
  }
})