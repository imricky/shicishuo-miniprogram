// pages/explore/tagList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tag: '', // 点击的按钮是什么text
    type: '', // 是什么类型。诗人还是tags标签
    current: 1,
    poems:[],
    totalCount: 10,
  },
  pageChange(e) {
    console.log('onChange', e);

    this.setData({
      current: e.detail.current,
    });

    this.getPoemsData(this.data.tag, this.data.type, this.data.current);
  },

  /**
   * 获取诗词
   * tag：点击的标签，type：标签的类型（作者，朝代，标签）,page: 当前的页数
   */
  getPoemsData: function(tag,type,page){
    wx.showLoading({
      title: '加载中',
    });
    var _self = this;
    let url = '';
    let data = {
      page,
    }
    if(type === 'tags'){
      url = 'https://api.rqcao.com/poems/getPoemsByTags';
      data.tagName = tag;
    } else if (type === 'authors'){
      url = 'https://api.rqcao.com/poems/getPoemsByAuthor';
      data.author = tag;
    }
    wx.request({
      url, //仅为示例，并非真实的接口地址
      method: 'POST',
      data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code === 200) {
          let result = res.data.data;
          console.log(result);
          _self.setData({
            poems: result.res,
            totalCount: Math.floor(result.totalCount / 10)
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    let _self = this;
    // console.log(option.query)
    const eventChannel = this.getOpenerEventChannel()
    // eventChannel.emit('acceptDataFromOpenedPage', { data: 'test' });
    // eventChannel.emit('someEvent', { data: 'test' });
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      console.log(data)
      _self.setData({
        tag: data.tag,
        type: data.type,
      })
      _self.getPoemsData(_self.data.tag, _self.data.type, _self.data.current);
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
    // if (typeof this.getTabBar === 'function' && this.getTabBar()) {
    //   this.getTabBar().setData({
    //     selected: 1
    //   })
    // }
    // this.getPoemsData(this.data.tag, this.data.type, this.data.current);
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