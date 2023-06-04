### 预告：今天写的可能用处不大，各位看官谨慎选择要不要看下去...

😶又是显得D疼造轮子系列之手写无三方依赖的轻量级Node-server，哇，好多的形容词，且看需求。

产品说要看一下页面写的怎么样了但是他又不想动或者你不想看到他，我觉得多半是因为后者🙄，那么问题来了，凭咱自己能不能把产品拒在10米之外又让他把页面瞅一眼，那必须是可以的，废话少说，直接开写。
### Node知识点
- fs  
- http  
- os 
### 从开启一个基本的Node服务开始,  [http模块参考文档](http://nodejs.cn/api/http.html#http_http_createserver_options_requestlistener)
```js
http.createServer(function (request, response) {
    // 发送 HTTP 头部 
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    response.writeHead(200, {'Content-Type': 'text/plain'});
    // 发送响应数据 "Hello World"
    response.end('Hello World\n');
}).listen(8888);
// 这就开启了一个最基础的node服务，浏览器访问 http://127.0.0.1:8888 即可看到Hello World
```
那么万里长征第一步的踮脚动作算是完成了，接下来就是实现怎么打开我们自己的html页面。 想要打开html页面肯定就要访问文件，于是就得用到fs模块，以下代码可以实现深层遍历脚本同目录下的html文件。
### 遍历页面需要的文件, [fs模块参考文档](http://nodejs.cn/api/fs.html#fs_file_system)
```js
function geFileList(path) {
    var filesList = [];
    readFile(path, filesList);
    return filesList;
}

//获取文件类型
function getType(filename){
    var index=filename.lastIndexOf(".");
    if(index!=-1){
    	var type=filename.substring(index+1,filename.length);
	    return type;
    }
}
//遍历读取文件 
function readFile(path, filesList) {
    files = fs.readdirSync(path);//需要用到同步读取 
    files.forEach(walk);
    function walk(file) {
        states = fs.statSync(path + '/' + file);
        if (states.isDirectory()) {
            readFile(path + '/' + file, filesList);
        }
        else {
            var obj = new Object();
            obj.size = states.size;
            obj.name = file;//文件名 
            obj.type = getType(file)
            filesList.push(obj);
        }
    }
}
// 统计各类文件数量
function countFileByType(obj){
	var keyContainer = {}; 
	obj.forEach(item => {
	  keyContainer[item.type] = keyContainer[item.type] || [];
	  keyContainer[item.type].push(item);
	});
	return keyContainer
}

module.exports.geFileList = geFileList

module.exports.countFile = countFileByType

module.exports.getType = getType

//方法模块化，把文件读取操作剥离比较容易整理思路，emmmmmmm，但是写的不是很优雅，有待改进
```
Node服务可以开启了，文件可以遍历了，至此基础建设算是搞起来了，接下来就需要开一个不用看见产品的服务了。
### 开启局域网服务
我们再次把获取ip地址的方法剥离，需要用到的Node知识点是os模块,  [os模块参考文档](http://nodejs.cn/api/os.html#os_os_networkinterfaces)
```js
const os = require('os');
const getlocalIp = () => {
	var interfaces = os.networkInterfaces();
	var ipArr = []
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family == 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                ipArr.push(alias.address)
            }
        }
    }
    return ipArr
}


const getWlanIp = () => {
    var interfaces = os.networkInterfaces().WLAN
    var WlanIp = ''
    for(let ip of interfaces){
        if(ip.family=='IPv4'){
            WlanIp = ip.address
        }
    }
    return WlanIp
}

module.exports.getlocalIp = getlocalIp

module.exports.getWlanIp = getWlanIp 
// 为什么这里要留两种ip地址呢，因为有时候我们也需要开启一个非局域网ip的服务啦，多功能加成
```
写到这里突然想到一个问题，我做这个功能的另外一个很重要的目的是解决http-server默认开启8080端口的缺陷，因为8080端口很大可能会被占用，于是想到开启服务时不妨随机分配一个8###端口，这样就极少可能存在端口被占用的情况了，一个随机数就能实现😁

### 捋一下功能实现的步骤
- 读取某目录下的html文件
- 获取局域网Ip地址/本地Ip地址
- 分配随机端口
- 自动打开浏览器，生成index文件链接

### 整合后核心步骤
#### 模块引入
```js
const http = require('http');
const fs = require('fs');
const Ip = require('../lib/get-ip')
const F = require('../lib/get-file')
const root = process.cwd();  //当前目录
const port = Math.floor(Math.random () * 1000) + 8000;
var localIP = Ip.getlocalIp()
var wlanIp = Ip.getWlanIp() || localIP[0]
```
#### 主方法
```js
function setHttpServer() {
	await setConsoleInfo();
	await fs.exists('index.html',function(exists){
	if(!exists){
			openDefaultBrowser(`http://`+wlanIp+':'+port)
	  	}else{
			openDefaultBrowser(`http://`+wlanIp+':'+port+'/index.html')
	  	}
	})
}
```

#### 开启服务并排错
```js
server=http.createServer(function(req,res){
    if(req.url === '/favicon.ico') {
        // console.log('\033[42;30m DONE \033[40;32m Compiled successfully in 19987ms\033[0m')
    }else{
        var url=req.url;
        var file = root+url;
        fs.readFile(file,function(err,data){
            if(err){
                res.writeHeader(404,{
                    'content-type' : 'text/html;charset="utf-8"'
                });
                if(!F.countFile(F.geFileList(root)).html){
                    res.write('<h1>404页面</h1><p><h2>当前目录没有html文件</h2>')
                }else{
                    let fileList =  fs.readdirSync(`${file}`);
                    for(let f of fileList){
                        let type = F.getType(f)
                        if(type=='html'){
                            res.write('<br/>'+`<a href="${f}">${f}</a>`+'\n')
                        }
                    }
                }
                res.end();
            }else{
                var surl = '.'+url;
                var type = surl.substr(surl.lastIndexOf(".")+1,surl.length)
                res.writeHeader(200,{
                    'content-type' : "text/"+type+';'+'charset="utf-8"'
                });
                res.write(data);
                res.end();
            }
        })  
    } 
}).listen(port);
```
#### 控制台显示一下服务地址
```js
function setConsoleInfo(){
  let info = 'The default service has been opened in the browser!'
	console.log('\033[42;30m DONE \033[;32m' + info + '\033[0m')
	for(let dev of localIP){
		console.log(`${dev}`+':'+port)
	}

}
```
#### 自动打开浏览器
```js
function openDefaultBrowser(url) {
  var exec = require('child_process').exec;
  switch (process.platform) {
    case "darwin":
      exec('open ' + url);
      break;
    case "win32":
      exec('start ' + url);
      break;
    default:
      exec('xdg-open', [url]);
  }
}
```

至此一个简单的无三方依赖的轻量级的Node服务就建立起来了，过程略显粗暴，没有详细的解释模块方法的使用方式，因为所用的的方法都比较简单。

当然这个小插件还有一定的缺陷，扩展性略低，只能满足简单的需求，还有很大的改进空间，希望走过路过的不吝给予更好的建议。😳[来自青铜选手的真诚脸]

欢迎使用npm进行安装试用 
> npm i set-node-server  
> set-server / ss  

git交流地址：[vannvan/set-node-server](https://github.com/vannvan/set-server)  

