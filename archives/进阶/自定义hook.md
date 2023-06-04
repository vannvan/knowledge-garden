## 自定义hook

几个问题

- 认识自定义`Hook`的基本概念
- 能够使用自定义`Hook`进行复用逻辑的封装
- 了解自定义`Hook`的最佳实践与工作原理
- 进一步深入`Hook`底层原理思想
- 创造新的轮子思想，借鉴`Reack Hook`思想

## 几个有用的hook

- 例如使用`useMount`模拟生命周期`componentDidMount`

```js
import React, { useState, useEffect } from 'react';

function  useMount (fn) {
  useEffect(() => {
    fn();
  }, []);
}

export default function App() {

  useMount(() => {
     // 你的逻辑
  })


  return (
    <div className="App">
      <p> Hello React Hook! </p>
    </div>
  );
}
```

- 利用`useEffect`返回函数是销毁才调用的机制来模拟`unmount`

```js

function  useUnmount (fn) {
    useEffect(() => {
        return () => {
            fn();
        }
    }, []);
}

export default function App() {

   useUnmount(() => {
        console.log('销毁组件时输出')
   })
 

  return (
    <div className="App">
      <p> Hello React Hook! </p>
    </div>
  );
}
```

- 监听窗口变化

```js
import React, { useState, useEffect } from 'react';

function  useOnResize (fn) {
    useEffect(() => {
        window.addEventListener('resize',fn);
        return () => {
            window.removeEventListener('resize',fn)
        }
    }, []);
}

export default function App() {

   useOnResize(() => {
        console.log(document.body.clientWidth)
   })
 
  return (
    <div className="App">
      <p> Hello React Hook! </p>
    </div>
  );
}

```







## 文章

[当面试官问自定义Hook的时候他想知道什么](https://juejin.cn/post/6961664628526940174#heading-6)