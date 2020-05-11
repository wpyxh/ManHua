// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: [
      { 
      url: "mhz214138",
      cover:"https://ae01.alicdn.com/kf/H10b0377d41274c1f828b4362773ea6bfM.jpg"
      },
      {
      url: "mhz214238",
      cover:"https://ae01.alicdn.com/kf/Hee73a772d81d4b559cd20902929e516bM.jpg"
      },
      {
      url: "mhz215415",
      cover:"https://ae01.alicdn.com/kf/H3a6667de15ff444c86238a8261fc10885.jpg"
      },
      {
      url: "mhz214705",
      cover:"https://ae01.alicdn.com/kf/H95c2630ecd8f483e8dcf7ef6acc2673bM.jpg"
      },
      {
      url: "https://www.u17.com/comic/192230.html",
      cover:"https://ae01.alicdn.com/kf/H9922f39a92a84696af722346a240a2fbQ.jpg"
      }
      ],
      navbar:[
        {
          title:'排行榜',
          path:'../../pages/ranking/ranking',
          url:"https://static.yzkimage.com/h5/images/icoPaihangbangN@2x.png?2"
        },
        {
          title: '探索',
          path: '../../pages/search/search',
        url:"https://ae01.alicdn.com/kf/Ha862837d438143af81c010c6b0a115a3x.jpg"
        },
        {
          title: '完结',
          path: '../../pages/category/category',
        url:"https://ae01.alicdn.com/kf/H3148f9b87c0341e3bd16e12f967728cfY.jpg"
        },
        {
          title: '连载',
          path: '../../pages/category/category',
          url: "https://static.yzkimage.com/h5/images/icoLianzaiN@2x.png"
        },
        {
          title: '分类',
          path: '../../pages/category/category',
          url: "https://static.yzkimage.com/h5/images/icofenleiN@2x.png"
        }
      ],
      yxhRecommendation:[],
      qitaoffer:0,
      tadayUpdata:[],
      tadayUpdataoffer:5,
      kongbu:[],
      kongbulingyioffer:1,
      shaonianrexue:[],
      shaonianrexueoffer:3,
      lianaishenghuo:[],
      lianaishenghuooffer:2,
      shaonvaiqing:[],
      shaonvaiqingoffer:3,
      baoxiaoxiju:[],
      baoxiaoxijuoffer:2,
      zhentantuili:[],
      zhentantuilioffer:1,
      url:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //https://images.weserv.nl/?url=http://api.pingcc.cn/?mhlb=new-1
    let _this = this;

    this.methods.getData(_this, "qita", this.data.qitaoffer).then(res => {
      _this.setData({
        yxhRecommendation: res
      })
    })

    this.methods.getData(_this, "new", this.data.tadayUpdataoffer).then(res => {
      _this.setData({
        tadayUpdata: res
      })
    })

    this.methods.getData(_this, "kongbulingyi", this.data.kongbulingyioffer).then(res => {
      _this.setData({
        kongbu: res
      })
    })

    this.methods.getData(_this, "shaonianrexue", this.data.shaonianrexueoffer).then(res=>{
      _this.setData({
        shaonianrexue: res
      })
    })

    this.methods.getData(_this, "lianaishenghuo", this.data.lianaishenghuooffer).then(res => {
      _this.setData({
        lianaishenghuo: res
      })
    })

    this.methods.getData(_this, "shaonvaiqing", this.data.shaonvaiqingoffer).then(res => {
      _this.setData({
        shaonvaiqing: res
      })
    })

    this.methods.getData(_this, "baoxiaoxiju", this.data.baoxiaoxijuoffer).then(res => {
      _this.setData({
        baoxiaoxiju: res
      })
    })


    this.methods.getData(_this, "zhentantuili", this.data.zhentantuilioffer).then(res => {
      _this.setData({
        zhentantuili: res
      })
    })
  },
  barItemClick(e) {
    let path=e.currentTarget.dataset.path;
    let title = e.currentTarget.dataset.title;
    wx.navigateTo({
      url: path,
      events: {

      },
      success(res) {
        res.eventChannel.emit('categorySele', {
          categorySele: title
        })
      }
    })
  },
  methods:{
    getData(_this,mhlb,offer){
      return new Promise(function (resolve, reject) {
      wx.request({
        url: 'https://api.pingcc.cn/?mhlb='+mhlb+'-'+offer,
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
  searchClick(){
    wx.navigateTo({
      url: '../../pages/search/search'
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