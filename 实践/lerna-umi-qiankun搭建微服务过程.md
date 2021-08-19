# lerna+umi+antd+qiankun 搭建微服务过程

---

## lerna

`一个用于管理带有多个包的 JavaScript 项目的工具。`

主要用于微服务生产阶段公共依赖的管理。可以解决的问题：开发阶段多服务同时启动，子项目不用放在同一个 git 项目中,企业中部分 npm 私服包可以更便捷的更新到各个子项目等，将部分公共依赖安装在`lerna`根目录可以节省一部分存储空间。

### 快速上手

PS:这里需要先新建一个空的项目目录，以下示例均为`umi-qiankun-explore`  
建议将`lerna`安装在全局，当然也可以安装在项目局部

> npm i lerna -g

初始化

> lerna init --independent //安装在全局  
> npx lerna init --independent //安装在局部

主要方法,既可以给某个项目单独安装依赖，也可以给所有子项目安装公共依赖，具体支持的参数见[lerna bootstrap](http://www.febeacon.com/lerna-docs-zh-cn/routes/commands/bootstrap.html)

> lerna bootstrap <--options>

初始化后的 lerna 项目目录如下

```
umi-qiankun-explore/
|--packages/ //这里是存放微服务各模块等目录，后面已更改为project，对应需要调整的配置见下方lerna.json▼
|--package.json
|--lerna.json
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
    "start": "lerna run --parallel  start " //启动所有子项目
  },
  "devDependencies": {}
}
```

这里修改目录主要是在命令行下切换目录`p`加`Tab`会把 package.json 也带出来，就不太方便 😄

## umi

使用`umi`创建子项目，在`project`目录下创建根据微服务实际情况划分的项目模块，以下将采用同一种方式分别创建`app-container`,`app-device`,`app-common`三个项目。  
其中`app-container`作为主项目，用于微服务的容器，一般只具备页面布局、登录授权、基础数据分发等基础业务功能。  
`app-common`主要作为项目公共业务模块，一般具备账户信息管理、应用设置等与具体业务无关或无强关联的基础功能。  
其他子项目根据项目实际情况进行划分即可。

新建完三个项目目录后，通过官方工具创建项目

> yarn create @umijs/umi-app / npx @umijs/create-umi-app

⚠️ 注意:创建完项目后，需要做两件最基础的事情，很重要

- 将各项目 package.json 中的 name 属性改为项目对应的名称
- 各项目原`start`启动命令需要指定一下端口号，形如以下

此示例项目 container 对应 8000，common 对应 8002，device 对应 8001

```js
 "start": "PORT=8001 umi dev set"
```

自此`lerna`就派上用场了，在 umi-qiankun-explore/package.json 内新增各个 umi 项目具备的公共依赖

```json
"dependencies": {
    "@ant-design/pro-layout": "^6.5.0",
    "@umijs/plugin-qiankun": "^2.27.0",
    "react": "17.x",
    "react-dom": "17.x",
    "redux-thunk": "^2.3.0",
    "umi": "^3.5.15"
  },
  "devDependencies": {
    "@types/react": "^17.0.0",
    "@types/react-dom": "^17.0.0",
    "@umijs/preset-react": "1.x",
    "@umijs/test": "^3.5.15",
    "lint-staged": "^10.0.7",
    "prettier": "^2.2.0",
    "typescript": "^4.1.2",
    "yorkie": "^2.0.0"
  }
```

此时使用`npm run boots`即可完成各子项目公共依赖的安装，安装完项目依赖后，我们便可以使用`npm start`将各个项目同时启动起来，不过此时项目还没有`微`起来。完成上述步骤后可以获得的项目目录结构如下:

### 目录结构(关键部分)

```bash
umi-qiankun-explore
├── project
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
├── lerna-umi-qiankun 搭建微服务过程.md
├── lerna.json
├── package-lock.json
└── package.json
```

## plugin-qiankun

采用 umi 官方推荐方式，将 qiankun 引入各项目

> yarn add @umijs/plugin-qiankun -D

### 主项目 app-container

这里先采用路由绑定的方式引入子项目，`MicroApp`组件方式见[使用 <MicroApp /> 组件的方式](https://umijs.org/zh-CN/plugins/plugin-qiankun#b-%E4%BD%BF%E7%94%A8-microapp--%E7%BB%84%E4%BB%B6%E7%9A%84%E6%96%B9%E5%BC%8F)

在`.umirc.ts`中新增如下配置

```js
export default defineConfig({
  qiankun: {
    master: {
      // 注册子应用信息
      apps: [
        {
          name: 'app-common', // 公共服务
          entry: '//localhost:8002',
          // 子应用通过钩子函数的参数props可以拿到这里传入的值
          props: {
            token: 'XXXXXXX',
          },
        },
        {
          name: 'app-device', // 设备服务
          entry: '//localhost:8001',
          // 子应用通过钩子函数的参数props可以拿到这里传入的值
          props: {
            token: 'XXXXXXX',
          },
        },
      ],
      jsSandbox: true, // 是否启用 js 沙箱，默认为 false
      prefetch: true, // 是否启用 prefetch 特性，默认为 true
    },
  },
})
```

假设我们页面布局主要依靠主项目的前提下，引入子项目路由的方式如下

```js
export default defineConfig({
  routes: [
    {
      exact: false,
      path: '/',
      component: '@/layouts/index',
      routes: [
        {
          path: '/home',
          component: '@/pages/home/index',
          meta: { title: '首页' },
        },
        // 公共服务模块
        {
          name: 'app-common', //⚠️注意这里需要与上面qiankun配置的name相对应
          path: '/common',
          microApp: 'app-common',
        },
        // 设备服务模块
        {
          name: 'app-device',
          path: '/device',
          microApp: 'app-device',
        },
      ],
    },
  ],
})
```

## 子项目 app-common

在`.umirc.ts`中新增用于支持 qiankun 的配置

```js
import { defineConfig } from 'umi'

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/index' }],
  // 新增配置
  qiankun: {
    slave: {},
  },
})
```

还需要将子项目生命周期导出，`umi@3.5`版本初始化已经没有`app.tsx`文件，所以我们需要手动新建一个，

`/src/app.tsx`

```js
export const qiankun = {
  // 应用加载之前
  async bootstrap(props: any) {
    console.log('子应用[app-common] bootstrap', props)
  },
  // 应用 render 之前触发
  async mount(props: any) {
    console.log('子应用[app-common] mount', props)
  },
  // 应用卸载之后触发
  async unmount(props: any) {
    console.log('子应用[app-common] unmount', props)
  },
}
```

`app-device`与`app-common`方法相同，如此便初步完成微服务项目的基础结构了。
以上只是当前技术栈下微服务的第一步，至于 qiankun 的实践应用部分还有很多`坑`存在，例如样式隔离、数据共享、数据上移和下移等 qiankun 目前处理的不算全面的问题，还是得根据项目的实际情况进行问题排除和升级改造。

至此已完成整体技术栈的初步实践，当然对于`lerna`,`umi.js`和`qiankun`还有更多的高阶业务场景没有涉及到，主要还是每个项目自身的特点对于这些技术应用的切入点不同，因此此文只做引导后续更复杂的场景还是需要我们去`具体问题具体解决`

留图表示按照上述所有步骤可以完成微前端的实现，哈哈哈！

[![fuCOpR.md.png](https://z3.ax1x.com/2021/08/06/fuCOpR.md.png)](https://imgtu.com/i/fuCOpR)

感兴趣的同学可以移步 github 去拉一下我的项目 demo，后面会完善更多实际场景的复杂问题。
[github](https://github.com/vannvan/umi-qiankun-explore)

文章不是 cv 来的哈，如果对你有帮助请不要吝啬下方点个赞 👇，在此谢过！😁😁😁

## 参考文章

- [lerna 中文文档](http://www.febeacon.com/lerna-docs-zh-cn/)
- [@umi/plugin-qiankun](https://umijs.org/zh-CN/plugins/plugin-qiankun)
- [umi](https://umijs.org/zh-CN/docs)
- [qiankun船只的三种结局方案](https://blog.csdn.net/weixin_45507571/article/details/113761342)

## 注意

lerna 可以将子项目包安装在根目录而不用子项目分别安装的前提

- 子项目不能有package-lock.json,yarn.lock
- 子项目package.json必须有name和version属性
- lerna clean 删除所有包中的`node_modules`目录

lerna 将默认npm安装包改为yarn

```json
{
  "packages": [
    "project/*"
  ],
  "workspaces": [
    "project/*"
  ],
  "version": "0.0.0",
  "npmClient": "yarn",
  "useWorkspaces": true
}
```

