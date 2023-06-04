## HTTP发展过程
1.  HTTP/0.9：这是最早的版本，它只支持一种请求方法（GET）和一种响应格式（ASCII码）； 
2.  HTTP/1.0：这个版本引入了新的请求方法（例如POST、PUT、DELETE等），支持响应头信息等功能； 
3.  HTTP/1.1：这个版本是最广泛使用的版本，支持持久连接、管道连接、分块编码等功能，还支持虚拟主机、缓存等特性，大大提高了HTTP的效率； 
4.  HTTP/2：这个版本采用了二进制协议进行传输，支持多路复用、头部压缩等功能，提高了传输速度和安全性； 
5.  HTTP/3：这个版本是最新的版本，采用了QUIC协议和UDP协议进行数据传输，可以在网络中更加灵活地传输数据，提高了网络传输的效率和安全性。 
## 关于缓存
### 缓存的作用
对于客户端来说缓存能加快也面的打开速度，对于服务端来说能减轻服务器压力，所以 HTTP 设计了缓存机制。
### 发展过程

- HTTP 1.0 的时候是使用 `Expires` 的 `header` 来控制的，指定一个 GMT 的过期时间，但是当浏览器时间不准的时候就有问题了。
- HTTP 1.1 的时候改为了 `max-age` 的方式来设置过期时间，让浏览器自己计算。并且把所有的缓存相关的控制都放到了 `Cache-control`的 `header` 里，像 `max-age` 等叫做指令。`Cache-Control`提供了更细粒度的缓存控制，例如可以指定缓存的最大时长、禁用缓存等
- 缓存过期后，HTTP 1.1 还设计了个协商阶段，会分别通过 `If-None-Match` 和 `If-Modified-Since`的 `header` 带资源的 `Etag` 和 `Last-Modied` 到服务端问下是否过期了，过期了的话就返回 200 带上新的内容，否则返回 304，让浏览器拿缓存。
### 有关 HTTP 缓存的首部字段
常见的HTTP 缓存首部字段有：

- Expires：响应头，代表该资源的过期时间
- Cache-Control：请求/响应头，缓存控制字段，精确控制缓存策略
- If-Modified-Since：请求头，资源最近修改时间，由浏览器告诉服务器
- Last-Modified：响应头，资源最近修改时间，由服务器告诉浏览器
- Etag：响应头，资源标识，由服务器告诉浏览器
- If-None-Match：请求头，缓存资源标识，由浏览器告诉服务器

其中， **强缓存** ：

- Expires（HTTP/1.0）
- Cache-Control（HTTP/1.1）

**协商缓存：**

- Last-Modified 和 If-Modified-Since（HTTP/1.0）
- ETag 和 If-None-Match（HTTP/1.1）
### 强缓存与协商缓存
**强缓存：** 向浏览器缓存查找该请求结果，并根据该结果的缓存规则来决定是否使用该缓存结果的过程
**协商缓存：** 强缓存失效后，浏览器携带缓存标识向服务器发起请求，由服务器根据缓存标识决定是否使用缓存的过程
如果浏览器命中强缓存，则不需要给服务器发请求；而协商缓存最终由服务器来决定是否使用缓存，即客户端与服务器之间存在一次通信。
在 chrome 中强缓存（虽然没有发出真实的 http 请求）的请求状态码返回是 200 (from cache)；而协商缓存如果命中走缓存的话，请求的状态码是 304 (not modified)。 不同浏览器的策略不同，在 Fire Fox中，from cache 状态码是 304.
### 强缓存和协商缓存的命中原理
强缓存的命中原理是在浏览器发起请求时，服务器通过响应头中的 `Cache-Control` 或 `Expires` 字段来告知浏览器该资源是否可以缓存以及该资源的有效期。如果资源已经被缓存并且未过期，浏览器就直接从本地缓存中读取该文件，不会再向服务器发起请求。这就是强缓存的命中。 
协商缓存的命中原理是浏览器会携带上一次请求该资源时获得的响应头中的 `ETag` 或 `Last-Modified` 字段，向服务器发送一个 `If-None-Match` 或 `If-Modified-Since` 的请求头，询问服务器该资源是否有更新。如果服务器响应返回 `304 Not Modified` 状态码，则表明该资源没有更新，浏览器直接从本地缓存中读取该文件，否则服务器会将新内容发送给浏览器，浏览器重新缓存该资源。这就是协商缓存的命中。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1684916994898-5db1b660-14e8-4c14-8a3d-f7175e172cad.png#averageHue=%23f5f4f4&clientId=u0ee26bc5-29b6-4&from=paste&height=569&id=u950da3e1&originHeight=1138&originWidth=1294&originalType=binary&ratio=2&rotation=0&showTitle=false&size=187371&status=done&style=none&taskId=ue73b1b14-c827-4879-bef6-f7243cfdcc9&title=&width=647)
### 各种操作应对缓存的表现
| **用户操作** | **Expires/Cache-Control** | **Last-Modied/Etag** |
| --- | --- | --- |
| 地址栏回车 | 有效 | 有效 |
| 页面链接跳转 | 有效 | 有效 |
| 新开窗口 | 有效 | 有效 |
| 前进回退 | 有效 | 有效 |
| F5刷新 | 无效(有争议，不同浏览器反馈不一致) | 有效 |
| Ctrl+F5强制刷新 | 无效 | 无效 |

