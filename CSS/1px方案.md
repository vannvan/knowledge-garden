### scss函数

```scss
@mixin thinBorder($directionMaps: bottom, $color: #ccc, $radius:(0, 0, 0, 0), $position: after) {
    // 是否只有一个方向
    $isOnlyOneDir: string==type-of($directionMaps);

    @if ($isOnlyOneDir) {
        $directionMaps: ($directionMaps);
    }

    @each $directionMap in $directionMaps {
        border-#{$directionMap}: 1px solid $color;
    }

    // 判断圆角是list还是number
    @if(list==type-of($radius)) {
        border-radius: nth($radius, 1) nth($radius, 2) nth($radius, 3) nth($radius, 4);
    }

    @else {
        border-radius: $radius;
    }

    @media only screen and (-webkit-min-device-pixel-ratio: 2) {
        & {
            position: relative;



            // 删除1像素密度比下的边框
            @each $directionMap in $directionMaps {
                border-#{$directionMap}: none;
            }
        }

        &:#{$position} {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            width: 200%;
            height: 200%;
            transform: scale(0.5);
            box-sizing: border-box;
            padding: 1px;
            transform-origin: 0 0;
            pointer-events: none;
            border: 0 solid $color;

            @each $directionMap in $directionMaps {
                border-#{$directionMap}-width: 1px;
            }

            // 判断圆角是list还是number
            @if(list==type-of($radius)) {
                border-radius: nth($radius, 1)*2 nth($radius, 2)*2 nth($radius, 3)*2 nth($radius, 4)*2;
            }

            @else {
                border-radius: $radius*2;
            }

        }
    }

    @media only screen and (-webkit-min-device-pixel-ratio: 3) {
        &:#{$position} {

            // 判断圆角是list还是number
            @if(list==type-of($radius)) {
                border-radius: nth($radius, 1)*3 nth($radius, 2)*3 nth($radius, 3)*3 nth($radius, 4)*3;
            }

            @else {
                border-radius: $radius*3;
            }

            width: 300%;
            height: 300%;
            transform: scale(0.33);
        }
    }
}
```

### 使用方法

#### 单侧边框

```scss
@each $dir in (top,right,bottom,left) {
  .border-#{$dir}-#{1}px {
    @include thinBorder( $dir);
  }
}
```

#### 多侧边框

```scss
.border-top-left-red-1px{
    @include thinBorder((top,left), red);
}
```

#### 圆角边框

```scss
.border-top-left-red-1px{
    @include thinBorder(top, red, 100px);
}
```

#### :before生成边框

```scss
.border-top-before{
    @include thinBorder(top, red, 0, before);
}
```

