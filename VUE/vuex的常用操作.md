#总结的一些常用的vuex的概念及操作

### 安装

> npm install vuex --save

### 基本概念 

1、this. $ store ： 我们可以通过 this.$store 在vue的组件中获取 vuex的实例。

2、State ： vuex中的数据源，我们可以通过 this.$store.state 获取我们在vuex中声明的全局变量的值。

3、Getter： 相当于vue中的computed ， 及 计算属性， 可以用于监听、计算 state中的值的变化

4、Mutation： vuex中去操作数据的方法 （只能同步执行）

5、Action： 用来操作 Mutation 的动作 ， 他不能直接去操作数据源，但可以把mutation变为异步的

6、Module： 模块化，当你的应用足够大的时候，你可以把你的vuex分成多个子模块

### vuex状态持久化

>npm install vuex-persistedstate 

在store里面加   plugins:[createPersistedState()]



### router更改页面标题

```javascript
router.beforeEach(function (to, from, next) {
      if(to.meta.title){
        document.title = to.meta.title
      }
      next()
    })
```

### mapstate用法

当一个组件需要获取多个状态时候 ，可以使用 `mapState` 辅助函数帮助我们（映射）生成计算属性 。

```javascript
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'

export default {
  // ...
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}
```

当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 `mapState` 传一个字符串数组。 

```javascript
computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
])
```

### 对象展开运算符

`mapState` 函数返回的是一个对象,如果要和局部计算属性混合使用，需要将多个对象合并为一个。

```javascript
computed: {
  localComputed () { /* ... */ },
  // 使用对象展开运算符将此对象混入到外部对象中
  ...mapState({
    // ...
  })
}
```

### vue 的get和post请求

> npm install --save axios vue-axios 

在main.js中添加

> import axios from 'axios'

> import VueAxios from 'vue-axios'

> Vue.prototype.$http = axios

使用示例：

```javascript
this.$http.get('/api/api/userlist.php')
        .then(res=> {
            // console.log(res.data);
            this.userList=res.data;
        })
        .catch(error=> {
            console.log(error);
        });
```

