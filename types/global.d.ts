/// <reference types="@tarojs/taro" />

declare module "*.png";
declare module "*.gif";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.css";
declare module "*.less";
declare module "*.scss";
declare module "*.sass";
declare module "*.styl";

declare namespace NodeJS {
  interface ProcessEnv {
    TARO_ENV: "weapp" | "swan" | "alipay" | "h5" | "rn" | "tt" | "quickapp" | "qq" | "jd";
  }
}

declare module "@tarojs/components" {
  export * from "@tarojs/components/types/index.vue3";
}

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    type Element = VNode;
    // tslint:disable no-empty-interface
    type ElementClass = ComponentRenderProxy;

    interface ElementAttributesProperty {
      $props: any;
    }

    interface IntrinsicElements {
      [elem: string]: any;
    }

    interface IntrinsicAttributes {
      [elem: string]: any;
    }
  }
}

declare module "@tarojs/components" {
  export * from "@tarojs/components/types/index.vue3";
}
