// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartoonInfo: [],
    tabIndex: 1,
    anthology: [],
    daoxu: "章节倒序",
    carUrl: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('imgClick', function (data) {
      _this.setData({
        carUrl: data.url
      })
      _this.methods.getData(data.url).then(res => {
        if (!res.data && !res.list) {
          res = {
            data: {
              name: "暂无数据",
              introduce: "暂无数据",
              tag: "暂无数据",
              author: "暂无数据"
            },
            list: []
          }
        }
        let anthology = res.list.reverse();
        _this.setData({
          cartoonInfo: res,
          anthology: anthology
        })
      })
    })
  },
  methods: {
    getData(url) {
      return new Promise(function (resolve, reject) {
        wx.request({
          url: 'https://api.pingcc.cn/?xsurl1=' + url,
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
  tDetails() {
    this.setData({
      tabIndex: 1
    })
  },
  tAnthology() {
    this.setData({
      tabIndex: 2
    })
  },
  daoxuClick() {
    let anthology = this.data.anthology;
    anthology = anthology.reverse()
    if (this.data.daoxu === "章节倒序") {
      this.setData({
        daoxu: "章节正序",
        anthology: anthology
      })
    } else {
      this.setData({
        daoxu: "章节倒序",
        anthology: anthology
      })
    }
  },
  startRead() {
    let data = this.data.anthology;
    wx.navigateTo({
      url: "../../pages/bookread/bookread",
      success(res) {
        res.eventChannel.emit('readData', {
          readData: data,
          index: 0
        })
      }
    })
  },
  anthlogyClick(e) {
    let data = this.data.anthology;
    wx.navigateTo({
      url: "../../pages/bookread/bookread",
      success(res) {
        res.eventChannel.emit('readData', {
          readData: data,
          index: e.currentTarget.dataset.index
        })
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

  }
})