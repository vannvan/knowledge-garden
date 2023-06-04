### 数据类型

```js
var num1 = 2;
var num2 = 20;
var num3 = --num1 + num2; // 等于 21
var num4 = num1 + num2; // 等于 21 
```

在这里，num3 之所以等于 21 是因为 num1 先减去了 1 才与 num2 相加。而变量 num4 也等于 21 是
因为相应的加法操作使用了 num1 减去 1 之后的值。

递增和递减操作符遵循下列规则。

- 在应用于一个包含有效数字字符的字符串时，先将其转换为数字值，再执行加减 1 的操作。字
  符串变量变成数值变量。
-  在应用于一个不包含有效数字字符的字符串时，将变量的值设置为 NaN（第 4 章将详细讨论）。
  字符串变量变成数值变量。
- 在应用于布尔值 false 时，先将其转换为 0 再执行加减 1 的操作。布尔值变量变成数值变量。
- 在应用于布尔值 true 时，先将其转换为 1 再执行加减 1 的操作。布尔值变量变成数值变量。
- 在应用于浮点数值时，执行加减 1 的操作。
-  在应用于对象时，先调用对象的 valueOf()方法（第 5 章将详细讨论）以取得一个可供操作的
  值。然后对该值应用前述规则。如果结果是 NaN，则在调用 toString()方法后再应用前述规
  则。对象变量变成数值变量。

```js
var s1 = "2";
var s2 = "z";
var b = false;
var f = 1.1;
var o = {
 valueOf: function() {
 return -1;
 }
};
s1++; // 值变成数值 3
s2++; // 值变成 NaN
b++; // 值变成数值 1
f--; // 值变成 0.10000000000000009（由于浮点舍入错误所致）
o--; // 值变成数值-2 
```

### 逻辑或

- 如果第一个操作数是对象，则返回第一个操作数；
-  如果第一个操作数的求值结果为 false，则返回第二个操作数；
-  如果两个操作数都是对象，则返回第一个操作数；
-  如果两个操作数都是 null，则返回 null；
-  如果两个操作数都是 NaN，则返回 NaN；
-  如果两个操作数都是 undefined，则返回 undefined

```js
var found = true;
var result = (found || someUndefinedVariable); // 不会发生错误
alert(result); // 会执行（"true"）
```

这个例子跟前面的例子一样，变量 someUndefinedVariable 也没有定义。但是，由于变量 found的值是 true，而变量 someUndefinedVariable 永远不会被求值，因此结果就会输出"true"。如果把 found 的值改为 false，就会导致错误

### 逻辑与

- 如果第一个操作数是对象，则返回第二个操作数
-  如果第二个操作数是对象，则只有在第一个操作数的求值结果为 true 的情况下才会返回该对象；
-  如果两个操作数都是对象，则返回第二个操作数；
-  如果有一个操作数是 null，则返回 null；
- 如果有一个操作数是 NaN，则返回 NaN；
-  如果有一个操作数是 undefined，则返回 undefined

```js
var found = true;
var result = (found && someUndefinedVariable); // 这里会发生错误
alert(result); // 这一行不会执行
```

在上面的代码中，当执行逻辑与操作时会发生错误，因为变量 someUndefinedVariable 没有声明。由于变量 found 的值是 true，所以逻辑与操作符会继续对变量 someUndefinedVariable 求值。但 someUndefinedVariable 尚未定义，因此就会导致错误。这说明不能在逻辑与操作中使用未定义的值。如果将 found 的值设置为 false，就不会发生错误了