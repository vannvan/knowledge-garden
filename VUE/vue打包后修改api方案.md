### 第一步

```
npm install --save-dev generate-asset-webpack-plugin
```

### 第二步

```js
//让打包的时候输出可配置的文件
var GenerateAssetPlugin = require('generate-asset-webpack-plugin'); 
var createServerConfig = function(compilation){
  let cfgJson={ApiUrl:"http://198.129.31.108:8080"};
  return JSON.stringify(cfgJson);
}
```

```js
//让打包的时候输入可配置的文件
//这段代码加在plugins:[]中
    new GenerateAssetPlugin({
        filename: 'serverconfig.json',
        fn: (compilation, cb) => {
            cb(null, createServerConfig(compilation));
        },
        extraFiles: []
    })
```

### 第三步

```js
//在main.js中定义一个全局函数
Vue.prototype.getConfigJson=function(){
    this.$http.get("serverconfig.json").then((result)=>{
        //用一个全局字段保存ApiUrl  也可以用sessionStorage存储
        Vue.prototype.ApiUrl=result.body.ApiUrl;
    }).catch((error)=>{console.log(error)});
}
```

### 第四步

```js
//在app.vue里面  执行this.getConfigJson();
mounted:function(){
      this.getConfigJson();
}
//之后...用在需要用到的地方  因为ApiUrl已经是全局了 可以直接用this.ApiUrl
var url=this.ApiUrl+'/api/....
```



** 该方法要注意的一点是api获取时最好放在全局且绑定在vue原型上。