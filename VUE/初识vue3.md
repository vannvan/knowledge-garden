### 创建项目

> cli 版本 @4.5.6及以上

### 配置`ts`

1. 安装ts

   > yarn add typescript -D

2. 初始化`tsconfig.json`

   > npx tsc --init

3. 将`main.js`改为`main.ts`,所有vue组件的`<script>`标签添加`lang="ts"`

4. 在根目录添加` shim.d.ts `，添加以下内容

   ```typescript
   declare module "*.vue" {
     import { Component } from "vue";
     const component: Component;
     export default component;
   }
   ```

### 配置`vue-router`

> yarn add vue-router@4.0.0-beta.7

src/router/index.ts

```typescript
import {createRouter, createWebHashHistory} from 'vue-router'

// 在 Vue-router新版本中，需要使用createRouter来创建路由
export default createRouter({
  // 指定路由的模式,此处使用的是hash模式
  history: createWebHashHistory(),
  // 路由地址
  routes: []
})

```

### 配置vuex

> yarn add vuex@4.0.0-beta.4

src/store/index.ts

```typescript
import { createStore } from 'vuex'

interface State {
  userName: string
}

export default createStore({
  state(): State {
    return {
      userName: "bob",
    };
  },
});
```

### `main.ts`引入vue-router和vuex

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.ts'
import store from './store/index.ts'

const  app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
```

### vue2与vue3几个基础的区别

#### 建立数据data

>   **Vue2使用`选项类型API（Options API）`对比Vue3`合成型API（Composition API）`** 

 旧的选项型API在代码里分割了不同的属性（properties）：data，computed属性，methods，等等。新的合成型API能让我们用方法（function）来分割，相比于旧的API使用属性来分组，这样代码会更加简便和整洁。 

**vue2**

```js
export default {
  props: {
    title: String
  },
  data () {
    return {
      username: '',
      password: ''
    }
  }
}
```

**vue3.0** 开始，就需要使用新的`setup()`, 此方法在组件初始化构造的时候触发。 

1. 从vue引入`reactive`
2. 使用`reactive()`方法来声名我们的数据为反应性数据
3. 使用`setup()`方法来返回我们的反应性数据，从而我们的template可以获取这些反应性数据

```js
import { reactive } from 'vue'

export default {
  props: {
    title: String
  },
  setup () {
    const state = reactive({
      username: '',
      password: ''
    })

    return { state }
  }
}
// 这里构造的反应性数据就可以被template使用，可以通过`state.username`和`state.password`获得数据的值。
```

#### **Vue2 对比 Vue3的 `methods` 编写**

 **Vue2** 的选项型API是把methods分割到独立的属性区域的。我们可以直接在这个属性里面添加方法来处理各种前端逻辑。 

```js
export default {
  props: {
    title: String
  },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      // 登陆方法
    }
  }
}
```

**vue3.0**中`setup()`也可以用来操控methods.但是需要声明方法之后再return

```js
export default {
  props: {
    title: String
  },
  setup () {
    const state = reactive({
      username: '',
      password: ''
    })

    const login = () => {
      // 登陆方法
    }
    return { 
      login,
      state
    }
  }
}

```

#### 生命周期钩子

 在 **Vue2**，我们可以直接在组件属性中调用Vue的生命周期的钩子 

```js
export default {
  props: {
    title: String
  },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  mounted () {
    console.log('组件已挂载')
  },
  methods: {
    login () {
      // login method
    }
  }
}
```

**vue3.0**

```js
import { reactive, onMounted } from 'vue'

export default {
  props: {
    title: String
  },
  setup () {
    // ..

    onMounted(() => {
      console.log('组件已挂载')
    })

    // ...
  }
}
```

#### 计算属性`Computed`

**vue2.x**

```js
export default {
  // .. 
  computed: {
    lowerCaseUsername () {
      return this.username.toLowerCase()
    }
  }
}
```

 **Vue3** 的设计模式给予开发者们按需引入需要使用的依赖包。这样一来就不需要多余的引用导致性能或者打包后太大的问题 ,所以需要引入computed

```js
import { reactive, onMounted, computed } from 'vue'

export default {
  props: {
    title: String
  },
  setup () {
    const state = reactive({
      username: '',
      password: '',
      lowerCaseUsername: computed(() => state.username.toLowerCase())
    })

    // ...
  }
```

#### **接收 `Props`**

接收组件`props`参数传递这一块为我们带来了Vue2和Vue3之间最大的区别。

> **—`this`在vue3中与vue2代表着完全不一样的东西。**

 在 **Vue2**，`this`代表的是当前组件，不是某一个特定的属性。所以我们可以直接使用`this`访问prop属性值。就比如下面的例子在挂载完成后打印处当前传入组件的参数`title`。 

```js
mounted () {
    console.log('title: ' + this.title)
}
```

 但是在 **Vue3** 中，`this`无法直接拿到props属性，emit events（触发事件）和组件内的其他属性。不过全新的`setup()`方法可以接收两个参数： 

1. `props` - 不可变的组件参数
2. `context` - Vue3 暴露出来的属性（emit，slots，attrs）

所以在 Vue3 接收与使用props就会变成这样：

```js
setup (props) {
    // ...

    onMounted(() => {
      console.log('title: ' + props.title)
    })

    // ...
}
```

#### **事件 - `Emitting Events`**

**vue2.x**

```js
login () {
      this.$emit('login', {
        username: this.username,
        password: this.password
      })
 }
```

**vue3.0**

```js
setup (props, { emit }) {
    // ...

    const login = () => {
      emit('login', {
        username: state.username,
        password: state.password
      })
    }

    // ...
}
```













###  参考文章

- [带你体验Vue2和Vue3开发组件有什么区别](https://zhuanlan.zhihu.com/p/139590941)
- [尝鲜vue3.0](https://juejin.im/post/6870091402630397959)
- [Vue3.0来袭，你想学的都在这里](https://juejin.im/post/6872113750636232712)