### 字符间距

```scss
word-spacing==>单词间隔
letter-spacing==>字母/汉子间隔
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