### 如何设置强缓存和协商缓存
后端服务器
```javascript
res.setHeader('max-age': '3600 public')
res.setHeader(etag: '5c20abbd-e2e8')
res.setHeader('last-modified': Mon, 24 Dec 2018 09:49:49 GMT)
```
nginx
一般来说，通过 nginx 静态资源服务器，会默认给资源带上强缓存、协商缓存的 header 字段。
```javascript
add_header Cache-Control "max-age=3600"
```
### 三级缓存原理（大白话）

1. 先去内存看，如果有，直接加载
2. 如果内存没有，择取硬盘获取，如果有直接加载
3. 如果硬盘也没有，那么就进行网络请求
4. 加载到的资源缓存到硬盘和内存
## 涉及区别的问题
### HTTP和HTTPS的区别
HTTPS = HTTP + SSL

1. https需要ca证书，http一般 没有
2. http信息是明文传输，https是ssl加密传输
3. http默认80端口，https是443
### GET和POST的区别

1. get产生一个TCP数据包；post产生两个TCP数据包
2. get会将http header和data一并发送出去，服务器响应；而post先发送header，服务器响应100 continue，再发送data，服务器响应200
3. get的请求参数在url中；post是在请求体中
4. get传参有长度限制；post无限制(相对无限制，不是绝对)
5. get请求能被浏览器缓存；post不能
6. get请求的参数会保存在浏览器中，而post不会
### TCP和UDP的区别

1. TCP是基于连接的协议，在正式发送数据之前，必须和对方建立可靠的连接，一个TCP连接必须经过三次握手才能建立起来
2. UDP是面向非连接的协议，它不与对方建立连接，而是直接就把数据包发送过去。UDP只适用于一次只传送少量数据，对可靠性要求不高的应用环境
## 涉及版本的问题
### HTTP/1的特点

1. 请求响应模式：每次HTTP请求都需要重新建立连接，获取响应后立即关闭连接；
2. 没有压缩机制：传递文本信息是基本单位，传输效率低下；
3. 没有缓存处理：每个请求都要经过服务器，重复的请求不能在本地进行处理；
4. 无状态协议：每个请求互相独立，遇到特殊情况需要通过Cookie等机制解决；
### 为什么 HTTP1.1 不能实现多路复用
HTTP/1.1 不是二进制传输，而是通过文本进行传输。由于没有流的概念，在使用并行传输（多路复用）传递数据时，接收端在接收到响应后，并不能区分多个响应分别对应的请求，所以无法将多个响应的结果重新进行组装，也就实现不了多路复用。
### HTTP/2的特点

1. 多路复用：在一个连接上可以运行多个请求和响应，重用已经存在的连接，减少建立连接次数； 
2. 头部压缩：减少请求时头部信息的大小，提高传输效率； 
3. 服务端推送：服务端可以主动向客户端推送数据，充分利用带宽； 
4. 二进制传输：在HTTP传输过程中，数据以二进制编码形式传输，提高传输速度。
### HTTP/2还会队头阻塞吗？

