import { defineComponent } from 'vue';

const camelize = (s) => s.replace(/-./g, (x) => x[1].toUpperCase());

export function createComponent(name) {
  const componentName = 'ghc-' + name;
  return {
    componentName,
    create: function (_component) {
      _component.name = 'Ghc' + camelize('-' + name);
      _component.install = (vue) => {
        vue.component(_component.name, _component);
      };
      return defineComponent(_component);
    },
  };
}
