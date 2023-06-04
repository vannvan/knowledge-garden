## 概念类

### 是什么?

TS 和 JS 之间的关系其实就是 `Less/Sass` 和 `CSS` 之间的关系
就像 `Less/Sass` 是对 `CSS` 进行扩展一样，TS 也是对 JS 进行扩展
就像 `Less/Sass` 最终会转换成 `CSS` 一样，我们编写好的 TS 代码最终也会换成 JS

### 为什么要使用 TypeScript ? TypeScript 相对于 JavaScript 的优势是什么？

因为 JavaScript 是弱类型，很多错误只有在运行时才会被发现
而 TypeScript 是强类型，它提供了一套**静态检测机制**，可以帮助我们在编译时就发现错误
特点：

- 支持最新的 JavaScript 新特特性
- 支持代码静态检查
- 支持诸如 C,C++，Java,Go 等后端语言中的特性（枚举、泛型、类型转换、命名空间、声明文件、类、接口等）

优势：

1. 杜绝手误导致的变量名写错
2. 类型可以一定程度上充当文档
3. IDE自动填充，提供了代码补全、接口提示、跳转到定义、代码重构等能力

### 什么是 any 类型，何时使用 ？

在 TypeScript 中，任何类型的值都可以赋值给 any  ， any 也可以赋值给任意类型，因此，any 类型通常也被称为 top type

- 有时你想将值存储在变量中，但事先不知道该变量的类型
- 当你没有明确提供类型时，TypeScript 假定变量是 any 类型，并且编译器无法从周围的上下文中推断出类型

例如，该值来自 API 调用或用户输入。any 类型 允许你将任何类型的值分配给 any 类型的变量

```typescript
let person: any = "Foo";

// 以下是一个演示任何类型用法的示例

// json可能来自第三方API
const employeeData: string = `{"name": "arry老师", "salary": 60000}`;

// 解析JSON以构建employee对象
const employee: any = JSON.parse(employeeData);

console.log(employee.name);
console.log(employee.salary);
```

想法：一个TS项目中想要从始至终都没有any是不现实的，any只能不断减少而不会彻底不用，假设一开始明明对类型不确定而牵强的采用了其它类型反而会加大后期改动优化的工作量，当然我们可以在适当的时候采用never或unknown去做的恰当一点。

### 什么是 void，什么时候使用 void 类型 ？

- void 表示变量没有类型，它充当与任何相反的类型，它在不返回值的函数中特别有用
- 如果变量是 void 类型，则只能将 null 或 undefined 值分配给该变量

### TypeScript 中 ?.、??、!、!.、_、** 等符号的含义？

- ?. 可选链 遇到 null 和 undefined 可以立即停止表达式的运行。
- ?? 空值合并运算符 当左侧操作数为 null 或 undefined 时，其返回右侧的操作数，否则返回左侧的操作数。
- ! 非空断言运算符 x! 将从 x 值域中排除 null 和 undefined!. 在变量名后添加，可以断言排除undefined和null类型
- _ 数字分割符 分隔符不会改变数值字面量的值，使人更容易读懂数字 .e.g 1_101_324。
- ** 求幂

### 对 TypeScript 类中成员的 public、private、protected、readonly 修饰符的理解？

- public: 成员都**默认为public**，被此限定符修饰的成员是可以被外部访问；
- private: 被此限定符修饰的成员是只可以被类的内部访问；
- protected: 被此限定符修饰的成员是只可以被类的内部以及类的子类访问;
- readonly: 关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化。

### 命名空间

命名空间可以看做是一个微型模块，
当我们先把相关的业务代码写在一起，又不想污染全局空间的时候，我们就可以使用命名空间
本质就是定义一个大对象，把变量/方法/类/接口..的都放里面

## 方法类

### type 和 interface 的区别⭐️

- `interface` 可以重复声明，`type` 不行
- 实现继承方式不一样，`type` 使用交叉类型方式，`interface` 使用 `extends` 实现。在对象扩展的情况下，使用接口继承要比交叉类型的性能更好。
- 建议使用 `interface` 来描述对象对外暴露的接口 ，使用 `type` 将一组类型重命名（或对类型进行复杂编程）

应用

- 对外 API ，尽量用 interface，方便扩展
- 对内 API ，尽量用 type，防止代码分散

```typescript
interface iMan {
  name: string;
  age: number;
}
// 接口可以进行声明合并
interface iMan {
  hobby: string;
}

type tMan = {
  name: string;
  age: number;
};
// type不能重复定义
// type tMan = {}

// 继承方式不同, 接口继承使用 extends
interface iManPlus extends iMan {
  height: string;
}
// type继承使用&，又称交叉类型
type tManPlus = { height: string } & tMan;

const aMan: iManPlus = {
  name: "aa",
  age: 15,
  height: "175cm",
  hobby: "eat",
};

const bMan: tManPlus = {
  name: "bb",
  age: 15,
  height: "150cm",
};
```

