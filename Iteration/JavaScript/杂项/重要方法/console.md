### console.log/error/warn
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1683108087402-b7a25767-31f0-4ac3-bde5-005e30113507.png#averageHue=%23fcf6de&clientId=u53d06b40-aef4-4&from=paste&height=506&id=u8cad0baf&originHeight=1012&originWidth=2292&originalType=binary&ratio=2&rotation=0&showTitle=false&size=112836&status=done&style=none&taskId=u2ebb6028-56c1-41fc-af27-03f534b3969&title=&width=1146)
### 占位符

- %s 字符串
- %d 整数
- %i 整数
- %f 浮点数
- %o 对象的链接
- %c CSS 格式字符串

![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1683108156546-8b33d00d-ff80-4384-ae92-6f5e344029bc.png#averageHue=%23e9bc29&clientId=u53d06b40-aef4-4&from=paste&height=513&id=u1f58974b&originHeight=1026&originWidth=2238&originalType=binary&ratio=2&rotation=0&showTitle=false&size=88457&status=done&style=none&taskId=u89918bfd-ff3b-457a-893e-1fda03da30c&title=&width=1119)
### console.table()
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1683108380057-2b82f653-7235-4ce7-b8f1-2826f676117d.png#averageHue=%23ecc445&clientId=u53d06b40-aef4-4&from=paste&height=406&id=ueb6ef852&originHeight=812&originWidth=3350&originalType=binary&ratio=2&rotation=0&showTitle=false&size=148349&status=done&style=none&taskId=u83d4b021-c1c6-4ed7-aa27-1d73bcb31d1&title=&width=1675)
### console.count()
count方法用于计数，输出它被调用了多少次。
```javascript
function greet(user) {
  console.count();
  return 'hi ' + user;
}

greet('bob')
//  : 1
// "hi bob"

greet('alice')
//  : 2
// "hi alice"

greet('bob')
//  : 3
// "hi bob"
```
### console.dir()，console.dirxml()
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1683108452075-a5f8316d-bc44-4447-b646-8056364171d9.png#averageHue=%23fdfdfd&clientId=u53d06b40-aef4-4&from=paste&height=476&id=u32ea57bd&originHeight=952&originWidth=2858&originalType=binary&ratio=2&rotation=0&showTitle=false&size=194242&status=done&style=none&taskId=u646646ad-4b8e-4580-bd24-10fe8136076&title=&width=1429)
### console.assert()
console.assert方法主要用于程序运行过程中，进行条件判断，如果不满足条件，就显示一个错误，但不会中断程序执行。这样就相当于提示用户，内部状态不正确。
```javascript
console.assert(false, '判断条件不成立')
// Assertion failed: 判断条件不成立

// 相当于
try {
  if (!false) {
    throw new Error('判断条件不成立');
  }
} catch(e) {
  console.error(e);
}
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1683108523002-05aa781f-a1e3-4362-8f37-5b594079ab68.png#averageHue=%23eabe30&clientId=u53d06b40-aef4-4&from=paste&height=299&id=ue417aa16&originHeight=598&originWidth=2038&originalType=binary&ratio=2&rotation=0&showTitle=false&size=58853&status=done&style=none&taskId=u13cf77f9-2b13-48cd-9526-73dd9df1a4b&title=&width=1019)
### console.time()，console.timeEnd()
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1683108576634-4f9ec24b-fbbd-4ad9-98d0-c88c119648fe.png#averageHue=%23dd9e5e&clientId=u53d06b40-aef4-4&from=paste&height=388&id=u0ccfd65d&originHeight=776&originWidth=2092&originalType=binary&ratio=2&rotation=0&showTitle=false&size=85023&status=done&style=none&taskId=u4b52a312-58bc-4ca5-bb68-2b39d53d7b2&title=&width=1046)
### console.group()，console.groupEnd()，console.groupCollapsed()
console.group和console.groupEnd这两个方法用于将显示的信息分组。它只在输出大量信息时有用，分在一组的信息，可以用鼠标折叠/展开。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1683108639223-30996b93-8a01-4d8b-98c9-91a2b5837950.png#averageHue=%23fdfdfd&clientId=u53d06b40-aef4-4&from=paste&height=390&id=uda957fb1&originHeight=780&originWidth=2452&originalType=binary&ratio=2&rotation=0&showTitle=false&size=128331&status=done&style=none&taskId=uc2c66246-31e7-4ea6-a412-51d092ba26a&title=&width=1226)
### ⭐️console.trace()
console.trace方法显示当前执行的代码在堆栈中的调用路径。
```javascript
let fn1 = () => {
  console.log('fn1')
  throw '报个错'
}

let fn2 = () => {
  fn1()
  console.log('gn2')
}

let fn = () => {
  fn2()
  console.trace()
}

fn()
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1683108808821-cbfdcc5b-0fec-4e50-a876-b9cf7c76ed04.png#averageHue=%23fdfafa&clientId=u53d06b40-aef4-4&from=paste&height=477&id=u3dcf5fa9&originHeight=954&originWidth=2324&originalType=binary&ratio=2&rotation=0&showTitle=false&size=104875&status=done&style=none&taskId=u9da1c543-7d59-449b-a756-e7e94a03188&title=&width=1162)
## 资料 

- [https://wangdoc.com/javascript/features/console](https://wangdoc.com/javascript/features/console)
