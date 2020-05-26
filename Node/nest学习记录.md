#### 初始化，搭建、开发

> nestjs/cli   -> nest new project-name
>
> yarn start:dev

#### 局部路由前缀

在 `app.controller.ts`的`@Controller()`中写入‘app-1’,这样的话就表示**当前文件**中，所有的路由都有了前缀 `app-1`：

#### 全局路由前缀

在`main.ts`中加上`app.setGlobalPrefix()`,

```
// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1'); // 全局路由前缀
  await app.listen(3000);
}
bootstrap();
```

### 使用nest-cli指令创建文件

> nest g [文件类型] [文件名] [文件目录（src目录下）]

示例1:

> nest g service user logical  //表示在logical文件夹下创建user 的service  
>
> 对应生成 user.service.ts

示例2：

> nest g controller user logical  //表示在logical文件夹下创建user的controller
>
> 对应生成user.controller.ts

于此同时可以使用如下指令创建module

> nest g module user logical

可用的j架构组件列表

- class（别名：cl）
- 控制器（别名：co）
- 装饰者（别名：d）
- 例外（别名：e）
- 过滤器（别名：f）
- 网关（别名：ga）
- 警卫（别名：顾）
- 拦截器（别名：i）
- 中间件（别名：mi）
- 模块（别名：mo）
- 管道（别名：pi）
- 提供者（别名：pr）
- 服务（别名：s）