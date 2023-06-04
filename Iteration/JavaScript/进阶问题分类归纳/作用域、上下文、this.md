## 输出是什么？
```javascript
function sayHi() {
  console.log(name)
  console.log(age)
  var name = 'Lydia'
  let age = 21
}

sayHi()
```

- A: Lydia 和 undefined
- B: Lydia 和 ReferenceError
- C: ReferenceError 和 21
- D: undefined 和 ReferenceError
> #### 答案: D
> 在函数内部，我们首先通过 var 关键字声明了 name 变量。这意味着变量被提升了（内存空间在创建阶段就被设置好了），直到程序运行到定义变量位置之前默认值都是 undefined。因为当我们打印 name 变量时还没有执行到定义变量的位置，因此变量的值保持为 undefined。
> 通过 let 和 const 关键字声明的变量也会提升，但是和 var 不同，它们不会被_初始化_。在我们声明（初始化）之前是不能访问它们的。这个行为被称之为暂时性死区。当我们试图在声明之前访问它们时，JavaScript 将会抛出一个 ReferenceError 错误。

## **输出是什么？**
```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1)
}

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1)
}
```

- A: 0 1 2 和 0 1 2
- B: 0 1 2 和 3 3 3
- C: 3 3 3 和 0 1 2
> #### 答案: C
> 由于 JavaScript 的事件循环，setTimeout 回调会在_遍历结束后_才执行。因为在第一个遍历中遍历 i 是通过 var 关键字声明的，所以这个值是全局作用域下的。在遍历过程中，我们通过一元操作符 ++ 来每次递增 i 的值。当 setTimeout 回调执行的时候，i 的值等于 3。
> 在第二个遍历中，遍历 i 是通过 let 关键字声明的：通过 let 和 const 关键字声明的变量是拥有块级作用域（指的是任何在 {} 中的内容）。在每次的遍历过程中，i 都有一个新值，并且每个值都在循环内的作用域中。

## **输出是什么？**
```javascript
let greeting
greetign = {} // Typo!
console.log(greetign)
```

- A: {}
- B: ReferenceError: greetign is not defined
- C: undefined
> #### 答案: A
> 代码打印出了一个对象，这是因为我们在全局对象上创建了一个空对象！当我们将 greeting 写错成 greetign 时，JS 解释器实际在上浏览器中将它视为 global.greetign = {}（或者 window.greetign = {}）。
> 为了避免这个为题，我们可以使用 `"use strict"。这能确保当你声明变量时必须赋值。

## 输出是什么？
```javascript
var status = "😎"

setTimeout(() => {
  const status = "😍"

  const data = {
    status: "🥑",
    getStatus() {
      return this.status
    }
  }

  console.log(data.getStatus())
  console.log(data.getStatus.call(this))
}, 0)
```

- A: "🥑" and "😍"
- B: "🥑" and "😎"
- C: "😍" and "😎"
- D: "😎" and "😎"
> #### 答案: B
> this关键字的指向取决于使用它的位置。 在**函数**中，比如getStatus，this指向的是调用它的对象，上述例子中data对象调用了getStatus，因此this指向的就是data对象。 当我们打印this.status时，data对象的status属性被打印，即"🥑"。
> 使用call方法，可以更改this指向的对象。data.getStatus.call(this)是将this的指向由data对象更改为全局对象。在全局对象上，有一个名为status的变量，其值为”😎“。 因此打印this.status时，会打印“😎”。

## **输出是什么？**
```javascript
const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2
  },
  perimeter: () => 2 * Math.PI * this.radius
}

shape.diameter()
shape.perimeter()
```

- A: 20 and 62.83185307179586
- B: 20 and NaN
- C: 20 and 63
- D: NaN and 63
> #### 答案: B
> 注意 diameter 的值是一个常规函数，但是 perimeter 的值是一个箭头函数。
> 对于箭头函数，this 关键字指向的是它当前周围作用域（简单来说是包含箭头函数的常规函数，如果没有常规函数的话就是全局对象），这个行为和常规函数不同。这意味着当我们调用 perimeter 时，this 不是指向 shape 对象，而是它的周围作用域（在例子中是 window）。
> 在 window 中没有 radius 这个属性，因此返回 undefined。

