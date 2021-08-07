## lerna的基础使用

lerna管理的库文件结构类似如下这样

```js
my-lerna-repo/
  package.json
  packages/
    package-1/
      package.json
    package-2/
      package.json
```

### lerna主要做了什么

- 通过lerna的命令`lerna bootstrap` 将会把代码库进行link。
- 通过`lerna publish`发布最新改动的库

## 实践

起式

```kotlin
npm i -g lerna
lerna init --independent
```

生成如下目录

```css
- packages(目录)
- lerna.json(配置文件)
- package.json(工程描述文件)
```

在packages下级创建包含package.json的子模块

在项目主目录执行安装脚本,这样两个子模块均会拥有lodash这个插件包了

```bash
lerna add lodash
```

## lerna配置说明

```json
{
    "useWorkspaces": true, // 使用 workspaces 配置。此项为 true 的话，将使用 package.json 的 "workspaces"，下面的 "packages" 字段将不生效
    "version": "0.1.0", // 所有包版本号，独立模式-"independent"
    "npmClient": "cnpm", // npm client，可设置为 cnpm、yarn 等
    "packages": [ // 包所在目录，可指定多个
        "packages/*"
    ],
    "command": { // lerna 命令相关配置
        "publish": { // 发布相关
            "ignoreChanges": [ // 指定文件或目录的变更，不触发 publish
                ".gitignore",
                "*.log",
                "*.md"
            ]
        },
        "bootstrap": { // bootstrap 相关
            "ignore": "npm-*",  // 不受 bootstrap 影响的包
            "npmClientArgs": [ // bootstr 执行参数
                "--no-package-lock"
            ]
        }
    }
}
```

## 常用命令

在每个包里运行指定的命令

> lerna run < script > -- [..args]
>
> eg: learn run start 

```
$ lerna run <script> -- [..args] # 在所有包下运行指定

# 例如
$ lerna run test # 运行所有包的 test 命令
$ lerna run build # 运行所有包的 build 命令
$ lerna run --parallel watch # 观看所有包并在更改时发报，流式处理前缀输出

$ lerna run --scope my-component test # 运行 my-component 模块下的 test
```

把所有包的依赖安装到根 `node_modules`。

> lerna bootstrap --hoist

lerna安装包

```shell
# 给a, b 包中加入Lodash，会同时改变a,b模块中packages.json文件
lerna add lodash packages/a packages/b 
# 给a 包中加入jquery, 使用--dev参数是使依赖加入到devDependencies中
lerna add jquery packages/a --dev
# 你也可以使用通配符, 下面这命令，会往所有re开头的模块包中加入依赖
lerna add jquery packages/re-* 
# 指定特定的范围，要使用--scope参数，如下：给b包安装a模块
lerna add a --scope=b
```


## 文章

- [文档](https://lerna.js.org/)
- [中文文档-比较详细](http://www.febeacon.com/lerna-docs-zh-cn/routes/commands/bootstrap.html)
- [lerna使用指南](https://www.jianshu.com/p/db3ee301af47)
- [如何优雅地管理多个npm包](https://blog.csdn.net/weixin_39829236/article/details/110662736)
- [lerna最佳实践](https://blog.csdn.net/chiwanjuan3936/article/details/100935869)
- [lerna最佳实践2-命令说明比较清楚](http://www.sosout.com/2018/07/21/lerna-repo.html)

