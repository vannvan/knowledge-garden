### 所有的 interface 起始为 I,而 types 起始为 T

```tsx
interface IProps extends DefaultProps {
  appNoticeModel: AppNoticeProps,
  officeTree: any[],
}

interface IState {
  id?: number | null,
  uploading?: boolean,
  excludeControls?:BuiltInControlType[]
}

type  TField  =  /* ... */
```

### interface声明顺序

日常用到比较多的是四种，只读参数放第一位，必选参数第二位，可选参数次之，不确定参数放最后

```tsx
interface iProps {
  readonly x: number;
  readonly y: number;
  name: string;
  age: number;
  height?: number;
  [propName: string]: any;
}
```

### class 或 组件的 interface 应该包含它的名字

```tsx

interface  IApiService  {

  getUser():  IUser;

}

class  ApiService  implements  IApiService  {

  /* ... */

}
```

### 在 class 中总是使用 private public protected 明确

```tsx
class  Api  {

  public  getUser  =  ()  =>  {

  const token =  this.getToken();

  /* ... */

  };

  private  getToken  =  ()  =>  {

  /* ... */

  };

}
```

### 引用组件顺序

第三方组件库 ==> 公共组件 ==> 业务组件 ==>utils ==> map ==> css 样式

```tsx
//react
import * as React from "react"
import { SFC } from "react"
//dva
import { connect } from "dva"
import { Link } from 'dva/router';
//antd
import { Table,Dropdown, Menu,Button, Icon,Modal } from 'antd';
import { ColumnProps } from "antd/lib/table/interface"
//公共组件
import { DefaultProps } from "@/interface/global"
import { IMList } from "@/interface/Operations/AppImMenu/list"
import { Pagination } from "@/interface/BrokersBusiness/BuildingManage/buildingList"
import { appImModelAction } from "./model"
//util
import { parseQuery, } from '@/utils/utils';
//map
import { androidType, iosType } from "../common/maps"
//less
import styles from "./AppImMenuList.less"
```

### 渲染默认值

 ```tsx
 // bad
 render(){
   {name}
 }
 
 // good
 render(){
   {!!name || '--'}
 }
 
 /*=================================*/
 // bad
 this.setState({
   status: STATUS.READY,
   apps: list,
   total: totalCount,
   page: page,
 });
 
 
 // good 
 const { list, totalCount } = await getPeopleList(keyword, page, pageSize);
 this.setState({
   status: STATUS.READY,
   apps: list || [],
   total: totalCount || 0,
   page: page,
 });
 
 ```

### 数据格式转换

- 把字符串转整型可以使用+号

```tsx
let maxPrice = +form.maxPrice.value;
let maxPrice = Number(form.maxPrice.value);
```

- 转成 boolean 值用!!

```tsx
let mobile = !!ua.match(/iPhone|iPad|Android|iPod|Windows Phone/);
```

### 使用location跳转前需要先转义

```tsx
// bad
window.location.href = redirectUrl + '?a=10&b=20';

// good
window.location.href = redirectUrl + encodeURIComponent('?a=10&b=20');
```

### 业务代码中的异步请求需要try catch

```tsx
getStudentList = async () => {
  try {
    this.setState({
      loading: true,
      isEmpty: false
    });
    await getStudentList({});
    this.setState({
      loading: false,
      isEmpty: true
    });
  } catch (e) {
    // TODO
    console.log(e)
  } finally {
    //  失败之后的一些兜底操作
    this.setState({
      loading: false,
      isEmpty: true
    });
  }
};
```

### setState使用

- 使用setState 函数的写法

```tsx
//bad
this.setState({
  a:300
})

//good
this.setState(
  (state,props) => {
    return {
      a:300
    }
  }
)
```

原因

```tsx
//对象式
//state.count = 1
function incrementMultiple() {
  this.setState({count: this.state.count + 1});
  this.setState({count: this.state.count + 1});
  this.setState({count: this.state.count + 1});
}
//console.log(this.state.count) //2
```

