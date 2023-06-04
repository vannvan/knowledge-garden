### 双向绑定基本原理

#### 让对象变得可“观测”

> Object.defineProperty     proxy 的拦截见javascript知识集下的defineProperty

```js
var obj = {
		value: 1
	}
var value = 1
Object.defineProperty(obj,'value',{
    get: function() {
        return value 
    },
    set: function(newValue) {
        value = newValue
        document.getElementById("container").innerHTML = newValue 
    }
})

document.getElementById("button").addEventListener("click",function() {
    obj.value += 1
})
```

**vue.js**中为了让一个对象的所有数据都可以被观测，运用了`Observer`类将正常的类转换成可观测的类，给每个`value`增加了`__ob__`属性，已标记该属性是被观测的。

**vue.js** 会对对象和数组进行不同的处理，

- 如果是`Object`类型时，遍历其属性值,并为每个属性添加`__ob__`属性以将该属性标记为可观测的，添加`__ob__`的功能主要通过`defineReactive `方法，该方法在调用时会判断`val`也就是对象的属性值是否也是一个对象，如果是对象就采用递归的方式对其进行更深一层的监听`new Observer`,最终会将对象的每个属性都转换成`getter/setter`的形式。
- 如果是`Array`类型时，通过`observeArray`遍历数组，对数组的每一项重新走`observe`工厂函数，再走`new Observer`
- 不管是数组还是对象，`Obverser`类只对它初始化已定义的属性进行了监听，所以vue只能监听到属性的修改，而不能监听到属性的新增和删除。所以vue内部提供了`$set`，`$delete`,`Vue.set`，`Vue.delete`和数组的`$remove`

#### 依赖收集

> 为了精准的更新视图，而不是数据一变化就更新全部视图
>
> getter收集依赖，setter通知依赖更新
>
> 依赖管理主要是`Dep`类的功能

##### Dep类的核心认知

`Dep` 是一个 Class，它定义了一些属性和方法，这里需要特别注意的是它有一个静态属性 `target`，这是一个全局唯一 `Watcher`，这是一个非常巧妙的设计，因为在同一时间只能有一个全局的 `Watcher` 被计算，另外它的自身属性 `subs` 也是 `Watcher` 的数组。

初始化一个`subs`数组，用来存放依赖，主要包含`addSub`,`removeSub`,`depend`,`notify`等方法来操作依赖。

`Dep`实际上就是对`Watcher`的一种管理。

```javascript
export default class Dep {
  constructor () {
    this.subs = []
  }

  addSub (sub) {
    this.subs.push(sub)
  }
  // 删除一个依赖
  removeSub (sub) {
    remove(this.subs, sub)
  }
  // 添加一个依赖
  depend () {
    if (window.target) {
      this.addSub(window.target)
    }
  }
  // 通知所有依赖更新
  notify () {
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}

/**
 * Remove an item from an array
 */
export function remove (arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}
```

对于数据`双向绑定`，依赖收集以上的方法主要体现在`defineReactive`中

```js
function defineReactive (obj,key,val) {
  if (arguments.length === 2) {
    val = obj[key]
  }
  if(typeof val === 'object'){
    new Observer(val)
  }
  const dep = new Dep()  //实例化一个依赖管理器，生成一个依赖管理数组dep
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get(){
      dep.depend()    // 在getter中收集依赖
      return val;
    },
    set(newVal){
      if(val === newVal){
          return
      }
      val = newVal;
      dep.notify()   // 在setter中通知依赖更新
    }
  })
}
```

##### 收集了依赖，Watcher去通知视图

。。。

#### 虚拟DOM

**基本认知**

就是用`JS`对象描述`DOM`节点

```js

{
  tag:'div',        // 元素标签
  attrs:{           // 属性
    class:'a',
    id:'b'
  },
  text:'我是内容',  // 文本内容
  children:[]       // 子元素
}
```

PS： `AST`是抽象语法树

**为什么需要由虚拟DOM**

因为vue数数据驱动的，数据变化就要触发视图的更新，视图更新难免要操作`DOM`，而频繁的操作`DOM`是非常耗费性能的，所以vue通过JS模拟出一个`DOM`节点，当数据发生变化的时候，vue通过`DOM-DIFF`算法计算出需要更新的地方，再去更新视图。

**VNode的类型**

- 注释节点
- 文本节点
- 元素节点
- 组件节点
- 函数式组件节点
- 克隆节点    //克隆节点有一个专门的`cloneVNode`方法将已有的节点复制到新的节点中

重点：

1. `元素节点`更贴近我们通产看到的`DOM`节点，他有专有的名词`tag`属性，包含`class`、`attributes`和`data`等属性

2. `组件节点`主要有两个特有的属性，
   - componentOptions :组件的option选项，如组件的`props`等
   - componentInstance :当前组件节点对应的`Vue`实例

3. `函数式组件节点`相较于`组件节点`它又有两个特有的属性
   - fnContext:函数式组件对应的Vue实例
   - fnOptions: 组件的option选项

#### **VNode的作用**

我们在视图渲染之前，把写好的`template`模板先编译成`VNode`并缓存下来，等到数据发生变化页面需要重新渲染的时候，我们把数据发生变化后生成的`VNode`与前一次缓存下来的`VNode`进行对比，找出差异，然后有差异的`VNode`对应的真实`DOM`节点就是需要重新渲染的节点，最后根据有差异的`VNode`创建出真实的`DOM`节点再插入到视图中，最终完成一次视图更新。

