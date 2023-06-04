## Web及网络基础
### HTTP的前世今生
蒂姆·伯纳斯·李（Tim Berners-Lee），万维网创始人，**1989**年发表了一篇论文，提出了在互联网上构建超链接文档系统的构想。
确定了三项关键技术：

1. URI：统一资源标识符，作为互联网上资源的唯一标识
2. HTML：超文本标记语言，描述超文本文档
3. HTTP：超文本传输协议，用来传输超文本

所以，1989年http诞生了。
#### HTTP/0.9
文档都是只读的，所以只允许用户通过 GET 请求从服务器上获取 HTML 文档，并且在响应之后立即关闭连接，功能非常有限。
#### HTTP/1.0-1996
此时的 HTTP/1.0 并不是一个标准，只是记录已有实践和模式的一份参考文档，不具有实际的约束力，相当于一个备忘录。

- 增加了GET/POST
- 增加了响应状态码
- 增加了版本号
- 增加了Header头部的概念
- 增加了Content-Type，传输数据不仅限于文本
#### HTTP/1.1-1999

- 增加了 PUT/DELETE/OPITIONS 等新方法
- 增加了缓存控制和管理 Cache Control
- 明确了连接管理，允许持久连接 Keepalive
- 允许响应数据分块，利于传输大文件（Chunked）
- 强制要求 Host 头
#### ⭐️HTTP/1.1-2014 

- 加大了 HTTP 的安全性，比如使用 TLS 协议
- 让 HTTP 可以支持更多的应用，目前已经支持四种网络协议：
- 传统的短连接
- 可重用 TCP 的长连接模型
- 服务端 PUSH 模型
- WebSocket 模型
#### HTTP/2.0-2010
针对HTTP/1.1存在的两个问题

- 连接慢，请求是串行的
- 性能差，HTTP/1.1 是以文本的方式，借助 CPU 的 zip 压缩方式减少网络带宽，但是耗费了 前端和后端的 CPU。	

2010年，Google 推出了新的 **SPDY** 协议，并应用于自家的服务器，HTTP/2 就是以 SPDY 为基础的，它的特点主要是：

- 使用二进制传输，不再是纯文本
- 可以在一个 TCP 连接中并发多个 HTTP 请求，移除了 HTTP/1.1 中的串行请求
- 使用 HPACK 算法来压缩头部
- 允许服务器主动向客户端推送数据
- 增强了安全性，基于 TLS 协议
#### HTTP/3.0
HTTP/2 的主要问题有队头阻塞问题，也就是说，若干个 HTTP 请求在复用一个 TCP 的连接，那么一旦发生丢包，造成的问题就是所有的请求都必须等待这个丢了的包重传回来，哪怕这个包不是我这个 HTTP 请求的。
基于此，还是Google发明了 QUIC（Quick UDP Internet Connections）协议，它是基于 UDP 的。因此，它就解决了以下几个问题：

- UDP 是无序的，因此不存在队头阻塞问题
- QUIC 有一套自己的丢包重传和拥塞控制的协议
- HTTPS 握手通常需要六次网络交互，QUIC 直接将 TLS 和 TCP 合并成了三次握手