```tsx
//函数式
function increment(state, props) {
  return {count: state.count + 1};
}
function incrementMultiple() {
  this.setState(increment);
  this.setState(increment);
  this.setState(increment);
}
//console.log(this.state.count) //4
```

setState将要修改的值加入队列进行批量处理

```tsx
function incrementMultiple() {
  this.setState({count: this.state.count + 1});
  this.setState({count: this.state.count + 1});
  this.setState({count: this.state.count + 1});
}

//等同于
function incrementMultiple() {
	const count = this.state.count
  this.setState({count: count + 1});
  this.setState({count: count + 1});
  this.setState({count: count + 1});
}
```

而函数式setState每次调用内部会获取上一次修改的值再批量更新

### 判断

- 使用定义好的常量代替type值的判断

 ```tsx
 // bad
 if (type !== 0) {
   // TODO
 }
 
 // good
 const STATUS: Record<string, any> = {
   READY: 0,
   FETCHING: 1,
   FAILED: 2
 };
 
 if (type === STATUS.READY) {
   // TODO
 }
 
 // best
 enum STATUS {
   // 就绪
   READY = 0,
   // 请求中
   FETCHING = 1,
   // 请求失败
   FAILED = 2,
 }
 ```

- 减少多个boolean值变量的联合判断?

```tsx
if((type1 == 0 || type1 == 1) && type2 !== 0){
	pass
}
```

### 代码过滤掉你没考虑到的情况

- 例如一个函数，你只想操作字符串，那你必须在函数开头就只允许参数是字符串

```tsx
function parse (str:string){
  if (typeof(str) === 'string' ) {

  }
}
```

### 代码粒度

- 超过两次使用的代码用函数分离

```tsx
//判断是编辑/新增
isEdit = () => {
	return !!parseQuery(location.search).id || parseQuery(location.search).id == 0
}

//提交表单
formSaveParams = (fieldsValue: FieldsValue) => {
  let formFieldsValue:FieldsValue & {edit?:boolean} = {...fieldsValue}
  if(this.isEdit()){
    formFieldsValue = {
      ...formFieldsValue,
      id:this.state.id,
      edit:true
    }
  }
  return formFieldsValue
}

render(){
  return (
    <PageHeaderWrapper title={`${this.isEdit() ? '编辑' : '添加'}IM配置`} content="请按照页面要求填写数据">
      pass
    </PageHeaderWrapper>
  )
}
```

- 工具函数和业务逻辑抽离，表单校验和业务抽离、事件函数和业务抽离，ajax和业务抽离。

```tsx
componentDidMount(){
  this.getList()
}		

/*获取列表 */
getList = () => {
  const { form } = this.props
  const type = form.getFieldValue('type')
  const page = {
    currentPage: 1,
    pageRows: 10,
  }
  const formData = {
    type,
  }
  this.upDate(page, formData)

}

//ajax
upDate = (page, formData?) => {
  const { dispatch } = this.props
  dispatch(appNoticeModelAction('fetchList')(payload));
}
```

### if else优化

