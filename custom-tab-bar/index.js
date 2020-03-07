Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "pages/daily/daily",
      iconPath: "/image/icon_component.png",
      selectedIconPath: "/image/icon_component_HL.png",
      text: "每日一诗"
    }, {
      pagePath: "pages/logs/log",
      iconPath: "/image/icon_API.png",
      selectedIconPath: "/image/icon_API_HL.png",
      text: "探索好诗"
      }, {
        pagePath: "/index/index2",
        iconPath: "/image/icon_API.png",
        selectedIconPath: "/image/icon_API_HL.png",
        text: "文库大全"
      }, {
        pagePath: "/index/index2",
        iconPath: "/image/icon_API.png",
        selectedIconPath: "/image/icon_API_HL.png",
        text: "酷功能"
      }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})