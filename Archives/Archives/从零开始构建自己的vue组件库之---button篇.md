# 第一篇：从零开始构建自己的vue组件库

___



### 写在前面

​	为什么做这个？这是一个很值得思考的问题：

​	首先目前vue.js成熟的框架已有很多，各种框架之间的特性、风格、完善度也参差不齐，有时候做项目选框架就成了一个难以抉择的问题，因为一个项目要经过很多版本的迭代、很多需求的变更和增加，有时候甚至是无限期的更新需求，那么假如一开始你选择了一个框架，随着需求的增多和UI设计风格的多样化，开源的框架不能满足大多数场景的需求是必然的，这时候就需要考虑自己去封装适合自己的甚至通用的组件了。

### 封装组件的步骤

- 想好风格，确定将要用到的颜色、考虑组件的基本逻辑，组件之间的关联；
- 准备好组件的可选项，也就是props这些选项等；

- 设计组件调用的方式，如何暴露方法等。

### button组件开始

先不用考虑发布之后的动作，将组件包和展示页面放在一个项目下即可

建立一个专门的文件夹存放我们的组件库，以下目录形式仅供参考：

packages

|__button

​	|___src   

​		|__button.vue

​	|__index.js  

|___index.js  （暴露所有组件）

#### button.vue

```vue
<template>
  <button
    :disabled="disabled"
    :class="[prefixCls,prefixCls +'__' + type,prefixCls +'__' + type + '--' + size,
    {'is-plain': plain, 'is-disabled': disabled, 'is-round': round}]"
  >
    <i v-if="icon !== ''" :class="icon"></i>
    <span :class="[prefixCls + '__loading',type]" v-if="loading"></span>
    <slot></slot>
  </button>
</template>
<script>
const prefixCls = 'wui__button';
export default{
  name: 'WButton',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: 'default'
    },
    icon: {
      type: String,
      default: ''
    },
    plain: Boolean,
    disabled: Boolean,
    round: Boolean,
    loading: Boolean
  },
  data () {
    return {
      prefixCls:prefixCls,
    }
  }
}
</script>
```

packages下的index.js

```js
import WButton from './button/index.js';
const components = [
  WButton
]

const install = function(Vue) {
  if (install.installed) return
  components.map(component => Vue.component(component.name, component))
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  WButton
}

```

button下的index.js

```js
import Button from './src/button.vue';

Button.install = function (Vue) {
  Vue.component(Button.name, Button);
};

export default Button;

```

main.js 引入方式

```
import WUI from '../packages/index'
Vue.use(WUI)
```

至此一个button组件就写好了，并且支持按需引用和全局引用方式，自由灵活，当然定制的参数也知识参考当前主流框架的形式，本篇只是一个框架的起点，相当于万里长征的第一步，存在着许多不足，希望各位看官指正。

下一篇预告：message组件