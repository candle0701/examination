let rankList = [{ "id": 1, "title": "五年级练习", "introduction": "2019年夏季班语文同步练习期末冲刺", "price": "许昌学院校区", "url": "http://img95.699pic.com/element/40093/3731.png_300.png", "paynums": "158", "sort": "04-18 17:00", "actEndTime": '2019/05/01 10:00:43' }, { "id": 2, "title": "五年级练习", "introduction": "2019年夏季班语文同步练习期末冲刺", "price": "许昌学院校区", "url": "http://img95.699pic.com/element/40093/3731.png_300.png", "paynums": "158", "sort": "04-18 17:00", "actEndTime": '2019/05/01 10:00:43' }, { "id": 1, "title": "五年级练习", "introduction": "2019年夏季班语文同步练习期末冲刺", "price": "许昌学院校区", "url": "http://img95.699pic.com/element/40093/3731.png_300.png", "paynums": "158", "sort": "04-18 17:00", "actEndTime": '2019/05/01 10:00:43' }, { "id": 1, "title": "五年级练习", "introduction": "2019年夏季班语文同步练习期末冲刺", "price": "许昌学院校区", "url": "http://img95.699pic.com/element/40093/3731.png_300.png", "paynums": "158", "sort": "04-18 17:00", "actEndTime": '2019/05/01 10:00:43' }, { "id": 1, "title": "五年级练习", "introduction": "2019年夏季班语文同步练习期末冲刺", "price": "许昌学院校区", "url": "http://img95.699pic.com/element/40093/3731.png_300.png", "paynums": "158", "sort": "04-18 17:00", "actEndTime": '2019/05/01 10:00:43' }]
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
    rankingList:[]
  },
  onLoad: function() {
    let endTimeList = [];
    // 将活动的结束时间参数提成一个单独的数组，方便操作
    rankList.forEach(o => { endTimeList.push(o.actEndTime) })
    this.setData({ actEndTimeList: endTimeList,rankingList: rankList });
    // 执行倒计时函数
    this.countDown();
  },
  timeFormat(param) {//小于10的格式化函数
    return param < 10 ? '0' + param : param;
  },
  countDown() {//倒计时函数
    // 获取当前时间，同时得到活动结束时间数组
    let newTime = new Date().getTime();
    let endTimeList = this.data.actEndTimeList;
    let countDownArr = [];

    // 对结束时间进行处理渲染到页面
    endTimeList.forEach(o => {
      let endTime = new Date(o).getTime();
      let obj = null;
      // 如果活动未结束，对时间进行处理
      if (endTime - newTime > 0) {
        let time = (endTime - newTime) / 1000;
        // 获取天、时、分、秒
        let day = parseInt(time / (60 * 60 * 24));
        let hou = parseInt(time % (60 * 60 * 24) / 3600);
        let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
        let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
        obj = {
          day: this.timeFormat(day),
          hou: this.timeFormat(hou),
          min: this.timeFormat(min),
          sec: this.timeFormat(sec)
        }
      } else {//活动已结束，全部设置为'00'
        obj = {
          day: '00',
          hou: '00',
          min: '00',
          sec: '00'
        }
      }
      countDownArr.push(obj);
    })
    // 渲染，然后每隔一秒执行一次倒计时函数
    this.setData({ countDownList: countDownArr })
    setTimeout(this.countDown, 1000);
  },
  toAnswer:function(){
    wx.navigateTo({
      url: '/pages/answer/index'
    })
  }
})