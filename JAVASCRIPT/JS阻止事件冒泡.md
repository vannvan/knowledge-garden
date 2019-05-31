#### 场景1：模态框的遮罩允许点击关闭模态框，同时模态框里有其他事件，模态框和遮罩z-index值相同，此时点击模态框内的任意区域会引起事件冒泡

#### 处理方式

1.原生js

```js
//点击button的方法
    function clickBtn(event){

        //具体的事件内容。。。。。

        
        stopBubbling(event); 
    }


    function stopBubbling(e) {
        e = window.event || e;
        if (e.stopPropagation) {
            e.stopPropagation();      //阻止事件 冒泡传播
        } else {
            e.cancelBubble = true;   //ie兼容
        }
    }
```

2.vue

给模态框添加 @click.stop

例：

```vue
<transition name="fade">
      <div class="public-mask" v-show="visible">
      </div>
    </transition>
    <div class="public-modal-wrap" v-if="visible" @click="handleMask()">
      <div class="public-modal clearfix" v-if="type=='modal'" :style="modalWidth" v-show="visible" @click.stop>
        <div class="modal-header">
          {{title}}
          <span class="icon-close" @click="close()"></span>
        </div>
        <div class="modal-main">
          <slot></slot>   <!-- content slot -->
        </div>
        <div class="modal-footer">
          <div class="ok-btn" @click="ok()">{{okText}}</div>
          <div class="cancel-btn" @click="close()">取消</div>
        </div>
      </div>
    </div>
```

场景2：多层DIV叠加的js事件穿透

![](https://images2017.cnblogs.com/blog/638108/201710/638108-20171028171349430-1667355324.png)

这个示意图中

C方块在A容器中（A容器边框为红色）

D方块在B容器中（B容器边框为绿色）

A B部分重叠，B在上层。

不做任何处理的话，C方块永远无法被点到，因为B把它盖住了。

解决方式：主要利用的是css中的pointer-events属性，将A B容器都设置为none，不响应鼠标事件，同时，将CD显式设置为auto，让他们响应鼠标事件，这样一来，B就不会挡住A了

