## interface
### 属性可选
```typescript
interface SquareConfig {
  color?: string;
  width?: number;
}
```
### 属性只读
```typescript
interface Point {
    readonly x: number;
    readonly y: number;
}
```
#### ReadonlyArray<T>
```typescript
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!
a = ro; // error!
```
#### readonly vs const
最简单判断该用readonly还是const的方法是看要把它做为变量使用还是做为一个属性。 做为变量使用的话用 const，若做为属性则使用readonly。
### 数组类型
```typescript
// Array 声明
interface NumberArray { 
 [index: number]: number; 
} 
let fibonacci: NumberArray = [1, 1, 2, 3, 5];
```
### 函数类型
```typescript
interface SearchFunc {
  (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
}
```
### 类类型
```typescript
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
### 混合类型接口 ⭐️
```typescript
// 需求: 一个函数既要满足是一个函数没有返回值，又得满足有 count 属性
interface ICountIns {
    (): void
    count: number
}

let getCount = (function(): ICountIns {
    /**
     * ICountIns 接口要求数据
     *  既要是一个没有参数没有返回值的函数
        又要是一个拥有count属性的对象
        fn作为函数的时候符合接口中函数接口的限定 (): void
        fn作为对象的时候符合接口中对象属性的限定 count: number
     */
    let fn = <ICountIns>function() {
        fn.count++;
        console.log(fn.count);
    }
    fn.count = 0;
    return fn;
})();

getCount();
getCount();
getCount();

// 打印 1 2 3
```
### 可索引的类型
```typescript
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];


interface IFullName {
    firstName: string
    lastName: string
    middleName?: string
    [propName: string]: any
}
say({ firstName: 'Lance', lastName: 'Yang', middleName: '666', abc: 'abc' });
```
### 可以同名
当我们定义了多个同名的接口时，多个接口的内容会自动合并
```typescript
interface IPerson {
    name: string;
}
interface IPerson {
    age: number;
}
class Person implements IPerson {
    name: string = 'Lance';
    age: number = 28;
}
```
同名接口如果属性名相同，那么属性类型必须一致
```typescript
interface IPerson {
    name: string;
}
interface IPerson {
    name: number; // 报错
}
```
同名接口如果出现同名函数，那么就会成为一个函数的重载
```typescript
interface IPerson {
    name: string;
    add(x: number, y: number): number;
}
interface IPerson {
    name: string;
    add(x: string, y: string): number;
}
class Person implements IPerson {
    name: string = 'Lance';
    age: number = 28;
    add(x: any, y: any): number {
        if (typeof x === 'string' && typeof y === 'string') {
            return Number(x) + Number(y);
        } else {
            return x + y;
        }
    }
}
const p = new Person();
const ret = p.add(1, 2);
console.log(ret);
```
### 接口继承
```typescript
interface ILength {
    length: number
}
interface IWidth {
    width: number
}
interface IHeight {
    height: number
}
interface IRect extends ILength, IWidth, IHeight {
    color: string
}

const rect: IRect = {
    width: 20,
    height: 20,
    length: 20,
    color: 'red'
}
```
## type
### 工具实现
```typescript
// lib.es5.d.ts
type Partial<T> = {
    [P in keyof T]?: T[P];
};

type Required<T> = {
    [P in keyof T]-?: T[P];
};

type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

type Record<K extends keyof any, T> = {
    [P in K]: T;
};

type Exclude<T, U> = T extends U ? never : T;
```
### 类型别名
```typescript
type TAvalidvalue = number | string

type Point = {
  x: number;
  y: number;
};
function fn(args: Point) {}
```
### 别名扩展
```typescript
type Animal = {
  name: string
}

type Bear = Animal & { 
  honey: boolean 
}

const bear: Bear = getBear() 
bear.name
bear.honey

```

## 总结
### type和interface如何选
使用类型别名的场景：

- 定义基本类型的别名时，使用 type
- 定义元组类型时，使用 type
- 定义函数类型时，使用 type
- 定义联合类型时，使用 type
- 定义映射类型时，使用 type

使用接口的场景：

- 需要利用接口自动合并特性的时候，使用 interface
- 定义对象类型且无需使用 type 的时候，使用 interface
## 资料

- [type 和 interface 傻傻分不清楚？ - 掘金](https://juejin.cn/post/7098491203443752974)
