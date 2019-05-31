## 一、水平居中

使用CSS控制水平居中很简单：

- 块级元素 设置width,并设置margin auto

- 内联元素 父元素设置text-align center

  HTML代码如下:

```
<div class="container">
  <div class="content">
    水平居中哦
  </div>
</div>
```

### 1. 块级元素水平居中

```
.container {
  height: 300px;
  width: 300px;
  border: 1px solid red;
}

.content {
  width: 10rem;
  border: 1px solid green;
  margin: 0 auto;
}
```

效果：



![img](https:////upload-images.jianshu.io/upload_images/16796638-118feb74fcfaff5b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/315/format/webp)



### 2. 内联元素水平居中

```
.container {
  height: 300px;
  width: 300px;
  border: 1px solid red;
  text-align: center;
}

.content {
  display: inline-block;
  border: 1px solid green;
}
```

效果：



![img](https:////upload-images.jianshu.io/upload_images/16796638-b344a77e8464be83.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/317/format/webp)



代码很简单，而且没什么兼容性问题，所以通常也不需要用别的复杂方式来实现水平居中效果。

## 二、水平垂直居中

使用CSS控制垂直居中（或者水平垂直居中）就不像控制垂直居中那么方便，这里主要罗列几种。

### 1. flex布局

flex布局出现以后，垂直居中就很方便了，直接设置父元素：

```
display flex
align-items center
```

如果同时要水平居中，则同时设置：

```
justify-content center
```

需要注意的是IE10+才支持，webkit前缀浏览器设置flex属性需要加webkit。

```
.container {
  width: 300px;
  height: 300px;
  border: 1px solid red;
  display: -webkit-flex;
  display: flex; // 关键属性
  align-items: center;　// 垂直居中
  justify-content: center // 水平居中
}

.content {
  border: 1px solid green;
}
```



![img](https:////upload-images.jianshu.io/upload_images/16796638-377907054f14f2b5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/319/format/webp)



### 2. margin+ position:absolute布局

position: absolute布局的元素，通过设置top/bottom, left/right这两对属性，可以让元素在垂直方向和水平方向分别具有了自适应的特性。就像div在水平方向的默认表现一样!
 上文中对于块级元素的水平居中，我们设置宽度然后配合以margin可以实现水平居中。而对于设置了top/bottom,left/right的absolute定位元素，我们设置宽高再配合margin就可以达到水平垂直居中：

```
.container {
  width: 300px;
  height: 300px;
  position: relative;
  border: 1px solid red;
}

.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 200px;
  height: 100px;
  margin: auto;
  border: 1px solid green;
}
```

效果：



![img](https:////upload-images.jianshu.io/upload_images/16796638-f7c7e999b3f4638c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/315/format/webp)



兼容性很好，IE8以上支持。

### 3. transform + absolute

absolute定位元素的left、top属性是子元素的左边界、上边界相对父元素进行定位；transform是CSS3中非常强大的一个属性，可以接收多个属性值，包括旋转、缩放、平移等多种功能。这里使用二者配合，先将子元素左上定点定位到父元素中心点，再使用transform将子元素中心点移动到父元素的中心点即可：

```
.container {
  width: 300px;
  height: 300px;
  position: relative;
  border: 1px solid red;
}

.content {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);  
  border: 1px solid green;
}
```

效果：



![img](https:////upload-images.jianshu.io/upload_images/16796638-f0bdc8f4f2b7651e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/323/format/webp)



这个方法有个小缺陷，就是translate函数的参数，最后的计算值不能为小数，否则有的浏览器渲染出来效果会模糊，所以使用本方法的话最好设置一下宽高为偶数。

### 4. absolute+margin负值

与上一种方法很类似，上一种方法是使用transform将元素向左上平移，本方法则是使用margin负值的方式将元素拉向左上角。
 代码：

```
.container {
  width: 300px;
  height: 300px;
  position: relative;
  border: 1px solid red;
}

.content {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 200px;
  height: 100px;
  margin-top: -50px;
  margin-left: -100px;
  border: 1px solid green;
}
```

效果：



![img](https:////upload-images.jianshu.io/upload_images/16796638-5cf5e859acab83c8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/315/format/webp)



### 5. absolute + calc

从上两种方法可以看到，absolute设置了left和top再通过平移或者margin将元素重新定位回去。如果我们直接可以计算出正确的left和top值，岂不是一次到位？calc函数正有此功能，当然我们需要知道子元素的宽高：

```
.container {
  width: 300px;
  height: 300px;
  border: 1px solid red;
  text-align: center;
  position: relative;
}

.content {
  position: absolute;
  border: 1px solid green;
  width: 200px;
  height: 100px;
  left: calc(50% - 100px);
  top: calc(50% - 50px);
}
```

效果：



![img](https:////upload-images.jianshu.io/upload_images/16796638-057d984f695e593b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/311/format/webp)



### 6. line-height + vertical-align

vertical-align是一个作用于内联元素的属性。内联元素的特性是会和其它内联元素或者文字在同一行显示，但是默认情况下是与父元素“基线对齐”的。这里的的基线指的是父元素每一行中的一个垂直位置，是英文ｘ下边缘所在的水平, 通过设置vertical-align为middle可以将内联元素的中部对齐父元素的中部（基线+字母ｘ的一半高度）。所以可以利用这一点，将父元素的行高设置为其自身高度，然后将子元素与父元素中线对齐，即可实现垂直居中。
 代码：

```
.container {
  width: 300px;
  height: 300px;
  border: 1px solid red;
  line-height: 300px;
  text-align: center;
}

.content {
  display: inline-block;
  line-height: 1.5;
  border: 1px solid green;
  vertical-align: middle;
}
```

效果：



![img](https:////upload-images.jianshu.io/upload_images/16796638-0203613155f4c445.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/311/format/webp)

image.png

以上几种方法各有不同的适用条件，因此也有不同的优缺点，下表对各种方法进行了比较：

| 方法                         | 条件                   | 兼容性 |
| ---------------------------- | ---------------------- | ------ |
| flex布局                     | 无                     | IE10+  |
| margin + absolute            | 知道子元素宽高         | IE8+   |
| transform + absolute         | 无，子元素宽高应为偶数 | IE10+  |
| absolute + margin负值        | 知道子元素宽高         |        |
| absolute + calc              | 知道子元素宽高         | IE9+   |
| line-height + vertical-align | 知道父元素宽高         |        |

链接：https://www.jianshu.com/p/e13f05ade785

来源：简书