```js

/*
说明：这是一个滚动到可视区域播放动画的插件，当窗口滚动到可视区域时添加ClassName进入动画；
    1.查找页面内所含有[data-animate]的元素，遍历得到他们本身；[data-animate]值为动态获取，需手写animation，
      更多动画效果请访问https://daneden.github.io/animate.css/；
    2.调用函数:计算元素是否到达可视区域 返回Boolean值；
注意：此方法不能用于ifarm,窗口滚动影响判断
*/

$(function () {
	var windowHeight = $(window).height(); //窗口高度
	var element;

	// 元素在可视区域，即刻开始动画
	var dataAnimateEl = $("[data-animate]");
	if (dataAnimateEl.length > 0 || dataAnimateEl.length == 0) {
		dataAnimateEl.each(function () {
			element = $(this);
			// 元素在可视区域，即刻开始动画
			animationStart(element);
		});
	}

	// 监听页面滚动，开始动画
	$(window).scroll(function (event) {
		var dataAnimateEl = $("[data-animate]");
		if (dataAnimateEl.length > 0 || dataAnimateEl.length == 0) {
			dataAnimateEl.each(function () {
				element = $(this);
				// 元素在可视区域，即刻开始动画
				animationStart(element);
			});
		}
	});

	//开始动画
	function animationStart(element) {
		var annimationVal = element.data("animate");
		if (viewingArea(element)) {
			element.removeClass(annimationVal).addClass(annimationVal);
		}
	}

	//函数作用：计算元素是否到达可视区域
	function viewingArea(element) {
		var objHeight = $(element).offset().top; //元素到顶部的高度
		let winPos = $(window).scrollTop(); //距离顶部滚动
		let val = objHeight - winPos;
		if (val < windowHeight && val > 0) {
			//可视区域
			return true;
		} else {
			//不可视区域
			return false;
		}
	}
});
```





```html
<div class="content content-3 animated" data-animate="fadeInUp">
	内容
</div>
```

