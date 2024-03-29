# 基础使用

## 一个简单的Hooks示例

注意`useEffect`、`useState`和`useRef`各自的作用

- useState相当于用来`声明`组件将要用到的变量和函数，起到一个初始化的作用
- useEffect相当于用来`监听`组件被`声明`变量的变化，和去执行响应的监听逻辑
- useRef相当月用来`初始化`一个将要被`监听`的`vnode`节点，可以拿到原声的`DOM`节点，也可以拿到虚拟dom携带的组件参数

```typescript
import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { Input, Card } from 'antd';
import WButton from '@/components/button';

interface IUserType {
  name?: string;
  age?: number;
}

export default function() {
  const [nowTime, setNowTime] = useState<string>(
    moment().format('YYYY年MM月DD日 HH:mm:ss'),
  );
  const [userInfo, setUserInfo] = useState<IUserType>({});

  const inputEl = useRef(null);
  // useEffect可以写多个,这是一个会重复触发渲染的Effect hook，需要第二个参数
  useEffect(() => {
    const timer = setInterval(() => {
      setNowTime(moment().format('YYYY年MM月DD日 HH:mm:ss'));
    }, 1000);
  }, [nowTime]); //如果为空数，表示不监听任何状态，如果指定具体的状态，表示只监听该状态

  //这是只有首次渲染才会触发的Effect hook 只触发一次
  useEffect(() => {
    console.log('假装这是一个接口请求操作');
    let data = {
      name: 'bob',
      age: 22,
    };
    setUserInfo(data);
    console.log(userInfo);
  }, []);

  const getRef = () => {
    const { state } = inputEl.current as any;
    console.log(state);
  };

  return (
    <>
      {/* 注意 这里已经不用使用this了 */}
      <h1>{nowTime}</h1>
      {/* 这里使用一个反例，message为定义，编辑器也会报错 */}
      {/* {message} */}
      <Input type="text" ref={inputEl} />
      <WButton style={{ marginTop: 20 }} type="primary" onClick={getRef}>
        获取Ref
      </WButton>
      <Card style={{ marginTop: 20 }} title="userInfo">
        <p>{userInfo.name}</p>
        <p>{userInfo.age}</p>
      </Card>
    </>
  );
}

```

### useState需要初始化多个状态

```typescript
const [count, setCount] = useState(props.initialValue);

const [title, setTitle] = useState("This is my title");

const [age, setAge] = useState(25);
```

如此，便有了三个独立的对象

### useEffect是每次渲染时执行的

那么问题来了，在以往用生命周期的时候我们可以将接口请求写进`componentDidMount`里，那么他就只会执行一次，但是如果写进`useEffect`,而它在每次渲染时都会执行，显然是不符合要求的。

此时需要注意`useEffect`钩子接受`第二个`参数，是一个数组，其中包含导致 `useEffect` 钩子运行的依赖项的列表。当这些依赖项变化时，就会触发`Effect hook`,如此一来，如果只想运行一次`Effect hook`,`第二个`参数传`空数组`就可以了。

### useRef需要明确的

userRef只能在子组件是class组件和原生DOM中使用，子组件是函数式组件是不能用的。

如果你子组件使用的是hooks函数式写的话父组件是用不了useRef来获取dom的，只有把子组件换成class才能使用

```ts

import React, { useState, useCallback, useRef } from "react";

export default function Timer() {
  // 定义 time state 用于保存计时的累积时间
  const [time, setTime] = useState(0);

  // 定义 timer 这样一个容器用于在跨组件渲染之间保存一个变量
  const timer = useRef(null);

  // 开始计时的事件处理函数
  const handleStart = useCallback(() => {
    // 使用 current 属性设置 ref 的值
    timer.current = window.setInterval(() => {
      setTime((time) => time + 1);
    }, 100);
  }, []);

  // 暂停计时的事件处理函数
  const handlePause = useCallback(() => {
    // 使用 clearInterval 来停止计时
    window.clearInterval(timer.current);
    timer.current = null;
  }, []);

  return (
    <div>
      {time / 10} seconds.
      <br />
      <button onClick={handleStart}>Start</button>
      <button onClick={handlePause}>Pause</button>
    </div>
  );
}
```



## 开发风格

一个函数组件在使用`Hooks`时应该遵循将Hooks的调用放在函数的开头部分，随后紧跟一个纯函数组件渲染逻辑

```tsx
const FunctionComponent = props => {
    // 对所有Hooks的调用，声明前置条件

    // 对props及hooks提供的内容的运算处理，数据加工

    // 将数据转变为JSX并返回
};
```



## 解决使用 useCallback 时，回调函数每次只能访问到初始值的问题

```ts
import { useCallback, useEffect, useRef } from 'react';

/**
 * 解决使用 useCallback 时，回调函数每次只能访问到初始值的问题
 * @param fn
 * @param dependencies
 * @returns
 */
const useEffectCallback = (fn: any, dependencies: Array<any>) => {
  const ref: any = useRef(null);

  useEffect(() => {
    ref.current = fn;
  }, [fn, ...dependencies]);

  return useCallback(
    (...rest) => {
      // 通过 ref.current 访问最新的回调函数
      ref.current && ref.current(...rest);
    },
    [ref],
  );
};

export default useEffectCallback;

```



## 示例

```js
const useUsers = () => {
  const [users, setUsers] = useState([])
  
  useEffect(() => {
    const loadUsers = async () => {  
      const response = await fetch('/some-api')
      const data = await response.json()
      setUsers(data)
    }

    loadUsers()
  }, [])
  
  return { users }
}

const ActiveUsersList = () => {
  const { users } = useUsers()
  
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)

  return (
    <ul>
      {users.filter(user => !user.isBanned && user.lastActivityAt >= weekAgo).map(user => 
        <li key={user.id}>
          <img src={user.avatarUrl} />
          <p>{user.fullName}</p>
          <small>{user.role}</small>
        </li>
      )}
    </ul>    
  )
}
```





## 文章

- [hooks函数是什么？怎么用？](http://www.itheima.com/news/20200727/150024.html)
- [在 React Hooks 中如何请求数据？](https://blog.csdn.net/weixin_44092113/article/details/88937437)
- [useState用法指南](https://blog.csdn.net/wu_xianqiang/article/details/105181044)
- [useState使用ts](http://www.zhaima.tech/post/usestate%E4%BD%BF%E7%94%A8typescript%E7%B1%BB%E5%9E%8B)
- [hooks全面使用](https://www.jianshu.com/p/89f2cf94a7c2)
- [对hooks的一些思考](https://zhuanlan.zhihu.com/p/48264713)