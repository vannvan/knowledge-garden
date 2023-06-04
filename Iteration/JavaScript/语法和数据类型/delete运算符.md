## 语法
`**delete**` 运算符用于删除对象的一个属性；如果该属性的值是一个对象，并且没有更多对该对象的引用，该属性所持有的对象最终会自动释放。
```javascript
const Employee = {
  firstname: 'John',
  lastname: 'Doe'
};

console.log(Employee.firstname);
// Expected output: "John"

delete Employee.firstname;

console.log(Employee.firstname);
// Expected output: undefined
```
### 返回值
对于大多数情况都是 true；如果属性是一个**自身不可配置**的属性，在这种情况下，非严格模式返回 false。
### 异常
TypeError
如果属性是自身不可配置的属性且处于严格模式中，则会抛出该异常。
ReferenceError
当 object 是 super 时抛出。
## 资料

- [https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/delete](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/delete)
