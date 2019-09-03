### Cookie组成

```js
//在http的header信息中，Header的信息格式如下
Set-Cookie: name=value; [expires=date]; [path=path];
[domain=domainname]; [secure];
//在http代码中的具体例子
<meta http-equiv="set-cookie" content=" cookieName = cookieValue;
expires=01-Dec-2006 01:14:26 GMT; path=/" />
```

### 具体组成形式

-  Name/value对

  由分号分隔，一个`Cookie`最多有`20`对，每个网页最多有一个`Cookie`，`Value`的长度不超过`4K`。对于`Value`值，最好用`encodeURIComponent`对其编码。  

- Domain

  默认情况下，用户访问网页的域名会存放在**Cookie**中。如果设置了这个**Cookie**的域名值，那么意味着域名上的所有服务器，而不仅是你正在访问的服务器，都能访问这个`Cookie`，通常不要这样做。设置域名的格式如下：`domain=http://xyz.com`

- path 

  设置对于特定的服务器来说哪个目录中的网页可访问**Cookie**，设置`path`的格式是：`path = /movies`

- expires

  设置`Cookie`存活的时间，默认情况下，用户关闭浏览器则`Cookie`自动删除，如果没有设置`Cookie`失效的时间，那么用户关闭浏览器时`Cookie`也消失。如果设置该项，就能延长`Cookie`的生命期。设置时间在JS 中用`Date`对象的`GMT`形式，格式如下：  `expires = date.toGMTString()`

- Secure

  取`true`或者`false`值。如果为`true`，那么必须通过`https`发送`Cookie`。

### 创建Cookie

```js
//一般cookie
document.cookie = "username=Daisy Green";
//有过期时间的cookie
document.cookie = "username=Daisy Green; expires=Mon, 26 Aug 2019 12:00:00 UTC";
//有路径的cookie
document.cookie = "username=Daisy Green; expires=Mon, 26 Aug 2019 12:00:00 UTC"; path=/";

```

### 读取Cookie

```js
var x = document.cookie;
```

### 实例1

```js
function ReadCookie() {
               var allcookies = document.cookie;
               document.write ("All Cookies : " + allcookies );
                
               // Get all the cookies pairs in an array
               cookiearray = allcookies.split(';');
                
               // Now take key value pair out of this array
               for(var i=0; i<cookiearray.length; i++) {
                  name = cookiearray[i].split('=')[0];
                  value = cookiearray[i].split('=')[1];
                  document.write ("Key is : " + name + " and Value is : " + value);
               }
}
```

### 改变Cookie和创建一样

```js
function WriteCookie() {
               var now = new Date();
               now.setMonth( now.getMonth() + 1 );
               cookievalue = escape(document.myform.customer.value) + ";"
                
               document.cookie = "name=" + cookievalue;
               document.cookie = "expires=" + now.toUTCString() + ";"
               document.write ("Setting Cookies : " + "name=" + cookievalue );
}
```

### 删除Cookie

```js
//直接把过期时间设置为过去的时间即可
document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
```

