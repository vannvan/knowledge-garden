### 使用JQuery提供的jsonp 

```javascript
methods: { 
  getData () { 
    var self = this 
    $.ajax({ 
      url: 'http://f.apiplus.cn/bj11x5.json', 
      type: 'GET', 
      dataType: 'JSONP', 
      success: function (res) { 
        self.data = res.data.slice(0, 3) 
        self.opencode = res.data[0].opencode.split(',') 
      } 
    }) 
  } 
} 
```

### 使用http-proxy-middleware 代理解决（项目使用vue-cli脚手架搭建） 

#### 打开config/index.js,在proxyTable中添写如下代码：(本地php提供的接口实例，端口号不能省略) 

```javascript
proxyTable: { 
  '/api': {  //使用"/api"来代替"http://f.apiplus.c" 
    target: 'http://127.0.0.1:80', //源地址 
    changeOrigin: true, //改变源 
    pathRewrite: { 
      '^/api': '/' //路径重写 
      } 
  } 
}
```

#### 使用axios请求数据时直接使用“/api”： 

```javascript
getData () { 
 axios.get('/api/userlist.php', function (res) { 
   console.log(res) 
 })
```

#### 通过这种方法去解决跨域，打包部署时还按这种方法会出问题。解决方法如下： 

```javascript
let serverUrl = '/api/'  //本地调试时 
// let serverUrl = 'http://f.apiplus.cn/'  //打包部署上线时 
export default { 
  dataUrl: serverUrl + 'bj11x5.json' 
}
```



