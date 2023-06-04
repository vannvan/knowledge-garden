## vue组件间事件传值详细方法

### 子组件向父组件传值

1.用法需求，子组件的一个点击事件执行后父组件里有该事件下一步的操作，子组件内submitGrade() ,item即该方法要传的值，该实例传的是一个对象；在父组件里使用v-on监听submitGrade方法，同时绑定showGrade方法调用子组件传过来的data

```vue
子组件内（组件名selectGrade）
<div v-for="item in gradeInfo" @click='submitGrade(item)' class="subtab">
      {{item.gradeName}}
</div>
this.$emit('submitGrade',item);
```

```javascript
父组件内
<selectGrade v-on:submitGrade="showGrade"></selectGrade>
showGrade:function(data){
      // console.log(data);
      this.classInfo=data.classInfo
},
```

### 父组件向子组件传值

1.$ref 实现通信 

```vue
子组件
<template>
  <h3>{{message}}</h3>
</template>
<script>
  export default {
    data(){
      return{
        message:''
      }
    },
    methods:{
      getMessage(m){
        this.message=m;
      }
    }
  }
</script>
```

```vue
父组件
<template>
  <div>
    <h1>我是父组件！</h1>
    <child ref="msg"></child>
  </div>
</template>
<script>
  import Child from '../components/child.vue'
  export default {
    components: {Child},
    mounted: function () {
      console.log( this.$refs.msg);
      this.$refs.msg.getMessage('我是子组件一！')
    }
  }
</script>
```

2.props通信

```vue
<!-- 父组件 -->

<template>
  <div>
    <h1>我是父组件！</h1>
    <child message="我是子组件一！"></child>  //通过自定义属性传递数据
  </div>
</template>
<script>
import Child from '../components/child.vue'
export default {
  components: {Child},
}
</script>
```

```vue
 <!-- 子组件 -->
<template>
  <h3>{{message}}</h3>
</template>
<script>
  export default {
    props: ['message']   //声明一个自定义的属性
  }
</script>
```

3.动态传递  v-bind

```vue
<!-- 父组件 -->
<template>
  <div>
    <h1>我是父组件！</h1>
    <child message="我是子组件一！"></child> 

    <!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
    <child v-bind:message="a+b"></child>

    <!-- 用一个变量进行动态赋值。-->
    <child v-bind:message="msg"></child>
  </div>
</template>
<script>
import Child from '../components/child.vue'
export default {
  components: {Child},
  data() {
    return {
      a:'我是子组件二！',
      b:112233,
      msg: '我是子组件三！'+ Math.random()
    }
  }
}
</script>
```

```vue
<!-- 子组件 -->

<template>
  <h3>{{message}}</h3>
</template>
<script>
  export default {
    props: ['message']
  }
</script>
```





