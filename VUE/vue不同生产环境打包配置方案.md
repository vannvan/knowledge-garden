### 初级解决方案，以API接口配置为例

安装cross-env

> npm i cross-env -D

1.在config目录下建test.env.js文件

```js
'use strict'
module.exports = {
   NODE_ENV: '"testing"',
   ENV_CONFIG:'"test"'
}
```

2.修改prod.env.js文件

```js
'use strict'
module.exports = {
   NODE_ENV: '"production"',
   ENV_CONFIG:'"prod"'
}
```

3.对build中webpack.prod.conf.js做如下修改：

```js
// const env = require('../config/prod.env')  //原始代码
const env = config.build[process.env.env_config+'Env']  //修改后代码  这段配置来自于config/index.js
```

4.config中的index.js 文件中build部分代码修改如下：

```js
prodEnv: require('./prod.env'),
testEnv: require('./test.env'),
```

5.修改build/build.js

```js
// process.env.NODE_ENV = 'production'   //注释掉
// const spinner = ora('building for production...')   //注释掉
const spinner = ora('building for ' + process.env.NODE_ENV + ' of ' + process.env.env_config+ ' mode...' )   //修改后
```

6.package.json中添加script

```js
"build--test": "cross-env NODE_ENV=testing env_config=test node build/build.js",
"build--prod": "cross-env NODE_ENV=production env_config=prod node build/build.js"
```

7.关于API的配置中使用方法如下参考

```js
/*
 * 配置编译环境和线上环境之间的切换
 * baseUrl: 域名地址
 */
let baseUrl = '';
let cancleHTTP = [];//取消请求头设置；
//注：下面的baseUrl地址为假地址，只是模拟的，无法调通。
if (process.env.NODE_ENV == 'development') {
   baseUrl = "https://10.248.65.100/GetTravelMethod";
}else if(process.env.NODE_ENV == 'production'){
   baseUrl = "https://10.248.65.200/GetTravelMethod";
}else if(process.env.NODE_ENV == 'testing'){
   baseUrl = "https://10.248.65.150/GetTravelMethod";
}

export{
   baseUrl
}
```

8.打包命令

> npm run build--test
>
> npm run build-prod