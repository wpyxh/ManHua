// pages/read/read.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartoon: [],//整部漫画
    cartoonData: [],//漫画章节
    isShowBtn: false,
    index: 0,
    toNum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('readData', function (data) {
      let url = data.readData[data.index].url;
      let index = data.index;
      _this.setData({
        cartoon: data
      })
      wx.setNavigationBarTitle({
        title: data.readData[data.index].num
      })
      _this.methods.getData(url).then(res => {
        let data = res.content;
        if (!data.list) {
          _this.setData({
            cartoonData: data,
            index: index
          })
        } else {
          _this.setData({
            cartoonData: data,
            index: index
          })
        }

      })
    })
  },
  methods: {
    getData(url) {
      return new Promise(function (resolve, reject) {
        wx.request({
          url: 'https://api.pingcc.cn/?xsurl2=' + url,
          data: {
            x: '',
            y: ''
          },
          method: 'GET',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            resolve(res.data)
          }
        })
      })
    }
  },
  lastClick() {
    let _this = this;
    let cartoon = this.data.cartoon;
    let index = this.data.index;
    console.log(cartoon)
    if (index > 0) {
      index = index - 1;
      let url = cartoon.readData[index].url;
      console.log(url)
      wx.setNavigationBarTitle({
        title: cartoon.readData[index].num
      })
      _this.methods.getData(url).then(res => {
        let data = res.content;
          _this.setData({
            cartoonData: data,
            index: index
          })
      })
    }
    this.setData({
      toNum:0
    })
  },
  nextClick() {
    let _this = this;
    let cartoon = this.data.cartoon;
    let index = this.data.index;
    if (index < cartoon.readData.length) {
      index = index + 1;
      let url = cartoon.readData[index].url;
      console.log(url)
      wx.setNavigationBarTitle({
        title: cartoon.readData[index].num
      })
      _this.methods.getData(url).then(res => {
        let data = res.content;
          _this.setData({
            cartoonData: data,
            index: index
          })
      })
    }
    this.setData({
      toNum: 0
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

  }
})