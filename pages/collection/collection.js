// pages/collection/collection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isTabACtive:1,
    isCollShow: 1,
    collData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  methods: {
    getData(url) {
      return new Promise(function (resolve, reject) {
        wx.request({
          url: 'https://api.pingcc.cn/?mhurl1=' + url,
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
  collClick(){
      this.setData({
        isTabACtive:1
      })
  },
 histClick() {
      this.setData({
        isTabACtive: 2
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
    let _this = this;
    let colldata = [];
    wx.getStorage({
      key: 'collection',
      success: function (res) {
        let url = res.data;
        for (let n = 0; n < url.length; n++) {
          _this.methods.getData(url[n]).then(res => {
            let collinfo = res.data;
            collinfo.url = url[n];
            colldata.push(collinfo);
            _this.setData({
              collData: colldata
            })
          })
        }
      },
    })
  },
  imgLoad(){
      this.setData({
        isCollShow:2
      })
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