- 由于 TCP 连接减少而使网络拥塞状况得以改观；
- 慢启动时间减少，拥塞和丢包恢复速度更快。

但HTTP/2 也存在队头阻塞问题，比如丢包。
如果造成队头阻塞，问题可能比http1.1还严重，因为只有一个tcp连接，后续的传输都要等前面，http/1.1 多个tcp连接，阻塞一个，其他的还可以正常跑。
### HTTP/3的特点

1. 使用**QUIC**协议：HTTP3.0使用QUIC作为传输层协议，优化传输效率；
2. 使用**TLS1.3**：加强安全性，减少握手次数，减少延时；
3. 多路复用：同HTTP2.0；
4. 集成数据流量控制：根据不同的流量和网络状况进行动态调整，优化性能
### HTTPS是什么
HTTPS 就是在 TCP 和 HTTP 之间加了一个 SSL 或者叫 TLS 层，实现了加密、身份认证、防篡改的功能。
为了增加随机性，每次都要生成密钥来做加解密，传输这个密钥需要用到**非对称加密的公私钥机制。**
公钥加密的内容只有私钥能解开，防止被窃取。
私钥只有一个人有，所以加密的内容可以用作身份认证，也就是签名。
对内容做 hash，然后私钥签名，就能做到完整性校验，防止被篡改。
但是如何保证拿到的公钥一定是对方的，这是个复杂的问题。
现在的方案是系统内置了一些 CA 的根证书，然后这些 CA 证书颁发了一些网站的证书，如果访问网站拿到的证书是这些 CA 机构颁发的，那就是受信任的。
不过现实中一般都是三级的证书信任链，增加安全性。
CA根证书->中级证书->某网站的证书
## 握手和挥手
### 三次握手
3次握手是一种TCP连接的三个步骤，用于确保客户端和服务器之间建立稳定的连接。它包括以下步骤：

1.  第一次握手：客户端向服务器发送一个带有`SYN`标志的数据包，表明客户端请求连接。 
2.  第二次握手：服务器收到客户端的请求后，向客户端发送一个带有`SYN/ACK`标志的数据包，表明服务器接受了客户端的请求，并准备好建立连接。 
3.  第三次握手：客户端收到服务器的响应后，向服务器发送一个带有`ACK`标志的数据包，表明客户端已接受服务器的响应，并准备好建立连接。 

这种3个步骤的过程可以有效避免未经授权的连接请求，同时确保了通信的可靠性。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1683200521466-d7406328-cf00-49ae-83b2-8d6194d997e9.png#averageHue=%23e2e2e2&clientId=ue0ca9b2c-1af8-4&from=paste&height=264&id=u984937ae&originHeight=527&originWidth=1115&originalType=binary&ratio=2&rotation=0&showTitle=false&size=43355&status=done&style=none&taskId=u99218e1c-5b7d-417e-8d2c-05eb22dbb4e&title=&width=557.5)
### 为什么TCP客户端最后还要发送一次确认呢？
一句话，**主要防止已经失效的连接请求报文突然又传送到了服务器，从而产生错误。**

如果使用的是两次握手建立连接，假设有这样一种场景，客户端发送了第一个请求连接并且没有丢失，只是因为在网络结点中滞留的时间太长了，由于TCP的客户端迟迟没有收到确认报文，以为服务器没有收到，此时重新向服务器发送这条报文，此后客户端和服务器经过两次握手完成连接，传输数据，然后关闭连接。此时此前滞留的那一次请求连接，网络通畅了到达了服务器，这个报文本该是失效的，但是，两次握手的机制将会让客户端和服务器再次建立连接，这将导致不必要的错误和资源的浪费。

如果采用的是三次握手，就算是那一次失效的报文传送过来了，服务端接受到了那条失效报文并且回复了确认报文，但是客户端不会再次发出确认。由于服务器收不到确认，就知道客户端并没有请求连接。
### 三次握手过程中可以携带数据么？
第三次握手的时候，可以携带。前两次握手不能携带数据。

如果前两次握手能够携带数据，那么一旦有人想攻击服务器，那么他只需要在第一次握手中的 SYN 报文中放大量数据，那么服务器势必会消耗更多的时间和内存空间去处理这些数据，增大了服务器被攻击的风险。

