# NPM

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

[安装 node-sass 的正确姿势](https://github.com/lmk123/blog/issues/28)

> npm i node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/

### 临时使用淘宝镜像

> npm --registry https://registry.npm.taobao.org install

### nvm

> `nvm ls-remote`：列出所有可以安装的node版本号
> `nvm install v10.4.0`：安装指定版本号的node
> `nvm use v10.3.0`：切换node的版本，这个是全局的
> `nvm current`：当前node版本
> `nvm ls`：列出所有已经安装的node版本

### 一些报错解决方案

> stack Error: Can't find Python executable "python", you can set the PYTHON env variable.

### .npmrc

```js
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
phantomjs_cdnurl=https://npm.taobao.org/mirrors/phantomjs/
electron_mirror=https://npm.taobao.org/mirrors/electron/
registry=https://registry.npm.taobao.org
```

### npm当前项目使用淘宝镜像

> 在当前项目下新建 `.npmrc`文件
>
> 内容 `registry=https://registry.npm.taobao.org`  

### node查看全局模块查找路径列表

> console.log(module.paths)

### pm2用于部署node服务

https://www.jianshu.com/p/7b7378deb3e5?utm_source=oschina-app

常用命令

```bash
 pm2 start app.js --name my-api # 命名进程
```

```bash
 pm2 start app.js -i max  # 根据有效CPU数目启动最大进程数目
 pm2 start app.js -i 3      # 启动3个进程
 pm2 start app.js -x        #用fork模式启动 app.js 而不是使用 cluster
 pm2 start app.js -x -- -a 23   # 用fork模式启动 app.js 并且传递参数 (-a 23)
 pm2 start app.js --name serverone  # 启动一个进程并把它命名为 serverone
 pm2 stop serverone       # 停止 serverone 进程
 pm2 start app.json        # 启动进程, 在 app.json里设置选项
 pm2 start app.js -i max -- -a 23                   #在--之后给 app.js 传递参数
 pm2 start app.js -i max -e err.log -o out.log  # 启动 并 生成一个配置文件，你也可以执行用其他语言编写的app  ( fork 模式):
 pm2 start my-bash-script.sh    -x --interpreter bash
 pm2 start my-python-script.py -x --interpreter python

```

```bash
 npm install pm2 -g     # 命令行安装 pm2 
 pm2 start app.js -i 4 #后台运行pm2，启动4个app.js 
                               # 也可以把'max' 参数传递给 start
                               # 正确的进程数目依赖于Cpu的核心数目
 pm2 start app.js --name my-api # 命名进程
 pm2 list               # 显示所有进程状态
 pm2 monit              # 监视所有进程
 pm2 logs               #  显示所有进程日志
 pm2 stop all           # 停止所有进程
 pm2 restart all        # 重启所有进程
 pm2 reload all         # 0秒停机重载进程 (用于 NETWORKED 进程)
 pm2 stop 0             # 停止指定的进程
 pm2 restart 0          # 重启指定的进程
 pm2 startup            # 产生 init 脚本 保持进程活着
 pm2 web                # 运行健壮的 computer API endpoint (http://localhost:9615)
 pm2 delete 0           # 杀死指定的进程
 pm2 delete all         # 杀死全部进程
```

### npx 命令可用于运行项目局部脚本命令

> npx pm2 list 对应安装在全局的命令 pm2 list

### yarn

设置镜像源：
1、查看当前镜像源：

> yarn config get registry

2、切换淘宝镜像源：

> yarn config set registry https://registry.npm.taobao.org

3、切换为yarn自带的镜像源：

> yarn config set registry https://registry.yarnpkg.com

### nrm

全局安装

> npm install -g nrm

```bash
nrm ls //  查看镜像
nrm use // 使用镜像
nrm add <镜像名> <镜像地址> // 添加镜像
nrm del <镜像名> // 删除镜像
nrm test npm    // 测试镜像响应时间
```

### npm的script详细用法

[npm scripts 使用指南-阮一峰](http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)

### script脚本的钩子

npm 脚本有`pre`和`post`两个钩子。举例来说，`build`脚本命令的钩子就是`prebuild`和`postbuild`。

```json	
"prebuild": "echo I run before the build script",
"build": "cross-env NODE_ENV=production webpack",
"postbuild": "echo I run after the build script"
```
```
prepublish: 在包发布之前运行，也会在npm install安装到本地时运行
publish,postpublish: 包被发布之后运行
preinstall: 包被安装前运行
install,postinstall: 包被安装后运行
preuninstall,uninstall: 包被卸载前运行
postuninstall: 包被卸载后运行
preversion: bump包版本前运行
postversion: bump包版本后运行
pretest,test,posttest: 通过npm test命令运行
prestop,stop,poststop: 通过npm stop命令运行
prestart,start,poststart: 通过npm start命令运行
prerestart,restart,postrestart: 通过npm restart运行
```

用户执行npm run build的时候，会自动按照下面的顺序执行。

>  npm run prebuild && npm run build && npm run postbuild

### 拿package.json中变量的方法

假设有以下配置

```javascript
{
  "name": "foo", 
  "version": "1.2.5",
  "scripts": {
    "view": "node view.js"
  }
}
```
某个脚本中可以使用以下方式获取变量,使用`npm_package_`前缀即可获取
```js
// script.js
console.log(process.env.npm_package_name); // foo
console.log(process.env.npm_package_version); // 1.2.5
```


### npm搭建私服过程

> https://www.cnblogs.com/dearxinli/p/11170359.html
>
> [史上最贴心NPM私服搭建辅导](https://www.codenong.com/j5dfa13f16fb9a016077/)

### npm link

> 模块和项目在同一目录下
> $ npm link ../module
>
> 
>
> 模块和项目不在同一目录下
> $ # 先去到模块目录，把它 link 到全局
> $ cd ../npm-link-test
> $ npm link
> $
> $ # 再去项目目录通过包名来 link
> $ cd ../my-project-link
> $ npm link test-npm-link(模块包名，即：package.json中name)
> $
> $ # 解除link
> $ 解除项目与模块的link，在项目目录下，npm unlink 模块名
> $ 解除模块全局的link，在模块目录下，npm unlink 模块名



## 资料

[如何开发一个基于node.js的CLI工具](https://blog.csdn.net/yidragon88xx/article/details/127065954)
