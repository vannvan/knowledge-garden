# 第二篇：从零开始构建自己的vue组件库

----



### 组件需求

- message这种组件应该是按需加载的没差了，用的时候就不要写在页面里了，必须得是this.$message(config)这样子用的，姿势很优美[滑稽]；
- 顶部居中吧，既然人家各种框架也是顶部居中，咱也随大流啦，重在理解实现方式啦[再次滑稽];
- 好了，具体需求是，用不同图标表示不同类型的message（有默认）；时长自定义或默认；内容自定义；可关闭或不可关闭（或点击文字关闭）；

### PS：组件结构参考上一篇[button组件](https://segmentfault.com/a/1190000019041312)

### message.vue

```vue
<template lang="html">
  <transition name="message-fade">
    <div class="wui__message" :class="[prefixCls + '--' + type]" v-if="visible">
      <i  :class="[prefixCls + '__icon' + '--' + type,iconType]"></i>  
      <div :class="[prefixCls + '__content']">
        <span :class="[prefixCls + '__content' + '__body']" v-html="content"></span>
        <span v-if="closeTxt" @click="close()" :class="[prefixCls + '__closeTxt']">
          {{closeTxt}}
        </span>
        <span v-if="closable" :class="[prefixCls + '__iconbox']">
          <i class="icon-close" :class="[prefixCls + '__icon']"  @click="close()"></i>
        </span>
      </div>
    </div>
  </transition>
</template>

<script>
const prefixCls = 'wui__message';
export default {
  name:'Message',
  data(){
    return {
      prefixCls:prefixCls,
    }
  },
  mounted() {
    //do something after mounting vue instance
    if(this.closeTxt){
      this.closable = false
    }
  },
  methods: {
    close() {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

```

### message 目录下的 index.js

```js
import Vue from 'vue';
import Message from './src/message.vue';
const defaults = {
    visible:false,
    content:undefined,
    duration:'3',
    type:'info',
    closable:false,
    closeTxt:null,
    top:20,
    iconType:''
};
const typeMap = {
  "info":'icon-info',
  "error":'icon-heart-broken',
  "warning":'icon-stopwatch',
  "success":'icon-checkmark-outline'
}
const MessageVueConstructor = Vue.extend(Message);

MessageVueConstructor.prototype.close = function() {
  var vm=this;
  this.$on('after-leave', _ => {
    if (vm.$el && vm.$el.parentNode) {
      vm.$el.parentNode.removeChild(vm.$el);
    }
    this.$destroy();
  });
    vm.visible = false;

};
const messageBox = (options = {}) => {
    if (Vue.prototype.$isServer) return;
    options = Object.assign({}, defaults, options);
    let instance = new MessageVueConstructor({
      el: document.createElement('div'),
      data: options
    });
    if(!instance.type||!instance.content){return false}
    document.body.appendChild(instance.$el);
    Vue.nextTick(() => {
      instance.visible = true;
      instance.iconType = typeMap[instance.type]
      // if duration is 0 means can't close
      if(instance.duration!=0){
        setTimeout(function(){
          instance.close();
        },options.duration*1000)
      }
    });
    return instance;
  };

export default messageBox;

```

### package下的index.js（继上篇增加）

```
import WButton from './button/index.js';
import WMessage from './message/index';
const components = [
  WButton,
  WMessage
]

const install = function(Vue) {
  if (install.installed) return
  components.map(component => Vue.component(component.name, component))
  Vue.prototype.$Message = WMessage;  //important
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  WButton,
  WMessage,
}
```

### 接下来就可以愉快的使用了，具体的使用姿势如下

```
this.$Message({content:'this is info'})  
//不指定type默认为info
this.$Message({type:'info',content:'This is a closed message',closable:true})  
//这种情况就会有关闭的叉叉
this.$Message({type:'info',content:'this is 10-second message',duration:10})  
//时长10秒让message多待会
this.$Message({type:'info',content:'This is a message that can not be closed',duration:0}) 
//时长为0表示不想让消失
this.$Message({type:'info',content:'This is a custom closed text message',closeTxt:'朕知道了',duration:10})  
//自定义关闭文字也可以皮一下
```

至此一个message组件就愉快的实现了，可以满足大多数场景的需求，扩展性也是比较OK的，可是总觉得还缺点功能，路过的看官伸出无敌的小手指正一下可好？

