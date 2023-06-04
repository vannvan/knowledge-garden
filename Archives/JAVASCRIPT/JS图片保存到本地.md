### Canvas 版本

```js
// 下载Canvas元素的图片
function downloadCanvasIamge(selector, name) {
    // 通过选择器获取canvas元素
    var canvas = document.querySelector(selector)
    // 使用toDataURL方法将图像转换被base64编码的URL字符串
    var url = canvas.toDataURL('image/png')
    // 生成一个a元素
    var a = document.createElement('a')
    // 创建一个单击事件
    var event = new MouseEvent('click')
    
    // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
    a.download = name || '下载图片名称'
    // 将生成的URL设置为a.href属性
    a.href = url
    
    // 触发a的单击事件
    a.dispatchEvent(event)
}

// 调用方式
// 参数一： 选择器，代表canvas
// 参数二： 图片名称，可选
downloadCanvasIamge('canvas', '图片名称')
```

### img 标签版本

```js
// 下载
function downloadIamge(selector, name) {
    // 通过选择器获取img元素
    var img = document.querySelector(selector)
    // 将图片的src属性作为URL地址
    var url = img.src
    var a = document.createElement('a')
    var event = new MouseEvent('click')
    
    a.download = name || '下载图片名称'
    a.href = url
    
    a.dispatchEvent(event)
}

// 调用方式
// 参数一： 选择器，代表img标签
// 参数二： 图片名称，可选
downloadIamge('canvas', '图片名称')
```

### 改进版

 由于跨域会导致a标签在部分浏览器中会直接打开新标签页，所以改进如下 

```js
function downloadIamge(selector, name) {
    var image = new Image()
    // 解决跨域 Canvas 污染问题
    image.setAttribute('crossOrigin', 'anonymous')
    image.onload = function () {
        var canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height

        var context = canvas.getContext('2d')
        context.drawImage(image, 0, 0, image.width, image.height)
        var url = canvas.toDataURL('image/png')

        // 生成一个a元素
        var a = document.createElement('a')
        // 创建一个单击事件
        var event = new MouseEvent('click')

        // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
        a.download = name || '下载图片名称'
        // 将生成的URL设置为a.href属性
        a.href = url

        // 触发a的单击事件
        a.dispatchEvent(event)
    }

    image.src = document.querySelector(selector).src
}

// 调用方式
// 参数一： 选择器，代表img标签
// 参数二： 图片名称，可选
downloadIamge('canvas', '图片名称')
```

### 需要注意的地方

 我们主要使用的是a标签的download属性, 下面为MDN给出的说明： 

>  此属性指示浏览器下载URL而不是导航到URL，因此将提示用户将其保存为本地文件。
> 如果属性有一个值，它将在保存提示中用作预先填写的文件名 (用户仍然可以根据需要更改文件名)。对允许的值没有限制，但是/和\被转换为下划线。大多数文件系统限制文件名中的一些标点符号，浏览器会相应地调整建议的名称。 

- 此属性仅适用于同源 URLs。
- 可以使用 blob: URLs 和 data: URLs 以方便用户下载 JavaScript 方式生成的内容（例如使用在线绘图的Web应用创建的照片）。
- 如果HTTP头的Content-Disposition：存在，并且赋予了一个和这个属性不同的文件名，HTTP头优先于此属性。
- 如果这个属性存在 Content-Disposition 被设置为 inline，火狐优先 Content-Disposition，像之前文件名的情况下，而Chrome则优先 download 属性。

### 图片转为base64

```js
function image2Base64(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL;
}
```



### 原文

[使用JavaScript将图片保存至本地](https://www.cnblogs.com/donve/p/11021572.html)