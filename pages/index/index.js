Page({
  data: {
    countDownList: [],
    actEndTimeList: [],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    bannerImgs: ['http://img95.699pic.com/element/40093/3725.png_300.png', 'http://img95.699pic.com/element/40097/0928.png_300.png', 'http://img95.699pic.com/element/40095/0197.png_300.png'],
    rankingList: [],
    startdate:"2018-04-16",
    enddate:"2018-04-16"
  },
  bindDateChange1(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startdate: e.detail.value
    })
  },
  bindDateChange2(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      enddate: e.detail.value
    })
  },
  onLoad: function() {
    var that = this;
    that.selectByDate()
  },
  selectByDate:function(){
    let that = this
    wx.request({
      url: 'http://localhost:8088/bank/selectByDate',
      data: {
        begin: '',
        end: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          rankingList:res.data
        })
      }
    })
  },
  toAnswer:function(){
    wx.navigateTo({
      url: '/pages/answer/index'
    })
  }
})