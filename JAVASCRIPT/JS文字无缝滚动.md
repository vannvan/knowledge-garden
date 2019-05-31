```html
<div class="box">
  <div class="winBox">
    <ul class="scroll">
      <li><a href="#">时尚休闲裤68元</a></li>
      <li><a href="#">羊呢绒套衫38元</a></li>
      <li><a href="#">新款雪地靴88元</a></li>
      <li><a href="#">加厚法兰绒108元</a></li>
      <li><a href="#">连裤袜19元2双</a></li>
      
      <li><a href="#">时尚休闲裤68元</a></li>
      <li><a href="#">羊呢绒套衫38元</a></li>
      <li><a href="#">新款雪地靴88元</a></li>
      <li><a href="#">加厚法兰绒108元</a></li>
      <li><a href="#">连裤袜19元2双</a></li>
    </ul>
  </div>
</div>
```

css

```css
* {
	padding:0;
	margin:0;
	font-family:"微软雅黑";
}
li {
	list-style:none;
}
a {
	text-decoration:none;
}
img {
	border:none;
}
.box {
	padding-left:50px;
	background:url("images/xtb.png") no-repeat;
	margin-top:100px;
	margin-left:100px;
}
.winBox {
	width:300px;
	height:40px;
	overflow:hidden;
	position:relative;
	background:pink;
}
.scroll {
	/*width的大小是根据下面li的长度和多少个li而定的，需注意！*/
			width:1500px;
	position:absolute;
	left:0px;
	top:0px;
}
.scroll li {
	width:150px;
	float:left;
	line-height:40px;
	text-align:center;
}

```

JS

```js
$(function() {
    var num = 0;
    function goLeft() {
        //750是根据你给的尺寸，可变的
        if (num == -750) {
            num = 0;
        }
        num -= 1;
        $(".scroll").css({
            left: num
        })
    }
    //设置滚动速度
    var timer = setInterval(goLeft, 20);
    //设置鼠标经过时滚动停止
    $(".box").hover(function() {
        clearInterval(timer);
    },
    function() {
        timer = setInterval(goLeft, 20);
    })
})
```

