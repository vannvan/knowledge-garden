### JS的6个"假"值

> `null`  `false`  `undefined`  `0`  `''(空字符串)`  `NaN`

### number排序

```js
const sortNumbers = (...numbers) => numbers.sort();   //排序,只适合正数
```

###  数组去重思路

```js
const s = new Set();
[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));
for (let i of s) {
  console.log(i);
}
// 2 3 5 4
-----------------------------------
const set = new Set([1, 2, 3, 4, 4]);
[...set]
//[1,2,3,4]
-----------------------------------
[...new Set('ababbc')].join('')
-----------------------------------
// 数组去重
[...new Set(arr)]
-----------------------------------
let arr = [1, 2, 2, 3, 4, 5, 5, 6];
let newArr =Array.from(new Set(arr)) 
console.log(newArr)
// "abc"
```

### 数组对象去重

```js
const uniqueElementsBy = (arr, fn) =>arr.reduce((acc, v) => {if (!acc.some(x => fn(v, x))) acc.push(v);return acc;}, []);

uniqueElementsBy([{id: 1, name: 'Jhon'}, {id: 2, name: 'sss'}, {id: 1, name: 'Jhon'}], (a, b) => a.id == b.id)
// [{id: 1, name: 'Jhon'}, {id: 2, name: 'sss'}]
```

### 删除数组一个元素

```js
const deleteFromArr = (arr, item) => {
  let index = arr.indexOf(item);
  return index !== -1 && arr.splice(index, 1);
};
deleteFromArr(arr, n);
```



### 日历

创建过去七天的数组，如果将代码中的减号换成加号，你将得到未来7天的数组集合

```
// 创建过去七天的数组
[...Array(7).keys()].map(days => new Date(Date.now() - 86400000 * days));
```

### 生成随机ID

在原型设计时经常使用的创建ID功能。但是我在实际项目中看到有人使用它。其实这并不安全

```
// 生成长度为11的随机字母数字字符串
Math.random().toString(36).substring(2);
// hg7znok52x
```

### 获取URL的查询参数

这个获取URL的查询参数代码，是我见过最精简的`QAQ`

```
?foo=bar&baz=bing => {foo: bar, baz: bing}
// 获取URL的查询参数
q={};location.search.replace(/([^?&=]+)=([^&]+)/g,(_,k,v)=>q[k]=v);q;
```

### 本地时间

通过一堆HTML，您可以创建一个本地时间，其中包含您可以一口气读出的源代码，它每秒都会用当前时间更新页面

```
// 创建本地时间
<body onload="setInterval(()=>document.body.innerHTML=new Date().toLocaleString().slice(10,19))"></body>
```

### 数组混淆

随机更改数组元素顺序，混淆数组

```js
// 随机更改数组元素顺序，混淆数组
(arr) => arr.slice().sort(() => Math.random() - 0.5)
/* 
let a = (arr) => arr.slice().sort(() => Math.random() - 0.5)
let b = a([1,2,3,4,5])
console.log(b)
*/
```

### 数组清空

```js
const arr = [0, 1, 2];
arr.length = 2;
// arr => [0, 1]
```

### 解构交换赋值

```js
let a = 0;
let b = 1;
[a, b] = [b, a];
// a b => 1 0
```

### 生成随机十六进制代码（生成随机颜色）

使用JavaScript简洁代码生成随机十六进制代码

```js
// 生成随机十六进制代码 如：'#c618b2'
const RandomColor = () => "#" + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0");
const color = RandomColor();
// color => "#f03665"
```

### 创建特定大小的数组

方便快捷创建特定大小的数组

```js
[...Array(3).keys()]
// [0, 1, 2]
```

### filter() 过滤不符合项

```js
let arr = [1,2,3]
let newArr = arr.filter(item => item>=3)  
console.log(newArr)
```

### filter() 去掉空字符串、undefined、null

```js
let arr = ['','1','2',undefined,'3.jpg',undefined]
let newArr = arr.filter(item => item)
console.log(newArr)
```

### filter 过滤空值：undefined、null、""、0、false、NaN

```js
const arr = [undefined, null, "", 0, false, NaN, 1, 2].filter(Boolean);
// arr => [1, 2]
```

### filter() 数组去重

