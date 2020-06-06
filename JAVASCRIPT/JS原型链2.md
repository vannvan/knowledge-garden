

## JS中的原型和原型链

###  基本认知

> **js中有六种数据类型，包括五种基本数据类型（Number,String,Boolean,Undefined,Null）,和一种复杂数据类型（Object）。**

>  **三大引用类型: Object Array Function** 

>  **js分为函数对象和普通对象，每个对象(实例)都有proto属性，但是只有函数对象才有prototype属性**

讲原型的时候，我们应该先要记住以下几个要点，这几个要点是理解原型的关键：

- 所有的引用类型（数组、函数、对象）可以自由扩展属性（除null以外）。

- 所有的引用类型都有一个`_ _ proto_ _`属性(也叫隐式原型，它是一个普通的对象)。

- 所有的函数都有一个`prototype`属性(这也叫显式原型，它也是一个普通的对象)。 **箭头函数和bind之后的函数没有**

- 所有引用类型，它的`_ _ proto_ _`属性指向它的构造函数的`prototype`属性。

- 当试图得到一个对象的属性时，如果这个对象本身不存在这个属性，那么就会去它的`_ _ proto_ _`属性(也就是它的构造函数的`prototype`属性)中去寻找。

- 所有的引用类型都是构造函数

  var a={}  是 var a=new Object() 的语法糖

  var a=[] 是 var a=new Array() 的语法糖

  function Foo()  是var Foo=new Function() 的语法糖

### 原型

```js
	//这是一个构造函数
	function Foo(name,age){
		this.name=name;
		this.age=age;
	}
	/*根据要点3，所有的函数都有一个prototype属性，这个属性是一个对象
	再根据要点1，所有的对象可以自由扩展属性
	于是就有了以下写法*/
	Foo.prototype={
		// prototype对象里面又有其他的属性
		showName:function(){
			console.log("I'm "+this.name);//this是什么要看执行的时候谁调用了这个函数
		},
		showAge:function(){
			console.log("And I'm "+this.age);//this是什么要看执行的时候谁调用了这个函数
		}
	}
	var fn=new Foo('小明',19)
	/*当试图得到一个对象的属性时，如果这个对象本身不存在这个属性，那么就会去它
	构造函数的'prototype'属性中去找*/
	fn.showName(); //I'm 小明
	fn.showAge(); //And I'm 19
```
### 为什么要使用原型

试想如果我们要通过Foo()来创建**很多很多个**对象，如果我们是这样子写的话：

```js
function Foo(name,age){
		this.name=name;
		this.age=age;
		this.showName=function(){
			console.log("I'm "+this.name);
		}
		this.showAge=function(){
			console.log("And I'm "+this.age);
		}
	}
```
那么我们创建出来的每一个对象，里面都有showName和showAge方法，这样就会占用很多的资源。

而通过原型来实现的话，只需要在构造函数里面给属性赋值，而把方法写在Foo.prototype属性(这个属性是唯一的)里面。这样每个对象都可以使用prototype属性里面的showName、showAge方法，并且节省了不少的资源。

### 封装DOM查询

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,min-width=1.0,max-width=1.0,initial-scale=1.0,user-scalable=no">
    <title>demo</title>
</head>
<body>
    <div id="text">这是一段长长的文本</div>

    <script>
        function Ele(id){
            this.elem=document.getElementById(id);
        }

        Ele.prototype.html=function(val){
            var elem=this.elem;
            if(val){
                //设置innerHTML
                elem.innerHTML=val;
                return this;
            }else{
                //获取innerHTML
                return elem.innerHTML;
            }
        }

        Ele.prototype.on=function(type,fn){
            this.elem.addEventListener(type,fn);
　　　　　　　return this;
        }

        var text=new Ele('text');
        console.log(text.html());
        text.html('设置了新的html').on('click',function(){
            console.log('clicked');
        });
    </script>
</body>
</html>
```

### 原型链

根据要点5，当试图得到一个对象的属性时，如果这个对象本身不存在这个属性，那么就会去它构造函数的’prototype’属性中去寻找。那又因为’prototype’属性是一个对象，所以它也有一个’_ _ proto_ _'属性。

```js
	// 构造函数
	function Foo(name,age){
	 	this.name=name;
	 	this.age=age;
	}
	Object.prototype.toString=function(){
		//this是什么要看执行的时候谁调用了这个函数。
		console.log("I'm "+this.name+" And I'm "+this.age);
	}
	var fn=new Foo('小明',19);
	fn.toString(); //I'm 小明 And I'm 19
	console.log(fn.toString===Foo.prototype.__proto__.toString); //true
	
	console.log(fn.__proto__ ===Foo.prototype)  //true
	console.log(Foo.prototype.__proto__===Object.prototype)  //true
	console.log(Object.prototype.__proto__===null)  //true
```
### 图例

![](https://img-blog.csdn.net/20180909114030465?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2OTk2Mjcx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

### 解析

首先，fn的构造函数是Foo()。所以：
fn._ _ proto _ _=== Foo.prototype
又因为Foo.prototype是一个**普通的对象**，它的构造函数是Object，所以：
Foo.prototype._ _ proto _ _=== Object.prototype
通过上面的代码，我们知道这个toString()方法是在Object.prototype里面的，当调用这个对象的本身并不存在的方法时，它会一层一层地往上去找，一直到null为止。



所以当fn调用toString()时，JS发现fn中没有这个方法，于是它就去Foo.prototype中去找，发现还是没有这个方法，然后就去Object.prototype中去找，找到了，就调用Object.prototype中的toString()方法。



这就是原型链，fn能够调用Object.prototype中的方法正是因为存在原型链的机制。



另外，在使用原型的时候，一般推荐将需要扩展的方法写在构造函数的prototype属性中，避免写在_ _ proto _ _属性里面。

### 一句话讲清楚原型链

**当试图访问一个对象的属性时，它不仅仅在该对象上搜寻，还会搜寻该对象的原型，以及该对象的原型的原型，依次层层向上搜索，直到找到一个名字匹配的属性或到达原型链的末尾。**

![](https://user-gold-cdn.xitu.io/2020/4/21/1719d5061a3d5f66?imageslim)

### 知识总结

每个函数都有一个原型对象(prototype)，原型对象又包含一个属性(constructor)，指向的是函数本身，函数的实例都有一个隐式原型(__proto__)，指向的是构造函数的原型对象(prototype)。

查找规则：当我们访问实例的一个属性时，先从实例自身查找，如果找不到就去其内部指向的原型对象上去查找，如果再找不到，就去其内部指向的原型对象内部指向的原型对象上去查找，就这样一直找到原型的最顶端。