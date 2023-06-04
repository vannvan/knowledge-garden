在JavaScript中，toString()函数与valueOf()函数解决的是值的显示和运算的问题，所有引用类型都拥有这两个函数。
## toString()
`toString()`函数的作用是把一个逻辑值转换为字符串，并返回结果。`Object`类型数据的`toString()`函数默认的返回结果是`"[object Object]"`，当我们自定义新的类时，可以重写`toString()`函数，返回可读性更高的结果。
在JavaScript中，Array，Function，Date等类型都实现了自定义的toString()函数。

- `Array`的`toString()`函数返回值为以逗号分隔构成的数组成员字符串，例如[1, 2,3].toString()结果为字符串'1,2,3'。
- `Function`的`toString()`函数返回值为函数的文本定义，例如(function(x){return x *2;}).toString()的结果为字符串"function(x){return x * 2;}"。
- `Date`的`toString()`函数返回值为具有可读性的时间字符串，例如，new Date().toString()的结果为字符串"Sun Nov 25 2018 15:00:16 GMT+0800 (中国标准时间)"。
## valueOf()
`valueOf()`函数的作用是返回最适合引用类型的原始值，如果没有原始值，则会返回引用类型自身。`Object`类型数据的`valueOf()`函数默认的返回结果是"{}"，即一个空的对象字面量。
同样对于Array、Function、Date等类型，valueOf()函数的返回值如下：

- `Array`的`valueOf()`函数返回的是数组本身，例如[1, 2, 3].valueOf()返回的结果为“[1,2,3]”。
- `Function`的`valueOf()`函数返回的是函数本身，例如(function(x){return x * 2;}).valueOf()返回的结果为函数本身“function(x){return x * 2;}”。
- `Date`的`valueOf()`函数返回的是指定日期的时间戳，例如new Date().valueOf()返回的结果为“1543130166771”。
## 引用类型转换逻辑
**转换为String类型时：**

- 如果对象具有`toString()`函数，则会优先调用`toString()`函数。如果它返回的是一个原始值，则会直接将这个原始值转换为字符串表示，并返回该字符串。
-  如果对象没有`toString()`函数，或者`toString()`函数返回的不是一个原始值，则会再去调用`valueOf()`函数，如果`valueOf()`函数返回的结果是一个原始值，则会将这个结果转换为字符串表示，并返回该字符串。
-  如果通过`toString()`函数或者`valueOf()`函数都无法获得一个原始值，则会直接抛出类型转换异常。

**转换为Number类型时：**

- 如果对象具有`valueOf()`函数，则会优先调用`valueOf()`函数，如果`valueOf()`函数返回一个原始值，则会直接将这个原始值转换为数字表示，并返回该数字。
- 如果对象没有`valueOf()`函数，或者`valueOf()`函数返回的不是原生数据类型，则会再去调用`toString()`函数，如果`toString()`函数返回的结果是一个原始值，则会将这个结果转换为数字表示，并返回该数字。
- 如果通过`toString()`函数或者`valueOf()`函数都无法获得一个原始值，则会直接抛出类型转换异常。

除了Date类型以外的引用类型数据转换为原生数据类型时，如果是用于**数据运算**，则会优先调用valueOf()函数，在valueOf()函数无法满足条件时，则会继续调用toString()函数，如果toString()函数也无法满足条件，则会抛出类型转换异常。

如果是用于**数据展示**，则会优先调用toString()函数，在toString()函数无法满足条件时，则会继续调用valueOf()函数，如果valueOf()函数也无法满足条件，则会抛出类型转换异常。
## 示例
```javascript
var obj = {
     i: 10,
     toString: function () {
         console.log('toString');
         return this.i;
     },
     valueOf: function () {
         console.log('valueOf');
         return this.i;
     }
};

+obj;  // valueOf  用于运算
'' + obj;  // valueOf  用于运算
String(obj);  // toString  用于数据展示
Number(obj);  // valueOf  用于运算
obj == '10';  // valueOf，true  ==会转换 用于运算
obj === '10'; // false  === 不会转换 两者类型不一致，不会执行toString()或valueOf()
```
