unknown 类型是 TS3.0 中新增的一个顶级类型，被称作安全的 any
## 特征总结

1. 任何类型都可以赋值给unknown类型
```typescript
let value: unknown;
value = 123;
value = true;
value = 'abc';
```

2. 如果没有类型断言或基于控制流的类型细化，那么不能将 unknown 类型赋值给其它类型
```typescript
let value: unknown = 123;
let value2: number;
// value2 = value; // 报错 Type 'unknown' is not assignable to type 'number'.(2322)
value2 = value as number; // 类型断言 可以

if (typeof value === 'number') { // 类型保护（流程控制）
    value2 = value;
}
```

3. 如果没有类型断言或基于控制流的类型细化，那么不能在 unknown 类型上进行任何操作
```typescript
let value: unknown = 123;
// value++; // 报错 Object is of type 'unknown'.(2571)
(value as number)++; // 可以 不报错
```
```typescript
let value: unknown = 123;
// value++; // 报错 Object is of type 'unknown'.(2571)
if (typeof value === 'number') {
    value++;
}
```

4. 只能对 unknown 类型进行相等或不等操作，不能进行其它操作（因为其他操作没有意义）
```typescript
let value1: unknown = 123;
let value2: unknown = 123;
console.log(value1 === value2);
console.log(value1 !== value2);
console.log(value1 >= value2); // 报错 Object is of type 'unknown'.(2571)
```

5. unknown 与其它任何类型组成的**交叉类型**最后都是其它类型
```typescript
type MyType = number & unknown;  // 最后是number类型
```

6. unknown 除了与 any 以外，与其它任何类型组成的**联合类型**最后都是unknown类型
```typescript
type MyType =  unknown | any;  // unknown

type MyType =  unknown | number; // unknown

type MyType =  unknown | number | string; // unknown
```

7. never 类型是 unknown 类型的子类型
```typescript
type MyType =  never extends unknown ? true : false;  // true
```

8. keyof unknown 等于 never
```typescript
type MyType =  keyof unknown; //  never
```

9. unknown 类型的值不能访问其属性，方法，创建实例
```typescript
class Person {
    name: string = 'Lance';
    say(): void {
        console.log(`${this.name} is my name`);
    }
}

const p: unknown = new Person();
p.say(); // 此时会报 Object is of type 'unknown'
```

10. 使用映射类型时，如果遍历的是 unknown 类型，那么不会映射任何属性
```typescript
type MyType<T> = {
    [P in keyof T]: any;
}
type res = MyType<number>; // 此时能够知道res是number

type res = MyType<unknown>; // 此时res类型推断是{}
```
