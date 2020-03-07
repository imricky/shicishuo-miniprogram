// pages/daily/daily.js
const util = require('../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    array: [{
      message: 'foo',
    }, {
      message: 'bar'
    }, {
      message: '1'
    }, {
      message: 'b2ar'
    }, {
      message: '1123'
    }, {
      message: 'b2123ar'
    }],
    tags:['你好','测试','123','123123123'],
    src: 'https://api.rqcao.com/image/image_811.jpg',
    // 每日诗词
    poem: {},
    // 每日名句
    paragraph: {},

  },
  collect: function(a,b,c){
    // this.setData({
    //   'poemCardData.title': 'changed data'
    // })
  },
  splitParagraph: function(value){
    let data = value.split('，');
    data[0] += '，';
    return data;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.showToast({title: '加载中', icon: 'loading', duration: 10000});
    wx.showLoading({
      title: '加载中',
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
    var _self = this;
    wx.request({
      url: 'https://api.rqcao.com/poems/getDailyPoem', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        if(res.data.code === 200){
          console.log(res.data.data);
          let result = res.data.data[0];
          _self.setData({
            'poem.title': result.title,
            'poem.author': result.author,
            'poem.tags': result.tags,
            'poem.paragraphs': result.paragraphs,
            // 每日名句
            'paragraph.content': _self.splitParagraph(result.dailyParagraph.content),
            'paragraph.src':result.dailyParagraph.src,
            'paragraph.poetName':result.dailyParagraph.poetName,
            'paragraph.poetryName':result.dailyParagraph.poetryName,
          })
        }
      },
      fail: () => {},
      complete: () => {
        wx.hideLoading();
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