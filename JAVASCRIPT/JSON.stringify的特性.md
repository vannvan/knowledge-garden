### `JSON.stringify()` 九大特性：

**一、对于 undefined、任意的函数以及 symbol 三个特殊的值分别作为对象属性的值、数组元素、单独的值时的不同返回结果。**

- `undefined`、任意的函数以及 `symbol` 作为对象属性值时 `JSON.stringify()` 跳过（忽略）对它们进行序列化
- `undefined`、任意的函数以及 `symbol` 作为数组元素值时，`JSON.stringify()` 将会将它们序列化为 `null`
- `undefined`、任意的函数以及 `symbol` 被 `JSON.stringify()` 作为单独的值进行序列化时都会返回 `undefined`

**二、非数组对象的属性不能保证以特定的顺序出现在序列化后的字符串中。**

**三、转换值如果有 toJSON() 函数，该函数返回什么值，序列化结果就是什么值，并且忽略其他属性的值。**

**四、JSON.stringify() 将会正常序列化 Date 的值。**

**五、NaN 和 Infinity 格式的数值及 null 都会被当做 null。**

**六、布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。**

**七、其他类型的对象，包括 Map/Set/WeakMap/WeakSet，仅会序列化可枚举的属性。**

**八、对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。**

**九、所有以 symbol 为属性键的属性都会被完全忽略掉，即便 replacer 参数中强制指定包含了它们。**

### `JSON.stringify()` 第二个参数和第三个参数

#### 强大的第二个参数：

- 作为函数时，它有两个参数，键（key）和值（value），函数类似就是数组方法 `map`、`filter` 等方法的回调函数，对每一个属性值都会执行一次该函数（期间我们还简单实现过一个 `map` 函数）。
- 如果 `replacer` 是一个数组，数组的值代表将被序列化成 JSON 字符串的属性名。

#### 华丽的第三个参数：

- 如果是一个数字, 则在字符串化时每一级别会比上一级别缩进多这个数字值的空格（最多10个空格）；
- 如果是一个字符串，则每一级别会比上一级别多缩进该字符串（或该字符串的前10个字符）

[原文](https://juejin.im/post/5decf09de51d45584d238319)

```js
Uncaught TypeError: Converting circular structure to JSON
    at JSON.stringify (<anonymous>)
    at <anonymous>:1:6
//报错解决
```

```js
var o = {};
o.o = o;

// 声明cache变量，便于匹配是否有循环引用的情况
var cache = [];
var str = JSON.stringify(o, function(key, value) {
    if (typeof value === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1) {
            // 移除
            return;
        }
        // 收集所有的值
        cache.push(value);
    }
    return value;
});
cache = null; // 清空变量，便于垃圾回收机制回收
```

### 替换对象多个属性值

```js
const mapObj = {
  _id: "id",
  created_at: "createdAt",
  updated_at: "updatedAt"
};
const todayILearn = {
  _id: 1,
  content: '今天学习 JSON.stringify()，我很开心！',
  created_at: 'Mon Nov 25 2019 14:03:55 GMT+0800 (中国标准时间)',
  updated_at: 'Mon Nov 25 2019 16:03:55 GMT+0800 (中国标准时间)'
}


  JSON.parse(JSON.stringify(todayILearn).replace(
    /_id|created_at|updated_at/gi,
    matched => mapObj[matched])
  )


/*
{
  id: 1,
  content: '今天学习 JSON.stringify()，我很开心！',
  createdAt: 'Mon Nov 25 2019 14:03:55 GMT+0800 (中国标准时间)',
  updatedAt: 'Mon Nov 25 2019 16:03:55 GMT+0800 (中国标准时间)'
}
*/
```

