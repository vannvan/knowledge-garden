最近想做一个`Node.js`的应用，以把自己学到的`Node.js`技能初步落实一下，思前想后还是做一个小型聊天应用吧，博客之类的恐怕后期精力不够，（之前做phper的时候就因为越想越多的功能半途放弃了😅），因为之前没有做过`WebSocket`相关的业务，所以也想在这方面实践一下，预想的是做一个具备单聊和群聊，简易朋友圈等等的一些小功能，同时也因为之前没用过`mongo`，所以也想在这方面实践一下。

总之这个小应用主要就是个人初探Node“全栈”的初步试水，也想分享给跟我一样尚且还菜菜的前端。

----

初步需要实现的功能

- 将当前用户online/offline信息通知给本人及其他用户

- 区分来自client的消息类型，上线信息、消息等

- 将消息发送给目标用户

- 初步实现两个用户之间的对话

  暂且先假定有用户user1,user2 实现这两个用户之间的对话

### 需要的插件及依赖项

> express 4.17.1
>
> glob 7.1.6
>
> mongoose 5.9.14
>
> ejs 3.1.2
>
> nodemon 2.0.4
>
> ws 7.3.0

### 前端Websocket通信实现

```js
const ws = new WebSocket('ws://192.168.31.200:8000') //连接到websokect server
let userInfo = JSON.parse(sessionStorage.getItem("userInfo")); //当前用户信息
const JSONToString = function(json) {
    return JSON.stringify(json)
}
//与server连接，将当前用户信息提交给server
ws.onopen = () => {
    // ws.send('我上线啦')，上线时只需要把以下信息给server就基本满足啦
    ws.send(JSON.stringify({
        sender: userInfo.name
    }))
}
//接收server的消息
ws.onmessage = (msg) => {
    //根据server返回的msg类型处理相关逻辑,通知其他用户，渲染消息等
    //msg.msgType分为 notice message  
    //TODO
}
//server通信错误处理
ws.onerror = err => {
    console.log(err)
    //TODO
}
//下线逻辑
ws.onclose = () => {
    ws.send(JSON.stringify({
         uuid: uuid,
         sender: userInfo.name,
         receiver: userInfo.name == 'user1' ? 'test2' : "user1",
         message: msg
    }))
    console.log('close')
}
//给server发送消息,其他事件调用此方法
/*
	@msg {Object} 
*/
function sendMsgToServer(msg) {
   // msg 暂定格式
	//{
  	//  uuid: uuid,
    //  userName: userInfo.name,
    //  receiver: receiver,
    //  message: msg	 注意这里比上面第一次onopen多了message
    //}
    ws.send(JSONToString(msg))
}
```

### 搭建express服务

目录结构

---common   
   |---function.js  
---db  
   |---mongo.conf.js  
--- routes  
   |---user.js  
---views  
   |---login.html  
   |---chating.html    
app.js  

#### 引入基础模块,开启服务

```js
//app.js
const express = require('express')
const app = express()
const glob = require("glob");
require('./routes/chats') 
const {
    resolve
} = require('path');


app.listen(3000) //监听3000端口，默认localhost: 127.0.0.1 || 0.0.0.0
console.log('服务已启动')
```

#### 配置模板引擎

```js
//app.js
/*
 express.js: 配置引擎
*/
app.set('views', './views'); // 添加视图路径
app.engine('html', require('ejs').renderFile); // 将EJS模板映射至".html"文件
app.set('view engine', 'html'); // 设置视图引擎


/*
 express.js: 配置引擎
*/
glob.sync(resolve('./views', "**/*.html")).forEach((item, i) => {
    let htmlRelativePath = item.split('/views')[1]
    let pagePath = htmlRelativePath.replace('.html', '')
    app.get(pagePath, function (request, response) {
        let viewPath = pagePath.replace('/', '')
        response.render(viewPath)
    })
})
```

#### express 解析json格式的请求参数需要的配置

```js
//app.js
app.use(express.json()) 
app.use(express.urlencoded({
    extended: true
})) 
```

#### 添加路由

```js
//app.js
const userRouter = require('./routes/user')
app.use('/', userRouter)
```

#### mongo基础配置

```js
const mongoose = require('mongoose') // 引入 mongoose
const url = "mongodb://localhost:27017/chat"; // 本地数据库地址
mongoose.connect(url)
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Successful connection to " + url)
});

var Schema = mongoose.Schema 

let user = {
    name: String,
    password: String,
    headImg: String
}

var userSchema = Schema(user)
var User = mongoose.model('users', userSchema); //将schema编译为model构造函数


module.exports = {
    mongoose,
    User
}
//这个配置目前尚且略显简陋，后面再优化😥
```

#### 用户模块功能实现

