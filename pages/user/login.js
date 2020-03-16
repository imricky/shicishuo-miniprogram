import { $wuxForm } from '../../miniprogram_npm/wux-weapp/index'
// import data from '../cascader/data'

Page({
  data: {

  },
  onLoad() {
    // this.setData({ options1: data })
  },

  onSubmit() {
    const { getFieldsValue, getFieldValue, setFieldsValue } = $wuxForm()
    const value = getFieldsValue()

    console.log('Wux Form Submit \n', value)
  },
  onChange(e) {
    const { form, changedValues, allValues } = e.detail

    console.log('onChange \n', changedValues, allValues)
  },
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
