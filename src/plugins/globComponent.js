const components = {};

/**
 * 全局注册自定义组件 待完善
 * @param app
 */
export function setupGlobalComponents(app) {
  for (const componentsKey in components) {
    app.component(componentsKey, components[componentsKey]);
  }
}
