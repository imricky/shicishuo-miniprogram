// pages/daily/daily.js
const util = require('../../utils/util.js')
import { $wuxLoading } from '../../miniprogram_npm/wux-weapp/index';
Page({
  /**
   * 页面的初始数据
   */
  data: {
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
    let res = [];
    if(!value.includes('，')){
      let temp =  value.split('。').map((i)=>{
        return i += '。';
      });
      temp = temp.slice(0,temp.length-1);
      return temp;
    }
    let mid = value.split('。');
    for(let i = 0;i<mid.length;i++){
      if(mid[i].includes('，')){
        let temp = mid[i].split('，');
        temp[0] += '，';
        temp[1] += '。';
        res.push(temp[0]);
        res.push(temp[1]);
      }else {
        mid[i] += '。';
        res.push(mid[i])
      }
    }
    return res.slice(0,res.length-1);
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
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
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