```js
let arr = [1, 2, 2, 3, 4, 5, 5, 6];
let newArr = arr.filter((x, index,self)=>self.indexOf(x)===index) 
console.log(newArr)
```

### set数组去重

```js
function dedupe(array) {
  return Array.from(new Set(array));
}
dedupe([1, 1, 2, 3]) // [1, 2, 3]
```

### filter() 筛选数组对象

```js
let arr = [
	    {a:'苹果',b:'面包',c:'吃'},
	    {a:'香蕉',b:'面包',c:'不吃'},
	    {a:'香蕉',b:'苹果',c:'吃'},
	    {a:'苹果',b:'香蕉',c:'不吃'},
	  ]
console.log(arr.filter(item => item.a=== '苹果' ))//[{a:'苹果',b:'面包',c:'吃'},{a:'苹果',b:'香蕉',c:'不吃'}]
```

### map数组映射

```js
var users = [
{ name : "Yagyu",weapon:"shuriken"},
{ name : "Yoshi",weapon:"katana"},
{ name : "Kuma",weapon:"wakizashi"}
];
const resUsers = users.map(obj => obj.name)
```



### window.location.search 转 JS 对象

假如请求url为
`https://www.baidu.com?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=js&rsv_pq=a86b5e5f0007bceb&rsv_t=1e1fAVan%2BVlnkhJHFB0BIGLdLM2slszYMJBTTfFkmyyBUzBpw0ggeuVDE50&rqlang=cn&rsv_enter=0&inputT=1287&rsv_sug3=5&rsv_sug1=3&rsv_sug7=101&rsv_sug2=0&rsv_sug4=1907`

