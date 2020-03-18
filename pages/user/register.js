import { $wuxForm, $wuxToptips, $wuxToast } from '../../miniprogram_npm/wux-weapp/index'
// import data from '../cascader/data'
const app = getApp();

Page({
  data: {

  },
  onLoad() {
    // this.setData({ options1: data })
  },
  // 全局保存用户的信息
  saveUserToken: function(data){
    app.globalData.user.username = data.username;
    app.globalData.user._id = data._id;
    app.globalData.user.token = data.token;
    app.globalData.user.avatar = data.avatar;
  },

  goLogin: function(){
    wx.redirectTo({
      url: 'login'
    })
  },
  // onClear(e) {
  //   console.log('onClear', e)
  //   this.setData({
  //     error: true,
  //     value: '',
  //   })
  // },

  register: function(){
    let _self = this;
    const { getFieldsValue, getFieldValue, setFieldsValue } = $wuxForm()
    const value = getFieldsValue();
    console.log(value);
    let {username,password,repassword,email} = value;
    // 用户名为空
    if(username === ''){
      $wuxToptips().error({
        hidden: false,
        text: '用户名不能为空',
        duration: 2000,
        success() {},
      });
      return;
    }
    // 判断密码为空
    if(password === '' || repassword === ''){
      $wuxToptips().error({
        hidden: false,
        text: '密码和确认密码都不能为空哟',
        duration: 2000,
        success() {},
      });
      return;
    }
    // 判断两次密码输入不一致
    if(password !== repassword){
      $wuxToptips().error({
        hidden: false,
        text: '两次密码输入不一致哟，请重新输入',
        duration: 2000,
        success() {},
      });
      return;
    }

    // 判断密码长度必须大于等于6位
    if(password.length < 6){
      $wuxToptips().error({
        hidden: false,
        text: '密码必须大于6位哦',
        duration: 2000,
        success() {},
      });
      return;
    }


    //开始注册
    const registerData = {
      username,
      password,
      repassword,
      email,
    };
    wx.request({
      url: 'https://api.rqcao.com/users/register', // 注册接口
      data: registerData,
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        const { code, msg, data = {} } = res.data;
        if (code === 200) {
          console.log(data);
          _self.saveUserToken(data);
          const eventChannel = _self.getOpenerEventChannel();
          // eventChannel.emit('acceptDataFromOpenedPage', {data});
          // 登录成功回调，出发页面修改用户名
          eventChannel.emit('registerSuccessBack');
          $wuxToast().show({
            type: 'success',
            duration: 2000,
            color: '#fff',
            text: '注册成功，正在跳转中',
            success: () => {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        }else {
          $wuxToast().show({
            type: 'cancel',
            duration: 3000,
            color: '#fff',
            text: `注册失败,失败原因：${msg}`,
            success: () => {
              _self.onReset();
            }
          });
          return;
        }
      },
      fail (){
        $wuxToast().show({
          type: 'cancel',
          duration: 2000,
          color: '#fff',
          text: '系统错误，请联系管理员',
          success: () => {
          }
        });
        return;
      },
    })
  },

  onSubmit() {
    const { getFieldsValue, getFieldValue, setFieldsValue } = $wuxForm()
    const value = getFieldsValue()

    console.log('Wux Form Submit \n', value)
  },
  // onChange(e) {
  //   //   const { form, changedValues, allValues } = e.detail
  //   //
  //   //   console.log('onChange \n', changedValues, allValues)
  //   // },
  onReset() {
    const { getFieldsValue, setFieldsValue } = $wuxForm()
    const fields = getFieldsValue()

    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (Array.isArray(fields[item])) {
          fields[item] = []
          if (item === 'slider') {
            fields[item] = [10, 80]
          }
        } else if (typeof fields[item] === 'boolean') {
          fields[item] = false
        } else if (typeof fields[item] === 'number') {
          fields[item] = 0
        } else {
          fields[item] = ''
        }
      }
    }

    setFieldsValue({
      ...fields,
    })
  },
})
