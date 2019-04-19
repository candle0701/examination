const url = require("../../utils/base.js").url
const agesArr = ['6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16']
const gradesArr = ['一', '二', '三', '四', '五', '六']
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['河南省', '许昌市', '魏都区'],
    ageArr: [],
    gradeArr: [],
    ageIndex: 0,
    gradeIndex: 0
  },
  bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  bindAgeChange(e) {
    this.setData({
      ageIndex: e.detail.value
    })
  },
  bindGradeChange(e) {
    this.setData({
      gradeIndex: e.detail.value
    })
  },
  formSubmit: function (e) {
    var that = this;
    wx.showModal({
      content: '确认要提交吗?',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: url + '/userinfo/insertSelective',
            data: {
              nickname: e.detail.value.nickname,
              address: e.detail.value.address,
              age: agesArr[e.detail.value.age],
              grade: gradesArr[e.detail.value.grade],
              telephone: e.detail.value.telephone,
              gender: e.detail.value.gender,
              province: e.detail.value.province_city_area[0],
              city: e.detail.value.province_city_area[1],
              area: e.detail.value.province_city_area[2],
              gradeIndex:e.detail.value.grade,
              ageIndex:e.detail.value.age
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              wx.setStorage({
                key: 'userinfo',
                data: res.data,
              })
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.getStorage({
      key: 'userinfo',
      success: function(res) {
          wx.switchTab({
            url: '/pages/index/index',
          })
      },
      fail:function(){
        that.setData({
          ageArr: agesArr,
          gradeArr: gradesArr
        })
      }
    })
    
  },

})