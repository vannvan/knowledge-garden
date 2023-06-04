# DvaJS基础和实践

## 需要安装脚手架

> npm install dva-cli -g

## 创建应用

> dva new dva-quickstart

然后`cd`到项目目录搞起

## 常规的目录结构

```bash
├── /dist/                                         // 打包目标目录
├── /src/                                          // 项目源码目录
│ ├── /components/                                 // 通用组件目录
│ ├── /models/                                     // 数据模型 
│ 				└── example.js                     // model example, dva的模型是一个集合了redux中 reducer 和 store，异步action等的抽象概念。
│ ├── /services/                                   // 存放 服务相关组件或函数
│ ├── /mock/                                       // 模拟数据mock
│ ├── /routes/                                     // 与路由对应的页面
│ 				└── page.js                        // 与路由规则匹配的页面组件
│ ├── index.css                                    // 项目入口css
│ ├── index.js                                     // 项目入口，手动配置开发时候开发的模块
│ └── router.js                                    // 项目路由 （默认使用React-Router中的HashRouter，所以你会看到URL最后有一个#号，可以通过使用dva-no-router禁用react-router）
├── package.json                                   // 项目依赖信息
├── .eslintrc                                      //  Eslint配置
├── .gitignore                                     //  git 忽略文件以及目录
└── .webpackrc                                     //  roadhog配置
└── README.md                                      //  开发文档
```

## 典型的model

```js
app.model({
  namespace: 'count',
  state: {
    record: 0,
    current: 0,
  },
  reducers: {
    add(state) {
      const newCurrent = state.current + 1;
      return { ...state,
        record: newCurrent > state.record ? newCurrent : state.record,
        current: newCurrent,
      };
    },
    minus(state) {
      return { ...state, current: state.current - 1};
    },
  },
  effects: {
    *add(action, { call, put }) {
      yield call(delay, 1000);
      yield put({ type: 'minus' });
    },
  },
  subscriptions: {
    keyboardWatcher({ dispatch }) {
      key('⌘+up, ctrl+up', () => { dispatch({type:'add'}) });
    },
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({
            type: 'add',
          });
        }
      });
    },
  },
  },
});
```

## 数据流向

