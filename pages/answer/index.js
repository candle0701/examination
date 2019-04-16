// pages/answer/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    choiceList:[{
      "choice_title":"昨天下雨了，一共多少滴？",
      "choice_a":"30",
      "choice_b":"60",
      "choice_c":"90",
      "choice_d":"1000",
      "choice_image1":"http://img2.imgtn.bdimg.com/it/u=3154322533,1786994993&fm=26&gp=0.jpg",
      "choice_sort": "1",
      "choice_answer": "A"
    },{
        "choice_title": "大象如何装进冰箱？",
        "choice_a": "打开冰箱门",
        "choice_b": "把大象塞进去",
        "choice_c": "关上冰箱门",
        "choice_d": "以上三个步骤缺一不可",
        "choice_image1": "",
        "choice_sort": "2",
        "choice_answer": "B"
      }, {
        "choice_title": "2019年NBA总冠军最终是哪支队伍？",
        "choice_a": "只能是勇士",
        "choice_b": "必须是勇士",
        "choice_c": "早晚都是勇士",
        "choice_d": "除了勇士就是勇士",
        "choice_image1": "",
        "choice_sort": "3",
        "choice_answer": "C"
      }, {
        "choice_title": "冰与火之歌一共拍了多少季？",
        "choice_a": "6",
        "choice_b": "7",
        "choice_c": "8",
        "choice_d": "9",
        "choice_image1": "",
        "choice_sort": "4",
        "choice_answer":"A"
      }, {
        "choice_title": "喝多少啤酒才能发胖？",
        "choice_a": "一杯",
        "choice_b": "一瓶",
        "choice_c": "一箱",
        "choice_d": "一车",
        "choice_image1": "",
        "choice_sort": "5",
        "choice_answer": "D"
      }]
  },

  /*
  *
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  formSubmit:function(e){
    var arrStr = JSON.stringify(e.detail.value);
    var arrStr = JSON.stringify(e.detail.value);
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    wx.showModal({
      content: '确认要提交吗?',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  radioChange: function(e){
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  }
})