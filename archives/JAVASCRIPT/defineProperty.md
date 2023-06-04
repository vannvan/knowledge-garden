### 语法

> ```js
> Object.defineProperty(obj, prop, descriptor)
> - obj
> 要定义属性的对象。
> - prop
> 要定义或修改的属性的名称或 Symbol 。
> - descriptor
> 要定义或修改的属性描述符
> ```

- `configurable`

  当且仅当该属性的 `configurable` 键值为 `true` 时，**该属性的描述符才能够被改变**，同时该属性也能从对应的对象上被删除。 **默认为** **false**。

- `enumerable`

  当且仅当该属性的 `enumerable` 键值为 `true` 时，**该属性才会出现在对象的枚举属性中**。 **默认为 false**。

数据描述符还具有以下可选键值：

- `value`

  该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。 **默认为 undefined**。

- `writable`

  当且仅当该属性的 `writable` 键值为 `true` 时，属性的值，也就是上面的 `value`，才能被[`赋值运算符`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Assignment_Operators)改变。 **默认为 false。**

存取描述符还具有以下可选键值：

- `get`

  属性的 getter 函数，如果没有 getter，则为 `undefined`。当访问该属性时，会调用此函数。执行时不传入任何参数，但是会传入 `this` 对象（由于继承关系，这里的`this`并不一定是定义该属性的对象）。该函数的返回值会被用作属性的值。 **默认为 undefined**。

- `set`

  属性的 setter 函数，如果没有 setter，则为 `undefined`。当属性值被修改时，会调用此函数。该方法接受一个参数（也就是被赋予的新值），会传入赋值时的 `this` 对象。 **默认为 undefined**。

#### 描述符默认值汇总

- 拥有布尔值的键 `configurable`、`enumerable` 和 `writable` 的默认值都是 `false`。
- 属性值和函数的键 `value`、`get` 和 `set` 字段的默认值为 `undefined`。

#### 描述符可拥有的键值

| `configurable` | `enumerable` | `value` | `writable` | `get`  | `set`  |        |
| -------------- | ------------ | ------- | ---------- | ------ | ------ | ------ |
| 数据描述符     | 可以         | 可以    | 可以       | 可以   | 不可以 | 不可以 |
| 存取描述符     | 可以         | 可以    | 不可以     | 不可以 | 可以   | 可以   |

如果一个描述符不具有 `value`、`writable`、`get` 和 `set` 中的任意一个键，那么它将被认为是一个数据描述符。如果一个描述符同时拥有 `value` 或 `writable` 和 `get` 或 `set` 键，则会产生一个异常。

### 函数的第三个参数 descriptor 所表示的属性描述符有两种形式：**数据描述符和存取描述符**。

两者均有：**configurable** 和 **enumerable** 两个键值  

#### **数据描述符同时具有以下可选键值**：**value** 和 **writable**

#### **存取描述符同时具有以下可选键值**：**get** 和 **set** 

#### PS: 属性描述符必须是数据描述符或者存取描述符两种形式之一，不能同时是两者

可以的方式1:

```js
Object.defineProperty({}, "num", {
    value: 1,
    writable: true,
    enumerable: true,
    configurable: true
});
```

可以的方式2：

```js
var value = 1;
Object.defineProperty({}, "num", {
    get : function(){
      return value;
    },
    set : function(newValue){
      value = newValue;
    },
    enumerable : true,
    configurable : true
});
```

不可以的方式：

```js
// 报错
Object.defineProperty({}, "num", {
    value: 1,
    get: function() {
        return 1;
    }
});
```

记住，这些选项不一定是自身属性，也要考虑继承来的属性。为了确认保留这些默认值，在设置之前，可能要冻结 [`Object.prototype`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype)，明确指定所有的选项，或者通过 [`Object.create(null)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create) 将 [`__proto__`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/__proto__) 属性指向 [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null)。

[MDN详细文档]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/definePropert

### 实现一个自存档对象

```js
// 当设置temperature 属性时，archive 数组会收到日志条目。
function Archiver() {
  var temperature = null;
  var archive = [];

  Object.defineProperty(this, 'temperature', {
    get: function() {
      console.log('get!');
      return temperature;
    },
    set: function(value) {
      temperature = value;
      archive.push({ val: temperature });
    }
  });

  this.getArchive = function() { return archive; };
}

var arc = new Archiver();
arc.temperature; // 'get!'
arc.temperature = 11;
arc.temperature = 13;
arc.getArchive(); // [{ val: 11 }, { val: 13 }]
```

### 简版数据劫持

```html
<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
	<span id="container">1</span>
	<button id="button">点击加 1</button>
<script type="text/javascript">
	var obj = {
		value: 1
	}
	 var value = 1
	 Object.defineProperty(obj,'value',{
	 	get: function() {
	 		return value 
	 	},
	 	set: function(newValue) {
	 		value = newValue
	 		document.getElementById("container").innerHTML = newValue 
	 	}
	 })

	 document.getElementById("button").addEventListener("click",function() {
	 	obj.value += 1
	 })
</script>
</body>
</html>
```

### watch数据劫持

```html
<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
	<span id="container">1</span>
	<button id="button">点击加 1</button>
<script type="text/javascript">
	(function(){
	    var root = this;
	    function watch(obj, name, func){
	        var value = obj[name];
	 
	        Object.defineProperty(obj, name, {
	            get: function() {
	                return value;
	            },
	            set: function(newValue) {
	                value = newValue;
	                func(value)
	            }
	        });
	 
	        if (value) obj[name] = value
	    }
	 
	    this.watch = watch;
	})()


	var obj = {
	    value: 1
	}

	watch(obj, "value", function(newvalue){
	    document.getElementById('container').innerHTML = newvalue;
	})

	document.getElementById('button').addEventListener("click", function(){
	    obj.value += 1
	});


</script>
</body>
</html>
```

