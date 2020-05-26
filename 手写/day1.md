```js
Array.prototype.rreduce = function(cb,pre) {
	let _arr = this 
	for(let i=0;i<_arr.length;i++) {
		if(pre == 'undefined') {
			pre = cb(pre,_arr[i+1],i++,_arr)
		} else {
			pre = cb(pre,_arr[i],arr)
		}
	}
	return pre
}

Array.prototype.mmap = function(cb) {
	let newArr = []
	for(let i = 0; i<this.length;i++) {
		newArr.push(cb(this[i],i,this))
	}
	console.log()
	return newArr
}


Array.prototype.ffilter = function(cb) {
	let newArr = []
	for(let i = 0;i<this.length;i++) {
		if(cb(this[i])) {
			newArr.push(this[i])
		}
	}
	return newArr
}

Function.prototype.myCall = function(context) {
	context = context || window 
	context.fn = this 
	var args = []
	for(let i=0,len = arguments.length;i<len;i++) {
		args.push(arguments[i])
	}

	var result = context.fn(...args)
	delete context.fn 
	return result
}

Function.prototype.myApply = function(context) {
	context = context || window 
	context.fn = this 
	let args = arguments[1] 
	let result
	if(args) {
		result = context.fn(...args)
	}else {
		result = context.fn()
	}
	delete context.fn
	return result
}

let arr = [1,3,4,5]
let arr1 = [
	{name:'bob',age:22},
	{name:"smith",age:21}
]
const sum = arr.rreduce((preV,curr,currIndex) => {
	return preV+curr
},1)



// console.log(sum)


arr1.mmap((el,index) => {
	console.log(el)
	// console.log(index)
})


const filterArr1 = arr1.ffilter((el,index) => {
	return el.age>21
})

console.log(filterArr1)


const fn1 = function() {
	console.log(this.name)
	// console.log(this.fn())
	// this.fn('aa')
}

let obj1 = {
	name:'bob'
}

// fn1.myCall(obj1,'aa')

// fn1.myApply(obj1,[22])


function fn2() {
	// console.log('aaa')
	this.name = 'bob'
	function getName() {
		console.log(this.name)
	}
	return ''
}
var fn3 = new fn2()

// eval('fn3')

fn3.name


function Person(name) {
	this.name = name
	// this.age = age 
}

Person.prototype.say = function() {
	console.log('hi',this.name)
}

const _new  = function() {
	let obj = {}
	let _self = Array.from(arguments).slice(0,1)[0]
	let _args = Array.from(arguments).slice(1)
	obj.__proto__ = _self.prototype 
	_self.apply(obj,_args)
	return obj
}

let p = _new(Person,'bob',22)

p.say()
```

