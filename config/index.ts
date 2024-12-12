import Components from 'unplugin-vue-components/webpack';
import NutUIResolver from '@nutui/auto-import-resolver';
import { UnifiedWebpackPluginV5 } from 'weapp-tailwindcss/webpack';

import path from 'path';

const config = {
  projectName: 'xy3-ctri-review',
  alias: {
    '@': path.resolve(__dirname, '..', 'src'),
  },
  designWidth(input) {
    if (input?.file?.replace(/\\+/g, '/').indexOf('@nutui') > -1) {
      return 375;
    }
    return 750;
  },
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2,
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: ['@tarojs/plugin-html', 'tarojs-router-next-plugin'],
  defineConstants: {},
  copy: {
    patterns: [],
    options: {},
  },
  framework: 'vue3',
  compiler: {
    type: 'webpack5',
    prebundle: { enable: false, exclude: ['tarojs-router-next'] },
  },
  sass: {
    data: `@import "@/assets/css/custom_var.scss";@import "@nutui/nutui-taro/dist/styles/variables.scss";`,
  },
  mini: {
    webpackChain(chain) {
      chain.merge({
        plugin: {
          install: {
            plugin: UnifiedWebpackPluginV5,
            args: [
              {
                injectAdditionalCssVarScope: true,
                appType: 'taro',
                rem2rpx: true,
              },
            ],
          },
        },
      });

      chain.plugin('unplugin-vue-components').use(
        Components({
          resolvers: [
            NutUIResolver({
              importStyle: 'sass',
              taro: true,
            }),
          ],
        }),
      );
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 1024,
        },
      },
      cssModules: {
        enable: false,
        config: {
          namingPattern: 'module',
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'));
  }
  return merge({}, config, require('./prod'));
};
