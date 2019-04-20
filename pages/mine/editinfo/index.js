const url = require('../../../utils/base.js').url
// pages/mine/editinfo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfoList:[],
    // region: []
  },
  // bindRegionChange(e) {
  //   this.setData({
  //     region: e.detail.value
  //   })
  // },
  formSubmit:function(e){
    var that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function (reso) {  
        console.info(reso)
        wx.showModal({
          content: '确认要提交吗?',
          success(res) {
            if (res.confirm) {
              wx.request({
                url: url + '/userinfo/updateByPrimaryKeySelective',
                data: {
                  nickname: e.detail.value.nickname,
                  address: e.detail.value.address,
                  age: e.detail.value.age,
                  grade: e.detail.value.grade,
                  telephone: e.detail.value.telephone,
                  gender: e.detail.value.gender,
                  // province: e.detail.value.province_city_area[0] == '请选择' ? '' : e.detail.value.province_city_area[0],
                  // city: e.detail.value.province_city_area[1] == undefined ? '' : e.detail.value.province_city_area[1],
                  // area: e.detail.value.province_city_area[2] == undefined ? '' : e.detail.value.province_city_area[2],
                  id: reso.data[0].id,
                  img: reso.data[0].img
                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success(res3) {
                  console.info(res3)
                  wx.setStorage({
                    key: 'userinfo',
                    data: res3.data.list,
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
    let that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        wx.request({
          url: url + '/userinfo/selectByPrimaryKey',
          data: {
            id: res.data[0].id
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(data) {
            
            that.setData({
              userinfoList: data.data
              // region: regionArr
            })
          }
        })
      },
    })
  },
})