## npm
### 安装机制
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1685412170619-55a2a704-64d5-4ad8-b206-449f0cdd2349.png#averageHue=%23f7f7f7&clientId=uf7e71cc3-9a01-4&from=paste&height=526&id=ud1a4b1c7&originHeight=1052&originWidth=2172&originalType=binary&ratio=2&rotation=0&showTitle=false&size=482390&status=done&style=none&taskId=u24f21597-9275-497b-b4dc-bd3d8b2b5ce&title=&width=1086)
npm install 执行之后，首先，检查并获取 npm 配置，**这里的优先级为：**
> **项目级的 .npmrc 文件 > 用户级的 .npmrc 文件> 全局级的 .npmrc 文件 > npm 内置的 .npmrc 文件**。

### 缓存机制
**对于一个依赖包的同一版本进行本地化缓存，是当代依赖包管理工具的一个常见设计**。使用时要先执行以下命令：
> npm config get cache

得到配置缓存的根目录在 /Users/cehou/.npm（ Mac OS 中，npm 默认的缓存位置） 当中。我们 cd 进入 /Users/cehou/.npm 中可以发现_cacache文件。事实上，在 npm v5 版本之后，缓存数据均放在根目录中的_cacache文件夹中
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1685412377760-7e35c4b4-2f54-4aa0-969e-33fb5663d948.png#averageHue=%23f9f9f9&clientId=uf7e71cc3-9a01-4&from=paste&height=203&id=uc4b19e8c&originHeight=406&originWidth=2444&originalType=binary&ratio=2&rotation=0&showTitle=false&size=125218&status=done&style=none&taskId=ub86134ac-db80-4f73-9b36-06fc211470a&title=&width=1222)
我们可以使用以下命令清除 /Users/cehou/.npm/_cacache 中的文件：
>  npm cache clean --force

接下来打开`_cacache`文件，看看 npm 缓存了哪些东西，一共有 3 个目录：

- content-v2
- index-v5
- tmp

