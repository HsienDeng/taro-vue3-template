export default defineAppConfig({
  pages: [
    'pages/workbench/index',
    'pages/login/index',
    'pages/index/index',
    'pages/profile/index',
    'pages/project-review/approval-project/index',
  ],
  tabBar: {
    color: '#333',
    selectedColor: '#1658ba',
    backgroundColor: '#fff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/workbench/index',
        text: '首页',
        iconPath: 'assets/images/tabbar/home.png',
        selectedIconPath: 'assets/images/tabbar/home-active.png',
      },
      {
        pagePath: 'pages/profile/index',
        text: '我的',
        iconPath: 'assets/images/tabbar/profile.png',
        selectedIconPath: 'assets/images/tabbar/profile-active.png',
      },
    ],
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#1658ba',
    navigationBarTitleText: '临床试验研究中心',
    navigationBarTextStyle: 'white',
  },
});
