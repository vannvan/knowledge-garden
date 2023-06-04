## Navigator
### userAgent 
用户设备信息，如下形式
```javascript
"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.57 Safari/537.36"
```
```javascript
var ua = navigator.userAgent.toLowerCase();

if (/mobi/.test(ua)) {
  // 手机浏览器
} else {
  // 非手机浏览器
}
```
### ⭐️onLine
表示用户当前在线还是离线（浏览器断线)
应用实例，一个hook，这里用的是`addEventListener`
```javascript
const useNetwork = () => {
  const [isOnline, setNetwork] = useState(window.navigator.onLine);

  const updateNetwork = () => {
    setNetwork(window.navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener('offline', updateNetwork);

    window.addEventListener('online', updateNetwork);

    return () => {
      window.removeEventListener('offline', updateNetwork);

      window.removeEventListener('online', updateNetwork);
    };
  });

  return isOnline;
};
export default useNetwork;
```
### deviceMemory
返回当前计算机的内存数量（单位为 GB）。该属性只读，只在 HTTPS 环境下可用。
它的返回值是一个近似值，四舍五入到最接近的2的幂，通常是 0.25、0.5、1、2、4、8。实际内存超过 8GB，也返回8。
### ⭐️hardwareConcurrency
返回用户计算机上可用的逻辑处理器的数量。该属性只读。
```javascript
let workerList = [];

for (let i = 0; i < window.navigator.hardwareConcurrency; i++) {
  let newWorker = {
    worker: new Worker('cpuworker.js'),
    inUse: false
  };
  workerList.push(newWorker);
}
```
上面示例中，有多少个可用的逻辑处理器，就创建多少个 Web Worker。
### connection
返回一个对象，包含当前网络连接的相关信息。

- downlink：有效带宽估计值（单位：兆比特/秒，Mbps），四舍五入到每秒 25KB 的最接近倍数。
- downlinkMax：当前连接的最大下行链路速度（单位：兆比特每秒，Mbps）。
- effectiveType：返回连接的等效类型，可能的值为slow-2g、2g、3g、4g。
- rtt：当前连接的估计有效往返时间，四舍五入到最接近的25毫秒的倍数。
- saveData：用户是否设置了浏览器的减少数据使用量选项（比如不加载图片），返回true或者false。
- type：当前连接的介质类型，可能的值为bluetooth、cellular、ethernet、none、wifi、wimax、other、unknown。
## Screen
该对象有下面的属性。

- Screen.height：浏览器窗口所在的**屏幕的高度**（单位像素）。除非调整显示器的分辨率，否则这个值可以看作常量，不会发生变化。显示器的分辨率与浏览器设置无关，**缩放网页并不会改变分辨率**。
- Screen.width：浏览器窗口所在的**屏幕的宽度**（单位像素）。
- Screen.availHeight：浏览器窗口**可用的屏幕高度**（单位像素）。因为部分空间可能不可用，比如系统的任务栏或者 Mac 系统屏幕底部的 Dock 区，**这个属性等于height减去那些被系统组件的高度**。
- Screen.availWidth：浏览器窗口**可用的屏幕宽度**（单位像素）。
- Screen.pixelDepth：整数，表示屏幕的色彩位数，比如24表示屏幕提供24位色彩。
- Screen.colorDepth：Screen.pixelDepth的别名。严格地说，colorDepth 表示应用程序的颜色深度，pixelDepth 表示屏幕的颜色深度，绝大多数情况下，它们都是同一件事。
- Screen.orientation：返回一个对象，表示屏幕的方向。该对象的type属性是一个字符串，表示屏幕的具体方向，landscape-primary表示横放，landscape-secondary表示颠倒的横放，portrait-primary表示竖放，portrait-secondary表示颠倒的竖放。
### 扩展
#### 页面滚动位置

