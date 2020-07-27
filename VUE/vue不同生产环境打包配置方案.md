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

### API接口配置改造方法2，不用动原有的config配置

1.在config目录新建env.conf.js，内容如下：

```js
'use strict'
module.exports = {
  'test': {
     NODE_ENV: '"testing"',
     ENV_CONFIG:'"test"'
  },
  'prod': {
     NODE_ENV: '"production"',
     ENV_CONFIG:'"prod"'
  },
  'prepro': {
    NODE_ENV: '"preproduction"',
    ENV_CONFIG:'"prepro"'
  }
}
```

2.在prod.conf.js中引入并修改env变量值来源

```js
const envConfig = require('../config/env.conf')
const currentEnv = process.argv[2] || 'prod'  //如果命令行没有输入env将按prod进行打包  
const env = envConfig[currentEnv]
//注：process.argv[2]中的值需要env.conf中存在
```

3.同样对build.js做如下修改

```js
//非常重要，注释以下
// process.env.NODE_ENV = 'production'
const envConfig = require('../config/env.conf')
if(process.argv[2] in envConfig == false) {
  console.log(chalk.red('检测到命令行env为空或无对应配置，将以prod环境配置进行打包'))
  process.env.ENV_CONFIG = 'prod'
//   process.exit(1)
}

const currentEnv = process.argv[2] || process.env.ENV_CONFIG
const spinner = ora('building for ' + currentEnv + ' of production...')
```

PS:build和prod.conf这样配置的原因是不能影响原有npm run build的执行逻辑，

4.项目中关于api的配置如urlConfig配置如下：

```js
//API_CONFIG的属性值需要和env.conf的NODE_ENV一一对应，除development之外
const API_CONFIG = {
  'development':'http:127.0.0.1:8088',
  'testing':'https://10.248.65.150/GetTravelMethod',
  'production':"https://10.248.65.200/GetTravelMethod",
  'preproduction':"https://10.248.65.300/GetTravelMethod"
}
let baseUrl = API_CONFIG[process.env.NODE_ENV]
export {
   baseUrl
}
```

5.package.json中新增script

```js
"build--env":"node build/build.js",
```

6.使用

> npm run build--env test/prepro/prod

### PS很重要填坑步骤

由于多了几种NODE_ENV，导致原有的项目assetsPublicPath在除production之外的环境下不生效，具体配置在原来webpack.base.conf.js中

```js
//原
  publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
//改
publicPath: process.env.NODE_ENV === 'development'
      ?config.dev.assetsPublicPath
      :config.build.assetsPublicPath
```

### cli-3.0配置方案

```js
//api.conf.js
export const API_CONFIG = {
    'development': '/api/v1',
    'testing': 'http://test-tpb.ikjzd.com/',
    'production': 'http://tpb.ikjzd.com/'
}
```

在文件根目录新建`.env.production`、`.env.testing`

```js
//.env.production
NODE_ENV = 'production'
VUE_APP_MODE = 'prod'
//.env.testing
NODE_ENV = 'testing'
VUE_APP_MODE = 'test'
```

package.json配置打包脚本

```js
"build": "vue-cli-service build --mode production",
"build--test": "vue-cli-service build --mode testing",
```

