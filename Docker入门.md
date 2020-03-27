### step1

> mkdir node-app
>
> cm node-app
>
> touch index.js
>
> touch package.json

index.js内容

```js
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

> docker build -t hello-world .   //注意后面有点
>
> docker run -p 4000:8081 hello-world 

可以看到

app listening on port 8081! 

可以运行  http://localhost:4000/