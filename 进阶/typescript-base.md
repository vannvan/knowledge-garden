### 知识框架

![](https://user-gold-cdn.xitu.io/2020/6/8/172916652ec072e3?imageslim)

### 基础类型

#### Boolean

> let isDone: boolean = false

#### Number 

> let count: number = 100

#### String

> let name: string = bob

#### Array 

> let list: number[] = [1,2,3]
>
> let list: Array<number> = [1,2,3,4]  //Array<number>泛型语法

#### Enum 枚举

1. 数字枚举

```js
enum week {
	Mon,
	Tue,
	Wed,
	Thu,
	Fri
}
let day: week = week.Mon
console.log(day)
//-------------编译结果
var week;
(function (week) {
    week[week["Mon"] = 0] = "Mon";
    week[week["Tue"] = 1] = "Tue";
    week[week["Wed"] = 2] = "Wed";
    week[week["Thu"] = 3] = "Thu";
    week[week["Fri"] = 4] = "Fri";
})(week || (week = {}));
var day = week.Mon;
console.log(day);  // 0
```

2. 字符串枚举

```js
enum week {
	Mon = 'first',
	Tue = 'second',
	Wed = 'third',
	Thu = 'fourth',
	Fri = 'fifth'
}
let day: week = week.Mon
console.log(day)
//------------编译结果
var week;
(function (week) {
    week["Mon"] = "first";
    week["Tue"] = "second";
    week["Wed"] = "third";
    week["Thu"] = "fourth";
    week["Fri"] = "fifth";
})(week || (week = {}));
var day = week.Mon;
console.log(day); // ‘’first
```

3. 异构枚举

```js
enum Enum {
  A,
  B,
  C = "C",
  D = "D",
  E = 8,
  F,
}
//------------编译结果
"use strict";
var Enum;
(function (Enum) {
    Enum[Enum["A"] = 0] = "A";
    Enum[Enum["B"] = 1] = "B";
    Enum["C"] = "C";
    Enum["D"] = "D";
    Enum[Enum["E"] = 8] = "E";
    Enum[Enum["F"] = 9] = "F";
})(Enum || (Enum = {}));
console.log(Enum.A) //输出：0
```

#### Any

> let flag: any = 10;
>
> flag = 1
>
> flag = false

#### Unknown 

```js
let value: unknown;
value = true; // OK
value = 42; // OK
value = "Hello World"; // OK
value = []; // OK
value = {}; // OK
value = Math.random; // OK
value = null; // OK
value = undefined; // OK
value = new TypeError(); // OK
value = Symbol("type"); // OK
```

`unknown`类型只能被赋给`any`类型和`unknown`类型本身

#### Tuple 

```js
let tupleType: [string, boolean];
tupleType = ["Semlinker", true];
console.log(tupleType[0]); // Semlinker
console.log(tupleType[1]); // true
```

#### Void

从某种程度上说，`void`和`any`相反，它表示没有任何类型，当一个函数没有返回值时，则其返回值类型应该为`void`

```js
function fn() : void {
	console.log('this is a normal function')
}
```

#### Null和undefined

```js
let u: undefined = undefined;
let n: null = null;
```

#### Never 

`Never`类型表示那些用不存在的值的类型，`Never`类型总是会抛出异常或根本不会有返回值的函数表达式或箭头函数的返回值类型。

```js
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {}
}

```



### 断言

有时候会遇到一种情况，已经确切的了解了某个值的详细信息，清楚的知道一个实体具有比它现有类型更确切的类型。

类型断言有两种形式：

1. "尖括号"语法

```js
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
```

1. as语法

```js
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```



### 类型守卫

用于确保该类型再一定的范围内，l类型保护可以保证一个字符串是一个字符串，尽管他的值也可能是一个数值。其主要思想是尝试检测属性、方法或类型，以确定如何处理值。

#### in关键字

//

#### typeof 关键字

//

#### instanceof  关键字

//

#### 自定义类型保护的类型谓词

```typescript
function isNumber(x: any): x is number {
  return typeof x === "number";
}

function isString(x: any): x is string {
  return typeof x === "string";
}
```

### 联合类型和类型别名

#### 联合类型

通常`null`和`undefined`同时使用

```js
const sayHello = (name: string | undefined) => {
  /* ... */
};
```

#### 可辨识联合

TypeScript 可辨识联合（Discriminated Unions）类型，也称为代数数据类型或标签联合类型。**它包含 3 个要点：可辨识、联合类型和类型守卫。**

**如果一个类型是多个类型的联合类型，且多个类型含有一个公共属性，那么就可以利用这个公共属性，来创建不同的类型保护区块。**

**可辨识**

//

**联合类型**

//

**类型守卫**

//

#### 类型别名

```js
type Message = string | string[];

let greet = (message: Message) => {
  // ...
};

```

### 交叉类型

//

### 函数

#### TypeScript 函数与 JavaScript 函数的区别

| TypeScript     | JavaScript         |
| -------------- | ------------------ |
| 含有类型       | 无类型             |
| 箭头函数       | 箭头函数（ES2015） |
| 函数类型       | 无函数类型         |
| 必填和可选参数 | 所有参数都是可选的 |
| 默认参数       | 默认参数           |
| 剩余参数       | 剩余参数           |
| 函数重载       | 无函数重载         |

#### 参数类型和返回类型

```js
function createFullName(firstName: string, lastName: string): string {
	return firstName + lastName
}
```

#### 函数类型

```js
let IdGenerator: (chars: string, nums: number) => string;

function createUserId(name: string, id: number): string {
  return name + id;
}

IdGenerator = createUserId;
```

#### 可选参数及默认参数

```js
// 可选参数
function createUserId(name: string, id: number, age?: number): string {
  return name + id;
}

// 默认参数
function createUserId(
  name: string = "bob",
  id: number,
  age?: number
): string {
  return name + id;
}
```

可以通过 `?` 号来定义可选参数，比如 `age?: number` 这种形式,需要注意的是可选参数要放在普通参数的后面，不然会导致编译错误。

#### 剩余参数

```js
function push(array, ...items) {
  items.forEach(function (item) {
    array.push(item);
  });
}

let a = [];
push(a, 1, 2, 3);
```

#### 函数重载

函数重载或方法重载是使用相同名称和不同参数数量或类型创建多个方法的一种能力。要解决前面遇到的问题，方法就是为同一个函数提供多个函数类型定义来进行函数重载，编译器会根据这个列表去处理函数的调用。

//

#### 数组

#### 解构

//

#### 扩展运算符

//

#### 数组遍历

//

### 对象

#### 解构

//

#### 扩展运算符

//

### 接口

#### 对象的形状

```typescript
interface Person {
  name: string;
  age: number;
}

let Semlinker: Person = {
  name: "Semlinker",
  age: 33,
};
```

#### 可选 | 只读属性

```typescript
interface Person {
  readonly name: string;
  age?: number;
}
```

### 类

//

### 泛型

设计泛型的关键目的是在成员之间提供有意义的约束，这些成员可以是：类的实例成员、类的方法、函数参数和函数返回值。

泛型（Generics）是允许同一个函数接受不同类型参数的一种模板。相比于使用 any 类型，使用泛型来创建可复用的组件要更好，因为泛型会保留参数类型。

#### 泛型接口

```typescript
interface GenericIdentityFn<T> {
  (arg: T): T;
}
```

#### 泛型类

```typescript
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};
```

#### 泛型变量

- T（Type）：表示一个 TypeScript 类型
- K（Key）：表示对象中的键类型
- V（Value）：表示对象中的值类型
- E（Element）：表示元素类型

```typescript
function get<T extends object, K extends keyof T>(o: T, name: K): T[K] {
  return o[name]
}
```

**范型应用**

写一个函数，接受两个参数，一个为object，另一个为object中的一个key。函数返回类型指定为obj[key]的类型。

```js
interface Person{
	name:string,
	age:number
}

function demo<T extends object, K extends keyof T>(obj:T, key:K){
	return obj[key]
}

//测试
let obj:Person={
 	 name:"tea",
 	 age:23
}
let age = demo(obj, "age")   // number类型
let name = demo(obj, "name")   // string类型
```

#### 泛型工具类型

//

### 装饰器









### 综合运用

**基础类型**

```js
type BasicProps = {
  message: string;
  count: number;
  disabled: boolean;
  /** 数组类型 */
  names: string[];
  /** 用「联合类型」限制为下面两种「字符串字面量」类型 */
  status: "waiting" | "success";
};
```

**对象类型**

```js
type ObjectOrArrayProps = {
  /** 如果你不需要用到具体的属性 可以这样模糊规定是个对象 ❌ 不推荐 */
  obj: object;
  obj2: {}; // 同上
  /** 拥有具体属性的对象类型 ✅ 推荐 */
  obj3: {
    id: string;
    title: string;
  };
  /** 对象数组 😁 常用 */
  objArr: {
    id: string;
    title: string;
  }[];
  /** key 可以为任意 string，值限制为 MyTypeHere 类型 */
  dict1: {
    [key: string]: MyTypeHere;
  };
  dict2: Record<string, MyTypeHere>; // 基本上和 dict1 相同，用了 TS 内置的 Record 类型。
}
```

**函数类型**

```js
type FunctionProps = {
  /** 任意的函数类型 ❌ 不推荐 不能规定参数以及返回值类型 */
  onSomething: Function;
  /** 没有参数的函数 不需要返回值 😁 常用 */
  onClick: () => void;
  /** 带参数的函数 😁 非常常用 */
  onChange: (id: number) => void;
  /** 另一种函数语法 参数是 React 的按钮事件 😁 非常常用 */
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
  /** 可选参数类型 😁 非常常用 */
  optional?: OptionalType;
}
```

**React相关类型**

```js
export declare interface AppProps {
  children1: JSX.Element; // ❌ 不推荐 没有考虑数组
  children2: JSX.Element | JSX.Element[]; // ❌ 不推荐 没有考虑字符串 children
  children4: React.ReactChild[]; // 稍微好点 但是没考虑 null
  children: React.ReactNode; // ✅ 包含所有 children 情况
  functionChildren: (name: string) => React.ReactNode; // ✅ 返回 React 节点的函数
  style?: React.CSSProperties; // ✅ 推荐 在内联 style 时使用
  // ✅ 推荐原生 button 标签自带的所有 props 类型
  // 也可以在泛型的位置传入组件 提取组件的 Props 类型
  props: React.ComponentProps<"button">;
  // ✅ 推荐 利用上一步的做法 再进一步的提取出原生的 onClick 函数类型 
  // 此时函数的第一个参数会自动推断为 React 的点击事件类型
  onClickButton：React.ComponentProps<"button">["onClick"]
}
```



### 参考链接

- [TypeScript 入门教程](https://juejin.im/post/5edd8ad8f265da76fc45362c)
- [如何在 React 中完美运用？](https://juejin.cn/post/6910863689260204039)
- [ts高级开发技巧](https://www.nblogs.com/archives/518/)
- [TypeScript 错误property does not exist on type Object](https://www.cnblogs.com/limbobark/p/10043769.html)
- [TS错误代码大全](https://blog.csdn.net/u010785091/article/details/103123696/)
- [ts中泛型、泛型方法、泛型类、泛型接口](https://www.cnblogs.com/plBlog/p/12365627.html)
- [ts(7053)错误解决方法](https://blog.csdn.net/qq_41411483/article/details/111458367)