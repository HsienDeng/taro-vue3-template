import { createApp } from 'vue';
import { setupStore } from './store';
import { IconFont } from '@nutui/icons-vue';

import './app.scss';
import './assets/font/iconfont.css';
import '@nutui/nutui-taro/dist/style.css';
import '@nutui/icons-vue/dist/style_iconfont.css';

const App = createApp({
  onShow() {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});

setupStore(App);

App.use(IconFont);

export default App;
