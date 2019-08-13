### mousedown、mousemove和mouseup 

1.onmousedown：鼠标按下事件
2.onmousemove：鼠标移动事件
3.onmouseup：鼠标抬起事件

重点：

1、一定要绝对定位，脱离文档流才可以移动。

2、绑定拖拽的元素，移动和鼠标松开后是对document的绑定，因为移动的是整个div。

3、点击：a= 获取当前鼠标坐标、b =div距浏览器距离、c = 鼠标在div内部距离=a-b。

​      移动：通过  a - c 建立鼠标与div的关系，防止鼠标超出div

#### 基本思路

```tex
拖拽状态 = 0鼠标在元素上按下的时候{  

  拖拽状态 = 1  

  记录下鼠标的x和y坐标  

  记录下元素的x和y坐标  

  } 

 鼠标在元素上移动的时候{  

  如果拖拽状态是0就什么也不做。  

  如果拖拽状态是1，那么  

  元素y = 现在鼠标y - 原来鼠标y + 原来元素y  

  元素x = 现在鼠标x - 原来鼠标x + 原来元素x  

  }   

 鼠标在任何时候放开的时候{  

  拖拽状态 = 0  

}
```

```js
window.onload = function(){
            var drag = document.getElementById('drag');
            // //点击某物体时，用drag对象即可，move和up是全局区域，
            // 也就是整个文档通用，应该使用document对象而不是drag对象(否则，采用drag对象时物体只能往右方或下方移动)  
            drag.onmousedown = function(event){
               var event = event || window.event;  //兼容IE浏览器
            //    鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
               var diffX = event.clientX - drag.offsetLeft;
               var diffY = event.clientY - drag.offsetTop;
               if(typeof drag.setCapture !== 'undefined'){
                      drag.setCapture(); 
               }
            document.onmousemove = function(event){
                var event = event || window.event;
                var moveX = event.clientX - diffX;
                var moveY = event.clientY - diffY;
                if(moveX < 0){
                    moveX = 0
                }else if(moveX > window.innerWidth - drag.offsetWidth){
                    moveX = window.innerWidth - drag.offsetWidth
                }
                if(moveY < 0){
                    moveY = 0
                }else if(moveY > window.innerHeight - drag.offsetHeight){
                    moveY =  window.innerHeight - drag.offsetHeight
                }
                drag.style.left = moveX + 'px';
                drag.style.top = moveY + 'px'
            }
            document.onmouseup = function(event){
                this.onmousemove = null;
                this.onmouseup = null;
                 //修复低版本ie bug  
                if(typeof drag.releaseCapture!='undefined'){  
                   drag.releaseCapture();  
                }  
            }
        }
    }
```

