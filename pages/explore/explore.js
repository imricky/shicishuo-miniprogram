// pages/explore/explore.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    spinning: true,
    dynasty: ['唐','宋','元','明','清'],
    top20Tags: [],
    top20Authors: []
  },
  onChange(e) {
    console.log(e)

    // if (e.detail.key.indexOf(this.key) !== -1) {
    //   return wx.showModal({
    //     title: 'No switching is allowed',
    //     showCancel: !1,
    //   })
    // }
    //
    // this.setData({
    //   current: e.detail.key,
    // })
  },
  clickItem(e){
    console.log(e);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    wx.showLoading({
      title: '加载中',
    });
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
    var _self = this;
    wx.request({
      url: 'https://api.rqcao.com/poems/exploreGoodPoemAll', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        if(res.data.code === 200){
          let result = res.data.data;
          console.log(result);
          _self.setData({
            top20Tags: result.top20Tags,
            top20Authors: result.top20Authors,
          })
        }
      },
      fail: () => {},
      complete: () => {
        wx.hideLoading()
      }
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