// pages/explore/searchResult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    current: 1,
    authors: [],
    tags: [],
    poems: [],
    totalCount: 10,
  },

  getSearchData: function(inputValue,page){
    wx.showLoading({
      title: '加载中',
    });
    var _self = this;
    let url = `https://api.rqcao.com/search/?q=${inputValue}&page=${page}`;
    wx.request({
      url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code === 200) {
          let result = res.data.data;
          console.log(result);
          _self.setData({
            authors: result.authors,
            tags: result.tags,
            poems: result.poems,
            totalCount: Math.floor(result.poems.total / 10)
          })
        }
      },
      fail: () => { },
      complete: () => {
        wx.hideLoading();
        if (wx.pageScrollTo) {
          wx.pageScrollTo({
            scrollTop: 0
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
          })
        }
      }
    })
  },

  pageChange(e) {
    console.log('onChange', e);

    this.setData({
      current: e.detail.current,
    })

    this.getSearchData(this.data.inputValue,this.data.current);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _self = this;
    // console.log(option.query)
    const eventChannel = this.getOpenerEventChannel()
    // eventChannel.emit('acceptDataFromOpenedPage', { data: 'test' });
    // eventChannel.emit('someEvent', { data: 'test' });
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      _self.setData({
        inputValue: data.inputValue
      })
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
    this.getSearchData(this.data.inputValue,this.data.current);
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