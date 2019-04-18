const util = require('../../utils/util.js')

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
    that.selectByDate(that.startdate, that.enddate);
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
    that.selectByDate('','');
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
    that.selectByDate('', '');
  },
  selectByDate:function(startdate,enddate){

    if(startdate > enddate){
      wx.showModal({
        content: '开始时间必须小于结束时间！'
      })
      return;
    }

    let that = this
    wx.request({
      url: 'http://localhost:8088/bank/selectByDate',
      data: {
        begin: startdate,
        end: enddate,
        userId:"001"
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