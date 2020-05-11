// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotSearch:[],
    searchData:[],
    searchValue:'',
    searchHistory:[],
    history:[],
    start:1,
    end:10,
    timer:null,
    a:null,
    url:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this=this;

    this.methods.getData("mhlb=", "riben","-1").then(res => {
      this.setData({
        hotSearch:res 
      })
    })
  },
  onShow(){
    let _this=this
    wx.getStorage({
      key: 'searchHistory',
      success(res) {
        _this.setData({
          history: res.data
        })
      }
    })
  },
  methods: {
    getData(urlname, mhlb, offer='') {
      return new Promise(function (resolve, reject) {
        wx.request({
          url: 'https://api.pingcc.cn/?' + urlname + mhlb + offer,
          method: 'GET',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            resolve(res.data.list)
          }
        })
      })
    },
    gethistory(_this){
      wx.getStorage({
        key: 'searchHistory',
        success(res) {
          _this.setData({
            history:res.data
          })
        }
      })
    }
  },
  debounce(fun, delay) {
    return ()=>{
      clearTimeout(this.data.timer)
      this.data.timer = setTimeout(fun,delay)
    }
  },
  refreshHot(){
    if (this.data.end < this.data.hotSearch.length){
      this.setData({
        start: this.data.start + 10,
        end: this.data.end + 10,
      })
    }else{
      this.setData({
        start: 1,
        end: 10,
      })
    }
  },
  input(e){
    this.setData({
      searchValue: e.detail.value
    })
    this.debounce(()=>{
      if (e.detail.value){
        this.methods.getData("mhname=", e.detail.value).then(res => {
          this.setData({
            searchData:res
          })
        })
      }else{
        this.setData({
          searchData: null
        })
      }
    },1000)();
  },
  clearClick(){
    this.setData({
      searchValue:''
    })
  },
  cancleClick(){
    wx.switchTab({
      url: '/pages/home/home'
    })
  },
  storageHistory(){
    let _this=this;


    wx.getStorage({
      key: 'searchHistory'
    })
    try {
      var value = wx.getStorageSync('searchHistory')
      if (value) {
        _this.setData({
          searchHistory: value,
          history:value
        })
      }
    } catch (e) {
      // Do something when catch error
    }

    if(this.data.searchHistory===""){
      let data=[];
      wx.setStorage({
        key: 'searchHistory'
      })
      try {
        wx.setStorageSync('searchHistory', data)
      } catch (e) { }
    }else{
      wx.setStorage({
        key: 'searchHistory'
      })
      try {
        let data = this.data.searchHistory;
        data.unshift(this.data.searchValue);
        data = [...new Set(data)]
        wx.setStorageSync('searchHistory', data)
      } catch (e) { }
    }
  },
  removeHistory(){
    this.setData({
      history:[],
    })

    wx.removeStorage({
      key: 'searchHistory'
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
  historyClick(e){
    this.setData({
      searchValue: e.currentTarget.dataset.histext
    })
    this.methods.getData("mhname=", this.data.searchValue).then(res => {
      this.setData({
        searchData: res
      })
    })
  }
})