## 基于以下DOM
```html
<div id="show">1</div>
<button id="button">加一</button>
```
## defineProperty
```javascript
const obj = {
  value: 1,
}

var value = 1

Object.defineProperty(obj, 'value', {
  get: function () {
    return value
  },
  set: function (newValue) {
    value = newValue
    document.getElementById('show').innerHTML = newValue
  },
})

document.getElementById('button').addEventListener('click', function () {
  obj.value += 1
})
```
## 优化
```javascript
 ;(function () {
  var root = this
  function watch(obj, name, func) {
    var value = obj[name]

    Object.defineProperty(obj, name, {
      get: function () {
        return value
      },
      set: function (newValue) {
        value = newValue
        func(value)
      },
    })

    if (value) obj[name] = value
  }

  this.watch = watch
})()

var obj = {
  value: 1,
}

watch(obj, 'value', function (newvalue) {
  document.getElementById('show').innerHTML = newvalue
})

document.getElementById('button').addEventListener('click', function () {
  obj.value += 1
})
```
## proxy
### 监听对象
```javascript
 ;(function () {
  var root = this

  function watch(target, func) {
    var proxy = new Proxy(target, {
      get: function (target, prop) {
        return target[prop]
      },
      set: function (target, prop, value) {
        target[prop] = value
        func(prop, value)
      },
    })

    return proxy
  }

  this.watch = watch
})()

var obj = {
  value: 1,
}

var newObj = watch(obj, function (key, newvalue) {
  console.log('key', key, newvalue)
  if (key == 'value') document.getElementById('show').innerHTML = newvalue
})

document.getElementById('button').addEventListener('click', function () {
  newObj.value += 1
  newObj.abc = 'abc' // 新增属性
})
```
### 监听数组
```javascript
;(function () {
  const root = this

  function watch(target, func) {
    const proxy = new Proxy(target, {
      get: function (target, key, receiver) {
        return Reflect.get(target, key, receiver)
      },
      set(target, key, value, receiver) {
        func(key, value, receiver)
        return Reflect.set(target, key, value, receiver)
      },
    })

    return proxy
  }

  this.watch = watch
})()


const arr = [{ a: 1 }]

const newObj = watch(arr, function (key, newvalue, receiver) {
  // 这里监听到数据更新
  // 这时候通过key去更新对应的数据
  console.log('key', key, newvalue)
  console.log('所有的数据', receiver)
})

// 此时更新数据
setTimeout(() => {
  // 更改原来的数据
  newObj[0].a = 2
  // 新增数据
  newObj.push({ b: 2 })
}, 2000)
```
## 发布订阅
```javascript
const obQueue = new Set()

function set(target, key, value, receiver) {
  const result = Reflect.set(target, key, value, receiver)
  obQueue.forEach((observer) => observer())
  return result
}

function observable(obj) {
  return new Proxy(obj, { set })
}

function observe(fn) {
  obQueue.add(fn)
}

const person = observable({
  name: '张三',
  age: 20,
})

function print() {
  console.log(`${person.name}, ${person.age}`)
}

observe(print)

person.name = '李四'
// 李四，20
```


## 资料

- [https://github.com/mqyqingfeng/Blog/issues/107](https://github.com/mqyqingfeng/Blog/issues/107)
