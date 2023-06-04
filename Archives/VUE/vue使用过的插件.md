## 一款强大的Vue-markdown编辑器插件

### Install mavon-editor (安装)

```
$ npm install mavon-editor --save
```

### Use (如何引入)

### 全局引入

`main.js`:

```js
    // 全局注册
    // import with ES6
    import Vue from 'vue'
    import mavonEditor from 'mavon-editor'
    // markdown-it对象：md.s_markdown, md => mavonEditor实例
    //                 or
    //                 mavonEditor.markdownIt 
    import 'mavon-editor/dist/css/index.css'
    // use
    Vue.use(mavonEditor)
    new Vue({
        'el': '#main',
        data() {
            return { value: '' }
        }
    })
```

### 局部引入

```vue
<template>
        <div id="editor">
            <mavon-editor style="height: 100%"></mavon-editor>
        </div>
    </template>
    <script>
    // Local Registration
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    export default {
        name: 'editor',
        components: {
            mavonEditor
            // or 'mavon-editor': mavonEditor
        }
    }
    </script>
    <style>
    #editor {
        margin: auto;
        width: 80%;
        height: 580px;
    }
    </style>
```



页面内

```
<div id="main">
    <mavon-editor v-model="value"/>
</div>
```

 

 github地址：https://github.com/hinesboy/mavonEditor

### lodash

### compression-webpack-plugin@1.1.2     开启gzip

```nginx
    gzip on; 
    gzip_static on;
    gzip_buffers 4 16k;
    gzip_comp_level 5;
    gzip_types text/plain application/javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg 
             image/gif image/png;
```

[vue-cli webpack打包开启Gzip 报错—— Cannot find module 'compression-webpack-plugin](<https://www.cnblogs.com/xyyt/p/11384818.html>)





 

 

 