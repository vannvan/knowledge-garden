# 基础使用

## 一个简单的hooks示例

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

## 文章

- [hooks函数是什么？怎么用？](http://www.itheima.com/news/20200727/150024.html)
- [在 React Hooks 中如何请求数据？](https://blog.csdn.net/weixin_44092113/article/details/88937437)
- [useState用法指南](https://blog.csdn.net/wu_xianqiang/article/details/105181044)
- [useState使用ts](http://www.zhaima.tech/post/usestate%E4%BD%BF%E7%94%A8typescript%E7%B1%BB%E5%9E%8B)
- [hooks全面使用](https://www.jianshu.com/p/89f2cf94a7c2)