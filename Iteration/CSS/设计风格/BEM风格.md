## 什么是BEM
BEM是Block（块）、Element（元素）、Modifier（修饰符）的简写，是一种组件化的 CSS 命名方法和规范，由俄罗斯 Yandex 团队所提出。使用BEM主要是为了将用户界面划分成独立的块，使开发更为简单和快速，有利于团队协作，方便维护。
### 命名规则

- 块名称为其元素和修饰符定义了命名空间。
- 块名称与元素名称之间用双下划线__分隔
- 块名称与修饰符或元素与修饰符之间用双连字符--分隔
- 命名一般使用小写字母。
- 单词之间可以使用-分隔。
### Block
Block是一个功能独立的页面组件，可重复使用，也支持嵌套。我们平时浏览的网页，都是由”块“构成的。
### Element
元素是块的组成部分，是依赖上下文的。元素的名称用于描述它是什么，而不是它的状态。元素在所属的块中指定位置时，才能表现出应有的功能。
### Modifier
修饰符可以与块、元素一起工作。我们经常需要在已经定义好的块或者元素上，做一些小调整来满足特定的小功能。通常是外观或行为有些许改变，这时可以使用修饰符来处理。注意，修饰符不能单独使用，而且必须绑定在对应的块或元素上，不能混搭。
```html
<div class="banner__btn">
  <button class=".button .banner__btn--red"></button>  
  <button class=".button .banner__btn--green"></button>
  <button class=".button .banner__btn--blue"></button>   
  <button class=".button .banner__btn--yellow"></button>       
</div>
```
### 什么时候使用BEM
当我们使用BEM方法命名时，我们要知道哪些东西是应该使用BEM格式的。因为并不是每个地方都应该使用BEM命名方式，只有当需要明确关联性的模块关系时，才需要使用 BEM 格式。
## SASS实例
### mixin.scss
```css
$elementSeparator: '__';
$modifierSeparator: '--';

@function containsModifier($selector) {
  $selector: selectorToString($selector);
  @if str-index($selector, $modifierSeparator) {
    @return true;
  } @else {
    @return false;
  }
}

@function selectorToString($selector) {
  $selector: inspect($selector); //cast to string
  $selector: str-slice($selector, 2, -2); //remove brackets
  @return $selector;
}

@function getBlock($selector) {
  $selector: selectorToString($selector);
  $modifierStart: str-index($selector, $modifierSeparator) - 1;
  @return str-slice($selector, 0, $modifierStart);
}

@mixin b($block) {
  .#{$block} {
  @content;
}
}

@mixin e($element) {
  $selector: &;
  @if containsModifier($selector) {
    $block: getBlock($selector);
    @at-root {
      #{$selector} {
      #{$block+$elementSeparator+$element} {
        @content;
      }
       }
    }
  } @else {
    @at-root {
      #{$selector+$elementSeparator+$element} {
        @content;
      }
       }
    }
  }

  @mixin m($modifier) {
    @at-root {
      #{&}#{$modifierSeparator+$modifier} {
        @content;
      }
           }
    }
```
### 实际运用
```css
@include b(block) {
  background: red;
  @include e(header){
    font-size: 14px;
    @include m(css) {
      font-size: 18px;
    }
  };
  @include m(book) {
    color: blue;
    @include e(kindlebook) {
      background: gray;
    }
  }
}
```
### 编译效果
```css
.block {
  background: red;
}
.block__header {
  font-size: 14px;
}
.block__header--css {
  font-size: 18px;
}
.block--book {
  color: blue;
}
.block--book .block__kindlebook {
  background: gray;
}
```

## 资料

- [CSS 架构之 BEM - 掘金](https://juejin.cn/post/7021461539236347940)
- [CSS之BEM命名规范](https://zhuanlan.zhihu.com/p/122214519)
