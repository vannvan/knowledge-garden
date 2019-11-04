### 远程包版本

> npm info <packageName>
>
> npm view <packageName> versions --json

### 本地包版本

> npm ls <packageName>        // 本地包
>
> npm ls <packageName> -g     // 全局安装包

### 更新包

> npm update <name> -g   //全局包
>
> npm update <name> --save   //生产环境包
>
> npm update <name>  --save-dev   //开发环境包

### 安装包查看

> npm list -g --depth 0   //全局包

### 控制应用程序版本

> // 1.0.0
>
> npm version patch
>
> // 1.0.1
>
> npm version minor
>
> // 1.1.0
>
> npm version major
> // 2.0.0

根据部署的频率，可以通过每次部署时增加版本号节省时间，

```json
{
    "predeploy": "npm version patch"
}
```

### 设置默认npm init属性

```js
npm config set init.author.name "Joe Bloggs"
npm config set init.author.email "JoebLoggs@gmail.com"
npm config set init.author.url "Joebloggs.com"
npm config set init.license "MIT"
```

### 安装node-sass报错

> ```
> npm i node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
> ```

