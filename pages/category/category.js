// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category:[
      {
        name: "全部",
        mhlb: "new"
      },
      {
        name:"少年热血",
        mhlb:"shaonianrexue"
      },
      {
        name: "武侠格斗",
        mhlb: "wuxiagedou"
      },
      {
        name: "恐怖灵异",
        mhlb: "kongbulingyi"
      },
      {
        name: "耽美人生",
        mhlb: "danmeirensheng"
      },
      {
        name: "少女爱情",
        mhlb: "shaonvaiqing"
      },
      {
        name: "恋爱生活 ",
        mhlb: "lianaishenghuo"
      },
      {
        name: "生活漫画",
        mhlb: "shenghuomanhua"
      },
      {
        name: "科幻魔幻",
        mhlb: "kehuanmohuan"
      },
      {
        name: "竞技体育",
        mhlb: "jingjitiyu"
      },
      {
        name: "爆笑喜剧",
        mhlb: "baoxiaoxiju"
      },
      {
        name: "大陆漫画",
        mhlb: "dalu"
      },
      {
        name: "日本漫画",
        mhlb: "riben"
      },
      {
        name: "韩国漫画",
        mhlb: "rihan"
      },
      {
        name: "香港漫画",
        mhlb: "gangtai"
      },
      {
        name: "台湾漫画",
        mhlb: "gangtai"
      },
      {
        name: "欧美漫画",
        mhlb: "oumei"
      },
    ],
    endSeries:[
      {
        name: "全部",
        mhlb: "new"
      },
      {
        name: "完结",
        mhlb: "wanjie"
      },
      {
        name: "连载",
        mhlb: "lianzai"
      },
    ],
    seleIndex:0,
    esIndex:0,
    cartoonData:[],
    url:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this=this;
    this.methods.getData(_this,"new", 2).then(res => {
      _this.setData({
        cartoonData: res
      })
    })

    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('categorySele', function (data) {
      if(data.categorySele==="完结"){
        _this.setData({
          esIndex: 1
        })
        _this.methods.getData(_this, "wanjie", 2).then(res => {
          _this.setData({
            cartoonData: res
          })
        })
      } else if (data.categorySele === "连载"){
        _this.setData({
          esIndex: 2
        })
        _this.methods.getData(_this, "lianzai", 2).then(res => {
          _this.setData({
            cartoonData: res
          })
        })
      }
    })
  },
  endSeriesClick(e){
    let _this = this;
    this.setData({
      esIndex: e.currentTarget.dataset.endseriesindex
    })

    this.methods.getData(_this, e.currentTarget.dataset.mhlb, 2).then(res => {
      _this.setData({
        cartoonData: res
      })
    })
  },
  categoryItemClick(e){
    let _this=this;
    this.setData({
      seleIndex: e.currentTarget.dataset.categoryindex
    })

    this.methods.getData(_this, e.currentTarget.dataset.mhlb, 2).then(res => {
      if(res===''){
        res=[
          {
            name: "暂无漫画"
          },
          {
            name:"暂无漫画"
          }
        ]
      }
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
  }


})