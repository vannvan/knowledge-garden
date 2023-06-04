##实现半星评分效果

#### 一：实现的思路： 

通过评分的分数，来算出高亮的全星有几颗，有没有半星，灰色星星有几颗，通过class实现，例如：

**评分 ： 4.6 分** 

四舍五入计算把分数换算成0.5的倍数：Math.floor( 4.6 *2 ) / 2   等于 4.5

把星星放到数组 arr_star 里面：

是否需要半星  

> var half = 4.5 % 1 != 0 ?  true :false    //能被1取余整数的话就不需要半星为false,否则是true

把全星push到数组里面  

> for ( var i = 0; i< Math.floor( 4.5) ;i++ ) 
>
> {  arr_star.push( "on")  }  //on是满星星的class

把半星放到数组里面 

> if( half ) { arr_star.push( "half" ) }  //half是半星的class

把灰色星星放到数组里面

>  if( arr_star.length < 5) { 

　>  for( var i=0;i<(5-arr_star.length) ; i++ ){  

	>arr_star.push( "off" ) }   //off是灰色星星class

#### 二：具体实现代码：

　　2.1 html部分：　　　　

```vue
<template>
  <div class="star">
    <span v-for="(item,index) in itemClasslass" class="star-item" :key="index" :class="item"></span>
  </div>
</template>
```

　　2.2 js部分

```vue
<script>
const lengths = 5;
const starOn = 'icon-star-full';
const starHalf = 'icon-star-half';
const starOff = 'icon-star-empty';
  export default({
    data(){
      return {
      }
    },
    props:{
      score:{//分数
        type:Number,
        default:function(){
          return 5
        }
      }
    },
    created() {
    },
    computed:{
      itemClasslass(){//星星的数组
          let result = [];
          let score = Math.floor(this.score * 2) / 2; //例如：把分数处理成在4.5以上及4.5就变成向上取整5，在4.5以下就变成4.5
          //是否需要半星
          let starhalf = score%1 != 0 ? true : false ;
          //几颗全星
          let fullstar = Math.floor(score);
          for(var i=0 ; i<fullstar;i++){//放全星
            result.push(starOn);
          }
          if(starhalf){//放半星
            result.push(starHalf)
          }
          if(result.length < lengths){//如果没有满到五个星就用灰色的星星补齐9
            var offstar = lengths - result.length;
            for(var i=0;i<offstar;i++){
                result.push(starOff);
            }
          };
          return result;
      }
    }
  })
</script>
```

　该实例不完整，需根据具体项目需求进一步改进

参考链接：https://www.cnblogs.com/chun321/p/9456663.html

## 实现普通全星效果

html部分

```vue
<div>
      <span v-for="s in 5" @click="changeRate(s)">
            <i :class="s <= star ? 'icon-star-full':'icon-star-empty'"></i>
      </span>
</div>
```

js部分

```vue
<script>
    export default({
    data(){
        return{
            star:'',
        }
    },
    methods:{
        changeRate(s){
            this.star=s
        }
    }
    })
</script>
```

ps:icon-star-full 全星 icon-star-empty 空心星

