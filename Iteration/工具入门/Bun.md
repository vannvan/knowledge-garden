## 设计目标
Bun的设计完全考虑了当今的JavaScript生态系统。

- 速度Bun进程启动速度比Node.js快4倍
- TypeScript和JSX支持。可直接执行 .jsx 、 .ts 、 .tsx 文件; Bun的transpiler在执行之前将这些转换为vanilla JavaScript。
- ESM和CommonJS兼容性。世界正在向ES模块（ESM）发展，但npm上的数百万个包仍然需要CommonJS。Bun推荐ES模块，但支持CommonJS。
- Web标准API。Bun实现了标准的Web API，如 fetch 、 WebSocket 和 ReadableStream 。Bun由JavaScriptCore引擎提供支持，该引擎由Apple为Safari开发，因此一些API（如 Headers 和 URL ）直接使用Safari的实现。
- Node.js兼容性。除了支持Node风格的模块解析，Bun还致力于与内置的Node.js全局变量（ process ， Buffer ）和模块（ path ， fs ， http 等）完全兼容。这是一项持续的努力，但尚未完成。请参阅兼容性页面了解当前状态。

Bun不仅仅是一个运行时。长期目标是成为一个有凝聚力的基础设施工具包，用于使用JavaScript/TypeScript构建应用程序，包括包管理器，转译器，捆绑器，脚本运行器，测试运行器等。
## 安装方式
```bash
# with install script (recommended)
curl -fsSL https://bun.sh/install | bash

# with npm
npm install -g bun

# with Homebrew
brew tap oven-sh/bun
brew install bun

# with Docker
docker pull oven/bun
docker run --rm --init --ulimit memlock=-1:-1 oven/bun
```
## 示例
### TS脚本
新建一个目录`ts-cli`，进入目录执行命令
> bun init

一路回车会得到如下目录结构
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1685499311413-727e49cb-d168-4651-994d-56b952b886ca.png#averageHue=%2323262d&clientId=u63a54f28-6898-4&from=paste&height=132&id=u0fa06313&originHeight=264&originWidth=1084&originalType=binary&ratio=2&rotation=0&showTitle=false&size=25929&status=done&style=none&taskId=u02924915-280d-4538-8f34-dbf9a7945b0&title=&width=542)
#### 写一个创建文件的脚本
```typescript
// file.ts
import { BunFile } from 'bun'

class File {
  constructor() {
    //
  }

  async touch(fileName: BunFile | PathLike, content: string | undefined) {
    const encoder = new TextEncoder()
    const data = encoder.encode(content) // Uint8Array
    await Bun.write(fileName, data)
  }
}

export default new File()
```
#### 引入
```typescript
// index.ts
console.log('Hello via Bun!')

import F from './file'

F.touch(`${+new Date()}.txt`, 'hello world')
```
#### 使用
> bun index.ts 

#### 打包
两种方式
##### 配置脚本
> bun build.ts

```typescript
// build.ts
await Bun.build({
  entrypoints: ['./index.ts'],
  outdir: './dist',
})
```
##### CLI
> bun build index.ts --outdir ./dist 

### umi项目
直接使用`umi`推荐方式
> bunx create-umi

## 常用
### 配置镜像地址
bunfig.toml
```typescript
[install]
# set default registry as a string
registry = "https://registry.npm.taobao.org/"
```

