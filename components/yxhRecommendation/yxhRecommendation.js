// components/yxhRecommendation/yxhRecommendation.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    yxhRecommendation:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    startNumber:1,
    endNumber:6
  },

  /**
   * 组件的方法列表
   */
  methods: {
    yxhRecommendtionMore(){
      let _this=this;
      wx.navigateTo({
        url:"../../pages/more/more",
        events:{

        },
        success(res){
          res.eventChannel.emit('cartoonMore', { 
            cartoonData: _this.properties.yxhRecommendation,
            moreTitle:"yxh推荐"
          })
        }
      })
    },
    change(){
      if (this.data.endNumber<96){
        this.setData({
          startNumber: this.data.startNumber += 6,
          endNumber: this.data.endNumber += 6,
        })
      }else{
        this.setData({
          startNumber: this.data.startNumber = 1,
          endNumber: this.data.endNumber = 6
        })
      }
    },
    imgClick(e){
      wx.navigateTo({
        url: "../../pages/details/details",
        success(res) {
          res.eventChannel.emit('imgClick', {
            url: e.currentTarget.dataset.url
          })
        }
      })
    }
  }
})
