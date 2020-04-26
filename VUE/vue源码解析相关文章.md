- [vue nextick全面解析](<https://www.cnblogs.com/xujiazheng/p/6852124.html>)
- [理解vue数据驱动](<https://www.cnblogs.com/xujiazheng/p/12120530.html>)
- [Vue如何用虚拟dom进行渲染view的](https://www.cnblogs.com/xujiazheng/p/12101764.html)
- [vue 计算属性的实现](https://zhuanlan.zhihu.com/p/66140667?from_voters_page=true)
- [沈十二 vue源码笔记系列](https://www.yuque.com/chenshier/chuyi/bw27on) 
- 

### nextick

![](https://cdn.nlark.com/yuque/0/2019/png/244975/1557374324952-53b75fbb-12a6-4221-8ce0-8e0907a15c98.png?x-oss-process=image/resize,w_746)

![](https://cdn.nlark.com/yuque/0/2019/png/244975/1557309046397-1927df7d-7019-4423-9a42-d8b669723465.png)

```js
function nextTickHandler () {
  pending = false;
  //  拷贝出函数数组副本
  var copies = callbacks.slice(0);
  //  把函数数组清空
  callbacks.length = 0;
  // 依次执行函数
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}
```

vue分了三种情况来延迟调用以上这个函数，因为$nextTick目的就是把传进来的函数延迟到dom更新后再使用，所以这里依次优雅降序的使用js的方法来做到这一点。

#### **1. promise.then延迟调用**

```js
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  var logError = function (err) { console.error(err); };
  timerFunc = function () {
    p.then(nextTickHandler).catch(logError);
    if (isIOS) { setTimeout(noop); }
  };
}
```

#### **2. MutationObserver 监听变化**

```js
else if (typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {

  var counter = 1;
  var observer = new MutationObserver(nextTickHandler);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
}
```

具体有一下几点变动的监听

- childList：子元素的变动
- attributes：属性的变动
- characterData：节点内容或节点文本的变动
- subtree：所有下属节点（包括子节点和子节点的子节点）的变动

可以看出，以上代码是创建了一个文本节点，来改变文本节点的内容来触发的变动，因为我们在数据模型更新后，将会引起dom节点重新渲染，所以，我们加了这样一个变动监听，用一个文本节点的变动触发监听，等所有dom渲染完后，执行函数，达到我们延迟的效果。

#### **3.setTimeout延迟器**

```js
else {
    timerFunc = function () {
      setTimeout(nextTickHandler, 0);
    };
  }
```

#### 闭包函数

```js
return function queueNextTick (cb, ctx) {
    var _resolve;
    callbacks.push(function () {
      if (cb) { cb.call(ctx); }
      if (_resolve) { _resolve(ctx); }
    });
    // 如果没有函数队列在执行才执行
    if (!pending) {
      pending = true;
      timerFunc();
    }
    // promise化
    if (!cb && typeof Promise !== 'undefined') {
      console.log('进来了')
      return new Promise(function (resolve) {
        _resolve = resolve;
      })
    }
  }
```

这个return的函数就是我们实际使用的闭包函数，每一次添加函数，都会想callbacks这个函数数组入栈。然后监听当前是否正在执行，如果没有，执行函数。这个很好理解。下面一个if是promise化。

```js
this.$nextTick(function () {

})
// promise化
this.$nextTick().then(function () {

}.bind(this))
```

### props

引用类型的 prop 与值类型的 prop 是有所不同的：

1. 值类型：

父组件修改 data，子组件的 prop 被重新赋值，触发子组件prop 的 setter，重新渲染。

1. 引用类型：

父组件 data 同时保存了父组件与子组件的 renderWatcher，data 变化父子组件重新渲染。

### computed

![](https://cdn.nlark.com/yuque/0/2019/png/244975/1557999071458-350ee70f-2a54-4840-97e8-c99784584d46.png?x-oss-process=image/resize,w_746)

#### comuted 初始化

```js
// src/core/instance/state.js
export function initState (vm: Component) {
  vm._watchers = []
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props)
  if (opts.methods) initMethods(vm, opts.methods)
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
  if (opts.computed) initComputed(vm, opts.computed)   //这里
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}
```

#### initComputed

```js
// src/core/instance/state.js

function initComputed (vm: Component, computed: Object) {
  // $flow-disable-line
  const watchers = vm._computedWatchers = Object.create(null)  
  //首先声明变量 watchers，赋值为 vm._computedWatchers，并且初始化值为空对象。
  // computed properties are just getters during SSR
  const isSSR = isServerRendering()

  for (const key in computed) {
    // 声明 userDef 为 computed 当次遍历的键值。
    //如果 userDef 为函数则将其值赋给 getter，否则 getter 值为 userDef.get。
    //然后在开发环境下，getter 如果为 null 打印警告。
    //如此我们就可以理解 computed 的两种写法了：
    const userDef = computed[key]
    const getter = typeof userDef === 'function' ? userDef : userDef.get
    if (process.env.NODE_ENV !== 'production' && getter == null) {
      warn(
        `Getter is missing for computed property "${key}".`,
        vm
      )
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
     /*针对当次循环的 computed，调用 new Watcher。watchers 保存了 vm._computedWatchers 的引用，所以这里同样会将该 watcher 保存到 vm._computedWatchers。所以我们可以知道，每一个 computed 的 key，都会生成一个 watcher 实例，并且保存到 vm._computedWatchers 这个对象上。*/
      watchers[key] = new Watcher(   // 具体业务在 src/core/observer/watcher.js
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      )
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef)   // 具体业务在 src/core/instance/state.js
    } else if (process.env.NODE_ENV !== 'production') {
      if (key in vm.$data) {
        warn(`The computed property "${key}" is already defined in data.`, vm)
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(`The computed property "${key}" is already defined as a prop.`, vm)
      }
    }
  }
}
```

#### defineComputed

```js
// src/core/instance/state.js
const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
}

export function defineComputed (
  target: any,
  key: string,
  userDef: Object | Function
) {
  const shouldCache = !isServerRendering()
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : userDef
    sharedPropertyDefinition.set = noop
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop
  }
  if (process.env.NODE_ENV !== 'production' &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        `Computed property "${key}" was assigned to but it has no setter.`,
        this
      )
    }
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}
```

主要是为 *sharedPropertyDefinition* 添加 get， set 属性，值为 computed 选项相关。最后将该 computed 属性添加到 Vue 实例 vm 上，并使用 sharedPropertyDefinition 作为设置项。

#### computed 依赖收集的触发与更新

[陈十二 依赖收集的触发与更新](https://www.yuque.com/chenshier/chi73c/zv7q6w#DxL26)

### 收集依赖和派发更新

```js
export function defineReactive(
    obj: Object,
    key: string,
    val: any,
    customSetter?: ?Function,
    shallow?: boolean
) {
    // 每个数据都有一个属于自己的 dep
    const dep = new Dep()

    // 省略部分代码...

    let childOb = !shallow && observe(val)
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            // 省略部分代码...
            if (Dep.target) {
                // 收集依赖
                dep.depend()
                // 省略部分代码...
            }
            // 省略部分代码...
        },
        set: function reactiveSetter(newVal) {
            // 省略部分代码...

            // 派发更新
            dep.notify()
        }
    })
}
```

### Dep实现

```js
// 用于当作 Dep 的标识
let uid = 0

/**
* A dep is an observable that can have multiple
* directives subscribing to it.
*/
export default class Dep {
    static target: ?Watcher;
    id: number;
    subs: Array<Watcher>;

    // 定义一个 subs 数组，这个数组是用来存放 watcher 实例的
    constructor() {
        this.id = uid++
        this.subs = []
    }

    // 将 watcher 实例添加到 subs 中
    addSub(sub: Watcher) {
        this.subs.push(sub)
    }

    // 从 subs 中移除对应的 watcher 实例。
    removeSub(sub: Watcher) {
        remove(this.subs, sub)
    }

    // 依赖收集，这就是我们之前看到的 dep.dpend 方法
    depend() {
        // Dep.target 是 watcher 实例
        if (Dep.target) {
            // 看到这里应该能明白 watcher 实例上 有一个 addDep&emsp;方法，参数是当前 dep 实例
            Dep.target.addDep(this)
        }
    }

    // 派发更新，这就是我们之前看到的 dep.notify 方法
    notify() {
        // 复制一份，可能是因为下面要做排序，可是又不能影响 this.subs 数组内元素的顺序
        // 所以就复制一份出来。
        const subs = this.subs.slice()

        // 这里做了个排序操作，具体原因是什么，我还不清楚
        if (process.env.NODE_ENV !== 'production' && !config.async) {
            // subs aren't sorted in scheduler if not running async
            // we need to sort them now to make sure they fire in correct
            // order
            subs.sort((a, b) => a.id - b.id)
        }

        // 遍历 subs 数组，依次触发 watcher 实例的 update 
        for (let i = 0, l = subs.length; i < l; i++) {
            // 看到这里应该能明白 watcher 实例上 有一个 update&emsp;方法
            subs[i].update()
        }
    }
}

// 在 Dep 上挂一个静态属性，
// 这个 Dep.target 的值会在调用 pushTarget 和 popTarget 时被赋值，值为当前 watcher 实例对象。
Dep.target = null
// 维护一个栈结构，用于存储和删除 Dep.target
const targetStack = []

// pushTarget 会在 new Watcher 时被调用
export function pushTarget(_target: ?Watcher) {
    if (Dep.target) targetStack.push(Dep.target)
    Dep.target = _target
}

// popTarget 会在 new Watcher 时被调用
export function popTarget() {
    Dep.target = targetStack.pop()
}
```

### watcher 和 Dep的关系

> `Dep` 是一个类，用于依赖收集和派发更新，也就是存放`watcher实例`和触发`watcher实例`上的`update`。
>
> `Watcher` 也是一个类，用于初始化 数据的`watcher实例`。它的原型上有一个 `update` 方法，用于派发更新。

一句话概括：`Dep`是`watcher实例`的管理者。类似观察者模式的实现。

PS：[详解](https://www.yuque.com/weixiaozhudelaocaipi/yy8wge/cqvzg2#aDvlZ)

### [基于proxy的双向绑定](https://www.yuque.com/weixiaozhudelaocaipi/yy8wge/pi0dhp#uobI2)

### watch的工作原理图

![](https://cdn.nlark.com/yuque/0/2020/png/583553/1585557212514-956d6152-d0e4-41d2-86f2-3c415a4e47ed.png?x-oss-process=image/resize,w_746/watermark,type_d3F5LW1pY3JvaGVp,size_14,text_6ICB6I-c55qu,color_FFFFFF,shadow_50,t_80,g_se,x_10,y_10)