第三次握手的时候，客户端已经处于ESTABLISHED状态，并且已经能够确认服务器的接收、发送能力正常，这个时候相对安全了，可以携带数据。
### 如果已经建立了连接，但是客户端突然出现故障了怎么办？
TCP还设有一个保活计时器，显然，客户端如果出现故障，服务器不能一直等下去，白白浪费资源。服务器每收到一次客户端的请求后都会重新复位这个计时器，时间通常是设置为2小时，若两小时还没有收到客户端的任何数据，服务器就会发送一个探测报文段，以后每隔75秒发送一次。若一连发送10个探测报文仍然没反应，服务器就认为客户端出了故障，接着就关闭连接。
### 四次挥手
 HTTP的4次挥手，是指在HTTP连接关闭时，发送方和接收方通过四次交换的数据包，正式确认双方的数据传输已经结束。此过程中，双方将立即停止发送数据，但仍保持接收数据的能力。 
具体而言

1. TCP连接关闭的时候，发送方先发出`FIN`报文，表示自己已经没有数据发送。
2. 接收方收到`FIN`报文后，会回复一个`ACK`报文，表示接收到`FIN`报文并准备好关闭连接。
3. 然后接收方再发出自己的`FIN`报文，表示自己也没有更多的数据发送。
4. 发送方收到后，再回复一个`ACK`报文确认，表示双方数据传输已经完毕。 

在实际应用中，四次挥手的过程是由TCP协议自动完成的，HTTP只是在应用层进行数据传输。理解四次挥手，对于网络通信的优化和故障排除都有很大的帮助。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1683200537244-8fc36b4b-c628-4b7a-8bef-0b846f3031b4.png#averageHue=%23dfdfdf&clientId=ue0ca9b2c-1af8-4&from=paste&height=342&id=ubc36a731&originHeight=684&originWidth=1066&originalType=binary&ratio=2&rotation=0&showTitle=false&size=60760&status=done&style=none&taskId=u0cc994b9-7f06-4d38-a743-ba6f4fd8b1a&title=&width=533)
### 为什么建立连接是三次握手，关闭连接确是四次挥手呢？
建立连接的时候， 服务器在LISTEN状态下，收到建立连接请求的SYN报文后，把ACK和SYN放在一个报文里发送给客户端。
而关闭连接时，服务器收到对方的FIN报文时，仅仅表示对方不再发送数据了但是还能接收数据，而自己也未必全部数据都发送给对方了，所以己方可以立即关闭，也可以发送一些数据给对方后，再发送FIN报文给对方来表示同意现在关闭连接，因此，己方ACK和FIN一般都会分开发送，从而导致多了一次。
### SSL的四次握手

1. 客户端请求SSL连接
2. 服务端发送包含共钥的证书
3. 客户端使用共钥加密对称密钥并发送给服务端
4. 服务端使用私钥解密对称密钥
## 泛HTTP知识
### 完整的HTTP事务流程

1. 域名解析
2. 发起TCP的3次握手
3. 建立TCP连接后发起HTTP请求
4. 服务器响应HTTP请求，浏览器得到html代码
5. 浏览器解析html代码，并请求html中的资源
6. 浏览器对页面进行渲染并呈现给用户
### 网络分层里七层模型是哪七层
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1683105923486-4d2105f6-4034-4c47-89fd-6f1fdaf6fdef.png#averageHue=%23c5cea9&clientId=uaeeb3aa0-89ff-4&from=paste&height=529&id=u017ea861&originHeight=1058&originWidth=966&originalType=binary&ratio=2&rotation=0&showTitle=false&size=42991&status=done&style=none&taskId=u0d8fdd0e-c949-499f-8be5-4ab4ff8041b&title=&width=483)
### 涉及HTTP的性能优化

1. 减少HTTP请求
2. 静态资源使用CDN
3. 善用缓存
4. 压缩文件
5. 通过 max-age 和 no-cache 实现文件精确缓存
### RESTful
REST (Representational State Transfer)，中文意思是：表述性状态转移。 一组架构约束条件和原则，如果一个架构符合 REST 的约束条件和原则，我们就称它为 RESTful 架构。
RESTful 基本概念

