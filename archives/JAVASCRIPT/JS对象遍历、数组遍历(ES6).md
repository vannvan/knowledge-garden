

## 对象遍历

### Object.keys()遍历

 返回一个数组,包括对象自身的(不含继承的)所有可枚举属性(不含Symbol属性

```js
var obj = {'0':'a','1':'b','2':'c'};
 
Object.keys(obj).forEach(function(key){

     console.log(key,obj[key]);
});
```

### for..in..遍历     

循环遍历对象自身的和继承的可枚举属性(不含Symbol属性).

```js
var obj = {'0':'a','1':'b','2':'c'};
 
for(var i in obj) {
 
     console.log(i,":",obj[i]);
 
}
```

### Object.getOwnPropertyNames(obj)遍历

返回一个数组,包含对象自身的所有属性(不含Symbol属性,但是包括不可枚举属性).

```js
var obj = {'0':'a','1':'b','2':'c'};
Object.getOwnPropertyNames(obj).forEach(function(key){
 
    console.log(key,obj[key]);
 
});
```

### Reflect.ownKeys(obj)遍历

返回一个数组,包含对象自身的所有属性,不管属性名是Symbol或字符串,也不管是否可枚举. 

```js
var obj = {'0':'a','1':'b','2':'c'};
Reflect.ownKeys(obj).forEach(function(key){
 
console.log(key,obj[key]);
 
});
```

## 数组遍历

### 使用forEach遍历

```js
var arr=[1,2,3,4];
 
arr.forEach(function(val, index) {
 
console.log(val, index);
});
 
```

### 使用for..in..遍历

```js
var arr=["张三","李四","王五","赵六"];
 
for (var i in arr){
 
console.log(i,":",arr[i]);
 
}
```

### 使用for-of遍历

不仅支持数组，还支持大多数类数组对象，例如DOM NodeList对象.

也支持字符串遍历，它将字符串视为一系列的Unicode字符来进行遍历

```js
var arr=["张三","李四","王五","赵六"];
 
for (var value of arr){
 
    console.log(value);
 
}
```

