export default defineAppConfig({
  pages: ["pages/index/index", "pages/login/index", "pages/profile/index"],
  tabBar: {
    color: "#333",
    selectedColor: "#1a91ba",
    backgroundColor: "#fff",
    borderStyle: "black",
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "assets/images/tabbar/home.png",
        selectedIconPath: "assets/images/tabbar/home-active.png",
      },
      {
        pagePath: "pages/profile/index",
        text: "我的",
        iconPath: "assets/images/tabbar/profile.png",
        selectedIconPath: "assets/images/tabbar/profile-active.png",
      },
    ],
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#1a91ba",
    navigationBarTitleText: "智慧随访系统",
    navigationBarTextStyle: "white",
  },
});
