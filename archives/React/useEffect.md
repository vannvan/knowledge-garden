## 认知

虽然可以把`useEffect` 想象成 `componentDidMount`， `componentDidUpdate`，`componentWillUnmount` 三个生命周期的结合体。但在实际场景中它与生命周期还有着截然不同的差异。应当用全新的视角理解它所具备的特性。

## 运行时机

`useEffect` **必然会在 render 的时候执行一次**，其他时机取决于以下情况：

- 有没有第二个参数（是一个数组），第二个参数可以指定一组变量，其中任何一个变量发生变化，effect内部的方法都会再执行一次；
- 有没有返回值（是一个函数），此返回值在每一次新的render进行前或unmouted之时都会执行此函数，进行清理工作。

## 应用重点

- 如果数组为空，则只在第一次 render 时执行一次，如果有返回值，那么在下一次 render 之前或组件 unmount 之前必定会运行一次返回函数的代码。
- 如果在 `useEffect` 中更新了 state，且没有指定依赖数组，或 state 存在于依赖数组中，就会造成死循环









## 文章

- [useEffect你用对了吗](https://juejin.cn/post/6844904020948041741)
- [使用React Hooks 时要避免的5个错误！](https://juejin.cn/post/6937818396859826207)

