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

### 子组件注入父组件数据

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

### v-for事件委托以增加性能

```vue
<div @click="handleClick">
      <div
        class="item"
        v-for="i in 10"
        :key="i"
        :data-id="i"
        style="width:120px;height:35px;border-bottom:1px solid #ccc"
      >{{i}}
	</div>
 </div>
 handleClick(e) {
      console.log(e.target.dataset.id);
 }
```

### 动态加载组件

```vue
<template>
  <div class="info">
    <component :is="roleComponent" v-if="roleComponent" />
  </div>
</template>
<script>
import AdminInfo from './admin-info'
import BookkeeperInfo from './bookkeeper-info'
import HrInfo from './hr-info'
import UserInfo from './user-info'
export default {
  components: {
    AdminInfo,
    BookkeeperInfo,
    HrInfo,
    UserInfo
  },
  data() {
    return {
      roleComponents: {
        admin: AdminInfo,
        bookkeeper: BookkeeperInfo,
        hr: HrInfo,
        user: UserInfo
      },
      role: 'user',
      roleComponent: undefined
    }
  },
  created() {
    const { role, roleComponent } = this
    this.roleComponent = roleComponent[role]
  }
}
</script>

```

### input为file的@change选择同一个文件第二次不生效

```vue
 <input
    type="file"
    @change="changeFile($event)"
    ref="file"
  />

this.$refs.file.value = null;
```

### 使用装饰器

`eslint`配置

```json
  "parserOptions": {
    "ecmaFeatures":{
      // 支持装饰器
      "legacyDecorators": true
    }
  }

```

组件内使用

```js
function log() {
  /**
   * @param target 对应 methods 这个对象
   * @param name 对应属性方法的名称
   * @param descriptor 对应属性方法的修饰符
   */
  return function(target, name, descriptor) {
    console.log(target, name, descriptor)
    const fn = descriptor.value
    descriptor.value = function(...rest) {
      console.log(`这是调用方法【${name}】前打印的日志`)
      fn.call(this, ...rest)
      console.log(`这是调用方法【${name}】后打印的日志`)
    }
  }
}

export default {
  created() {
    this.getData()
  },
  methods: {
    @log()
    getData() {
      console.log('获取数据')
    }
  }
}

```

确认框装饰器

```js
import { Dialog } from 'vant'

/**
 * 确认提示框装饰器
 * @param {*} message 提示信息
 * @param {*} title 标题
 * @param {*} cancelFn 取消回调函数
 */
export function confirm(
  message = '确定要删除数据，此操作不可回退。',
  title = '提示',
  cancelFn = function() {}
) {
  return function(target, name, descriptor) {
    const originFn = descriptor.value
    descriptor.value = async function(...rest) {
      try {
        await Dialog.confirm({
          message,
          title: title
        })
        originFn.apply(this, rest)
      } catch (error) {
        cancelFn && cancelFn(error)
      }
    }
  }
}
//使用示例
export default {
  methods: {
    // 可以不传参，使用默认参数
    @confirm()
    deleteData() {
      console.log('在这里做删除操作')
    }
  }
}
```

### 普通按钮触发input file事件

```vue
<div class="upload-btn-box">
　　<Button @click="choiceImg" icon="ios-cloud-upload-outline" type="primary">点击上传</Button>
    <input ref="filElem" type="file" class="upload-file" @change="getFile">
</div>
```

```js
choiceImg(){
    this.$refs.filElem.dispatchEvent(new MouseEvent('click')) 
},
getFile(){
    var that = this;
    const inputFile = this.$refs.filElem.files[0];
    if(inputFile){
        if(inputFile.type !== 'image/jpeg' && inputFile.type !== 'image/png' && inputFile.type !== 'image/gif'){
            alert('不是有效的图片文件！');
            return;
        }
        this.imgInfo = Object.assign({}, this.imgInfo, {
            name: inputFile.name,
            size: inputFile.size,
            lastModifiedDate: inputFile.lastModifiedDate.toLocaleString()
        })
        const reader = new FileReader();
        reader.readAsDataURL(inputFile);
        reader.onload = function (e) {
            that.imgSrc = this.result;
        }
    } else {
        return;
    }
}
```

### vue-cli 3以上的版本默认的 prefetch 配置会影响懒加载效果

需要关闭prefetch

```js

// vue.config.js
module.exports = {
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
 
    // 或者
    // 修改它的选项：
    config.plugin('prefetch').tap(options => {
      options[0].fileBlacklist = options[0].fileBlacklist || []
      options[0].fileBlacklist.push(/myasyncRoute(.)+?\.js$/)
      return options
    })
  }

```

### [VUE/H5】H5调起数字键盘的坑，及手写移动端键盘代码](https://blog.csdn.net/LuviaWu/article/details/89927370)

### 数字输入指令

