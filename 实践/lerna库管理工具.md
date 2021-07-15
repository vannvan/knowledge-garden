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





## 文章

- [文档](https://lerna.js.org/)
- [lerna使用指南](https://www.jianshu.com/p/db3ee301af47)