```js
const searchObj = search => JSON.parse(`{"${decodeURIComponent(search.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"')}"}`);
let search = '?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=js&rsv_pq=a86b5e5f0007bceb&rsv_t=1e1fAVan%2BVlnkhJHFB0BIGLdLM2slszYMJBTTfFkmyyBUzBpw0ggeuVDE50&rqlang=cn&rsv_enter=0&inputT=1287&rsv_sug3=5&rsv_sug1=3&rsv_sug7=101&rsv_sug2=0&rsv_sug4=1907'
let obj = searchObj(search)
{
  ie: 'utf-8',
  f: '8',
  rsv_bp: '1',
  rsv_idx: '1',
  tn: 'baidu',
  wd: 'js',
  rsv_pq: 'a86b5e5f0007bceb',
  rsv_t: '1e1fAVan+VlnkhJHFB0BIGLdLM2slszYMJBTTfFkmyyBUzBpw0ggeuVDE50',
  rqlang: 'cn',
  rsv_enter: '0',
  inputT: '1287',
  rsv_sug3: '5',
  rsv_sug1: '3',
  rsv_sug7: '101',
  rsv_sug2: '0',
  rsv_sug4: '1907'
}
```

### 直接获取location.search某参数

```js
const params = new URLSearchParams(location.search.replace(/\?/ig, "")); // location.search = "?name=yajun&sex=female"
params.has("yajun"); // true
params.get("sex"); // "female"
```

### JS 对象转 url 查询字符串

```js
const objectToQueryString = (obj) => Object.keys(obj).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`).join('&');
objectToQueryString({name: 'Jhon', age: 18, address: 'beijing'})
// name=Jhon&age=18&address=beijing
```

### 一维数组交集

```js
const similarity = (arr, values) => arr.filter(v => values.includes(v));
similarity([1, 2, 3], [1, 2, 4]); // [1,2]
```

### 二维对象数组交集/差集

```js
let a = [
    { id: 1, name: '1' },
    { id: 2, name: '2' },
    { id: 3, name: '3' },
    { id: 4, name: '4' },
    { id: 5, name: '5' },
    { id: 6, name: '6' },
    { id: 7, name: '7' },
    { id: 8, name: '8' },
    { id: 9, name: '9' },
    { id: 10, name: '10' }
];
 
let b = [
    { id: 4, name: '4' },
    { id: 5, name: '5' },
    { id: 6, name: '6' },
    { id: 7, name: '7' },
    { id: 8, name: '8' }
];
 
const c = (arr1, arr2, id) => {
    let arr = [];
    for(let item of arr1){
        if(arr2.find(v => v[id] === item[id])) {
        	arr.push(item);
        }
    }
    return arr;
}
const d = (arr1, arr2, id) => {
    let arr = [];
    for(let item of arr1){
        if(arr2.find(v => v[id] === item[id])) {
            continue;
        }
        	arr.push(item);
    }
    return arr;
}
console.log(c(a, b, 'id'));  //交集
console.log(d(a, b, 'id'));  //差集
```

### 两（yyyy-MM-dd）日期时间差

```js
const getDaysDiffBetweenDates = (dateInitial, dateFinal) => (dateFinal - dateInitial) / (1000 * 3600 * 24);
getDaysDiffBetweenDates(new Date('2017-12-13'), new Date('2017-12-22')); 
// 9
```

### 判断dom是否有某个className

```js
const  hasClass = (el, className) => new RegExp(`(^|\\s)${className}(\\s|$)`).test(el.className);
```

### 是否为空数组

```js
const arr = [];
const flag = Array.isArray(arr) && !arr.length;
// flag => true
```

### 是否为数组

```js
function isArray(obj){
    return Object.prototype.toString.call(obj) === '[object Array]' ;
}
```

### 是否为空对象

```js
const obj = {};
const flag = DataType(obj, "object") && !Object.keys(obj).length;
// flag => true
```

### 判断数据类型

> undefined、null、string、number、boolean、array、object、symbol、date、regexp、function、asyncfunction、arguments、set、map、weakset、weakmap

```js
function DataType(tgt, type) {
    const dataType = Object.prototype.toString.call(tgt).replace(/\[object /g, "").replace(/\]/g, "").toLowerCase();
    return type ? dataType === type : dataType;
}
DataType("yajun"); // "string"
DataType(19941112); // "number"
DataType(true); // "boolean"
DataType([], "array"); // true
DataType({}, "array"); // false
```

### 对象字面量(获取环境变量时必用此方法)

```js
const env = "prod";
const link = {
    dev: "Development Address",
    test: "Testing Address",
    prod: "Production Address"
}[env];
// link => "Production Address"
```

### 对象变量属性(可变属性名1)

```js
const flag = false;
const obj = {
    a: 0,
    b: 1,
    [flag ? "c" : "d"]: 2
};
// obj => { a: 0, b: 1, d: 2 }
```

### 动态属性名(可变属性名2)

```js
const dynamic = 'email';
let user = {
    name: 'John',
    [dynamic]: 'john@doe.com'
}
console.log(user); // outputs { name: "John", email: "john@doe.com" }
```

### 删除对象无用属性（扩展运算符）

```js
const obj = { a: 0, b: 1, c: 2 }; // 只想拿b和c
const { a, ...rest } = obj;
// rest => { b: 1, c: 2 }
```

### es6隐式返回值

```js
const Func = function(name) {
    return "I Love " + name;
};
// 换成
const Func = name => "I Love " + name;
```

### 检测非空参数

创建方法时方式使用者忽略掉必要的参数

```js
function IsRequired() {
    throw new Error("param is required");
}
function Func(name = IsRequired()) {
    console.log("I Love " + name);
}
Func(); // "param is required"
Func("雅君妹纸"); // "I Love 雅君妹纸"
```

### 优雅处理错误信息

```js
try {
    Func();
} catch (e) {
    location.href = "https://stackoverflow.com/search?q=[js]+" + e.message;
}
```

### 优雅处理Async/Await参数

```js
function AsyncTo(promise) {
    return promise.then(data => [null, data]).catch(err => [err]);
}
const [err, res] = await AsyncTo(Func());
```

### 存取LocalStorage：反序列化取，序列化存(JSON)

```js
const love = JSON.parse(localStorage.getItem("love"));
localStorage.setItem("love", JSON.stringify("I Love 雅君妹纸"));
```

### 自调用函数

```js
(function(){
    // 置于此处的代码将自动执行
})();  
(function(a,b){
    var result = a+b;
    return result;
})(10,20)
```

### 从数组种随机获取成员

```js
var items = [12, 548 , 'a' , 2 , 5478 , 'foo' , 8852, , 'Doe' , 2145 , 119];
var randomItem = items[Math.floor(Math.random() * items.length)];
```

###  字符串去空格

```js
String.prototype.trim = function(){return this.replace(/^\s+|\s+$/g, "");};
```

### 获取数组最大/最小值

```js
var  numbers = [5, 458 , 120 , -215 , 228 , 400 , 122205, -85411]; 
var maxInNumbers = Math.max.apply(Math, numbers); 
var minInNumbers = Math.min.apply(Math, numbers);
```

### 不要直接从数组中delete或remove元素

###  精确到指定位数的小数

```js
const round = (n, decimals = 0) => Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`)
round(1.345, 2)                 // 1.35
round(1.345, 1)                 // 1.3
```

### 数字补o操作

```js
const addZero1 = (num, len = 2) => (`0${num}`).slice(-len)
const addZero2 = (num, len = 2) => (`${num}`).padStart( len   , '0')
addZero1(3) // 03
addZero2(32,4)  // 0032
```

### 统计数组中相同项的个数

```js
var cars = ['BMW','Benz', 'Benz', 'Tesla', 'BMW', 'Toyota'];
var carsObj = cars.reduce(function (obj, name) {
  obj[name] = obj[name] ? ++obj[name] : 1;
  return obj;
}, {});
carsObj; // => { BMW: 2, Benz: 2, Tesla: 1, Toyota: 1 }
```

### 接收函数返回的多个结果

```js
async function getFullPost(){
  return await Promise.all([
     fetch('/post'),
     fetch('/comments')
  ]);
}
const [post, comments] = getFullPost();
```

### 将数组平铺到指定深度

```js
const flatten = (arr, depth = 1) =>
  depth != 1
    ? arr.reduce((a, v) => a.concat(Array.isArray(v) ? flatten(v, depth - 1) : v), [])
    : arr.reduce((a, v) => a.concat(v), []);
