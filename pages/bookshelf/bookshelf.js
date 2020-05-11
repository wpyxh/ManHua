// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchData: [],
    searchValue: '',
    timer:null,
    isShow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: 'yxh小说'
    })
  },
  onShow() {

  },
  methods: {
    getData(xsname) {
      return new Promise(function (resolve, reject) {
        wx.request({
          url: 'https://api.pingcc.cn/?xsname=' + xsname,
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
  debounce(fun, delay) {
    return () => {
      clearTimeout(this.data.timer)
      this.data.timer = setTimeout(fun, delay)
    }
  },
  input(e) {
    this.setData({
      searchValue: e.detail.value
    })
    this.debounce(() => {
      if (e.detail.value) {
        this.methods.getData(e.detail.value).then(res => {
          console.log(e.detail.value,res)
          this.setData({
            searchData: res,
            isShow:true
          })
        })
      } else {
        this.setData({
          searchData: null,
          isShow: false
        })
      }
    }, 1000)();
  },
  clearClick() {
    this.setData({
      searchValue: '',
      searchData: null,
      isShow: false
    })
  }
})