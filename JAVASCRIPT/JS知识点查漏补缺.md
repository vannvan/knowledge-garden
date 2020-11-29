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

### Array方法总结

```js
// 检测数值ES5方法
Array.isArray(value)  // 检测值是否为数组
// 转换方法
toString() 将数组转化为以逗号分隔的字符串
valueOf() 返回的还是数组
// 栈方法
push() 可以接收任意数量的参数，把他们逐个添加到数组的末尾，返回修改后数组的长度
pop() 从数组末尾移除最后一项，返回移除的项
// 队列方法
shift() 移除数组的第一项并返回该项
unshift() 向数组前端添加任意个项并返回新数组的长度
// 排序
sort(compare)
compare函数接收两个参数,如果返回负数，则第一个参数位于第二个参数前面；如果返回零，则两个参数相等；如果返回正数，第一个参数位于第二个参数后面
// 降序，升序相反
(a,b) => (b-a)
// 操作方法
concat(数组 | 一个或多个元素) // 合并数组，返回新数组
slice(起始位置 ，[结束位置]) // 切分数组，返回新数组，新数组不包含结束位置的项
splice(起始位置，删除的个数，[插入的元素]) // 删除|插入|替换数组，返回删除的元素组成的数组，会修改原数组
// 位置方法
indexOf(查找的项，[查找起点位置]) // 使用全等操作符，严格相等
lastIndexOf()
// 迭代方法，都接收两个参数，一个是要在每一项上运行的函数，一个是作用域（可选）
1.every 对数组中每一项运行给定函数，如果函数对每一项都返回true,则返回true
        every(fn(value,index,array){return ...},[this])
2.some 对数组中每一项运行给定函数，如果函数对任一项都返回true,则返回true
3.filter 对数组中每一项运行给定函数，返回该函数会返回true的项组成的数组
4.forEach 对数组每一项运行给定函数，无返回值
5.map 对数组每一项运行给定函数，返回每次函数调用返回结果组成的数组
// 归并方法 reduce和reduceRight(和前者遍历的方向相反),构建一个最终返回的值
reduce(fn(prev,cur,index,array){ return ... },initValue)
1.fn返回的值会作为第一个参数传递给下一项
2.initValue做为归并基础的初始值
```

### String方法总结

```js
charAt(n) // 返回给定位置的字符
charCodeAt(n) // 返回给定位置的字符编码
"dddd"[n] // 访问字符串特定索引的字符
concat() //用于将一个或多个字符串拼接起来
slice(start, end) / substring(start, end)  // 返回一个新的从开始位置到结束位置的字符串，不包括结束位置
substr(start, len) // 返回一个新的从开始位置到指定长度的字符串
indexOf(str,[startIndex]) // 返回指定字符在字符串中的索引，第二个参数为从指定位置开始搜索，可选
trim() // 该方法会创建一个字符串的副本，删除前置与后缀的所有空格，返回结果
toLowerCase() / toUpperCase() // 小写大写转换
// 字符串的模式匹配方法
1.match(pattern) //本质上与RegExp的exec()方法相同，只接受一个参数，即正则表达式或RegExp对象
2.search(pattern) // 参数与match参数相同，返回字符串中第一个匹配项的索引
3.replace(str | pattern, text | fn)  //第一个参数为想要被替换的字符串或正则表达式，第二个参数为要替换的字符串或一个函数
* 如果第二个参数是字符串，可以使用一些特殊的字符序列，将正则表达式操作得到的值插入到结果字符串中。
    $' //匹配的子字符串之后的子字符串
    $` //匹配的子字符串之前的子字符串
    $n //匹配第n个捕获组的子字符串 
* 如果第二个参数是函数，在只有一个匹配项时，会向函数传递3个参数，模式的匹配项，模式的匹配项在字符串中的位置，原始的字符串正则表达式中定义了多个捕获组的情况下，传递的参数依次是模式的匹配项，第一个捕获组的匹配项，第二个捕获组的匹配项...，最后两个参数和上者相同
如：
function htmlEscape(text){
    return text.replace(/[<>&"]/g, (match, pos, originalText) => {
        switch(match){
            case "<":
                return "&lt;";
            case ">":
                return "&gt;";
            case "&":
                return "&amp;";
            case "\"":
                return "&quot;"
        }
    })
}