### any、unkonwn、never 区别

- any 和 unkonwn 在 TS 类型中属于最顶层的 Top Type，即所有的类型都是它俩的子类型。
- 而 never 则相反，它作为 Bottom Type 是所有类型的子类型。

### 大写 Object 与 小写 object 区别

Object 范围更大，包含所有可包装类型（String，Number），类似 any，少用

### TypeScript 中 any、never、unknown、null & undefined 和 void 有什么区别？

- any: 动态的变量类型（**失去了类型检查的作用**）。
- never: 永不存在的值的类型。例如：never 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型。
- unknown: 任何类型的值都可以赋给 unknown 类型，但是 unknown 类型的值只能赋给 unknown 本身和 any 类型。
- null & undefined: 默认情况下 null 和 undefined 是所有类型的子类型。 就是说你可以把 null 和 undefined 赋值给 number 类型的变量。当你指定了 --strictNullChecks 标记，null 和 undefined 只能赋值给 void 和它们各自。
- void: 没有任何类型。例如：一个函数如果没有返回值，那么返回值可以定义为void。

### TypeScript 中 const 和 readonly 的区别

- const 用于变量， readonly 用于属性
- const 在运行时检查， readonly 在编译时检查
- const 声明的变量不得改变值，这意味着，const 一旦声明变量，就必须立即初始化，不能留到以后赋值； readonly 修饰的属性能确保自身不能修改属性，但是当你把这个属性交给其它并没有这种保证的使用者（允许出于类型兼容性的原因），他们能改变

### TypeScript 中 interface 可以给 Function / Array / Class（Indexable）做声明吗？

```typescript
// 函数声明
interface Say {
 (name: string): viod;
}
let say: Say = (name: string):viod => {}

// Array 声明
interface NumberArray { 
 [index: number]: number; 
} 
let fibonacci: NumberArray = [1, 1, 2, 3, 5];

interface IApp {
  name: string
  init(appName: string): void
  start(): void
}

class App implements IApp {
  name: string
  constructor() {
    this.name = ''
  }

  init(appName: string): void {
    //
  }
  start(): void {
    //
  }
}
```

### TypeScript 中使用联合类型时有哪些注意事项？

**属性或方法访问**: 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法。

```typescript
function getLength(something: string | number): number {
   return something.length;
}
// index.ts(2,22): error TS2339: Property 'length' does not exist on type >'string | number'.
//   Property 'length' does not exist on type 'number'.

function getString(something: string | number): string {
   return something.toString();
}
// 公共方法和属性可以访问
```

### 如何使 TypeScript 项目引入并识别编译为 JavaScript 的 npm 库包？

1. 选择安装 ts 版本，npm install @types/包名 --save；
2. 对于没有类型的 js 库，需要编写同名的.d.ts文件

### keyof 和 typeof 关键字的作用？

- keyof 索引类型查询操作符 获取索引类型的属性名，构成联合类型。
- typeof 获取一个变量或对象的类型。

### TypeScript 支持静态类吗 ？为什么 ？

TypeScript 不支持静态类，

- 这与流行的 C# 和 Java 等面向对象的编程语言不同。
- 这些语言需要静态类，因为所有代码，即数据和函数，都需要在一个类中并且不能独立存在。静态类提供了一种方法来允许这些功能，而无需将它们与任何对象相关联。

在 TypeScript 中，你可以将任何数据和函数创建为简单对象，而无需创建包含类。

- 因此，TypeScript 不需要静态类，单例类只是 TypeScript 中的一个简单对象。

### 除 null 和 undefined 的检测

```typescript
function getLength(value: (string | null | undefined)) {
    value = 'abc';
    return () => {
        // return value. length; // 报错
        // return (value || '').length;
        // return (value as string).length;

        // 我们可以使用 ! 来去除 null 和 undefined
        // ! 的含义就是这个变量一定不是 null 和 undefined
        return value!.length;
    }
}

let fn = getLength('Lance');
let res = fn();
console.log(res);
```

## 实践类

## 资料

- [https://willbchang.notion.site/042c7f6bc2d04c238ce2d33a699b9048](https://willbchang.notion.site/042c7f6bc2d04c238ce2d33a699b9048)
- [TypeScript 中，关于 any 类型，你需要知道的一切 · Issue #127 · sisterAn/blog](https://github.com/sisterAn/blog/issues/127)