flatten([1, [2], 3, 4]);                             // [1, 2, 3, 4]
flatten([1, [2, [3, [4, 5], 6], 7], 8], 2);           // [1, 2, 3, [4, 5], 6, 7, 8]
```

### reduce求和

```js
result = [
    {subject: 'math',score: 88},
    {subject: 'chinese',score: 95},
    {subject: 'english',score: 90}
];
var sum = result.reduce(function(prev, cur) {
    return cur.score + prev;
}, 0);
```

### reduce求和1

```js
let shoppingCart = [
  { productTitle: "Product 1", amount: 10 },
  { productTitle: "Product 2", amount: 30 },
  { productTitle: "Product 3", amount: 20 },
  { productTitle: "Product 4", amount: 60 }
];

const sumAmount = (currentTotalAmount, order) => currentTotalAmount + order.amount;
const getTotalAmount = (shoppingCart) => shoppingCart.reduce(sumAmount, 0);
getTotalAmount(shoppingCart); // 120
```

### eval对一维数组求和的骚操作

```js
eval(arr.join("+"))
```

### 数组中某元素出现次数

```js
function countOccurrences(arr, value) {
  return arr.reduce((a, v) => v === value ? a + 1 : a + 0, 0);
}

let arr = [1,2,3,4,1,2,4]
countOccurrences(arr, 1) // 2
```

### 数组分页算法

```js
data.slice([每页数据量 *（当前页码 - 1）, 每页数据量 *（当前页码 - 1） + 每页数据量])
```

### 根据数组中某一属性排序

```js
// 本例根据publishTime排序
let data = [
{
  id: 1,
  publishTime: "2019-05-14 18:10:29"
},
{
  id: 2,
  publishTime: "2019-05-14 18:17:29"
},
{
  id: 3,
  publishTime: "2019-05-14 15:09:25"
}]

data.sort((a, b) => b.publishTime - a.publishTime);

// 0: {id: 2, publishTime: "2019-05-14 18:17:29"}
// 1: {id: 1, publishTime: "2019-05-14 18:10:29"}
// 2: {id: 3, publishTime: "2019-05-14 15:09:25"}
```

### 对象合并

```js
//ES6方法
let obj1 = {
    a:1,
    b:{
        b1:2
    }
}

let obj2 = {
    c:3,
    d:4
}
console.log({...obj1, ...obj2}) // {a: 1, b: {…}, c: 3, d: 4}
// Obj.assign()：可以把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象
let o1 = { a: 1 };
let o2 = { b: 2 };

