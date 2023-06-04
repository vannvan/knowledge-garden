## 由需求开始讲起
故事0.有一天产品经理突然说：我们要做一个 A 页面，我看到隔壁组已经做过这个 A 页面了，你把它放到我们项目里吧......

故事1.有一天公司某一个产品需要应用在各个业务线了，此时需要适配不同业务线的布局风格、功能权限，UI大同小异.....

故事2.有一天公司的产品功能板块增多到几十上百个，迭代了成百上千次、面临性能瓶颈、构建时间长、技术栈限制、项目可能因为种种原因变成了一个巨大的💩山......

为了省时省力、为了长期的开发更加愉快、为了避免新来的小伙伴吓到提桶跑路......
so，我们考虑把一个大型项目拆一下👇🏻
## "微前端"实际价值

- 子系统间的开发、发布从空间上完成隔离
- 子系统可以使用不同的技术体系
- 更好的代码复用，基础库复用
- 项目的监控可以细化到到子系统
- 研发效率提升，多业务线并行开发，团队自治，独立迭代
- 运维风险降低，变更范围缩小
- 重构风险降低，低风险局部替换，渐进地完成大规模重构
- ...
## "微前端"工具对比
[17个可以实现微前端的方案](https://segmentfault.com/a/1190000041754373)
### iframe
iframe 就相当于页面里再开个窗口加载别的页面。
优点

- 技术栈无关，子应用独立构建部署
- 实现简单，子应用之间自带沙箱，天然隔离，互不影响

缺点

- 每次进来都要加载，状态不能保留
- DOM结构不能共享，比如子应用要显示一个Message/Modal,只能基于其所在的区域
- 无法跟随浏览器的前进后退
- 天生硬隔离，应用间无法友好的进行资源共享
- 会大幅增加内存和计算资源
- 无法预加载或缓存 iframe 内容
### qiankun
将多个单页面应用聚合为一个整体应用的微前端框架。
优点

- 在同一页面上使用多个前端框架，而不用刷新页面
- 不限技术栈，React/Vue/Angular/JQuery均可接入
- 支持独立部署每一个单页面应用
- 新功能使用新框架，旧的单页应用不用重写可以共存
- 有效改善初始加载时间，延迟加载代码
- 对于已有项目改造成本低

缺点

- 坑比较多，不接近于实际场景的“完美”要求
- 开发体验略差(热更新触发时机不全面/慢/会挂掉)
## 认识一下
### qiankun的基本架构
![](https://p.ipic.vip/m5rzsc.jpg)
### 怎样确定"基座"？

- 具备公共功能的主应用，如包含(菜单栏、用户信息、登录...)不包含任何业务层面的逻辑
- 一个含业务代码的成型应用，所有新功能作为子应用引入
### 项目结构
```bash
├── app-common     //公共模块
├── app-container // 基座
├── app-device  // 子应用
└── sub-datum // 子应用
```
## 实践一下
### 应用加载方式

- 手动模式:通过将微应用关联到一些 url 规则的方式，实现当浏览器 url 发生变化时，自动加载相应的微应用的功能。
- 自动模式:如果微应用不是直接跟路由关联的时候，可以选择手动加载微应用的方式会更加灵活。
#### 自动模式
step0 应用配置
qiankun.ts
```javascript
// 注册子应用信息
  master: {
    apps: [
      {
        name: 'app-common', // 公共服务
        entry: '//localhost:6002',
        // 子应用通过钩子函数的参数props可以拿到这里传入的值
        props: {
          token: 'XXXXXXX',
        },
      },
      {
        name: 'app-datum', 
        entry: '//localhost:6008', // 数据中心，
      },
    ],
  }
```
step1 路由
route.ts
```javascript
{
    name: 'app-datum',
    path: '/datum',
    microApp: 'app-datum',
    microAppProps: {
      autoSetLoading: false,
      className: 'micro-app-wrapper',
      wrapperClassName: 'micro-wrapper-loadding',
    },
  }
```
step2 加载应用
```javascript
 <MicroApp
    name={currentMicroApp} // 应用名称，与上面配置的保持一致
    // autoSetLoading={true}
    // 微应用容器 class
    className="micro-app-wrapper"
    // wrapper class，仅开启 loading 动画时生效
    wrapperClassName="micro-wrapper-loadding"
  />
```
#### 手动模式
step0 确保有一个挂载子应用的节点
```javascript
<div id="ManualNode"></div>
```
step1 使用loadMicroApp加载子应用
```javascript
import { loadMicroApp } from 'qiankun';
// ...
const subApp = loadMicroApp({
  name: 'app1',
  entry: '//localhost:1234',
  container: "#ManualNode",
  props: { xxxxx: '/' }, // 下发给子应用的数据
});
```
当需要更新时
```javascript
subApp.update({ name: 'xxxx' });
```
### 子应用调整(主要环节)
[不同微应用的具体改造方式](https://qiankun.umijs.org/zh/guide/tutorial#%E5%BE%AE%E5%BA%94%E7%94%A8)
两个要点：导出生命周期；改造应用的 render 方法以确保独立运行和作为子应用运行时挂载到相应的DOM节点上
#### React.js
```tsx
function render(props) {
  const { container } = props;
  ReactDOM.render(<App />, container ? container.querySelector('#root') : document.querySelector('#root'));
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  console.log('[react16] react app bootstraped');
}

export async function mount(props) {
  console.log('[react16] props from main framework', props);
  render(props);
}

export async function unmount(props) {
  const { container } = props;
  ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.querySelector('#root'));
}
```
#### Vue.js
```javascript
// ... 省略了部分代码
let router = null;
let instance = null;

// 主要区分是在单独跑还是在微应用里跑，会将Vue实例挂载在不同的节点上
function render(props = {}) {
  const { container } = props;
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/app-vue/' : '/',
    mode: 'history',
    routes,
  });

  instance = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app'); 
  // 官方文档的方法，实际有问题  
  instance = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app') // 这里
  
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

// ... 省略导出部分生命周期的方法
export async function mount(props) {
  console.log('[vue] props from main framework', props);
  render(props);
}
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
  router = null;
}
```
### 实现效果
![](https://p.ipic.vip/eyfoka.gif)

⚠️一个特别容易踩到的坑，上面所用到的应用 `name`,需要确保与各子应用`package.json`是一致的
PS:一个很不错的“去中心化”思想的微前端方案[EMP](https://emp2.netlify.app/)
## 基本原理

-  框架其实是通过`window.fetch`去获取子应用的JS代码。 
-  拿到了子应用的JS代码字符串之后，把它进行包装处理。把代码包裹在了一个立即执行函数中，通过参数的形式改变了它的`window`环境，变成了沙箱环境。 
```javascript
function(window, self) {
    //子应用js代码
}(window,proxy, window.proxy)
```


-  最后通过`eval()`去执行立即执行函数，正式去执行我们的子应用的JS代码，去渲染出整个子应用。 
## 它解决的问题
微前端的本质还是将B项目(子)前端资源在A项目(父)中加载(引入)，让用户在同一个页面(局部)使用本不属于父级业务板块的功能。因此存在需要攻关的问题就显而易见了，以下从两个角度分析它解决的问题：
### 用户体验层面

- 可以做到应用的无感知加载/切换(快、过渡可控)，避免“硬”切换
- 可以更好的做到应用间UI/布局风格的适配
### 技术层面
主要是`single-spa`没有做的几个方面：

-  其基于`single-spa`(JS Entry )和`import-html-entry`，解决了`single-spa`存在的问题，又能将加载方式像iframe一样简单 -- `window.fetch` 
-  应用隔离 -- 沙箱 
   -  样式隔离
   qiankun的css沙箱的原理是重写 `HTMLHeadElement.prototype.appendChild` 事件，记录子项目运行时新增的 `style/link` 标签，卸载子项目时移除这些标签。 
   -  JS隔离 -- `window.Proxy`
   在支持proxy中有一个代理对象，子应用优先访问到了代理对象，如果代理对象没有的值再从window中获取。如果不支持proxy，那么通过快照，缓存，复原的形式解决污染问题。  
-  资源预加载 `doPrefetchStrategy` 
```javascript
/**
 * 执行预加载策略，qiankun 支持四种
 * @param apps 所有的微应用
 * @param prefetchStrategy 预加载策略，四种 =》
 *  1、true，第一个微应用挂载以后加载其它微应用的静态资源，利用的是 single-spa 提供的 single-spa:first-mount 事件来实现的
 *  2、string[]，微应用名称数组，在第一个微应用挂载以后加载指定的微应用的静态资源
 *  3、all，主应用执行 start 以后就直接开始预加载所有微应用的静态资源
 *  4、自定义函数，返回两个微应用组成的数组，一个是关键微应用组成的数组，需要马上就执行预加载的微应用，一个是普通的微应用组成的数组，在第一个微应用挂载以后预加载这些微应用的静态资源
 * @param importEntryOpts = { fetch, getPublicPath, getTemplate }
 */
export function doPrefetchStrategy(
  apps: AppMetadata[],
  prefetchStrategy: PrefetchStrategy,
  importEntryOpts?: ImportEntryOpts,
) {
  // ...
 // ...
```

-  应用间通信 `initGlobalState` 
```javascript
/**
 * 定义全局状态，并返回通信方法，一般由主应用调用，微应用通过 props 获取通信方法。
 * @param state 全局状态，{ key: value }
 */
export function initGlobalState(state: Record<string, any> = {}) {
  if (state === globalState) {
    console.warn('[qiankun] state has not changed！');
  } else {
    // 方法有可能被重复调用，将已有的全局状态克隆一份，为空则是第一次调用 initGlobalState 方法，不为空则非第一次次调用
    const prevGlobalState = cloneDeep(globalState);
    // 将传递的状态克隆一份赋值为 globalState
    globalState = cloneDeep(state);
    // 触发全局监听，当然在这个位置调用，正常情况下没啥反应，因为现在还没有应用注册回调函数
    emitGlobal(globalState, prevGlobalState);
  }
  // 返回通信方法，参数表示应用 id，true 表示自己是主应用调用
  return getMicroAppStateActions(`global-${+new Date()}`, true);
}
```

   - 满足当下构建工具

`single-spa`需要将应用打包为一个JS文件，意味着当下构建工具所做的按需加载、资源优化、CSS独立打包等措施均不能用，`qiankun`就很好的解决了这个问题 
## 常见问题

- 热更新慢、css触发不了热更新等

`mfsu`是一个很鸡肋很鸡肋的配置(副作用一大堆)，尽量找合适的方案在开发环节让子应用独立运行，减少被嵌套在主应用中编译流程和降低编译的复杂度。

- qiankun只能解决子项目之间的样式相互污染，不能解决子项目的样式污染主项目的样式

采用`postcss`增加命名空间；对于不经过编译工具的老项目(jquery),采用`BEM`风格约束选择器；`CSS Modules`,在打包时会自动将类名转换为hash值等

- [从0实现一个single-spa的前端微服务](https://juejin.cn/post/6844904085200601102#heading-9)
- [官方faq](https://qiankun.umijs.org/zh/faq)
## 推荐工具
### lerna
一个用于管理带有多个包的 JavaScript 项目的工具。
痛点：开发阶段多服务同时启动；子项目不用放在同一个 git 项目中,企业中部分 npm 私服包需要更便捷的更新到各个子项目；部分公共依赖安装在`lerna`根目录可以节省一部分存储空间。
> lerna init --independent //安装在全局
npx lerna init --independent //安装在局部

主要方法,既可以给某个项目单独安装依赖，也可以给所有子项目安装公共依赖，具体支持的参数见[lerna bootstrap](http://www.febeacon.com/lerna-docs-zh-cn/routes/commands/bootstrap.html)
> lerna bootstrap <--options>

初始化后的 lerna 项目结构如下
```bash
umi-qiankun-explore
├── project  // 项目目录
│ ├── app-common
│ │ ├── mock
│ │ ├── src
│ │ ├── .umirc.ts
│ │ ├── package.json
│ │ └── ...
│ ├── app-container
│ │ ├── config
│ │ ├── mock
│ │ ├── src
│ │ ├── README.md
│ │ ├── package-lock.json
│ │ ├── package.json
│ │ ├── tsconfig.json
│ │ ├── typings.d.ts
│ │ └── yarn.lock
│ ├── app-device
│ │ ├── mock
│ │ ├── src
│ │ ├── .umirc.ts
│ │ ├── package.json
│ │ └── ...
├── lerna.json
└── package.json
```
umi-qiankun-explore/lerna.json
```json
{
  "packages": ["project/*"],
  "workspaces": ["project/*"],
  "version": "0.0.0"
}
```
umi-qiankun-explore/package.json
```json
{
  "name": "root",
  "private": true,
  "scripts": {
    "clone:all": "bash ./cli/clone-all.sh", // 这里用来可以根据设备写一个clone所有子项目的脚本
    "boots": "lerna bootstrap --hoist", // 安装子项目所有公共的依赖
    "start": "lerna run --parallel  start", //启动所有子项目
    "build":"lerna run --parallel build" // 打包所有子项目
  },
  "devDependencies": {}
}
```
### [npm-run-all](https://www.npmjs.com/package/npm-run-all)
功能如其名。
## 最后
**qiankun不是一个完整的微前端解决方案！**
**不要为了微前端而搞微前端！**
**用新技术，更多的不是因为先进，而是适合！**
## 参考文章

- [万字长文-落地微前端 qiankun 理论与实践指北](https://juejin.cn/post/7069566144750813197#heading-5)
- [EMP技术方案](https://zhuanlan.zhihu.com/p/378593330)
- [微前端qiankun原理学习](https://www.cnblogs.com/synY/p/13969785.html)
- [lerna 中文文档](http://www.febeacon.com/lerna-docs-zh-cn/)
