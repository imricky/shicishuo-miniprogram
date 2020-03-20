// pages/user/user.js
import { $wuxToptips, $wuxToast } from '../../miniprogram_npm/wux-weapp/index'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg', // 头像地址
    username: '',
    userDesc: '宝剑锋从磨砺出，梅花香自苦寒来',
    isLogin: false
  },

  goLogin: function(){
    let _self = this;
    wx.navigateTo({
      url: 'login',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function(data) {
          console.log(data)
        },
        // 在这里设置user页面的用户名
        loginSuccessBack: function(data) {
          _self.setData({
            username: app.globalData.user.username
          });
        }
      },
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        // res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
      }
    })
  },

  goRegister: function(){
    let _self = this;
    wx.navigateTo({
      url: 'register',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function(data) {
          console.log(data)
        },
        // 在这里设置user页面的用户名
        registerSuccessBack: function(data) {
          _self.setData({
            username: app.globalData.user.username
          });
        }
      },
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        // res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
      }
    })
  },

  logout: function(){
    app.globalData.user.username = '';
    app.globalData.user.token = '';
    app.globalData.user._id = '';
    app.globalData.user.avatar = '';
    this.setData({
      isLogin: false
    })
  },
  goCollect: function(){
    console.log(123);
    console.log(app.globalData.user.username)
    if(!app.globalData.user.username){
      $wuxToast().show({
        type: 'forbidden',
        duration: 2000,
        color: '#fff',
        text: '请登录后查看',
      });
      return;
    }else {
      wx.navigateTo({
        url: 'collections',
        // events: {
        //   // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        //   acceptDataFromOpenedPage: function(data) {
        //     console.log(data)
        //   },
        //   someEvent: function(data) {
        //     console.log(data)
        //   }
        // },
        success: function(res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // app.globalData.user.username = 1;
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
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
    }

    if(app.globalData.user.username !== null){
      this.setData({
        isLogin: true
      })
    }
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