let obj = Object.assign(o1, o2);
console.log(obj); // { a: 1, b: 2 }
console.log(o1);  // { a: 1, b: 2 }, 且 **目标对象** 自身也会改变（也就是assign第一个对象）
console.log(o2); // { b: 2 } 不改变

// 备注：Object.assign() 拷贝的是属性值。假如源对象的属性值是一个指向对象的引用，它也只拷贝那个引用值
// 备注：数组合并用 concat() 方法
```

### 对象中属性个数

```js
let obj = {name: '朱昆鹏', age: 21}

// ES6
Object.keys(obj).length // 2

// ES5
let attributeCount = obj => {
    let count = 0;
    for(let i in obj) {
        if(obj.hasOwnProperty(i)) {  // 建议加上判断,如果没有扩展对象属性可以不加
            count++;
        }
    }
    return count;
}

attributeCount(obj) // 2
```

### 全屏

```js
//进入全屏
function launchFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen()
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullScreen()
  }
}

launchFullscreen(document.documentElement) // 整个页面进入全屏
launchFullscreen(document.getElementById("id")) //某个元素进入全屏
//退出全屏
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  }
}

exitFullscreen()
//全屏事件
document.addEventListener("fullscreenchange", function (e) {
  if (document.fullscreenElement) {
    console.log('进入全屏')
  } else {
    console.log('退出全屏')
  }
})
```

### 获取滚动条位置

```js
function getScrollPosition(el = window) {
  return {
    x: (el.pageXOffset !== undefined) ? el.pageXOffset : el.scrollLeft,
    y: (el.pageYOffset !== undefined) ? el.pageYOffset : el.scrollTop
  }
}

getScrollPosition() // {x: 0, y: 692}
```

### 检测设备类型

```js
const detectDeviceType = () =>/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';

detectDeviceType() // "Desktop"
```

### 防抖

```js
function debounce(fn) {
  let timeout = null; // 创建一个标记用来存放定时器的返回值
  return function () {
    clearTimeout(timeout); // 每当用户输入的时候把前一个 setTimeout clear 掉
    timeout = setTimeout(() => { // 然后又创建一个新的 setTimeout, 这样就能保证输入字符后的 interval 间隔内如果还有字符输入的话，就不会执行 fn 函数
      fn.apply(this, arguments);
    }, 500);
  };
}

debounce(fn) // 使用
```

### 节流

```js
function throttle(fn) {
  let canRun = true; // 通过闭包保存一个标记
  return function () {
    if (!canRun) return; // 在函数开头判断标记是否为true，不为true则return
    canRun = false; // 立即设置为false
    setTimeout(() => { // 将外部传入的函数的执行放在setTimeout中
      fn.apply(this, arguments);
      // 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。当定时器没有执行的时候标记永远是false，在开头被return掉
      canRun = true;
    }, 500);
  };
}

throttle(fn) // 使用
```

### 交换变量值

```json
let a = 1;
let b = 2;
[a, b] = [b, a] // a = 2 b = 1
```

### 去除空格

```js
/**
 * trim 去除空格
 * param1  string str 待处理字符串
 * param2  number type 去除空格类型 1-所有空格  2-前后空格  3-前空格 4-后空格 默认为1
 * return  string str 处理后的字符串
 */
function trim(str, type = 1) {
    if (type && type !== 1 && type !== 2 && type !== 3 && type !== 4) return;
    switch (type) {
        case 1:
            return str.replace(/\s/g, "");
        case 2:
            return str.replace(/(^\s)|(\s*$)/g, "");
        case 3:
            return str.replace(/(^\s)/g, "");
        case 4:
            return str.replace(/(\s$)/g, "");
        default:
            return str;
    }
}
```

### 随机16进制颜色

```js
function hexColor() {
    let str = '#';
    let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
    for (let i = 0; i < 6; i++) {
        let index = Number.parseInt(Math.random() * 16);
        str += arr[index]
    }
    return str;
}
```

### 统计指定文字出现次数

```js
/**
 * 关键词统计：统计一段文字中指定文字出现次数 keywordsCount
 * param1 string text 进行统计的文本
 * param2 string keywords 进行统计的关键词
 * return number count 关键词出现次数
 * tip:param1 document.body.innerText--全文统计
 */

function keywordsCount(text, keywords) {
    return text.split(keywords).length - 1
}
```



