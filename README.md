## react-cnode
使用 React 开发的一个 SPA 应用，支持 PWA 特性。
简洁风格的 CNode 中文社区客户端，一切只为阅读。
Api 由 CNode 官网提供， 客户端由 @Lizhooh 提供.


相关技术： HTML5，CSS3，Sass，ES6，React，React-Router，Redux 等，

PS：支持响应式，不兼容没人爱的 IE。

线上地址：[https://lizhooh.coding.me/](https://lizhooh.coding.me/)

![](./resource/20170905122827.png)

## use

```bash
# install module
npm install

# run project
npm start

# build project
npm run build
```

## code structure

```js
src
├── api                      // 网络请求，后端接口
│   ├── http                 // 对 http 进行封装
│   └── index.js             // 导出所有 api
├── components               // 组件
├── config                   // 用来放置应用的配置项
├── functions                // 自定义的一些功能函数，算法
├── lib                      // 自定义的 React 集成
├── redux                    // 数据状态管理框架 - redux 相关
│   ├── actions              // 所有 view 的 action 集中管理
│   ├── reducers             // 所有 view 的 reducer 集中管理
│   ├── types.js             // 所有的 action type 集中管理
│   └── store.js             // create store
├── resource                 // 资源文件目录
├── router                   // 路由管理
├── storage                  // 本地数据储存相关
├── style                    // 所有的 sass
├── views                    // 所有视图代码
├── index.js                 // 应用入口 --> index.android.js
└── registerServiceWorker.js // Service Worker 相关
```

## explain
此作品，仅限于个人兴趣与学习。@lizhooh
