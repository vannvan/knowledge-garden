### 打包文件以时间戳定义版本号

webpack.prod.conf.js

```js
const  Version = new Date().getTime();  //用时间戳区分版本号
filename: utils.assetsPath('js/[name].[chunkhash].' + Version + '.js'),
chunkFilename: utils.assetsPath('js/[id].[chunkhash].' + Version + '.js')
```

### 禁用生产环境中的console

webpack.prod.conf.js找到 UglifyJsPlugin ({  })，改为如下

```js
compress: {
          warnings: false,
          drop_console: true,//console
          pure_funcs: ['console.log']//移除console
        }
```


### vue arrow按钮点击旋转，用在伸缩类型组件中

```scss

//arrow旋转
    .arrow-rotate-back {
      transition: all .5s;
    }
    
    .arrow-rotate {
      transform: rotate(180deg);
      transition: all .5s;
    }
```

```vue
   <img src="@/assets/images/temperature/arrow-up1.png" :class="[item.expand?'arrow-rotate':'arrow-rotate-back']">
```

###  事件方法传入当前dom和其他参数 $event

```vue
 <div
        class="province-item"
        v-for="(item,index) in provinceData"
        :key="index"
        @mouseover="mouseOver(item,$event)"
        @mouseleave="mouseLeave(item,$event)"
  >
```

### watch监听多个参数

```vue
<script>
export default {
  data() {
    return {
      msg1: "apple",
      msg2: "banana"
    };
  },
  computed: {
    msgObj() {
      const { msg1, msg2 } = this;
      return {
        msg1,
        msg2
      };
    }
  },
  watch: {
    msgObj: {
      handler(newVal, oldVal) {
        if (newVal.msg1 != oldVal.msg1) {
          console.log("msg1 is changed");
        }
      }
    }
  }
};
</script>
```

### 自定义组件双向绑定

> 允许一个自定义组件使用v-model时定制prop和event。默认情况下，一个组件上的v-model会把value用作prop且把input用作event，但是输入类型比如单选框和复选框按钮可能想使用value prop来达到不同的目的，使用model选项可以回避这些情况产生的冲突。

input默认作为双向绑定的更新事件，通过$emit可以更新绑定的值。

```vue

<my-switch v-model="val"></my-switch>
<script>
export default {
  props: {
    type: Boolean,
    default: false
  },
  methods: {
      swicthChange(val) {
        this.$emit('input',val)
      }
  },
};
</script>
```

修改组件的model选项，自定义绑定的变量和事件。

```vue
<template>
  <my-switch v-model="num" value="some value"></my-switch>
</template>

<script>
export default {
 model:{
     prop:'num',
     event:'update'
 },
 props:{
     value:{
         type:String,
         default:""
     },
     num:{
         type:Number,
         default:0
     }
 },
 methods: {
     numChange() {
         this.$emit('update',num++)
     }
 },
};
</script>
```

### 用hook监听子组件生命周期

```vue
<List @hook:mounted="listenMounted"></List>
<script>
export default {
    methods: {
        listenMounted() {
            console.log('child comp is mounted')
        }
    },
}
</script>
```

### 程序化的事件监听器

> 比如在页面挂载时定义一个定时器，需要在页面销毁时清除定时器，通常情况下我们是这么写的

```vue
<script>
export default {
    mounted () {
        this.timer = setInterval(() => {
            console.log('do something')
        }, 100);
    },
    destroyed () {
        clearInterval(this.timer);
    },
}
</script>
```

> 但还可以这样写

```vue
<script>
export default {
    mounted () {
      this.creatInterval('hello')  
    },
    methods: {
        creatInterval(msg) {
            let timer = setInterval(() => {
                console.log(msg)
            }, 100);
            this.$once('hook:beforeDestroy',function() {
                clearInterval(timer)
            })
        }
    },
}
</script>

```

### vue 遮罩层滚动禁止body滚动

