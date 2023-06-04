## 有状态组件
### props
```typescript
import React, { Component } from 'react';

import Button from './Button';

const initialState = { clicksCount: 0 };
type State = Readonly<typeof initialState>;

class ButtonCounter extends Component<object, State> {
  readonly state: State = initialState;

  render() {
    const { clicksCount } = this.state;
    return (
      <>
        <Button onClick={this.handleIncrement}>Increment</Button>
        <Button onClick={this.handleDecrement}>Decrement</Button>
        You've clicked me {clicksCount} times!
      </>
    );
  }

  private handleIncrement = () => this.setState(incrementClicksCount);
  private handleDecrement = () => this.setState(decrementClicksCount);
}

const incrementClicksCount = (prevState: State) => ({
  clicksCount: prevState.clicksCount + 1,
});
const decrementClicksCount = (prevState: State) => ({
  clicksCount: prevState.clicksCount - 1,
});
```
### 防止更新state
```typescript

import * as React from 'react'

interface IProps {
  color: string,
  size?: string,
}
interface IState {
  count: number,
}
class App extends React.PureComponent<IProps, IState> {
  public readonly state: Readonly<IState> = {
    count: 1,
  }
  public render () {
    return (
      <div>Hello world</div>
    )
  }
  public componentDidMount () {
    this.state.count = 2
  }
}
export default App


```
## 无状态组件
### props
```typescript
// 大致形态，并非最佳形态
const Input = (props:{
	value: number
}) => {
	return <>
  	<input />
  </>
}
```
### SFC类型-已过时
在 React 的声明文件中 已经定义了一个 SFC 类型，使用这个类型可以避免我们重复定义 `children`、 `propTypes`、 `contextTypes`、 `defaultProps`、`displayName` 的类型。
```typescript
import { SFC } from 'react'
import { MouseEvent } from 'react'
import * as React from 'react'
interface IProps {
  onClick (event: MouseEvent<HTMLDivElement>): void,
}
const Button: SFC<IProps> = ({onClick, children}) => {
  return (
    <div onClick={onClick}>
      { children }
    </div>
  )
}
export default Button
```
SFC实现源码
```typescript
type SFC<P = {}> = StatelessComponent<P>;
interface StatelessComponent<P = {}> {
    (props: P & { children?: ReactNode }, context?: any): ReactElement<any> | null;
    propTypes?: ValidationMap<P>;
    contextTypes?: ValidationMap<any>;
    defaultProps?: Partial<P>;
    displayName?: string;
}
```
### 更提倡的方式
```typescript
export interface ButtonProps{
    label:string;
    children: React.ReactNode
}

const Button = (props: ButtonProps) => {
  const {children} = props
  return <div>{children}</div>
}
```
## 事件处理
### Event事件对象类型
常用 Event 事件对象类型：

- ClipboardEvent<T = Element> 剪贴板事件对象
- DragEvent<T = Element> 拖拽事件对象
- ChangeEvent<T = Element>  Change 事件对象
- KeyboardEvent<T = Element> 键盘事件对象
- **MouseEvent<T = Element> 鼠标事件对象**
- TouchEvent<T = Element>  触摸事件对象
- WheelEvent<T = Element> 滚轮事件对象
- AnimationEvent<T = Element> 动画事件对象
- TransitionEvent<T = Element> 过渡事件对象
#### 示例
```typescript
// 此示例可采用上面SFC进行更好的处理
import React, { MouseEvent, ReactNode } from 'react'
type Props = { 
 onClick(e: MouseEvent<HTMLElement>): void
 children?: ReactNode 
}

const Button = ({ onClick: handleClick, children }: Props) => (
  <button onClick={handleClick}>{children}</button>
)
```
### 事件处理函数类型
```typescript
type EventHandler<E extends SyntheticEvent<any>> = { bivarianceHack(event: E): void }["bivarianceHack"];
type ReactEventHandler<T = Element> = EventHandler<SyntheticEvent<T>>;
type ClipboardEventHandler<T = Element> = EventHandler<ClipboardEvent<T>>;
type DragEventHandler<T = Element> = EventHandler<DragEvent<T>>;
type FocusEventHandler<T = Element> = EventHandler<FocusEvent<T>>;
type FormEventHandler<T = Element> = EventHandler<FormEvent<T>>;
type ChangeEventHandler<T = Element> = EventHandler<ChangeEvent<T>>;
type KeyboardEventHandler<T = Element> = EventHandler<KeyboardEvent<T>>;
type MouseEventHandler<T = Element> = EventHandler<MouseEvent<T>>;
type TouchEventHandler<T = Element> = EventHandler<TouchEvent<T>>;
type PointerEventHandler<T = Element> = EventHandler<PointerEvent<T>>;
type UIEventHandler<T = Element> = EventHandler<UIEvent<T>>;
type WheelEventHandler<T = Element> = EventHandler<WheelEvent<T>>;
type AnimationEventHandler<T = Element> = EventHandler<AnimationEvent<T>>;
type TransitionEventHandler<T = Element> = EventHandler<TransitionEvent<T>>;
```
#### 示例
```typescript
// 仅做示例，不是最佳实践
interface IButton {
  text: string
  onClick: React.MouseEventHandler<HTMLButtonElement>
}
const Button = (props: IButton) => {
  return <button>{props.text}</button>
}

function App() {
  return (
    <>
      <Button
        text={''}
        onClick={() => {
          //
        }}
      />
    </>
  )
}
```
## Promise
`Promise<T>` 是一个泛型类型，`T` 泛型变量用于确定使用 `then` 方法时接收的第一个回调函数（`onfulfilled`）的参数类型。
### 示例
```typescript

interface IResponse<T> {
  message: string,
  result: T,
  success: boolean,
}
async function getResponse (): Promise<IResponse<number[]>> {
  return {
    message: '获取成功',
    result: [1, 2, 3],
    success: true,
  }
}
getResponse()
  .then(response => {
    console.log(response.result)
  })
```
## 开启项目TS支持
```json
{
  "compilerOptions": {
    "target": "ESNext",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}

```
## 资料

- [TypeScript 在 React 中使用总结 - 掘金](https://juejin.cn/post/6844903684422254606#heading-5)
- [TypeScript 2.8下的终极React组件模式 - 掘金](https://juejin.cn/post/6844903612787720206#heading-2)
