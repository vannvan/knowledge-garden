## 基础
`typeof` 操作符可以用来获取一个变量声明或对象的类型。在 TypeScript 中，只有对标识符（比如变量名）或者他们的属性使用 `typeof` 才是合法的
```typescript
interface Person {
  name: string;
  age: number;
}

const sem: Person = { name: 'semlinker', age: 33 };
type Sem= typeof sem; // -> Person
```
### 对对象使用
```typescript
const person = { name: "kevin", age: "18" }
type Kevin = typeof person;

// type Kevin = {
// 		name: string;
// 		age: string;
// }
```
### 对函数使用
```typescript
function identity<Type>(arg: Type): Type {
  return arg;
}

type result = typeof identity;
// type result = <Type>(arg: Type) => Type
```
### 对enum使用
```typescript
type result = typeof UserResponse;

// ok
const a: result = {
      "No": 2,
      "Yes": 3
}

// result 类型类似于：

// {
//	"No": number,
//  "YES": number
// }
```
对一个 enum 类型只使用 typeof 一般没什么用，通常还会搭配 keyof 操作符用于获取属性名的联合字符串
## 场景
### 场景1
假设有这样一个业务场景，一个页面要用在不同的 APP 里，比如淘宝、天猫、支付宝，根据所在 APP 的不同，调用的底层 API 会不同
```typescript
const APP = ['TaoBao', 'Tmall', 'Alipay'] as const;
type app = typeof APP[number];
// type app = "TaoBao" | "Tmall" | "Alipay"

function getPhoto(app: app) {
  // ...
}
  
getPhoto('TaoBao'); // ok
getPhoto('whatever'); // not ok

```
解析

- 首先是使用 as const 将数组变为 readonly 的元组类型
- 但此时 APP 还是一个值，我们通过 typeof 获取 APP 的类型
- 最后在通过索引访问类型，获取字符串联合类型
### 场景2
对于嵌套层级比较深的复杂大对象来说，我们可以通过typeof拿到它的某一级属性，而无需重新定义
```typescript
const lolo = {
  name: "lolo",
  age: 7,
  address: {
    province: "福建",
    city: "厦门",
  },
};
 
interface Person {
  name: string;
  age: number;
  address: {
    province: string;
    city: string;
  };
}

type Person = typeof lolo;  // 拿到了整体
type Address = typeof lolo["address"];  // 拿到了address的类型
```
### 场景3
当我们需要将枚举类型的属性作为函数传参的限制条件时
```typescript
const method: typeof HttpMethod = {
  Get: 0,
  Post: 1,
};
 
type Method = keyof typeof HttpMethod; // "Get" | "Post"
```
## 资料

- [索引访问类型_TypeScript中文文档](https://ts.yayujs.com/handbook/IndexedAccessTypes.html#%E7%B4%A2%E5%BC%95%E8%AE%BF%E9%97%AE%E7%B1%BB%E5%9E%8B-indexed-access-types)
