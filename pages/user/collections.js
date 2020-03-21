// pages/explore/tagList.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _id: '',
    current: 1,
    poems:[],
    totalCount: 10,
    hasData: true,
    msg: {
      title: '空空如也',
      text: '暂时没有搜索到相关数据',
    },
    right: [
      {
        text: '删除',
        style: 'background-color: #F4333C; color: white',
      }],
  },
  // 删除收藏
  removeCollect(e){
    console.log('guanbi');
    console.log(e);
    let poemId = e.target.dataset.poemid;
    console.log(poemId)
  },
  pageChange(e) {
    console.log('onChange', e);

    this.setData({
      current: e.detail.current,
    });

    this.getPoemsData(this.data._id, this.data.current);
  },

  /**
   * 获取诗词
   * tag：点击的标签，type：标签的类型（作者，朝代，标签）,page: 当前的页数
   */
  getPoemsData: function(_id,page){
    wx.showLoading({
      title: '加载中',
    });
    var _self = this;
    let data = {
      page,
      _id,
    };
    wx.request({
      url: 'https://api.rqcao.com/users/getCollectionsByUserId', //仅为示例，并非真实的接口地址
      method: 'POST',
      data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code === 200) {
          // TODO: 这里的页数 计算方法有点问题
          // TODO: 这里收藏列表向左滑动可以删除收藏（后端也要写方法支持）
          let result = res.data.data;
          console.log(result);
          if(result.res[0].poems.length === 0){
            _self.setData({
              hasData: false
            });
            return;
          }
          _self.setData({
            poems: result.res[0].poems,
            totalCount: Math.ceil(result.res[0].poems.length / 10)
          })
        }else {
          _self.setData({
            hasData: false
          });
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
    this.setData({
      _id: app.globalData.user._id
    });
    //this.getPoemsData(this.data._id,this.data.current);
    this.getPoemsData('5df35330e6c9648c5a0bace4',this.data.current);
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