4.split() // 第一个参数是需要指定分隔符匹配中的字符串或者正则表达式，也可以传递第二个参数，用来限制返回数组的长度
例：
let text = "xujaing,red,ddd";
text.split(",")  // ["xujaing", "red", "ddd"]
text.split(",", 2)  // ["xujaing", "red"]
text.split(/[^\,]+/)  //*** 匹配非字母，用字符串的非字母分割字符串，返回数组

* 5.localeCompare() // 比较两个字符串，如果字符串在字母表中排在字符串参数之前，返回负数，相等返回0，反之正数
```

### 单体内置对象

```js
Global对象
1.URI编码方法
    encodeURI()           // 除了空格之外其他字符都不编码
    encodeURIComponent()  //会对它发现的任何非标准字符进行编码
    decodeURI()           //只能对使用encodeURI的字符进行解码
    decodeURIComponent()  // 原理同上
    
Math对象
1.Math.max() / Math.min() // 接收任意多数值作为参数
// 求数组中最大值 Math.max.apply(Math, arrValue)
2.Math.ceil() / Math.floor() / Math.round()  //向上/下/四舍五入
3.Math.random()  //返回大于等于0小于1的随机数
4.Math.abs() //返回参数的绝对值
5.Math.pow(num,power) // 返回num的power次幂
6.Math.sqrt(num) // 返回num的平方根
```

### 离线检测

```js
// 离线检测属性
navigator.onLine // true or false
// 离线事件
online,offline
```

### 监听页面隐藏和显示

```js
var hiddenProperty = 'hidden' in document ? 'hidden' :
                                'webkitHidden' in document ? 'webkitHidden' :   
                                'mozHidden' in document ? 'mozHidden' :   
                                null;
var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
var onVisibilityChange = function(){
    if (!document[hiddenProperty]) {   
          console.log('我出现了');
     }else{
           console.log('我隐藏了');
     }
 }
 document.addEventListener(visibilityChangeEvent, onVisibilityChange)
```

### 原生js序列化表单

```js
function formser(form){
	 var form=document.getElementById("form");
	 var arr={};
	 for (var i = 0; i < form.elements.length; i++) {
	 var feled=form.elements[i];
	 switch(feled.type) {
	 case undefined:
	 case 'button':
	 case 'file':
	 case 'reset':
	 case 'submit':
	 break;
	 case 'checkbox':
	 case 'radio':
	 if (!feled.checked) {
	 	break;
	 }
	 default:
	 if (arr[feled.name]) {
	 	arr[feled.name]=arr[feled.name]+','+feled.value;
	 }else{
	 	arr[feled.name]=feled.value;
	 } 
	 }
	 }
	 return arr
 }
```

### closest的妙用

 `Element.closest`API是什么检测之外点击 

```html
<body>
    <ul class="menu-dropdown">
        <span class="menu-title" data-dropdown-trigger>菜单</span>
        <div class="menu-wrap">
            <li>menu1</li>
            <li>menu2</li>
            <li>menu3</li>
            <li>menu4</li>
        </div>
    </ul>
    <script type="text/javascript">
        var navigation = document.querySelector(".menu-wrap");

        function handleClick(evt) {
            if (evt.target.hasAttribute("data-dropdown-trigger")) {
                console.log('在下拉菜单区域内点击')
            }

            if (!evt.target.closest(".menu-dropdown")) {
                console.log('在下拉菜单区域外点击');
            }
        }
        window.addEventListener("click", handleClick);
    </script>
</body>
```

另一个很常见的场景，点击modal之外的区域关闭modal

```html
<div class="modal">
</div>
<script type="text/javascript">
    window.addEventListener('click',function(e) {
        if(!e.target.closest('.modal')) {
            console.log('关闭modal')
        }
    })
</script>
```