所以，QUIC 是一个在 UDP 之上的伪 TCP + TLS + HTTP/2 的多路复用协议。在未来，QUIC 协议成熟了的话，是有可能取代 TCP 协议的。
> 一个用来检查的网站 [https://http3check.net/](https://http3check.net/)
> 一个HTTP/3的站点 [https://www.litespeedtech.com/](https://www.litespeedtech.com/) 
> ![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1684924584552-61b94864-2b46-442e-b3ea-23e12cd5df5d.png#averageHue=%23feba2e&clientId=u00214e6b-d444-4&from=paste&height=270&id=u61ccfff8&originHeight=539&originWidth=1611&originalType=binary&ratio=2&rotation=0&showTitle=false&size=181565&status=done&style=none&taskId=u5d216f38-d201-4cdd-8566-af8553016d5&title=&width=805.5)
> chrome查看支持情况的方法：chrome://flags/#enable-quic

### TCP/IP协议族
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1681630554081-aa3e762e-1714-40e1-97bf-801750f57cd6.png#averageHue=%23e1e5e3&clientId=u6a1c902c-1c20-4&from=paste&height=322&id=u614072e7&originHeight=644&originWidth=1452&originalType=binary&ratio=2&rotation=0&showTitle=false&size=278066&status=done&style=none&taskId=u9e3a5d0b-d64f-4ccb-bdf6-a348149fb44&title=&width=726)
TCP/IP是互联网相关的各类协议族的总称
#### TCP/IP的分层管理
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1681630872110-c4158767-0fc1-4c92-922b-0000340cde3e.png#averageHue=%23e1e2df&clientId=u6a1c902c-1c20-4&from=paste&height=515&id=u99c8d7f1&originHeight=1030&originWidth=1556&originalType=binary&ratio=2&rotation=0&showTitle=false&size=257185&status=done&style=none&taskId=uebc82a51-40d1-473d-abb2-6ca05f6ca44&title=&width=778)
##### 应用层
TCP/IP协议族内预存了各类通用的应用服务。比如，FTP（File Transfer Protocol，文件传输协议）和DNS（Domain Name System，域名系统）服务就是其中两类。HTTP协议也处于该层。
##### 传输层
提供处于网络连接中的两台计算机之间的数据传输。
传输层有两种性质不同的协议：TCP（Transmission Control Protocol，传输控制协议）和UDP（User Data Protocol，用户数据报协议）
##### 网络层
网络层用来处理在网络上流动的数据包。数据包是网络传输的最小数据单位。该层规定了通过怎样的路径（所谓的传输路线）到达对方计算机，并把数据包传送给对方。
与对方计算机之间通过多台计算机或网络设备进行传输时，网络层所起的作用就是在众多的选项内选择一条传输路线。
##### 数据链路层
包括控制操作系统、硬件的设备驱动、NIC（Network Interface Card，网络适配器，即网卡），及光纤等物理可见部分（还包括连接器等一切传输媒介）
#### IP、TCP和DNS
##### 负责传输的IP协议
按层次分，IP网际协议位于网络层。
**IP协议**的作用是把各种数据包传送给对方。
**IP地址**指明了节点被分配到的地址，MAC地址是指网卡所属的固定地址。
##### 确保可靠性的TCP协议
按层次分，TCP位于传输层。
为了确保准确无误的将数据送达目标处，TCP协议采用了“三次握手”策略，握手过程中使用了TCP的标志——SYN（synchronize）和ACK（acknowledgement）。
三次握手过程如下：

1. 客户端发送一个TCP的**SYN=1，Seq=X**的包到服务器端口
2. 服务器发回**SYN=1， ACK=X+1， Seq=Y**的响应包
3. 客户端发送**ACK=Y+1， Seq=Z**
##### 负责域名解析的DNS服务
按层次分，DNS位于应用层。
用户通常使用主机名或域名来访问对方的计算机，而不是直接通过IP地址访问。为了让计算机理解名称，DNS服务应运而生。
#### URI和URL
URI是Uniform Resource Identifier的缩写，统一资源标识符。
URL格式
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1681631772659-5d1b90fb-5f92-41c5-aaaa-b421eb2074c6.png#averageHue=%23f3f3f3&clientId=u6a1c902c-1c20-4&from=paste&height=156&id=ua0cdf6a1&originHeight=312&originWidth=1470&originalType=binary&ratio=2&rotation=0&showTitle=false&size=209069&status=done&style=none&taskId=u09e8956c-bcd6-4aa5-a433-66a44f1dc2f&title=&width=735)
## HTTP协议
### HTTP的几种请求方法用途

- GET方法

发送一个请求来取得服务器上的某一资源

- POST方法

向URL指定的资源提交数据或附加新的数据

- PUT方法

跟POST方法很像，也是想服务器提交数据。但是，它们之间有不同。PUT指定了资源在服务器上的位置，而POST没有

- HEAD方法

只请求页面的首部

- DELETE方法

删除服务器上的某资源

- OPTIONS方法

它用于获取当前URL所支持的方法。如果请求成功，会有一个Allow的头包含类似“GET,POST”这样的信息

- TRACE方法

TRACE方法被用于激发一个远程的，应用层的请求消息回路

- CONNECT方法

把请求连接转换到透明的TCP/IP通道
### 使用Cookie的状态管理
H**TTP是无状态协议，它不对之前发生过的请求和响应的状态进行管理。也就是说，无法根据之前的状态进行本次的请求处理。**
Cookie会根据从服务器端发送的响应报文内的一个叫做Set-Cookie的首部字段信息，通知客户端保存Cookie。当下次客户端再往该服务器发送请求时，客户端会自动在请求报文中加入Cookie值后发送出去。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1681632418391-996d161e-f361-45cb-80a0-8e96cb8bfa0e.png#averageHue=%23f6f6f6&clientId=u25c46a86-8a21-4&from=paste&height=709&id=u26b4a142&originHeight=1418&originWidth=1582&originalType=binary&ratio=2&rotation=0&showTitle=false&size=685090&status=done&style=none&taskId=ub8a6c48c-97d6-42c9-9251-f6e6f0c7b7f&title=&width=791)

## HTTP报文
请求报文结构
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1681632587332-369649d5-051b-4da3-9abc-0460abd79f64.png#averageHue=%23eaecea&clientId=u25c46a86-8a21-4&from=paste&height=307&id=u1271e5ca&originHeight=614&originWidth=1296&originalType=binary&ratio=2&rotation=0&showTitle=false&size=307786&status=done&style=none&taskId=u0f28a97d-3ed8-45f7-b02d-e5d354732b1&title=&width=648)
响应报文结构
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1681632605181-9007b88b-c250-4d66-b2d4-251fc3637375.png#averageHue=%23aedaeb&clientId=u25c46a86-8a21-4&from=paste&height=594&id=u2d08ac24&originHeight=1188&originWidth=1302&originalType=binary&ratio=2&rotation=0&showTitle=false&size=948225&status=done&style=none&taskId=u3c2e4d76-fe5b-422c-bc9d-16fc4f13f30&title=&width=651)
### 常见的内容编码

- gzip
- compress（UNIX系统的标准压缩）
- deflate（zlib)
- identity（不进行编码）
### 重要的MIME类型
| 类型 | 描述 | 典型示例 |
| --- | --- | --- |
| text | 表明文件是普通文本，理论上是人类可读 | text/plain, text/html, text/css, text/javascript |
| image | 表明是某种图像。不包括视频，但是动态图（比如动态 gif）也使用 image 类型 | image/gif, image/png, image/jpeg, image/bmp, image/webp, image/x-icon, image/vnd.microsoft.icon |
| audio | 表明是某种音频文件 | audio/midi, audio/mpeg, audio/webm, audio/ogg, audio/wav |
| video | 表明是某种视频文件 | video/webm, video/ogg |
| application | 表明是某种二进制数据 | application/octet-stream, application/pkcs12, application/vnd.mspowerpoint, application/xhtml+xml, application/xml, application/pdf |

浏览器可以通过请求头 [Content-Type](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Type) 来设置 [X-Content-Type-Options](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/X-Content-Type-Options) 以阻止 MIME 嗅探。
### 发送多种数据的多部分对象集合

- multipart/form-data    表单文件上传

![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1681632937214-415cf558-75b9-4a96-81ff-e9bcfe26cf91.png#averageHue=%23e5e5e5&clientId=u25c46a86-8a21-4&from=paste&height=224&id=u43be4bb6&originHeight=448&originWidth=1544&originalType=binary&ratio=2&rotation=0&showTitle=false&size=102567&status=done&style=none&taskId=u4b459303-9520-4fd3-8032-79329cec81c&title=&width=772)

- multipart/byteranges   状态码206响应报文包含了多个范围的内容时使用。

![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1681632923342-a88537f6-d58a-4c63-a01e-31ba0c988987.png#averageHue=%23e4e3e2&clientId=u25c46a86-8a21-4&from=paste&height=315&id=uf58626e1&originHeight=630&originWidth=1578&originalType=binary&ratio=2&rotation=0&showTitle=false&size=185246&status=done&style=none&taskId=u55ccc10e-0fbf-487c-9f02-6e2b0acefdb&title=&width=789)
### HTTP 请求范围
HTTP 协议范围请求允许服务器只发送 HTTP 消息的一部分到客户端。范围请求在传送大的媒体文件，或者与文件下载的断点续传功能搭配使用时非常有用。
假如服务器支持范围请求的话，你可以使用 [Range](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Range) 首部来生成该类请求。该首部指示服务器应该返回文件的哪一或哪几部分。
#### 单一范围
```bash
curl http://i.imgur.com/z4d4kWk.jpg -i -H "Range: bytes=0-1023"
```
这样生成的请求如下
```bash
GET /z4d4kWk.jpg HTTP/1.1
Host: i.imgur.com
Range: bytes=0-1023
```
服务器端会返回状态码为 [206](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/206) Partial Content 的响应：
```bash
HTTP/1.1 206 Partial Content
Content-Range: bytes 0-1023/146515
Content-Length: 1024
...
(binary content)
```
#### 多重范围
```bash
curl http://www.example.com -i -H "Range: bytes=0-50, 100-150"
```
#### 条件式范围
```bash
If-Range: Wed, 21 Oct 2015 07:28:00 GMT
```
### 内容协商

- Accept
- Accept-Charset
- Accept-Encoding
- Accept-Language
- Content-Language
## HTTP状态码
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1681633744075-02e0ef3b-1002-469b-99aa-95b7c9b2e8ce.png#averageHue=%23e7e7e5&clientId=u25c46a86-8a21-4&from=paste&height=283&id=iJ3WZ&originHeight=566&originWidth=1382&originalType=binary&ratio=2&rotation=0&showTitle=false&size=349204&status=done&style=none&taskId=ucac79f9d-89a0-4183-8b19-9bea543994a&title=&width=691)
### 主要关注
#### 302和303
303状态码和302 Found状态码有着相同的功能，但303状态码明确表示客户端应当采用GET方法获取资源，这点与302状态码有区别。
比如，当使用POST方法访问CGI程序，其执行后的处理结果是希望客户端能以GET方法重定向到另一个URI上去时，返回303状态码。虽然302 Found状态码也可以实现相同的功能，但这里使用303状态码是最理想的
#### 304 Not Modified
该状态码表示客户端发送附带条件的请求[插图]时，服务器端允许请求访问资源，但因发生请求未满足条件的情况后，直接返回304 Not Modified（服务器端资源未改变，可直接使用客户端未过期的缓存）。304状态码返回时，不包含任何响应的主体部分。304虽然被划分在3XX类别中，但是和重定向没有关系。
#### 307 临时重定向
该状态码与302 Found有着相同的含义。尽管302标准禁止POST变换成GET，但实际使用时大家并不遵守。
307会遵照浏览器标准，不会从POST变成GET。但是，对于处理响应时的行为，每种浏览器有可能出现不同的情况。
#### 401 Unauthorized
返回含有401的响应必须包含一个适用于被请求资源的WWW-Authenticate首部用以质询（challenge）用户信息。当浏览器初次接收到401响应，会弹出认证用的对话窗口。
但在实际应用时，目前设计接口都会采用返回200，将401放在响应body中的方式
#### 403 Forbidden
该状态码表明对请求资源的访问被服务器拒绝了。
## Web服务器
### 代理
代理是一种有转发功能的应用程序，它扮演了位于服务器和客户端“中间人”的角色，接收由客户端发送的请求并转发给服务器，同时也接收服务器返回的响应并转发给客户端。
### 网关
网关是转发其他服务器通信数据的服务器，接收从客户端发送来的请求时，它就像自己拥有资源的源服务器一样对请求进行处理。有时客户端可能都不会察觉，自己的通信目标是一个网关。
### 隧道
隧道是在相隔甚远的客户端和服务器两者之间进行中转，并保持双方通信连接的应用程序。
### 代理与网关的对比
严格来说，代理连接的是两个或多个使用相同协议的应用程序，而网关连接的则是两个或多个使用不同协议的端点。网关扮演的是“协议转换器”的角色，即使客户端和服务器使用的是不同的协议，客户端也可以通过它完成与服务器之间的事务处理。
### 为什么使用代理

- 儿童过滤器 
- 文档访问控制
- 安全防火墙
- Web缓存
- 反向代理
- 内容路由器
- 转码器
- 匿名者  替换user-agent、referer、cookies等信息
## HTTP缓存
### 缓存的优点

- HTTP 缓存会存储与请求关联的响应，并将存储的响应复用于后续请求。

可复用性有几个优点。首先，由于不需要将请求传递到源服务器，因此客户端和缓存越近，响应速度就越快。最典型的例子是浏览器本身为浏览器请求存储缓存。

- 此外，当响应可复用时，源服务器不需要处理请求——因为它不需要解析和路由请求、根据 cookie 恢复会话、查询数据库以获取结果或渲染模板引擎。这减少了服务器上的负载。
### 基于age的缓存策略
存储的 HTTP 响应有两种状态：**fresh** 和 **stale**。_fresh_ 状态通常表示响应仍然有效，可以重复使用，而 _stale_ 状态表示缓存的响应已经过期。
以以下响应为例(604800秒为一周)
```bash
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1024
Date: Tue, 22 Feb 2022 22:22:22 GMT
Cache-Control: max-age=604800

<!doctype html>
…
```
对于该示例的响应，max-age 的含义如下：

- 如果响应的 age _小于_一周，则响应为 _fresh_。
- 如果响应的 age _超过_一周，则响应为 _stale_。

只要存储的响应保持新鲜（fresh），它将用于兑现客户端请求。
当响应存储在共享缓存中时，有必要通知客户端响应的 age。继续看示例，如果共享缓存将响应存储了一天，则共享缓存将向后续客户端请求发送以下响应。
```bash
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1024
Date: Tue, 22 Feb 2022 22:22:22 GMT
Cache-Control: max-age=604800
Age: 86400

<!doctype html>
…
```
收到该响应的客户端会发现它在剩余的 518400 秒内是新鲜（fresh）的，这是响应的 max-age 和 Age 之间的差异。
### Expires和max-age
在 HTTP/1.0 中，新鲜度过去由 Expires 标头指定。
```bash
Expires: Tue, 28 Feb 2022 22:22:22 GMT
```
但是时间格式难以解析，也发现了很多实现的错误，有可能通过故意偏移系统时钟来诱发问题；因此，在 HTTP/1.1 中，Cache-Control 采用了 max-age——用于指定经过的时间。
**如果 Expires 和 Cache-Control: max-age 都可用，则将 max-age 定义为首选**。因此，由于 HTTP/1.1 已被广泛使用，无需特地提供 Expires。
### If-Modified-Since/Last-Modified
以下响应在 22:22:22 生成，max-age 为 1 小时，因此你知道它在 23:22:22 之前是新鲜的。
```yaml
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1024
Date: Tue, 22 Feb 2022 22:22:22 GMT
Last-Modified: Tue, 22 Feb 2022 22:00:00 GMT
Cache-Control: max-age=3600

<!doctype html>
…
```
到 23:22:22 时，响应会过时并且不能重用缓存。因此，下面的请求显示客户端发送带有 If-Modified-Since 请求标头的请求，以询问服务器自指定时间以来是否有任何的改变。
```yaml
GET /index.html HTTP/1.1
Host: example.com
Accept: text/html
If-Modified-Since: Tue, 22 Feb 2022 22:00:00 GMT
```
如果内容自指定时间以来没有更改，服务器将响应 304 Not Modified。
由于此响应仅表示“没有变化”，因此没有响应主体——只有一个状态码——因此传输大小非常小。
```yaml
HTTP/1.1 304 Not Modified
Content-Type: text/html
Date: Tue, 22 Feb 2022 23:22:22 GMT
Last-Modified: Tue, 22 Feb 2022 22:00:00 GMT
Cache-Control: max-age=3600
```
以上对于提供静态文件的情况比较友好，但也存在一些问题；例如，时间格式复杂且难以解析，分布式服务器难以同步文件更新时间。
### ETag/If-None-Match
ETag 响应标头的值是服务器生成的任意值。服务器对于生成值没有任何限制，因此服务器可以根据他们选择的任何方式自由设置值——例如主体内容的哈希或版本号。
举个例子，如果 ETag 标头使用了 hash 值，index.html 资源的 hash 值是 deadbeef，响应如下：
```yaml
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1024
Date: Tue, 22 Feb 2022 22:22:22 GMT
ETag: "deadbeef"
Cache-Control: max-age=3600

<!doctype html>
…
```
如果该响应是陈旧的，则客户端获取缓存响应的 ETag 响应标头的值，并将其放入 If-None-Match 请求标头中，以询问服务器资源是否已被修改：
```yaml
GET /index.html HTTP/1.1
Host: example.com
Accept: text/html
If-None-Match: "deadbeef"
```
如果服务器为请求的资源确定的 ETag 标头的值与请求中的 If-None-Match 值相同，则服务器将返回 304 Not Modified。
### 一次完整的缓存验证
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1681745355894-3e9be359-75b3-4af6-8c4a-52f6d4792b91.png#averageHue=%23f6f6f6&clientId=uc2a4914e-0510-4&from=paste&height=745&id=u3ea9f292&originHeight=1031&originWidth=692&originalType=binary&ratio=2&rotation=0&showTitle=false&size=109314&status=done&style=none&taskId=u8168c097-fea2-4781-8e1d-a2f5cabc338&title=&width=500)
### 重新加载和强制重新加载
#### 重新加载
重新加载期间发送的HTTP请求
```yaml
GET / HTTP/1.1
Host: example.com
Cache-Control: max-age=0
If-None-Match: "deadbeef"
If-Modified-Since: Tue, 22 Feb 2022 20:20:20 GMT
```
请求中的 max-age=0 指令指定“重用 age 为 0 或更少的响应”——因此，中间存储的响应不会被重用。
请求通过 If-None-Match 和 If-Modified-Since 进行验证。
```javascript
// 注意：“reload”不是正常重新加载的正确模式；“no-cache”才是
fetch("/", { cache: "no-cache" });
```
#### 强制重新加载
出于向后兼容的原因，浏览器在重新加载期间使用 max-age=0——因为在 HTTP/1.1 之前的许多过时的实现中不理解 no-cache。但是在这个用例中，no-cache 已被支持，并且**强制重新加载**是绕过缓存响应的另一种方法。
浏览器**强制重新加载**期间的 HTTP 请求如下所示(这个在DevTools看不到，可以通过抓包工具)
```yaml
GET / HTTP/1.1
Host: example.com
Pragma: no-cache
Cache-Control: no-cache
```
由于这不是带有 no-cache 的条件请求，因此你可以确定你会从源服务器获得 200 OK
```javascript
// 注意：“reload”——而不是“no-cache”——是“强制重新加载”的正确模式
fetch("/", { cache: "reload" });
```
### immutable可以避免重新验证
永远不会改变的内容应该被赋予一个较长的 max-age，方法是使用缓存破坏——也就是说，在请求 URL 中包含版本号、哈希值等。
但是，当用户重新加载时，即使服务器知道内容是不可变的，也会发送重新验证请求。
为了防止这种情况，immutable 指令可用于明确指示不需要重新验证，因为内容永远不会改变。
```yaml
Cache-Control: max-age=31536000, immutable
```

## HTTP重定向
### 永久重定向
| 状态码 | 状态文本 | 处理方法 | 典型应用场景 |
| --- | --- | --- | --- |
| 301 | Moved Permanently | [GET](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/GET)方法不会发生变更。其他方法有可能会变更为 [GET](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/GET)方法。[1] | 网站重构。 |
| 308 | Permanent Redirect | 方法和消息主体都不发生变化。 | 使用用于非 GET 链接/操作重组网站。 |

### 临时重定向
搜索引擎和其他爬虫不会记录新的、临时的 URL。在创建、更新或者删除资源的时候，临时重定向也可以用于显示临时性的进度页面。

| 状态码 | 状态文本 | 处理方法 | 典型应用场景 |
| --- | --- | --- | --- |
| 302 | Found | [GET](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/GET)方法不会发生变更。其他方法有可能会变更为 [GET](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/GET)方法。[2] | 由于不可预见的原因该页面暂不可用。 |
| 303 | See Other | [GET](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/GET)方法不会发生变更，其他方法会_变更_为 GET 方法（消息主体丢失）。 | 用于 [PUT](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/PUT)或 [POST](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/POST)
**请求完成之后重定向，来防止由于页面刷新导致的操作的重复触发。** |
| 307 | Temporary Redirect | 方法和消息主体都不发生变化。 | 由于不可预见的原因该页面暂不可用。当站点支持非 GET 方法的链接或操作的时候，该状态码优于 302 状态码。 |

### 特殊重定向
| 状态码 | 状态文本 | 典型应用场景 |
| --- | --- | --- |
| 300 | Multiple Choice | 不常用：所有的选项在消息主体的 HTML 页面中列出。鼓励在 [Link](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Link)
 标头中加入机器可读的 rel=alternate |
| 304 | Not Modified | 发送用于重新验证的条件请求。表示缓存的响应仍然是新的并且可以使用。 |

### 指定重定向的其他方式

1. 借助 HTML 的 [<meta>](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta) 元素的 HTML 重定向机制
```html
<head>
  <meta http-equiv="Refresh" content="0; URL=http://example.com/" />
</head>
```

2. 借助 [DOM](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model) 的 JavaScript 重定向机制。
```javascript
window.location = "https://example.com/";
```
### 在服务器中配置重定向

1. Apache

了解一下，其实还有其他方法
```nginx
<VirtualHost *:443>
ServerName example.com
Redirect / https://www.example.com
</VirtualHost>
```

2. Nginx
```nginx
server {
  listen 80;
  server_name example.com;
  return 301 $scheme://www.example.com$request_uri;
}
```
要将重定向应用于目录或者仅是部分页面，请使用 rewrite 指令：
```nginx
rewrite ^/images/(.*)$ http://images.example.com/$1 redirect;
rewrite ^/images/(.*)$ http://images.example.com/$1 permanent;
```
## CDN
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1681640248397-588f234a-5083-45d8-9c88-c9f722679e89.png#averageHue=%23f3f3f3&clientId=u25c46a86-8a21-4&from=paste&height=248&id=uea26ba4e&originHeight=495&originWidth=676&originalType=binary&ratio=2&rotation=0&showTitle=false&size=76771&status=done&style=none&taskId=u4ab3657b-4d91-42f5-8ef2-04cd11343be&title=&width=338)
### 基于承载类型的分类

1. 网页加速
2. 流媒体加速
3. 文件传输加速
4. 应用协议加速
- 广域网 应用加速
- SSL应用加速
- **网页加速**
### 控制缓存的方法
#### HTML META标签和HTTP头信息
META标签使用很简单，但是效率并不高，因为能够读懂这个标记的浏览器只有少数几种，同时由于中间缓存几乎完全不解析文档中的HTML内容，所以也没有什么中间缓存（代理缓存和网关缓存）能读懂这个规则。
如果要通过META标签来控制页面不缓存，一般情况下会在Web页面的<HEAD>区域中增加“Pragma: no-cache”的META标记。
#### 使用Expires（过期时间）头信息来控制保鲜期
一个典型的HTTP/1.1响应头信息
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1681742503776-0e0f7a71-415b-43f9-8c11-6261f79cb383.png#averageHue=%23f8f7f5&clientId=uc2a4914e-0510-4&from=paste&height=158&id=woIYY&originHeight=316&originWidth=758&originalType=binary&ratio=2&rotation=0&showTitle=false&size=50915&status=done&style=none&taskId=u3131a84d-9456-4ec1-ac3e-0be39368618&title=&width=379)

1. Expires头信息对于控制静态图片文件的缓存特别有用，因为这些图片修改很少，可以设置一个比较长的时间。
2. 另外对于控制有规律改变的网页也很有用。例如每天早上6点更新新闻网页

局限性：其能被有效利用的前提是源服务器的时间和中间缓存的时间必须是同步的，如果不同步，就会出现缓存内容提前过期的情况。
#### Cache-Control（缓存控制）HTTP头信息
有用的Cache-Control包括如下几项

1. max-age 缓存内容保持新鲜状态的最长时间。是基于请求时间的相对时间，而不是绝对时间，单位是秒。
2. s-maxage 类似于max-age，应用于共享缓存
3. pubic  此属性标记认证内容也可以被缓存，一般来说，经过HTTP认证才能访问的内容是默认不能缓存的。
4. no-cache 强制将每次访问请求直接发送给服务器，而不经过中间缓存进行前面提到的验证。
5. no-store 强制缓存在任何情况下都不要缓存任何内容
6. must-revalidate 告诉缓存必须遵循源服务器赋予的内容新鲜度
7. proxy-revalidate 和must-revalidate基本相同，只是它不能应用于非共享的代理缓存。
#### Pragma HTTP头信息
在很多情况下，使用Pragma属性不一定管用。
### 加速原理
当用户访问使用 CDN 服务的网站时，本地 DNS 服务器通过 CNAME 方式将最终域名请求重定向到 CDN 服务。CDN 通过一组预先定义好的策略(如**内容类型、地理区域、网络负载状况**等)，将当时能够最快响应用户的 CDN 节点 IP 地址提供给用户，使用户可以以最快的速度获得网站内容。使用 CDN 后的 HTTP 请求处理流程如下：
#### CDN 节点有缓存场景
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1685086849097-a887d8f2-367d-4701-a3d9-5e217834ea6b.png#averageHue=%23f1f1f0&clientId=uda8021fd-d96c-4&from=paste&height=565&id=ud33c23ed&originHeight=1130&originWidth=1470&originalType=binary&ratio=2&rotation=0&showTitle=false&size=153163&status=done&style=none&taskId=u9a050e6f-08f4-46c0-9acc-04ec590c5cf&title=&width=735)
#### CDN节点无缓存场景
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1685086911198-52d8bef8-56b1-4992-8aa7-ecae75cfebdc.png#averageHue=%23f1f1f0&clientId=uda8021fd-d96c-4&from=paste&height=564&id=u01e09af7&originHeight=1128&originWidth=1548&originalType=binary&ratio=2&rotation=0&showTitle=false&size=170108&status=done&style=none&taskId=ue26243b4-6653-4212-a58e-4679f6c575c&title=&width=774)

## HTTPS
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1683447021279-5a303f74-a967-4309-bada-dcf178b5aec9.png#averageHue=%23ededed&clientId=ud98458f6-b29f-4&from=paste&height=254&id=u065c3ece&originHeight=311&originWidth=736&originalType=binary&ratio=2&rotation=0&showTitle=false&size=127809&status=done&style=none&taskId=u8065b8ba-299c-4c3e-82de-f86a32c0448&title=&width=600)
### 是什么
**HTTPS 协议 = HTTP 协议 + SSL/TLS 协议**，在 HTTPS 数据传输的过程中，需要用 SSL/TLS 对数据进行加密和解密，需要用 HTTP 对加密后的数据进行传输，由此可以看出 HTTPS 是由 HTTP 和 SSL/TLS 一起合作完成的。
**SSL**的全称是 Secure Sockets Layer，即安全套接层协议，是为网络通信提供安全及数据完整性的一种安全协议。SSL 协议在 1994 年被 Netscape 发明，后来各个浏览器均支持 SSL，其最新的版本是 3.0。
**TLS**的全称是 Transport Layer Security，即安全传输层协议，最新版本的 TLS（Transport Layer Security，传输层安全协议）是 IETF（Internet Engineering Task Force，Internet 工程任务组）制定的一种新的协议，它建立在 SSL 3.0 协议规范之上，是 SSL 3.0 的后续版本。在 TLS 与 SSL3.0 之间存在着显著的差别，主要是它们所支持的加密算法不同，所以 TLS 与 SSL3.0 不能互操作。虽然 TLS 与 SSL3.0 在加密算法上不同，但是在我们理解 HTTPS 的过程中，我们可以把 SSL 和 TLS 看做是同一个协议。
HTTPS 为了兼顾安全与效率，**同时使用了对称加密和非对称加密**。数据是被对称加密传输的，对称加密过程需要客户端的一个密钥，为了确保能把该密钥安全传输到服务器端，采用非对称加密对该密钥进行加密传输，总的来说，**对数据进行对称加密，对称加密所要使用的密钥通过非对称加密传输**。
### 相关知识
#### 加密算法
**对称密钥密码体制**
对称密钥密码体制，即加密密钥和解密密钥是使用相同的密码体制。对称密钥加密技术的缺点之一就是发送者和接收者在对话之前，一定要有一个共享的密钥，所以不太安全。
**公钥加密体制**
公钥密码体制使用不同的加密密钥与解密密钥。公钥密码体制产生的主要原因有两个：一是对称密钥密码体制的密钥分配问题，二是对数字签名的需求。
在公钥密码体制中，加密密钥是公开的，解密密钥是需要保密的，加密算法和解密算法也是公开的。
#### 摘要算法
摘要算法的主要特征是加密过程不需要密钥，并且经过加密的数据无法被解密，目前可以被解密逆向的只有CRC32算法，只有输入相同的明文数据经过相同的消息摘要算法才能得到相同的密文。
#### 数字签名
用加密系统对报文进行签名，以说明是谁编写的报文，同时证明报文未被篡改过，这种技术称为**数字签名**。
数字签名通常是用非对称公开密钥技术产生的。
#### 数字证书
假如你想访问一个网站，怎么确保对方给你的公钥是你想访问的网站的公钥，而不是被中间人篡改过的？
数字证书的出现就是为了解决这个问题，它是由数字证书认证机构颁发的，用来证明公钥拥有者的身份。换句话说，数字证书的作用就相当于人的身份证，身份证证明了张三就是张三，而不是别人。
**数字证书一般包含以下内容**：

1. 对象的名称（人、服务器、组织等）；
2. 过期时间；
3. 证书发布者（由谁为证书担保）；
4. 来自证书发布者的数字签名；
5. 对象的公钥；
6. 对象和所用签名算法的描述性信息。

任何人都可以创建一个数字证书，但由谁来担保才是重点。
### ⭐和HTTPS有关的密钥
HTTPS 在传输的过程中会涉及到三个密钥：

- 服务器端的公钥和私钥，用来进行非对称加密
- 客户端生成的随机密钥，用来进行对称加密
### HTTPS 连接建立过程
HTTPS 连接建立过程和 HTTP 差不多，区别在于 HTTP（默认端口 80） 请求只要在 TCP 连接建立后就可以发起，而 HTTPS（默认端口 443） 在 TCP 连接建立后，还需要经历 SSL 协议握手，成功后才能发起请求。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1683447490086-1cf6746a-e699-4305-b844-5d712922777d.png#averageHue=%23f0f0f0&clientId=ud98458f6-b29f-4&from=paste&height=449&id=u7db2772f&originHeight=897&originWidth=724&originalType=binary&ratio=2&rotation=0&showTitle=false&size=311702&status=done&style=none&taskId=u3ae0c7e1-b822-4b89-a29c-0472ba668f3&title=&width=362)

## 资料

- [图解HTTP](https://book.douban.com/subject/25863515/) - 书
- [HTTP权威指南](https://book.douban.com/subject/10746113/) - 书
- [CDN技术详解](https://book.douban.com/subject/10759173/) - 书
- [https://developer.mozilla.org/zh-CN/docs/Web/HTTP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Range_requests)
- [https://github.com/woai3c/Front-end-articles/blob/master/http-https-http2.md](https://github.com/woai3c/Front-end-articles/blob/master/http-https-http2.md)
- [HTTP 协议的前世今生](https://zhuanlan.zhihu.com/p/100309110)
- [分享|五大开源 Web 代理服务器横评：Squid、Privoxy、Varnish、Polipo、Tinyproxy](https://linux.cn/article-7119-1.html)
- [http专栏-公众号](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=Mzg3OTYzMDkzMg==&action=getalbum&album_id=2150428726822600706&scene=173&from_msgid=2247492709&from_itemidx=1&count=3&nolastread=1#wechat_redirect) ⭐️
- [https://ipv6.ustc.edu.cn/](https://ipv6.ustc.edu.cn/)  网站HTTP、HTTPS、HTTP/2支持情况
- [快速搭建一个http2的网站](https://zhuanlan.zhihu.com/p/25935872)
- [Https原理及流程](https://www.jianshu.com/p/14cd2c9d2cd2)
- [GitHub - leandromoreira/cdn-up-and-running](https://github.com/leandromoreira/cdn-up-and-running)  从零开始构建 CDN 的教程
- [一文读懂 HTTP/2 特性](https://zhuanlan.zhihu.com/p/26559480)