- docuemnt.documentElement.scrollTop/scrollLeft  
- window.pageYOffset/pageXOffset
- window.scrollY和scrollX
#### 屏幕尺寸
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1683104304327-dd15a6a8-7ee4-4665-9f27-37b2826c27fc.png#averageHue=%23efeeed&clientId=u6885f184-cc3b-4&from=paste&height=803&id=u8e4aa533&originHeight=1606&originWidth=2794&originalType=binary&ratio=2&rotation=0&showTitle=false&size=198077&status=done&style=none&taskId=uaefe883e-2939-4997-a547-08127dabde1&title=&width=1397)
可用尺寸
对于高度而言，不论窗口实际是否全屏，它的值是屏幕尺寸减去菜单栏/dock栏
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1683104363711-58cd6236-6c80-487f-a2df-d21f1fc7dfb3.png#averageHue=%23adacac&clientId=u6885f184-cc3b-4&from=paste&height=969&id=ua97e9549&originHeight=1938&originWidth=3358&originalType=binary&ratio=2&rotation=0&showTitle=false&size=398757&status=done&style=none&taskId=u35a9bd4c-581a-40f6-976f-b3593612891&title=&width=1679)
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1683104524894-84188712-7212-4b8f-9882-0aa1c7dbc279.png#averageHue=%23f2f2f2&clientId=u6885f184-cc3b-4&from=paste&height=968&id=uc81a1a55&originHeight=1936&originWidth=3360&originalType=binary&ratio=2&rotation=0&showTitle=false&size=173111&status=done&style=none&taskId=u4fdb4309-b456-46d2-bfea-79d86f5e327&title=&width=1680)
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1683104487694-9f2f6f2c-ead5-4219-97a8-dd40cbe601c6.png#averageHue=%23f2f2f2&clientId=u6885f184-cc3b-4&from=paste&height=1025&id=uac416a11&originHeight=2050&originWidth=3360&originalType=binary&ratio=2&rotation=0&showTitle=false&size=196357&status=done&style=none&taskId=ud9b215e4-8424-44e3-aa42-05428a886ed&title=&width=1680)
#### view视口宽高尺寸

- innerWidth,innerHeight 不包含工具栏
- outerWidth,outerHeight  包含工具栏

![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1683103961338-efc6fa4b-c06a-418d-8089-98ac788e72b8.png#averageHue=%23ededec&clientId=u6885f184-cc3b-4&from=paste&height=968&id=u2209a7cc&originHeight=1936&originWidth=3360&originalType=binary&ratio=2&rotation=0&showTitle=false&size=234304&status=done&style=none&taskId=ub19acd38-4155-4904-b1cf-2c1640a2c76&title=&width=1680)
#### view视口距离显示器位置

- window.screenX/screenY (标配)
- window.screenLeft/screenTop (兼容IE)

全屏时/左上角和在屏幕左上角时
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1683103738364-952bfc14-43b2-4ad0-b358-b8a636450ec7.png#averageHue=%23f2f2f1&clientId=u6885f184-cc3b-4&from=paste&height=968&id=uea586a16&originHeight=1936&originWidth=3360&originalType=binary&ratio=2&rotation=0&showTitle=false&size=199158&status=done&style=none&taskId=u9a4f3853-a07a-493e-8701-f8a6d8dccee&title=&width=1680)
非全屏处于屏幕的某个位置
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1683103807843-72b2d17d-4100-4f27-9c11-d2bae30be85b.png#averageHue=%238b8b8a&clientId=u6885f184-cc3b-4&from=paste&height=962&id=u74713396&originHeight=1924&originWidth=3358&originalType=binary&ratio=2&rotation=0&showTitle=false&size=330578&status=done&style=none&taskId=ucfeef899-49e1-48fd-9d79-97c6f68f6e4&title=&width=1679)
## 资料

- [https://wangdoc.com/javascript/bom/navigator](https://wangdoc.com/javascript/bom/navigator)
- [https://blog.csdn.net/qq_46275230/article/details/124654350](https://blog.csdn.net/qq_46275230/article/details/124654350)
