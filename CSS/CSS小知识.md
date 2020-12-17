### 字符间距

```scss
word-spacing==>单词间隔
letter-spacing==>字母/汉字间隔
```

### 鼠标禁用

```scss
.disabled {
    pointer-events: none;
    cursor: default;
    opacity: 0.6;
}
```

### 条纹网格

```scss
// odd表示基数，此时选中基数行的样式，even表示偶数行
.row:nth-child(odd){
    background: #eee;
}
.row:nth-of-type(odd){
    background: #eee;
}
```

### 禁止用户选择

```scss
body{
-webkit-touch-callout: none;
-webkit-user-select: none;
-khtml-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
}
```

### 修改chrome记住密码后自动填充表单的黄色背景

```scss
 input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
    background-color: rgb(250, 255, 189); /* #FAFFBD; */
    background-image: none;
    color: rgb(0, 0, 0);
  }
```

### 让页面里的字体变清晰，变细用CSS怎么做

```scss
-webkit-font-smoothing: antialiased;
```

### 让overflow:scroll平滑滚动

```scss
-webkit-overflow-scrolling: touch;
```

### 开启硬件加速

```scss
//目前，像Chrome/Filefox/Safari/IE9+以及最新版本Opera都支持硬件加速，当检测到某个DOM元素应用了某些CSS规则时就会自动开启，从而解决页面闪白，保证动画流畅。
.css {
    -webkit-transform: translate3d(0,0,0);
    -moz-transform: translate3d(0,0,0);
    -ms-transform: translate3d(0,0,0);
    transform: translate3d(0,0,0);
}
```

### 手机上的多行省略

```scss
.overflow-hidden{
    display: box !important;
    display: -webkit-box !important;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;/*第几行出现省略号*/
    /*text-align:justify;不能和溢出隐藏的代码一起写，会有bug*/
}
```

### 改变输入框提示文字颜色

```scss
::-webkit-input-placeholder { /* WebKit browsers */
    color: #999; }
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #999; }
::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #999; }
:-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #999; }
input:focus::-webkit-input-placeholder{ color:#999; }
```

### 消除  transtration闪屏

```scss
.css {
    -webkit-transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
    -webkit-perspective: 1000;
}
```

### 根据像素密度匹配最佳显示照片

```html
<img src="conardLi_1x.png"
     srcset=" conardLi_2x.png 2x, conardLi_3x.png 3x">
```

### iOS滑动不流畅

```css
-webkit-overflow-scrolling: touch; /* 当手指从触摸屏上移开，会保持一段时间的滚动 */
-webkit-overflow-scrolling: auto; /* 当手指从触摸屏上移开，滚动会立即停止 */
```

### iOS上下拉边界出现空白

##### 产生原因

在 iOS 中，手指按住屏幕上下拖动，会触发 `touchmove` 事件。这个事件触发的对象是整个 `webview` 容器，容器自然会被拖动，剩下的部分会成空白。

##### 解决方案

##### 1. 监听事件禁止滑动

移动端触摸事件有三个，分别定义为

```css
1. touchstart ：手指放在一个DOM元素上。
2. touchmove ：手指拖曳一个DOM元素。
3. touchend ：手指从一个DOM元素上移开。
复制代码
```

显然我们需要控制的是 `touchmove` 事件

**`touchmove` 事件的速度是可以实现定义的，取决于硬件性能和其他实现细节**

**`preventDefault` 方法，阻止同一触点上所有默认行为，比如滚动。**

由此我们找到解决方案，通过监听 `touchmove`，让需要滑动的地方滑动，不需要滑动的地方禁止滑动。

> 值得注意的是我们要过滤掉具有滚动容器的元素。

**实现如下：**

```js
document.body.addEventListener('touchmove', function(e) {
    if(e._isScroller) return;
    // 阻止默认事件
    e.preventDefault();
}, {
    passive: false	
});
```