```js
//限制正整数
  Vue.directive('enterIntNumber', {
    inserted: function(el) {
      let trigger = (el, type) => {
        const e = document.createEvent('HTMLEvents')
        e.initEvent(type, true, true)
        el.dispatchEvent(e)
      }
      el.addEventListener('keyup', function(e) {
        let input = e.target
        let reg = new RegExp('^\\d{1}\\d*$') //正则验证是否是数字
        let correctReg = new RegExp('\\d{1}\\d*') //正则获取是数字的部分
        let matchRes = input.value.match(reg)
        if (matchRes === null) {
          //若不是纯数字 把纯数字部分用正则获取出来替换掉
          let correctMatchRes = input.value.match(correctReg)
          if (correctMatchRes) {
            input.value = correctMatchRes[0]
          } else {
            input.value = ''
          }
        }
        trigger(input, 'input')
      })
    }
  })
  //输入数字限制最大值
  Vue.directive('enterNumberMax', {
    inserted: function(el, binding) {
      // binding.value
      let trigger = (el, type) => {
        const e = document.createEvent('HTMLEvents')
        e.initEvent(type, true, true)
        el.dispatchEvent(e)
      }

      el.addEventListener('keyup', function(e) {
        let input = e.target
        let value = input.value
        if (parseFloat(value) > parseFloat(binding.value)) {
          input.value = binding.value
        }
        trigger(input, 'input')
      })
    }
  })


//只能输入两位小数
Vue.directive('enterNumberPoint2', {
  inserted: function (el) {
    let trigger = (el, type) => {
      const e = document.createEvent('HTMLEvents')
      e.initEvent(type, true, true)
      el.dispatchEvent(e)
    }

    el.addEventListener("keyup", function (e) {
      let input = e.target;
      let reg = new RegExp('^((?:(?:[1-9]{1}\\d*)|(?:[0]{1}))(?:\\.(?:\\d){0,2})?)(?:\\d*)?$'); //正则验证是否是数字(小数整数均可)
      let matchRes = input.value.match(reg);
      if (matchRes === null) {
        input.value = "";
      } else {
        //matchRes[0]是匹配的无限位的小数
        //matchRes[1]是小数点后两位前面符合的数值  
        //如输入12.223 matchRes[0]是12.223 matchRes[1]12.22 此时input值改为matchRes[1]的值即可
        if (matchRes[1] !== matchRes[0]) {
          input.value = matchRes[1];
        }
      }
      trigger(input, 'input')
    });
  }
});


使用方式:
<!--限制两位小数和最大输入10000-->
<input v-enterNumberPoint2 v-enterNumberMax="10000" placeholder="0.00" type="number">

<!--限制输入正整数-->
<input v-enterIntNumber placeholder="0" type="number">
 
```

### 拷贝指令

```js
Vue.directive('copy', {
      /*
  bind 钩子函数，第一次绑定时调用，可以在这里做初始化设置
  el: 作用的 dom 对象
  value: 传给指令的值，也就是我们要 copy 的值
 */
      bind(el, { value }) {
        el.$value = value // 用一个全局属性来存传进来的值，因为这个值在别的钩子函数里还会用到
        el.handler = () => {
          if (!el.$value) {
            // 值为空的时候，给出提示，我这里的提示是用的 ant-design-vue 的提示，你们随意
            // Message.warning('无复制内容')
            Message({ type: 'info', content: '无复制内容' })

            return
          }
          // 动态创建 textarea 标签
          const textarea = document.createElement('textarea')
          // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
          textarea.readOnly = 'readonly'
          textarea.style.position = 'absolute'
          textarea.style.left = '-9999px'
          // 将要 copy 的值赋给 textarea 标签的 value 属性
          textarea.value = el.$value
          // 将 textarea 插入到 body 中
          document.body.appendChild(textarea)
          // 选中值并复制
          textarea.select()
          textarea.setSelectionRange(0, textarea.value.length)
          const result = document.execCommand('Copy')
          if (result) {
            Message({ type: 'info', content: '复制成功' })
          }
          document.body.removeChild(textarea)
        }
        // 绑定点击事件，就是所谓的一键 copy 啦
        el.addEventListener('click', el.handler)
      },
      // 当传进来的值更新的时候触发
      componentUpdated(el, { value }) {
        el.$value = value
      },
      // 指令与元素解绑的时候，移除事件绑定
      unbind(el) {
        el.removeEventListener('click', el.handler)
      }
    })
```

###  指令

```vue
<!-- 方法处理器 -->
<button v-on:click="doThis"></button>

<!-- 动态事件 -->
<button v-on:[event]="doThis"></button>

<!-- 内联语句 -->
<button v-on:click="doThat('hello', $event)"></button>

<!-- 缩写 -->
<button @click="doThis"></button>

<!-- 动态事件缩写 -->
<button @[event]="doThis"></button>

<!-- 停止冒泡 -->
<button @click.stop="doThis"></button>

<!-- 阻止默认行为 -->
<button @click.prevent="doThis"></button>

<!-- 阻止默认行为，没有表达式 -->
<form @submit.prevent></form>

<!-- 串联修饰符 -->
<button @click.stop.prevent="doThis"></button>

<!-- 键修饰符，键别名 -->
<input @keyup.enter="onEnter" />

<!-- 点击回调只会触发一次 -->
<button v-on:click.once="doThis"></button>

<!-- 对象语法 -->
<button v-on="{ mousedown: doThis, mouseup: doThat }"></button>
```