```js
//user.js
const express = require('express')
const router = express.Router()
const ObjectID = require('mongodb').ObjectID;
const {
    sendJson,
    throwError
} = require('../common/function')
const {
    mongoose,
    User
} = require("../db/mongo.conf")

//先不要在意这么土的写法，因为这时候我只关注主体功能😅
const checkUserExit = function (params) {
    return new Promise(function (resolve, reject) {
        User.findOne(params, function (error, res) {
            if(res) {
            	resolve(res)                
            }
        })
    })
}

//注册
router.post('/register', function (request, response) {
    let params = request.body
    const user = new User(params)
    checkUserExit({
        name: params.name
    }).then(res => {
        if (res) {
            response.send(sendJson(0, '用户名已存在'))
        } else {
            user.save(function (error, res) {
                if (error) {
                    response.send(throwError())
                } else {
                    response.send(sendJson(1, '注册成功'))
                }
            })
        }
    })
})


//登录
router.post('/login', function (request, response) {
    let params = request.body
    User.findOne({
        name: params.name
    }, function (error, res) {
        if (!res) {
            response.send(sendJson(0, '用户不存在'))
        } else {
            if (params.password != res.password) {
                response.send(sendJson(0, '用户名或密码错误'))
            } else {
                response.send(sendJson(1, '用户验证成功',params))
            }
        }
    })
})

module.exports = router
```

#### 公共方法目前封装的不多，还是以实现正常流程为主

```js
//function.js 
const getJsonStr = function (params) {
     return JSON.stringify(params)
 }

 function sendJson(status, msg, data, params) {
     return getJsonStr({
         status: status,
         message: msg,
         data: data || null
     })
 }

 function throwError(params) {
     return getJsonStr({
         status: 0,
         msg: 'Service error'
     })
 }
 module.exports.sendJson = sendJson
 module.exports.throwError = throwError
```



### Websocket server 基本实现

#### 步骤1.开启服务

```js
const webSocket = require('ws'); //引入ws服务器模块
const ws = new webSocket.Server({
    port: 8000
}); //创建服务器,端口为8000

const {
    JSONToString,
    getTime
} = require('../common/function')
var clients = {}  //记录当前在线用户信息
var userList = [] //仅存储当前在线用户名
```

#### 步骤2. 连接服务，与client交互

```js
ws.on('connection', (client) => { //连接客户端
    // 用户上线
    client.on('message', (msg) => {
        let userMsg = JSON.parse(msg)
        let {
            sender,
            receiver,
            message
        } = userMsg
        client.name = sender;
        Observer() // 实时更新基础数据
        if (message) {
            //数据发送输出
            sendMessageToClient(sender, receiver, message)
        } else {
            // 通知上线
            noticeOnlineOrOffLine(sender, true)
        }
    })
    //报错信息
    client.on('error', (err => {
        if (err) {
            console.log(err)
            //还没想好做哪些处理
        }
    }))
    // 下线信息
    client.on('close', () => {
        console.log('用户' + client.name + '关闭了消息服务')
        noticeOnlineOrOffLine(client.name, false)
    })
})
```

#### 步骤3.给指定用户发送消息

```js
/**
 * 
 * @param {*String} sender 
 * @param {*String} receiver 
 * @param {*Object} message 
 * @param {*Boolean} isOnline 
 */
const sendMessageToClient = function (sender, receiver, message) {
    let messageInfo = {
        sender: sender,
        message: message,
        msgType: "message",
        timestamp: getTime(),
        userList: userList
    }
    //如果接收方在线，则给其发送
    if (receiver) {
        messageInfo.receiver = receiver
        clients[receiver].send(JSONToString(messageInfo))
    }
    clients[sender].send(JSONToString(messageInfo))
    console.log('向客户端发送消息', JSONToString(messageInfo))
}
```

#### 步骤4.通知其他用户当前用户的在线状态

```js
/**
 * 
 * @param {*String} currentUser
 * @param {*Boolean} isOnline  
 */
const noticeOnlineOrOffLine = function (currentUser, isOnline) {
    for (var key in clients) {
        //上/下线需要更新其他用户的好友列表
        let noticeUserMessage = {}
        let exceptCurrentUserList = userList.filter(el => el != currentUser)
        noticeUserMessage = Object.assign(onlineOrOffLineNoticeMsg(key, isOnline), {
            userList: isOnline ? userList : exceptCurrentUserList
        })
        let isOnlineMsg = isOnline ? '上线' : '下线'
        console.log('用户:' + currentUser + isOnlineMsg + '，消息:' + JSONToString(noticeUserMessage))
        clients[key].send(JSONToString(noticeUserMessage))
    }
    if (!isOnline) {
        delete clients[currentUser];
    }
}
```

```js
//上下线消息模板
const onlineOrOffLineNoticeMsg = function (receiver, isOnline) {
    return {
        receiver: receiver,
        msgType: 'notice',
        message: isOnline ? receiver + '上线了' : receiver + '下线了',
        timestamp: getTime()
    }
}
```

至此，这个小应用的主体功能基本完善了，万里长征第一步，哈哈😁，由于目前只是为了把聊天的流程走通，连界面都是随便写了几个div（又不是不能用，手动狗头），可能各位客官已经发现了，`mongo`还没有运用到聊天过程中🤣，因为目前对`mongo`的启用姿势还不够深入，生怕给自己挖坑，等进一步规划好再搞数据吧。

后期还需要完善的功能主要是群聊（选择固定用户的那种，不是所有人的聊天室），其次就是朋友圈功能的实现，涉及数据存储，图文处理等等的内容，还需要规划和打磨一下，还会进一步更新。

最后，由于本人水平有限，尚且可能运用了比较不好的业务实现方式，希望没给初学者造成误导，也请各路大神进行指正、建议和交流。

附github地址[tiny-chat](https://github.com/vannvan/node-explore/tree/master/tiny-chat)