- [[浅析] 特定场景下代替优化 if-else 的方案](https://juejin.cn/post/6846687590867795981)

- [如何无痛降低 if else 面条代码复杂度](https://juejin.cn/post/6844903502611759117#heading-5v)

```tsx
例如你的业务代码里面，会根据不同url参数，代码会执行不同的逻辑.
/info?type=wechat&uid=123456&
const qsObj = qs(window.location.url)
const urlType = qsObj.type
// bad 
if (urlType === 'wechat') {
    doSomeThing()
} else if () {
    doSomeThing()
} else if () {
    doSomeThing()
} else if () {
    doSomeThing()
}

// good 
config.t
const urlTypeConfig: Record<string, typeItem> = {
  'wechat': { // key 就是对应的type
    name: 'wechat', 
    show: ['header', 'footer', 'wechat'] // 展示什么，可能是异步的
    pession: ['admin'], // 权限是什么，可能是异步的
  },
  'zhifubao': { // key 就是对应的type
    name: 'zhifubao', 
    show: ['header', 'footer', 'zhifubao'] // 展示什么，可能是异步的
    pession: ['admin'], // 权限是什么，可能是异步的
  },
}

// 业务逻辑
const qsObj = qs(window.location.url)
const urlType = qsObj.type
urlTypeConfig.forEach(item => {
  if(urlType === item.type) {
    doSomeThing(item.show)
  }
})
```

### flux

- dva设计遵循flux模型，view层只提交dispatch，model层负责action与store管理。因此数据操作应当尽量放在model层处理。

```tsx
/*提交表单*/
//page.tsx
  handleSubmit = () => {
    const { id } = this.state
    const { form, dispatch } = this.props;
    form.validateFields((err, fieldsValue: FieldsValue) => {
      if (err) return
      dispatch(appAdvModelAction('submitAdvForm')({...fieldsValue,id,}))
    })
  }
  
 //model.ts
  ...
  	effects:{
      *submitAdvForm({ payload }, { call, put }) {
            yield put({
                type: 'changeState',
                payload: {editLoading:true},
            });
            let processedPayload:FieldsValue = {
                ...(payload as FieldsValue),
                params: payload.params.map(key => payload.paramsSave[key]),
                imageUrl: payload.imageUrl[0].saveUrl,
                smallImageUrl: payload.smallImageUrl[0].saveUrl,
                platform: payload.platform.join(","),
            }
            if(!processedPayload.id && processedPayload.id !==0) delete processedPayload.id
            const res = yield call(adConfigSave, processedPayload);
            if(res.code == 200){
                message.success("保存成功")
                yield put(routerRedux.push(routerConfig('AppAdvMenuList')));  

            }else{
                message.error('保存失败,' + res.msg);
            }
            yield put({
                type: 'changeState',
                payload: {editLoading:false},
            });
        },
    }
```

```tsx
/*获取详情*/
//page.tsx
...
render(){
  return (
    <Form>
      {/*默认值直接获取，不在页面中进行任何处理*/}
    	<Platform initValue={detail.platform} allowClear={true}/>
      <Params initValue={detail.params}  />
      <SmallImageUrl initValue={detail.smallImageUrl} />
    </Form>
  )
}

//models.ts
...
reducers:{
  saveDetail(state,{ payload }){
    let processedPayload:Detail = {
      ...(payload as Omit<FieldsValue,"id">),
      platform:payload.platform.split(",").map(k=>+k),
      jumpRoute:(payload.jumpRouteKey && payload.jumpRouteId) ? payload.jumpRouteKey + "&&" + payload.jumpRouteId : "",
      imageUrl:payload.imageUrl && defaultImg(payload.imageUrl),
      smallImageUrl:payload.smallImageUrl && defaultImg(payload.smallImageUrl)
    }
    return {
      ...state,
      detail:processedPayload
    }
  }
}
```

数据与视图完全分离增加页面的复用性，不需要对每个接口返回的不同数据做不同的处理。同样model层数据使用纯js代码处理，降低与视图耦合，方便测试。也方便迁移，如后续使用node中间层做前端与服务端的完全解耦

### ts一些好用的小tips

- keyof

```tsx
interface iPeople {
  name: string;
  age: number
}

type T = keyof iPeople // -> "name" | "age"
```

- in

```tsx
type Keys = "a" | "b"
type Obj =  {
  [p in Keys]: any
} // -> { a: any, b: any }
```

### 不要相信后端返回的数据

```tsx
// bad
const data = await getPeopleList(keyword, page, pageSize);
data.dataList.forEach() // 直接挂了

// good
const data = await getPeopleList(keyword, page, pageSize);
if (data && data.dataList && Array.isArray(data.dataList) {
    data.dataList.forEach() 
}
```

### 对于常用的属性进行缓存

```tsx
// bad
this.props.app.openid;
this.state.time

// good
const { app } = this.props;
const { time } = this.state;
console.log(app.openid)
```





## 文章

- [React+Antd+TypeScript 开发规范](https://blog.csdn.net/caoyan0829/article/details/101022271)
- [可能是你需要的 React + TypeScript 50 条规范和经验](https://juejin.cn/post/6844903849166110728#heading-16)
- 