![](https://zos.alipayobjects.com/rmsportal/PPrerEAKbIoDZYr.png)



### 概念认知

----

### State

`type State = any`

表示`Model`的状态数据，用于初始化组件内部需要用到的数据

### Action

`type AsyncAction = any`

用于修改`state`状态的唯一途径，action必须携带`type`属性用于表示具体的行为，与`reducer`中的方法对应，具体实施交给`dispatch`函数进行与`reducer`完成数据的更新

### dispatch

`type dispatch = (a: Action) => Action`

用于触发action的函数，action 是改变 State 的唯一途径，但是它只描述了一个行为，而 dipatch 可以看作是触发这个行为的方式，而 Reducer 则是描述如何改变数据的。

### Reducer

`type Reducer<S, A> = (state: S, action: A) => S`

接受两个参数：`之前已经累积运算的结果和当前要被累积的值，返回的是一个新的累积结果。该函数把一个集合归并成一个单值`。

**以上步骤可以完成对state数据的更新**

```js
import * as productsService from "../services/products"; // 注意这里，下面会用到
export default {
  namespace: "products",
  state: {
    addModalVisible: false,
    list: [],
  },

  reducers: {
   
    delete(state, { payload: id }) {
      state.list = state.list.filter((item) => item.id !== id);
      return { ...state };
    },

    add(state, { payload: values }) {
      state.list = state.list.concat(values);
      state.addModalVisible = false;
      return { ...state };
    },

    changeModalVisible(state, { payload: status }) {
      state.addModalVisible = status;
      return { ...state };
    },

    get(state) {
      //假设是接口请求的数据
      let data = [
        { name: "dva", id: 1 },
        { name: "antd", id: 2 },
      ];
      state.list = data;
      return { ...state };
    },
  },
};

```

### Effect

Effect 被称为副作用，这里的`副作用`可以理解为，相对于`Reducer`(同样的输入必然得到同样的输出,是一个纯函数)而言，它可能包含更多的附加操作，去处理数据，请求接口等一系列操作，`Effect`使用方式见下方⬇

### Subscription

Subscription 语义是订阅，用于订阅一个数据源，然后根据条件 dispatch 需要的 action。数据源可以是当前的时间、服务器的 websocket 连接、keyboard 输入、geolocation 变化、history 路由变化等等。

```js
subscriptions: {
    // 当进入页面时
    setup({ history, dispatch }) {
      console.log(history); // 这里视情况而定，如果是页面就不用监听路由，如果是子组件就需要根据路由执行对应的业务逻辑
      dispatch({ type: "get" });
    },
},
```

### Router

通常指的是前端路由

### Router Components

在 dva 中，通常需要 connect Model的组件都是 Route Components，组织在`/routes/`目录下，而`/components/`目录下则是纯组件（Presentational Components）

## Effect使用
[扩展-Generator 函数的异步应用](https://es6.ruanyifeng.com/#docs/generator-async)

以下`addRemote`方法触发的条件同样是经过`dispatch`

假设页面有一个`addRemote`的方法

```js
let values = userForm.current.getFieldsValue();
dispatch({
  type: "products/addRemote",
  payload: values,
});
```

此时触发`addRemote`方法将会进行的操作包括将拿到的数据去请求接口和更新本地`State`状态

```js
effects: {
  *addRemote({ payload: values }, { put, call }) {
    yield call(productsService.add, values); // 去请求接口
    yield put({ type: "add", payload: values }); // 触发action
  },
},
```

`productsService.add`对应的操作见‘/service/product.js’，内容参考

```js
// service/products.js
import request from "../utils/request";

// 获取数据
export function query() {
  return request("/api/get");
}
// 新增数据
export function add(p) {
  return request("/api/add", {
    method: "POST",
    body: JSON.stringify(p),
  });
}
```

**put**

用于触发action，与dispatch函数使用相同的入参

**call**

用于调用异步逻辑，支持Promise。以上productsService.add方法来源于该model所对应service模块的接口请求方法，对于异步方法，可以参照如下方法使用

```js
 const addResult = yield call(productsService.add, values);
 console.log("addResult:", addResult); // 这里可以拿到对应接口请求的响应信息
```

**select**

用于从state里获取数据。

```js
 const newList = yield select((state) => state.products);
 console.log("newList:", newList); // 这里可以拿到以上操作后最新的state数据
```

## Subscription使用

**明确四点**

- subscriptions 中配置的key的名称没有任何约束，而且只有在app.unmodel的时候才有用。

- subscriptions 中配置的只能dispatch所在model的reducer和effects。

- subscriptions 中配置的函数只会执行一次，也就是在调用 app.start() 的时候，会遍历所有 model 中的 subscriptions 执行一遍。

- subscriptions 中配置的函数需要返回一个函数，该函数应该用来取消订阅的该数据源

虽然可以基于第三点可以把很多方法写在一个订阅函数里面，但是为了区分不同的功能，还是根据功能做一下拆分比较好

```js
subscriptions: {
    // 当进入页面时
    setup({ history, dispatch }) {
      console.log(history);
      dispatch({ type: "get" });
    },
		// 点击事件监听
    clickEventListener() {
      function handleClick(e) {
        console.log(e.target);
        //TODO
      }
      document.addEventListener("click", handleClick);
      // 此处返回一个函数，用来移除click事件
      return () => {
        document.removeEventListener("click", handleClick);
      };
    },
},
```

## 参考文章

- [官方文档](https://dvajs.com/guide/getting-started.html#%E7%BC%96%E5%86%99-ui-component)
- [实践使用教程](https://juejin.cn/post/6947599812447436830)
- [dva使用详解](https://juejin.cn/post/6844903669301788685)
- [最全dva用法解析](https://blog.csdn.net/weixin_38398698/article/details/93387757)
- [DvaJS的Effect使用介绍](https://blog.csdn.net/weixin_43606158/article/details/98472790)
- [DvaJS Subscriptions使用](https://blog.csdn.net/wangweiren_get/article/details/89338164)
- [dva中的subscriptions应该这么用](https://juejin.cn/post/6925602835388170248)