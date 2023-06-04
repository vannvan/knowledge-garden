## 安装

> npm install iview --save 

### 全局使用

> import iView from 'iview'; 
>
> import 'iview/dist/styles/iview.css'; 
>
> Vue.use(iView); 

```js
import { Button, Table } from 'iview';
Vue.component('Button', Button);
Vue.component('Table', Table);
```



### 按需使用

> npm install babel-plugin-import --save-dev 

.babelrc中配置： 

```json
{
  "plugins": ["transform-vue-jsx", "transform-runtime",["import", {
    "libraryName": "iview",
    "libraryDirectory": "src/components"
  }]]
}
```

```js
import Vue from 'vue';
import { Button, Radio } from 'iview';
Vue.component('Button',Button);
Vue.component('Radio',Radio);
```

### 注：

当选择按需使用时，main.js只需保留view.css，

### 使用过程的一些坑

1.在删去main.js中的 import和use后，在组件内使用render注册iview组件props方法无效，同时使用this.$modal.info()等方法无效，故只能重新添加impor和use，暂未找到更合适的方法，