其中 content-v2 里面基本都是一些二进制文件。为了使这些二进制文件可读，我们把二进制文件的扩展名改为 .tgz，然后进行解压，得到的结果其实就是我们的 npm 包资源。
而 index-v5 文件中，我们采用跟刚刚一样的操作就可以获得一些描述性的文件，事实上这些内容就是 content-v2 里文件的索引。
这些缓存如何被储存并被利用的呢？
这就和 npm install 机制联系在了一起。当 npm install 执行时，通过[pacote](https://www.npmjs.com/package/pacote)把相应的包解压在对应的 node_modules 下面。npm 在下载依赖时，先下载到缓存当中，再解压到项目 node_modules 下。pacote 依赖[npm-registry-fetch](https://github.com/npm/npm-registry-fetch#npm-registry-fetch)来下载包，npm-registry-fetch 可以通过设置 cache 属性，在给定的路径下根据[IETF RFC 7234](https://datatracker.ietf.org/doc/rfc7234/)生成缓存数据。
接着，在每次安装资源时，根据 package-lock.json 中存储的 integrity、version、name 信息生成一个唯一的 key，这个 key 能够对应到 index-v5 目录下的缓存记录。如果发现有缓存资源，就会找到 tar 包的 hash，根据 hash 再去找缓存的 tar 包，并再次通过[pacote](https://www.npmjs.com/package/pacote)把对应的二进制文件解压到相应的项目 node_modules 下面，省去了网络下载资源的开销。
**注意，这里提到的缓存策略是从 npm v5 版本开始的。在 npm v5 版本之前，每个缓存的模块在 ~/.npm 文件夹中以模块名的形式直接存储，储存结构是：{cache}/{name}/{version}**。
### 常用方法
#### i和install的区别⭐️
实际使用的区别点主要如下：

- 用npm i安装的模块无法用npm uninstall删除，用npm un才卸载掉
- npm i会帮助检测与当前 node 版本最匹配的 npm 包版本号，并匹配出来相互依赖的 npm 包应该提升的版本号
- 部分 npm 包在当前 node 版本下无法使用，必须使用建议版本
- 安装报错时 install 肯定会出现 npm-debug.log 文件，npm i不一定
#### npm link
工作原理是 : 将其链接到全局 node 模块安装路径中 . 为目标 npm 模块的可执行 bin 文件**创建软连接** 将其连接到全局 node 命令安装路径中 。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1685356219079-6d73a937-8c77-41fe-be37-ac2fdff7221e.png#averageHue=%23f6f6f6&clientId=u430c898e-e136-4&from=paste&height=280&id=u53739584&originHeight=560&originWidth=1407&originalType=binary&ratio=2&rotation=0&showTitle=false&size=201018&status=done&style=none&taskId=u1cf35785-470b-4032-bcc1-4c6df09d2d5&title=&width=703.5)
#### npm ci⭐️
它与 npm install 在以下方面不同：

- 它会根据 package-lock.json 安装依赖包，这可以保证整个开发团队都使用版本完全一致的依赖，避免把时间浪费在排查因为依赖不一致而导致的各种奇怪问题上
- 它会安装 package-lock.json 文件中提到的软件包的确切版本，无需计算求解依赖满足问题，在大多数情况下都可以大大加速 node 模块安装过程
- 它会先删除项目中现有的 node_modules ，然后全新安装
- 它不会写入 package.json 或任何包锁：安装基本上是冻结的
- npm install 可以安装单个依赖包，npm ci 只能一次安装整个项目所以依赖包，无法安装单个依赖包

另外，如果 package-lock.json 过时（和 package.json 冲突），那么 npm ci 会很贴心地报错，避免项目依赖陷入过时状态。
注意： 如果你使用 npm ci，别忘了把 package-lock.json 加入 git 仓库。
#### 删除重复的包
> npm dedupe or npm ddp

#### 扫描漏洞
> npm audit fix

我们可以运行 npm audit 命令来扫描我们的项目中任何依赖项中的任何漏洞。 它会以表格格式生成漂亮的输出并显示（我们也可以用JSON获取输出），如果其它包是多级/多依赖项，则其它包都依赖于此包。
npm audit fix 会自动安装所有漏洞包的补丁版本(如果可用)
#### 检查包是否过时
> npm outdated --long or npm outdated -l

#### npx
npx 由 npm v5.2 版本引入，解决了 npm 的一些使用快速开发、调试，以及项目内使用全局模块的痛点。
npx 可以直接执行 node_modules/.bin 下的文件 , 可以自动去 node_modules/.bin 路径和环境变量 $path 中检查命令是否存在 .
npx 执行模块时会优先安装依赖，但是在安装执行后便删除此依赖，这就避免了全局安装模块带来的问题。
运行如下命令后，npx 会将 create-react-app 下载到一个临时目录，使用以后再删除：
> npx create-react-app cra-project

#### 自定义init⭐️
npm config set init-module ~/.npm-init.js
```javascript
const fs = require('fs');
 
const content = `{
  "extends": "semistandard"
}`
fs.writeFileSync('.eslintrc.json', content);
fs.mkdirSync('test');
 
module.exports = {
  name: prompt('name', basename || package.name),
  version: '0.0.1',
  description: prompt(s => s),
  main: prompt('entry point', 'index.js', ep => fs.writeFileSync(ep, '')),
  author: 'Red Hat, Inc.',
  license: 'Apache-2.0',
  scripts: {
    test: 'tape test/*.js | tap-spec',
    lint: 'eslint test/*.js index.js',
    prepublish: 'nsp check',
    coverage: 'istanbul cover tape test/*.js'
  },
  repository: {
    type: 'git',
    url: 'git://github.com/USER/' + basename + '.git'
  },
  files: [
    'package.json',
    'README.md',
    'LICENSE',
    'index.js'
  ],
  bugs: {url: 'https://github.com/USER/' + basename + '/issues'},
  homepage: 'https://github.com/USER/' + basename,
  keywords: prompt(s => s.split(/\s+/)),
  devDependencies: {
    eslint: '*',
    'eslint-config-semistandard': '*',
    'eslint-config-standard': '*',
    'eslint-plugin-promise': '*',
    'eslint-plugin-react': '*',
    'eslint-plugin-standard': '*',
    istanbul: '*',
    nsp: '*',
    'tap-spec': '*',
    tape: '*'
  },
  cleanup: function (cb) {
    cb(null, undefined);
  }
};
```
#### preinstall的应用⭐️
```javascript
"scripts": {
    "preinstall": "node ./bin/preinstall.js"
}
```
其中 preinstall.js 脚本内容，具体逻辑为通过 node.js 执行npm config set命令，代码如下：
```javascript
require(' child_process').exec('npm config get registry', function(error, stdout, stderr) {
  if (!stdout.toString().match(/registry\.x\.com/)) {
    exec('npm config set @xscope:registry https://xxx.com/npm/')
  }
})
```
### 要不要提交 lockfiles 到仓库？
这就需要看项目定位决定了

- 如果开发一个应用，建议把 package-lock.json 文件提交到代码版本仓库。这样可以保证项目组成员、运维部署成员或者 CI 系统，在执行 npm install 后，能得到完全一致的依赖安装内容。
- 如果你的目标是开发一个给外部使用的库，那就要谨慎考虑了，因为**库项目一般是被其他项目依赖的，在不使用 package-lock.json 的情况下，就可以复用主项目已经加载过的包，减少依赖重复和体积**。
- 如果我们开发的库依赖了一个精确版本号的模块，那么提交 lockfiles 到仓库可能会造成同一个依赖不同版本都被下载的情况。如果作为库开发者，真的有使用某个特定版本依赖的需要，一个更好的方式是**定义 peerDependencies**。

因此，一个推荐的做法是：**把 package-lock.json 一起提交到代码库中，不需要 ignore。但是执行 npm publish 命令，发布一个库的时候，它应该被忽略而不是直接发布出去**。
### 不完全指南

1. 早期 npm 锁定版本的方式是使用 npm-shrinkwrap.json，它与 package-lock.json 不同点在于：npm 包发布的时候默认将 npm-shrinkwrap.json 发布，因此类库或者组件需要慎重。
2. 使用 package-lock.json 是 npm v5.x 版本新增特性，而 npm v5.6 以上才逐步稳定，在 5.0 - 5.6 中间，对 package-lock.json 的处理逻辑进行过几次更新。
3. 在 npm v5.0.x 版本中，npm install 时都会根据 package-lock.json 文件下载，不管 package.json 内容究竟是什么。
4. npm v5.1.0 版本到 npm v5.4.2，npm install 会无视 package-lock.json 文件，会去下载最新的 npm 包并且更新 package-lock.json。
5. npm 5.4.2 版本后：
- 如果项目中只有 package.json 文件，npm install 之后，会根据它生成一个 package-lock.json 文件；
- 如果项目中存在 package.json 和 package-lock.json 文件，同时 package.json 的 semver-range 版本 和 package-lock.json 中版本兼容，即使此时有新的适用版本，npm install 还是会根据 package-lock.json 下载；
- 如果项目中存在 package.json 和 package-lock.json 文件，同时 package.json 的 semver-range 版本和 package-lock.json 中版本不兼容，npm install 时 package-lock.json 将会更新到兼容 package.json 的版本；
- 如果 package-lock.json 和 npm-shrinkwrap.json 同时存在于项目根目录，package-lock.json 将会被忽略。
### 最佳实操建议

1. 优先使用 npm v5.4.2 以上的 npm 版本，以保证 npm 的最基本先进性和稳定性。
2. 项目的第一次搭建使用 npm install 安装依赖包，并提交 package.json、package-lock.json，而不提交 node_modules 目录。
3. 其他项目成员首次 checkout/clone 项目代码后，执行一次 npm install 安装依赖包。
4. 对于升级依赖包的需求：
- 依靠 npm update 命令升级到新的小版本；
- 依靠 npm install @ 升级大版本；
- 也可以手动修改 package.json 中版本号，并执行 npm install 来升级版本；
- 本地验证升级后新版本无问题，提交新的 package.json、package-lock.json 文件。
1. 对于降级依赖包的需求：执行 npm install @ 命令，验证没问题后，提交新的 package.json、package-lock.json 文件。
2. 删除某些依赖：
- 执行 npm uninstall 命令，验证没问题后，提交新的 package.json、package-lock.json 文件；
- 或者手动操作 package.json，删除依赖，执行 npm install 命令，验证没问题后，提交新的 package.json、package-lock.json 文件。
1. 任何团队成员提交 package.json、package-lock.json 更新后，其他成员应该拉取代码后，执行 npm install 更新依赖。
2. 任何时候都不要修改 package-lock.json。
3. 如果 package-lock.json 出现冲突或问题，建议将本地的 package-lock.json 文件删除，引入远程的 package-lock.json 文件和 package.json，再执行 npm install 命令。
## yarn
Yarn 是一个由 Facebook、Google、Exponent 和 Tilde 构建的新的 JavaScript 包管理器。它的出现是为了解决历史上 npm 的某些不足（比如 npm 对于依赖的完整性和一致性保障，以及 npm 安装速度过慢的问题等），虽然 npm 目前经过版本迭代汲取了 Yarn 一些优势特点（比如一致性安装校验算法等），但我们依然有必要关注 Yarn 的思想和理念。
当 npm 还处在 v3 时期时，一个叫作 Yarn 的包管理方案横空出世。2016 年，npm 还没有 package-lock.json 文件，安装速度很慢，稳定性也较差，而 Yarn 的理念很好地解决了以下问题。

- **确定性**：通过 yarn.lock 等机制，保证了确定性。即不管安装顺序如何，相同的依赖关系在任何机器和环境下，都可以以相同的方式被安装。（在 npm v5 之前，没有 package-lock.json 机制，只有默认并不会使用的[npm-shrinkwrap.json](https://docs.npmjs.com/cli/shrinkwrap)。）
- **采用模块扁平安装模式**：将依赖包的不同版本，按照一定策略，归结为单个版本，以避免创建多个副本造成冗余（npm 目前也有相同的优化）。
- **网络性能更好**：Yarn 采用了请求排队的理念，类似并发连接池，能够更好地利用网络资源；同时引入了更好的安装失败时的重试机制。
- **采用缓存机制，实现了离线模式**（npm 目前也有类似实现）。

 yarn.lock 结构：
```javascript
"@babel/cli@^7.1.6", "@babel/cli@^7.5.5":
  version "7.8.4"
  resolved "http://npm.in.zhihu.com/@babel%2fcli/-/cli-7.8.4.tgz#505fb053721a98777b2b175323ea4f090b7d3c1c"
  integrity sha1-UF+wU3IamHd7KxdTI+pPCQt9PBw=
  dependencies:
    commander "^4.0.1"
    convert-source-map "^1.1.0"
    fs-readdir-recursive "^1.1.0"
    glob "^7.0.0"
    lodash "^4.17.13"
    make-dir "^2.1.0"
    slash "^2.0.0"
    source-map "^0.5.0"
  optionalDependencies:
    chokidar "^2.1.8"
```
该结构整体和 package-lock.json 结构类似，只不过 yarn.lock 并没有使用 JSON 格式，而是采用了一种自定义的标记格式，新的格式仍然保持了较高的可读性。

### 缓存机制
> yarn cache dir

![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1685413304418-c8d059fd-85dc-40ea-9797-d2ae59e9a1b5.png#averageHue=%23f5f5f5&clientId=uf7e71cc3-9a01-4&from=paste&height=690&id=ud3798422&originHeight=1380&originWidth=2406&originalType=binary&ratio=2&rotation=0&showTitle=false&size=895332&status=done&style=none&taskId=uc023806a-f891-4ff1-996f-f7c60e65e15&title=&width=1203)
值得一提的是，Yarn 默认使用 prefer-online 模式，即优先使用网络数据。如果网络数据请求失败，再去请求缓存数据。
### 安装机制
> 检测（checking）→ 解析包（Resolving Packages） → 获取包（Fetching Packages）→ 链接包（Linking Packages）→ 构建包（Building Packages）

- **检测包（checking）**

这一步主要是**检测项目中是否存在一些 npm 相关文件**，比如 package-lock.json 等。如果有，会提示用户注意：这些文件的存在可能会导致冲突。在这一步骤中，**也会检查系统 OS、CPU 等信息**。

- **解析包（Resolving Packages）**

这一步会解析依赖树中每一个包的版本信息。
首先获取当前项目中 package.json 定义的 dependencies、devDependencies、optionalDependencies 的内容，这属于首层依赖。
接着**采用遍历首层依赖的方式获取依赖包的版本信息**，以及递归查找每个依赖下嵌套依赖的版本信息，并将解析过和正在解析的包用一个 Set 数据结构来存储，这样就能保证同一个版本范围内的包不会被重复解析。

   - 对于没有解析过的包 A，首次尝试从 yarn.lock 中获取到版本信息，并标记为已解析；
   - 如果在 yarn.lock 中没有找到包 A，则向 Registry 发起请求获取满足版本范围的已知最高版本的包信息，获取后将当前包标记为已解析。

总之，在经过解析包这一步之后，我们就确定了所有依赖的具体版本信息以及下载地址。

- **获取包（Fetching Packages）**

这一步我们首先需要检查缓存中是否存在当前的依赖包，同时将缓存中不存在的依赖包下载到缓存目录。说起来简单，但是还是有些问题值得思考。
比如：如何判断缓存中是否存在当前的依赖包？**其实 Yarn 会根据 cacheFolder+slug+node_modules+pkg.name 生成一个 path，判断系统中是否存在该 path，如果存在证明已经有缓存，不用重新下载。这个 path 也就是依赖包缓存的具体路径**。
对于没有命中缓存的包，Yarn 会维护一个 fetch 队列，按照规则进行网络请求。如果下载包地址是一个 file 协议，或者是相对路径，就说明其指向一个本地目录，此时调用 Fetch From Local 从离线缓存中获取包；否则调用 Fetch From External 获取包。最终获取结果使用 fs.createWriteStream 写入到缓存目录下。

- **链接包（Linking Packages）**

上一步是将依赖下载到缓存目录，这一步是将项目中的依赖复制到项目 node_modules 下，同时遵循扁平化原则。在复制依赖前，Yarn 会先解析 peerDependencies，如果找不到符合 peerDependencies 的包，则进行 warning 提示，并最终拷贝依赖到项目中。

- **构建包（Building Packages）**

如果依赖包中存在二进制包需要进行编译，会在这一步进行。



## pnpm
### 做了什么？
**当使用 npm 或 Yarn 时，如果你有 100 个项目，并且所有项目都有一个相同的依赖包，那么， 你在硬盘上就需要保存 100 份该相同依赖包的副本。**
**如果是使用 pnpm，依赖包将被 存放在一个统一的位置，因此**：

- 如果你**对同一依赖包使用相同的版本**，那么**磁盘上只有这个依赖包的一份文件**；
- 如果你**对同一依赖包需要使用不同的版本**，则**仅有版本之间不同的文件会被存储起来**；

**所有文件都保存在硬盘上的统一的位置**：

- 当安装软件包时， 其包含的**所有文件都会硬链接到此位置**，而**不会占用额外的硬盘空间**；
- 这让你可以在项目之间方便地共享相同版本的依赖包；

**简单来说**:

- **同样的包在磁盘只有一份, 当需要的包已经存在, 那么会直接创建硬链接指向磁盘的包**
- **如果不存在, 那么会下载到硬盘的同一位置, 如果再有其他项目使用该包, 直接创建硬链接即可**

**pnpm创建非扁平的 node_modules 目录**

- 当使用 npm 或 Yarn 安装依赖包时，所有**软件包都将被提升到 node_modules 的 根目录下**。
- 其结果是，由于安装的包可能会依赖其他的包, **导致源码可以访问本不属于当前项目所设定的依赖包**；
- 而pnpm的**非扁平目录可以防止项目访问本不属于当前项目所设定的依赖包**

![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1684677686952-127aac3e-79f1-4b29-9b7f-c0332874fa15.png#averageHue=%23eaeff1&clientId=ueb070762-16bd-4&from=paste&height=381&id=ub1a188cf&originHeight=498&originWidth=1045&originalType=binary&ratio=2&rotation=0&showTitle=false&size=166581&status=done&style=none&taskId=ue0458532-fcfd-42e2-9a6d-2cdab954268&title=&width=800)

## 总结
npm2 是通过嵌套的方式管理 node_modules 的，会有同样的依赖复制多次的问题。
npm3+ 和 yarn 是通过铺平的扁平化的方式来管理 node_modules，解决了嵌套方式的部分问题，但是引入了幽灵依赖的问题，并且同名的包只会提升一个版本的，其余的版本依然会复制多次。
pnpm 则是用了另一种方式，不再是复制了，而是都从全局 store 硬连接到 node_modules/.pnpm，然后之间通过软链接来组织依赖关系。
这样不但节省磁盘空间，也没有幽灵依赖问题，安装速度还快，从机制上来说完胜 npm 和 yarn。

## 资料

- [前端包管理工具原理(npm && yarn) - 掘金](https://juejin.cn/post/7014500143453962271)
- [字节的一个小问题 npm 和 yarn不一样吗？ - 掘金](https://juejin.cn/post/7060844948316225572)
- [https://docs.npmjs.com/cli/v9/commands/npm-install/](https://docs.npmjs.com/cli/v9/commands/npm-install/) 
- [前端工程化-包管理工具npm-yarn-cnpm-pnpm详细介绍以及如何选择](http://www.taodudu.cc/news/show-5177732.html?action=onClick)
- [pnpm 是凭什么对 npm 和 yarn 降维打击的 - 掘金](https://juejin.cn/post/7127295203177676837)
- [https://github.com/sisterAn/blog/issues/40](https://github.com/sisterAn/blog/issues/40)  ⭐️
- [https://github.com/sisterAn/blog/issues/75](https://github.com/sisterAn/blog/issues/75)
- [聊聊依赖管理](https://mp.weixin.qq.com/s/9JCs3rCmVuGT3FvKxXMJwg)  字节
