const util = require('../../utils/util.js')
const url = require('../../utils/base.js').url

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
    startdate:"",
    enddate:"",
    listArea:true,
    nothingArea:false
  },
  bindDateChange1(e) {
    this.setData({
      startdate: e.detail.value
    })
    this.startdate = e.detail.value
  },
  bindDateChange2(e) {
    this.setData({
      enddate: e.detail.value
    })
    this.enddate = e.detail.value
  },
  searchByTime: function(){
    let that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        that.selectByDate(that.startdate, that.enddate, res.data.id);
      },
    })
  },
  onLoad: function() {
    var TIME = util.formatDate(new Date());
    this.setData({
      startdate: TIME,
      enddate: TIME
    });

    this.startdate = TIME;
    this.enddate = TIME;

    let that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        that.selectByDate('', '', res.data.id);
      },
    })
  },
  onShow:function(){
    var TIME = util.formatDate(new Date());

    this.setData({
      startdate: TIME,
      enddate: TIME
    });
    
    this.startdate = TIME;
    this.enddate = TIME;

    let that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        that.selectByDate('', '', res.data.id);
      },
    })
  },
  selectByDate: function (startdate, enddate, userId){
    if(startdate > enddate){
      wx.showModal({
        content: '开始时间必须小于结束时间！'
      })
      return;
    }

    let that = this
    wx.request({
      url: url+'/bank/selectByDate',
      data: {
        begin: startdate,
        end: enddate,
        userId: userId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if(res.data.length > 0){
          that.setData({
            listArea: true,
            nothingArea: false,
            rankingList: res.data
          })
        }else{
          that.setData({
            listArea: false,
            nothingArea: true
          })
        }
      }
    })
  },
  toAnswer:function(event){
    var data =  (event.currentTarget.dataset)
    wx.navigateTo({
      url: '/pages/answer/index?examtime='+data.examtime+'&grade='+data.grade+'&bankid='+data.id+'&ifdone='+data.ifdone
    })
  }
})