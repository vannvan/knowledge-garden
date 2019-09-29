### Ajax 解决浏览器缓存问题

```js
1、在ajax发送请求前加上 anyAjaxObj.setRequestHeader("If-Modified-Since","0")。

2、在ajax发送请求前加上 anyAjaxObj.setRequestHeader("Cache-Control","no-cache")。 

3、在URL后面加上一个随机数： "fresh=" + Math.random();。

4、在URL后面加上时间戳："nowtime=" + new Date().getTime();。

5、如果是使用jQuery，直接这样就可以了 $.ajaxSetup({cache:false})。这样页面的所有ajax都会执行这条语句就是不需要保存缓存记录。
```

### DOM操作——怎样添加、移除、移动、复制、创建和查找节点?

```js
1）创建新节点
createDocumentFragment()    //创建一个DOM片段
createElement()   //创建一个具体的元素
createTextNode()   //创建一个文本节点
（2）添加、移除、替换、插入
appendChild()
removeChild()
replaceChild()
insertBefore() //在已有的子节点前插入一个新的子节点
（3）查找
getElementsByTagName()    //通过标签名称
getElementsByName()    //通过元素的Name属性的值(IE容错能力较强，会得到一个数组，其中包括id等于name值的)
getElementById()    //通过元素Id，唯一性。
```

###  一个页面从输入 URL 到页面加载显示完成，这个过程中都发生了什么？（流程说的越详细越好）

```js
详细版：
1、浏览器会开启一个线程来处理这个请求，对 URL 分析判断如果是 http 协议就按照 Web 方式来处理;
2、调用浏览器内核中的对应方法，比如 WebView 中的 loadUrl 方法;
  3、通过DNS解析获取网址的IP地址，设置 UA 等信息发出第二个GET请求;
4、进行HTTP协议会话，客户端发送报头(请求报头);
  5、进入到web服务器上的 Web Server，如 Apache、Tomcat、Node.JS 等服务器;
  6、进入部署好的后端应用，如 PHP、Java、JavaScript、Python 等，找到对应的请求处理;
7、处理结束回馈报头，此处如果浏览器访问过，缓存上有对应资源，会与服务器最后修改时间对比，一致则返回304;
  8、浏览器开始下载html文档(响应报头，状态码200)，同时使用缓存;
  9、文档树建立，根据标记请求所需指定MIME类型的文件（比如css、js）,同时设置了cookie;
  10、页面开始渲染DOM，JS根据DOM API操作DOM,执行事件绑定等，页面显示完成。
```

### 前端性能优化的方法？

```js
（1） 减少http请求次数：CSS Sprites, JS、CSS源码压缩、图片大小控制合适；网页Gzip，CDN托管，data缓存 ，图片服务器。
（2） 前端模板 JS+数据，减少由于HTML标签导致的带宽浪费，前端用变量保存AJAX请求结果，每次操作本地变量，不用请求，减少请求次数

（3） 用innerHTML代替DOM操作，减少DOM操作次数，优化javascript性能。

（4） 当需要设置的样式很多时设置className而不是直接操作style。

（5） 少用全局变量、缓存DOM节点查找的结果。减少IO读取操作。

（6） 避免使用CSS Expression（css表达式)又称Dynamic properties(动态属性)。

（7） 图片预加载，将样式表放在顶部，将脚本放在底部  加上时间戳。

（8） 避免在页面的主体布局中使用table，table要等其中的内容完全下载之后才会显示出来，显示比div+css布局慢。
对普通的网站有一个统一的思路，就是尽量向前端优化、减少数据库操作、减少磁盘IO。向前端优化指的是，在不影响功能和体验的情况下，能在浏览器执行的不要在服务端执行，能在缓存服务器上直接返回的不要到应用服务器，程序能直接取得的结果不要到外部取得，本机内能取得的数据不要到远程取，内存能取到的不要到磁盘取，缓存中有的不要去数据库查询。减少数据库操作指减少更新次数、缓存结果减少查询次数、将数据库执行的操作尽可能的让你的程序完成（例如join查询），减少磁盘IO指尽量不使用文件系统作为缓存、减少读写文件次数等。程序优化永远要优化慢的部分，换语言是无法“优化”的。

```

### ajax实现原理及方法使用

```js
readyState属性有五个状态值。

0：是uninitialized，未初始化。已经创建了XMLHttpRequest对象但是未初始化。
1：是loading.已经开始准备好要发送了。
2：已经发送，但是还没有收到响应。
3：正在接受响应，但是还不完整。
4：接受响应完毕。
responseText：服务器返回的响应文本。只有当readyState>=3的时候才有值，根据readyState的状态值，可以知道，当readyState=3，返回的响应文本不完整，只有readyState=4，完全返回，才能接受全部的响应文本。

responseXML：response  as Dom Document object。响应信息是xml，可以解析为Dom对象。
status：服务器的Http状态码，若是200，则表示OK，404，表示为未找到。
statusText：服务器http状态码的文本。比如OK，Not Found。
```



