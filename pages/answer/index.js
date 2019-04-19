const url = require('../../utils/base.js').url

Page({

  /**
   * 页面的初始数据
   */
  data: {
    choiceList:[],
    nothing:false,
    exist:true,
    examTime:"",
    bankId:'',
    ifdone:true
  },

  /*
  *
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let userId = ''
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        userId = res.data.id
        if (options.ifdone == 'true') {
          wx.request({
            url: url + '/choice/getDoneAnswer',
            data: {
              bankId: options.bankid,
              userId: userId
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              if (res.data.length > 0) {
                that.setData({
                  choiceList: res.data,
                  nothing: false,
                  exist: true,
                  ifdone: false
                })
              } else {
                that.setData({
                  choiceList: res.data,
                  nothing: true,
                  exist: false
                })
              }
            }
          })
        } else {
          wx.request({
            url: url + '/choice/selectByDateAndGrade',
            data: {
              examTime: options.examtime,
              grade: options.grade
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              that.ifdone = true
              if (res.data.length > 0) {
                that.setData({
                  choiceList: res.data,
                  nothing: false,
                  exist: true,
                  ifdone: true
                })
              } else {
                that.setData({
                  choiceList: res.data,
                  nothing: true,
                  exist: false
                })
              }
            }
          })
        }
      },
    })
    that.examTime = options.examtime;
    that.bankId = options.bankid;
    that.setData({
      ifdone:options.ifdone
    })
  },
  formSubmit:function(e){
    var that = this;
    let userId = ''
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        userId = res.data.id
      },
    })
    wx.showModal({
      content: '确认要提交吗?',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: url+'/wrongs/insertSelective',
            data: {
              str: e.detail.value,
              userId: userId,
              examtime:that.examTime,
              bankId:that.bankId
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              wx.switchTab({
                url: '/pages/index/index',
              })
              wx.showToast({
                title: '提交成功',
                icon: 'success',
                duration: 2000
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        } 
      }
    })
  }
})