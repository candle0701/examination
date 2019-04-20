const url = require("../../utils/base.js").url
const md5 = require('../../utils/md5.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    errInfo:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  register:function(e){
    let that = this;
    let username = e.detail.value.username;
    let password = e.detail.value.password
    let passwordConfirm = e.detail.value.passwordConfirm;
    if (username.length > 0 && password.length > 0 && passwordConfirm.length > 0 ){
      if (password == passwordConfirm){
          wx.request({
            url: url+'/userinfo/register',
            header: {
              'content-type': 'application/json'
            },
            data:{
              username:username,
              password: md5.hexMD5(password)
            },
            success:function(res){
              if (res.data.status) {
                  wx.setStorage({
                    key: 'userinfo',
                    data: res.data.list,
                    success: function () {
                      wx.switchTab({  
                        url: '/pages/index/index',
                      })
                      wx.showToast({
                        title: res.data.msg,
                        icon: 'success',
                        duration: 2000
                      })
                    }
                  })
              }else{
                that.setData({
                  errInfo: res.data.msg
                })
              }
              
            }
          })
      }else{
        that.setData({
          errInfo:"两次输入密码不同"
        })
      }
    }else{
      that.setData({
        errInfo:"信息填写不完整"
      });
    }
  }
})