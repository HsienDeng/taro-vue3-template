import { Middleware, registerMiddlewares } from 'tarojs-router-next';

export const M1: Middleware = async (ctx, next) => {
  console.log('第一个中间件执行：', ctx.route.url);
  await next(); // 执行下一个中间件
};

registerMiddlewares([M1]);
