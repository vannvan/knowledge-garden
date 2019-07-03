

#### javascript动态创建div循环列表
## 示例1
```js
var noApplicationRecord = document.getElementById('noApplicationRecord')

//模拟数据
var data = [
    { business: '万达影院(万胜广场店)', count: '325', num: '20170012565863565656', time: '2017-10-12 16:30', license: '粤A88888' },
    { business: '麦当劳', count: '111', num: '20170012565863565656', time: '2017-10-12 16:30', license: '粤A99999' },
    { business: '肯德基', count: '456', num: '20170012565863565656', time: '2017-10-12 16:30', license: '粤A45466' }
]
//绘制单个div
function setDiv(item){
    var div = '<div class="body-no-list"><div class="body-no-list-header" ><div class="body-no-list-header-title">'
        + item.business
        + '</div><div class="body-no-list-header-txt">消费金额:&nbsp;'
        + item.count
        + '元<br>消费单号:&nbsp;'
        + item.num
        + '<br>提交时间:&nbsp;'
        + item.time
        + '</div></div><div class="body-no-list-bottom"><div class="body-no-list-bottom-vehicl">'
        + item.license
        + '</div><div><button>撤销</button><button> 修改</button></div></div></div> '
    return div
}
//循环加载到页面
function getnoApplicationData(){
    var html = ''
    for(var i = 0;i<data.length;i++){
        html += setDiv(data[i])
    }
    noApplicationRecord.innerHTML = html
}

 window.onload = getnoApplicationData()
```

## 示例2

```js
可以用jquery.each来实现
比如：
$.each(data.comments, function(i, item) {
            $("#content").append(
                    "<div>" + item.id + "</div>" + 
                    "<div>" + item.nickname    + "</div>" +
                    "<div>" + item.content + "</div><hr/>");
        });
```

## 示例2

```js

function each(obj) {
	if (obj.constructor==Array) {
		var str = "<ul>";
		for (var i = 0, len = obj.length; i < len; i++) {
			str += "<li>"+each(obj[i])+"</li>";
		}
		str += "</ul>";
		return str;
	}
	if (obj.constructor==Object) {
		var str = "<ul>";
		for (var i in obj) {
			str += "<li>"+i+" : "+each(obj[i])+"</li>";
		}
		str += "</ul>";
		return str;
	}
	return obj;
}
$.getJSON('ajax/test.json', function(obj) {
	$("body").append(each(obj));
});

```

