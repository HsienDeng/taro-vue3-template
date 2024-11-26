import { createApp } from 'vue';
import { setupStore } from './store';
import { IconFont } from '@nutui/icons-vue';
import './router/router-guard';

import './app.scss';
import './assets/font/iconfont.css';
import '@nutui/nutui-taro/dist/style.css';
import '@nutui/icons-vue/dist/style_iconfont.css';

const App = createApp({
  onLaunch() {},
});

setupStore(App);

App.use(IconFont);

export default App;
