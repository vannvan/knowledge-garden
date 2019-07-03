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