```js
handleOpenPopup() {
      this.userListVisible = true;
      let scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      document.body.style.cssText +=
        "position:fixed;width:100%;top:-" + scrollTop + "px;";
},
handleClosePopup() {
    this.userListVisible = false;
    let body = document.body;
    body.style.position = "";
    let top = body.style.top;
    document.body.scrollTop = document.documentElement.scrollTop = -parseInt(
        top
    );
    body.style.top = "";
},
```

### vue 中的$listeners与$attrs,批量传递属性和方法

在涉及层级嵌套的组件时，如：

```vue
<component-a>
	<component-b>
  	<component-c></component-c>
  </component-b>
</component-a>
```

如果这时想将数据从 a 传到 c，或者在 a 上监听 c 的事件。普通的写法我们需要通过 props 由 a 传到 b，再由 b 传到 c。想想也还能忍受，但是如果需要传的 props 比较多，或者层级再多一点那就是灾难了。

使用 $listeners 与 $attrs 可以简化：

```vue
<!-- component-a -->
<template>
	<component-b :data1="xx" :data2="xx" @event1="yy" @event2="yy" />
</template>
```

```vue
<!-- component-b -->
<template>
	<component-c v-bind="$attrs" v-on="$listeners" />
</template>
```

```vue
<!-- component-c -->
<template>
	<div>data1: {{ data1 }} data2: {{ data2 }}</div>
</template>
```

### 模拟dispatch,找到父组件并且触发父组件方法

```js
  // dispatch.js
export default {
  methods: {
    dispatch (componentName, eventName, params = []) {
      let parent = this.$parent || this.$root
      let name = parent.$options._componentTag

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent
        if (parent) {
          name = parent.$options._componentTag
        }
      }
      if (parent) {
        parent.$emit(eventName, params)
      }
    }
  }
}
```

```js
import dispatch from '../../utils/dispatch'
export default {
  name: 'menu-item',
  mixins: [dispatch],
  props: {
    route: {
      type: String,
      default: ' '
    }
  },
  methods: {
    handleRoute () {
      if (this.route) {
        this.dispatch('my-menu', 'closeByRoute')
      }
    }
  }
}
```

### 组件向上派发

```js
Vue.prototype.$dispatch = function $dispatch(eventName, data) {
  let parent = this.$parent;
  while (parent) {
    parent.$emit(eventName, data);
    parent = parent.$parent;
  }
};
```

### 组件向下派发

```js
Vue.prototype.$broadcast = function $broadcast(eventName, data) {
  const broadcast = function () {
    this.$children.forEach((child) => {
      child.$emit(eventName, data);
      if (child.$children) {
        $broadcast.call(child, eventName, data);
      }
    });
  };
  broadcast.call(this, eventName, data);
};
```

### 自组件注入父组件数据

### Provide  

在父级中注入数据

```js
provide() {
  return { parentMsg: "父亲" };
},
```

### Inject

在任意子组件中可以注入父级数据

```js
inject: ["parentMsg"] // 会将数据挂载在当前实例上
```

### render订制组件

通过render方法来订制组件,在父组件中传入render方法

```vue
<List :data="data" :render="render"></List>
render(h, name) {
   return <span>{name}</span>;
 }
```

我们需要createElement方法，就会想到可以编写个函数组件，将createElement方法传递出来

```vue
<template>
 <div class="list">
  <div v-for="(item,index) in data" :key="index">
   <li v-if="!render">{{item}}</li>
   <!-- 将render方法传到函数组件中，将渲染项传入到组件中，在内部回调这个render方法 -->
   <ListItem v-else :item="item" :render="render"></ListItem>
  </div>
 </div>
</template>
<script>
import ListItem from "./ListItem";
export default {
 components: {
  ListItem
 },
 props: {
  render: {
   type: Function
  },
  data: Array,
  default: () => []
 }
};
</script>
```

ListItem.vue调用最外层的render方法，将createElement和当前项传递出来

```html
<script>
export default {
 props: {
  render: {
   type: Function
  },
  item: {}
 },
 render(h) {
  return this.render(h, this.item);
 }
};
</script>
```