- 在 REST 中，一切的内容都被认为是一种资源
- 每个资源都由 URI 唯一标识
- 使用统一的接口处理资源请求（POST/GET/PUT/DELETE/HEAD） 
- 无状态（每次请求之前是无关联，没有 session ）
### UDP
UDP（User Datagram Protocol），又叫用户数据报协议。 UDP 是一个无连接的、不可靠、基于数据报的传输协议。UDP 只是报文（报文可以理解为一段段的数据）的搬运工，不会对报文进行任何拆分和拼装操作。
具体来说

- 在发送端，应用层将数据传递给传输层，UDP 只会给数据怎加一个 UDP 头标识一下这是 UDP，然后就传递给网络层了，不进行任何拆分。
- 在接收端，网络层将数据传递给传输层，UDP 只取出 IP 报文头就传递给应用层，不进行任何拼装。

特点：

- 面向报文
- 不可靠传输
- 高效

应用场景： 当强调输出性能而非完整性时，如音频和多媒体的实时传输。有个视频流传输协议 RTP 的实时传输就是基于 UDP 封装而来的。

## 资料

- [面试官：你懂 HTTP 缓存，那说下浏览器强制刷新是怎么实现的？](https://mp.weixin.qq.com/s?__biz=Mzg3OTYzMDkzMg==&mid=2247492709&idx=1&sn=fde8977220d56cbf907ff92b58328be4&chksm=cf032b5ef874a2480b9d6681230e7e866c945e0ca9e82bcd2fecd6032d007e7132166013e71f&cur_album_id=2150428726822600706&scene=190#rd) ⭐️
- [HTTP 2.0 为什么这么设计](https://mp.weixin.qq.com/s?__biz=Mzg3OTYzMDkzMg==&mid=2247490388&idx=1&sn=ea1648e7c4100be9870fc426fb112e07&chksm=cf00d46ff8775d795a355258297f26b2f1c78948697c7b6d4fd812924fcf59f88b226556f4eb&cur_album_id=2150428726822600706&scene=189#wechat_redirect) ⭐️
- [简单了解下浏览器缓存](https://www.yuque.com/kanding/ktech/kwcc46g612oyxuhq)  ⭐️
- [两张动图-彻底明白TCP的三次握手与四次挥手](https://blog.csdn.net/qzcsu/article/details/72861891)
- [理清 HTTP 之下的 TCP 流程，让你的 HTTP 水平更上一层](https://mp.weixin.qq.com/s?__biz=Mzg3OTYzMDkzMg==&mid=2247490065&idx=1&sn=9c16736d1b22e5f8965b40ce8ab6759b&chksm=cf00d52af8775c3c0d3a6c0ef531c43a9fe717d6562a27b5a43cb6ac3449bbc71f2db9dd958c&cur_album_id=2150428726822600706&scene=190#rd)
- [彻底搞懂HTTPS的加密原理](https://zhuanlan.zhihu.com/p/43789231)  ⭐️
- [解读 HTTP1/HTTP2/HTTP3](https://www.yuque.com/baofengyuqianxi/vi4wte/yx3b13)  ⭐️
- [TCP 的三次握手和四次挥手，了解泛洪攻击么](https://github.com/sisterAn/blog/issues/105)
- [说一下 HTTP/3 新特性，为什么选择使用 UDP 协议？](https://github.com/sisterAn/blog/issues/100)
- [浏览器的强缓存和协商缓存](https://blog.csdn.net/GreekMrzzJ/article/details/89738573)
- [13道http面试题，你能否接住](https://zhuanlan.zhihu.com/p/127015338)
- [webKnowledge/UDP.md at master · huyaocode/webKnowledge](https://github.com/huyaocode/webKnowledge/blob/master/2-%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80/%E7%BD%91%E7%BB%9C/UDP.md)
- [HTTP 的15个常见知识点复习](https://www.yuque.com/wangpingan/cute-frontend/ggog08#aa27a2f9)
- [(建议收藏)TCP协议灵魂之问，巩固你的网路底层基础](https://mp.weixin.qq.com/s/hy-X0sY05_UK8G_SB4jXoQ)
- [一文读懂前端缓存](https://zhuanlan.zhihu.com/p/44789005)  ⭐️⭐️
