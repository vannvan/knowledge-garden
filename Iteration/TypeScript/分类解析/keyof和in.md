## keyof
```typescript
interface Point {
    x: number;
    y: number;
}

// type keys = "x" | "y"
type keys = keyof Point; 

```
假设有一个 object 如下所示，我们需要使用 typescript 实现一个 get 函数来获取它的属性值
```typescript
const data = {
  a: 3,
  hello: 'world'
}
function get<T extends object, K extends keyof T>(o: T, name: K): T[K] {
  return o[name]
}
// 此时 get('a') 的时候a能获取到提示，同时返回结果到类型也能实现推断
```
## in
```typescript
type Keys = "a" | "b"
type Obj =  {
  [p in Keys]: any
} // -> { a: any, b: any }
```
## 两者结合
### 实现Partial
```typescript
// keyof 产生枚举类型, in 使用枚举类型遍历
type Partial<T> = { 
  [P in keyof T]?: T[P] 
};
```
### 实现Required
```typescript
type Required<T> = {
  [P in keyof T]-?: T[P];
};
```
### 实现Pick
```typescript
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```
### 映射类型
有的时候，一个类型需要基于另外一个类型，但是你又不想拷贝一份，这个时候可以考虑使用映射类型。
映射类型，就是使用了 PropertyKeys 联合类型的泛型，其中 PropertyKeys 多是通过 keyof 创建，然后循环遍历键名创建一个类型
```typescript
type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};

type FeatureFlags = {
  darkMode: () => void;
  newUserProfile: () => void;
};
 
type FeatureOptions = OptionsFlags<FeatureFlags>;

// type FeatureOptions = {
//    darkMode: boolean;
//    newUserProfile: boolean;
// }
```

## 资料

- [TS 中的一些高阶技巧](https://blog.csdn.net/yang450712123/article/details/121269203)
- [TS文档学习 --- 映射类型 - 掘金](https://juejin.cn/post/7046214215081656351)
