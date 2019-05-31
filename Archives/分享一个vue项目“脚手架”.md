## 搭建缘由

源于公司每次新启动一个由多人协同开发的项目都由负责人初始化项目之后，每个人再去从私服pull一下项目才开始开发。但是每次初始化工程都是一步步的造轮子，一个个依赖去安装，新建一个个不同功能的文件夹，而每个负责人所初始化的项目目录、以及模块引入方式参差不齐，以至于开发中后期因每个人开发风格的不同导致git提交时总会产生各种各样的“冲突”，也会产生后期代码维护成本增加，所以就有必要考虑一下做一个统一的类似“脚手架”的功能了，用来给团队开发带来便捷的、统一的、易扩展的项目基础。

## 预实现的功能

- 公共样式统一管理，全局sass的友好引入

- 公共js统一管理
- 解决vue脚手架初始化的部分问题
- 路由形式、接口统一管理
- store模块化管理
- 定义vue前端项目必用的方法
- 修改好统一的config配置
- 全局混入/指令的封装

## 必要的依赖项

>- node-sass sass sass-resources sass-loader sass-recources-loader 
>- vuex vuex-persistedstate
>- axios
>- babel-polyfill

## 项目目录如下

![](https://ws3.sinaimg.cn/large/005BYqpggy1g3epc1pettj307l0fcq32.jpg)

## 配置公共sass

目录assets>scss文件形式

common.scss内容,mixin.scss内容详见[mixin公共sass函数](<https://github.com/vannvan/wvue-cli/blob/master/src/assets/scss/mixin.scss>)

 >@import './mixin.scss';   // 公共函数
 >@import './icomoon.css'; //字体图标
 >@import './wvue-cli.scss';  //项目公共样式

修改`utils.js`引入commom.css,就不用在main.js 或其他项目中的页面引入了

```js
//57行开始
function resolveResouce(name) {
    return path.resolve(__dirname, '../src/assets/scss/' + name);
  }
  function generateSassResourceLoader() {
      var loaders = [
   cssLoader,
   // 'postcss-loader',
   'sass-loader',
   {
       loader: 'sass-resources-loader',
       options: {
         // it need a absolute path
         resources: [resolveResouce('common.scss')]    
       }
   }
      ];
      if (options.extract) {
   return ExtractTextPlugin.extract({
     use: loaders,
     fallback: 'vue-style-loader'
   })
      } else {
   return ['vue-style-loader'].concat(loaders)
      }
  }
  // 注意这里
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateSassResourceLoader(),
    scss: generateSassResourceLoader(),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
```

## 接口统一管理

js目录下的urlConfig.js

```js
// 开发环境用config下proxyTable的代理地址
var BASE_URL = '/api';
var isPro = process.env.NODE_ENV === 'production'
if(isPro){
    BASE_URL= 'http://113.113.113.113:8011'  //生产环境下的地址
}

const UrlConfig = {
  getUserInfo:BASE_URL +'user/getinfo',  //获取用户信息
}
export default {
  UrlConfig
};
```

页面使用方式例如：

```js
this.$http.post(this.URL_CONFIG.UrlConfig.getUserInfo,datas)
.then(res =>{
    console.log(res)
}).catch(error =>{
    console.log(error)
})
// URL_CONFIG见全局混入中的方法
```

## 全局混入管理

全局混入主要用于项目中每个页面或模块都会用到的函数方法、计算属性、过滤方法等。

文件所属components>common>mixins>index.js

```js
//以下只是其中一种思路
import URL_CONFIG from '@/assets/js/urlConfig.js';
const mixin = {
     data(){
      return {
        URL_CONFIG:URL_CONFIG
     },
     methods: {
     //像时间戳转换这种方法大多数项目都能用的到，可以写在filter里也可以写在computed里，取决于运用场景
      formatDate(date, fmt) {
          if (/(y+)/.test(fmt)) {
              fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
          }
          let o = {
              'M+': date.getMonth() + 1,
              'd+': date.getDate(),
              'h+': date.getHours(),
              'm+': date.getMinutes(),
              's+': date.getSeconds()
          };
          for (let k in o) {
              if (new RegExp(`(${k})`).test(fmt)) {
                  let str = o[k] + '';
                  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str));
              }
          }
          return fmt;
      },
      padLeftZero(str) {
          return ('00' + str).substr(str.length);
      },
      loadPage(path,params){
        this.$router.push({
          path:path,
          query:params
        })
      }
    }
}
export default mixin
```

在main.js中引入

>//自定义全局mixin
>import mixins from '@/components/common/mixins'
>Vue.mixin(mixins)

## 全局指令管理

全局指令主要用于各个项目中由于vue指令不能满足需求，自定义的指令形式，在页面编写过程中可以带来很多的便利。

文件所属components>common>directive>index.js

```js
//以下只是一种思路，主要目的是分享自定义指令的方法
let mydirective = {}
mydirective.install = function (Vue) {
  //背景颜色
  Vue.directive('bg', {
    bind(el, binding) {
        el.style.color = '#f6f6f6';
    }
  }),
  //主题色
  Vue.directive('color', {
    bind(el, binding) {
        el.style.color = '#42E5D3';
    }
  }),
  Vue.directive('theme',function(el){
    el.style.color = '#42E5D3'
    el.style.background = '#f6f6f6'
  }),
  // 图片未加载完之前先用随机背景色占位
  Vue.directive('img', {
  inserted:function (el, binding) {
    var color = Math.floor(Math.random()*1000000);
    el.style.backgroundColor = "#" + color;
    var img = new Image();
    img.src = binding.value;
    img.onload = function(){
      el.style.backgroundImage = 'url('+ binding.value +')'
    }
  }
  })
}

export default mydirective;
```

在main.js中引入

>//自定义全局指令
>import directive from '@/components/common/directive'
>Vue.use(directive)

## store 模块化管理

store模块化管理主要是满足不同开发人员的需求、避免使用单一store文件导致命名冲突。同时在main里定义了统一的模块文件满足大多数项目开发的场景需求。

文件所属store>main.js

```js
import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import Axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

import baseInfo_store from './baseInfo'
Vue.use(Vuex)

const store = new Vuex.Store({
// 用不同的模块管理vuex存储数据
  modules: {
    baseInfoStore: baseInfo_store,  //userInfo模块
  },
  plugins: [createPersistedState({
      storage: window.sessionStorage 
  })]
})
//切换页面一般需要的loading动画状态
store.registerModule('pageSwitch', {
  state: {
    isLoading: false
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    }
  }
})
//切换路由的同时切换title
router.beforeEach(function (to, from, next) {
  if(to.meta.title){
    document.title = to.meta.title
  }
  store.commit('updateLoadingStatus', {isLoading: true})
  next()
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
})
//ajax请求的动画状态
store.registerModule('ajaxSwitch', {
  state: {
    ajaxIsLoading: false,
    ajaxIsPrompt: false,
  },
  mutations: {
    ajaxStar (state) {
      state.ajaxIsLoading = true
    },
    ajaxEnd (state) {
      state.ajaxIsLoading = false
    },
    ajaxPromptShow (state) {
      state.ajaxIsPrompt = true
    },
    ajaxPromptHide (state) {
      state.ajaxIsPrompt = false
    }
  },
  getter : {
    ajaxIsLoading: state => state.ajaxIsLoading
  }
})
//请求拦截
Axios.interceptors.request.use(config => {
  store.commit('ajaxStar')
  return config;
})
//响应拦截
Axios.interceptors.response.use(config => {
  //需要拦截的请求头
  return config
})
export default store;
```

在main.js引入

>import store from '@/store/main.js';

main.js的最终形式

```js
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios';
import "babel-polyfill";
import store from '@/store/main.js';
//自定义全局mixin
import mixins from '@/components/common/mixins'
Vue.mixin(mixins)
//自定义全局指令
import directive from '@/components/common/directive'
Vue.use(directive)

Vue.config.productionTip = false
Vue.prototype.$http = axios;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
```

## 解决vue-cli 初始配置的打包路径问题

其实这个在上面文件中已经有体现了，在这里再次提及一下。

- 步骤1：修改config>index.js文件

将build{  }下的assetsPublicPath改为如下

>assetsPublicPath: './',

- 步骤2：修改build>utils.js文件

找到 fallback: 'vue-style-loader'，在其下假如下面这一行

>publicPath: '../../'

## 结语

至此，一个基本完备的vue项目“脚手架”就完成了，以后每次初始化项目都可以按照这套方案来进行，省去了很多协作开发的交流环节，形成了能够满足大多数项目的目录及文件构成形式，将此项目托管至私服每次初始化项目只需拉取这个“脚手架”便能省区不少初始化项目的时间，岂不美哉！



此“脚手架”项目已开源至github，欢迎大家提出建议和互相交流，同时也可随意将项目拉下来进行使用。

[A scaffolding based on vue.js](<https://github.com/vannvan/wvue-cli>)

