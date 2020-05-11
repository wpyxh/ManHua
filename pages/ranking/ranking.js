// pages/ranking/ranking.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rankingTitle:[
      {
        title:"人气榜",
        data:"hot"
      },
      {
        title: "完结榜",
        data: "wanjie"
      },
      {
        title: "新作榜",
        data: "lianzai"
      },
      {
        title: "男生榜",
        data: "wuxiagedou"
      },
      {
        title: "女生榜",
        data: "lianaishenghuo"
      },
      {
        title: "畅销榜",
        data: " shenghuomanhua"
      }],
    isActive:0,
    cartoonData:[],
    url:null,
  },
  barItemClick(e){
    this.setData({
      isActive: e.currentTarget.dataset.index
    })

    this.methods.getData(this, e.currentTarget.dataset.mhlb,3).then(res => {
      this.setData({
        cartoonData: res
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this=this;
    wx.setNavigationBarTitle({
      title: "排行榜"
    })
    this.methods.getData(_this, "hot", 3).then(res => {
      _this.setData({
        cartoonData: res
      })
    })
  },
  imgClick(e) {
    wx.navigateTo({
      url: "../../pages/details/details",
      success(res) {
        res.eventChannel.emit('imgClick', {
          url: e.currentTarget.dataset.url
        })
      }
    })
  },

  methods:{
    getData(_this, mhlb, offer) {
      return new Promise(function (resolve, reject) {
        wx.request({
          url: 'https://api.pingcc.cn/?mhlb=' + mhlb + '-' + offer,
          data: {
            x: '',
            y: ''
          },
          method: 'GET',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            resolve(res.data.list)
          }
        })
      })
    }
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