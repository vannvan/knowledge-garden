## 一个基础的使用过程

> mkdir node-app
>  
> cm node-app
>  
> touch index.js
>  
> touch package.json


index.js内容

```javascript
// 我们用 require 引入 express  
var express = require('express')  
var app = express()  
// 对根 URL 做一个响应  
app.get('/', function (req, res) {    
 res.send('Hello World!')   
})  
// 让服务器监听 8081 端口  
app.listen(8081, function () {    
  console.log('app listening on port 8081!')  
})
```

package.json内容

```json
{
  "name": "node-app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {    
     "express": "^4.16.4"    
   },
  "keywords": [],
  "author": "vannvan <adowrww@gmail.com> (https://github.com/vannvan)",
  "license": "MITa"
}
```

> touch Dockerfile


Dockerfile内容

```dockerfile
# Dockerfile  
FROM node:12.3.1
WORKDIR /app  
COPY package.json /app  
RUN npm install  
COPY . /app  
EXPOSE 8081  
CMD node index.js
```

运行命令

> docker build -t hello-world .   //注意后面有点
>  
> docker run -p 4000:8081 hello-world


可以看到

app listening on port 8081!

可以运行  [http://localhost:4000/](http://localhost:4000/)

## 文章

- [docker命令](https://blog.csdn.net/weixin_30603633/article/details/96260662)
- [docker mac本地镜像地址](https://www.cnblogs.com/cag2050/p/10100899.html)
- [docker部署前端](http://www.dockone.io/article/8834)
- [Macos下的docker安装目录在哪？](https://blog.csdn.net/yjk13703623757/article/details/100900945)

## 杂项

docker新建并启动容器

```bash
# docker run [OPTIONS] IMAGE [COMMAND][ARG…]

OPTIONS说明（常用）：有些是一个减号，有些是两个减号
--name=“容器新名字”：为容器指定一个名称；
-d：后台运行容器，并返回容器ID，也即启动守护式容器；
-i：以交互模式运行容器，通常与-t同时使用；
-t：为容器重新分配一个伪输入终端，通常与-i同时使用；
-P：随机端口映射；
-p：指定端口映射，有一下四种格式
        ip:hostPort:containerPort
        ip:containerPort
        hostPort:containerPort
        containerPort
```

## 命令简写

- 容器的创建：docker container run nginx 简写方法 docker run nginx
- 容器的列出(up): docker container ls 简写方法 docker ps
- 容器的列出（up和exit）：docker container ls -a 简写方法 docker ps -a
- 容器的停止 ： docker container stop 简写方法 docker stop
- 容器的删除：docker container rm 简写方法 docker rm
