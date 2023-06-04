## 是什么
OOCSS (Object-Oriented CSS 翻译为 面向对象 CSS) 是组织 CSS 的领先的模块化或基于组件的系统。它是 [Nicole Sullivan](https://links.jianshu.com/go?to=https%3A%2F%2Ftwitter.com%2Fstubbornella) 在 2008 年在 Web Directions North 大会上首次提出的。
## 两大原则

- **分离结构（**structure**）和皮肤（**skin**）。** 您应该在基础对象中保留结构和位置，并在扩展类中保留视觉特征（如 background 或 border）。这样您就不必覆盖视觉属性。
- **分离容器（**container**）和内容（**content**）。** 永远不要在 CSS 中模仿 HTML 的结构。换句话说，不要在样式表中引用标签或 ID。相反，尝试创建和应用描述相关标签使用的类。并将嵌套类保持在最低限度。
## 特点

- 强调重用
- 选择器简洁
- 可扩展类
- 强调风格与内容分离
- 强调内容与容器分离
## 缺点

- 大量使用演示类
- 需要在模板中应用演示类
- 样式(CSS)和结构(HTML)藕合太紧
- 如果设计变动，需要更改CSS和HTML
- 创建了数千行CSS，但有可能这些CSS永远不会被使用。比如Twitter Bootstrap
## 举例
```css
//css写法
.title-1{
  border-bottom:1px solid #ccc;
  font-size:16px;
  font-weight:bold;
  color:#333;
}

//OOCSS写法
.bb-c{
  border-bottom:1px solid #ccc;
}   
.f16{
  font-size:16px;
}
.bold{
  font-weight:bold;
}
.c333{
  color:#333;
}

//html
<div class="f16 bold c333 bb-c">标题</div>
```
## **oosass**
oosass是可伸缩，面向对象的CSS，其实它就是OOCSS的一个变异体，进化体。
```css
%bb-c{
    border-bottom:1px solid #ccc;
}   
%f16{
    font-size:16px;
}
%bold{
    font-weight:bold;
}
%c333{
    color:#333;
}
%c999{
    color:#999;
}
.title-1{
    @extend %bb-c;
    @extend %f16;
    @extend %bold;
    @extend %c333;
}

// 假设有类title-2
.title-2{
    @extend %f16;
    @extend %c999;
}
```



## 资料

- [https://www.w3cplus.com/preprocessor/oocss-vs-ooscss.html](https://www.w3cplus.com/preprocessor/oocss-vs-ooscss.html)
