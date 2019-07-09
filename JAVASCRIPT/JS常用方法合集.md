### JS的6个"假"值

> `null`  `false`  `undefined`  `0`  `''(空字符串)`  `NaN`

### number排序

```js
const sortNumbers = (...numbers) => numbers.sort();   排序
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

### 交换赋值

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

### 数组交集

```js
const similarity = (arr, values) => arr.filter(v => values.includes(v));
similarity([1, 2, 3], [1, 2, 4]); // [1,2]
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

