const url = require('../../../utils/base.js').url
const agesArr = ['6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16']
const gradesArr = ['一', '二', '三', '四', '五', '六']
// pages/mine/editinfo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfoList:[],
    region: [],
    ageArr: ['6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'],
    gradeArr: ['一', '二', '三', '四', '五', '六'],
    ageIndex:0,
    gradeIndex:0
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
  formSubmit:function(e){
    var that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function (reso) {
        wx.showModal({
          content: '确认要提交吗?',
          success(res) {
            if (res.confirm) {
              wx.request({
                url: url + '/userinfo/updateByPrimaryKeySelective',
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
                  gradeIndex: e.detail.value.grade,
                  ageIndex: e.detail.value.age,
                  id: reso.data.id
                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success(res3) {
                  console.info(res3.data)
                  wx.setStorage({
                    key: 'userinfo',
                    data: res3.data,
                  })
                  wx.switchTab({
                    url: '/pages/mine/index',
                  })
                  wx.showToast({
                    title: '修改成功',
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
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ageArr: agesArr,
      gradeArr: gradesArr
    })  
    let that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        wx.request({
          url: url + '/userinfo/selectByPrimaryKey',
          data: {
            id: res.data.id
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(data) {
            let regionArr = []
            regionArr.push(data.data.province)
            regionArr.push(data.data.city)
            regionArr.push(data.data.area)
              that.setData({
                userinfoList: data.data,
                ageIndex:data.data.ageIndex,
                gradeIndex:data.data.gradeIndex,
                region: regionArr
              })
          }
        })
      },
    })
  },
})