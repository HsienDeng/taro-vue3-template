import type { Component } from 'vue';
import type { App } from 'vue';

const components: {
  [propName: string]: Component;
} = {
};

/**
 * 全局注册自定义组件 待完善
 * @param app
 */
export function setupGlobalComponents(app: App) {
  for (const componentsKey in components) {
    app.component(componentsKey, components[componentsKey]);
  }
}
