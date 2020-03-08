Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "/pages/daily/daily",
      iconPath: "/image/day.png",
      selectedIconPath: "/image/day_HL.png",
      text: "每日一诗"
    }, {
      pagePath: "/pages/explore/explore",
      iconPath: "/image/explore.png",
      selectedIconPath: "/image/explore_HL.png",
      text: "探索好诗"
    }, {
      pagePath: "/pages/library/library",
      iconPath: "/image/library.png",
      selectedIconPath: "/image/library_HL.png",
      text: "文库大全"
    }, {
      pagePath: "/pages/cool/cool",
      iconPath: "/image/cool.png",
      selectedIconPath: "/image/cool_HL.png",
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