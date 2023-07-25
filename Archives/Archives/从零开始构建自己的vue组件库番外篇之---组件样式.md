## 从零开始构建自己的vue组件库番外篇

----



### 写在前面（这段话只适合新手，高手请绕行）



鉴于前两节构建组件用到了很多形如 :class="[prefixCls + '__icon' + '--' + type,iconType]" 这种鬼样子的class，突然想到竟然忘了把这么重要的操作捋一下思路，具体为什么要这样搞，相信各位做前端的大佬一定知道EBM这个概念，如果不知道可参考[前端领域的BEM到底是什么](https://www.jianshu.com/p/339fdb93e155)这篇文章。



### 好了开整



以上由变量生成的class最终效果形如:

```
wui__message__icon--info icon-info
```

那么我们css就可以这么写:

```css
.wui__message__icon--info{
	height:200px;
	width:200px;
}
```

emmmmm，那是不可能的，写这么长的类名是不可能的，这辈子都不可能的。

### 如果BEM都用上了还不用sass或less那肯定是疯了，sass版BEM方案如下：

```scss
//mixin.scss
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
    $selector: inspect($selector);
    $selector: str-slice($selector, 2, -2);
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
//该sass版BEM方案来自https://www.sass.hk/skill/sass94.html
```

### 具体参考message组件的样式

```scss
@import 'mixin.scss';
@include b(wui){
  @include e(message){
    position: fixed;
    width: auto;
    @include rounded(4px);
    line-height: 1;
    left: 50%;
    top: 20px;
    height:auto;
    transform: translateX(-50%);
    background-color: #edf2fc;
    transition: opacity .3s,transform .4s;
    overflow: hidden;
    padding: 15px 15px 15px 20px;
    background-color:$lightColor;
    @include shadow(0,0,3px,#ccc);
    z-index: 1000;
    i{
      float: left;
    }
    @include e(icon--info){
      color: $primaryColor;
    }
    @include e(icon--success){
      color: $successColor
    }
    @include e(icon--warning){
      color: $warningColor
    }
    @include e(icon--error){
      color: $errorColor
    }
    @include e(content){
      float: left;
      @include e(body){
        margin: 0 10px;
      }
    }
    @include e(closeTxt){
      float: right;
      cursor: pointer;
      color: $primaryColor
    }
    @include e(iconbox){
      float: right;
      cursor: pointer;
    }
  }

}



.message-fade-enter-active {
  animation: bounce-in .5s;
}
.message-fade-leave-active {
  animation: bounce-out .5s;
}

@keyframes bounce-in {
  0% {
    top:0;
    opacity: 0.2
  }
  100% {
    top:20px;
    width: auto;
    opacity: 1
  }
}
@keyframes bounce-out {
  0% {
    top:20px;
    opacity: 1
  }
  100% {
    top:0;
    opacity: 0
  }
}

```







