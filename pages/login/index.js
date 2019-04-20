const base = require("../../utils/base.js")
const md5 = require('../../utils/md5.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    errInfo: ""
  },
  wx_userinfo:function(e){
    let img = e.detail.userInfo.avatarUrl
    let nickname = e.detail.userInfo.nickName
    let gender = e.detail.userInfo.gender
    if(gender==1){
      gender = '男'
    }else if(gender==0){
      gender = '女'
    }else{
      gender = ''
    }
    wx.login({
      success(res) {
        if (res.code) {
          // 发起网络请求
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              js_code: res.code,
              appid:base.appid,
              secret:base.secret,
              grant_type:'authorization_code'
            },
            success(res1){
              let openid = res1.data.openid
              let session_key = res1.data.session_key
              wx.request({
                url: base.url+'/userinfo/wxlogin',
                data:{
                  img:img,
                  nickname: nickname,
                  gender: gender,
                  openid: openid,
                  session_key: session_key
                },
                success(res2){
                  wx.setStorage({
                    key: 'userinfo',
                    data: res2.data.list
                  })
                  wx.switchTab({
                    url: '/pages/index/index',
                  })
                  wx.showToast({
                    title: '微信登陆成功',
                    duration:2000
                  })
                }
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
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
      success: function (res) {
        wx.switchTab({
          url: '/pages/index/index',
        })
      },
      fail: function () {
        
      }
    })
  },
  formSubmit: function (e) {
    let that = this;
    if(e.detail.value.username.length > 0 && e.detail.value.password.length > 0){
      wx.request({
        url: base.url + '/userinfo/login',
        data: {
          username: e.detail.value.username,
          password: md5.hexMD5(e.detail.value.password)
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          if (res.data.status) {
            wx.setStorage({
              key: 'userinfo',
              data: res.data.list[0],
            })
            wx.switchTab({
              url: '/pages/index/index',
            })
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 2000
            })
          } else {
            that.setData({
              errInfo: res.data.msg
            })
          }
        }
      })
    }else{
      that.setData({
        errInfo: '账号或密码输入为空！'
      })
    }
    
  },
  toRegister: function(){
    wx.navigateTo({
      url: "/pages/register/index"
    })
  }
})