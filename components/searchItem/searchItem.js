// components/searchItem/searchItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    searchData:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    backImgIsShow: true,
    url:null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    imgload(){
      this.setData({
        backImgIsShow: false
      })
    },
    imgerror(e){//删除未加载出来的图片
      let url = e.target.dataset.url;
      let arr = this.data.searchData;
      arr.forEach(item=>{
        if(item.url===url){
          item.url=""
        }
      })
      this.setData({
        searchData:arr
      })
    },
    searchItemClick(e){
      this.triggerEvent("storageHistory")
      wx.navigateTo({
        url: "../../pages/details/details",
        success(res) {
          res.eventChannel.emit('imgClick', {
            url: e.currentTarget.dataset.url
          })
        }
      })
    },
  }
})
