```javascript
var api = 'https://api.github.com/users/torvalds'
var xhr = new XMLHttpRequest() // 创建XMLHttpRequest对象

if(window.XMLHttpRequest){ // 兼容处理
    xhr = new XMLHttpRequest()
}else{
    xhr = new ActiveXObject('Microsoft.XMLHTTP')// 兼容ie6以下下
}

xhr.open('get',api,true)    //设置请求信息    
xhr.send()  //提交请求

//等待服务器返回内容
xhr.onreadystatechange = function() {
    if ( xhr.readyState == 4 && xhr.status == 200 ) {
         console.log(JSON.parse(xhr.responseText)) // 使用JSON.parse解析JSON字符串
    } 
}
```

