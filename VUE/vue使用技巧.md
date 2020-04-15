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

### 用hook监听自组件生命周期

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

#### vue 遮罩层滚动禁止body滚动

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

