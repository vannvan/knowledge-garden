### 参考

-  [Canvas实用库Fabric.js使用手册](https://segmentfault.com/a/1190000017749198)
-  [使用Fabric.js玩转Canvas](https://blog.csdn.net/a526878729/article/details/87178066)



### 背景图

```js
var canvas = new fabric.Canvas('canvas')
    canvas.setBackgroundImage(
      'https://erp.91miaoshou.com/img/watermark_base_map.ab70be45.jpg',
      canvas.renderAll.bind(canvas)
    )
```

### 绘制图形

```js
       var rect = new fabric.Rect({

           left:100,//距离画布左侧的距离，单位是像素

           top:100,//距离画布上边的距离

           fill:'red',//填充的颜色

           width:30,//方形的宽度

          height:30//方形的高度

       });
```

### 可编辑文本

```js
 var text = 'hello world'
    var textWithBackground = new fabric.IText(text, {
      textBackgroundColor: 'rgba(0,0,0,0)'
    })
    canvas.add(textWithBackground)
    textWithBackground.on('selected', function() {
      console.log('selected')
      //   text.hiddenTextarea.focus()
    })
```

