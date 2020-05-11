// pages/updata/updata.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:[
      {
        time:"周一",
        cartoon:[]
      },
      {
        time: "周二",
        cartoon: []
      },
      {
        time: "周三",
        cartoon: []
      },
      {
        time: "周四",
        cartoon: []
      },
      {
        time: "周五",
        cartoon: []
      },
      {
        time: "周六",
        cartoon: []
      },
      {
        time: "周日",
        cartoon: []
      }
    ],
    url:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    let data=this.data.date;
    data.forEach((item,index,arr)=>{
      this.methods.getData(this, "new", index).then(res => {
      item.cartoon=res;
       this.setData({
         date:data
       })
      })
    })
  },
  methods: {
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