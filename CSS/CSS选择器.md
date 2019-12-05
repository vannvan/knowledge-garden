**css选择器种类有：**

通用选择器：*

id选择器：#header{}

class选择器：.header{}

元素选择器：div{}

子选择器：ul > li{}

后代选择器：div p{}

伪类选择器：:hover、::selection、.action、:first-child、:last-child、:first-of-type、:last-of-type、:nth-of-type(n)、:nth-of-last-type(n)等,例如a:hover{}

伪元素选择器:  :after、:before等,例如：li:after

属性选择器: input[type="text"]

组合选择器：E,F/E F（后代选择器）/E>F（子元素选择器）/E+F（直接相邻元素选择器----匹配之后的相邻同级元素）/E~F（普通相邻元素选择器----匹配之后的同级元素）

层次选择器：p~ul    选择前面有p元素的每个ul元素

**css选择器优先级：**

- 选择器优先级由高到低分别为：
  !important > 作为style属性写在元素标签上的内联样式 >id选择器>类选择器>伪类选择器>属性选择器>标签选择器> 通配符选择器（* 应少用）>浏览器自定义；

- 当比较多个相同级别的CSS选择器优先级时，它们定义的位置将决定一切。下面从位置上将CSS优先级由高到低分为六级：
- 1、位于<head/>标签里的<style/>中所定义的CSS拥有最高级的优先权。
- 2、第二级的优先属性由位于 <style/>标签中的 @import 引入样式表所定义。
- 3、第三级的优先属性由<link/>标签所引入的样式表定义。
- 4、第四级的优先属性由<link/>标签所引入的样式表内的 @import 导入样式表定义。
- 5、第五级优先的样式有用户设定。
- 6、最低级的优先权由浏览器默认。

**使用场景：**

- class使用场景：需要某些特定样式的标签则放在同一个class中，需要此样式的标签可再添加此类。（class不可被javascript中的GetElementByID函数所调用）
- id使用场景：1、根据提供的唯一id号快速获取标签对象，如：document.getElementById(id) ；2、用于充当label标签for属性的值：示例：<label for='userid'>用户名：</label>，表示单击此label标签时，id为userid的标签获得焦点

**CSS哪些属性可以继承？** 
css继承特性主要是指文本方面的继承(比如字体、颜色、字体大小等)，盒模型相关的属性基本没有继承特性。 

不可继承的： 
display、margin、border、padding、background、height、min-height、max-height、width、min-width、max-width、overflow、position、top、bottom、left、right、z-index、float、clear、 table-layout、vertical-align、page-break-after、page-bread-before和unicode-bidi。 

所有元素可继承的： 
visibility和cursor 

终极块级元素可继承的： 
text-indent和text-align 

内联元素可继承的： 
letter-spacing、word-spacing、white-space、line-height、color、font、font-family、font-size、font-style、font-variant、font-weight、text-decoration、text-transform、direction 

列表元素可继承的： 
list-style、list-style-type、list-style-position、list-style-image

### 常用at规则及使用示例：

- [@charset](http://zervanto.farbox.com/post/css3mo-fa-mu-lu/csszhong-de-atgui-ze#toc_1)
- [@import](http://zervanto.farbox.com/post/css3mo-fa-mu-lu/csszhong-de-atgui-ze#toc_2)
- [@namespace](http://zervanto.farbox.com/post/css3mo-fa-mu-lu/csszhong-de-atgui-ze#toc_3)
- [@document](http://zervanto.farbox.com/post/css3mo-fa-mu-lu/csszhong-de-atgui-ze#toc_4)
- [@font-face](http://zervanto.farbox.com/post/css3mo-fa-mu-lu/csszhong-de-atgui-ze#toc_5)
- [@keyframes](http://zervanto.farbox.com/post/css3mo-fa-mu-lu/csszhong-de-atgui-ze#toc_6)
- [@media](http://zervanto.farbox.com/post/css3mo-fa-mu-lu/csszhong-de-atgui-ze#toc_7)
- [@page](http://zervanto.farbox.com/post/css3mo-fa-mu-lu/csszhong-de-atgui-ze#toc_8)
- [@supports](http://zervanto.farbox.com/post/css3mo-fa-mu-lu/csszhong-de-atgui-ze#toc_9)

```
/*定义字符集*/
@charset "utf-8"    
/*导入css文件*/ 
@import "base.css"
/*自定义字体*/
@font-face {}
/*声明CSS3 animation动画关键帧*/
@keyframes fadeIn {}
/*媒体查询*/
@media{}复制代码
```

[原文](<https://juejin.im/post/5d8336d2f265da03df5f4a06#heading-6>)

