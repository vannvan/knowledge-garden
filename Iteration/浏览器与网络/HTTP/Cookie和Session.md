## Cookie
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1681741379851-8fb5365a-f150-4410-bcb4-e04a705a31e9.png#averageHue=%23f5f5f5&clientId=uc2a4914e-0510-4&from=paste&height=289&id=akrqB&originHeight=578&originWidth=685&originalType=binary&ratio=2&rotation=0&showTitle=false&size=116413&status=done&style=none&taskId=uffc62c19-e5e7-4180-a201-483bc64d2b6&title=&width=342.5)
### 基本特征

- 服务器要求客户端保存的Cookie信息传送到浏览器后，浏览器会根据本地的设置来决定是否保存Cookie文件。
- Cookie在RFC 2965中进行描述，每个客户端最多保持300个Cookie，每个域名下最多20个Cookie（实际上一般浏览器现在都比这个多，如Firefox是50个），而每个Cookie的大小最大为4KB。
- Cookie文件保存在用户的机器中，而由于用户机器的安全级别往往较低，所以被恶意软件嗅探、篡改的几率就会大很多。
### 定义Cookie生命周期
```yaml
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT;
```
### 限制访问Cookie
标记为 Secure 的 Cookie 只应通过被 HTTPS 协议加密过的请求发送给服务端
**JavaScript **[**Document.cookie**](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie)** API 无法访问带有 HttpOnly 属性的 cookie**；此类 Cookie 仅作用于服务器。例如，持久化服务器端会话的 Cookie 不需要对 JavaScript 可用，而应具有 HttpOnly 属性。此预防措施有助于缓解[跨站点脚本（XSS）(en-US)](https://developer.mozilla.org/en-US/docs/Web/Security/Types_of_attacks)攻击。
```http
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly
```
### 定义Cookie发送的位置

1. **Domain 属性**

定义哪些主机可以接受Cookie，如果不指定，该属性默认为同一host设置Cookie，**不包含子域名，如果指定了Domain，则一般包含子域名。**

2. **Path属性**

Path属性指定了一个URL路径，该路径必须存在于请求的URL中，以便发送Cookie标头。
例如，设置 Path=/docs，则以下地址都会匹配：

- /docs
- /docs/
- /docs/Web/
- /docs/Web/HTTP
3. **SameSite属性**

[SameSite](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie#samesitesamesite-value) 属性允许服务器指定是否/何时通过跨站点请求发送（其中[站点](https://developer.mozilla.org/zh-CN/docs/Glossary/Site)由注册的域和_方案_定义：http 或 https）。这提供了一些针对跨站点请求伪造攻击（[CSRF](https://developer.mozilla.org/zh-CN/docs/Glossary/CSRF)）的保护。它采用三个可能的值：Strict、Lax 和 None。
使用 Strict，cookie 仅发送到它来源的站点。Lax 与 Strict 相似，只是在用户_导航_到 cookie 的源站点时发送 cookie。
## Session
### 基本特征

- 可以保存在服务器的内存中，也可以写到文件里甚至数据库中，后者会增加每次读取Session ID的系统开销，但也能降低前者在停电或系统宕机情况下所带来的损失。
- 要在服务器中清除Session ID的信息，需要浏览器主动发出一个结束Session的请求，比如点击网页上的“注销”、“退出”等链接，而很多用户一般都会在不想继续访问时直接关闭浏览器，所以Session ID在过期（服务器设置的一个时间）之前会作为一个隐患继续存在。
## 两者对比

- 应用场景。Cookie的典型场景是Remenber me服务，即将用户账户信息通过Cookie文件形式保存在客户端，下次请求匹配URL的时候，交由服务端完成自动登录功能；Session的典型场景是用户登录网站之后，服务器将其关键信息放入一个由Session ID关联的数据库或文件中，在以后每次请求中都检验Session ID来确保该用户合法。
- 安全性。Cookie保存在客户端，安全性很差，容易被窃取；而Session在服务器端，被窃取的可能性较小。
- 性能。Cookie存储在客户端，消耗的是客户端的I/O和内存，而Session在服务端，对服务端是一项压力。
- 时效性。Cookie可以设置有效期使其长时间内存在于客户端，而Session一般只有比较短的有效期。
- 其他。Cookie的处理在开发中没有Session方便，而且Cookie在客户端是有大小限制的，而Session的大小只以服务器的硬件为限制。

