### 嵌套  ...

### 引用父选择器

```scss
.btn {
    color: #ccc;
    &:hover {
        color: red;
    }
    &:visited {
        color: blue;
    }
}
```

### 变量

```scss
$text-color: #ccc;
$border-style: solid;
#navbar {
    border-bottom: {
        color: $text-color;
        style: $border-style;
    }
}
a {
    color: $text-color;
    &:hover {
        border-bottom: 1px $border-style #ccc;
    }
}
```

### 操作符和预定义函数

```scss
#navbar {
    $navbar-width: 800px;
    $item: 5;
    $navbar-color: #aaa;

    width: $navbar-width;
    border-bottom: 2px solid $navbar-color;

    li {
        float: left;
        width: $navbar-width/$item - 10px;

        background-color: lighten($navbar-color, 20%);
        &:hover {
            background-color: lighten($navbar-color, 10%);
        }
    }
}
//lighten是SCSS提供的预定义函数。这个函数是用来修改颜色亮度的。
```

### 插入

使用`#{}`符号可以将变量查到属性名，或者选择器中

```js
$side: top;
$radius: 10px;
.round-#{$side} {
    border-#{$side}-radius: $radius;
    -moz-border-#{$side}-radius: $radius;
    -webkit-border-#{$side}-radiux: $radius;
}

//另
@for $i from 1 through 6 {
	.letter:nth-child(#{$i}) {
		animation-delay: (0.08s * $i);
	}
}
```

### 继承

```scss
.base-nav {
    color: red;
}
.new-nav {
    @extend .base-nav;
    text-align: center;
}
//生成
.base-nav, .new-nav {
  color: red;
}
.new-nav {
  text-align: center;
}
```

### Mixin

```scss
@mixin round-top {
    $side: top;
    $radius: 10px;

    border-#{$side}-radius: $radius;
    -moz-border-#{$side}-radius: $radius;
    -webkit-border-#{$side}-radiux: $radius;
}
#navbar li {
    @include round-top;
}
#footer {
    @include round-top;
}

//有参数的mixin
@mixin round($side, $radius: 10px) {
    border-#{$side}-radius: $radius;
    -moz-border-#{$side}-radius: $radius;
    -webkit-border-#{$side}-radiux: $radius;
}

#navbar li {
    @include round(top);
}
#footer {
    @include round(top, 5px);
}
#sidebar {
    @include round(left, 8px);
}
```

### 控制语句

使用@if进行条件判断

```scss
$navbar-width: 800px;
$item: 5;
p {
    @if $navbar-width/$item - 10px < 200 { border: 2px dotted; }
    @if $navbar-width/$item - 10px == 150 { border: 1px solid; }
}

//对应css
p {
  border: 2px dotted;
  border: 1px solid;
}
```

@else

```scss
$navbar-width: 800px;
$item: 5;
p {
    @if $navbar-width/$item - 10px == 200 { border: 2px dotted; }

    @else { border: 1px solid; }
}
```

@for   @while  @each  循环

```scss
@for $i from 1 to 5 {
    .border-#{$i} {
        border: #{$i}px solid blue;
    }
}

$i: 1;
@while $i < 5 {
    .border-#{$i} { border: #{$i}px solid blue; }
    $i: $i + 1;
}

@each $item in add, update, remove, share {
    .icon-#{$item} {
        background-image: url("/image/#{$item}.jpg");
    }
}
//@each对应css
.icon-add {
  background-image: url("/image/add.jpg");
}
.icon-update {
  background-image: url("/image/update.jpg");
}
.icon-remove {
  background-image: url("/image/remove.jpg");
}
.icon-share {
  background-image: url("/image/share.jpg");
}
```

### 自定义函数

```scss
@function double($n) {
    @return $n * 2;
}
#navbar {
    width: double(5px);
}
//对应css
#navbar {
  width: 10px;
}
```

