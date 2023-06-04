### PS:在安防里遇到过类似的需求，但没有想到用此方法

get 请求的数据放在 url 里面，类似于`http://www.baidu.com?a=1&b=2`，其中`a=1&b=2`就是 get 的参数，而对于 post 请求，参数放到 body 里面，常用的数据格式有表单数据和 json 数据，两者的差异就是数据格式不同，表单数据编码格式和 get 一样，只不过是放在 body 里面，而 json 数据则是 json 字符串

```js
import qs from 'qs'; //qs是axios里面自带的，所以直接引入就可以了
const data = qs.stringify({
	username: this.formData.username,
	oldPassword: this.formData.oldPassword,
	newPassword: this.formData.newPassword1,
});
this.$http.post('/changePassword.php', data);
```

`qs.parse()`是将 URL 解析成对象的形式，`qs.stringify()`是将对象 序列化成 URL 的形式，以&进行拼接。而对于不同的数据格式，axios 会自动设置对应的`content-type`，不需要手动设置。

- 表单数据（不带文件）的 content-type 是`application/x-www-form-urlencoded`

- 表单数据（带文件）的 content-type 是`multipart/form-data`

- json 数据的 content-type 是`application/json`

碰到过一次接口需要我用表单传一个数组。假设数据是`arr = [1,2,3]`如果直接使用 qs.stringify()，则数据会变成`arr[]=1&arr[]=2&arr[]=3`，很容易看出来，多了一个`[]`，让接口把参数名改成`arr[]`就能用，但是这样不好。不过可以发现，表单传数组的本质就是**同名参数传多次**，这时候我们也可以这样：

```js
const data = new FormData();
arr.forEach(item => {
	data.append('arr', item);
});
```

测试一下，完美解决，但是事情到这里还没完，翻一下[qs 官方文档](https://link.juejin.im/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fqs)，qs 转换支持第二个参数，完美解决我们的问题。

### 最终解决方案

```js
const data = qs.stringify(arr, { arrayFormat: 'repeat' }); //  arr=1&arr=2&arr=3
```

