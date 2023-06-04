### 基本原理

每次方法执行完后返回this对象，这样后面的方法就可以继续在this环境下执行

```js
//创建一个类
function Person(){};
//在原型上定义相关方法
Person.prototype ={
  setName:function(name){
    this.name = name;
    return this;
  },
  setAge:function(age){
    this.age = age;
    return this;
  }
}
//实例化
var person= new Person();
person.setName("Mary").setAge(20);
```

### 仿JQ链式

```js
var jq = function (selector) {
  return new jq.prototype.init(selector)
}
jq.prototype = {
  init: function (selector) {
    this.el = document.querySelector(selector)
    return this
  },
  on: function (event, fn) {
    if (window.addEventListener) {
      this.el.addEventListener(event, fn, false)
    } else if (window.attachEvent) {
      this.el.attachEvent(on + event, fn)
    }
    return this
  },
  attr: function (event, val) {
    if (!val) {
      return this.el.getAttribute(event)
    } else {
      this.el.setAttribute(event, val)
      return this
    }
  },
}
jq.prototype.init.prototype = jq.prototype

jq('#ct').on('click', function () {
    alert('您点击了我。')
}).attr('title', '我的图片')

```

### JQ源码分析

- https://www.cnblogs.com/aaronjs/p/3278578.html